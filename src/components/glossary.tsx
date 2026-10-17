const TERMS: { term: string; meaning: string }[] = [
  {
    term: "Decision framework",
    meaning:
      "The rules for reading the order on the homepage. It is a weighting for one applicant, not a quality ladder of the six schools.",
  },
  {
    term: "Indices",
    meaning:
      "Five scores from 1 to 10: livability, job security, future proof, selectivity, and ROI. Each score compares these six programs only.",
  },
  {
    term: "Visa prior",
    meaning:
      "A planning range for OPT and for whether employers in that market sponsor. It is not an admission rate and not a promise.",
  },
  {
    term: "Future proof",
    meaning:
      "How directly the curriculum treats human-AI work, systems, and the mix of research, craft, and technical skill after 2026.",
  },
  {
    term: "Job security",
    meaning:
      "How usable the path is into product design, UX research, or product management: brand, network, internship, and where alumni land.",
  },
  {
    term: "All-in sketch",
    meaning:
      "Tuition plus a living estimate for the length of the degree. Not an invoice. Fees, flights, and aid sit outside it unless a line says so.",
  },
  {
    term: "Holds",
    meaning: "Where the program is strong for this decision.",
  },
  {
    term: "Costs you",
    meaning: "What you give up, or the risk you take, if you pick it.",
  },
  {
    term: "Full freight",
    meaning: "You pay the published tuition. Do not assume a scholarship or an assistantship will cut it.",
  },
];

export function Glossary({ compact = false, open = false }: { compact?: boolean; open?: boolean }) {
  return (
    <details className="fold" open={open}>
      <summary>{compact ? "Word list" : "What these words mean"}</summary>
      <dl className="grid gap-3 pb-4 sm:grid-cols-2">
        {TERMS.map((item) => (
          <div key={item.term}>
            <dt className="text-sm font-semibold text-ink">{item.term}</dt>
            <dd className="mt-1 text-sm leading-relaxed">{item.meaning}</dd>
          </div>
        ))}
      </dl>
    </details>
  );
}
