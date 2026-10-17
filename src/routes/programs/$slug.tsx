import { createFileRoute, Link } from "@tanstack/react-router";
import { OfficialLink, Related, Score, Sources, toneClasses, Kind } from "@/components/bits";
import { Glossary } from "@/components/glossary";
import { Shell } from "@/components/shell";
import { UPDATED, getProgram } from "@/data/programs";

export const Route = createFileRoute("/programs/$slug")({
  head: ({ params }) => {
    const program = getProgram(params.slug);
    return {
      meta: [
        {
          title: program ? `${program.shortName}: Bench` : "Program: Bench",
        },
      ],
    };
  },
  component: ProgramPage,
});

const jumps = [
  ["overview", "Overview"],
  ["curriculum", "Curriculum"],
  ["capstone", "Capstone"],
  ["cohort", "Cohort"],
  ["cost", "Cost"],
  ["funding", "Funding"],
  ["application", "Application"],
  ["outcomes", "Outcomes"],
  ["indices", "Indices"],
  ["sop", "Essay"],
  ["sources", "Sources"],
] as const;

function ProgramPage() {
  const { slug } = Route.useParams();
  const program = getProgram(slug);

  if (!program) {
    return (
      <Shell>
        <div className="mx-auto w-full max-w-page px-5 py-24 md:px-8">
          <h1 className="display-md">That program is not on this bench.</h1>
          <Link to="/" className="btn btn-primary mt-6">
            Back to the six
          </Link>
        </div>
      </Shell>
    );
  }

  return (
    <Shell>
      <header className="mx-auto grid w-full max-w-page gap-8 px-5 py-14 md:px-8 md:py-20 lg:grid-cols-12">
        <div className="lg:col-span-7">
          <p className="eyebrow">
            Rank {program.rank} of 6 · {program.city}
          </p>
          <h1 className="display-lg mt-3">{program.shortName}</h1>
          <p className="mt-4 text-lg text-body">{program.degree}</p>
          <p className="mt-4 max-w-xl">{program.tagline}</p>
          <div className="mt-8 flex flex-wrap gap-3">
            <OfficialLink href={program.officialUrl} />
            <Link to="/compare" search={{ ids: program.id, cat: "overview" }} className="btn btn-secondary">
              Start a comparison
            </Link>
          </div>
          <p className="mt-4 max-w-xl text-sm text-body">
            Visa prior is a planning range for OPT and for whether employers in that market sponsor. It is not
            an admission rate. All-in sketch is tuition plus a living estimate, not an invoice.
          </p>
        </div>
        <aside className={`feature-card lg:col-span-5 ${toneClasses(program.tone)}`}>
          <p className="text-xs font-semibold uppercase tracking-[0.14em] opacity-80">At a glance</p>
          <dl className="mt-4 space-y-3 text-sm">
            <Row label="Length" value={program.durationLabel} />
            <Row label="Acceptance" value={program.acceptance.rate} />
            <Row label="Visa prior" value={program.visa.range} />
            <Row label="All-in sketch" value={program.cost.total} />
          </dl>
        </aside>
      </header>

      <nav className="no-print border-y border-hairline" aria-label="On this page">
        <ul className="mx-auto flex w-full max-w-page gap-2 overflow-x-auto px-5 py-3 md:px-8">
          {jumps.map(([id, label]) => (
            <li key={id}>
              <a className="tab whitespace-nowrap" href={`#${id}`}>
                {label}
              </a>
            </li>
          ))}
        </ul>
      </nav>

      <div className="mx-auto w-full max-w-page space-y-16 px-5 py-16 md:space-y-24 md:px-8 md:py-24">
        <section id="overview">
          <p className="eyebrow">Overview</p>
          <h2 className="display-sm mt-3">Why it sits at {program.rank}.</h2>
          <p className="mt-4 max-w-3xl font-semibold text-ink">{program.rankReason}</p>
          <div className="mt-4 max-w-3xl space-y-4">
            {program.overview.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
          <div className="mt-8 grid gap-4 md:grid-cols-2">
            <div className="panel">
              <h3 className="text-lg font-semibold text-ink">Where it is strong</h3>
              <ul className="mt-3 list-disc space-y-2 pl-4 text-sm">
                {program.excels.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
            <div className="panel">
              <h3 className="text-lg font-semibold text-ink">What you give up</h3>
              <ul className="mt-3 list-disc space-y-2 pl-4 text-sm">
                {program.tradeoffs.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        <section id="curriculum">
          <p className="eyebrow">Curriculum and learning model</p>
          <h2 className="display-sm mt-3">What the year actually is.</h2>
          <p className="mt-4 max-w-3xl">{program.curriculum.summary}</p>
          <ul className="mt-6 grid gap-3 md:grid-cols-2">
            {program.curriculum.points.map((point) => (
              <li key={point} className="panel text-sm">
                {point}
              </li>
            ))}
          </ul>
        </section>

        <section id="capstone">
          <p className="eyebrow">Capstone and internship</p>
          <h2 className="display-sm mt-3">The piece that becomes the portfolio.</h2>
          <p className="mt-4 max-w-3xl">{program.capstone.summary}</p>
          <ul className="mt-4 max-w-3xl list-disc space-y-2 pl-5 text-sm">
            {program.capstone.points.map((point) => (
              <li key={point}>{point}</li>
            ))}
          </ul>
        </section>

        <section id="cohort">
          <p className="eyebrow">Cohort and intensity</p>
          <h2 className="display-sm mt-3">Who is in the room, and how hard the week is.</h2>
          <dl className="mt-6 grid gap-4 md:grid-cols-3">
            <Info label="Class size" value={program.cohort.size} />
            <Info label="Workload" value={program.cohort.workload} />
            <Info label="How people work" value={program.cohort.style} />
          </dl>
          <ul className="mt-4 max-w-3xl list-disc space-y-2 pl-5 text-sm">
            {program.cohort.points.map((point) => (
              <li key={point}>{point}</li>
            ))}
          </ul>
        </section>

        <section id="cost">
          <p className="eyebrow">Cost of attendance</p>
          <h2 className="display-sm mt-3">{program.cost.headline}</h2>
          <div className="mt-6 overflow-x-auto rounded-card border border-hairline">
            <table className="w-full min-w-[640px] text-left text-sm">
              <caption className="sr-only">Cost lines for {program.shortName}</caption>
              <thead>
                <tr className="border-b border-hairline bg-surface">
                  <th className="px-4 py-3 font-semibold text-ink">Line</th>
                  <th className="px-4 py-3 font-semibold text-ink">Amount</th>
                  <th className="px-4 py-3 font-semibold text-ink">Note</th>
                </tr>
              </thead>
              <tbody>
                {program.cost.lines.map((line) => (
                  <tr key={line.label} className="border-b border-hairline last:border-0 align-top">
                    <th scope="row" className="px-4 py-3 font-semibold text-ink">
                      <span className="mr-2">{line.label}</span>
                      <Kind kind={line.kind} />
                    </th>
                    <td className="px-4 py-3 text-ink">{line.value}</td>
                    <td className="px-4 py-3 text-muted">{line.note}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="mt-4 max-w-3xl text-sm">
            <span className="font-semibold text-ink">{program.cost.total}. </span>
            {program.cost.totalNote}
          </p>
        </section>

        <section id="funding">
          <p className="eyebrow">Funding and scholarships</p>
          <h2 className="display-sm mt-3">What you can actually plan on.</h2>
          <p className="mt-4 max-w-3xl">{program.funding.summary}</p>
          <ul className="mt-4 max-w-3xl list-disc space-y-2 pl-5 text-sm">
            {program.funding.points.map((point) => (
              <li key={point}>{point}</li>
            ))}
          </ul>
        </section>

        <section id="application">
          <p className="eyebrow">Application readiness</p>
          <h2 className="display-sm mt-3">Deadline, materials, and the GRE question.</h2>
          <div className="mt-6 grid gap-4 md:grid-cols-2">
            <div className="panel">
              <h3 className="text-lg font-semibold text-ink">Deadline</h3>
              <p className="mt-2 text-sm">{program.application.deadline}</p>
              <h3 className="mt-4 text-lg font-semibold text-ink">GRE</h3>
              <p className="mt-2 text-sm">{program.application.gre}</p>
            </div>
            <ul className="panel list-disc space-y-2 pl-5 text-sm">
              {program.application.checklist.map((item) => (
                <li key={item.item}>
                  <span className="font-semibold text-ink">{item.item}. </span>
                  {item.detail}
                </li>
              ))}
            </ul>
          </div>
          <p className="mt-4 text-sm">
            Cross-program differences are collected in the{" "}
            <Link to="/guide" className="prose-link">
              application guide
            </Link>
            .
          </p>
        </section>

        <section id="outcomes">
          <p className="eyebrow">Outcomes and the job market</p>
          <h2 className="display-sm mt-3">What “placed” means here.</h2>
          <p className="mt-4 max-w-3xl">{program.outcomes.summary}</p>
          <p className="mt-4 max-w-3xl text-sm">
            <span className="font-semibold text-ink">Search time. </span>
            {program.outcomes.searchTime}
          </p>
          <div className="mt-6 grid gap-4 md:grid-cols-2">
            <div className="panel">
              <h3 className="font-semibold text-ink">Roles to picture</h3>
              <ul className="mt-2 list-disc space-y-1 pl-4 text-sm">
                {program.outcomes.roles.map((role) => (
                  <li key={role}>{role}</li>
                ))}
              </ul>
            </div>
            <div className="panel">
              <h3 className="font-semibold text-ink">Employer pattern</h3>
              <ul className="mt-2 list-disc space-y-1 pl-4 text-sm">
                {program.outcomes.employers.map((employer) => (
                  <li key={employer}>{employer}</li>
                ))}
              </ul>
            </div>
          </div>
          <ul className="mt-4 max-w-3xl list-disc space-y-2 pl-5 text-sm">
            {program.outcomes.points.map((point) => (
              <li key={point}>{point}</li>
            ))}
          </ul>
          <div className="panel mt-6">
            <h3 className="font-semibold text-ink">Acceptance rate</h3>
            <p className="mt-2 text-sm">
              <span className="font-semibold text-ink">{program.acceptance.rate}. </span>
              {program.acceptance.note}
            </p>
          </div>
        </section>

        <section id="indices">
          <p className="eyebrow">Indices</p>
          <h2 className="display-sm mt-3">Five scores and a visa range.</h2>
          <p className="mt-3 max-w-3xl text-sm text-muted">
            Relative to these six programs only. Higher selectivity means a harder door, not a better school.{" "}
            <Link to="/methodology" className="prose-link">
              How the scores are built
            </Link>
            .
          </p>
          <div className="mt-6 grid gap-6 md:grid-cols-2">
            <Score label="Livability" score={program.indices.livability.score} rationale={program.indices.livability.rationale} />
            <Score label="Job security" score={program.indices.jobSecurity.score} rationale={program.indices.jobSecurity.rationale} />
            <Score label="Future proof" score={program.indices.futureProof.score} rationale={program.indices.futureProof.rationale} />
            <Score label="Selectivity" score={program.indices.selectivity.score} rationale={program.indices.selectivity.rationale} />
            <Score label="ROI" score={program.indices.roi.score} rationale={program.indices.roi.rationale} />
            <div className="panel">
              <p className="text-sm font-semibold text-ink">Visa chances</p>
              <p className="mt-1 font-display text-4xl text-ink">{program.visa.range}</p>
              <p className="mt-3 text-sm leading-relaxed">{program.visa.rationale}</p>
            </div>
          </div>
        </section>

        <section id="sop">
          <p className="eyebrow">Essay strategy</p>
          <h2 className="display-sm mt-3">
            {program.application.sop.type} · {program.application.sop.limit}
          </h2>
          <ol className="mt-6 max-w-3xl list-decimal space-y-3 pl-5">
            {program.application.sop.strategy.map((step) => (
              <li key={step}>{step}</li>
            ))}
          </ol>
        </section>

        <section>
          <p className="eyebrow">Related comparisons</p>
          <h2 className="display-sm mt-3">The pairs worth opening.</h2>
          <div className="mt-6">
            <Related program={program} />
          </div>
        </section>

        <section id="sources">
          <p className="eyebrow">Sources · updated {UPDATED}</p>
          <h2 className="display-sm mt-3">Where the numbers came from.</h2>
          <p className="mt-3 max-w-3xl text-sm text-muted">
            Official figures are marked on the cost table. Estimates are planning bands, labeled as such.
            Open the source before you cite a number in your own notes.
          </p>
          <div className="mt-4">
            <Sources program={program} />
          </div>
          <div className="mt-8">
            <Glossary />
          </div>
          <div className="mt-8">
            <OfficialLink href={program.officialUrl} label={`Open ${program.university}`} />
          </div>
        </section>
      </div>
    </Shell>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-baseline justify-between gap-4 border-b border-current/20 pb-2 last:border-0">
      <dt className="opacity-80">{label}</dt>
      <dd className="text-right font-semibold">{value}</dd>
    </div>
  );
}

function Info({ label, value }: { label: string; value: string }) {
  return (
    <div className="panel">
      <dt className="eyebrow">{label}</dt>
      <dd className="mt-2 text-sm leading-relaxed">{value}</dd>
    </div>
  );
}
