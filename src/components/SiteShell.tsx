import { Link } from "@tanstack/react-router";
import { Leaf, Menu } from "lucide-react";
import { useState, type ReactNode } from "react";

const nav = [
  { to: "/", label: "Overview" },
  { to: "/diagnose", label: "Diagnose" },
  { to: "/assistant", label: "Assistant" },
  { to: "/dashboard", label: "Dashboard" },
  { to: "/cooperation", label: "Cooperation" },
] as const;

export function SiteShell({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-50 border-b border-border/70 bg-background/85 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center gap-3 px-4 py-3">
          <Link to="/" className="flex items-center gap-2">
            <span className="flex size-9 items-center justify-center rounded-xl bg-primary text-primary-foreground">
              <Leaf className="size-5" />
            </span>
            <span className="font-display text-xl tracking-tight">AgriN</span>
            <span className="hidden rounded-full border border-border px-2 py-0.5 text-[11px] uppercase tracking-widest text-muted-foreground sm:inline">
              Digital Public Good
            </span>
          </Link>

          <nav className="ml-auto hidden items-center gap-1 md:flex">
            {nav.map((item) => (
              <Link
                key={item.to}
                to={item.to}
                activeOptions={{ exact: item.to === "/" }}
                className="rounded-lg px-3 py-2 text-sm text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground data-[status=active]:bg-secondary data-[status=active]:text-foreground"
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <button
            type="button"
            aria-label="Toggle navigation"
            onClick={() => setOpen((v) => !v)}
            className="ml-auto rounded-lg border border-border p-2 md:hidden"
          >
            <Menu className="size-5" />
          </button>
        </div>

        {open ? (
          <nav className="grid gap-1 border-t border-border px-4 py-3 md:hidden">
            {nav.map((item) => (
              <Link
                key={item.to}
                to={item.to}
                onClick={() => setOpen(false)}
                className="rounded-lg px-3 py-2 text-sm text-muted-foreground hover:bg-secondary hover:text-foreground data-[status=active]:bg-secondary data-[status=active]:text-foreground"
              >
                {item.label}
              </Link>
            ))}
          </nav>
        ) : null}
      </header>

      <main>{children}</main>

      <footer className="mt-20 border-t border-border bg-sidebar">
        <div className="mx-auto flex max-w-6xl flex-col gap-2 px-4 py-8 text-sm text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
          <p>AgriN — AI-powered regenerative agricultural intelligence.</p>
          <p>BRICS Hackathon · Problem Statement 04 · Theme: Cooperation</p>
        </div>
      </footer>
    </div>
  );
}
