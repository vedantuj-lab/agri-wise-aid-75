import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

const GATEWAY = "https://ai.gateway.lovable.dev/v1/chat/completions";
const MODEL = "google/gemini-3.6-flash";

const DiagnoseInput = z.object({
  image: z.string().min(20), // data:image/...;base64,...
  crop: z.string().default("unknown"),
  language: z.string().default("English"),
  location: z.string().default("Nashik, Maharashtra, India"),
});

const ChatInput = z.object({
  messages: z.array(
    z.object({ role: z.enum(["user", "assistant"]), content: z.string().min(1) }),
  ),
  language: z.string().default("English"),
  context: z.string().default(""),
});

async function callGateway(body: unknown) {
  const key = process.env["LOVABLE_API_KEY"];
  if (!key) throw new Error("AI service is not configured.");

  const res = await fetch(GATEWAY, {
    method: "POST",
    headers: { "Content-Type": "application/json", "Lovable-API-Key": key },
    body: JSON.stringify(body),
  });

  if (res.status === 429) throw new Error("Too many requests right now — try again in a moment.");
  if (res.status === 402) throw new Error("AI credits exhausted for this workspace.");
  if (!res.ok) throw new Error(`AI request failed (${res.status}): ${await res.text()}`);

  const json = (await res.json()) as {
    choices?: Array<{ message?: { content?: string } }>;
  };
  return json.choices?.[0]?.message?.content ?? "";
}

function extractJson(text: string) {
  const fenced = text.match(/```(?:json)?\s*([\s\S]*?)```/);
  const raw = fenced ? fenced[1] : text;
  const start = raw.indexOf("{");
  const end = raw.lastIndexOf("}");
  if (start === -1 || end === -1) throw new Error("Could not read the diagnosis response.");
  return JSON.parse(raw.slice(start, end + 1));
}

export type Diagnosis = {
  crop: string;
  disease: string;
  scientificName: string;
  confidence: number;
  severity: "Low" | "Moderate" | "High" | "Severe";
  spreadRisk: string;
  summary: string;
  organicTreatment: string[];
  chemicalTreatment: string[];
  preventive: string[];
  regenerativeTip: string;
};

export const diagnoseCrop = createServerFn({ method: "POST" })
  .inputValidator((d: unknown) => DiagnoseInput.parse(d))
  .handler(async ({ data }): Promise<Diagnosis> => {
    const content = await callGateway({
      model: MODEL,
      messages: [
        {
          role: "system",
          content:
            "You are AgriN, an expert plant pathologist advising smallholder farmers in BRICS nations. " +
            "Diagnose crop disease or pest damage from the photo. Prefer organic, regenerative, low-cost interventions first. " +
            "Reply with ONLY a JSON object, no prose, using this shape: " +
            '{"crop":string,"disease":string,"scientificName":string,"confidence":number(0-100),' +
            '"severity":"Low"|"Moderate"|"High"|"Severe","spreadRisk":string,"summary":string,' +
            '"organicTreatment":string[],"chemicalTreatment":string[],"preventive":string[],"regenerativeTip":string}',
        },
        {
          role: "user",
          content: [
            {
              type: "text",
              text:
                `Farmer's stated crop: ${data.crop}. Plot location: ${data.location}. ` +
                `Write every human-readable value in ${data.language}. Keep sentences short and plain.`,
            },
            { type: "image_url", image_url: { url: data.image } },
          ],
        },
      ],
    });

    const parsed = extractJson(content);
    return {
      crop: String(parsed.crop ?? data.crop),
      disease: String(parsed.disease ?? "Unidentified condition"),
      scientificName: String(parsed.scientificName ?? ""),
      confidence: Math.max(0, Math.min(100, Number(parsed.confidence) || 0)),
      severity: (["Low", "Moderate", "High", "Severe"].includes(parsed.severity)
        ? parsed.severity
        : "Moderate") as Diagnosis["severity"],
      spreadRisk: String(parsed.spreadRisk ?? ""),
      summary: String(parsed.summary ?? ""),
      organicTreatment: (parsed.organicTreatment ?? []).map(String),
      chemicalTreatment: (parsed.chemicalTreatment ?? []).map(String),
      preventive: (parsed.preventive ?? []).map(String),
      regenerativeTip: String(parsed.regenerativeTip ?? ""),
    };
  });

export const askAgronomist = createServerFn({ method: "POST" })
  .inputValidator((d: unknown) => ChatInput.parse(d))
  .handler(async ({ data }) => {
    const content = await callGateway({
      model: MODEL,
      messages: [
        {
          role: "system",
          content:
            "You are AgriN, a regenerative-agriculture agronomist for smallholder farmers. " +
            "Ground every answer in the farmer's plot data below. Be concrete: name quantities, timings and low-cost organic options first. " +
            "Answer in short paragraphs or bullets, max ~150 words, in " +
            data.language +
            ".\n\nPLOT DATA:\n" +
            data.context,
        },
        ...data.messages,
      ],
    });
    return { reply: content };
  });
