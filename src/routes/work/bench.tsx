import { createFileRoute, Link, stripSearchParams } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { Shell } from "@/components/shell";
import { programs } from "@/data/programs";

export const Route = createFileRoute("/work/bench")({
  validateSearch: (search: Record<string, unknown>) => ({
    read: search.read === "quick" ? ("quick" as const) : ("full" as const),
  }),
  search: {
    middlewares: [stripSearchParams({ read: "full" })],
  },
  head: () => ({
    meta: [
      { title: "Bench case study: a comparison that stays a decision" },
      {
        name: "description",
        content:
          "How Bench holds six HCI programs to the same fields, two or three at a time, with sources left on the page.",
      },
    ],
  }),
  component: CasePage,
});

const SECTIONS = [
  { id: "opening", label: "Opening", quick: true },
  { id: "problem", label: "The problem", quick: true },
  { id: "who", label: "Who", quick: false },
  { id: "research", label: "Research", quick: false },
  { id: "insights", label: "Insights", quick: true },
  { id: "alternatives", label: "Alternatives", quick: false },
  { id: "decision", label: "The decision", quick: true },
  { id: "scope", label: "Shipped and scrapped", quick: false },
  { id: "solution", label: "What shipped", quick: true },
  { id: "outcomes", label: "Outcomes", quick: true },
  { id: "access", label: "Access and limits", quick: false },
  { id: "reflection", label: "Reflection", quick: true },
] as const;

const TRACE = [
  {
    id: "chapter-01",
    finding: "Six schools at once stop being a decision.",
    evidence: "Judgement, from the brief. Not a timed test.",
    principle: "Compare two or three, and say why the fourth is refused.",
    chapter: "Chapter 01",
  },
  {
    id: "chapter-02",
    finding: "A tuition line without rent, or an estimate without a label, both mislead.",
    evidence: "The university table and the program pages. October 2026.",
    principle: "Mark official and estimate, and keep the link.",
    chapter: "Chapter 02",
  },
  {
    id: "chapter-03",
    finding: "A numbered list will be read as a quality ranking unless the page says otherwise.",
    evidence: "Hypothesis, then the hero card copy.",
    principle: "Name the weighting in the same view as the order.",
    chapter: "Chapter 03",
  },
] as const;

const PAINS = [
  {
    id: "pain-design",
    n: "01",
    question: "Which school is actually for product design?",
    cost: "A brochure line and a curriculum are not the same claim.",
    evidence: "Evidence: the six pages do not share a curriculum shape. Judgement: sorting by logo would hide that.",
    severity: "High. It changes which two schools you open first.",
  },
  {
    id: "pain-cost",
    n: "02",
    question: "What does the year cost once rent is in the number?",
    cost: "Tuition alone makes a cheap school look cheaper than it is.",
    evidence: "Evidence: bursar tables and labeled living bands, checked 11 October 2026.",
    severity: "High. It can flip a one-year program against a two-year one.",
  },
  {
    id: "pain-visa",
    n: "03",
    question: "Will an F-1 and a design portfolio survive the search?",
    cost: "A studio that does not sponsor is a different plan from a PM seat that might.",
    evidence: "Assumption: studios sponsor less often than PM and engineering-adjacent roles. Not a sample.",
    severity: "High for this reader. Irrelevant if you do not need a sponsor.",
  },
] as const;

const BOARD = [
  {
    col: "Shipped",
    title: "Six briefs and a 2 to 3 compare",
    why: "The brief asked for both.",
    trade: "Depth on six, not a catalog of twenty.",
    gain: "A reader can finish a pair.",
  },
  {
    col: "Shipped",
    title: "Official and estimate labels",
    why: "Some numbers are published. Some are bands.",
    trade: "More words on the page.",
    gain: "A citation does not look like a guess.",
  },
  {
    col: "Simplified",
    title: "Indices as judgements",
    why: "No model with a sample behind the 1 to 10.",
    trade: "They can be argued with, and they should be.",
    gain: "The methodology page says the limit out loud.",
  },
  {
    col: "Postponed",
    title: "More schools",
    why: "The set was fixed at six.",
    trade: "A reader with a different list gets no row.",
    gain: "The comparison stays short.",
  },
  {
    col: "Scrapped",
    title: "Accounts and live scraping",
    why: "Scope decision in the brief, not a research finding.",
    trade: "Nothing updates itself.",
    gain: "No sign-in, and no stale scrape presented as live.",
  },
] as const;

type ReadMode = "quick" | "full";

function CasePage() {
  const search = Route.useSearch();
  const navigate = Route.useNavigate();
  const quick = search.read === "quick";
  const pending = useRef<string | null>(null);
  const [active, setActive] = useState("chapter-01");

  useEffect(() => {
    try {
      const stored = localStorage.getItem("bench-case-read");
      const params = new URLSearchParams(window.location.search);
      if (!params.has("read") && stored === "quick") {
        navigate({ search: { read: "quick" }, replace: true });
      }
    } catch {
      /* ignore */
    }
  }, [navigate]);

  useEffect(() => {
    const id = pending.current;
    if (!id) return;
    pending.current = null;
    const timer = window.setTimeout(() => {
      const node = document.getElementById(id);
      node?.scrollIntoView({ block: "start" });
      const heading = node?.querySelector("h1, h2, h3");
      if (heading instanceof HTMLElement) {
        heading.tabIndex = -1;
        heading.focus();
      }
    }, 40);
    return () => window.clearTimeout(timer);
  }, [quick]);

  const setRead = (mode: ReadMode, sectionId?: string) => {
    try {
      localStorage.setItem("bench-case-read", mode);
    } catch {
      /* ignore */
    }
    if (sectionId) pending.current = sectionId;
    navigate({ search: { read: mode === "quick" ? "quick" : "full" } });
  };

  const showChapter = (id: string) => {
    setActive(id);
    if (quick) setRead("full", id);
    else {
      pending.current = id;
      const node = document.getElementById(id);
      node?.scrollIntoView({ block: "start" });
      const heading = node?.querySelector("h3");
      if (heading instanceof HTMLElement) {
        heading.tabIndex = -1;
        heading.focus();
      }
    }
  };

  return (
    <Shell>
      <article className="mx-auto w-full max-w-page px-5 py-10 md:px-8 md:py-14">
        <div className="lg:grid lg:grid-cols-[14rem_minmax(0,1fr)] lg:gap-12">
          <Index quick={quick} />
          <div className="min-w-0">
            <div className="mb-8 flex flex-wrap items-center gap-3">
              <button
                type="button"
                className="btn btn-secondary"
                aria-pressed={quick}
                onClick={() => setRead(quick ? "full" : "quick", "opening")}
              >
                {quick ? "Full case study" : "Quick read (60 s)"}
              </button>
              <p className="text-sm text-muted">{quick ? "Short path. The rest is hidden." : "Full path."}</p>
            </div>
            <Opening quick={quick} onRead={() => setRead("full", "who")} />
            <Problem quick={quick} onRead={() => setRead("full", "problem")} />
            <Section id="who" label="Who" hidden={quick}>
              <Who />
            </Section>
            <Section id="research" label="Research" hidden={quick}>
              <Research />
            </Section>
            <Insights quick={quick} active={active} onShow={showChapter} onRead={() => setRead("full", "insights")} />
            <Section id="alternatives" label="Alternatives" hidden={quick}>
              <Alternatives />
            </Section>
            <Decision quick={quick} onRead={() => setRead("full", "decision")} />
            <Section id="scope" label="Shipped and scrapped" hidden={quick}>
              <ScopeBoard />
            </Section>
            <Solution quick={quick} active={active} onRead={() => setRead("full", "solution")} />
            <Outcomes quick={quick} onRead={() => setRead("full", "outcomes")} />
            <Section id="access" label="Access and limits" hidden={quick}>
              <Access />
            </Section>
            <Reflection quick={quick} onRead={() => setRead("full", "reflection")} />
          </div>
        </div>
      </article>
    </Shell>
  );
}

function Index({ quick }: { quick: boolean }) {
  const [current, setCurrent] = useState("opening");
  const [open, setOpen] = useState(false);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const items = SECTIONS.filter((item) => !quick || item.quick);
  const signature = items.map((item) => item.id).join("|");

  useEffect(() => {
    const nodes = items
      .map((item) => document.getElementById(item.id))
      .filter((node): node is HTMLElement => Boolean(node));
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible?.target.id) setCurrent(visible.target.id);
      },
      { rootMargin: "-20% 0px -55% 0px", threshold: [0.15, 0.4] },
    );
    nodes.forEach((node) => observer.observe(node));
    return () => observer.disconnect();
    // signature changes when quick mode changes the visible set
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [signature]);

  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key !== "Escape") return;
      setOpen(false);
      buttonRef.current?.focus();
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open]);

  const jump = (id: string) => {
    const node = document.getElementById(id);
    node?.scrollIntoView({ block: "start" });
    const heading = node?.querySelector("h1, h2");
    if (heading instanceof HTMLElement) {
      heading.tabIndex = -1;
      heading.focus();
    }
    setOpen(false);
  };

  const progress = ((items.findIndex((item) => item.id === current) + 1) / items.length) * 100;

  return (
    <nav aria-label="Case study sections" className="mb-8 lg:mb-0">
      <div className="lg:sticky lg:top-24">
        <div className="mb-3 h-1 overflow-hidden bg-surface" aria-hidden>
          <div className="h-full bg-ink" style={{ width: `${progress}%` }} />
        </div>
        <button
          ref={buttonRef}
          type="button"
          className="btn btn-secondary lg:hidden"
          aria-expanded={open}
          onClick={() => setOpen((value) => !value)}
        >
          Contents
        </button>
        <ol className={`${open ? "mt-3" : "hidden"} space-y-1 text-sm lg:mt-0 lg:block`}>
          {items.map((item, index) => (
            <li key={item.id}>
              <a
                href={`#${item.id}`}
                aria-current={current === item.id ? "location" : undefined}
                className={`flex min-h-11 items-center gap-2 rounded-control px-2 ${current === item.id ? "bg-surface font-semibold text-ink" : "text-body"}`}
                onClick={(event) => {
                  event.preventDefault();
                  jump(item.id);
                }}
              >
                <span className="w-6 tabular-nums text-muted">{String(index + 1).padStart(2, "0")}</span>
                {item.label}
              </a>
            </li>
          ))}
        </ol>
      </div>
    </nav>
  );
}

function Section({
  id,
  label,
  hidden,
  children,
}: {
  id: string;
  label: string;
  hidden: boolean;
  children: React.ReactNode;
}) {
  return (
    <section id={id} className="mt-16 scroll-mt-24 border-t border-hairline pt-10 md:mt-24" hidden={hidden}>
      <p className="eyebrow">/ {label}</p>
      {children}
    </section>
  );
}

function FullLink({ quick, onRead }: { quick: boolean; onRead: () => void }) {
  if (!quick) return null;
  return (
    <p className="mt-4">
      <button type="button" className="prose-link text-sm" onClick={onRead}>
        Read the full section
      </button>
    </p>
  );
}

function Opening({ quick, onRead }: { quick: boolean; onRead: () => void }) {
  const pair = ["cmu", "uw"]
    .map((id) => programs.find((program) => program.id === id))
    .filter((program) => program !== undefined);

  return (
    <header id="opening" className="scroll-mt-24">
      <p className="eyebrow">Case study · Bench · 2026</p>
      <h1 className="display-lg mt-4 max-w-3xl">A comparison that stays a decision, not a six-school brochure.</h1>
      <p className="mt-5 max-w-[68ch] text-lg leading-relaxed">
        Six HCI programs, two or three at a time, with the source left on the number.
      </p>
      <p className="mt-4 max-w-[68ch] text-sm">
        Challenge: an Indian product designer can collect six brochures and still not know which pair to apply to.
      </p>
      <dl className="mt-8 grid border border-hairline sm:grid-cols-2 xl:grid-cols-4">
        {[
          ["Role", "Product design and the working build: structure, copy, comparison rules, and the interface."],
          ["Team", "Solo. Shreeraj Narwade. No research participants."],
          ["Timeline", "October 2026. One build, then a reliability pass."],
          ["Platform", "Browser. Program briefs, a compare URL, light and dark themes."],
        ].map(([label, text]) => (
          <div
            key={label}
            className="border-b border-hairline p-4 last:border-b-0 sm:[&:nth-child(odd)]:border-r xl:border-b-0 xl:border-r xl:last:border-r-0"
          >
            <dt className="eyebrow">{label}</dt>
            <dd className="mt-2 text-sm leading-relaxed">{text}</dd>
          </div>
        ))}
      </dl>
      <figure className="mt-8 border border-hairline">
        <div className="grid sm:grid-cols-2">
          {pair.map((program) => (
            <div
              key={program.id}
              className="border-b border-hairline p-4 last:border-b-0 sm:border-b-0 sm:[&:first-child]:border-r"
            >
              <p className="text-sm text-muted">{program.city}</p>
              <p className="mt-1 text-lg font-semibold text-ink">{program.shortName}</p>
              <dl className="mt-3 space-y-2 text-sm">
                <div className="flex justify-between gap-3">
                  <dt>Visa prior</dt>
                  <dd className="font-semibold">{program.visa.range}</dd>
                </div>
                <div className="flex justify-between gap-3">
                  <dt>Job security</dt>
                  <dd className="font-semibold tabular-nums">{program.indices.jobSecurity.score} / 10</dd>
                </div>
                <div className="flex justify-between gap-3">
                  <dt>All-in sketch</dt>
                  <dd className="text-right font-semibold">{program.cost.total}</dd>
                </div>
              </dl>
            </div>
          ))}
        </div>
        <figcaption className="border-t border-hairline px-4 py-3 text-sm text-muted">
          Two schools, same fields. The compare stops here on purpose. A sixth column would turn it back into a brochure.
        </figcaption>
      </figure>
      <ul className="mt-8 max-w-[68ch] list-disc space-y-2 pl-5 text-sm">
        <li>Why two or three is the comparison, not six.</li>
        <li>What was checked, and what was never asked of anyone else.</li>
        <li>Which directions I did not build.</li>
        <li>What is still unmeasured.</li>
      </ul>
      <ul className="mt-8 grid gap-4 sm:grid-cols-3">
        {[
          ["6", "Programs in the set", "CMU, Georgia Tech, Berkeley, UW, Michigan, UT Austin."],
          ["5", "Indices, each 1 to 10", "Relative to these six only. Visa is a range, not a score."],
          ["2 to 3", "Programs in one comparison", "The URL holds the selection. A fourth pick is refused."],
        ].map(([value, label, note]) => (
          <li key={label} className="border border-hairline p-4">
            <p className="eyebrow">{label}</p>
            <p className="mt-2 font-display text-4xl text-ink tabular-nums">{value}</p>
            <p className="mt-2 text-sm text-muted">{note}</p>
          </li>
        ))}
      </ul>
      <p className="mt-3 text-sm text-muted">These are counts of the tool. They are not measured outcomes.</p>
      <FullLink quick={quick} onRead={onRead} />
    </header>
  );
}

function Problem({ quick, onRead }: { quick: boolean; onRead: () => void }) {
  const [current, setCurrent] = useState<string>(PAINS[0].id);
  return (
    <section id="problem" className="mt-16 scroll-mt-24 border-t border-hairline pt-10 md:mt-24">
      <p className="eyebrow">/ The problem</p>
      <h2 className="display-md mt-3 max-w-3xl">The questions were mine, and each one had a cost.</h2>
      {quick ? (
        <p className="mt-4 max-w-[68ch]">
          I needed two or three schools on the same fields, not six brochures. The order is a weighting, not a ranking of quality.
        </p>
      ) : (
        <>
          <div className="mt-6 flex flex-wrap gap-2" role="group" aria-label="Pain points">
            {PAINS.map((pain) => (
              <button
                key={pain.id}
                type="button"
                className="btn btn-secondary"
                aria-pressed={current === pain.id}
                onClick={() => setCurrent(pain.id)}
              >
                {pain.n}
              </button>
            ))}
          </div>
          <ol className="mt-4 space-y-3">
            {PAINS.map((pain) => (
              <li
                key={pain.id}
                className={`border p-4 ${current === pain.id ? "border-ink bg-surface" : "border-hairline"}`}
              >
                <p className="font-display text-2xl text-ink">{pain.n}</p>
                <h3 className="mt-2 text-lg font-semibold text-ink">{pain.question}</h3>
                <p className="mt-2 max-w-[68ch] text-sm">{pain.cost}</p>
                <p className="mt-2 max-w-[68ch] text-sm">{pain.evidence}</p>
                <p className="mt-2 text-sm font-semibold text-ink">{pain.severity}</p>
              </li>
            ))}
          </ol>
          <p className="mt-8 max-w-[68ch] text-lg">Writing another ranking was not the problem. Holding two schools to the same fields was.</p>
          <p className="mt-4 max-w-[68ch] text-sm text-muted">
            How might one reader compare six programs without pretending the list is a quality ladder? Constraint: sourced numbers, two or three at a time, no accounts.
          </p>
          <figure className="mt-8">
            <ol className="grid gap-px bg-hairline sm:grid-cols-4">
              {[
                ["01", "Six tabs", "Each school sounds like the right one."],
                ["02", "A spreadsheet", "Official and estimate share a cell."],
                ["03", "The stall", "No pair is chosen, so nothing is compared."],
                ["04", "The ask", "Same fields, two or three, source on the number."],
              ].map(([n, title, line]) => (
                <li key={n} className="bg-canvas p-4">
                  <p className="text-sm font-semibold text-muted">{n}</p>
                  <p className="mt-2 font-semibold text-ink">{title}</p>
                  <p className="mt-2 text-sm">{line}</p>
                </li>
              ))}
            </ol>
            <figcaption className="mt-2 text-sm text-muted">
              Left to right, the stall is the drop. The last step is the constraint I actually built for.
            </figcaption>
          </figure>
        </>
      )}
      <FullLink quick={quick} onRead={onRead} />
    </section>
  );
}

function Who() {
  return (
    <>
      <h2 className="display-md mt-3 max-w-3xl">One reader, three pressures that argue.</h2>
      <p className="mt-4 max-w-[68ch]">
        Assumption, not a study: the reader is an Indian product designer on an F-1 budget. Portfolio, cost, and visa pull apart. A school that wins on craft can lose on rent.
      </p>
      <figure className="mt-8 border-l-2 border-ink pl-4">
        <blockquote className="max-w-[28ch] font-display text-3xl leading-tight text-ink">
          The brand will carry a thin portfolio.
        </blockquote>
        <figcaption className="mt-3 max-w-[68ch] text-sm text-muted">
          Hypothesis, not a quote from anyone else. The pages answer it in the trade-off, not in a slogan.
        </figcaption>
      </figure>
      <ul className="mt-6 max-w-[68ch] space-y-3">
        {[
          ["Hypothesis: in-state rumors are the price.", "The nonresident line is the price that matters here."],
          ["Hypothesis: any design job sponsors.", "The visa note treats studios and PM seats as different priors."],
        ].map(([quote, meaning]) => (
          <li key={quote}>
            <p className="text-ink">{quote}</p>
            <p className="mt-1 text-sm">{meaning}</p>
          </li>
        ))}
      </ul>
      <p className="mt-4 max-w-[68ch] text-sm text-muted">No interviews. These lines are hypotheses I used to write the pages.</p>
    </>
  );
}

function Research() {
  const rows = [
    ["01", "Read the brief", "n = 1, the author", "PRD, information architecture, indices note, and the university table. October 2026."],
    ["02", "Check the numbers", "Program and bursar pages", "Each figure on a program page is marked official or estimate, with a link and a date."],
    ["03", "Heuristic pass", "The built interface", "After the first version: card contrast, empty icons, a silent three-program cap, and a one-school compare that looked finished."],
  ];
  return (
    <>
      <h2 className="display-md mt-3 max-w-3xl">No interviews. Three checks, labelled as checks.</h2>
      <ol className="mt-6 space-y-4">
        {rows.map(([n, method, sample, point]) => (
          <li key={n} className="grid gap-2 border border-hairline p-4 sm:grid-cols-[3rem_1fr]">
            <span className="font-display text-xl text-ink">{n}</span>
            <span>
              <span className="font-semibold text-ink">{method}</span>
              <span className="mt-1 block text-sm text-muted">{sample}</span>
              <span className="mt-2 block max-w-[68ch] text-sm">{point}</span>
            </span>
          </li>
        ))}
      </ol>
    </>
  );
}

function Insights({
  quick,
  active,
  onShow,
  onRead,
}: {
  quick: boolean;
  active: string;
  onShow: (id: string) => void;
  onRead: () => void;
}) {
  return (
    <section id="insights" className="mt-16 scroll-mt-24 border-t border-hairline pt-10 md:mt-24">
      <p className="eyebrow">/ Insights</p>
      <h2 className="display-md mt-3 max-w-3xl">What I treated as true, and where it went.</h2>
      <p className="mt-4 max-w-[68ch] text-sm">
        Select a row to mark the chapter that answers it. The table stays readable if you never do.
      </p>
      <div className="mt-6 hidden md:block">
        <table className="w-full border-collapse text-left text-sm">
          <caption className="mb-3 text-left text-sm text-muted">
            Finding to principle. Evidence is the brief or a hypothesis, not a user study.
          </caption>
          <thead>
            <tr className="border-b border-hairline">
              <th scope="col" className="py-2 pr-3 font-semibold text-ink">Finding</th>
              <th scope="col" className="py-2 pr-3 font-semibold text-ink">Evidence</th>
              <th scope="col" className="py-2 pr-3 font-semibold text-ink">Principle</th>
              <th scope="col" className="py-2 font-semibold text-ink">Chapter</th>
            </tr>
          </thead>
          <tbody>
            {TRACE.map((row) => (
              <tr key={row.id} className={`border-b border-hairline ${active === row.id ? "bg-surface" : ""}`}>
                <td className="py-3 pr-3">{row.finding}</td>
                <td className="py-3 pr-3">{row.evidence}</td>
                <td className="py-3 pr-3">{row.principle}</td>
                <td className="py-3">
                  <button type="button" className="prose-link text-left" aria-pressed={active === row.id} onClick={() => onShow(row.id)}>
                    {row.chapter}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <ol className="mt-6 space-y-3 md:hidden">
        {TRACE.map((row) => (
          <li key={row.id} className={`border p-4 text-sm ${active === row.id ? "border-ink bg-surface" : "border-hairline"}`}>
            <p className="font-semibold text-ink">Finding. {row.finding}</p>
            <p className="mt-2">Evidence. {row.evidence}</p>
            <p className="mt-2">Principle. {row.principle}</p>
            <button type="button" className="prose-link mt-3" aria-pressed={active === row.id} onClick={() => onShow(row.id)}>
              {row.chapter}
            </button>
          </li>
        ))}
      </ol>
      <FullLink quick={quick} onRead={onRead} />
    </section>
  );
}

function Alternatives() {
  return (
    <>
      <h2 className="display-md mt-3 max-w-3xl">Three directions. One was built.</h2>
      <div className="mt-6 grid gap-4 lg:grid-cols-3">
        <article className="border border-hairline p-4">
          <h3 className="text-lg font-semibold text-ink">Long ranking page</h3>
          <p className="mt-2 text-sm">Every field for all six, in one scroll.</p>
          <p className="mt-3 text-sm">Pro: nothing is hidden. Con: the reader never has to choose a pair, so the page becomes a brochure again. Complexity: low. The page is one template.</p>
        </article>
        <article className="border border-hairline p-4">
          <h3 className="text-lg font-semibold text-ink">Spreadsheet export</h3>
          <p className="mt-2 text-sm">Rows, filters, no essay.</p>
          <p className="mt-3 text-sm">Pro: easy to sort. Con: official and estimate collapse into one cell, and the weighting disappears. Complexity: medium, and the voice is gone.</p>
        </article>
        <article className="border border-ink p-4">
          <p className="eyebrow">Chosen</p>
          <h3 className="mt-2 text-lg font-semibold text-ink">Briefs plus a short compare</h3>
          <p className="mt-2 text-sm">A page per school. A compare that stops at three. The URL is the share.</p>
          <p className="mt-3 text-sm">Pro: the decision fits one screen. Con: a reader who wants all six side by side makes two passes. Complexity: the URL has to stay honest.</p>
        </article>
      </div>
    </>
  );
}

function Decision({ quick, onRead }: { quick: boolean; onRead: () => void }) {
  return (
    <section id="decision" className="mt-16 scroll-mt-24 border-t border-hairline pt-10 md:mt-24">
      <p className="eyebrow">/ The decision</p>
      <h2 className="display-md mt-3 max-w-3xl">I kept the cap, and I kept the label on the number.</h2>
      <p className="mt-4 max-w-[68ch] text-sm">
        <span className="font-semibold text-ink">Judgement. </span>
        Feasible in the existing routes. Accessible if the refused card stays readable. Maintainable because the cap is one function, not a new account system.
      </p>
      <div className="mt-6 grid gap-4 lg:grid-cols-3">
        <div className="border border-hairline p-4">
          <p className="text-sm font-semibold text-ink">Tried · earlier</p>
          <div className="mt-3 border border-hairline bg-canvas p-3 text-sm" aria-hidden>
            <p className="font-semibold text-ink">Comparison</p>
            <p className="mt-1 text-muted">1 program. Looks finished.</p>
          </div>
          <p className="mt-3 text-sm">A compare control that opened one school and looked complete.</p>
        </div>
        <div className="border border-ink p-4">
          <p className="text-sm font-semibold text-ink">Chose · shipped</p>
          <div className="mt-3 border border-ink bg-surface p-3 text-sm" aria-hidden>
            <p className="font-semibold text-ink">Start a comparison</p>
            <p className="mt-1">Add one more. This one stays.</p>
          </div>
          <p className="mt-3 text-sm">The label matches the unfinished state. The first school stays selected.</p>
        </div>
        <div className="border border-hairline p-4">
          <p className="text-sm font-semibold text-ink">Because · judgement</p>
          <p className="mt-3 text-sm">A comparison that cannot compare is a broken promise. The cap of three stays. Adding the next school does not clear the first.</p>
        </div>
      </div>
      <FullLink quick={quick} onRead={onRead} />
    </section>
  );
}

function ScopeBoard() {
  const [filter, setFilter] = useState("All");
  const cols = ["All", "Shipped", "Simplified", "Postponed", "Scrapped"];
  const items = BOARD.filter((item) => filter === "All" || item.col === filter);
  return (
    <>
      <h2 className="display-md mt-3 max-w-3xl">What is in the build, and what I left out.</h2>
      <div className="mt-6 flex flex-wrap gap-2" role="group" aria-label="Filter scope">
        {cols.map((col) => (
          <button
            key={col}
            type="button"
            className="btn btn-secondary"
            aria-pressed={filter === col}
            onClick={() => setFilter(col)}
          >
            {col} ({col === "All" ? BOARD.length : BOARD.filter((item) => item.col === col).length})
          </button>
        ))}
      </div>
      <ul className={`mt-6 grid gap-4 ${filter === "All" ? "lg:grid-cols-4" : "md:grid-cols-2"}`}>
        {items.map((item) => (
          <li key={item.title} className="border border-hairline p-4">
            <p className="eyebrow">{item.col}</p>
            <p className="mt-2 text-sm text-muted">Prototype scope decision</p>
            <h3 className="mt-2 text-lg font-semibold text-ink">{item.title}</h3>
            <p className="mt-2 text-sm">Why. {item.why}</p>
            <p className="mt-2 text-sm">Trade-off. {item.trade}</p>
            <p className="mt-2 text-sm">Kept. {item.gain}</p>
          </li>
        ))}
      </ul>
    </>
  );
}

function Solution({ quick, active, onRead }: { quick: boolean; active: string; onRead: () => void }) {
  return (
    <section id="solution" className="mt-16 scroll-mt-24 border-t border-hairline pt-10 md:mt-24">
      <p className="eyebrow">/ What shipped</p>
      <h2 className="display-md mt-3 max-w-3xl">The pages do the arguing. The compare only lines them up.</h2>
      <div id="chapter-01" className={`mt-8 scroll-mt-24 p-4 ${active === "chapter-01" ? "bg-surface" : ""}`}>
        <p className="eyebrow">Chapter 01</p>
        <h3 className="mt-2 text-xl font-semibold text-ink">Stop at three, and say so.</h3>
        <p className="mt-3 max-w-[68ch] text-sm">
          Selected cards stay full contrast. The ones you cannot add stay readable, with one line: three is the maximum. Remove one to swap.
        </p>
      </div>
      <div id="chapter-02" className={`mt-8 scroll-mt-24 p-4 ${active === "chapter-02" ? "bg-surface" : ""}`} hidden={quick}>
        <p className="eyebrow">Chapter 02</p>
        <h3 className="mt-2 text-xl font-semibold text-ink">Leave the source on the number.</h3>
        <p className="mt-3 max-w-[68ch] text-sm">
          Cost lines carry official or estimate. The methodology page lists what I refused to invent, including acceptance rates only CMU printed.
        </p>
        <div className="mt-4 grid gap-4 lg:grid-cols-3">
          <div className="border border-hairline p-3 text-sm">
            <p className="font-semibold text-ink">Considered · not built</p>
            <p className="mt-2">One number, no label, so the table looks clean.</p>
          </div>
          <div className="border border-ink p-3 text-sm">
            <p className="font-semibold text-ink">Chose · shipped</p>
            <p className="mt-2">Official or estimate sits on the same line as the figure.</p>
          </div>
          <div className="border border-hairline p-3 text-sm">
            <p className="font-semibold text-ink">Because · evidence</p>
            <p className="mt-2">The university table mixed published tuition with living bands. Hiding that mix would make a guess look like a bursar line.</p>
          </div>
        </div>
      </div>
      <div id="chapter-03" className={`mt-8 scroll-mt-24 p-4 ${active === "chapter-03" ? "bg-surface" : ""}`} hidden={quick}>
        <p className="eyebrow">Chapter 03</p>
        <h3 className="mt-2 text-xl font-semibold text-ink">Say what the order is not.</h3>
        <p className="mt-3 max-w-[68ch] text-sm">
          The hero card is a decision order for product design from India. The decision framework is the same feature, named once, for when that weighting is wrong.
        </p>
        <figure className="mt-4">
          <ul className="grid gap-3 sm:grid-cols-3">
            {[
              ["Home", "The order, then a door to each brief."],
              ["Brief", "One school, with the source still attached."],
              ["Compare", "Two or three chairs. No fourth."],
            ].map(([room, line]) => (
              <li key={room} className="border border-hairline p-3 text-sm">
                <span className="font-semibold text-ink">{room}. </span>
                {line}
              </li>
            ))}
          </ul>
          <figcaption className="mt-2 text-sm text-muted">
            Rooms, not a sitemap graphic. The compare room is the one with a locked door.
          </figcaption>
        </figure>
        <p className="mt-4">
          <Link to="/compare" search={{ ids: "cmu,uw", cat: "overview" }} className="btn btn-primary">
            Open CMU and UW
          </Link>
        </p>
      </div>
      <FullLink quick={quick} onRead={onRead} />
    </section>
  );
}

function Outcomes({ quick, onRead }: { quick: boolean; onRead: () => void }) {
  return (
    <section id="outcomes" className="mt-16 scroll-mt-24 border-t border-hairline pt-10 md:mt-24">
      <p className="eyebrow">/ Outcomes</p>
      <h2 className="display-md mt-3 max-w-3xl">I have not measured whether this changes a real application list.</h2>
      <p className="mt-4 max-w-[68ch]">
        There is no sample, no diary, and no before-and-after. The tool holds the sources I checked on 11 October 2026. That is the evidence. It is not an outcome.
      </p>
      <div className="mt-8 border border-hairline p-4">
        <h3 className="text-sm font-semibold uppercase tracking-[0.12em] text-ink">Not measured yet</h3>
        <ul className="mt-4 space-y-3 text-sm">
          <li>Time to a two-school compare: one sitting, five readers, stopwatch, from the homepage to a copied link.</li>
          <li>Whether the order changes the schools someone actually applies to: ask two weeks later, n = 5, same brief.</li>
          <li>Whether visa prior is understood without the word list: ask for a definition, n = 5, after one program page.</li>
        </ul>
      </div>
      <FullLink quick={quick} onRead={onRead} />
    </section>
  );
}

function Access() {
  return (
    <>
      <h2 className="display-md mt-3 max-w-3xl">What I checked, and what is still thin.</h2>
      <ul className="mt-4 max-w-[68ch] list-disc space-y-2 pl-5 text-sm">
        <li>Keyboard: skip link, programs button with expanded state, compare tabs with arrow keys, focus ring in both themes.</li>
        <li>Icons: theme and menu SVGs are 16px, not squeezed by button padding.</li>
        <li>Invalid compare URLs explain the fallback instead of dropping the value in silence.</li>
        <li>Small screens: the header collapses before Decision Framework sits on the theme button.</li>
        <li>Gap: I have not sat with a screen reader user. The names are in the markup. That is not a test.</li>
        <li>Gap: copy to the clipboard depends on the browser allowing it. Failure is stated. Success is not faked.</li>
        <li>Privacy: nothing is sent to an account. The compare selection stays in the URL and in local storage on this browser.</li>
      </ul>
    </>
  );
}

function Reflection({ quick, onRead }: { quick: boolean; onRead: () => void }) {
  return (
    <section id="reflection" className="mt-16 scroll-mt-24 border-t border-hairline pt-10 md:mt-24">
      <p className="eyebrow">/ Reflection</p>
      <h2 className="display-md mt-3 max-w-3xl">Three things I would not repeat.</h2>
      <ol className="mt-6 max-w-[68ch] list-decimal space-y-3 pl-5">
        <li>Card titles that follow the page color. On a cream card in dark mode, the title disappeared.</li>
        <li>A disabled control that only fades. It looked broken. The sentence fixed it.</li>
        <li>Three names for one idea. Decision framework is the name. The order is what that framework produces.</li>
      </ol>
      <p className="mt-8 max-w-[68ch]">
        Next: five readers, one sitting, time to a copied two-school link. If they cannot say what the order is not, the hero sentence failed.
      </p>
      <div className="mt-10" hidden={quick}>
        <h3 className="text-xl font-semibold text-ink">How I built this with AI</h3>
        <ol className="mt-4 max-w-[68ch] space-y-3 text-sm">
          <li>01 Context. The PRD, the Clay tokens, the indices note, and the university table.</li>
          <li>02 Explore. I used a model to draft structure and copy, then cut claims that were not in a source.</li>
          <li>03 Build. This site: routes, the compare URL, and the program data file.</li>
          <li>04 Review. A UI pass on icons, contrast, and the three-program cap. That pass changed the card title color and the compare copy.</li>
          <li>05 Ship, then back. Review sent me to the card styles, not to a new concept.</li>
        </ol>
        <p className="mt-4 max-w-[68ch] text-sm text-muted">Review points back at explore. The loop is the card color, not a second product.</p>
        <figure className="mt-4 max-w-[68ch] border border-hairline p-4">
          <blockquote className="text-sm">
            Prompt I worked from: fix the cream card where the title matched the card, and remove every em dash. I kept the card color and changed the title to the card's own ink.
          </blockquote>
          <figcaption className="mt-2 text-sm text-muted">
            I decided the weighting and which numbers were estimates. The model drafted sentences. I deleted the ones I could not source.
          </figcaption>
        </figure>
      </div>
      <FullLink quick={quick} onRead={onRead} />
      <p className="mt-6 flex flex-wrap gap-4 text-sm">
        <Link to="/" className="prose-link">
          Open Bench
        </Link>
        <a className="prose-link" href="https://github.com/shreeraj301/bench">
          Repository
        </a>
      </p>
    </section>
  );
}
