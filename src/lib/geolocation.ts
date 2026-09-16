import { DistrictData } from '@/types';
import { DISTRICTS_DATABASE, synthesizeDistrictData } from '@/data/districts';

export interface GeolocationResult {
  latitude: number;
  longitude: number;
  city?: string;
  district?: string;
  state?: string;
  country?: string;
  postalCode?: string;
  matchedDistrict: DistrictData;
}

/**
 * Trigger HTML5 browser geolocation and reverse-geocode to extract district and state.
 */
export async function detectUserLocation(): Promise<GeolocationResult> {
  return new Promise((resolve, reject) => {
    if (typeof window === 'undefined' || !navigator.geolocation) {
      reject(new Error('Geolocation is not supported by your browser.'));
      return;
    }

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords;

        try {
          // Attempt reverse geocoding via BigDataCloud client API (free, no key required, fast)
          let city = '';
          let districtName = '';
          let stateName = '';
          let countryName = 'India';
          let postalCode = '';

          try {
            const res = await fetch(
              `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${latitude}&longitude=${longitude}&localityLanguage=en`
            );
            if (res.ok) {
              const data = await res.json();
              city = data.locality || data.city || '';
              districtName = data.localityInfo?.administrative?.[2]?.name || data.city || data.principalSubdivision || '';
              stateName = data.principalSubdivision || '';
              countryName = data.countryName || 'India';
              postalCode = data.postcode || '';
            }
          } catch (fetchErr) {
            console.warn('Primary reverse-geocode fallback to Nominatim:', fetchErr);
            // Secondary fallback via OpenStreetMap Nominatim
            const nomRes = await fetch(
              `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}&zoom=10`
            );
            if (nomRes.ok) {
              const nomData = await nomRes.json();
              const addr = nomData.address || {};
              districtName = addr.county || addr.state_district || addr.city || '';
              stateName = addr.state || '';
              countryName = addr.country || 'India';
              postalCode = addr.postcode || '';
            }
          }

          // Clean district name (remove suffixes like "District", "Division")
          const cleanDistrict = districtName.replace(/\s+district/i, '').replace(/\s+division/i, '').trim();

          // Find match in existing database or dynamically synthesize full district data
          let matchedDistrict = DISTRICTS_DATABASE.find(
            (d) =>
              d.name.toLowerCase() === cleanDistrict.toLowerCase() ||
              cleanDistrict.toLowerCase().includes(d.name.toLowerCase()) ||
              (stateName && d.state.toLowerCase() === stateName.toLowerCase() && cleanDistrict.toLowerCase().includes(d.name.toLowerCase()))
          );

          if (!matchedDistrict) {
            const fallbackName = cleanDistrict || city || 'Dynamic Region';
            const fallbackState = stateName || 'India';
            matchedDistrict = synthesizeDistrictData(fallbackName, fallbackState);
          }

          resolve({
            latitude,
            longitude,
            city,
            district: cleanDistrict || matchedDistrict.name,
            state: stateName || matchedDistrict.state,
            country: countryName,
            postalCode,
            matchedDistrict,
          });
        } catch (err: any) {
          // In case of network error on geocoding API, fallback to default district
          resolve({
            latitude,
            longitude,
            matchedDistrict: DISTRICTS_DATABASE[0],
          });
        }
      },
      (error) => {
        let msg = 'Failed to retrieve GPS location.';
        if (error.code === error.PERMISSION_DENIED) {
          msg = 'Location permission was denied. Please allow location access in your browser or select a region manually.';
        } else if (error.code === error.POSITION_UNAVAILABLE) {
          msg = 'Location information is currently unavailable.';
        } else if (error.code === error.TIMEOUT) {
          msg = 'The request to get user location timed out.';
        }
        reject(new Error(msg));
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 60000,
      }
    );
  });
}
