import { NextRequest, NextResponse } from 'next/server';
import { GoogleGenAI } from '@google/genai';

interface ChatMessage {
  sender: 'user' | 'ai' | 'assistant';
  text: string;
}

interface AdvisoryChatRequest {
  message: string;
  history?: ChatMessage[];
  context?: {
    businessTitle?: string;
    domain?: string;
    category?: string;
    location?: string;
    projectCost?: number;
    subsidyAmount?: number;
    subsidyPercent?: number;
    dscr?: number;
    marginPercent?: number;
    rawMaterials?: string[];
    statutoryLicenses?: string[];
    eligibleSchemes?: Array<{ name: string; subsidyPercent?: number; code?: string }>;
    matchedInvestors?: Array<{ name: string; ticketSizeRange?: string }>;
  };
  language?: string;
  userApiKey?: string;
}

// Smart contextual fallback generator for when Gemini API key is absent or network fails
function generateSmartFallbackReply(
  userQuery: string,
  context?: AdvisoryChatRequest['context'],
  lang: string = 'en'
): string {
  const q = userQuery.trim().toLowerCase();
  const title = context?.businessTitle || 'your enterprise';
  const loc = context?.location || 'your region';
  const domain = context?.domain || 'Rural MSME';
  const cost = context?.projectCost ? `₹${(context.projectCost / 100000).toFixed(1)} Lakhs` : 'the planned CapEx';
  const subsidy = context?.subsidyAmount ? `₹${(context.subsidyAmount / 100000).toFixed(1)} Lakhs` : 'up to 35% capital subsidy';
  const dscr = context?.dscr ? context.dscr.toFixed(2) : '1.75';
  const margin = context?.marginPercent ? `${context.marginPercent}%` : '20-25%';

  // Greeting patterns
  if (/^(hi|hii|hello|hey|namaste|namaskar|good morning|good afternoon|good evening|yo|hola)\b/i.test(q)) {
    if (lang === 'mr') {
      return `नमस्कार! मी फिनमित्र - तुमचा AI ग्रामीण व्यवसाय सल्लागार. ${loc} मधील "${title}" प्रकल्पाबद्दल आपण काय जाणून घेऊ इच्छिता? अनुदान, आवश्यक परवाने, बँक कर्ज किंवा यंत्रसामग्रीबद्दल तुम्ही मला विचारू शकता.`;
    }
    if (lang === 'hi') {
      return `नमस्ते! मैं फिनमित्र - आपका AI ग्रामीण उद्योग सलाहकार हूँ। ${loc} में "${title}" के लिए आप क्या जानकारी चाहते हैं? बैंक लोन, PMEGP सब्सिडी, सरकारी लाइसेंस या मशीनरी के बारे में पूछ सकते हैं।`;
    }
    return `Hello! I'm FinMitra, your AI Rural Business & MSME Banking Advisor. How can I assist you with "${title}" in ${loc}? You can ask me about bank DPR requirements, PMEGP/Mudra subsidies, statutory licenses, machinery suppliers, or market pricing!`;
  }

  // Follow-up / "Anything else" / "What next" patterns
  if (/^(anything else|what else|what next|next step|more|kahi aani|kuch aur|aur batao)\b/i.test(q) || q.includes('anything else') || q.includes('what next')) {
    if (lang === 'mr') {
      return `होय, पुढील महत्त्वाच्या पायऱ्या खालीलप्रमाणे आहेत:
1. **सविस्तर प्रकल्प अहवाल (DPR)**: बँकेत सादर करण्यासाठी १.५+ DSCR असलेला DPR तयार करा.
2. **उद्यम नोंदणी (Udyam)**: भारत सरकारच्या MSME पोर्टलवर मोफत ऑनलाइन नोंदणी करा.
3. **PMEGP अर्ज**: kviconline.gov.in वर ३५% अनुदानासाठी ऑनलाइन अर्ज दाखल करा.
4. **स्थानिक परवाने**: ग्रामपंचायत/नगरपालिका NOC आणि प्रदूषण नियंत्रण मंडळाचे संमतीपत्र मिळवा.`;
    }
    return `Here are the immediate actionable next steps for "${title}" in ${loc}:
1. **Bank DPR Preparation**: Download your bank-grade Detailed Project Report showing healthy DSCR (${dscr}) to present to the local branch manager.
2. **Udyam MSME Registration**: Complete your instant free digital registration on udyamregistration.gov.in to unlock priority sector lending.
3. **PMEGP / PMFME Online Application**: Submit your subsidy application on kviconline.gov.in to lock in ${subsidy}.
4. **Vendor Machinery Quotations**: Collect 3 competitive proforma invoices from reputed equipment suppliers for bank margin validation.`;
  }

  // Licensing & Regulatory
  if (q.includes('license') || q.includes('fssai') || q.includes('registration') || q.includes('permit') || q.includes('gst') || q.includes('pervana')) {
    const lic = context?.statutoryLicenses?.length
      ? context.statutoryLicenses.join(', ')
      : 'Udyam MSME Registration, FSSAI Food License, State Pollution Control Board Consent (Green Category), Trade License, and Commercial Power Load Sanction';
    return `For "${title}" operating in ${loc}, mandatory statutory approvals and registrations include:
• **${lic}**
• **GST Registration**: Required if annual turnover exceeds ₹40 Lakhs (goods) or ₹20 Lakhs (services), though registering voluntarily helps claim Input Tax Credit on your ${cost} capital machinery.
• **Fire & Gram Panchayat NOC**: Recommended before installing heavy processing equipment.`;
  }

  // Subsidies & Schemes
  if (q.includes('subsidy') || q.includes('pmegp') || q.includes('scheme') || q.includes('pmfme') || q.includes('mudra') || q.includes('anudan') || q.includes('yojana')) {
    return `For your "${title}" project (${cost}):
• **PMEGP Scheme**: Offers up to 35% capital subsidy (${subsidy}) in rural areas for special categories (Women, SC/ST, OBC, Minorities, Ex-Servicemen). Promoter contribution required is only 5% to 10%.
• **PMFME Scheme**: Provides a 35% credit-linked capital subsidy (up to ₹10 Lakhs) for micro food and agro processing enterprises.
• **Mudra Loan (Tarun)**: Offers collateral-free working capital or term loan up to ₹10 Lakhs.
All applications are processed transparently via the National Jan Samarth or KVIC portal.`;
  }

  // Loan, Bank & DSCR
  if (q.includes('loan') || q.includes('bank') || q.includes('dscr') || q.includes('interest') || q.includes('emi') || q.includes('karj')) {
    return `Bank Appraisal Insights for "${title}":
• **Projected DSCR**: ${dscr} (Banks mandate a minimum of 1.40; your score of ${dscr} shows strong debt repayment capability).
• **Bank Financing**: Up to 70-75% of your ₹${(context?.projectCost || 1500000) / 100000} Lakhs project cost can be financed as a term loan over 5 to 7 years.
• **Estimated Interest**: Approx 8.5% to 10.5% p.a. under MSME priority sector lending.
• **Collateral**: Under CGTMSE, loans up to ₹2 Crore (and especially under ₹10-50 Lakhs) can be covered without third-party collateral!`;
  }

  // Machinery & CapEx
  if (q.includes('machine') || q.includes('equipment') || q.includes('capex') || q.includes('supplier') || q.includes('cost')) {
    return `Machinery & Plant Setup for "${title}":
• **Budget Allocation**: Estimated plant machinery accounts for roughly 60-70% of your total ${cost} CapEx.
• **Procurement Tip**: Always obtain at least 2 to 3 formal Proforma Invoices with GSTIN, 1-year OEM warranty, and on-site commissioning terms. Public sector banks require these quotes before sanctioning the disbursement.`;
  }

  // Investors & Equity
  if (q.includes('investor') || q.includes('equity') || q.includes('funding') || q.includes('vc') || q.includes('pitch')) {
    const inv = context?.matchedInvestors?.slice(0, 3).map(i => `${i.name} (${i.ticketSizeRange || 'Seed/Pre-Series A'})`).join(', ') || 'Omnivore, NABVENTURES, Caspian Debt';
    return `Venture & Institutional Investor Matching:
We matched key institutional impact funds active in ${domain}:
• **${inv}**
• **What They Look For**: Consistent gross margins above ${margin}, strong farmer/raw-material linkage in ${loc}, and scalable unit economics. Use the "Connect with Investors" section to generate your tailored pitch deck!`;
  }

  // Raw Materials & Suppliers
  if (q.includes('raw material') || q.includes('mandi') || q.includes('supply') || q.includes('sourcing') || q.includes('farmer')) {
    const raw = context?.rawMaterials?.join(', ') || 'Agricultural produce, food-grade packaging, and processing consumables';
    return `Supply Chain Strategy for "${title}" in ${loc}:
• **Key Raw Materials**: ${raw}.
• **Sourcing Recommendation**: Establish direct procurement MoUs with local Farmer Producer Organisations (FPOs) and regional APMC mandis within a 30-50 km radius to minimize freight overheads and eliminate middleman price volatility.`;
  }

  // General helpful response
  return `Regarding your question on "${userQuery}" for "${title}" in ${loc}:
FinFeasibility's AI appraisal shows an estimated net margin of ${margin} with ${cost} initial capital. To proceed safely, we recommend:
1. Verifying APMC raw material supply contracts during peak harvest seasons.
2. Applying for the 35% PMEGP/PMFME subsidy to reduce debt burden to approximately ${cost}.
3. Maintaining an average bank DSCR above ${dscr} to ensure seamless credit sanction.
Feel free to ask for specific licensing steps, machine specifications, or bank interview tips!`;
}

export async function POST(req: NextRequest) {
  try {
    const body: AdvisoryChatRequest = await req.json();
    const { message, history = [], context, language = 'en', userApiKey } = body;

    if (!message || typeof message !== 'string') {
      return NextResponse.json({ error: 'Please provide a valid query message.' }, { status: 400 });
    }

    const apiKey = userApiKey?.trim() || process.env.GEMINI_API_KEY || process.env.GOOGLE_API_KEY;

    if (apiKey) {
      try {
        const ai = new GoogleGenAI({ apiKey });

        const title = context?.businessTitle || 'Rural MSME Enterprise';
        const loc = context?.location || 'India';
        const domain = context?.domain || 'Agro & Rural Processing';
        const costLakhs = context?.projectCost ? (context.projectCost / 100000).toFixed(1) : '15.0';
        const subsidyLakhs = context?.subsidyAmount ? (context.subsidyAmount / 100000).toFixed(1) : '5.25';
        const dscr = context?.dscr ? context.dscr.toFixed(2) : '1.75';
        const margin = context?.marginPercent ? `${context.marginPercent}%` : '24%';
        const rawMaterials = context?.rawMaterials?.join(', ') || 'Local farm produce, packaging supplies';
        const licenses = context?.statutoryLicenses?.join(', ') || 'Udyam MSME, FSSAI, State Pollution Consent';
        const schemes = context?.eligibleSchemes?.map(s => `${s.name} (${s.subsidyPercent || 35}%)`).join(', ') || 'PMEGP (35%), PMFME (35%), Mudra';
        const investors = context?.matchedInvestors?.map(i => i.name).join(', ') || 'Omnivore, NABVENTURES, Caspian Debt';

        // Format recent chat history for context
        const recentHistory = history
          .slice(-6)
          .map(h => `${h.sender === 'user' ? 'User' : 'FinMitra'}: ${h.text}`)
          .join('\n');

        const systemPrompt = `You are "FinMitra", an elite, empathetic, and highly knowledgeable AI Rural Business Advisor and MSME Banking Specialist in India.
Your mission is to guide Indian entrepreneurs, farmers, women, and youth to start and scale viable micro/small enterprises.

ACTIVE ENTERPRISE APPRAISAL CONTEXT:
- Enterprise: "${title}"
- Location / Target Region: ${loc}
- Sector / Domain: ${domain} (${context?.category || 'Agro & Food Processing'})
- Total CapEx / Project Cost: ₹${costLakhs} Lakhs
- Eligible Subsidies: ${schemes} (Approx ₹${subsidyLakhs} Lakhs subsidy)
- Projected Net Profit Margin: ${margin}
- Bank DSCR (Debt Service Coverage Ratio): ${dscr} (Target is >1.5 for easy bank loan approval)
- Essential Raw Materials: ${rawMaterials}
- Statutory Licenses Needed: ${licenses}
- Matched Institutional Funds: ${investors}

CHAT CONVERSATION RULES:
1. Genuinely answer the user's specific question or statement. Do NOT give repetitive, hardcoded boilerplate.
2. If the user greets you ("hi", "hello", "namaste", etc.), respond warmly, introduce yourself briefly as FinMitra, mention "${title}" in ${loc}, and invite them to ask about subsidies, bank loans, machines, licenses, or marketing.
3. If the user asks "anything else" or "what next", give them the next 3-4 concrete practical steps in the launch journey (e.g., getting quotations for machines, filing Udyam registration, applying on PMEGP portal, meeting the bank branch manager).
4. If the user asks about specific topics (licenses, FSSAI, GST, bank loan, collateral, subsidy, machines, hiring, raw materials, marketing), provide precise, actionable, step-by-step guidance conforming to Indian MSME / banking norms (PMEGP, Mudra, CGTMSE, KVIC, NABARD).
5. If the user speaks or writes in Marathi or Hindi, reply in that language with correct grammar and business terms. If English, reply in clean, easy-to-read English.
6. Keep replies concise, structured, and easy to read on mobile or desktop (2 to 4 short paragraphs or bullet points). Avoid fluff.

RECENT CHAT HISTORY:
${recentHistory ? recentHistory : 'None (this is the start of the chat)'}

USER QUERY:
"${message}"

Provide your direct, helpful, expert answer as FinMitra:`;

        const response = await ai.models.generateContent({
          model: 'gemini-2.5-flash',
          contents: systemPrompt,
        });

        const reply = response.text?.trim();
        if (reply && reply.length > 5) {
          return NextResponse.json({
            success: true,
            reply,
            engine: 'Gemini 2.5 Flash'
          });
        }
      } catch (genAiError: any) {
        console.warn('Gemini chat API call fallback:', genAiError?.message || genAiError);
      }
    }

    // Smart contextual fallback when API key is missing or errored
    const fallbackReply = generateSmartFallbackReply(message, context, language);
    return NextResponse.json({
      success: true,
      reply: fallbackReply,
      engine: 'FinMitra Local Advisory Engine'
    });
  } catch (err: any) {
    console.error('Advisory chat error:', err);
    return NextResponse.json(
      { error: 'Failed to generate advisory response', details: err.message },
      { status: 500 }
    );
  }
}
