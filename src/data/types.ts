export const PROGRAM_IDS = ["cmu", "gatech", "berkeley", "uw", "umich", "utaustin"] as const;

export type ProgramId = (typeof PROGRAM_IDS)[number];

export type CardTone = "pink" | "teal" | "lavender" | "peach" | "ochre" | "cream";

export type PathwayId = "design" | "research" | "pm" | "cost" | "speed";

export type IndexKey = "livability" | "jobSecurity" | "futureProof" | "selectivity" | "roi";

export type CompareCategory =
  | "overview"
  | "cost"
  | "outcomes"
  | "curriculum"
  | "application"
  | "indices";

export interface CostLine {
  label: string;
  value: string;
  note: string;
  kind: "official" | "estimate";
}

export interface IndexScore {
  score: number;
  rationale: string;
}

export interface Program {
  id: ProgramId;
  rank: number;
  shortName: string;
  degree: string;
  university: string;
  city: string;
  durationLabel: string;
  durationMonths: number;
  tone: CardTone;
  officialUrl: string;
  tagline: string;
  rankReason: string;
  overview: string[];
  excels: string[];
  tradeoffs: string[];
  curriculum: { summary: string; points: string[] };
  capstone: { summary: string; points: string[] };
  cohort: { size: string; workload: string; style: string; points: string[] };
  cost: { headline: string; lines: CostLine[]; total: string; totalNote: string };
  funding: { summary: string; points: string[] };
  application: {
    deadline: string;
    gre: string;
    checklist: { item: string; detail: string }[];
    sop: { type: string; limit: string; strategy: string[] };
  };
  outcomes: {
    summary: string;
    searchTime: string;
    roles: string[];
    employers: string[];
    points: string[];
  };
  acceptance: { rate: string; note: string };
  indices: Record<IndexKey, IndexScore>;
  visa: { range: string; rationale: string };
  related: { with: ProgramId; why: string }[];
  sources: { label: string; href: string }[];
}

export interface Pathway {
  id: PathwayId;
  title: string;
  tone: CardTone;
  blurb: string;
  ids: ProgramId[];
}
