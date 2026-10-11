import { Link } from "@tanstack/react-router";
import { Menu, Moon, Sun, X } from "lucide-react";
import { useState } from "react";
import { programs } from "@/data/programs";

const THEME_KEY = "bench-theme";

export function ThemeToggle() {
  return (
    <button
      type="button"
      className="btn btn-secondary size-11 px-0"
      aria-label="Toggle color theme"
      onClick={() => {
        const root = document.documentElement;
        const next = root.classList.contains("dark") ? "light" : "dark";
        root.classList.toggle("dark", next === "dark");
        try {
          localStorage.setItem(THEME_KEY, next);
        } catch {
          /* ignore private-mode failures */
        }
        const meta = document.querySelector('meta[name="theme-color"]');
        if (meta) meta.setAttribute("content", next === "dark" ? "#0a1a1a" : "#fffaf0");
      }}
    >
      <Moon className="size-4 dark:hidden" aria-hidden />
      <Sun className="hidden size-4 dark:block" aria-hidden />
    </button>
  );
}

export function Shell({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-dvh bg-canvas text-body">
      <a className="skip-link" href="#content">
        Skip to content
      </a>
      <SiteHeader />
      <main id="content">{children}</main>
      <SiteFooter />
    </div>
  );
}

function SiteHeader() {
  const [open, setOpen] = useState(false);
  const close = () => setOpen(false);

  return (
    <header className="no-print sticky top-0 z-40 border-b border-hairline bg-canvas">
      <div className="mx-auto flex h-16 w-full max-w-page items-center gap-4 px-5 md:px-8">
        <Link to="/" className="flex items-center gap-2 text-ink" onClick={close}>
          <Mark />
          <span className="font-display text-xl tracking-tight">Bench</span>
        </Link>
        <nav className="ml-auto hidden items-center gap-4 lg:flex" aria-label="Primary">
          <Link to="/" activeOptions={{ exact: true }} className="nav-link">
            Home
          </Link>
          <Link to="/compare" search={{ ids: "", cat: "overview" }} className="nav-link">
            Compare
          </Link>
          <details className="relative">
            <summary className="nav-link cursor-pointer list-none [&::-webkit-details-marker]:hidden">
              Programs
            </summary>
            <div className="absolute right-0 top-full z-50 mt-1 w-72 rounded-card border border-hairline bg-canvas p-2 shadow-none">
              {programs.map((program) => (
                <Link
                  key={program.id}
                  to="/programs/$slug"
                  params={{ slug: program.id }}
                  className="block rounded-control px-3 py-2 text-sm text-ink hover:bg-surface"
                >
                  <span className="font-semibold">{program.shortName}</span>
                  <span className="mt-0.5 block text-muted">{program.city}</span>
                </Link>
              ))}
            </div>
          </details>
          <Link to="/guide" className="nav-link">
            Application Guide
          </Link>
          <Link to="/framework" className="nav-link">
            Decision Framework
          </Link>
          <ThemeToggle />
        </nav>
        <div className="ml-auto flex items-center gap-2 lg:hidden">
          <ThemeToggle />
          <button
            type="button"
            className="btn btn-secondary size-11 px-0"
            aria-expanded={open}
            aria-controls="mobile-nav"
            onClick={() => setOpen((value) => !value)}
          >
            {open ? <X className="size-4" aria-hidden /> : <Menu className="size-4" aria-hidden />}
            <span className="sr-only">{open ? "Close menu" : "Open menu"}</span>
          </button>
        </div>
      </div>
      {open ? (
        <nav id="mobile-nav" className="border-t border-hairline bg-canvas px-5 py-4 lg:hidden" aria-label="Mobile">
          <div className="flex flex-col">
            <Link to="/" activeOptions={{ exact: true }} className="nav-link" onClick={close}>
              Home
            </Link>
            <Link to="/compare" search={{ ids: "", cat: "overview" }} className="nav-link" onClick={close}>
              Compare
            </Link>
            <p className="eyebrow mt-4">Programs</p>
            {programs.map((program) => (
              <Link
                key={program.id}
                to="/programs/$slug"
                params={{ slug: program.id }}
                className="nav-link"
                onClick={close}
              >
                {program.shortName}
              </Link>
            ))}
            <Link to="/guide" className="nav-link mt-2" onClick={close}>
              Application Guide
            </Link>
            <Link to="/framework" className="nav-link" onClick={close}>
              Decision Framework
            </Link>
            <Link to="/methodology" className="nav-link" onClick={close}>
              Indices Methodology
            </Link>
          </div>
        </nav>
      ) : null}
    </header>
  );
}

function Mark() {
  return (
    <span className="grid size-7 grid-cols-3 gap-0.5" aria-hidden>
      <span className="rounded-xs bg-brand-pink" />
      <span className="rounded-xs bg-brand-teal" />
      <span className="rounded-xs bg-brand-lavender" />
      <span className="rounded-xs bg-brand-peach" />
      <span className="rounded-xs bg-brand-ochre" />
      <span className="rounded-xs bg-brand-teal" />
    </span>
  );
}

function SiteFooter() {
  return (
    <footer className="bg-footer text-body">
      <div className="mx-auto grid w-full max-w-page gap-10 px-5 py-16 md:grid-cols-4 md:px-8 md:py-20">
        <div className="md:col-span-2">
          <p className="font-display text-3xl text-ink">Bench</p>
          <p className="mt-3 max-w-md text-sm leading-relaxed">
            A research bench for six U.S. HCI master’s programs. Numbers are sourced. Scores are judgments.
            Neither is a brochure.
          </p>
        </div>
        <div>
          <p className="eyebrow">Pages</p>
          <ul className="mt-3 space-y-2 text-sm">
            <li>
              <Link to="/compare" search={{ ids: "", cat: "overview" }} className="prose-link">
                Compare
              </Link>
            </li>
            <li>
              <Link to="/guide" className="prose-link">
                Application Guide
              </Link>
            </li>
            <li>
              <Link to="/framework" className="prose-link">
                Decision Framework
              </Link>
            </li>
            <li>
              <Link to="/methodology" className="prose-link">
                Indices Methodology
              </Link>
            </li>
          </ul>
        </div>
        <div>
          <p className="eyebrow">Programs</p>
          <ul className="mt-3 space-y-2 text-sm">
            {programs.map((program) => (
              <li key={program.id}>
                <Link to="/programs/$slug" params={{ slug: program.id }} className="prose-link">
                  {program.shortName}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="border-t border-hairline">
        <p className="mx-auto w-full max-w-page px-5 py-6 text-sm text-muted md:px-8">
          Figures checked 11 October 2026 against program and bursar pages. Tuition moves. Open the official
          link before you budget or apply.
        </p>
      </div>
    </footer>
  );
}
