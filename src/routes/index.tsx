import { createFileRoute, Link } from "@tanstack/react-router";
import {
  Camera,
  MessagesSquare,
  Satellite,
  Share2,
  Sprout,
  Waves,
  ArrowRight,
} from "lucide-react";

import { SiteShell } from "@/components/SiteShell";
import { plot, alerts } from "@/lib/plot-data";
import heroFields from "@/assets/hero-fields.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "AgriN — AI Agronomist for Smallholder Farmers" },
      {
        name: "description",
        content:
          "AgriN turns satellite, soil and weather data into crop diagnosis and regenerative advice for smallholder farmers, in any language, on any device.",
      },
      { property: "og:title", content: "AgriN — AI Agronomist for Smallholder Farmers" },
      {
        property: "og:description",
        content:
          "Photo in, diagnosis out. Satellite-grounded regenerative advisory for 600 million smallholder farmers.",
      },
    ],
  }),
  component: Home,
});

const loop = [
  { icon: Satellite, title: "Sense", body: "Sentinel-2 NDVI, soil moisture and forecast merged by plot geolocation." },
  { icon: Camera, title: "Diagnose", body: "Multimodal vision reads a leaf photo and names the disease, severity and spread risk." },
  { icon: Sprout, title: "Advise", body: "Organic-first treatment and regenerative practice matched to that soil and season." },
  { icon: Share2, title: "Learn", body: "Anonymised signals lift the shared model across BRICS nations — raw data never leaves the country." },
];

const features = [
  {
    icon: Camera,
    title: "Crop disease & pest diagnostic",
    body: "Photograph a diseased leaf and get an identification, severity read and organic-first treatment plan in seconds. Offline-first: photos queue and diagnose on reconnect.",
    to: "/diagnose" as const,
    cta: "Run a live diagnosis",
  },
  {
    icon: MessagesSquare,
    title: "Conversational multilingual assistant",
    body: "Ask anything in your own language, by voice or text. Every answer is grounded in your plot's real satellite, soil and weather readings.",
    to: "/assistant" as const,
    cta: "Talk to the agronomist",
  },
  {
    icon: Waves,
    title: "Soil, weather & satellite dashboard",
    body: "NDVI trend against the regional average, soil moisture band, rainfall forecast and proactive alerts for farmers and extension officers.",
    to: "/dashboard" as const,
    cta: "Open the dashboard",
  },
  {
    icon: Share2,
    title: "Cross-border cooperation layer",
    body: "Federated model sharing so a disease model trained on Indian cotton improves outcomes in Brazil or South Africa — without raw data transfer.",
    to: "/cooperation" as const,
    cta: "See the cooperation layer",
  },
];

function Home() {
  return (
    <SiteShell>
      <section className="surface-field border-b border-border">
        <div className="mx-auto grid max-w-6xl gap-10 px-4 py-16 md:grid-cols-[1.05fr_1fr] md:items-center md:py-24">
          <div>
            <span className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-3 py-1 text-xs uppercase tracking-widest text-muted-foreground">
              BRICS · Theme: Cooperation
            </span>
            <h1 className="mt-5 text-balance-tight text-4xl leading-[1.05] sm:text-5xl md:text-6xl">
              A satellite-and-AI agronomist in every farmer's pocket.
            </h1>
            <p className="mt-5 max-w-xl text-lg text-muted-foreground">
              600 million smallholder farmers make planting and treatment decisions with no data.
              AgriN gives them a diagnosis for what is wrong, a forecast for what is coming, and a
              recommendation for what to do next — in their own language, on any device.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                to="/diagnose"
                className="inline-flex items-center gap-2 rounded-xl bg-primary px-5 py-3 text-sm font-medium text-primary-foreground shadow-field transition-transform hover:-translate-y-0.5"
              >
                <Camera className="size-4" /> Diagnose a leaf photo
              </Link>
              <Link
                to="/dashboard"
                className="inline-flex items-center gap-2 rounded-xl border border-border bg-card px-5 py-3 text-sm font-medium transition-colors hover:bg-secondary"
              >
                View plot intelligence <ArrowRight className="size-4" />
              </Link>
            </div>
            <dl className="mt-10 grid grid-cols-3 gap-4 border-t border-border pt-6 text-sm">
              {[
                ["600M", "smallholder farmers"],
                ["5", "BRICS data corridors"],
                ["0", "raw records exported"],
              ].map(([v, l]) => (
                <div key={l}>
                  <dt className="font-display text-2xl text-foreground">{v}</dt>
                  <dd className="text-muted-foreground">{l}</dd>
                </div>
              ))}
            </dl>
          </div>

          <div className="relative">
            <img
              src={heroFields}
              width={1600}
              height={1008}
              alt="Aerial view of smallholder farm plots divided by earthen bunds at golden hour"
              className="rounded-3xl border border-border object-cover shadow-lift"
            />
            <div className="absolute -bottom-6 left-4 right-4 rounded-2xl border border-border bg-card/95 p-4 shadow-lift backdrop-blur sm:left-8 sm:right-8">
              <p className="text-xs uppercase tracking-widest text-muted-foreground">
                Live demo plot · synthetic data
              </p>
              <p className="mt-1 font-display text-lg">
                {plot.village} · {plot.crop}
              </p>
              <p className="text-sm text-muted-foreground">
                Health score {plot.healthScore}/100 · {alerts[0]?.title}
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-20">
        <h2 className="text-3xl">The loop</h2>
        <p className="mt-2 max-w-2xl text-muted-foreground">
          Sense → Diagnose → Advise → Learn. Every farmer interaction feeds the next
          recommendation, and the shared model behind it.
        </p>
        <ol className="ridge-lines mt-8 grid gap-4 rounded-3xl border border-border p-4 sm:grid-cols-2 lg:grid-cols-4">
          {loop.map((step, i) => (
            <li key={step.title} className="rounded-2xl border border-border bg-card p-5 shadow-field">
              <div className="flex items-center gap-3">
                <span className="flex size-9 items-center justify-center rounded-xl bg-secondary text-secondary-foreground">
                  <step.icon className="size-4" />
                </span>
                <span className="text-xs uppercase tracking-widest text-muted-foreground">
                  Step {i + 1}
                </span>
              </div>
              <h3 className="mt-4 text-xl">{step.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{step.body}</p>
            </li>
          ))}
        </ol>
      </section>

      <section className="mx-auto max-w-6xl px-4 pb-8">
        <h2 className="text-3xl">What a farmer gets</h2>
        <div className="mt-8 grid gap-4 md:grid-cols-2">
          {features.map((f) => (
            <Link
              key={f.title}
              to={f.to}
              className="group rounded-3xl border border-border bg-card p-6 shadow-field transition-transform hover:-translate-y-1"
            >
              <span className="flex size-11 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                <f.icon className="size-5" />
              </span>
              <h3 className="mt-5 text-2xl">{f.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{f.body}</p>
              <span className="mt-5 inline-flex items-center gap-2 text-sm font-medium text-primary">
                {f.cta} <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
              </span>
            </Link>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-16">
        <div className="rounded-3xl border border-border bg-sidebar p-8">
          <h2 className="text-2xl">Built as shared infrastructure</h2>
          <p className="mt-2 max-w-3xl text-muted-foreground">
            AgriN is designed as a Digital Public Good: open APIs for state agriculture departments,
            a low-bandwidth PWA plus messaging-bot channel for feature-phone regions, and data
            models shared across BRICS nations rather than siloed per-country.
          </p>
          <div className="mt-6 grid gap-3 text-sm sm:grid-cols-3">
            {[
              ["Sensing", "Sentinel-2 / Landsat NDVI, SoilGrids soil profile, national weather feeds"],
              ["Intelligence", "Multimodal vision diagnosis, grounded advisory reasoning, speech + translation"],
              ["Cooperation", "Federated model updates, anonymised regional hotspot views for policymakers"],
            ].map(([t, b]) => (
              <div key={t} className="rounded-2xl border border-border bg-card p-4">
                <p className="text-xs uppercase tracking-widest text-muted-foreground">{t}</p>
                <p className="mt-2">{b}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </SiteShell>
  );
}
