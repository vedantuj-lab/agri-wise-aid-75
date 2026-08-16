import { createFileRoute } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import { Loader2, Mic, Send, Sparkles } from "lucide-react";

import { SiteShell } from "@/components/SiteShell";
import { askAgronomist } from "@/lib/agri.functions";
import { plot, plotContext } from "@/lib/plot-data";

export const Route = createFileRoute("/assistant")({
  head: () => ({
    meta: [
      { title: "Multilingual Farm Assistant — AgriN" },
      {
        name: "description",
        content:
          "Ask farming questions by voice or text in your own language and get answers grounded in your plot's satellite, soil and weather data.",
      },
      { property: "og:title", content: "Multilingual Farm Assistant — AgriN" },
      {
        property: "og:description",
        content: "A grounded, plot-specific agronomist that answers in the farmer's own language.",
      },
    ],
  }),
  component: Assistant,
});

const languages = ["English", "हिन्दी (Hindi)", "मराठी (Marathi)", "Português", "Русский", "中文", "isiZulu"];

const starters = [
  "Why are my tomato leaves curling?",
  "Should I irrigate this week?",
  "Which cover crop suits my black soil after harvest?",
  "Is it safe to spray before the weekend rain?",
];

type Msg = { role: "user" | "assistant"; content: string };

function Assistant() {
  const [language, setLanguage] = useState("English");
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<Msg[]>([]);

  const run = useServerFn(askAgronomist);
  const mutation = useMutation({
    mutationFn: (next: Msg[]) => run({ data: { messages: next, language, context: plotContext } }),
    onSuccess: (res) => setMessages((m) => [...m, { role: "assistant", content: res.reply }]),
  });

  const send = (text: string) => {
    const trimmed = text.trim();
    if (!trimmed || mutation.isPending) return;
    const next: Msg[] = [...messages, { role: "user", content: trimmed }];
    setMessages(next);
    setInput("");
    mutation.mutate(next);
  };

  return (
    <SiteShell>
      <section className="surface-field border-b border-border">
        <div className="mx-auto max-w-6xl px-4 py-12">
          <span className="text-xs uppercase tracking-widest text-muted-foreground">
            Conversational advisory
          </span>
          <h1 className="mt-3 text-4xl">Ask your agronomist anything</h1>
          <p className="mt-3 max-w-2xl text-muted-foreground">
            Free-form questions by voice or text, answered in the farmer's language and grounded in
            plot {plot.id}'s live satellite, soil and weather readings.
          </p>
        </div>
      </section>

      <div className="mx-auto grid max-w-6xl gap-6 px-4 py-10 lg:grid-cols-[1fr_320px]">
        <div className="flex min-h-[540px] flex-col rounded-3xl border border-border bg-card shadow-field">
          <div className="flex-1 space-y-4 overflow-y-auto p-6">
            {messages.length === 0 ? (
              <div className="rounded-2xl border border-border bg-secondary/40 p-5 text-sm">
                <p className="flex items-center gap-2 font-medium">
                  <Sparkles className="size-4 text-primary" /> Try one of these
                </p>
                <div className="mt-3 flex flex-wrap gap-2">
                  {starters.map((s) => (
                    <button
                      key={s}
                      type="button"
                      onClick={() => send(s)}
                      className="rounded-full border border-border bg-card px-3 py-1.5 text-xs transition-colors hover:bg-secondary"
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>
            ) : null}

            {messages.map((m, i) => (
              <div
                key={i}
                className={m.role === "user" ? "flex justify-end" : "flex justify-start"}
              >
                <div
                  className={`max-w-[85%] whitespace-pre-wrap rounded-2xl px-4 py-3 text-sm ${
                    m.role === "user"
                      ? "bg-primary text-primary-foreground"
                      : "border border-border bg-secondary/50"
                  }`}
                >
                  {m.content}
                </div>
              </div>
            ))}

            {mutation.isPending ? (
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Loader2 className="size-4 animate-spin" /> Reading your plot data…
              </div>
            ) : null}

            {mutation.isError ? (
              <p className="rounded-xl bg-destructive/10 px-3 py-2 text-sm text-destructive">
                {(mutation.error as Error).message}
              </p>
            ) : null}
          </div>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              send(input);
            }}
            className="flex items-center gap-2 border-t border-border p-4"
          >
            <button
              type="button"
              title="Voice input (Speech-to-Text)"
              className="rounded-xl border border-border p-3 text-muted-foreground transition-colors hover:bg-secondary"
            >
              <Mic className="size-4" />
            </button>
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask in any language…"
              className="flex-1 rounded-xl border border-input bg-background px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-ring"
            />
            <button
              type="submit"
              disabled={mutation.isPending}
              className="rounded-xl bg-primary p-3 text-primary-foreground disabled:opacity-50"
            >
              <Send className="size-4" />
            </button>
          </form>
        </div>

        <aside className="space-y-4">
          <div className="rounded-3xl border border-border bg-card p-5 shadow-field">
            <p className="text-xs uppercase tracking-widest text-muted-foreground">Answer language</p>
            <select
              value={language}
              onChange={(e) => setLanguage(e.target.value)}
              className="mt-2 w-full rounded-xl border border-input bg-background px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-ring"
            >
              {languages.map((l) => (
                <option key={l} value={l}>
                  {l}
                </option>
              ))}
            </select>
          </div>

          <div className="rounded-3xl border border-border bg-card p-5 text-sm shadow-field">
            <p className="text-xs uppercase tracking-widest text-muted-foreground">
              Grounding context (synthetic demo plot)
            </p>
            <dl className="mt-3 space-y-2">
              {[
                ["Plot", plot.id],
                ["Farmer", plot.farmer],
                ["Location", `${plot.village}, ${plot.country}`],
                ["Crop", plot.crop],
                ["Soil", `${plot.soilType} · pH ${plot.soilPh}`],
                ["NDVI", "0.51 (regional 0.61)"],
                ["Soil moisture", "38% VWC, recovering"],
                ["Forecast", "~57 mm rain Thu–Sun"],
              ].map(([k, v]) => (
                <div key={k} className="flex justify-between gap-3 border-b border-border/60 pb-2">
                  <dt className="text-muted-foreground">{k}</dt>
                  <dd className="text-right">{v}</dd>
                </div>
              ))}
            </dl>
          </div>
        </aside>
      </div>
    </SiteShell>
  );
}
