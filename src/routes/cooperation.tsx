import { createFileRoute } from "@tanstack/react-router";
import { Globe2, Lock, RefreshCcw, Share2 } from "lucide-react";

import { SiteShell } from "@/components/SiteShell";
import { hotspots } from "@/lib/plot-data";

export const Route = createFileRoute("/cooperation")({
  head: () => ({
    meta: [
      { title: "Cross-Border Data Cooperation — AgriN" },
      {
        name: "description",
        content:
          "A federated model-sharing layer so a crop-disease model trained in one BRICS nation improves outcomes in another, without raw data leaving the country.",
      },
      { property: "og:title", content: "Cross-Border Data Cooperation — AgriN" },
      {
        property: "og:description",
        content: "Federated learning across BRICS agriculture ministries — shared models, sovereign data.",
      },
    ],
  }),
  component: Cooperation,
});

const nations = [
  { flag: "🇧🇷", name: "Brazil", node: "Mato Grosso node", crops: "Soybean, maize", updates: "412 model deltas / week" },
  { flag: "🇷🇺", name: "Russia", node: "Krasnodar node", crops: "Wheat, sunflower", updates: "188 model deltas / week" },
  { flag: "🇮🇳", name: "India", node: "Nashik node", crops: "Tomato, cotton, rice", updates: "1,204 model deltas / week" },
  { flag: "🇨🇳", name: "China", node: "Henan node", crops: "Wheat, rice", updates: "947 model deltas / week" },
  { flag: "🇿🇦", name: "South Africa", node: "Free State node", crops: "Maize, citrus", updates: "231 model deltas / week" },
];

const steps = [
  {
    icon: Lock,
    title: "Data stays home",
    body: "Each national node trains locally on its own farmer photos and plot records. Raw imagery and personal data never cross a border.",
  },
  {
    icon: Share2,
    title: "Only gradients travel",
    body: "Nodes exchange anonymised, encrypted model updates — weight deltas, not records — on a fixed federation schedule.",
  },
  {
    icon: RefreshCcw,
    title: "Everyone gets the better model",
    body: "A rust-detection improvement learned on Brazilian soy lifts wheat rust accuracy in Krasnodar and Henan within the same cycle.",
  },
  {
    icon: Globe2,
    title: "Shared public good",
    body: "The federated model is published under open terms with APIs for state agriculture departments — a genuine Digital Public Good.",
  },
];

function Cooperation() {
  return (
    <SiteShell>
      <section className="surface-field border-b border-border">
        <div className="mx-auto max-w-6xl px-4 py-12">
          <span className="text-xs uppercase tracking-widest text-muted-foreground">
            Theme: Cooperation
          </span>
          <h1 className="mt-3 text-4xl">Shared models. Sovereign data.</h1>
          <p className="mt-3 max-w-2xl text-muted-foreground">
            A disease-detection model trained on Indian cotton should be allowed to improve a
            similar model in Brazil or South Africa — without a single raw record leaving the
            country of origin. That is the cooperation layer AgriN is designed around.
          </p>
        </div>
      </section>

      <div className="mx-auto max-w-6xl space-y-8 px-4 py-10">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {steps.map((s) => (
            <div key={s.title} className="rounded-3xl border border-border bg-card p-5 shadow-field">
              <span className="flex size-10 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                <s.icon className="size-5" />
              </span>
              <h2 className="mt-4 text-xl">{s.title}</h2>
              <p className="mt-2 text-sm text-muted-foreground">{s.body}</p>
            </div>
          ))}
        </div>

        <section className="ridge-lines rounded-3xl border border-border p-6">
          <h2 className="text-2xl">Federation nodes</h2>
          <p className="mt-1 text-sm text-muted-foreground">
            Illustrative demo figures for the five BRICS founding members.
          </p>
          <div className="mt-6 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {nations.map((n) => (
              <div key={n.name} className="rounded-2xl border border-border bg-card p-5 shadow-field">
                <p className="text-3xl">{n.flag}</p>
                <p className="mt-2 font-display text-xl">{n.name}</p>
                <p className="text-sm text-muted-foreground">{n.node}</p>
                <dl className="mt-4 space-y-1 text-sm">
                  <div className="flex justify-between gap-3">
                    <dt className="text-muted-foreground">Crops</dt>
                    <dd className="text-right">{n.crops}</dd>
                  </div>
                  <div className="flex justify-between gap-3">
                    <dt className="text-muted-foreground">Contribution</dt>
                    <dd className="text-right">{n.updates}</dd>
                  </div>
                </dl>
              </div>
            ))}
          </div>
        </section>

        <section className="rounded-3xl border border-border bg-card p-6 shadow-field">
          <h2 className="text-2xl">What the federation sees</h2>
          <p className="mt-1 text-sm text-muted-foreground">
            Aggregate, anonymised outbreak signals — never individual farmers.
          </p>
          <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {hotspots.map((h) => (
              <div key={h.region} className="rounded-2xl border border-border p-4">
                <p className="text-sm font-medium">{h.region}</p>
                <p className="text-sm text-muted-foreground">
                  {h.crop} · {h.issue}
                </p>
                <div className="mt-3 h-2 overflow-hidden rounded-full bg-secondary">
                  <div className="h-full rounded-full bg-accent" style={{ width: `${h.risk}%` }} />
                </div>
                <p className="mt-1 text-xs text-muted-foreground">
                  {h.risk}% outbreak risk · {h.plots} plots contributing
                </p>
              </div>
            ))}
          </div>
        </section>

        <section className="rounded-3xl border border-border bg-sidebar p-8">
          <h2 className="text-2xl">Roadmap beyond the hackathon</h2>
          <ol className="mt-4 grid gap-3 text-sm sm:grid-cols-2">
            {[
              "Fine-tune a dedicated crop-disease vision model per major BRICS crop: rice, cotton, soy, wheat, maize.",
              "Formal Digital Public Good registration and an open API for state agriculture departments.",
              "Federated learning pilot between two BRICS agri-ministries.",
              "SMS/USSD fallback channel for feature-phone farmers with no smartphone or data access.",
            ].map((item, i) => (
              <li key={item} className="flex gap-3 rounded-2xl border border-border bg-card p-4">
                <span className="font-display text-lg text-primary">{i + 1}</span>
                <span className="text-muted-foreground">{item}</span>
              </li>
            ))}
          </ol>
        </section>
      </div>
    </SiteShell>
  );
}
