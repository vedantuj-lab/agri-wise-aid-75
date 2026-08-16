import { createFileRoute } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { useMutation } from "@tanstack/react-query";
import { useRef, useState } from "react";
import { Camera, Loader2, Leaf, ShieldCheck, FlaskConical, Sprout, AlertTriangle } from "lucide-react";

import { SiteShell } from "@/components/SiteShell";
import { diagnoseCrop } from "@/lib/agri.functions";
import { plot } from "@/lib/plot-data";

export const Route = createFileRoute("/diagnose")({
  head: () => ({
    meta: [
      { title: "Crop Disease Diagnosis — AgriN" },
      {
        name: "description",
        content:
          "Upload a photo of a diseased leaf and get an AI identification, severity read and organic-first treatment plan in seconds.",
      },
      { property: "og:title", content: "Crop Disease Diagnosis — AgriN" },
      {
        property: "og:description",
        content: "Photo in, diagnosis out: AI crop disease and pest identification for smallholder farmers.",
      },
    ],
  }),
  component: Diagnose,
});

const languages = ["English", "हिन्दी (Hindi)", "मराठी (Marathi)", "Português", "Русский", "中文", "isiZulu"];

const severityTone: Record<string, string> = {
  Low: "bg-success/15 text-success",
  Moderate: "bg-warning/20 text-warning-foreground",
  High: "bg-accent/25 text-accent-foreground",
  Severe: "bg-destructive/15 text-destructive",
};

function Diagnose() {
  const [image, setImage] = useState<string | null>(null);
  const [crop, setCrop] = useState("Tomato");
  const [language, setLanguage] = useState("English");
  const fileRef = useRef<HTMLInputElement>(null);

  const run = useServerFn(diagnoseCrop);
  const mutation = useMutation({
    mutationFn: (img: string) =>
      run({ data: { image: img, crop, language, location: `${plot.village}, ${plot.country}` } }),
  });

  const onFile = (file?: File) => {
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      const url = String(reader.result);
      setImage(url);
      mutation.reset();
    };
    reader.readAsDataURL(file);
  };

  const result = mutation.data;

  return (
    <SiteShell>
      <section className="surface-field border-b border-border">
        <div className="mx-auto max-w-6xl px-4 py-12">
          <span className="text-xs uppercase tracking-widest text-muted-foreground">
            Flagship feature
          </span>
          <h1 className="mt-3 text-4xl">Crop disease & pest diagnostic</h1>
          <p className="mt-3 max-w-2xl text-muted-foreground">
            Photograph a diseased leaf. AgriN identifies the disease or pest, rates severity and
            spread risk, and returns an organic-first treatment plan written in the farmer's
            language.
          </p>
        </div>
      </section>

      <div className="mx-auto grid max-w-6xl gap-6 px-4 py-10 lg:grid-cols-[minmax(0,420px)_1fr]">
        <div className="rounded-3xl border border-border bg-card p-6 shadow-field">
          <div className="grid gap-4 sm:grid-cols-2">
            <label className="text-sm">
              <span className="text-muted-foreground">Crop</span>
              <input
                value={crop}
                onChange={(e) => setCrop(e.target.value)}
                className="mt-1 w-full rounded-xl border border-input bg-background px-3 py-2 outline-none focus:ring-2 focus:ring-ring"
              />
            </label>
            <label className="text-sm">
              <span className="text-muted-foreground">Answer language</span>
              <select
                value={language}
                onChange={(e) => setLanguage(e.target.value)}
                className="mt-1 w-full rounded-xl border border-input bg-background px-3 py-2 outline-none focus:ring-2 focus:ring-ring"
              >
                {languages.map((l) => (
                  <option key={l} value={l}>
                    {l}
                  </option>
                ))}
              </select>
            </label>
          </div>

          <button
            type="button"
            onClick={() => fileRef.current?.click()}
            className="mt-5 flex w-full flex-col items-center justify-center gap-3 rounded-2xl border-2 border-dashed border-border bg-secondary/40 p-8 text-center transition-colors hover:bg-secondary"
          >
            {image ? (
              <img
                src={image}
                alt="Uploaded crop leaf"
                className="max-h-64 w-full rounded-xl object-cover"
              />
            ) : (
              <>
                <Camera className="size-8 text-primary" />
                <span className="text-sm font-medium">Take or upload a leaf photo</span>
                <span className="text-xs text-muted-foreground">
                  Works on any phone camera · queued offline, diagnosed on reconnect
                </span>
              </>
            )}
          </button>
          <input
            ref={fileRef}
            type="file"
            accept="image/*"
            capture="environment"
            className="hidden"
            onChange={(e) => onFile(e.target.files?.[0])}
          />

          <button
            type="button"
            disabled={!image || mutation.isPending}
            onClick={() => image && mutation.mutate(image)}
            className="mt-4 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-primary px-5 py-3 text-sm font-medium text-primary-foreground disabled:opacity-50"
          >
            {mutation.isPending ? <Loader2 className="size-4 animate-spin" /> : <Leaf className="size-4" />}
            {mutation.isPending ? "Diagnosing…" : "Diagnose this leaf"}
          </button>

          {mutation.isError ? (
            <p className="mt-3 rounded-xl bg-destructive/10 px-3 py-2 text-sm text-destructive">
              {(mutation.error as Error).message}
            </p>
          ) : null}
        </div>

        <div className="rounded-3xl border border-border bg-card p-6 shadow-field">
          {!result ? (
            <div className="flex h-full min-h-64 flex-col items-center justify-center text-center text-muted-foreground">
              <Sprout className="size-10 text-primary/40" />
              <p className="mt-4 max-w-sm text-sm">
                The diagnosis appears here: disease name, confidence, severity, spread risk, and a
                treatment plan that starts with organic and low-cost options.
              </p>
            </div>
          ) : (
            <div className="space-y-6">
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div>
                  <p className="text-xs uppercase tracking-widest text-muted-foreground">
                    {result.crop}
                  </p>
                  <h2 className="mt-1 text-3xl">{result.disease}</h2>
                  <p className="text-sm italic text-muted-foreground">{result.scientificName}</p>
                </div>
                <div className="flex flex-col items-end gap-2">
                  <span
                    className={`rounded-full px-3 py-1 text-xs font-medium ${severityTone[result.severity] ?? "bg-secondary"}`}
                  >
                    {result.severity} severity
                  </span>
                  <span className="text-sm text-muted-foreground">
                    {result.confidence}% confidence
                  </span>
                </div>
              </div>

              <p className="text-sm leading-relaxed">{result.summary}</p>

              {result.spreadRisk ? (
                <div className="flex gap-3 rounded-2xl border border-border bg-warning/10 p-4 text-sm">
                  <AlertTriangle className="mt-0.5 size-4 shrink-0 text-warning-foreground" />
                  <p>{result.spreadRisk}</p>
                </div>
              ) : null}

              <div className="grid gap-4 md:grid-cols-2">
                <Block icon={Leaf} title="Organic-first treatment" items={result.organicTreatment} />
                <Block icon={FlaskConical} title="If it escalates" items={result.chemicalTreatment} />
                <Block icon={ShieldCheck} title="Prevent recurrence" items={result.preventive} />
                <div className="rounded-2xl border border-border bg-primary/5 p-4">
                  <p className="flex items-center gap-2 text-sm font-medium">
                    <Sprout className="size-4 text-primary" /> Regenerative tip
                  </p>
                  <p className="mt-2 text-sm text-muted-foreground">{result.regenerativeTip}</p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </SiteShell>
  );
}

function Block({
  icon: Icon,
  title,
  items,
}: {
  icon: typeof Leaf;
  title: string;
  items: string[];
}) {
  if (!items.length) return null;
  return (
    <div className="rounded-2xl border border-border p-4">
      <p className="flex items-center gap-2 text-sm font-medium">
        <Icon className="size-4 text-primary" /> {title}
      </p>
      <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
        {items.map((it) => (
          <li key={it} className="flex gap-2">
            <span className="mt-2 size-1.5 shrink-0 rounded-full bg-primary" />
            {it}
          </li>
        ))}
      </ul>
    </div>
  );
}
