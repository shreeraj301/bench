import { createFileRoute, Link } from "@tanstack/react-router";
import { Shell } from "@/components/shell";
import { INDEX_META, UPDATED, VISA_NOTE } from "@/data/programs";

export const Route = createFileRoute("/methodology")({
  head: () => ({ meta: [{ title: "Indices methodology: Bench" }] }),
  component: MethodologyPage,
});

function MethodologyPage() {
  return (
    <Shell>
      <article className="mx-auto w-full max-w-page px-5 py-14 md:px-8 md:py-20">
        <p className="eyebrow">Methodology · updated {UPDATED}</p>
        <h1 className="display-lg mt-3 max-w-3xl">The scores are arguments with the numbers attached.</h1>
        <div className="mt-5 max-w-2xl space-y-4">
          <p>
            Every index is relative to these six programs only. A 9 is not a universal grade. It means “near
            the top of this short list, with the caveat written under the bar.”
          </p>
          <p>
            Official figures (tuition tables, published admit rates, employment reports, deadlines) are
            marked on each program page and linked. Estimates (city living bands, workload hours, visa
            ranges, search times where a school does not print one) are labeled Estimate or described as
            planning bands. If a number is not on this site, it is because the school did not publish it in
            a source we were willing to cite.
          </p>
        </div>

        <section className="mt-14 space-y-10">
          {INDEX_META.map((index) => (
            <section key={index.key}>
              <h2 className="display-sm">{index.label}</h2>
              <p className="mt-3 max-w-3xl">{index.definition}</p>
              <h3 className="mt-4 text-sm font-semibold uppercase tracking-[0.12em] text-muted">What moves the score</h3>
              <ul className="mt-2 max-w-3xl list-disc space-y-1 pl-5 text-sm">
                {index.criteria.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
              <p className="mt-3 max-w-3xl text-sm text-muted">
                <span className="font-semibold text-ink">Limit. </span>
                {index.limits}
              </p>
            </section>
          ))}
        </section>

        <section className="mt-16">
          <h2 className="display-sm">Visa chances</h2>
          <p className="mt-3 max-w-3xl">{VISA_NOTE}</p>
          <ul className="mt-4 max-w-3xl list-disc space-y-2 pl-5 text-sm">
            <li>STEM OPT eligibility, confirmed on the program page where the school states it, and flagged where you must check the I-20.</li>
            <li>Whether typical roles are design-studio roles (sponsor less) or PM and engineering-adjacent roles (sponsor more).</li>
            <li>City: Bay Area and Seattle have more sponsor-capable employers than Ann Arbor or Austin. They also have more applicants.</li>
            <li>Brand only insofar as it gets a resume read at a company that already has an immigration practice.</li>
            <li>A built-in internship (Georgia Tech) raises the prior relative to a one-year studio with no conversion path (UW), even when the city is less dense.</li>
          </ul>
          <p className="mt-4 max-w-3xl text-sm text-muted">
            The ranges would all move down in a hiring freeze and up if a specific employer extends a return
            offer. They are not probabilities from a model with a sample size. Do not put them in a
            spreadsheet as if they were.
          </p>
        </section>

        <section className="mt-16">
          <h2 className="display-sm">What we refused to invent</h2>
          <ul className="mt-4 max-w-3xl list-disc space-y-2 pl-5">
            <li>Acceptance rates for Berkeley, Washington, Georgia Tech, Michigan, and UT Austin. Only CMU printed one we could cite: 23% for the 2025–26 cycle.</li>
            <li>A UX-only employment rate for Michigan. The 88% figure is the whole MSI, and the page says so.</li>
            <li>Salary medians that are not in a cited report. Berkeley’s $120,000 is the class of 2023. Michigan’s $91,000 is the class of 2025. The others do not get a made-up number.</li>
            <li>Reddit yield math, forum admit lists, and “I heard the rate is 8%.”</li>
          </ul>
        </section>

        <section className="mt-16">
          <h2 className="display-sm">Sources, by kind</h2>
          <ul className="mt-4 max-w-3xl list-disc space-y-2 pl-5 text-sm">
            <li>Program sites for curriculum, deadlines, STEM language, cohort notes, and essay prompts.</li>
            <li>Bursar and registrar tables for tuition: CMU MHCI 2026–27, Georgia Tech Fall 2026, Berkeley I School 2026–27 budget, UW MHCI+D apply page, U-M Registrar 2026–27, UT Austin catalog Fall 2026–Spring 2027.</li>
            <li>Career offices: Berkeley MIMS career page and the 2026 Michigan MSI employment report.</li>
            <li>Living costs: official student budgets where the school prints them (Berkeley, UW academic-year figure, UT One Stop). Other cities use a labeled planning band.</li>
          </ul>
          <p className="mt-6 text-sm">
            Each brief lists its own links. Start at any{" "}
            <Link to="/programs/$slug" params={{ slug: "cmu" }} className="prose-link">
              program page
            </Link>{" "}
            or the{" "}
            <Link to="/framework" className="prose-link">
              decision framework
            </Link>
            .
          </p>
        </section>
      </article>
    </Shell>
  );
}
