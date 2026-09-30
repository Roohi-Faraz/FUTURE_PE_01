import { createFileRoute } from "@tanstack/react-router";
import { CopyGenerator } from "@/components/copy/CopyGenerator";

const TITLE = "LocalBiz AI — Website Copy Generator for Local Businesses";
const DESC = "Generate professional homepage, services, and CTA copy tailored to your local business in seconds.";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESC },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESC },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

function Logo() {
  return (
    <span className="grid size-7 place-items-center rounded-[10px] bg-primary">
      <span className="size-3 rounded-[3px] bg-primary-foreground/90" />
    </span>
  );
}

function PrimaryLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <a href={href} className="inline-flex items-center gap-2 rounded-full bg-primary px-4 py-2 text-sm font-medium text-primary-foreground ring-1 ring-primary-deep/30 transition-colors hover:bg-primary-deep">
      {children}
      <span className="dot bg-primary-foreground/80" />
    </a>
  );
}

function Index() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <header className="sticky top-0 z-20 border-b border-border bg-background/85 backdrop-blur">
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-4 px-6">
          <a href="#home" className="flex min-w-0 items-center gap-2.5">
            <Logo />
            <span className="truncate font-display text-lg font-semibold tracking-tight">LocalBiz AI</span>
          </a>
          <nav className="hidden items-center gap-8 text-sm text-muted-foreground md:flex">
            <a href="#home" className="transition-colors hover:text-foreground">Home</a>
            <a href="#generator" className="transition-colors hover:text-foreground">Generator</a>
            <a href="#about" className="transition-colors hover:text-foreground">About</a>
          </nav>
          <PrimaryLink href="#generator">Start Generating</PrimaryLink>
        </div>
      </header>

      <section id="home" className="mx-auto max-w-6xl px-6 pb-14 pt-14 sm:pt-20">
        <div className="grid items-center gap-10 lg:grid-cols-12 lg:gap-14">
          <div className="lg:col-span-6">
            <div className="mb-5 flex items-center gap-2">
              <span className="dot bg-accent" />
              <span className="text-xs font-medium uppercase tracking-[0.16em] text-muted-foreground">AI copy for local businesses</span>
            </div>
            <h1 className="max-w-[20ch] font-display text-4xl font-semibold leading-[1.05] tracking-tight text-balance sm:text-5xl">
              Create Website Copy That Helps Your Local Business Grow
            </h1>
            <p className="mt-5 max-w-[46ch] text-base leading-relaxed text-muted-foreground text-pretty sm:text-lg">
              Generate professional homepage, services, and CTA content tailored to your business in seconds.
            </p>
            <div className="mt-7"><PrimaryLink href="#generator">Generate Copy</PrimaryLink></div>
            <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-2 text-xs text-muted-foreground">
              <span className="flex items-center gap-1.5"><span className="dot bg-primary" /> 3 copy sections</span>
              <span className="flex items-center gap-1.5"><span className="dot bg-primary" /> Editable in place</span>
              <span className="flex items-center gap-1.5"><span className="dot bg-primary" /> Regenerate anytime</span>
            </div>
          </div>

          <div className="lg:col-span-6">
            <div className="rounded-2xl bg-card p-6 ring-1 ring-foreground/5 sm:p-7">
              <div className="mb-5 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="dot bg-accent" />
                  <span className="text-xs font-medium uppercase tracking-[0.16em] text-muted-foreground">Sample output</span>
                </div>
                <span className="text-[11px] font-medium text-muted-foreground/80">Glow Studio · Salon</span>
              </div>
              <p className="font-display text-xl leading-snug tracking-tight text-balance sm:text-2xl">
                Bengaluru's friendly salon for hair and beauty that feels made just for you.
              </p>
              <div className="mt-6 grid grid-cols-2 gap-3">
                <div className="rounded-xl bg-background p-4 ring-1 ring-border">
                  <p className="mb-2 text-[11px] font-medium uppercase tracking-[0.14em] text-muted-foreground">Service</p>
                  <p className="text-sm leading-relaxed text-muted-foreground">Hair spa — deep nourishment that leaves hair soft, shiny and healthy.</p>
                </div>
                <div className="rounded-xl bg-background p-4 ring-1 ring-border">
                  <p className="mb-2 text-[11px] font-medium uppercase tracking-[0.14em] text-muted-foreground">CTA</p>
                  <p className="text-sm leading-relaxed">Book your bridal trial today</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="generator" className="scroll-mt-16 border-t border-border bg-card">
        <div className="mx-auto max-w-6xl px-6 py-14">
          <CopyGenerator />
        </div>
      </section>

      <section id="about" className="scroll-mt-16 border-t border-border">
        <div className="mx-auto grid max-w-6xl gap-10 px-6 py-16 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <div className="mb-4 flex items-center gap-2">
              <span className="dot bg-accent" />
              <span className="text-xs font-medium uppercase tracking-[0.16em] text-muted-foreground">About</span>
            </div>
            <h2 className="font-display text-3xl font-semibold tracking-tight">Structured prompts, website-ready copy</h2>
          </div>
          <div className="lg:col-span-7">
            <p className="text-lg leading-relaxed text-pretty">
              LocalBiz AI helps local businesses create professional website content using structured AI prompts. It transforms basic business information into homepage copy, service descriptions, and conversion-focused calls to action.
            </p>
            <ol className="mt-8 grid gap-3 sm:grid-cols-4">
              {["Business info", "Structured prompt", "AI copy", "Copy · Edit · Regenerate"].map((s, i) => (
                <li key={s} className="rounded-xl bg-card p-4 ring-1 ring-border">
                  <p className="font-display text-sm text-accent">0{i + 1}</p>
                  <p className="mt-1 text-sm font-medium">{s}</p>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>

      <footer className="border-t border-border">
        <div className="mx-auto flex max-w-6xl flex-col gap-4 px-6 py-8 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <div className="flex items-center gap-2.5"><Logo /><span className="font-display font-semibold tracking-tight">LocalBiz AI</span></div>
            <p className="mt-2 text-xs text-muted-foreground">AI-powered website copy for local businesses</p>
          </div>
          <div className="text-xs text-muted-foreground sm:text-right">

            <p className="mt-1">
              <a href="https://github.com/Roohi-Faraz/pixel-perfect" target="_blank" rel="noreferrer" className="underline-offset-2 hover:text-foreground hover:underline">GitHub</a>
              {" · "}© {new Date().getFullYear()} LocalBiz AI
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
