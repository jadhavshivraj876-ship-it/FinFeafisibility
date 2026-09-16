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
  source: 'gps' | 'ip' | 'cached' | 'fallback';
}

const LOCAL_STORAGE_KEY = 'finfeasibility_detected_location';

/**
 * Attempt IP-based location detection if browser GPS is blocked/denied.
 */
export async function detectLocationByIP(): Promise<GeolocationResult> {
  try {
    const res = await fetch('https://ipwho.is/');
    if (res.ok) {
      const data = await res.json();
      if (data && data.success !== false) {
        const city = data.city || '';
        const region = data.region || '';
        const country = data.country || 'India';
        const lat = data.latitude || 17.6805;
        const lon = data.longitude || 74.0183;

        // Match with district database
        const cleanName = city.replace(/\s+district/i, '').trim();
        let matched = DISTRICTS_DATABASE.find(
          (d) =>
            d.name.toLowerCase() === cleanName.toLowerCase() ||
            d.state.toLowerCase() === region.toLowerCase()
        );

        if (!matched) {
          matched = synthesizeDistrictData(cleanName || region || 'Regional Hub', region || 'India');
        }

        return {
          latitude: lat,
          longitude: lon,
          city,
          district: cleanName || matched.name,
          state: region || matched.state,
          country,
          matchedDistrict: matched,
          source: 'ip',
        };
      }
    }
  } catch (e) {
    console.warn('IP-based geocoding unavailable:', e);
  }

  return {
    latitude: 17.6805,
    longitude: 74.0183,
    district: DISTRICTS_DATABASE[0].name,
    state: DISTRICTS_DATABASE[0].state,
    country: 'India',
    matchedDistrict: DISTRICTS_DATABASE[0],
    source: 'fallback',
  };
}

/**
 * Trigger HTML5 browser geolocation and reverse-geocode to extract district and state.
 * Automatically falls back to IP-based location if GPS is denied or unavailable.
 */
export async function detectUserLocation(): Promise<GeolocationResult> {
  // Check cached location first if available
  if (typeof window !== 'undefined') {
    try {
      const cached = localStorage.getItem(LOCAL_STORAGE_KEY);
      if (cached) {
        const parsed = JSON.parse(cached);
        if (parsed && parsed.matchedDistrict) {
          // Verify it's within 24 hours
          if (Date.now() - (parsed.timestamp || 0) < 24 * 60 * 60 * 1000) {
            return { ...parsed, source: 'cached' };
          }
        }
      }
    } catch {
      // Ignore localStorage error
    }
  }

  return new Promise((resolve) => {
    if (typeof window === 'undefined' || !navigator.geolocation) {
      detectLocationByIP().then(resolve);
      return;
    }

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords;

        try {
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

          const cleanDistrict = districtName.replace(/\s+district/i, '').replace(/\s+division/i, '').trim();

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

          const result: GeolocationResult = {
            latitude,
            longitude,
            city,
            district: cleanDistrict || matchedDistrict.name,
            state: stateName || matchedDistrict.state,
            country: countryName,
            postalCode,
            matchedDistrict,
            source: 'gps',
          };

          if (typeof window !== 'undefined') {
            try {
              localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify({ ...result, timestamp: Date.now() }));
            } catch {
              // Ignore localStorage quota
            }
          }

          resolve(result);
        } catch {
          detectLocationByIP().then(resolve);
        }
      },
      () => {
        // If GPS permission is denied or timed out, fallback to IP detection seamlessly
        detectLocationByIP().then(resolve);
      },
      {
        enableHighAccuracy: true,
        timeout: 8000,
        maximumAge: 120000,
      }
    );
  });
}
