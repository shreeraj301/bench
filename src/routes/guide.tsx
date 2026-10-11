import { createFileRoute, Link } from "@tanstack/react-router";
import { Shell } from "@/components/shell";
import { UPDATED, programs } from "@/data/programs";

export const Route = createFileRoute("/guide")({
  head: () => ({ meta: [{ title: "Application guide — Bench" }] }),
  component: GuidePage,
});

function GuidePage() {
  return (
    <Shell>
      <article className="mx-auto w-full max-w-page px-5 py-14 md:px-8 md:py-20">
        <p className="eyebrow">Application guide · updated {UPDATED}</p>
        <h1 className="display-lg mt-3 max-w-3xl">The materials are similar. The filters are not.</h1>
        <p className="mt-5 max-w-2xl text-lg">
          Six forms, one portfolio, and a calendar that piles up in January. This page is the cross-program
          view. Program pages hold the essay strategy for each prompt.
        </p>

        <section className="mt-14">
          <h2 className="display-sm">Deadlines</h2>
          <div className="mt-6 overflow-x-auto rounded-card border border-hairline">
            <table className="w-full min-w-[680px] text-left text-sm">
              <caption className="sr-only">Application deadlines</caption>
              <thead>
                <tr className="border-b border-hairline bg-surface">
                  <th className="px-4 py-3 font-semibold text-ink">Program</th>
                  <th className="px-4 py-3 font-semibold text-ink">When</th>
                  <th className="px-4 py-3 font-semibold text-ink">GRE</th>
                </tr>
              </thead>
              <tbody>
                {programs.map((program) => (
                  <tr key={program.id} className="border-b border-hairline align-top last:border-0">
                    <th scope="row" className="px-4 py-3 font-semibold text-ink">
                      <Link to="/programs/$slug" params={{ slug: program.id }} className="prose-link">
                        {program.shortName}
                      </Link>
                    </th>
                    <td className="px-4 py-3">{program.application.deadline}</td>
                    <td className="px-4 py-3">{program.application.gre}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="mt-3 text-sm text-muted">
            Michigan’s date moves by cycle. Do not reuse a May date from a news post without checking the
            live form. Georgia Tech’s February 1 date is stated on the process page; confirm the year in
            the portal.
          </p>
        </section>

        <section className="mt-16">
          <h2 className="display-sm">What every file should contain</h2>
          <ul className="mt-6 grid gap-4 md:grid-cols-2">
            {[
              ["Resume", "One page if you can. Projects with your role, the users, and the decision. A tool list is not a resume."],
              ["Recommendations", "Three is the safe number (required at CMU and UT). Ask people who saw you collaborate. Give them the pathway you are claiming."],
              ["Transcripts", "English translations where the school asks. A 3.0 is the stated floor at Georgia Tech and Michigan. It is not the competitive center."],
              ["English scores", "Georgia Tech prints a TOEFL floor of 100 and notes recent admits nearer 110. Berkeley’s admitted average is 111. Check every other cutoff on the live form."],
              ["Portfolio", "Required for UW, and for Georgia Tech’s design and media tracks. Optional at CMU, still useful. Bring one for Michigan UX and for UT if you want an HCI or UX read."],
              ["Video", "Required at CMU (one minute, on camera) and UW (one minute). Georgia Tech asks for a video too. Do not read the essay. Show one decision."],
            ].map(([title, copy]) => (
              <li key={title} className="panel">
                <h3 className="font-semibold text-ink">{title}</h3>
                <p className="mt-2 text-sm leading-relaxed">{copy}</p>
              </li>
            ))}
          </ul>
        </section>

        <section className="mt-16">
          <h2 className="display-sm">Where the forms diverge</h2>
          <div className="mt-6 space-y-3">
            {programs.map((program) => (
              <details key={program.id} className="fold">
                <summary>
                  {program.shortName}
                  <span className="text-sm font-medium text-muted">{program.application.sop.limit}</span>
                </summary>
                <div className="pb-4 text-sm leading-relaxed">
                  <p>
                    {program.application.sop.type}. {program.application.sop.strategy[0]}
                  </p>
                  <Link to="/programs/$slug" params={{ slug: program.id }} hash="sop" className="prose-link mt-3 inline-flex">
                    Full essay notes
                  </Link>
                </div>
              </details>
            ))}
          </div>
        </section>

        <section className="mt-16">
          <h2 className="display-sm">Portfolio, without the folklore</h2>
          <div className="mt-4 max-w-3xl space-y-4">
            <p>
              Two or three projects. Each one needs a person who is not you, a constraint that was not
              “make it pretty,” and something you changed after evidence. Visual polish without that loop
              fails UW and the Georgia Tech design tracks. It also fails CMU’s video, which is a thinking
              test wearing a time limit.
            </p>
            <p>
              Michigan and Berkeley will read product judgment and research even when the pixels are plain.
              UT will believe whatever concentration your projects support. A human-centered AI claim with
              only marketing mockups is a mismatch, not a vibe.
            </p>
            <p>
              Password-protect only if you must, and put the password in the form where they ask. A locked
              deck that reviewers cannot open is a rejection you wrote yourself.
            </p>
          </div>
        </section>

        <section className="mt-16 grid gap-4 md:grid-cols-2">
          <div className="feature-card bg-brand-ochre text-ink-fixed">
            <h2 className="font-display text-3xl leading-none tracking-tight">January is one month</h2>
            <p className="mt-3 text-sm leading-relaxed">
              UT on the 5th, Berkeley on the 6th, CMU on the 15th, UW on the 18th, Georgia Tech on 1
              February. Recommenders do not experience these as separate deadlines. Ask in November.
            </p>
          </div>
          <div className="feature-card bg-brand-lavender text-ink-fixed">
            <h2 className="font-display text-3xl leading-none tracking-tight">Do not send six identical essays</h2>
            <p className="mt-3 text-sm leading-relaxed">
              The facts of your life can repeat. The bet cannot. CMU wants impact and responsibility in 500
              words. Berkeley wants a systems future. UW wants a prototype loop. If the paragraphs swap
              cleanly, none of them is finished.
            </p>
          </div>
        </section>
      </article>
    </Shell>
  );
}
