import { createFileRoute, Link } from "@tanstack/react-router";
import { Check } from "lucide-react";
import { useState } from "react";
import { IndexTable, ProgramCard, toneClasses } from "@/components/bits";
import { Glossary } from "@/components/glossary";
import { Shell } from "@/components/shell";
import { UPDATED, pathways, programs } from "@/data/programs";
import type { ProgramId } from "@/data/types";

export const Route = createFileRoute("/")({
  component: Home,
});

function Home() {
  return (
    <Shell>
      <section className="mx-auto grid w-full max-w-page items-end gap-10 px-5 py-16 md:px-8 md:py-24 lg:grid-cols-12">
        <div className="lg:col-span-7">
          <p className="eyebrow">Decision framework · product design from India</p>
          <h1 className="display-xl mt-4">Six programs. One decision that survives the brochure.</h1>
          <p className="mt-6 max-w-xl text-lg leading-relaxed text-body">
            Carnegie Mellon, Georgia Tech, Berkeley, Washington, Michigan, and UT Austin: cost, outcomes,
            curriculum, and a visa prior you can argue with. Updated {UPDATED}.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link to="/compare" search={{ ids: "cmu,uw", cat: "overview" }} className="btn btn-primary">
              Compare CMU and UW
            </Link>
            <Link to="/framework" className="btn btn-secondary">
              Open the decision framework
            </Link>
          </div>
        </div>
        <aside className={`feature-card lg:col-span-5 ${toneClasses("teal")}`}>
          <p className="text-xs font-semibold uppercase tracking-[0.14em] text-on-dark-soft">
            Decision order, not a quality ladder
          </p>
          <p className="mt-3 text-sm text-on-dark-soft">
            This order uses one weighting: product design, from India, on an F-1. Change the weighting in the
            decision framework and the order can change. It does not say which school is better in the abstract.
          </p>
          <ol className="mt-5 space-y-3">
            {programs.map((program) => (
              <li key={program.id} className="flex gap-3">
                <span className="w-6 font-display text-2xl leading-none">{program.rank}</span>
                <span>
                  <Link to="/programs/$slug" params={{ slug: program.id }} className="font-semibold underline decoration-white/40 underline-offset-4">
                    {program.shortName}
                  </Link>
                  <span className="mt-1 block text-sm text-on-dark-soft">{program.rankReason}</span>
                </span>
              </li>
            ))}
          </ol>
        </aside>
      </section>

      <section className="mx-auto w-full max-w-page px-5 pb-16 md:px-8 md:pb-24">
        <div className="max-w-2xl">
          <p className="eyebrow">This order assumes</p>
          <h2 className="display-md mt-3">A designer, not a tourist.</h2>
        </div>
        <ul className="mt-8 grid gap-4 md:grid-cols-3">
          {[
            "You want product design, with UX research and PM as adjacent doors, not a generic “tech master’s.”",
            "You will attend on an F-1, need STEM OPT, and cannot pretend every design studio sponsors.",
            "Cost matters. It does not outrank a degree that leaves your portfolio where it is.",
          ].map((line) => (
            <li key={line} className="panel text-sm leading-relaxed">
              {line}
            </li>
          ))}
        </ul>
        <p className="mt-6 max-w-3xl text-sm text-muted">
          A PM-first reader should put Berkeley first. A cash-first reader should price UT Austin’s $9,893
          semester before falling for a brand. The{" "}
          <Link to="/framework" className="prose-link">
            decision framework
          </Link>{" "}
          is the override switch.
        </p>
      </section>

      <section className="mx-auto w-full max-w-page px-5 pb-16 md:px-8 md:pb-24">
        <p className="eyebrow">Best for</p>
        <h2 className="display-md mt-3">Start from the job, not the logo.</h2>
        <div className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-6">
          {pathways.map((pathway, index) => (
            <article
              key={pathway.id}
              className={`feature-card xl:col-span-2 ${index >= 3 ? "xl:col-span-3" : ""} ${toneClasses(pathway.tone)}`}
            >
              <h3 className="font-display text-3xl leading-none tracking-tight">{pathway.title}</h3>
              <p className="mt-3 text-sm leading-relaxed">{pathway.blurb}</p>
              <ul className="mt-5 space-y-2 text-sm font-semibold">
                {pathway.ids.map((id, order) => {
                  const program = programs.find((item) => item.id === id);
                  if (!program) return null;
                  return (
                    <li key={id}>
                      <Link to="/programs/$slug" params={{ slug: id }} className="underline decoration-current/30 underline-offset-4">
                        {order + 1}. {program.shortName}
                      </Link>
                    </li>
                  );
                })}
              </ul>
              <Link
                to="/compare"
                search={{ ids: pathway.ids.join(","), cat: pathway.id === "cost" ? "cost" : "overview" }}
                className="btn btn-on-color mt-6"
              >
                Compare this path
              </Link>
            </article>
          ))}
        </div>
      </section>

      <section className="mx-auto w-full max-w-page px-5 pb-16 md:px-8 md:pb-24">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="eyebrow">The six</p>
            <h2 className="display-md mt-3">Open any brief on its own.</h2>
          </div>
          <p className="max-w-sm text-sm text-muted">
            Each page holds curriculum, cost, aid, outcomes, indices, visa prior, and the essay the school
            actually asks for.
          </p>
        </div>
        <p className="mt-4 max-w-3xl text-sm">
          Visa prior is a planning range, not a score. Job security, future proof, and the other indices run
          from 1 to 10 against these six only. Holds is where a program is strong for this decision. Costs you
          is the trade. Full freight means published tuition, with no assumed scholarship.
        </p>
        <div className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {programs.map((program) => (
            <ProgramCard key={program.id} program={program} />
          ))}
        </div>
      </section>

      <CompareEntry />

      <section className="mx-auto w-full max-w-page px-5 py-16 md:px-8 md:py-24">
        <div className="max-w-2xl">
          <p className="eyebrow">Indices</p>
          <h2 className="display-md mt-3">Scores you can disagree with.</h2>
          <p className="mt-4 text-body">
            Livability, job security, future proof, selectivity, and ROI run from 1 to 10, relative to these
            six only. Visa is a percentage range, not a score. Definitions live in the{" "}
            <Link to="/methodology" className="prose-link">
              methodology
            </Link>
            .
          </p>
        </div>
        <div className="mt-8">
          <IndexTable rows={programs} />
        </div>
        <div className="mt-6">
          <Glossary open />
        </div>
      </section>
    </Shell>
  );
}

function CompareEntry() {
  const [selected, setSelected] = useState<ProgramId[]>(["cmu", "uw"]);
  const toggle = (id: ProgramId) => {
    setSelected((current) => {
      if (current.includes(id)) return current.filter((item) => item !== id);
      if (current.length >= 3) return current;
      return [...current, id];
    });
  };
  const ready = selected.length >= 2;

  return (
    <section className="bg-surface-soft">
      <div className="mx-auto w-full max-w-page px-5 py-16 md:px-8 md:py-24">
        <p className="eyebrow">Compare</p>
        <h2 className="display-md mt-3">Two or three. Not six.</h2>
        <p className="mt-4 max-w-2xl">
          A meaningful comparison fits on one screen. Pick a pair or a trio. The link you get is the share.
        </p>
        {selected.length >= 3 ? (
          <p id="home-limit" className="mt-4 text-sm font-semibold text-ink" role="status">
            Three is the maximum. Remove one to swap.
          </p>
        ) : null}
        <ul className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {programs.map((program) => {
            const on = selected.includes(program.id);
            const disabled = !on && selected.length >= 3;
            return (
              <li key={program.id}>
                <button
                  type="button"
                  aria-pressed={on}
                  disabled={disabled}
                  aria-describedby={disabled ? "home-limit" : undefined}
                  onClick={() => toggle(program.id)}
                  className={`pick flex min-h-14 w-full items-center gap-3 rounded-card border px-4 py-3 text-left ${
                    on ? "border-ink bg-canvas" : "border-hairline bg-canvas"
                  }`}
                >
                  <span
                    aria-hidden
                    className={`grid size-4 place-items-center rounded-xs border ${on ? "border-ink bg-ink text-on-primary" : "border-muted"}`}
                  >
                    {on ? <Check className="size-3" aria-hidden /> : null}
                  </span>
                  <span>
                    <span className="block text-sm font-semibold text-ink">{program.shortName}</span>
                    <span className="block text-sm text-muted">{program.durationLabel}</span>
                  </span>
                </button>
              </li>
            );
          })}
        </ul>
        <div className="mt-6 flex flex-wrap items-center gap-4">
          {ready ? (
            <Link
              to="/compare"
              search={{ ids: selected.join(","), cat: "overview" }}
              className="btn btn-primary"
            >
              Compare {selected.length}
            </Link>
          ) : (
            <button type="button" className="btn" disabled>
              Select at least 2
            </button>
          )}
          <p className="text-sm text-muted" aria-live="polite">
            {selected.length} of 3 selected.
          </p>
        </div>
      </div>
    </section>
  );
}
