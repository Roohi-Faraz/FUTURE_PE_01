import type { BusinessInput, CtaCopy, GeneratedCopy, HomepageCopy, ServiceCopy } from "./copy-types";

type Voice = { noun: string; feel: string; promise: string; benefits: [string, string][]; trust: string[] };

const VOICES: Record<string, Voice> = {
  Salon: { noun: "salon", feel: "look and feel your best", promise: "styles that suit you", benefits: [["Expert stylists", "Trained professionals who listen before they cut, colour or style."], ["Hygienic & relaxing", "Clean tools, quality products and a calm space to unwind."], ["Made for you", "Every look is tailored to your hair, skin and lifestyle."]], trust: ["Hundreds of happy regular clients", "Premium, skin-safe products", "Easy online booking and on-time appointments"] },
  Cafe: { noun: "cafe", feel: "slow down and enjoy", promise: "fresh coffee and good food", benefits: [["Fresh every day", "Coffee brewed to order and food made in-house."], ["A cosy place to stay", "Comfortable seating, friendly faces and free Wi-Fi."], ["Neighbourhood favourite", "A spot to meet friends, work or take a quiet break."]], trust: ["Loved by locals and regulars", "Quality ingredients from trusted suppliers", "Friendly staff who remember your order"] },
  Restaurant: { noun: "restaurant", feel: "sit back and savour every bite", promise: "honest, flavourful food", benefits: [["Cooked fresh", "Every dish is prepared to order with quality ingredients."], ["Warm hospitality", "Attentive service that makes every visit feel special."], ["For every occasion", "Family dinners, date nights and celebrations."]], trust: ["Highly rated by local diners", "Strict kitchen hygiene standards", "Easy table reservations"] },
  Clinic: { noun: "clinic", feel: "feel cared for and confident about your health", promise: "clear, qualified care", benefits: [["Qualified professionals", "Experienced practitioners who explain every step."], ["Safe & hygienic", "Modern equipment and strict safety protocols."], ["Patient-first", "Short waits, honest advice and follow-up you can rely on."]], trust: ["Qualified and registered practitioners", "Transparent consultations and pricing", "Trusted by families across the area"] },
  Gym: { noun: "gym", feel: "get stronger and stay motivated", promise: "real, lasting results", benefits: [["Expert coaching", "Trainers who build a plan around your goals."], ["Modern equipment", "Everything you need for strength, cardio and mobility."], ["Supportive community", "Train alongside people who push you forward."]], trust: ["Certified personal trainers", "Flexible memberships, no hidden fees", "Real member transformations"] },
  Agency: { noun: "agency", feel: "grow with confidence", promise: "measurable results", benefits: [["Clear strategy", "A plan tied to your business goals, not vanity metrics."], ["Hands-on team", "Specialists who treat your brand like their own."], ["Transparent reporting", "Simple updates that show exactly what's working."]], trust: ["Proven results for local businesses", "Straightforward pricing and timelines", "Dedicated point of contact"] },
  Tutor: { noun: "tutoring service", feel: "learn with confidence", promise: "steady, visible progress", benefits: [["Personal attention", "Lessons shaped around each student's pace and gaps."], ["Better results", "Clear goals, regular practice and measurable improvement."], ["Parent updates", "Regular feedback so you always know how things are going."]], trust: ["Experienced, patient tutors", "Proven improvement in grades", "Flexible lesson timings"] },
  "Repair Service": { noun: "repair service", feel: "get things working again fast", promise: "reliable, affordable repairs", benefits: [["Fast turnaround", "Quick diagnosis and most repairs done the same day."], ["Skilled technicians", "Trained experts who fix it right the first time."], ["Fair pricing", "Upfront quotes with no surprise charges."]], trust: ["Warranty on parts and labour", "Hundreds of successful repairs", "Transparent, upfront quotes"] },
  "Retail Store": { noun: "store", feel: "find exactly what you need", promise: "quality products and helpful service", benefits: [["Great selection", "Carefully chosen products you'll love using."], ["Helpful staff", "Friendly advice to help you choose with confidence."], ["Worth the visit", "See, touch and try before you buy."]], trust: ["Trusted by local shoppers", "Easy exchanges and returns", "Genuine, quality-checked products"] },
};
VOICES.Other = { noun: "business", feel: "get the service you deserve", promise: "dependable, friendly service", benefits: [["Experienced team", "People who know their craft and care about the details."], ["Customer-first", "We listen, advise honestly and deliver on our word."], ["Local & reliable", "Right here in your neighbourhood when you need us."]], trust: ["Trusted by local customers", "Clear, fair pricing", "Friendly, responsive support"] };

const TONE_OPENERS: Record<string, string[]> = {
  Professional: ["Trusted", "Reliable", "Expert"],
  Friendly: ["Your friendly", "Your favourite", "Welcome to your"],
  Premium: ["Exceptional", "Refined", "The finest"],
  Casual: ["Your go-to", "Easy, no-fuss", "Your local"],
  Trustworthy: ["Dependable", "Honest", "Trusted"],
  Modern: ["Smarter", "Fresh, modern", "Next-level"],
};

const GOAL_CTAS: Record<string, [string, string, string][]> = {
  "Get More Calls": [["Contact", "Speak to us today", "Call now"], ["Request a quote", "Get a quick answer", "Call for a free quote"], ["Contact", "Questions? We're one call away", "Call us"]],
  "Get More Bookings": [["Book an appointment", "Book your appointment", "Book now"], ["Book an appointment", "Pick a time that suits you", "Reserve your slot"], ["Contact", "Not sure what to choose?", "Talk to us"]],
  "Get More Enquiries": [["Make an enquiry", "Tell us what you need", "Send an enquiry"], ["Request a quote", "Get a personalised quote", "Request a quote"], ["Contact", "Have a question?", "Ask us anything"]],
  "Increase Store Visits": [["Visit the business", "Come see us in person", "Get directions"], ["Visit the business", "Drop in this week", "Plan your visit"], ["Contact", "Check today's hours", "See opening times"]],
  "Generate Leads": [["Request a quote", "Get your free consultation", "Get started free"], ["Make an enquiry", "See what we can do for you", "Request a callback"], ["Contact", "Let's talk about your goals", "Contact us"]],
};

const pick = <T,>(a: T[], seed: number) => a[Math.abs(seed) % a.length]!;

export function mockHomepage(i: BusinessInput, seed = 0): HomepageCopy {
  const v = VOICES[i.businessType] ?? VOICES.Other!;
  const opener = pick(TONE_OPENERS[i.tone] ?? TONE_OPENERS.Friendly!, seed);
  const loc = i.location || "your area";
  const headlines = [
    `${opener} ${v.noun} in ${loc}`,
    `Helping ${loc} ${v.feel}`,
    `${v.promise[0].toUpperCase()}${v.promise.slice(1)}, right here in ${loc}`,
  ];
  return {
    headline: pick(headlines, seed),
    subheadline: `${i.businessName} offers ${i.services.toLowerCase()} for ${i.targetCustomers.toLowerCase()}, so you can ${v.feel}.`,
    valueProposition: `${i.usp}. That's why people across ${loc} choose ${i.businessName} for ${v.promise}.`,
    intro: `${i.businessName} is a ${v.noun} in ${loc} built around one idea: making it easy for ${i.targetCustomers.toLowerCase()} to ${v.feel}. From your first visit, you'll notice the difference — ${i.usp.toLowerCase()}.`,
    benefits: v.benefits.map(([title, description]) => ({ title, description })),
    trust: { heading: `Why ${loc} trusts ${i.businessName}`, points: v.trust },
  };
}

export function mockServices(i: BusinessInput, seed = 0): ServiceCopy[] {
  const v = VOICES[i.businessType] ?? VOICES.Other!;
  const list = i.services.split(/,|\n/).map((s) => s.trim()).filter(Boolean);
  const leads = ["Enjoy", "Experience", "Discover"];
  return list.map((name, idx) => ({
    name: name[0].toUpperCase() + name.slice(1),
    description: `${pick(leads, seed + idx)} ${name.toLowerCase()} delivered by our team at ${i.businessName}, with the care and attention ${i.targetCustomers.toLowerCase()} expect.`,
    benefit: `You get ${v.promise} and the confidence that it's done right — ${i.usp.toLowerCase()}.`,
  }));
}

export function mockCtas(i: BusinessInput, seed = 0): CtaCopy[] {
  const set = GOAL_CTAS[i.goal] ?? GOAL_CTAS["Get More Enquiries"]!;
  const rotated = [...set.slice(seed % set.length), ...set.slice(0, seed % set.length)];
  return rotated.map(([purpose, heading, button]) => ({
    purpose,
    heading,
    supporting: `${i.businessName} makes it easy for ${i.targetCustomers.toLowerCase()} in ${i.location} to get started. It only takes a minute.`,
    button,
  }));
}

export function mockCopy(i: BusinessInput, seed = 0): GeneratedCopy {
  return { homepage: mockHomepage(i, seed), services: mockServices(i, seed), ctas: mockCtas(i, seed) };
}
