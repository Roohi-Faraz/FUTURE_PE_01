export const BUSINESS_TYPES = ["Salon", "Cafe", "Restaurant", "Clinic", "Gym", "Agency", "Tutor", "Repair Service", "Retail Store", "Other"] as const;
export const TONES = ["Professional", "Friendly", "Premium", "Casual", "Trustworthy", "Modern"] as const;
export const GOALS = ["Get More Calls", "Get More Bookings", "Get More Enquiries", "Increase Store Visits", "Generate Leads"] as const;

export type BusinessInput = {
  businessName: string;
  businessType: string;
  location: string;
  targetCustomers: string;
  services: string;
  usp: string;
  tone: string;
  goal: string;
};

export type HomepageCopy = {
  headline: string;
  subheadline: string;
  valueProposition: string;
  intro: string;
  benefits: { title: string; description: string }[];
  trust: { heading: string; points: string[] };
};
export type ServiceCopy = { name: string; description: string; benefit: string };
export type CtaCopy = { purpose: string; heading: string; supporting: string; button: string };

export type GeneratedCopy = { homepage: HomepageCopy; services: ServiceCopy[]; ctas: CtaCopy[] };
export type Section = "homepage" | "services" | "ctas";

export const EMPTY_INPUT: BusinessInput = {
  businessName: "", businessType: "", location: "", targetCustomers: "",
  services: "", usp: "", tone: "Friendly", goal: "Get More Bookings",
};

export const EXAMPLE_INPUT: BusinessInput = {
  businessName: "Glow Studio",
  businessType: "Salon",
  location: "Bengaluru",
  targetCustomers: "Women looking for professional hair and beauty services",
  services: "Haircuts, Hair coloring, Hair spa, Bridal makeup",
  usp: "Personalized beauty services with experienced professionals",
  tone: "Friendly",
  goal: "Get More Bookings",
};

const TYPE_GUIDANCE: Record<string, string> = {
  Salon: "Use warm, confidence-boosting beauty and self-care language; emphasise expertise, hygiene and how customers will look and feel.",
  Cafe: "Use hospitality language: atmosphere, freshness, comfort, a place to meet or work.",
  Restaurant: "Use appetising, sensory food language; highlight dining experience, freshness and occasions.",
  Clinic: "Use calm, trustworthy healthcare language; emphasise qualified care, safety, clarity and patient comfort. Never make medical guarantees.",
  Gym: "Use motivating, results-focused fitness language; emphasise coaching, progress and community.",
  Agency: "Use clear B2B language focused on measurable outcomes, process and ROI.",
  Tutor: "Use reassuring education language aimed at students and parents; emphasise progress, confidence and personal attention.",
  "Repair Service": "Use dependable, practical language; emphasise speed, fair pricing, skilled technicians and guarantees.",
  "Retail Store": "Use inviting shopping language; emphasise selection, quality, helpful staff and reasons to visit in person.",
  Other: "Adapt the language to the described services and customers.",
};

export function buildPrompt(i: BusinessInput, section?: Section): string {
  const want = section === "homepage" ? "Only regenerate the homepage copy (fresh angle)."
    : section === "services" ? "Only regenerate the service descriptions (fresh angle)."
    : section === "ctas" ? "Only regenerate the CTA sections (fresh angle)."
    : "Generate:\n1. Homepage copy\n2. Service descriptions\n3. CTA sections";
  return `You are an expert website copywriter specializing in local businesses.

Create conversion-focused website copy for:

Business Name: ${i.businessName}
Business Type: ${i.businessType}
Location: ${i.location}
Target Customers: ${i.targetCustomers}
Services: ${i.services}
Unique Selling Point: ${i.usp}
Brand Tone: ${i.tone}
Primary Goal: ${i.goal}

${want}

Industry guidance: ${TYPE_GUIDANCE[i.businessType] ?? TYPE_GUIDANCE.Other!}

Requirements:
- Keep the language simple and natural.
- Clearly communicate customer benefits.
- Adapt the writing to the business type.
- Use the selected tone (${i.tone}).
- Include location naturally where appropriate.
- Focus on the customer's needs.
- Make the content ready to paste directly into a website.
- Avoid generic filler text and jargon.
- Write one service entry for every listed service.
- Write 3-4 CTA variations whose purpose supports the goal "${i.goal}".`;
}

export function sectionToText(copy: GeneratedCopy, s: Section): string {
  if (s === "homepage") {
    const h = copy.homepage;
    return [
      `HERO HEADLINE\n${h.headline}`,
      `HERO SUBHEADLINE\n${h.subheadline}`,
      `VALUE PROPOSITION\n${h.valueProposition}`,
      `ABOUT US\n${h.intro}`,
      `KEY BENEFITS\n${h.benefits.map((b) => `• ${b.title} — ${b.description}`).join("\n")}`,
      `${h.trust.heading.toUpperCase()}\n${h.trust.points.map((p) => `• ${p}`).join("\n")}`,
    ].join("\n\n");
  }
  if (s === "services") {
    return copy.services.map((v) => `${v.name}\n${v.description}\nWhy it matters: ${v.benefit}`).join("\n\n");
  }
  return copy.ctas.map((c) => `[${c.purpose}]\n${c.heading}\n${c.supporting}\nButton: ${c.button}`).join("\n\n");
}
