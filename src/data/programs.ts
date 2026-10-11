import type { CompareCategory, IndexKey, Pathway, Program, ProgramId } from "./types";
import { PROGRAM_IDS } from "./types";

export const UPDATED = "11 October 2026";

export const COMPARE_CATEGORIES: { id: CompareCategory; label: string }[] = [
  { id: "overview", label: "Overview" },
  { id: "cost", label: "Cost" },
  { id: "outcomes", label: "Outcomes" },
  { id: "curriculum", label: "Curriculum" },
  { id: "application", label: "Application" },
  { id: "indices", label: "Indices" },
];

export const INDEX_META: {
  key: IndexKey;
  label: string;
  definition: string;
  criteria: string[];
  limits: string;
}[] = [
  {
    key: "livability",
    label: "Livability",
    definition:
      "City-level quality of life for an international graduate student: rent, safety, transit, climate, and how livable the day is outside class.",
    criteria: [
      "Housing cost and how hard a room is to find",
      "Safety on and near campus",
      "Transit versus needing a car",
      "Climate and daily friction",
      "Size of the international graduate community",
    ],
    limits:
      "This is not a crime index and not a happiness score. A low score can still be the right city if the job market pays for the friction.",
  },
  {
    key: "jobSecurity",
    label: "Job Security",
    definition:
      "Strength of a path into product design, UX research, or product management — brand, network, internship conversion, and where alumni actually land.",
    criteria: [
      "Placement into PD, UXR, and PM rather than ‘a job’",
      "Alumni density inside hiring companies",
      "Whether an internship is built into the calendar",
      "How far the program name travels outside its city",
    ],
    limits:
      "School-wide employment rates are not UX placement rates. Michigan’s MSI figure, below, is called out for that reason.",
  },
  {
    key: "futureProof",
    label: "Future Proof",
    definition:
      "How directly the curriculum treats human–AI interaction, systems, and the mix of research, craft, and technical fluency you will need after 2026.",
    criteria: [
      "Human–AI and responsible-technology work in the core, not only a slide",
      "Room to go deep in craft, research, or PM",
      "Elective flexibility without an empty curriculum",
      "Technical neighbors (computing, data, engineering) you can actually take",
    ],
    limits:
      "A high score is not a promise that the syllabus you want is offered the term you need it. Read the current catalog before you rely on an elective.",
  },
  {
    key: "selectivity",
    label: "Selectivity",
    definition:
      "Relative admissions difficulty across these six programs: published rates where they exist, cohort size, and how hard the typical admitted profile is.",
    criteria: [
      "Published acceptance rate, if the school prints one",
      "Cohort size versus the breadth of the applicant pool",
      "Portfolio, video, and work-experience bar",
      "How much holistic review can override a thin academic record",
    ],
    limits:
      "Only Carnegie Mellon printed a rate we could cite (23% for the 2025–26 cycle). Other scores are relative judgments, not hidden percentages. Higher is harder, not better.",
  },
  {
    key: "roi",
    label: "ROI",
    definition:
      "Total cost of attendance set against placement strength, time to a salary, and whether aid is real or theoretical.",
    criteria: [
      "Tuition plus a honest living band",
      "Months until you can earn again",
      "Outcome quality in the roles you actually want",
      "Aid you can plan on, versus aid that exists for someone",
    ],
    limits:
      "ROI collapses if you are debt-averse and the only offers are unpaid, or if a fellowship you did not model arrives. Run your own budget on the bursar tables.",
  },
];

export const VISA_NOTE =
  "Visa ranges are editorial planning priors, not school statistics. No program on this list publishes an OPT-to-sponsorship rate. The range assumes a STEM-eligible I-20, a portfolio aimed at companies that have sponsored before, and a 2026 hiring market in which design studios sponsor less often than large tech and some product orgs. H-1B remains a lottery. Update your plan when policy or the market moves.";

export const programs: Program[] = [
  {
    id: "cmu",
    rank: 1,
    shortName: "Carnegie Mellon MHCI",
    degree: "Master of Human-Computer Interaction",
    university: "Carnegie Mellon University",
    city: "Pittsburgh, Pennsylvania",
    durationLabel: "12 months · 3 semesters",
    durationMonths: 12,
    tone: "pink",
    officialUrl: "https://www.hcii.cmu.edu/academics/mhci",
    tagline: "The densest signal in a year. You pay full freight and the summer is the job.",
    rankReason:
      "Best default if you can fund a one-year program and want capstone work that hiring managers already recognize. Prestige is real. Aid is not.",
    overview: [
      "MHCI is a professional, in-person, STEM-designated master’s inside the Human-Computer Interaction Institute. The calendar runs August to August: two academic semesters plus a summer that is almost entirely the client capstone.",
      "The institute sits next to a campus that has treated AI as a core subject for decades. The current program copy says students design, build, evaluate, and responsibly deploy AI-powered products inside the curriculum, not as a side seminar.",
      "For a designer changing fields, the useful part is the team structure. Cohorts mix backgrounds on purpose. The useless part of the mythology is the idea that the brand removes the visa and portfolio problems. It shortens some conversations. It does not end them.",
    ],
    excels: [
      "Industry capstone with external sponsors, seven months",
      "Hybrid of research, product strategy, and making",
      "Alumni density in large tech and established studios",
      "One year, so you are back on a salary sooner",
    ],
    tradeoffs: [
      "No departmental aid. Plan to pay the invoice.",
      "Summer is a full-time project, not a free internship semester.",
      "500-word statement leaves no room for a generic origin story.",
      "Pittsburgh is a cheaper city and a thinner local design market than Seattle or the Bay Area.",
    ],
    curriculum: {
      summary:
        "Seven core courses and four electives. Full-time study is at least 36 units a semester. Most courses are 9 or 12 units. Electives can be taken across Carnegie Mellon, which is the actual flexibility — not a menu of unnamed ‘design tracks.’",
      points: [
        "Core covers the professional-practice spine: research, design, and the technical judgment to ship.",
        "AI literacy is claimed in the program overview as part of the curriculum, not a concentration you might reach later.",
        "In-person attendance is required for the whole program.",
        "You do not get a long independent-study year. Depth comes from the capstone and from electives you pick early.",
      ],
    },
    capstone: {
      summary:
        "The capstone is two courses: HCI Project I in spring (15 units) and HCI Project II in summer (48 units). Teams of four to six students partner with an external sponsor for about seven months, from discovery through a tested prototype or, sometimes, an MVP.",
      points: [
        "Faculty mentor plus a real client. Alumni routinely call it the hardest and most useful part of the year.",
        "Deliverables are research, product strategy, and a functional prototype — the portfolio piece you will actually show.",
        "The summer unit load is the intensity signal. Do not plan a separate full-time internship on top of Project II.",
        "Sponsors vary by year. The brand of the capstone is the process, not a guaranteed Google project.",
      ],
    },
    cohort: {
      size: "Fall 2025: 57 new MHCI students, plus 1 continuing student (official FAQ).",
      workload:
        "Editorial band, not a published hour count: 45–60 hours a week once Project I starts, higher in the summer. The 48-unit summer course is the evidence.",
      style:
        "Multidisciplinary teams. Collaboration is graded by the work, not by a participation rubric. People who need to be the only designer on a project will feel crowded.",
      points: [
        "Backgrounds are mixed on purpose: design, computing, social science, business, architecture.",
        "The class is small enough that reputation travels inside the cohort.",
        "Critique culture is direct. Thin research gets caught because the sponsor is external.",
      ],
    },
    cost: {
      headline: "About $113k–$120k all-in for the year, before fees and before flights, with no departmental aid.",
      lines: [
        {
          label: "Tuition, 2026–27",
          value: "$31,100 per semester",
          note: "Official MHCI tuition page. Tuition only. Three semesters.",
          kind: "official",
        },
        {
          label: "Tuition, full program",
          value: "$93,300",
          note: "3 × $31,100 if the published semester rate holds for summer. Fees are extra. The Board can change rates.",
          kind: "official",
        },
        {
          label: "Living, 12 months in Pittsburgh",
          value: "$20,000–$26,000",
          note: "Planning band for shared housing, food, local transit, and a modest personal budget. Not a CMU invoice. Pittsburgh is the cheap city in this set.",
          kind: "estimate",
        },
      ],
      total: "$113,000–$119,000 plus fees",
      totalNote:
        "Cash outlay for one year. Opportunity cost is one year of salary, not two. That is the ROI argument, and it only works if you can pay the tuition without a ruinous interest rate.",
    },
    funding: {
      summary:
        "The program does not offer departmental financial aid or tuition support. A few university-wide fellowships (the school points at Rales and external awards) exist. Do not build a budget that needs them.",
      points: [
        "Official FAQ: ‘Is financial aid available? No.’",
        "Application fee is $100, with a waiver request due a week before the deadline if you need it.",
        "Loans and outside scholarships are the realistic stack.",
      ],
    },
    application: {
      deadline: "15 January 2027, 3:00 p.m. Eastern, for the 2027–28 cohort. Decisions by 15 March. No early deadline.",
      gre: "Optional. Not required.",
      checklist: [
        { item: "Statement of purpose", detail: "500 words maximum, PDF, with your name and email on it." },
        { item: "One-minute video", detail: "Required. On camera. Your voice and your face. Separate from the statement." },
        { item: "Three recommendations", detail: "Recommenders can upload until the 3:00 p.m. deadline." },
        { item: "Resume and transcripts", detail: "Resume as PDF. Transcripts in English. Bachelor’s required by matriculation." },
        { item: "Work samples", detail: "Optional. A portfolio can help. It is not required." },
        { item: "English test", detail: "TOEFL, IELTS, or Duolingo if the policy applies to you. Check the current minimums; they are high." },
        { item: "Fee", detail: "$100, or a hardship waiver requested a week before the deadline." },
      ],
      sop: {
        type: "Statement of Purpose",
        limit: "500 words",
        strategy: [
          "The published prompt asks what impact you want in HCI, what responsibility practitioners have, which people you want to serve, and why MHCI is the next step. Answer that. Do not recap the resume.",
          "First 80 words should already contain a problem, a person, and a point of view. A childhood-computer opening wastes a fifth of the essay.",
          "If your background is architecture or another spatial field, translate it once, concretely: what you learned about constraints, users in a physical environment, and how that changes the way you prototype software. Then stop talking about buildings.",
          "Name a capstone-shaped ambition, not a brand list. ‘I want to work on X with Y kind of team’ beats ‘CMU is prestigious.’",
          "The video is a second chance to sound like a collaborator. Practice a single story to the 55-second mark. Do not read the essay aloud.",
        ],
      },
    },
    outcomes: {
      summary:
        "The honest claim is brand plus capstone, not a published placement percentage. MHCI is the program hiring managers in product design, UX research, and PM already file under ‘serious.’ Pittsburgh itself will not hire the whole class. Most people search nationally.",
      searchTime:
        "Planning band used here: 2–6 months, longer for many international students. The program does not publish a median search time.",
      roles: ["Product designer", "UX researcher", "Product manager", "Design strategist"],
      employers: [
        "Large tech companies are the usual target (Google, Apple, Meta, Amazon, and peers)",
        "Product studios and in-house design teams",
        "Sponsor organizations sometimes convert, often they do not",
      ],
      points: [
        "Capstone is the interview artifact. Treat the sponsor deliverable as a case study from week one.",
        "Studios and agencies sponsor visas less often than large tech. Aim the search with that in mind.",
        "A one-year program means recruiting starts almost immediately. There is no ‘explore in year one’ cushion.",
      ],
    },
    acceptance: {
      rate: "23% in the 2025–26 cycle",
      note: "Official FAQ. The rate moves year to year. 23% is selective, not mythical. The pool is strong enough that the number understates how finished your story needs to be.",
    },
    indices: {
      livability: {
        score: 7,
        rationale:
          "Pittsburgh is the affordable, winter city in this set. Campus life is dense, rents are sane next to Seattle or Berkeley, and the cultural scene is real if smaller. You will not stumble into a design job by living here.",
      },
      jobSecurity: {
        score: 9,
        rationale:
          "Strongest brand in the six for competitive PD, UXR, and PM interviews. Capstone and alumni network do actual work. Not a 10, because sponsorship and a one-year clock still drop people.",
      },
      futureProof: {
        score: 9,
        rationale:
          "HCII’s identity is human–AI interaction plus professional practice. Electives across CMU let you add technical depth if you move quickly. The risk is breadth squeezed by the capstone, not an outdated syllabus.",
      },
      selectivity: {
        score: 8,
        rationale:
          "Only published rate in this set, at 23% for 2025–26. Cohort is about 57. The bar is the quality of the pool and the 500-word plus video filter, not a single-digit admit rate.",
      },
      roi: {
        score: 7,
        rationale:
          "You pay roughly $93k in tuition with no aid, then a modest Pittsburgh year. One year of lost salary and a strong signal is a fair trade if you can write the check. It is a poor trade on high-interest debt.",
      },
    },
    visa: {
      range: "60–75%",
      rationale:
        "STEM-designated, which matters for the 24-month STEM OPT extension. The brand opens doors at employers that have sponsored before. Design studios often will not. Capstone sponsors are not visa sponsors. International searches in the program’s own commentary run longer. This range is a planning prior, not a rate.",
    },
    related: [
      {
        with: "uw",
        why: "The other serious one-year option. Craft and Seattle versus strategy, capstone, and brand.",
      },
      {
        with: "gatech",
        why: "If the CMU invoice or the summer crush is wrong, Georgia Tech’s internship year is the practical alternative.",
      },
    ],
    sources: [
      { label: "MHCI program overview", href: "https://www.hcii.cmu.edu/academics/mhci" },
      { label: "Tuition and aid, 2026–27 rate", href: "https://www.hcii.cmu.edu/academics/mhci/tuition" },
      { label: "FAQ: cohort size, 23% admit rate, no aid", href: "https://hcii.cmu.edu/academics/mhci/faq" },
      { label: "Capstone structure", href: "https://hcii.cmu.edu/academics/mhci/capstone" },
      { label: "Admissions, SOP, video, deadline", href: "https://www.hcii.cmu.edu/academics/mhci/admissions" },
    ],
  },
  {
    id: "gatech",
    rank: 2,
    shortName: "Georgia Tech MS-HCI",
    degree: "Master of Science in Human-Computer Interaction",
    university: "Georgia Institute of Technology",
    city: "Atlanta, Georgia",
    durationLabel: "18 months · 4 semesters + summer internship",
    durationMonths: 18,
    tone: "teal",
    officialUrl: "https://mshci.gatech.edu/",
    tagline: "The practical default. An internship is required, and the brand does not have to do all the work.",
    rankReason:
      "Best balance of design, research, and computing if you want a job-shaped summer in the middle and can tolerate Atlanta. Tuition is not ‘the cheap public option.’ It is a professional-program rate.",
    overview: [
      "MS-HCI is a joint professional program across four schools. You apply to one track: Interactive Computing, Industrial Design, Literature, Media, and Communication, or Psychology. You are admitted to one.",
      "The FAQ is blunt about time: four semesters, with a required internship in the summer between semester two and semester three. Enter in the fall, graduate in the spring a year and a half later.",
      "It is the right program when you want range — a psychologist’s methods, a designer’s studio, a computing department’s technical courses — and you are willing to choose a home school instead of sampling all of them.",
    ],
    excels: [
      "Required summer internship, which is the strongest structured bridge to a job in this set",
      "Four tracks, so the degree can lean design, computing, or research",
      "GRE is neither required nor considered",
      "Atlanta costs less than Seattle or the Bay Area, and the airport helps a national search",
    ],
    tradeoffs: [
      "Out-of-country tuition is a professional rate: about $20,096 per full-time term on the Fall 2026 bursar schedule, before fees.",
      "No program scholarships. Assistantships exist and are not promised.",
      "The track you apply to changes portfolio rules. Picking the wrong one is an unforced error.",
      "Eighteen months is faster than a two-year MSI and slower than CMU or UW.",
    ],
    curriculum: {
      summary:
        "Track-based. Interactive Computing is the closest thing to a classic HCI + technical degree. Industrial Design is the studio and form track. Psychology is the research-methods track. LMC sits in media and communication. Cores and electives differ by home school. Confirm the current degree worksheet before you apply — credit totals are not identical in every retelling.",
      points: [
        "Community and collaboration are part of the admissions brief because the program actually runs that way.",
        "International students on F-1 must take at least 12 credits, except a possible final-semester reduction to 6.",
        "You can go deep in one culture. You cannot fully live in all four schools.",
        "AI and interactive computing sit closest to the College of Computing track. Do not assume every track teaches the same technical core.",
      ],
    },
    capstone: {
      summary:
        "The defining structured experience is the summer internship between year one and the final two semesters, not a single seven-month client studio. Project courses exist inside tracks. The internship is the piece that changes the job search.",
      points: [
        "Treat months 1–8 as internship preparation: portfolio, a clear track story, and a role target.",
        "Conversion is common enough to plan for and uncommon enough not to count on. Keep a parallel search.",
        "A Psychology-track internship and an Industrial Design internship will not look the same. Aim early.",
      ],
    },
    cohort: {
      size: "Not published as a single headcount on the pages reviewed. Four tracks mean the ‘class’ is several classrooms.",
      workload:
        "Editorial band: 40–50 hours a week in coursework, then a full-time job in the internship summer. Peaks around studio crits and methods deliverables.",
      style:
        "Collaborative by doctrine. The admissions page asks you to talk about community because group work is the culture, not a slogan.",
      points: [
        "Your closest collaborators will mostly share your track.",
        "Atlanta gives you a city internship market (Cox, NCR, Delta, Mailchimp-era design culture, healthcare, plus remote roles) and less of a single-company gravity well than Seattle.",
      ],
    },
    cost: {
      headline:
        "About $115k–$130k over 18 months for an out-of-country student if Fall 2026 rates hold for four full-time terms.",
      lines: [
        {
          label: "Out-of-country tuition, Fall 2026",
          value: "$20,096 per term at 12+ credits",
          note: "Georgia Tech Bursar, Fall 2026 tuition table, MS-HCI (College of Computing line). Also listed at $1,675 per credit hour. In-state full-time is $8,315. Fees are separate.",
          kind: "official",
        },
        {
          label: "Four full-time terms",
          value: "About $80,400 tuition",
          note: "4 × $20,096, only if later terms match Fall 2026 and you stay at 12+ credits. The Board resets rates. A lighter final term changes the math.",
          kind: "estimate",
        },
        {
          label: "Living, 18 months in Atlanta",
          value: "$30,000–$40,000",
          note: "Planning band for shared housing, food, transit, and personal costs. Not a Georgia Tech bursar figure. Heat and car-dependence vary by neighborhood.",
          kind: "estimate",
        },
      ],
      total: "$115,000–$130,000 before a paid internship",
      totalNote:
        "A paid summer internship is the number that makes this ROI work. Model it as income, not as a guarantee. Assistantships, if you get one, change the tuition line sharply — the GRA table is a different, much lower rate.",
    },
    funding: {
      summary:
        "The program does not award scholarships. It tries to help students find Graduate Research or Teaching Assistantships. Those are competitive, often arrive after you are already enrolled, and are not a funding plan you can take to a bank.",
      points: [
        "F-1 students who are GRAs or GTAs still need full-time enrollment.",
        "External fellowships and employer sponsorship of the degree are uncommon but real.",
        "Budget the professional tuition. Treat an assistantship as upside.",
      ],
    },
    application: {
      deadline:
        "1 February, 11:50 p.m. Eastern, for fall entry. The admissions process page states this deadline and says review starts after it. Confirm the calendar year on the live portal.",
      gre: "Not required and not considered.",
      checklist: [
        { item: "One track", detail: "College of Computing, Industrial Design, LMC, or Psychology. A second track is a second application." },
        { item: "Statement", detail: "Address community and collaboration, your focus, and why this degree. Plan on roughly 1,000 words unless the live form shows another cap." },
        { item: "Portfolio", detail: "Required for LMC and Industrial Design. Encouraged for Interactive Computing. Not required for Psychology." },
        { item: "Video", detail: "A short video is part of the requirements. A normal hosted URL is preferred." },
        { item: "GPA", detail: "3.0 expected. Below 3.0 is not an automatic cut." },
        { item: "English", detail: "TOEFL minimum 100 for the program. Recent admits have often been closer to 110. IELTS is the alternative." },
        { item: "Recommendations and transcripts", detail: "Follow the graduate application. Do not wait on the deadline day for letters." },
      ],
      sop: {
        type: "Statement of Purpose",
        limit: "About 1,000 words — confirm on the form",
        strategy: [
          "Give one full paragraph to how you work with other people. The program asks for community because the degree is joint and studio-heavy. A solo-genius essay is a miss.",
          "Name the track in the first page and defend it. ‘I like all of HCI’ reads as ‘I did not read the site.’",
          "If you have undergraduate studio, research-lab, or shipped-product experience, describe one collaboration with a specific conflict and what changed in the work.",
          "Interactive Computing applicants should show they can handle technical courses without pretending to be CS graduate students. Psychology applicants should show methods, not only mockups.",
          "Industrial Design applicants have an extra prompt about why that track. Answer it with form, materials, and users — not with a software-only story.",
        ],
      },
    },
    outcomes: {
      summary:
        "Very good practical outcomes across tech, healthcare, and design, with the internship doing more than the logo. Atlanta will hire some of the class. A national search hires the rest. The program does not publish a single employment percentage comparable to Michigan’s MSI report.",
      searchTime: "Planning band: 2–5 months after the internship, faster when the internship converts.",
      roles: ["UX designer", "Product designer", "UX researcher", "HCI specialist in healthcare or enterprise"],
      employers: [
        "Southeast and national tech and healthcare employers",
        "Design teams that recruit from the four tracks differently",
        "Internship employers, when conversion happens",
      ],
      points: [
        "The internship is the outcome strategy. Coursework alone will not differentiate you.",
        "Computing-track students have an easier time in roles that sit next to engineering. That matters for sponsorship.",
        "Do not expect Bay Area gravity. You will fly to it, or you will build a case from Atlanta and remote roles.",
      ],
    },
    acceptance: {
      rate: "Not published",
      note: "The pages reviewed on 11 October 2026 do not print an acceptance rate. Four tracks and a larger machine than MHCI make the statistical door wider than CMU’s. The portfolio tracks are still competitive.",
    },
    indices: {
      livability: {
        score: 6,
        rationale:
          "Atlanta is a real city with moderate rents, difficult transit once you leave the core, hot summers, and a campus safety conversation you should read rather than dismiss. Livable. Not gentle.",
      },
      jobSecurity: {
        score: 8,
        rationale:
          "The required internship is the best structural advantage in this set after CMU’s brand. Outcomes are solid and a bit more industry-diverse. The name is respected and less automatic than CMU or Berkeley in a PM screen.",
      },
      futureProof: {
        score: 8,
        rationale:
          "Computing and psychology tracks age well if you use them. Human–AI work is available next to a full CS college. Track choice can also strand you in a narrower media or form path if that is not what you wanted.",
      },
      selectivity: {
        score: 6,
        rationale:
          "No published rate. More seats and four entry points. GPA floor is stated as an expectation, not a wall. ID and LMC portfolios raise the craft bar inside a wider admit pool.",
      },
      roi: {
        score: 8,
        rationale:
          "Professional tuition is easy to underestimate, and four terms add up. The internship, 18-month clock, and Atlanta rent are why this still beats the two-year coastal and Ann Arbor stickers for most self-funded students.",
      },
    },
    visa: {
      range: "55–70%",
      rationale:
        "The degree is the STEM-facing HCI master’s employers expect from Georgia Tech; confirm the CIP on your I-20 anyway. The internship is the sponsorship wedge. Atlanta headquarters sponsor less consistently than Bay Area product orgs. A computing-track portfolio aimed at large tech is the top of this range. A studio-only search is the bottom.",
    },
    related: [
      {
        with: "cmu",
        why: "Pay more, finish faster, lean on brand and capstone instead of an internship.",
      },
      {
        with: "utaustin",
        why: "If tuition is the constraint, price Austin’s information-school invoice before you commit to the professional supplement.",
      },
    ],
    sources: [
      { label: "MS-HCI program", href: "https://mshci.gatech.edu/" },
      { label: "Tuition and funding notes", href: "https://mshci.gatech.edu/program/tuition-fees" },
      { label: "Fall 2026 bursar table (PDF)", href: "https://bursar.gatech.edu/student/tuition/fa26/fa26_totals_page.pdf" },
      { label: "Admissions requirements", href: "https://mshci.gatech.edu/admissions/requirements" },
      { label: "Deadline and tracks", href: "https://mshci.gatech.edu/admissions/process" },
      { label: "FAQ, including 18-month calendar", href: "https://mshci.gatech.edu/faqs" },
    ],
  },
  {
    id: "berkeley",
    rank: 3,
    shortName: "UC Berkeley MIMS",
    degree: "Master of Information Management and Systems",
    university: "University of California, Berkeley",
    city: "Berkeley, California",
    durationLabel: "2 years",
    durationMonths: 24,
    tone: "lavender",
    officialUrl: "https://www.ischool.berkeley.edu/programs/mims",
    tagline: "A product and systems degree that happens to sit in the Bay Area. Not a design studio with a view.",
    rankReason:
      "First choice if the target role is product management or a technical product seat. Third here because a product-design portfolio is not what the degree is built to produce.",
    overview: [
      "MIMS is a two-year, full-time, STEM-designated professional master’s at the School of Information. The school’s own line is AI, UX, data, and ethical technology — in that mix, not with UX in front.",
      "The target class is about 50–70 people. The published class profile is experienced: average GPA 3.57, average 5 years of work, average age 25, average TOEFL 111. This is not a program for a thin academic record and a hopeful portfolio.",
      "You are buying the Bay Area hiring calendar and a curriculum that treats information systems, policy, and product judgment as one subject. If you want daily studio crits, Washington is the more honest pick.",
    ],
    excels: [
      "Product management, strategy, and systems thinking",
      "Bay Area network and internship culture",
      "Strongest published salary figure in this set: $120,000 median for the class of 2023",
      "Limited but real fellowships, $5,000–$30,000, considered automatically",
    ],
    tradeoffs: [
      "Official nonresident cost of attendance is $85,159.50 for 2026–27 alone.",
      "Design craft is available and not the center of the degree.",
      "Two years of Bay Area rent is the hidden tuition.",
      "The career report people quote is the class of 2023, updated on the site in August 2024. Ask for anything newer.",
    ],
    curriculum: {
      summary:
        "A flexible professional curriculum across UX, data, AI, security, policy, and management. You design a focus. The school expects you to leave with projects, not only courses. Final degree requirements should be read on the current MIMS curriculum page — concentrations shift names.",
      points: [
        "Product sense is taught next to data and engineering-adjacent courses. That is the PM advantage.",
        "UX research and interaction design are normal paths, not the default identity of the cohort.",
        "A summer between years is the internship window. Most students use it that way. Confirm current practicum rules rather than assuming credit.",
        "Ethics and the social side of technology are part of the school’s brand. Use them in the essay or do not claim them.",
      ],
    },
    capstone: {
      summary:
        "MIMS final projects and client or research work vary by focus. There is no single seven-month sponsor studio equivalent to CMU’s capstone. The portfolio is a set of course and summer projects you have to edit yourself.",
      points: [
        "PM-track students should leave with a strategy artifact: a bet, a metric, a constraint, a decision.",
        "Design-track students need to build crits into their schedule. The school will not force a studio rhythm.",
        "Summer internships do more for outcomes here than the final project title.",
      ],
    },
    cohort: {
      size: "Target class of about 50–70 (admissions page).",
      workload:
        "Editorial band: 40–50 hours plus recruiting. The Bay Area internship cycle is a second job from late fall of year one.",
      style:
        "Experienced peers. Average five years of work means you will sit next to people who have already shipped. Collaboration is professional, not a foundation-year studio.",
      points: [
        "Age range on the published profile: 21–34. Career changers are normal. Unfocused career changers are not.",
        "The small class is an advantage only if you use the career office and the alumni who stayed in the Bay.",
      ],
    },
    cost: {
      headline: "About $170,000 over two years if 2026–27 costs repeat, before tuition increases and before any fellowship.",
      lines: [
        {
          label: "Nonresident tuition and fees, 2026–27",
          value: "$47,199.50",
          note: "I School funding page. Continuing-student total is $23,599.75 per semester. First semester is slightly higher because of a document fee.",
          kind: "official",
        },
        {
          label: "Personal expenses, 2026–27",
          value: "$37,960",
          note: "Official student budget: housing and utilities $19,920, food $9,962, plus transport, books, and personal. This is the honest Berkeley number. Use it.",
          kind: "official",
        },
        {
          label: "Total expected cost, one year",
          value: "$85,159.50",
          note: "School’s own total for nonresidents, 2026–27. Figures may not be final.",
          kind: "official",
        },
        {
          label: "Two-year sketch",
          value: "About $170,300",
          note: "Two times the 2026–27 expected cost. Year two will be reset. A fellowship of $5k–$30k changes one year, not the shape of the budget.",
          kind: "estimate",
        },
      ],
      total: "About $170,000 before aid",
      totalNote:
        "This is the most completely published cost in the set, and it is high. The median salary figure is also the highest. ROI is a Bay Area PM outcome minus two years of burn. A design-studio outcome does not pay this invoice back quickly.",
    },
    funding: {
      summary:
        "All applicants are considered for I School and California Promise fellowship packages. Awards run from $5,000 to $30,000 for a limited number of admitted students. Campus jobs and fee remissions are possible later. None of this is guaranteed.",
      points: [
        "There is no separate fellowship application for the packages described on the funding page.",
        "Even a $30,000 award leaves a five-figure annual gap.",
        "Do not compare this to a funded PhD. It is a professional degree with a scholarship on top for some people.",
      ],
    },
    application: {
      deadline: "6 January 2027 for an August 2027 start (admissions page).",
      gre: "Not required. Holistic review. Do not send a score unless the live form asks.",
      checklist: [
        { item: "Essays", detail: "A statement of purpose and a personal history statement. Plan 500–1,000 words each unless the form differs." },
        { item: "Recommendations, resume, transcripts", detail: "Standard graduate set. The profile skews toward people with work behind them." },
        { item: "Work evidence", detail: "Not a portfolio-first program. Include project evidence if it shows product judgment, research, or technical work." },
        { item: "English", detail: "Admitted-profile average TOEFL is 111. That is a description of who got in, not the published minimum." },
        { item: "Fit", detail: "The school says it reads achievement in the context of opportunity. Concrete scope beats prestige adjectives." },
      ],
      sop: {
        type: "Statement of Purpose + Personal History",
        limit: "500–1,000 words each — confirm on the form",
        strategy: [
          "The strategic question to answer: how you will advance the future of technology and design engineering. Berkeley wants a point of view about systems, not a tour of your Dribbble.",
          "Split the documents. The statement is the professional bet: problem, skills, why MIMS, what you will do in the Bay. The personal history is context, not a second statement with the nouns swapped.",
          "Name the kind of product work — PM, UX research, data-adjacent design — and the course area that supports it. ‘I want to keep my options open’ is expensive at this tuition.",
          "If you are a designer, show that you can talk to engineers and data people. The cohort will. An essay that avoids anything technical reads as a poor fit.",
          "Five years is the average experience, not a minimum. If you have less, show scope: users, constraints, a decision you owned.",
        ],
      },
    },
    outcomes: {
      summary:
        "The class of 2023 median salary was $120,000. Recent titles on the career page include product manager, UX researcher, interaction designer, product designer, data scientist, machine learning engineer, and trust and safety. Employers named include Google, Meta, Apple, Microsoft, Salesforce, and PayPal, plus startups and public agencies. The field chart on that page is older (2018 graduates). Read the 2023 report before you quote a percentage.",
      searchTime: "Planning band: 2–6 months, faster with a returning summer internship, slower for visa-dependent design roles.",
      roles: ["Product manager", "UX researcher", "Product designer", "Data or AI product roles"],
      employers: ["Google", "Meta", "Apple", "Microsoft", "Salesforce", "PayPal", "Startups and public-interest orgs"],
      points: [
        "This is the PM pipeline in the set. Pure visual design is a harder story to tell from MIMS than from UW.",
        "The $120k median is two classes behind the date of this site. Treat it as the last published number, not this year’s market.",
        "Bay Area density cuts both ways: more sponsor-capable employers, more competition, higher burn while you search.",
      ],
    },
    acceptance: {
      rate: "Not published",
      note: "Admissions calls the review holistic and prints a class profile instead of a rate. Relative to this set it belongs with CMU: small class, experienced pool, high unspoken bar.",
    },
    indices: {
      livability: {
        score: 5,
        rationale:
          "Food, transit, weather, and the intellectual scene are excellent. Housing is the crisis, and neighborhood safety is uneven. The school’s own housing line is $19,920 a year, which means roommates and compromises. Livability is high only if that budget does not scare you.",
      },
      jobSecurity: {
        score: 9,
        rationale:
          "Best published salary and the clearest PM network. UX and product design outcomes are real and secondary. Job security here means ‘product roles in the Bay,’ not ‘any design studio.’",
      },
      futureProof: {
        score: 9,
        rationale:
          "AI, data, policy, and human-centered work in one school is the most systems-heavy mix in the set. You can leave under-practiced in visual craft. You are unlikely to leave unable to talk about how AI products are built and governed.",
      },
      selectivity: {
        score: 8,
        rationale:
          "No rate printed. A 50–70 person class with a 3.57 GPA and five-year experience average is a tight door. Holistic review helps nontraditional paths. It does not lower the standard.",
      },
      roi: {
        score: 6,
        rationale:
          "The salary data is the best in the set and the two-year cost is tied for worst. Fellowships are too small and too uncertain to repair the sticker. Worth it for a PM or technical product outcome. A poor bet for a generalist design year.",
      },
    },
    visa: {
      range: "65–80%",
      rationale:
        "STEM-designated, in the densest market of employers that already sponsor, with a curriculum that points at PM and engineering-adjacent titles. Those titles sponsor more often than visual design. The top of the range still assumes a competent search and a lottery. It is not an admission outcome.",
    },
    related: [
      {
        with: "umich",
        why: "Michigan’s new PM pathway is the lower-myth alternative. Compare cost and where graduates actually live.",
      },
      {
        with: "cmu",
        why: "Both are high-signal. CMU is a year and a capstone. Berkeley is two years and a product system.",
      },
    ],
    sources: [
      { label: "MIMS program", href: "https://www.ischool.berkeley.edu/programs/mims" },
      { label: "2026–27 tuition and student budget", href: "https://www.ischool.berkeley.edu/programs/mims/funding" },
      { label: "Admissions and class profile", href: "https://www.ischool.berkeley.edu/programs/mims/admissions" },
      { label: "Career outcomes, class of 2023 median", href: "https://www.ischool.berkeley.edu/programs/mims/careers" },
    ],
  },
  {
    id: "uw",
    rank: 4,
    shortName: "UW MHCI+D",
    degree: "Master of Human-Computer Interaction + Design",
    university: "University of Washington",
    city: "Seattle, Washington",
    durationLabel: "1 year · 46 credits minimum",
    durationMonths: 12,
    tone: "peach",
    officialUrl: "https://mhcid.washington.edu/",
    tagline: "The craft year. Portfolio in, portfolio out, Seattle on the doorstep.",
    rankReason:
      "Best program in this set if the gap in your application is design craft and you want it fixed in a year. Weaker if you need a long internship before you can interview.",
    overview: [
      "MHCI+D is a fee-based, self-sustaining STEM master’s. Tuition is the same for residents, nonresidents, and international students, charged per credit. The apply page lists a 46-credit minimum.",
      "The culture is studio and critique. You are there to make, test, and iterate in a cohort, not to sample an entire information school.",
      "Seattle is the point. Amazon, Microsoft, and a thick layer of product teams recruit here. A one-year clock means you interview on the work you brought plus the work you make in autumn and winter — not on a summer return offer.",
    ],
    excels: [
      "Studio craft and human-centered making",
      "Seattle tech ecosystem",
      "Same tuition for every student, so residency games do not matter",
      "Speed: one year, then a salary",
    ],
    tradeoffs: [
      "Published tuition estimate is $63,618 (46 × $1,383) before quarterly fees.",
      "Almost no institutional aid. The program says most students use loans and savings.",
      "No built-in long internship. The job search runs during the program.",
      "Seattle rent will compete with tuition for your attention.",
    ],
    curriculum: {
      summary:
        "A locked, cohort-based year rather than a track menu. Studio, prototyping, and human-centered methods carry the degree. Technical and strategy electives exist inside a short calendar, so you add a skill; you do not change fields twice.",
      points: [
        "Physical and digital prototyping is the pedagogical center. Show you have done it, or show you can learn it fast.",
        "46 credits is the minimum on the apply page. Fees (registration, technology, U-Pass) sit on top of the per-credit price.",
        "The year is too short for a slow ramp. The first studio is already portfolio material.",
      ],
    },
    capstone: {
      summary:
        "The year culminates in a substantial team design project. It is the case study you graduate with. It is not a substitute for a summer at a company, because there often is no separate summer left.",
      points: [
        "Start the case-study writeup during the project, not after the exhibit.",
        "Team composition matters more here than at a large elective program. You cannot hide.",
        "Recruiting relationships in Seattle are the other capstone. Use them in parallel, not after.",
      ],
    },
    cohort: {
      size: "The public class-of-2026 roster on the program site is on the order of 35–40 students. That is a headcount of a webpage, not an official cap.",
      workload:
        "Editorial band: 50 hours or more in peak studio weeks. Critique, plus a job search, is the load. People underestimate the second one.",
      style:
        "Studio cohort. Daily collaboration, shared crit, less elective wandering. Intense and socially small.",
      points: [
        "A class this size means faculty know the work. It also means one bad team stings.",
        "International students should assume the search starts in quarter one.",
      ],
    },
    cost: {
      headline: "About $94,000–$108,000 for the year before quarterly fees, at the tuition figure published on the apply page.",
      lines: [
        {
          label: "Tuition",
          value: "$1,383 per credit · $63,618 estimated",
          note: "MHCI+D apply page: 46-credit minimum at $1,383. Same price for all students. Confirm it has not been revised for your entry year. The page has carried this figure across cycles.",
          kind: "official",
        },
        {
          label: "UW graduate housing and food, 2026–27",
          value: "$23,199 academic year, on or off campus",
          note: "UW financial-aid cost of attendance for a standard Seattle graduate student, not an MHCI+D invoice. It is a nine-month-style budget.",
          kind: "official",
        },
        {
          label: "12-month Seattle living",
          value: "$30,000–$40,000",
          note: "Planning band above the nine-month figure because the program runs about a full year in a high-rent market. Roommates are assumed.",
          kind: "estimate",
        },
      ],
      total: "$94,000–$108,000 plus fees",
      totalNote:
        "One year of cash, then you can earn. That is the ROI case against two-year programs with similar tuition-per-year. It fails if Seattle rent blows the top of the band and you have no savings.",
    },
    funding: {
      summary:
        "Fee-based and self-sustaining. The program states it does not qualify for the full set of state-funded fellowships and that students are not eligible for tuition-exemption programs such as Husky Promise. Loans, savings, a competitive GSEE supplemental award, and employer support are the listed paths.",
      points: [
        "FAFSA priority is 15 January if you are eligible to file. Many international students are not.",
        "Do not expect a GRA culture like a funded PhD or even like Georgia Tech.",
        "Some employers pay. Almost none of them are your current employer unless you already negotiated it.",
      ],
    },
    application: {
      deadline: "18 January 2027. Applications open 1 October. Confirm both on mhcid.washington.edu/apply.",
      gre: "Not part of the published requirements reviewed for this site.",
      checklist: [
        { item: "Statement of intent", detail: "500–800 words." },
        { item: "One-minute video", detail: "Required." },
        { item: "Portfolio or project evidence", detail: "Show work you made, changed, or tested. This program can tell a moodboard from a process." },
        { item: "Recommendations, resume, transcripts", detail: "Standard. Letters should speak to collaboration, not only talent." },
        { item: "English test", detail: "If required for you, check the graduate school cutoff early. Studio discussion is daily." },
      ],
      sop: {
        type: "Statement of Intent",
        limit: "500–800 words",
        strategy: [
          "Lead with a human problem you worked through prototypes, not with a tool list. The program’s center is human-centered making in physical and digital form.",
          "Describe one loop: people, artifact, what failed, what you changed. Faculty have read hundreds of ‘I am passionate about users.’",
          "Say why a one-year studio is the right container. If you actually want a two-year research degree, this essay will sound cramped because the program is.",
          "Seattle can be one sentence. Do not spend the essay on the companies you hope will hire you.",
          "The video should show you thinking out loud about a piece of work. A polished brand reel with no decision in it wastes the minute.",
        ],
      },
    },
    outcomes: {
      summary:
        "Very strong for product design and UX roles on the West Coast, especially Seattle. The program does not publish a class-wide salary and employment report comparable to Michigan or Berkeley’s median. Location and portfolio do the work the missing PDF would have done.",
      searchTime: "Planning band: 2–6 months, overlapping the last half of the program. Longer if the portfolio is still student-only in March.",
      roles: ["Product designer", "UX designer", "Interaction designer", "UX researcher"],
      employers: [
        "Seattle-area product companies, including Amazon and Microsoft alumni pipelines",
        "West Coast product teams",
        "Studios — with the usual visa caveat",
      ],
      points: [
        "You are hiring into design. PM is possible and not the program’s center.",
        "Without an internship, your MHCI+D project has to be as legible as professional work.",
        "International students should target teams that have sponsored, and start that list in October.",
      ],
    },
    acceptance: {
      rate: "Not published",
      note: "No rate on the apply page reviewed. A cohort around the high thirties and a portfolio-plus-video filter make this meaningfully selective for designers, and less relevant as a comparison for career-switching PMs.",
    },
    indices: {
      livability: {
        score: 6,
        rationale:
          "Seattle’s daily life is excellent if you like weather, water, and transit in the core. Rent is the tax. A score of 6 is the city with the cost dragged out of an 8.",
      },
      jobSecurity: {
        score: 8,
        rationale:
          "Excellent for product design and UX where Seattle hires. Less automatic for PM than Berkeley, less nationally mythic than CMU, more craft-legible than either. The missing internship keeps it off a 9.",
      },
      futureProof: {
        score: 7,
        rationale:
          "Prototyping and human-centered practice age well, including for AI products, if you point projects at them. A one-year studio will not give you Berkeley’s systems depth or Georgia Tech’s computing track. Electives are real and few.",
      },
      selectivity: {
        score: 7,
        rationale:
          "Small cohort, required video, portfolio that has to show making. Harder than the large information-school master’s programs. Not a published-rate story.",
      },
      roi: {
        score: 7,
        rationale:
          "Tuition near $64k and a high-rent year, then you earn. Better cash shape than Berkeley or Michigan. Worse than Austin on tuition, better if craft was the thing holding your career back.",
      },
    },
    visa: {
      range: "55–70%",
      rationale:
        "The apply page calls the program a STEM program. Seattle employers sponsor, and many design roles still do not. No internship means fewer conversion paths. The top of the range is a strong portfolio aimed at large product orgs. The bottom is a studio search that starts in May.",
    },
    related: [
      {
        with: "cmu",
        why: "Both finish in a year. Choose craft and Seattle, or capstone, brand, and Pittsburgh prices.",
      },
      {
        with: "gatech",
        why: "Choose a studio year, or an 18-month degree with a required internship and more technical range.",
      },
    ],
    sources: [
      { label: "MHCI+D", href: "https://mhcid.washington.edu/" },
      { label: "Apply: credits, tuition, deadline, STEM, aid", href: "https://mhcid.washington.edu/apply/" },
      { label: "Class of 2026 roster", href: "https://mhcid.washington.edu/students/" },
      { label: "UW graduate cost of attendance, 2026–27", href: "https://www.washington.edu/financialaid/cost-of-attendance/" },
    ],
  },
  {
    id: "umich",
    rank: 5,
    shortName: "UMich MSI",
    degree: "Master of Science in Information",
    university: "University of Michigan",
    city: "Ann Arbor, Michigan",
    durationLabel: "2 years",
    durationMonths: 24,
    tone: "ochre",
    officialUrl: "https://www.si.umich.edu/programs/degree-programs/master-science-information",
    tagline: "A large, well-run information degree with real UX and a new PM pathway. The outcome PDF is not a UX outcome PDF.",
    rankReason:
      "Right school if you want research methods, a flexible UX path, or the new product-management pathway — and you will read the employment report carefully. The sticker is Berkeley-shaped without the Bay Area median.",
    overview: [
      "The MSI at the School of Information is a two-year professional degree on North Campus in Ann Arbor. Pathways include User Experience Research and Design, User-Centered Application Development, Product Management (new for students entering fall 2026), Information and Data Analytics, and a libraries and archives path.",
      "No GRE. Recommended undergraduate GPA is 3.0. The school is large: 358 MSI graduates in 2025. You can disappear into the size, or you can use it.",
      "The career office publishes a real report. Use it. Then remember it covers every pathway, including librarianship.",
    ],
    excels: [
      "UX research methods and a dedicated UX pathway",
      "A product-management pathway with coursework built around cross-functional teams",
      "Published outcomes: 88% employed, $91k average salary, 3–4 month average search, class of 2025",
      "Fellowships and some assistantships exist, unlike CMU or UW",
    ],
    tradeoffs: [
      "Nonresident full-time tuition on the 2026–27 School of Information table is $32,139 per term.",
      "45% of reporting 2025 MSI graduates were working in Michigan. The network is national and the gravity is Midwestern.",
      "Two years at this tuition is one of the most expensive paths in the set.",
      "‘MSI’ on a resume needs a pathway sentence. The letters alone do not say product design.",
    ],
    curriculum: {
      summary:
        "Pathway-based inside a  shared information core. UX Research and Design is methods, prototyping, and stakeholder communication. User-Centered Application Development adds full-stack and agile delivery. Product Management, launched for fall 2026, combines strategy, user research, and human-centered design, including a course where students rotate through UX, PM, and engineering roles.",
      points: [
        "You must pick a pathway with intent. The degree’s flexibility is also how people graduate undifferentiated.",
        "Research training is a genuine advantage if your portfolio is currently ‘screens only.’",
        "AI shows up as a skill employers asked for in the 2026 outcomes coverage — hybrid roles such as UX strategist and AI UX designer — not as a guarantee every section teaches it.",
        "Confirm STEM OPT against the CIP code on the I-20. Do not assume a pathway name prints STEM on the visa document.",
      ],
    },
    capstone: {
      summary:
        "Practical engagement, internships, and pathway projects replace a single famous capstone brand. The career report lists internships among the experiences tied to job outcomes. There is no CMU-style seven-month sponsor monograph that carries the program’s reputation.",
      points: [
        "Plan a summer internship between years. The 3–4 month postgraduate search assumes people did not start from zero.",
        "A research thesis-style project helps UXR applicants more than a visual reel.",
        "PM pathway students should leave with a collaboration story from the cross-functional studio, because that is the new curriculum’s point.",
      ],
    },
    cohort: {
      size: "Large. 358 MSI graduates in 2025. Your pathway cohort is the relevant unit, and it is smaller.",
      workload:
        "Editorial band: 35–45 hours, with spikes in methods courses and team studios. Less crushing than CMU summer. Easier to under-work and graduate with a generic portfolio.",
      style:
        "Big-school collaboration. You build a crew inside UX or PM. The school will not force one.",
      points: [
        "Ann Arbor is a campus town. The intensity is academic, not a commuter-city hustle.",
        "Career services are staffed and documented. Use them early. The report exists because people report.",
      ],
    },
    cost: {
      headline: "About $170,000–$185,000 over two years at the 2026–27 nonresident full-time rate, before aid.",
      lines: [
        {
          label: "Nonresident tuition, 9+ credits",
          value: "$32,139 per full term",
          note: "U-M Registrar, School of Information graduate full-term table, 2026–27, ‘School of Information and Public Health’ 9+ nonresident line. A neighboring Rackham line on the same page shows $31,555. Confirm which line your bill uses.",
          kind: "official",
        },
        {
          label: "Four full terms",
          value: "About $128,600",
          note: "4 × $32,139 if the rate never moves. It will move in year two. Summers extra if you enroll.",
          kind: "estimate",
        },
        {
          label: "Living in Ann Arbor, per year",
          value: "$20,000–$26,000",
          note: "Planning band for shared housing, food, and local costs. Not an Office of Financial Aid printout. Cheaper than Berkeley and Seattle. Winters are part of the budget only if you buy the coat.",
          kind: "estimate",
        },
      ],
      total: "$170,000–$185,000 before aid",
      totalNote:
        "Aid is the variable that can make this rational. Without it, you are paying Berkeley-like tuition to be in Ann Arbor, with a $91k average salary that mixes every MSI pathway. Price a fellowship before you fall in love with the syllabus.",
    },
    funding: {
      summary:
        "Limited fellowships, matching of some external awards, and assistantships exist. They are not automatic and not large enough, on average, to assume. New students should read the current funding page rather than a blog from a funded PhD.",
      points: [
        "Master’s assistantships are competitive next to doctoral students.",
        "External fellowships you win yourself are the cleanest version of aid.",
        "A budget with zero aid is the responsible budget.",
      ],
    },
    application: {
      deadline:
        "Confirm on si.umich.edu for your cycle. An April 2026 school news post told fall 2026 applicants to apply by 15 May. Do not reuse that date blindly for the next fall. No GRE.",
      gre: "Not required.",
      checklist: [
        { item: "Statement of purpose", detail: "Typically 1–2 pages. Confirm the live limit." },
        { item: "Personal statement", detail: "Often a separate ~500-word essay. Confirm. Use it for path, not for a second career plan." },
        { item: "Pathway intent", detail: "Name UX Research and Design, User-Centered Application Development, or Product Management." },
        { item: "Portfolio", detail: "Plan on one for UX even if the general form leads with essays. Research and shipped work both count." },
        { item: "Recommendations and transcripts", detail: "Standard Rackham process. 3.0 GPA is recommended, not a published cliff." },
        { item: "English test", detail: "Required for many international applicants. Check Rackham’s current cutoffs." },
      ],
      sop: {
        type: "Statement of Purpose + Personal Statement",
        limit: "About 1–2 pages and about 500 words — confirm",
        strategy: [
          "Split the narrative. The SOP carries the professional goal: design engineering, UXR, or PM, and the pathway that matches. The personal statement carries how you got here. Overlap reads as padding.",
          "Name courses or the collaboration studio only if you can say what you will do there. ‘UMSI is interdisciplinary’ is not a reason.",
          "If you want UX research, show a method: who you talked to, what you changed, what you would redo. Faculty can smell a portfolio described as research.",
          "If you want the PM pathway, write about a tradeoff you managed across design, business, and build. The pathway is new. Curiosity about the role is not enough; judgment is.",
          "Ann Arbor and ‘public university values’ can be one sentence. The rest is the work.",
        ],
      },
    },
    outcomes: {
      summary:
        "Class of 2025, reported in the 2026 MSI employment report: 88% employment among respondents, $91,000 average salary ($95,000 private sector, $103,000 in technology, $64,000 public or nonprofit), 90% of respondents highly satisfied. 358 graduates, 52% response. Average search was three to four months. 45% stayed in Michigan, 11% California, 11% New York. Top industries: technology 31%, universities 14%, consulting 7%, health 7%.",
      searchTime: "3–4 months average for MSI graduates in the class of 2025 report. International UX searches are not broken out.",
      roles: ["UX researcher", "Product designer", "UX strategist", "Product manager", "Also librarians, analysts, and consultants — the report is the whole school"],
      employers: [
        "Microsoft, Adobe, Amazon, IBM",
        "Accenture, Deloitte, JPMorgan Chase, Epic",
        "University of Michigan and Michigan Medicine",
        "Stellantis",
      ],
      points: [
        "Do not quote 88% as a UX placement rate. Bold rows in the job list mark some international outcomes, which is more useful than the headline.",
        "Midwest gravity is a feature if you like the market and a bug if you only want the coast.",
        "Employers in the report are asking for UX plus AI, data, or product thinking. A methods-only story is already slightly behind the 2025 class.",
      ],
    },
    acceptance: {
      rate: "Not published",
      note: "No rate on the pages reviewed. Hundreds of MSI graduates a year means the school-level door is the widest in this set. Strong UX and PM applicants still compete inside it. A higher headcount is not a lower standard for the work.",
    },
    indices: {
      livability: {
        score: 8,
        rationale:
          "Ann Arbor is the most manageable daily life in this set: campus scale, safer than the big cities, real food, brutal winters, and rents that do not require a fellowship to survive. You will want a coat and a reason to be in Michigan.",
      },
      jobSecurity: {
        score: 7,
        rationale:
          "The published MSI numbers are good and they are not UX numbers. Technology salaries in the report ($103k) are the relevant slice. Brand is strong in the Midwest and respected nationally, less automatic on a Bay Area PM screen than Berkeley or CMU.",
      },
      futureProof: {
        score: 8,
        rationale:
          "UX, a build pathway, data, and a new PM studio that includes human–AI collaboration are a serious mix. You can also assemble a degree that ignores all of that. The curriculum is only future-proof if you choose the hard version.",
      },
      selectivity: {
        score: 6,
        rationale:
          "Large program, no GRE, 3.0 recommended. Easier to enter than CMU, Berkeley, or UW. The UX faculty and the portfolio still reject generic applications. Score is about the door, not the quality of the best alumni.",
      },
      roi: {
        score: 6,
        rationale:
          "Four terms near $32k, two years of living, outcomes that are solid and geographically spread. Aid can lift this score. Sticker price, for an international student with no fellowship, sits next to Berkeley without the $120k median.",
      },
    },
    visa: {
      range: "45–60%",
      rationale:
        "Confirm STEM on the I-20. The employer list includes sponsors (Microsoft, Amazon, Adobe) and many organizations that hire locally without a visa practice. Forty-five percent of graduates staying in Michigan is a clue: the modal job is not a Bay Area sponsorship story. International outcomes exist in the report. They are not the majority plot.",
    },
    related: [
      {
        with: "berkeley",
        why: "PM versus PM. Compare the $120k Bay Area median with Michigan’s published, broader MSI salaries and a lower city cost.",
      },
      {
        with: "gatech",
        why: "Research and pathway flexibility versus a required internship and a shorter calendar.",
      },
    ],
    sources: [
      { label: "MSI program and pathways", href: "https://www.si.umich.edu/programs/degree-programs/master-science-information" },
      { label: "PM pathway announcement", href: "https://www.si.umich.edu/about-umsi/news/umsi-launches-product-management-pathway-masters-students" },
      { label: "2026–27 tuition table", href: "https://ro.umich.edu/tuition-residency/tuition-fees/2026-2027/graduate/full-term/school-information-graduate-full-term" },
      { label: "2026 MSI employment report (class of 2025)", href: "https://www.si.umich.edu/student-experience/career-outcomes/2026-msi-employment-report" },
      { label: "Outcomes news summary", href: "https://www.si.umich.edu/about-umsi/news/2026-umsi-employment-reports-show-strong-outcomes-rapidly-changing-industries" },
    ],
  },
  {
    id: "utaustin",
    rank: 6,
    shortName: "UT Austin MSIS",
    degree: "Master of Science in Information Studies",
    university: "University of Texas at Austin",
    city: "Austin, Texas",
    durationLabel: "2 years · 36 credit hours",
    durationMonths: 24,
    tone: "cream",
    officialUrl: "https://ischool.utexas.edu/programs/msis",
    tagline: "The flexible, lower-tuition HCI menu. You have to aim it or it will not aim you.",
    rankReason:
      "Best cost structure in the set, with real concentrations in HCI, UX, and human-centered AI. Last in this order because outcomes vary more by how you build the degree than by the name on it.",
    overview: [
      "MSIS is a two-year, in-person, STEM-designated master’s at the School of Information. The degree is 36 semester hours: a core, 30 hours of electives, and a capstone. Full-time is nine hours. Fall admission only.",
      "Study areas include Human-Computer Interaction, User Experience Research and Design, and Human-Centered AI and Data Science, alongside health, security, archives, and librarianship. The flexibility is the product. It is also the risk.",
      "Austin is a real tech market — headquarters, satellite offices, and startups — without the single-school mythology of CMU or the Bay Area density of Berkeley.",
    ],
    excels: [
      "Lowest published tuition in this set for nonresidents",
      "Automatic scholarship consideration, $1,000–$4,000 a year",
      "STEM OPT eligibility, stated in the admissions FAQ",
      "Room to mix HCI, UX, and human-centered AI without a second application",
    ],
    tradeoffs: [
      "The brand will not carry a vague portfolio. Electives can become a tour.",
      "No required internship with the force of Georgia Tech’s summer.",
      "Austin sponsors unevenly. Local companies and big-tech satellites behave differently.",
      "Two years of opportunity cost against a one-year program, even when tuition is lower.",
    ],
    curriculum: {
      summary:
        "One core, a wide elective field, and a capstone. HCI, UX research and design, and human-centered AI are listed study areas, not sealed tracks with separate admissions. You can also leave through archives or policy. The schedule rewards a written plan in month one.",
      points: [
        "Nine hours a semester is full-time. That is a lighter course load than CMU’s unit system. Use the spare hours to make portfolio work, not to drift.",
        "Human-centered AI is on the menu. Take it if that is your story. Do not assume it is the default section.",
        "Cross-registering is part of the school’s pitch. A scattered transcript is not the same thing as interdisciplinary.",
      ],
    },
    capstone: {
      summary:
        "A required capstone closes the 36 hours. Scope depends on the advisor and the study area. It can be a serious final project or a last box checked. You are the one who decides which, starting a semester early.",
      points: [
        "Pair the capstone with the concentration you want to be hired into. A preservation capstone will not read as product design.",
        "There is no famous sponsor roster. Recruit your own internship summers.",
        "Austin companies will look at the work, not the course number.",
      ],
    },
    cohort: {
      size: "Not printed as a single entering class size on the pages reviewed. The school is larger and more varied than MHCI or MHCI+D.",
      workload:
        "Editorial band: 30–40 hours at nine credit hours, higher in capstone semester. The risk is under-intensity, not burnout.",
      style:
        "Self-directed. Collaboration exists inside studios and projects you opt into. Nobody will assign you a four-person product team for seven months.",
      points: [
        "Build a small crew in HCI or UX on purpose.",
        "Career outcomes track the concentration. ‘MSIS’ is a container.",
      ],
    },
    cost: {
      headline:
        "About $90,000–$110,000 over two years at Fall 2026–Spring 2027 rates, if you take four nine-hour semesters and live within the university’s own living budget.",
      lines: [
        {
          label: "Nonresident tuition, Information, 9 hours",
          value: "$9,893 per long semester",
          note: "UT Austin tuition tables, Graduate, Fall 2026–Spring 2027, Information college, nonresident, 9-hour column.",
          kind: "official",
        },
        {
          label: "Four long semesters",
          value: "$39,572 tuition",
          note: "4 × $9,893 if the rate holds and you do not add summer enrollment. 36 hours at nine per semester is the normal full-time plan.",
          kind: "estimate",
        },
        {
          label: "Graduate living budget, one academic year",
          value: "Housing and food $17,052–$17,423, plus transport $1,840, books $776, personal $4,900",
          note: "Texas One Stop, 2026–27 estimated cost of attendance, full-time graduate, nonresident, based on 9-hour enrollment. Academic-year figure. Summers in Austin cost extra if you stay.",
          kind: "official",
        },
      ],
      total: "About $90,000–$110,000 over two years",
      totalNote:
        "Tuition is the clear low outlier. Living in Austin is not cheap, and two academic-year budgets plus two summers can erase part of the tuition advantage versus a one-year program. Still the easiest invoice to survive without aid.",
    },
    funding: {
      summary:
        "Every new MSIS applicant is considered automatically for iSchool scholarships of $1,000–$4,000 a year. Academic Assistant roles exist. Teaching assistantships prioritize PhD students. Graduate research assistantships for master’s students happen and are not the plan.",
      points: [
        "No extra scholarship form for the automatic awards.",
        "The amounts are modest next to even this tuition. They are still more structural aid than CMU or UW offer.",
        "External scholarships are worth the afternoon. The base cost is low enough that a small award matters.",
      ],
    },
    application: {
      deadline:
        "5 January, 11:59 p.m. Central. All three recommendations, transcripts, statement, resume, and English scores if required must be in. Decisions typically March or April. Fall only.",
      gre: "Optional.",
      checklist: [
        { item: "Statement of purpose", detail: "Plan 1–2 pages (about 500–1,000 words) unless the form sets another limit." },
        { item: "Resume and transcripts", detail: "Required. Bachelor’s degree." },
        { item: "Three recommendations", detail: "Must arrive by the deadline, not ‘in progress.’" },
        { item: "English test", detail: "TOEFL or IELTS when the graduate school requires it." },
        { item: "Portfolio", detail: "Not stated as a universal requirement. UX and HCI applicants should still link work." },
        { item: "Fee", detail: "The iSchool does not waive the application fee itself. The graduate school has its own waiver process." },
      ],
      sop: {
        type: "Statement of Purpose",
        limit: "About 1–2 pages — confirm",
        strategy: [
          "Write about information environments and interactive systems, not a generic design-school dream. The degree lives in an iSchool. Show you understand that.",
          "Name the study area — HCI, UX research and design, or human-centered AI — in the first half. Flexibility without a target looks like you want a two-year visa more than a curriculum.",
          "One project is enough if it shows a user, a system, and a decision. A second project should change the picture, not repeat it.",
          "Austin can be a sentence about the kind of industry context you want. Do not spend the page on breakfast tacos or ‘the live music capital.’",
          "If you are changing careers, say what you will stop doing as well as what you will start. The elective menu punishes people who arrive without a cut line.",
        ],
      },
    },
    outcomes: {
      summary:
        "Solid and wider than the HCI-branded programs. Graduates go into UX, product, data, health informatics, libraries, and policy, because the degree allows all of those. Austin’s market helps the tech-facing half. The school does not publish an MSI-style employment percentage we could cite here. Specialization predicts the offer more than the diploma does.",
      searchTime: "Planning band: 2–6 months, highly dependent on whether you interned and whether the portfolio matches the job.",
      roles: ["UX researcher", "Product designer", "HCI specialist", "Human-centered AI or data roles", "Also non-design information roles"],
      employers: [
        "Austin tech headquarters and satellite offices",
        "Texas and national product teams",
        "Public-interest, health, and university employers",
      ],
      points: [
        "A human-centered AI or UX transcript plus an internship is a different outcome from a general MSIS transcript.",
        "Big-tech satellites in Austin sponsor some roles and not others. Ask alumni in the specific team, not ‘Austin’ in the abstract.",
        "Cost advantage is only ROI if the job is the job you wanted. A cheap degree into the wrong role is still two years.",
      ],
    },
    acceptance: {
      rate: "Not published",
      note: "The school says admission is competitive and does not print a rate. Unofficial applicant chatter about yield is not used here. Relative to this set, the door is the widest after Michigan’s, with more variance in admitted preparation.",
    },
    indices: {
      livability: {
        score: 7,
        rationale:
          "Austin is hot, social, and increasingly expensive, with a real food and music life and mediocre transit. The university’s housing-and-food budget near $17k for the academic year is tight but more plausible than Berkeley. Heat and sprawl keep it out of Ann Arbor’s range.",
      },
      jobSecurity: {
        score: 6,
        rationale:
          "Good market, weaker program brand for competitive PD/UXR/PM screens outside Texas. Outcomes fan out with the curriculum. You can build a strong placement story. The school will not hand you one.",
      },
      futureProof: {
        score: 7,
        rationale:
          "Human-centered AI, HCI, and UX are all listed, next to data and security. That is enough raw material. A 30-hour elective block can also avoid the hard technical courses. Future-proofing is a scheduling choice.",
      },
      selectivity: {
        score: 5,
        rationale:
          "Competitive, unpublished, and structurally more open than the studio cohorts or MIMS. The right score for ‘you can get in and still waste it.’ Not a quality ranking of the faculty.",
      },
      roi: {
        score: 8,
        rationale:
          "Four semesters at $9,893 is the tuition outlier, scholarships are small but automatic, and Austin is a real market. The score stops at 8 because outcome variance is high and two years of living plus lost salary are not free.",
      },
    },
    visa: {
      range: "45–60%",
      rationale:
        "The admissions FAQ states the MSIS is a DHS STEM program eligible for STEM OPT. Austin has sponsor-capable offices and many employers who will not file. A UX-only search without an internship lands at the bottom of the range. A human-centered technical portfolio aimed at larger product teams lands at the top. The degree does not move you there by itself.",
    },
    related: [
      {
        with: "gatech",
        why: "The cost-versus-structure choice. Austin is cheaper and looser. Georgia Tech costs more and makes you intern.",
      },
      {
        with: "uw",
        why: "Two years of flexibility and lower tuition, versus one intense studio year in Seattle.",
      },
    ],
    sources: [
      { label: "MSIS program", href: "https://ischool.utexas.edu/programs/msis" },
      { label: "Admissions FAQ: deadline, scholarships, STEM OPT", href: "https://ischool.utexas.edu/programs/admissions/faqs" },
      { label: "Fall 2026–Spring 2027 tuition tables", href: "https://catalog.utexas.edu/general-information/registration-tuition-and-fees/tuition-and-fees/tables-tuition-for-fall-and-spring/" },
      { label: "2026–27 graduate cost of attendance", href: "https://onestop.utexas.edu/managing-costs/cost-tuition-rates/cost-of-attendance/" },
    ],
  },
];

export const pathways: Pathway[] = [
  {
    id: "design",
    title: "Product Design",
    tone: "peach",
    blurb: "You need craft, critique, and a portfolio a hiring manager can read. Studio time beats a flexible catalog.",
    ids: ["uw", "cmu", "gatech"],
  },
  {
    id: "research",
    title: "UX Research",
    tone: "lavender",
    blurb: "Methods first. A screen-only portfolio will not survive these pathways, and it should not.",
    ids: ["umich", "gatech", "cmu"],
  },
  {
    id: "pm",
    title: "Product Management",
    tone: "pink",
    blurb: "Strategy, systems, and a seat next to engineering. Design craft is useful and not the job.",
    ids: ["berkeley", "umich", "cmu"],
  },
  {
    id: "cost",
    title: "Lowest Cost",
    tone: "ochre",
    blurb: "Sticker price, then time-to-salary. Austin’s semester is the cheap one. A one-year program can still cost less in lost wages.",
    ids: ["utaustin", "uw", "gatech"],
  },
  {
    id: "speed",
    title: "Fastest Timeline",
    tone: "teal",
    blurb: "Twelve months, then you are employable again. Only two programs in this set are built that way.",
    ids: ["cmu", "uw"],
  },
];

const byId = new Map(programs.map((program) => [program.id, program]));

export function getProgram(id: string): Program | undefined {
  return byId.get(id as ProgramId);
}

export function isProgramId(id: string): id is ProgramId {
  return (PROGRAM_IDS as readonly string[]).includes(id);
}

export function parseIds(value: string | undefined): ProgramId[] {
  if (!value) return [];
  const seen = new Set<ProgramId>();
  for (const part of value.split(",")) {
    const id = part.trim();
    if (isProgramId(id) && !seen.has(id)) seen.add(id);
  }
  return [...seen].slice(0, 3);
}

export function isCategory(value: unknown): value is CompareCategory {
  return COMPARE_CATEGORIES.some((category) => category.id === value);
}
