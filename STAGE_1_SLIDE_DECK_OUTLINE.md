# FinFeasibility — Stage 1 Final Year Project Presentation (Slide-by-Slide Deck Guide)

**Project Title:** FinFeasibility: AI-Driven Hyper-Local Business Advisory and Financial Structuring Assistant for Rural Micro-Entrepreneurs  
**Degree:** Bachelor of Technology / Bachelor of Engineering (Final Year Capstone)  
**Team Members:**  
- **Shivraj (I4140)** — System Architecture, Next.js 15 Full-Stack & API Orchestration  
- **Om (I4141)** — Financial Math Engine, DSCR, EMI & Amortization Algorithms  
- **Rohan (I4142)** — Hyper-Local Market Intelligence, APMC Mandis & District Database  
- **Prem (I4144)** — Government Scheme Router, Multilingual Voice Assistant & DPR Generator  

---

## Slide Index & Presentation Strategy (Total Time: ~15-20 Mins)

| Slide # | Slide Title | Primary Speaker | Time |
| :---: | :--- | :---: | :---: |
| **1** | Title & Team Introduction | Shivraj | 1.0 min |
| **2** | Project Problem Statement & Motivation | Shivraj | 1.5 mins |
| **3** | Literature Survey & Gap Analysis | Rohan | 1.5 mins |
| **4** | System Architecture Overview | Shivraj | 2.0 mins |
| **5** | Stakeholder & Requirement Analysis (FRs & NFRs) | Rohan | 1.5 mins |
| **6** | Methodology & Core Mathematical Algorithms (DSCR, BEP, Amortization) | Om | 2.5 mins |
| **7** | Government Scheme Router & Subsidy Heuristics (PMEGP, MUDRA) | Prem | 2.0 mins |
| **8** | Structural Design: Class Diagram & Object Diagram | Om | 2.0 mins |
| **9** | Structural Design: Package Diagram & Modular Separation | Shivraj | 1.0 min |
| **10** | Behavioral Design: Use Case & Sequence Diagrams | Prem | 2.0 mins |
| **11** | Behavioral Design: End-to-End Activity Workflow | Prem | 1.5 mins |
| **12** | Stage 1 Implementation Status (30% Milestone Delivered) | Shivraj | 1.5 mins |
| **13** | Project Planning: WBS, Gantt Chart & RACI Matrix | Om | 1.5 mins |
| **14** | Conclusion, Expected Impact & Stage 2 Roadmap | Prem / Shivraj | 1.5 mins |
| **15** | Academic References | Rohan | 0.5 min |
| **16** | Q&A / Live Demonstration Slide | All Members | Open |

---

## Detailed Slide Content & Speaker Notes

### Slide 1: Title & Project Overview
- **Header:** Bachelor of Technology / Engineering Final Year Capstone Project (Stage 1)
- **Title:** **FinFeasibility**
- **Subtitle:** AI-Driven Hyper-Local Business Advisory and Financial Structuring Assistant for Rural Micro-Entrepreneurs
- **Category:** Software / Financial Technology (Fintech) & Rural Development
- **Presenter Names & Roll Numbers:** Shivraj (I4140), Om (I4141), Rohan (I4142), Prem (I4144)
- **Speaker Note (Shivraj):** *"Respected evaluators and guides, today our team presents FinFeasibility, an intelligent system designed to bridge the gap between rural aspiring entrepreneurs, government subsidy schemes, and formal scheduled commercial banking systems."*

---

### Slide 2: Project Problem Statement & Ground Realities
- **Bullet Points:**
  - **High Enterprise Mortality:** Over 65% of rural micro-enterprises in India close within 24–36 months due to uninformed business selection.
  - **Severe Loan Rejections:** Upwards of 60% of rural loan applications are rejected by banks due to substandard project reports, missing DSCR metrics, and poor financial structuring.
  - **Prohibitive Advisory Costs:** Hiring private financial consultants or CAs costs ₹10,000–₹35,000—unaffordable for someone starting a ₹2L–₹10L micro-business.
  - **Digital & Linguistic Divide:** Government schemes (PMEGP, MUDRA, PMFME) exist, but application procedures are confusing and largely inaccessible in regional vernacular languages.
- **Problem Formulation:**
  - *"How can we provide rural first-time entrepreneurs with instant, localized market feasibility insights, bank-compliant financial calculations, and government scheme routing in their native language at zero cost?"*

---

### Slide 3: Literature Survey & Gap Analysis
- **Key References Evaluated:**
  - *RBI Working Group on Digital Lending (2021)* — Stressed transparent pre-credit assessment for MSMEs.
  - *NABARD Financial Inclusion Survey (NAFIS, 2022)* — 74% of rural households face documentation hurdles.
  - *Sharma & Roy (2023)* — Hybrid rule-based banking models outperform raw LLMs in credit appraisal.
- **Comparative Analysis Table:**
  - Chartered Accountants: Expensive (₹15,000+), slow turnaround.
  - Government Portals: Fragmented administrative forms; no feasibility analysis.
  - Generic LLMs (ChatGPT): Hallucinates financial math, lacks Indian banking ratios (DSCR, BEP).
  - **FinFeasibility:** Deterministic banking math + real APMC district data + multilingual speech + instant bankable DPR.

---

### Slide 4: System Architecture
- **Visual:** *Show the High-Level 3-Tier Architecture Diagram from Report Chapter 2*
- **Key Points:**
  - **Tier 1 (Presentation):** Next.js 15 App Router, React 19, Tailwind CSS, Recharts, and Web Speech API.
  - **Tier 2 (Gateway & Application Services):** Serverless API routes (`/api/analyze-idea`, `/api/market-intelligence`, `/api/advisory-chat`).
  - **Tier 3 (Analytical Core & Data):**
    - Deterministic Banking Math Engine
    - Government Scheme Matching Rules
    - District Demographics & APMC Database
    - Google Gemini 3.8 / Flash Lite LLM with Offline Semantic Fallback Generator
    - Supabase PostgreSQL for persistent profile management

---

### Slide 5: Requirement Analysis
- **User Personas:**
  - Rural Micro-Entrepreneur (Primary User)
  - Bank Credit / Branch Officer (Secondary Stakeholder)
  - District Industries Centre (DIC) Facilitator (Tertiary Stakeholder)
- **Functional Requirements Highlights:**
  - FR1: Speech-to-Text & Text-to-Speech in 7 languages (Marathi, Hindi, English, etc.)
  - FR2: CapEx & OpEx automated decomposition
  - FR3: DSCR, BEP, and 3-Year Amortization Schedule calculation
  - FR4: Demographic-based subsidy routing (up to 35% under PMEGP)
  - FR5: 1-Click Bankable 10-Page DPR export
- **Non-Functional Requirements:**
  - Sub-100ms financial calculations, high fault tolerance with offline heuristic fallback, WCAG AA accessibility.

---

### Slide 6: Methodology & Core Mathematical Algorithms
- **Speaker:** Om (I4141)
- **1. Debt Service Coverage Ratio (DSCR):**
  $$\text{DSCR}_t = \frac{\text{Net Profit}_t + \text{Depreciation}_t + \text{Term Loan Interest}_t}{\text{Annual Principal Repayment}_t + \text{Term Loan Interest}_t}$$
  - *Bank Viability Standard:* Average DSCR $\ge 1.40$ (Target: 1.5 to 2.5).
- **2. Reducing Balance Loan Amortization (EMI):**
  $$\text{EMI} = \frac{P \cdot r \cdot (1 + r)^n}{(1 + r)^n - 1}$$
- **3. Break-Even Analysis (BEP):**
  - Evaluates Contribution Margin Ratio and Fixed Operating Costs.
  - *Bank Criterion:* Enterprise must break even at $\le 65\%$ capacity utilization.
- **4. 3-Year Operational Ramping:**
  - Modeled conservatively: Year 1 at 75% capacity, Year 2 at 90%, Year 3 at 100%.

---

### Slide 7: Government Scheme Router & Subsidy Heuristics
- **Speaker:** Prem (I4144)
- **Schemes Integrated:**
  - **PMEGP (KVIC):** Up to 35% capital subsidy for rural special-category entrepreneurs; 25% for general category.
  - **MUDRA (PMMY):** Shishu (up to ₹50k), Kishore (₹50k–₹5L), Tarun (₹5L–₹10L) collateral-free working capital.
  - **Stand-Up India:** Greenfield ventures between ₹10L and ₹1Cr specifically for SC/ST and Women entrepreneurs.
  - **PMFME (MoFPI):** 35% credit-linked subsidy on food processing micro-units under One District One Product (ODOP).
- **Automated Rules Matching:**
  - System automatically checks applicant age, gender, caste, location (rural/urban), and educational qualification.

---

### Slide 8: Structural Design — Class & Object Diagrams
- **Visuals:** *Mermaid Class Diagram & Object Diagram from Report Chapter 5.1*
- **Key Highlights:**
  - Object-oriented modeling of `EntrepreneurProfile`, `DistrictData`, `FinancialInputs`, `FinancialAnalysis`, `CashFlowYear`, and `SchemeRule`.
  - Object Diagram shows live snapshot of **Cold Pressed Mustard Oil Unit in Satara** (Project Cost: ₹15L, Subsidy: ₹5.25L, Own Contribution: ₹75,000, DSCR: 1.94).

---

### Slide 9: Structural Design — Package Diagram
- **Visual:** *Package Diagram from Report Chapter 5.1*
- **Modular Separation:**
  - `Presentation Tier` (`src/components`, `src/app`)
  - `Analytical Engine Tier` (`src/lib`)
  - `Data Models Tier` (`src/data`, `src/types`)
  - `Service Endpoints Tier` (`src/app/api`)
- *Ensures high cohesion, low coupling, and easy unit testability.*

---

### Slide 10: Behavioral Design — Use Case & Sequence Diagrams
- **Visuals:** *Use Case & Sequence Diagrams from Report Chapter 5.2*
- **Workflow Highlights:**
  - Voice/text input $\rightarrow$ AI CapEx decomposition $\rightarrow$ Banking Amortization execution $\rightarrow$ Scheme calculation $\rightarrow$ Interactive visual feedback $\rightarrow$ Printable Bankable DPR.

---

### Slide 11: Behavioral Design — Activity Diagram
- **Visual:** *Activity Diagram from Report Chapter 5.2*
- **Decision Nodes:**
  - Verification of API network connectivity (switches to offline fallback generator if offline).
  - Financial feasibility verification (Average DSCR $\ge 1.40$ and BEP $\le 65\%$).
  - If high-risk, prompts user with actionable mitigation advice.

---

### Slide 12: Stage 1 Implementation Status (30% Milestone)
- **Delivered Deliverables in Stage 1:**
  - Complete, functional Next.js 15 web application.
  - Fully implemented deterministic banking calculation engine (`financialCalculations.ts`).
  - Active Government Scheme Router (`schemeMatcher.ts`).
  - District Database with APMC Mandis, cold storages, and saturation metrics (`districts.ts`).
  - Hybrid Gemini AI analysis with fallback resilience.
  - Multi-page printable Bankable DPR generator (`DprDocument.tsx`).
  - Multilingual voice recognition & synthesis in 7 languages (`FinMitra Voice`).

---

### Slide 13: Project Planning & Management
- **Work Breakdown Structure (WBS):** 6 key modular work packages.
- **Gantt Chart:** Stage 1 (Foundation & Core) vs Stage 2 (Pan-India Data, User Pilot, Final Defense).
- **RACI Matrix:** Clear distribution of accountability among Shivraj, Om, Rohan, and Prem.
- **Risk Mitigation:**
  - Addressed LLM hallucination risk by executing all financial formulas deterministically in TypeScript.
  - Addressed internet downtime via local semantic fallback generation.

---

### Slide 14: Conclusion & Stage 2 Roadmap
- **Conclusion:**
  - FinFeasibility successfully solves the documentation, financial literacy, and subsidy discovery hurdles for rural micro-entrepreneurs.
  - Stage 1 goals (30% milestone) have been fully achieved, validated, and documented.
- **Stage 2 Roadmap:**
  - Expand database to cover 700+ Indian districts.
  - Conduct pilot testing with 25+ rural Self-Help Groups (SHGs) and Lead District Bank officers.
  - Implement full Progressive Web App (PWA) offline sync via IndexedDB.

---

### Slide 15: Academic References
- *RBI Digital Lending Report (2021)*
- *MSME Ministry Annual Report (2024)*
- *NABARD NAFIS Financial Inclusion Survey (2022)*
- *KVIC PMEGP Operational Guidelines (2023)*
- *IEEE Transactions on Computational Finance & AI (2024)*

---

### Slide 16: Live Demonstration & Thank You
- **Live System Demo Checklist:**
  1. Voice Input in Marathi/Hindi for a rural enterprise concept.
  2. Instant CapEx breakdown & 3-year cash flow visualization.
  3. Interactive tuning of promoter margin (5% to 10%) & interest rates.
  4. Automatic PMEGP 35% subsidy match display.
  5. One-click export of 10-page Bankable Detailed Project Report (DPR).
- **Thank You & Questions**
