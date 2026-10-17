import { createFileRoute, Link } from "@tanstack/react-router";
import { Shell } from "@/components/shell";
import { Glossary } from "@/components/glossary";
import { INDEX_META } from "@/data/programs";

export const Route = createFileRoute("/framework")({
  head: () => ({ meta: [{ title: "Decision framework: Bench" }] }),
  component: FrameworkPage,
});

const scenarios = [
  {
    title: "The portfolio is the gap",
    body: "Weight craft over brand. Start with UW versus CMU. Washington will make you design every week. Carnegie Mellon will make you ship a seven-month client project and will not teach you form if you arrive without it. Georgia Tech’s industrial design track is the third door, and only if you apply to that track.",
    search: { ids: "uw,cmu", cat: "curriculum" as const },
    cta: "Compare UW and CMU on curriculum",
  },
  {
    title: "The target job is product management",
    body: "Put Berkeley first. Michigan’s new PM pathway is the serious alternative if you want the skill without the Bay Area burn. CMU can reach PM through strategy and the capstone, and it is still a design-and-research degree. Do not pick a studio program and hope the title changes.",
    search: { ids: "berkeley,umich,cmu", cat: "outcomes" as const },
    cta: "Compare the PM three",
  },
  {
    title: "You want research, not another mockup class",
    body: "Michigan’s UX pathway is built for methods. Georgia Tech Psychology is the methods track inside a more technical school. CMU will give you research inside a product team, on a clock. If your portfolio has never survived contact with a user who disagreed, fix that before you optimize prestige.",
    search: { ids: "umich,gatech", cat: "curriculum" as const },
    cta: "Compare Michigan and Georgia Tech",
  },
  {
    title: "Cash is the constraint",
    body: "Price UT Austin first: $9,893 per nine-hour nonresident semester on the Fall 2026–Spring 2027 information-school table. Then ask whether a one-year program returns you to a salary soon enough to beat two cheap years. UW at about $64k tuition can win that math. Georgia Tech’s professional rate is not the bargain people remember from in-state rumors.",
    search: { ids: "utaustin,uw,gatech", cat: "cost" as const },
    cta: "Compare the cost three",
  },
  {
    title: "The visa is the constraint",
    body: "Bias toward STEM-designated degrees (confirm the CIP on the I-20, especially at Michigan) and toward employers that have sponsored before. Berkeley’s range is the highest prior in this set because PM and engineering-adjacent roles sponsor more often than design studios. A beautiful portfolio aimed only at studios is a weak visa plan at every school, including CMU.",
    search: { ids: "berkeley,cmu,uw", cat: "indices" as const },
    cta: "Compare visa priors",
  },
];

function FrameworkPage() {
  return (
    <Shell>
      <article className="mx-auto w-full max-w-page px-5 py-14 md:px-8 md:py-20">
        <p className="eyebrow">Decision framework</p>
        <h1 className="display-lg mt-3 max-w-3xl">Weight the indices against a life, not against a ranking.</h1>
        <div className="mt-8 max-w-3xl">
          <Glossary compact />
        </div>
        <p className="mt-5 max-w-2xl text-lg">
          The working rank on the homepage is for a product-design move, from India, with tuition that has
          to be survived. If that is not you, change the weights. The scores will not be offended.
        </p>

        <section className="mt-14">
          <h2 className="display-sm">How to use a 1–10</h2>
          <ul className="mt-6 grid gap-4 md:grid-cols-2">
            {INDEX_META.map((index) => (
              <li key={index.key} className="panel">
                <h3 className="font-semibold text-ink">{index.label}</h3>
                <p className="mt-2 text-sm leading-relaxed">{index.definition}</p>
              </li>
            ))}
            <li className="panel">
              <h3 className="font-semibold text-ink">Visa chances</h3>
              <p className="mt-2 text-sm leading-relaxed">
                A percentage range, not a score. It is a prior about OPT and sponsorship, not about getting
                in. Read the limit before you treat 65–80% as a plan.
              </p>
            </li>
          </ul>
          <p className="mt-4 text-sm">
            Full criteria and the things these numbers cannot see are on the{" "}
            <Link to="/methodology" className="prose-link">
              methodology page
            </Link>
            .
          </p>
        </section>

        <section className="mt-16">
          <h2 className="display-sm">A weighting you can steal</h2>
          <div className="mt-6 overflow-x-auto rounded-card border border-hairline">
            <table className="w-full min-w-[640px] text-left text-sm">
              <thead>
                <tr className="border-b border-hairline bg-surface">
                  <th className="px-4 py-3 font-semibold text-ink">If this is the real constraint</th>
                  <th className="px-4 py-3 font-semibold text-ink">Turn up</th>
                  <th className="px-4 py-3 font-semibold text-ink">Turn down</th>
                </tr>
              </thead>
              <tbody>
                {[
                  ["Craft gap in the portfolio", "Future proof, and the curriculum page", "Selectivity as a quality signal"],
                  ["Need a sponsor-capable job", "Job security and the visa range", "Livability, until you have an offer"],
                  ["Debt you cannot carry", "ROI and the cost table", "Brand, including CMU at rank 1"],
                  ["You can fund one intense year", "Speed: CMU or UW", "Two-year flexibility you will not use"],
                  ["You want research credentials", "Michigan and Georgia Tech methods", "One-year studio speed"],
                ].map((row) => (
                  <tr key={row[0]} className="border-b border-hairline align-top last:border-0">
                    {row.map((cell) => (
                      <td key={cell} className="px-4 py-3">
                        {cell}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="mt-3 text-sm text-muted">
            Selectivity is a planning input: how many applications, how finished the work must be. A higher
            score is a harder door. It is not a better education.
          </p>
        </section>

        <section className="mt-16 space-y-4">
          <h2 className="display-sm">Five honest forks</h2>
          {scenarios.map((scenario, index) => (
            <article key={scenario.title} className="panel">
              <p className="eyebrow">0{index + 1}</p>
              <h3 className="mt-2 text-xl font-semibold text-ink">{scenario.title}</h3>
              <p className="mt-2 max-w-3xl text-sm leading-relaxed">{scenario.body}</p>
              <Link to="/compare" search={scenario.search} className="btn btn-secondary mt-4">
                {scenario.cta}
              </Link>
            </article>
          ))}
        </section>

        <section className="mt-16">
          <h2 className="display-sm">A 90-second comparison</h2>
          <ol className="mt-4 max-w-3xl list-decimal space-y-2 pl-5">
            <li>Pick two programs, or three if one is a spoiler on cost.</li>
            <li>Read Cost. If the invoice is impossible, stop. Taste cannot refinance it.</li>
            <li>Read Outcomes, including who the employment number actually describes.</li>
            <li>Read Indices last, as a check on the story you just told yourself.</li>
            <li>Open essay notes only for the finalists. Writing six statements is how January disappears.</li>
          </ol>
        </section>
      </article>
    </Shell>
  );
}
