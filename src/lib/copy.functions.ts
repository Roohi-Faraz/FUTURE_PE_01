import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { buildPrompt, type GeneratedCopy } from "./copy-types";

const inputSchema = z.object({
  input: z.object({
    businessName: z.string().min(1).max(120),
    businessType: z.string().min(1).max(60),
    location: z.string().min(1).max(120),
    targetCustomers: z.string().min(1).max(300),
    services: z.string().min(1).max(1500),
    usp: z.string().min(1).max(600),
    tone: z.string().min(1).max(40),
    goal: z.string().min(1).max(60),
  }),
  section: z.enum(["homepage", "services", "ctas"]).optional(),
});

const homepageSchema = {
  type: "object",
  properties: {
    headline: { type: "string" },
    subheadline: { type: "string" },
    valueProposition: { type: "string" },
    intro: { type: "string" },
    benefits: { type: "array", items: { type: "object", properties: { title: { type: "string" }, description: { type: "string" } }, required: ["title", "description"] } },
    trust: { type: "object", properties: { heading: { type: "string" }, points: { type: "array", items: { type: "string" } } }, required: ["heading", "points"] },
  },
  required: ["headline", "subheadline", "valueProposition", "intro", "benefits", "trust"],
};
const servicesSchema = { type: "array", items: { type: "object", properties: { name: { type: "string" }, description: { type: "string" }, benefit: { type: "string" } }, required: ["name", "description", "benefit"] } };
const ctasSchema = { type: "array", items: { type: "object", properties: { purpose: { type: "string" }, heading: { type: "string" }, supporting: { type: "string" }, button: { type: "string" } }, required: ["purpose", "heading", "supporting", "button"] } };

export type GenerateResult = { ok: true; data: Partial<GeneratedCopy>; source: "ai" } | { ok: false; error: string };

export const generateCopy = createServerFn({ method: "POST" })
  .inputValidator((d) => inputSchema.parse(d))
  .handler(async ({ data }): Promise<GenerateResult> => {
    const key = process.env.LOVABLE_API_KEY;
    if (!key) return { ok: false, error: "no_key" };
    const props: Record<string, unknown> = {};
    if (!data.section || data.section === "homepage") props.homepage = homepageSchema;
    if (!data.section || data.section === "services") props.services = servicesSchema;
    if (!data.section || data.section === "ctas") props.ctas = ctasSchema;
    try {
      const res = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
        method: "POST",
        headers: { Authorization: `Bearer ${key}`, "Content-Type": "application/json" },
        body: JSON.stringify({
          model: "google/gemini-3-flash-preview",
          messages: [
            { role: "system", content: "You write website-ready copy for local businesses. Return results only via the provided tool." },
            { role: "user", content: buildPrompt(data.input, data.section) },
          ],
          tools: [{ type: "function", function: { name: "return_copy", description: "Return the website copy", parameters: { type: "object", properties: props, required: Object.keys(props) } } }],
          tool_choice: { type: "function", function: { name: "return_copy" } },
        }),
      });
      if (res.status === 429) return { ok: false, error: "rate_limited" };
      if (res.status === 402) return { ok: false, error: "credits" };
      if (!res.ok) return { ok: false, error: `ai_${res.status}` };
      const json = await res.json();
      const args = json?.choices?.[0]?.message?.tool_calls?.[0]?.function?.arguments;
      if (!args) return { ok: false, error: "empty" };
      return { ok: true, data: JSON.parse(args), source: "ai" };
    } catch (e) {
      console.error("generateCopy failed", e);
      return { ok: false, error: "network" };
    }
  });
