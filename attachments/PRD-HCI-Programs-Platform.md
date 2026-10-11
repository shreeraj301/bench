# Product Requirements Document (PRD)
## HCI Programs Research & Comparison Platform

**Document Version:** 1.1  
**Date:** 11 October 2026  
**Status:** Approved for Development  
**Primary Stakeholder:** Shreeraj Narwade  
**Document Type:** Detailed PRD for Expert Developer

---

### 1. Executive Summary

Build a high-fidelity, fully responsive research and decision-support website that enables rigorous evaluation of six leading U.S. HCI / UX / product design master’s programs. The product prioritizes clarity, honest trade-offs, and decision utility over marketing aesthetics.

The site must strictly implement the Clay.com design system (cream canvas, saturated single-color feature cards, rounded display typography, restrained motion). Core value is delivered through detailed individual program pages and a constrained comparison tool (2–3 programs). Dark mode is required.

**Programs in scope:**
- Carnegie Mellon University — MHCI
- Georgia Institute of Technology — MS-HCI
- UC Berkeley — MIMS
- University of Washington — MHCI+D
- University of Michigan — MSI
- University of Texas at Austin — MSIS

### 2. Goals & Success Criteria

**Primary Goals**
- Allow rapid, accurate comparison of programs across cost, outcomes, curriculum, application requirements, and strategic fit.
- Surface realistic expectations for international students (visa, sponsorship, job search duration).
- Provide transparent, explainable indices rather than opaque scores.
- Feel like a crafted research instrument, not a generic marketing or AI-generated site.
- Meet WCAG 2.1 AA contrast requirements in both light and dark modes.

**Success Criteria**
- User can complete a meaningful 2- or 3-program comparison in under 90 seconds.
- Every program page is self-contained and usable without returning to the homepage.
- Visual and interaction quality matches the Clay system specification with no generic SaaS patterns.
- All quantitative claims include source attribution and last-updated date.
- Fully functional and readable on mobile (primary) and desktop.
- Dark mode toggle works and persists; both modes meet WCAG AA.

### 3. Target Users

- Primary: Career-transitioning designer based in India evaluating U.S. HCI master’s programs for product design, UX research, or product management pathways, with long-term leadership or studio ambitions.
- Secondary: Other applicants with similar goals evaluating the same programs.

### 4. Information Architecture

| Page | Purpose | Key Entry Points |
|------|---------|------------------|
| Homepage | Orientation, ranking snapshot, pathway entry, Compare CTA | Nav, direct URL |
| Compare | Side-by-side evaluation (2–3 programs) | Homepage CTA, program page buttons |
| Program Page (×6) | Complete program deep dive | Homepage cards, nav, Compare links |
| Application Guide | Cross-program materials and process guidance | Nav, program page links |
| Decision Framework | Goal-to-index weighting guidance | Nav, Homepage |
| Indices Methodology | Scoring logic and data sources | Index tooltips, footer, Decision Framework |

### 5. Functional Requirements

#### 5.1 Homepage
- Display overall ranking with concise rationale.
- “Best for” pathway modules: Product Design, UX Research, Product Management, Lowest Cost, Fastest Timeline. Each pathway links to relevant programs or pre-filtered Compare.
- Prominent Compare entry point that enforces min 2 / max 3 selection.
- Indices overview (all six programs, all indices) in a scannable format.
- Clear navigation to every program page and supporting pages.
- Data source and last-updated indicator.
- Dark mode toggle in top navigation.

#### 5.2 Compare Tool
- User selects exactly 2 or 3 programs.
- Category toggles: Overview, Cost, Outcomes, Curriculum & Learning Model, Application Requirements, Indices.
- Each category renders comparable data in a consistent layout.
- Official program links present for every selected program.
- Export / share capability (clean shareable link preferred; PDF optional).
- Mobile: stacked or horizontally scrollable comparison that remains readable.
- Persistent selection state within the session.

#### 5.3 Program Pages
Each program page must contain the following sections in a logical, scannable order:

- Overview and ranking rationale
- Curriculum & learning model
- Capstone / internship details
- Cohort & intensity notes (typical class size, weekly workload expectation, collaboration style)
- Cost of attendance breakdown (tuition + estimated living costs by city)
- Funding and scholarships
- Application readiness checklist (SOP, portfolio, video, recommendations, deadlines)
- Outcomes and job market summary
- Acceptance rate
- Indices (Livability, Job Security, Future Proof, Selectivity, ROI) with short inline explanations
- Visa chances (percentage range with brief rationale)
- SOP / essay strategy notes specific to the program’s actual prompt
- Prominent official program link
- Related comparisons (suggested 2-program pairings)
- Data sources and last updated

#### 5.4 Supporting Pages
- **Application Guide**: Consolidated materials checklist, deadline overview, portfolio expectations, video essay notes, and cross-program differences.
- **Decision Framework**: Guidance on weighting indices against user goals (design craft vs. research vs. PM, cost sensitivity, timeline, international constraints).
- **Indices Methodology**: Explicit scoring criteria, data sources, and limitations for every index.

### 6. Indices Specification

| Index | Definition | Scale | Notes |
|-------|------------|-------|-------|
| Livability | Cost of living, housing availability, safety, international student experience, general city quality of life | 1–10 | City-specific |
| Job Security | Placement strength into PD/UXR/PM roles, network density, internship conversion, program brand value | 1–10 | Outcomes-focused |
| Future Proof | Coverage of AI and human-AI interaction, systems thinking, curriculum adaptability | 1–10 | Curriculum + trajectory |
| Selectivity | Acceptance rate combined with typical admitted profile rigor | 1–10 | Relative across the six programs |
| ROI | Total cost of attendance relative to placement strength and typical outcomes | 1–10 | Cost-normalized |
| Visa Chances | Realistic OPT and sponsorship likelihood based on program brand, location, and historical international outcomes | Percentage range | e.g., 60–75% |

All indices require methodology documentation and source attribution.

### 7. Design System Requirements

Strict adherence to the Clay.com design system (see DESIGN-clay.md):

- Canvas: cream-tinted white (`#fffaf0`) in light mode
- Primary CTAs: near-black (`#0a0a0a`) with white text, 12px radius
- Feature cards: saturated single-color system (hot pink, deep teal, lavender, peach, ochre, cream). Colors must cycle; consecutive identical colors are prohibited.
- Typography: rounded display headlines (Plain Black style or Inter weight 500 with negative letter-spacing); body in Inter. Display weight never exceeds 500.
- Spacing: 96px major section rhythm; generous internal card padding.
- Footer: cream only in light mode.
- Elevation: minimal. Depth comes from color contrast, not heavy shadows.
- No cool grays as primary surfaces, no purple gradients, no glassmorphism, no generic SaaS card patterns.

### 8. Dark Mode

**Requirement**  
Persistent dark mode toggle in the top navigation on all pages.

**Behavior**
- Switches between light (Clay cream system) and dark mode.
- Preference saved in local storage and persists across sessions.
- Respects system preference on first visit if no saved preference exists.
- Keyboard accessible with clear visual state.

**Dark Mode Visual Rules**
- Base canvas: deep warm near-black (`#0a1a1a` or equivalent).
- Primary text: off-white.
- Saturated feature cards retain brand colors with adjusted contrast for readability.
- Footer: dark teal-tinted surface.
- Hairlines and borders remain visible.
- No pure black or cool gray backgrounds.
- Typography hierarchy, spacing, and radius system unchanged.
- Must meet WCAG 2.1 AA contrast in both modes.

### 9. Interactivity & Motion

- Compare tool is the primary interactive surface.
- Smooth category switching and expandable detail sections.
- Subtle hover elevation on interactive cards only.
- No parallax, bounce, or decorative animation.
- Motion timing should feel precise and calm (approximately 150–250ms for state changes).
- All interactive elements must have clear focus and hover/active states within the design system.

### 10. Accessibility (WCAG 2.1 AA)

- Normal text: minimum 4.5:1 contrast ratio.
- Large text: minimum 3:1.
- UI components and graphics: minimum 3:1.
- Focus indicators clearly visible.
- Do not rely on color alone to convey meaning.
- Both light and dark modes must pass contrast checks.
- Semantic HTML and keyboard navigation required.

### 11. Content & Data Requirements

- Base data from provided CSV; expand with researched detail.
- Every quantitative claim must include a source and last-updated date.
- Official program links must be current and prominent.
- Tone: clear, direct, and non-promotional. Present trade-offs explicitly.
- International student realities (visa, sponsorship, job search duration) must be addressed honestly.
- Content structure must be data-driven to allow future updates without layout breakage.

### 12. Non-Functional Requirements

- Fully responsive; mobile-first implementation with excellent desktop experience.
- Performance: Lighthouse performance score ≥ 90 on mobile (target).
- Accessibility: WCAG 2.1 AA.
- Maximum content width ~1280px, centered.
- Clean, maintainable component architecture.
- No layout shift on load for primary content.
- Cross-browser support for current Chrome, Safari, Firefox, and Edge.

### 13. Technical Recommendations

- Preferred stack: Next.js or equivalent modern React framework.
- Data layer: structured JSON derived from CSV.
- Component system mapped to Clay tokens.
- Comparison state managed client-side with URL persistence for shareability.
- Image and asset optimization required.
- Dark mode implemented via CSS variables or class-based theming.

### 14. Out of Scope

- User accounts or saved comparisons beyond session/share link.
- Real-time data scraping.
- Application submission or tracking.
- Additional programs beyond the six specified.

### 15. Acceptance Criteria Summary

- All six program pages render complete, accurate, sourced content.
- Compare tool correctly handles 2- and 3-program selections with all category toggles.
- Visual implementation matches Clay system specification with no generic patterns.
- Dark mode toggle is present, functional, and persistent on every page.
- Both light and dark modes meet WCAG 2.1 AA contrast requirements.
- All indices and visa ranges are present and linked to methodology.
- Site is fully usable and readable on mobile and desktop.
- Official links and data source indicators are present on every relevant surface.
- Export/share comparison functions as specified.

---

**Attachments required for development:**  
- DESIGN-clay.md  
- Source CSV with base program data  
- Additional researched content as available
