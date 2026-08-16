import { createFileRoute } from "@tanstack/react-router";
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { CloudRain, Droplets, Satellite, ThermometerSun, TriangleAlert } from "lucide-react";

import { SiteShell } from "@/components/SiteShell";
import { alerts, forecast, hotspots, ndviSeries, plot, soilMoisture } from "@/lib/plot-data";

export const Route = createFileRoute("/dashboard")({
  head: () => ({
    meta: [
      { title: "Plot & Regional Health Dashboard — AgriN" },
      {
        name: "description",
        content:
          "NDVI trend, soil moisture, rainfall forecast and regional pest-risk hotspots for farmers and agri-extension officers.",
      },
      { property: "og:title", content: "Plot & Regional Health Dashboard — AgriN" },
      {
        property: "og:description",
        content: "Satellite, soil and weather intelligence for a single plot and its wider region.",
      },
    ],
  }),
  component: Dashboard,
});

const alertTone: Record<string, string> = {
  urgent: "border-destructive/40 bg-destructive/10",
  warning: "border-warning/50 bg-warning/10",
  info: "border-border bg-secondary/50",
};

function Dashboard() {
  return (
    <SiteShell>
      <section className="surface-field border-b border-border">
        <div className="mx-auto flex max-w-6xl flex-wrap items-end justify-between gap-4 px-4 py-12">
          <div>
            <span className="text-xs uppercase tracking-widest text-muted-foreground">
              Plot {plot.id} · synthetic demo data
            </span>
            <h1 className="mt-3 text-4xl">
              {plot.village} · {plot.crop}
            </h1>
            <p className="mt-2 text-muted-foreground">
              {plot.areaHa} ha · {plot.soilType} · {plot.coords}
            </p>
          </div>
          <div className="rounded-3xl border border-border bg-card px-6 py-4 text-center shadow-field">
            <p className="text-xs uppercase tracking-widest text-muted-foreground">Health score</p>
            <p className="font-display text-4xl text-primary">{plot.healthScore}</p>
            <p className="text-xs text-muted-foreground">out of 100 · trending down</p>
          </div>
        </div>
      </section>

      <div className="mx-auto max-w-6xl space-y-6 px-4 py-10">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <Stat icon={Satellite} label="NDVI (latest)" value="0.51" sub="Regional avg 0.61" />
          <Stat icon={Droplets} label="Soil moisture" value="38% VWC" sub="Optimal band 33–38%" />
          <Stat icon={CloudRain} label="Rain next 7d" value="59 mm" sub="Peak 24 mm Saturday" />
          <Stat icon={ThermometerSun} label="Peak temp" value="33 °C" sub="Wednesday, heat stress" />
        </div>

        <div className="grid gap-4 lg:grid-cols-2">
          <Panel title="NDVI trend vs regional average" caption="Sentinel-2, 9 weeks">
            <ResponsiveContainer width="100%" height={260}>
              <LineChart data={ndviSeries}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
                <XAxis dataKey="week" stroke="var(--muted-foreground)" fontSize={12} />
                <YAxis domain={[0.2, 0.75]} stroke="var(--muted-foreground)" fontSize={12} />
                <Tooltip
                  contentStyle={{
                    background: "var(--card)",
                    border: "1px solid var(--border)",
                    borderRadius: 12,
                  }}
                />
                <Line type="monotone" dataKey="ndvi" stroke="var(--chart-1)" strokeWidth={3} dot={false} />
                <Line
                  type="monotone"
                  dataKey="regional"
                  stroke="var(--chart-2)"
                  strokeWidth={2}
                  strokeDasharray="5 4"
                  dot={false}
                />
              </LineChart>
            </ResponsiveContainer>
          </Panel>

          <Panel title="Soil moisture" caption="% volumetric water content, last 7 days">
            <ResponsiveContainer width="100%" height={260}>
              <AreaChart data={soilMoisture}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
                <XAxis dataKey="day" stroke="var(--muted-foreground)" fontSize={12} />
                <YAxis stroke="var(--muted-foreground)" fontSize={12} />
                <Tooltip
                  contentStyle={{
                    background: "var(--card)",
                    border: "1px solid var(--border)",
                    borderRadius: 12,
                  }}
                />
                <Area
                  type="monotone"
                  dataKey="moisture"
                  stroke="var(--chart-3)"
                  fill="var(--chart-3)"
                  fillOpacity={0.2}
                  strokeWidth={3}
                />
                <Line type="monotone" dataKey="optimal" stroke="var(--chart-4)" dot={false} />
              </AreaChart>
            </ResponsiveContainer>
          </Panel>

          <Panel title="Rainfall forecast" caption="mm per day, next 7 days">
            <ResponsiveContainer width="100%" height={240}>
              <BarChart data={forecast}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
                <XAxis dataKey="day" stroke="var(--muted-foreground)" fontSize={12} />
                <YAxis stroke="var(--muted-foreground)" fontSize={12} />
                <Tooltip
                  contentStyle={{
                    background: "var(--card)",
                    border: "1px solid var(--border)",
                    borderRadius: 12,
                  }}
                />
                <Bar dataKey="rainMm" fill="var(--chart-3)" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </Panel>

          <Panel title="Proactive alerts" caption="Pushed to the farmer by voice or message">
            <div className="space-y-3">
              {alerts.map((a) => (
                <div key={a.title} className={`rounded-2xl border p-4 ${alertTone[a.level]}`}>
                  <p className="flex items-start gap-2 text-sm font-medium">
                    <TriangleAlert className="mt-0.5 size-4 shrink-0" />
                    {a.title}
                  </p>
                  <p className="mt-1 pl-6 text-sm text-muted-foreground">{a.body}</p>
                </div>
              ))}
            </div>
          </Panel>
        </div>

        <Panel
          title="Regional hotspots"
          caption="Aggregated, anonymised view for extension officers and policymakers"
        >
          <div className="overflow-x-auto">
            <table className="w-full min-w-[560px] text-sm">
              <thead className="text-left text-xs uppercase tracking-widest text-muted-foreground">
                <tr>
                  <th className="pb-3">Region</th>
                  <th className="pb-3">Crop</th>
                  <th className="pb-3">Issue</th>
                  <th className="pb-3">Plots</th>
                  <th className="pb-3">Risk</th>
                </tr>
              </thead>
              <tbody>
                {hotspots.map((h) => (
                  <tr key={h.region} className="border-t border-border">
                    <td className="py-3 font-medium">{h.region}</td>
                    <td className="py-3 text-muted-foreground">{h.crop}</td>
                    <td className="py-3 text-muted-foreground">{h.issue}</td>
                    <td className="py-3 text-muted-foreground">{h.plots}</td>
                    <td className="py-3">
                      <div className="flex items-center gap-2">
                        <div className="h-2 w-28 overflow-hidden rounded-full bg-secondary">
                          <div
                            className="h-full rounded-full bg-primary"
                            style={{ width: `${h.risk}%` }}
                          />
                        </div>
                        <span className="text-xs text-muted-foreground">{h.risk}%</span>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Panel>
      </div>
    </SiteShell>
  );
}

function Stat({
  icon: Icon,
  label,
  value,
  sub,
}: {
  icon: typeof Droplets;
  label: string;
  value: string;
  sub: string;
}) {
  return (
    <div className="rounded-3xl border border-border bg-card p-5 shadow-field">
      <div className="flex items-center gap-2 text-muted-foreground">
        <Icon className="size-4" />
        <span className="text-xs uppercase tracking-widest">{label}</span>
      </div>
      <p className="mt-3 font-display text-3xl">{value}</p>
      <p className="text-xs text-muted-foreground">{sub}</p>
    </div>
  );
}

function Panel({
  title,
  caption,
  children,
}: {
  title: string;
  caption: string;
  children: React.ReactNode;
}) {
  return (
    <section className="rounded-3xl border border-border bg-card p-6 shadow-field">
      <h2 className="text-xl">{title}</h2>
      <p className="mb-4 text-xs uppercase tracking-widest text-muted-foreground">{caption}</p>
      {children}
    </section>
  );
}
