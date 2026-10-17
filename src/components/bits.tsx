import { Link } from "@tanstack/react-router";
import { ArrowUpRight } from "lucide-react";
import type { CardTone, IndexKey, Program } from "@/data/types";
import { getProgram } from "@/data/programs";

const toneClass: Record<CardTone, string> = {
  pink: "bg-brand-pink text-ink-fixed",
  teal: "bg-brand-teal text-on-dark",
  lavender: "bg-brand-lavender text-ink-fixed",
  peach: "bg-brand-peach text-ink-fixed",
  ochre: "bg-brand-ochre text-ink-fixed",
  cream: "bg-brand-cream text-ink-fixed",
};

export function toneClasses(tone: CardTone) {
  return toneClass[tone];
}

export function Score({
  label,
  score,
  rationale,
}: {
  label: string;
  score: number;
  rationale?: string;
}) {
  return (
    <div>
      <div className="flex items-baseline justify-between gap-3">
        <p className="text-sm font-semibold text-ink">{label}</p>
        <p className="tabular-nums text-sm font-semibold text-ink">
          {score}
          <span className="font-medium text-muted"> / 10</span>
        </p>
      </div>
      <div className="meter mt-2" aria-hidden>
        <span style={{ width: `${score * 10}%` }} />
      </div>
      <p className="sr-only">
        {label}: {score} out of 10
      </p>
      {rationale ? <p className="mt-2 text-sm leading-relaxed text-body">{rationale}</p> : null}
    </div>
  );
}

export function Kind({ kind }: { kind: "official" | "estimate" }) {
  return <span className={kind === "official" ? "pill pill-official" : "pill pill-estimate"}>{kind}</span>;
}

export function OfficialLink({ href, label = "Official program site" }: { href: string; label?: string }) {
  return (
    <a className="btn btn-primary" href={href} target="_blank" rel="noreferrer">
      {label}
      <ArrowUpRight className="size-4" aria-hidden />
    </a>
  );
}

export function ProgramCard({ program }: { program: Program }) {
  return (
    <article className={`feature-card flex h-full flex-col ${toneClasses(program.tone)}`}>
      <p className="text-xs font-semibold uppercase tracking-[0.14em] opacity-80">
        {String(program.rank).padStart(2, "0")} · {program.durationLabel}
      </p>
      <h3 className="mt-4 font-display text-3xl leading-none tracking-tight">{program.shortName}</h3>
      <p className="mt-3 text-sm leading-relaxed">{program.tagline}</p>
      <dl className="mt-6 space-y-2 text-sm">
        <div className="flex justify-between gap-4">
          <dt className="opacity-80">Visa prior</dt>
          <dd className="font-semibold tabular-nums">{program.visa.range}</dd>
        </div>
        <div className="flex justify-between gap-4">
          <dt className="opacity-80">Job security</dt>
          <dd className="font-semibold tabular-nums">{program.indices.jobSecurity.score} / 10</dd>
        </div>
        <div className="flex justify-between gap-4">
          <dt className="opacity-80">ROI</dt>
          <dd className="font-semibold tabular-nums">{program.indices.roi.score} / 10</dd>
        </div>
      </dl>
      <div className="mt-auto flex flex-wrap gap-2 pt-8">
        <Link
          to="/programs/$slug"
          params={{ slug: program.id }}
          className="btn btn-on-color"
        >
          Open brief
        </Link>
        <Link to="/compare" search={{ ids: program.id, cat: "overview" }} className="btn btn-on-color">
          Start a comparison
        </Link>
      </div>
    </article>
  );
}

const indexLabels: { key: IndexKey; label: string }[] = [
  { key: "livability", label: "Livability" },
  { key: "jobSecurity", label: "Job security" },
  { key: "futureProof", label: "Future proof" },
  { key: "selectivity", label: "Selectivity" },
  { key: "roi", label: "ROI" },
];

export function IndexTable({ rows }: { rows: Program[] }) {
  return (
    <div className="overflow-x-auto rounded-card border border-hairline">
      <table className="w-full min-w-[760px] border-collapse text-left text-sm">
        <caption className="sr-only">Index scores for all six programs, 1 to 10</caption>
        <thead>
          <tr className="border-b border-hairline bg-surface">
            <th scope="col" className="sticky left-0 bg-surface px-4 py-3 font-semibold text-ink">
              Program
            </th>
            {indexLabels.map((index) => (
              <th key={index.key} scope="col" className="px-4 py-3 font-semibold text-ink">
                {index.label}
              </th>
            ))}
            <th scope="col" className="px-4 py-3 font-semibold text-ink">
              Visa prior
            </th>
          </tr>
        </thead>
        <tbody>
          {rows.map((program) => (
            <tr key={program.id} className="border-b border-hairline last:border-0">
              <th scope="row" className="sticky left-0 bg-canvas px-4 py-3 font-semibold text-ink">
                <Link to="/programs/$slug" params={{ slug: program.id }} className="prose-link">
                  {program.shortName}
                </Link>
              </th>
              {indexLabels.map((index) => (
                <td key={index.key} className="px-4 py-3 tabular-nums text-ink">
                  {program.indices[index.key].score}
                  <span className="text-muted"> / 10</span>
                </td>
              ))}
              <td className="px-4 py-3 font-semibold tabular-nums text-ink">{program.visa.range}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export function Related({ program }: { program: Program }) {
  return (
    <ul className="grid gap-4 md:grid-cols-2">
      {program.related.map((item) => {
        const other = getProgram(item.with);
        if (!other) return null;
        const ids = [program.id, other.id].join(",");
        return (
          <li key={item.with} className="panel">
            <p className="text-sm font-semibold text-ink">
              {program.shortName} vs {other.shortName}
            </p>
            <p className="mt-2 text-sm leading-relaxed">{item.why}</p>
            <Link to="/compare" search={{ ids, cat: "overview" }} className="btn btn-secondary mt-4">
              Open this pair
            </Link>
          </li>
        );
      })}
    </ul>
  );
}

export function Sources({ program }: { program: Program }) {
  return (
    <ul className="space-y-2 text-sm">
      {program.sources.map((source) => (
        <li key={source.href}>
          <a className="prose-link" href={source.href} target="_blank" rel="noreferrer">
            {source.label}
          </a>
        </li>
      ))}
    </ul>
  );
}
