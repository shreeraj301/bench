import { createFileRoute, Link, useRouterState } from "@tanstack/react-router";
import { Check } from "lucide-react";
import { useEffect, useState, type KeyboardEvent } from "react";
import { Kind, Score } from "@/components/bits";
import { Glossary } from "@/components/glossary";
import { Shell } from "@/components/shell";
import {
  COMPARE_CATEGORIES,
  UPDATED,
  VISA_NOTE,
  isCategory,
  isProgramId,
  parseIds,
  programs,
} from "@/data/programs";
import type { CompareCategory, Program, ProgramId } from "@/data/types";

const STORAGE = "bench-compare";

export const Route = createFileRoute("/compare")({
  validateSearch: (search: Record<string, unknown>) => {
    const ids = typeof search.ids === "string" ? search.ids : "";
    const cat = isCategory(search.cat) ? search.cat : "overview";
    return { ids, cat };
  },
  component: ComparePage,
});

function ComparePage() {
  const search = Route.useSearch();
  const navigate = Route.useNavigate();
  const historyInvalid = useRouterState({
    select: (state) => Boolean((state.location.state as { benchInvalid?: boolean } | undefined)?.benchInvalid),
  });
  const selected = parseIds(search.ids);
  const cat = search.cat;
  const [invalidNote, setInvalidNote] = useState(historyInvalid);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const rawIds = params.get("ids");
    const rawCat = params.get("cat");
    const parts = (rawIds ?? "")
      .split(",")
      .map((part) => part.trim())
      .filter(Boolean);
    const badIds = parts.some((part) => !isProgramId(part)) || new Set(parts).size !== parts.length;
    const badCat = Boolean(rawCat) && !isCategory(rawCat);
    if (badIds || badCat) {
      setInvalidNote(true);
      navigate({
        search: {
          ids: parseIds(rawIds ?? "").join(","),
          cat: isCategory(rawCat) ? (rawCat as CompareCategory) : "overview",
        },
        replace: true,
        state: { benchInvalid: true } as never,
      });
      return;
    }
    if (historyInvalid) return;
    if (search.ids) {
      try {
        localStorage.setItem(STORAGE, search.ids);
      } catch {
        /* ignore */
      }
      return;
    }
    try {
      const saved = localStorage.getItem(STORAGE);
      if (saved) navigate({ search: { ids: saved, cat: search.cat }, replace: true });
    } catch {
      /* ignore */
    }
    // Restore once. Invalid values are rewritten before any saved selection is applied.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const setIds = (ids: ProgramId[]) => {
    const value = ids.join(",");
    try {
      localStorage.setItem(STORAGE, value);
    } catch {
      /* ignore */
    }
    navigate({ search: { ids: value, cat } });
  };

  const toggle = (id: ProgramId) => {
    if (selected.includes(id)) setIds(selected.filter((item) => item !== id));
    else if (selected.length < 3) setIds([...selected, id]);
  };

  const chosen = selected
    .map((id) => programs.find((program) => program.id === id))
    .filter((program): program is Program => Boolean(program));

  return (
    <Shell>
      <div className="mx-auto w-full max-w-page px-5 py-12 md:px-8 md:py-16">
        <p className="eyebrow">Compare · 2 or 3 programs</p>
        <h1 className="display-lg mt-3">Put them next to each other.</h1>
        <p className="mt-4 max-w-2xl">
          Same fields, no narrative padding. Share the URL. It already holds the selection. Visa prior is a
          planning range, not a score. Indices, future proof, job security, all-in sketch, holds, costs you, and
          full freight are defined in the word list under a finished comparison.
        </p>
        {invalidNote ? (
          <p className="panel mt-6" role="status">
            Some comparison settings were invalid, so the default view was restored.
          </p>
        ) : null}
        {selected.length >= 3 ? (
          <p id="compare-limit" className="mt-6 text-sm font-semibold text-ink" role="status">
            Three is the maximum. Remove one to swap.
          </p>
        ) : null}

        <ul className="no-print mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {programs.map((program) => {
            const on = selected.includes(program.id);
            const disabled = !on && selected.length >= 3;
            return (
              <li key={program.id}>
                <button
                  type="button"
                  aria-pressed={on}
                  disabled={disabled}
                  aria-describedby={disabled ? "compare-limit" : undefined}
                  onClick={() => toggle(program.id)}
                  className={`pick flex min-h-14 w-full items-center gap-3 rounded-card border px-4 py-3 text-left text-sm font-semibold text-ink ${
                    on ? "border-ink bg-surface" : "border-hairline bg-canvas"
                  }`}
                >
                  <span
                    aria-hidden
                    className={`grid size-4 shrink-0 place-items-center rounded-xs border text-xs ${on ? "border-ink bg-ink text-on-primary" : "border-muted"}`}
                  >
                    {on ? <Check className="size-3" aria-hidden /> : null}
                  </span>
                  <span>
                    {program.shortName}
                    {on ? <span className="mt-0.5 block text-xs font-medium text-muted">Selected. Press to remove.</span> : null}
                  </span>
                </button>
              </li>
            );
          })}
        </ul>

        {chosen.length < 2 ? (
          <p className="panel mt-8" role="status">
            {chosen.length === 1
              ? "This is a start, not a comparison. Add one more program. The one you picked stays selected."
              : "Select at least two programs. Three is the maximum. A longer list stops being a decision."}
          </p>
        ) : (
          <>
            <div className="no-print mt-8 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
              <div role="tablist" aria-label="Comparison category" className="flex flex-wrap gap-2">
                {COMPARE_CATEGORIES.map((category) => (
                  <button
                    key={category.id}
                    type="button"
                    role="tab"
                    id={`tab-${category.id}`}
                    aria-selected={cat === category.id}
                    aria-controls="compare-panel"
                    className="tab"
                    onClick={() => navigate({ search: { ids: search.ids, cat: category.id } })}
                    onKeyDown={(event) => onTabKey(event, category.id)}
                  >
                    {category.label}
                  </button>
                ))}
              </div>
              <ShareBar chosen={chosen} cat={cat} />
            </div>
            <div
              role="tabpanel"
              id="compare-panel"
              aria-labelledby={`tab-${cat}`}
              className="mt-6"
            >
              <CategoryView programs={chosen} cat={cat} />
            </div>
            <p className="mt-6 text-sm text-muted">
              City names are places, not scores. Updated {UPDATED}. {VISA_NOTE}
            </p>
            <div className="mt-6">
              <Glossary compact />
            </div>
          </>
        )}
      </div>
    </Shell>
  );
}

function onTabKey(event: KeyboardEvent<HTMLButtonElement>, current: CompareCategory) {
  const index = COMPARE_CATEGORIES.findIndex((category) => category.id === current);
  if (event.key !== "ArrowRight" && event.key !== "ArrowLeft") return;
  event.preventDefault();
  const next =
    event.key === "ArrowRight"
      ? COMPARE_CATEGORIES[(index + 1) % COMPARE_CATEGORIES.length]
      : COMPARE_CATEGORIES[(index - 1 + COMPARE_CATEGORIES.length) % COMPARE_CATEGORIES.length];
  const el = document.getElementById(`tab-${next.id}`);
  if (el instanceof HTMLButtonElement) {
    el.focus();
    el.click();
  }
}

function ShareBar({ chosen, cat }: { chosen: Program[]; cat: CompareCategory }) {
  const [copied, setCopied] = useState<"" | "link" | "summary">("");
  const [failed, setFailed] = useState<"" | "link" | "summary">("");

  useEffect(() => {
    if (!copied) return;
    const timer = window.setTimeout(() => setCopied(""), 2000);
    return () => window.clearTimeout(timer);
  }, [copied]);

  const copy = async (kind: "link" | "summary", text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setFailed("");
      setCopied(kind);
    } catch {
      setCopied("");
      setFailed(kind);
    }
  };

  const live =
    copied === "link"
      ? "Link copied"
      : copied === "summary"
        ? "Summary copied"
        : failed === "link"
          ? "Could not copy the link"
          : failed === "summary"
            ? "Could not copy the summary"
            : "";

  return (
    <div className="flex flex-wrap items-center gap-2">
      <button
        type="button"
        className="btn btn-secondary min-w-40"
        aria-label="Copy link"
        onClick={() => copy("link", window.location.href)}
      >
        {copied === "link" ? (
          <>
            <Check size={16} strokeWidth={2} aria-hidden /> Copied
          </>
        ) : (
          "Copy link"
        )}
      </button>
      <button
        type="button"
        className="btn btn-secondary min-w-40"
        aria-label="Copy summary"
        onClick={() => copy("summary", summary(chosen, cat))}
      >
        {copied === "summary" ? (
          <>
            <Check size={16} strokeWidth={2} aria-hidden /> Copied
          </>
        ) : (
          "Copy summary"
        )}
      </button>
      <button type="button" className="btn btn-secondary" onClick={() => window.print()}>
        Print
      </button>
      <p className="sr-only" aria-live="polite">
        {live}
      </p>
      {failed ? (
        <p className="text-sm text-ink" role="status">
          Clipboard blocked. Copy the address bar.
        </p>
      ) : null}
    </div>
  );
}

function summary(rows: Program[], cat: CompareCategory) {
  const lines = [
    `Bench comparison · ${rows.map((program) => program.shortName).join(" vs ")}`,
    `Category: ${cat}`,
    `Updated ${UPDATED}`,
    "",
  ];
  for (const program of rows) {
    lines.push(program.shortName);
    lines.push(`Duration: ${program.durationLabel}`);
    lines.push(`Tuition snapshot: ${program.cost.total}`);
    lines.push(`Acceptance: ${program.acceptance.rate}`);
    lines.push(`Search: ${program.outcomes.searchTime}`);
    lines.push(
      `Indices: livability ${program.indices.livability.score}, job ${program.indices.jobSecurity.score}, future ${program.indices.futureProof.score}, selectivity ${program.indices.selectivity.score}, ROI ${program.indices.roi.score}`,
    );
    lines.push(`Visa prior: ${program.visa.range}`);
    lines.push(program.officialUrl);
    lines.push("");
  }
  lines.push(VISA_NOTE);
  return lines.join("\n");
}

function CategoryView({ programs: rows, cat }: { programs: Program[]; cat: CompareCategory }) {
  return (
    <div className={`grid gap-4 ${rows.length === 2 ? "lg:grid-cols-2" : "lg:grid-cols-3"}`}>
      {rows.map((program) => (
        <article key={program.id} className="panel h-full">
          <p className="inline-flex rounded-full border border-hairline bg-surface px-3 py-1 text-xs font-semibold text-ink">
            {program.city}
          </p>
          <h2 className="mt-3 text-xl font-semibold text-ink">{program.shortName}</h2>
          <p className="text-sm text-muted">{program.durationLabel}</p>
          <div className="mt-4">{body(program, cat)}</div>
          <a className="prose-link mt-5 inline-flex text-sm" href={program.officialUrl} target="_blank" rel="noreferrer">
            Official program site
          </a>
        </article>
      ))}
    </div>
  );
}

function body(program: Program, cat: CompareCategory) {
  if (cat === "overview") {
    return (
      <div className="space-y-4 text-sm leading-relaxed">
        <p>{program.tagline}</p>
        <p>{program.rankReason}</p>
        <div>
          <p className="font-semibold text-ink">Holds</p>
          <p className="text-muted">Where it is strong for this decision.</p>
          <ul className="mt-1 list-disc space-y-1 pl-4">
            {program.excels.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>
        <div>
          <p className="font-semibold text-ink">Costs you</p>
          <p className="text-muted">What you give up if you pick it.</p>
          <ul className="mt-1 list-disc space-y-1 pl-4">
            {program.tradeoffs.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>
      </div>
    );
  }
  if (cat === "cost") {
    return (
      <div className="space-y-3 text-sm">
        <p className="font-semibold text-ink">{program.cost.total}</p>
        <ul className="space-y-3">
          {program.cost.lines.map((line) => (
            <li key={line.label}>
              <div className="flex flex-wrap items-center gap-2">
                <span className="font-semibold text-ink">{line.label}</span>
                <Kind kind={line.kind} />
              </div>
              <p className="text-ink">{line.value}</p>
              <p className="text-muted">{line.note}</p>
            </li>
          ))}
        </ul>
        <p>{program.funding.summary}</p>
      </div>
    );
  }
  if (cat === "outcomes") {
    return (
      <div className="space-y-3 text-sm leading-relaxed">
        <p>{program.outcomes.summary}</p>
        <p>
          <span className="font-semibold text-ink">Search. </span>
          {program.outcomes.searchTime}
        </p>
        <p>
          <span className="font-semibold text-ink">Acceptance. </span>
          {program.acceptance.rate}. {program.acceptance.note}
        </p>
        <p>
          <span className="font-semibold text-ink">Visa prior. </span>
          {program.visa.range}. {program.visa.rationale}
        </p>
        <p>
          <span className="font-semibold text-ink">Roles. </span>
          {program.outcomes.roles.join(", ")}
        </p>
      </div>
    );
  }
  if (cat === "curriculum") {
    return (
      <div className="space-y-3 text-sm leading-relaxed">
        <p>{program.curriculum.summary}</p>
        <p>
          <span className="font-semibold text-ink">Capstone / internship. </span>
          {program.capstone.summary}
        </p>
        <p>
          <span className="font-semibold text-ink">Cohort. </span>
          {program.cohort.size} {program.cohort.workload}
        </p>
      </div>
    );
  }
  if (cat === "application") {
    return (
      <div className="space-y-3 text-sm leading-relaxed">
        <p>
          <span className="font-semibold text-ink">Deadline. </span>
          {program.application.deadline}
        </p>
        <p>
          <span className="font-semibold text-ink">GRE. </span>
          {program.application.gre}
        </p>
        <p>
          <span className="font-semibold text-ink">{program.application.sop.type}. </span>
          {program.application.sop.limit}
        </p>
        <ul className="list-disc space-y-1 pl-4">
          {program.application.checklist.map((item) => (
            <li key={item.item}>
              <span className="font-semibold text-ink">{item.item}. </span>
              {item.detail}
            </li>
          ))}
        </ul>
        <Link to="/programs/$slug" params={{ slug: program.id }} hash="sop" className="prose-link">
          Essay strategy
        </Link>
      </div>
    );
  }
  return (
    <div className="space-y-4">
      {(
        [
          ["Livability", program.indices.livability],
          ["Job security", program.indices.jobSecurity],
          ["Future proof", program.indices.futureProof],
          ["Selectivity", program.indices.selectivity],
          ["ROI", program.indices.roi],
        ] as const
      ).map(([label, score]) => (
        <Score key={label} label={label} score={score.score} rationale={score.rationale} />
      ))}
      <p className="text-sm">
        <span className="font-semibold text-ink">Visa prior {program.visa.range}. </span>
        {program.visa.rationale}
      </p>
    </div>
  );
}
