import { Link } from "@tanstack/react-router";
import { Menu, Moon, Sun, X } from "lucide-react";
import { useEffect, useId, useRef, useState } from "react";
import { programs } from "@/data/programs";

const THEME_KEY = "bench-theme";

export function ThemeToggle() {
  return (
    <button
      type="button"
      className="btn btn-secondary btn-icon"
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
      <Moon size={16} strokeWidth={2} className="dark:hidden" aria-hidden />
      <Sun size={16} strokeWidth={2} className="hidden dark:block" aria-hidden />
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
  const [menuOpen, setMenuOpen] = useState(false);
  const [programsOpen, setProgramsOpen] = useState(false);
  const programsRef = useRef<HTMLDivElement>(null);
  const programsBtn = useRef<HTMLButtonElement>(null);
  const menuId = useId();
  const programsId = useId();
  const closeMenu = () => setMenuOpen(false);

  useEffect(() => {
    if (!programsOpen && !menuOpen) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key !== "Escape") return;
      if (programsOpen) {
        setProgramsOpen(false);
        programsBtn.current?.focus();
      }
      if (menuOpen) setMenuOpen(false);
    };
    const onPointer = (event: MouseEvent) => {
      if (!programsRef.current?.contains(event.target as Node)) setProgramsOpen(false);
    };
    document.addEventListener("keydown", onKey);
    document.addEventListener("mousedown", onPointer);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("mousedown", onPointer);
    };
  }, [programsOpen, menuOpen]);

  return (
    <header className="no-print sticky top-0 z-40 border-b border-hairline bg-canvas">
      <div className="mx-auto flex h-16 w-full max-w-page items-center gap-3 px-5 md:px-8">
        <Link to="/" className="flex items-center gap-2 text-ink" onClick={closeMenu}>
          <Mark />
          <span className="font-display text-xl tracking-tight">Bench</span>
        </Link>
        <nav className="ml-auto hidden items-center gap-3 xl:flex" aria-label="Primary">
          <Link to="/" activeOptions={{ exact: true }} className="nav-link">
            Home
          </Link>
          <Link to="/compare" search={{ ids: "", cat: "overview" }} className="nav-link">
            Compare
          </Link>
          <div className="relative" ref={programsRef}>
            <button
              ref={programsBtn}
              type="button"
              className="nav-link"
              aria-expanded={programsOpen}
              aria-controls={programsId}
              onClick={() => setProgramsOpen((value) => !value)}
            >
              Programs
            </button>
            {programsOpen ? (
              <div
                id={programsId}
                className="absolute right-0 top-full z-50 mt-1 w-72 rounded-card border border-hairline bg-canvas p-2"
              >
                {programs.map((program) => (
                  <Link
                    key={program.id}
                    to="/programs/$slug"
                    params={{ slug: program.id }}
                    className="block rounded-control px-3 py-2 text-sm text-ink hover:bg-surface"
                    onClick={() => setProgramsOpen(false)}
                  >
                    <span className="font-semibold">{program.shortName}</span>
                    <span className="mt-0.5 block text-muted">{program.city}</span>
                  </Link>
                ))}
              </div>
            ) : null}
          </div>
          <Link to="/guide" className="nav-link">
            Application Guide
          </Link>
          <Link to="/framework" className="nav-link">
            Decision Framework
          </Link>
          <Link to="/methodology" className="nav-link">
            Methodology
          </Link>
          <ThemeToggle />
        </nav>
        <div className="ml-auto flex items-center gap-2 xl:hidden">
          <ThemeToggle />
          <button
            type="button"
            className="btn btn-secondary btn-icon"
            aria-expanded={menuOpen}
            aria-controls={menuId}
            onClick={() => setMenuOpen((value) => !value)}
          >
            {menuOpen ? (
              <X size={16} strokeWidth={2} aria-hidden />
            ) : (
              <Menu size={16} strokeWidth={2} aria-hidden />
            )}
            <span className="sr-only">{menuOpen ? "Close menu" : "Open menu"}</span>
          </button>
        </div>
      </div>
      {menuOpen ? (
        <nav id={menuId} className="border-t border-hairline bg-canvas px-5 py-4 xl:hidden" aria-label="Mobile">
          <div className="flex flex-col">
            <Link to="/" activeOptions={{ exact: true }} className="nav-link" onClick={closeMenu}>
              Home
            </Link>
            <Link to="/compare" search={{ ids: "", cat: "overview" }} className="nav-link" onClick={closeMenu}>
              Compare
            </Link>
            <p className="eyebrow mt-4">Programs</p>
            {programs.map((program) => (
              <Link
                key={program.id}
                to="/programs/$slug"
                params={{ slug: program.id }}
                className="nav-link"
                onClick={closeMenu}
              >
                {program.shortName}
              </Link>
            ))}
            <Link to="/guide" className="nav-link mt-2" onClick={closeMenu}>
              Application Guide
            </Link>
            <Link to="/framework" className="nav-link" onClick={closeMenu}>
              Decision Framework
            </Link>
            <Link to="/methodology" className="nav-link" onClick={closeMenu}>
              Methodology
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
    <footer className="no-print bg-footer text-body">
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
                Methodology
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
