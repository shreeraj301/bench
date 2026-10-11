# Accessibility Requirements
## WCAG 2.1 AA — HCI Programs Platform

### Contrast Ratios

| Element | Minimum Ratio | Notes |
|---------|---------------|-------|
| Normal text (<18pt or <14pt bold) | 4.5:1 | Body copy, most UI labels |
| Large text (≥18pt or ≥14pt bold) | 3:1 | Display headlines, large buttons |
| UI components & graphics | 3:1 | Buttons, borders, icons, focus rings, chart elements |
| Inactive/disabled controls | None | Exempt |

### Implementation Rules
- Verify every text/background pair in both light and dark modes.
- Saturated feature cards (pink, teal, lavender, peach, ochre) require explicit contrast checks for text placed on them.
- Dark mode warm canvas (#0a1a1a or equivalent) must pair with off-white text that clears 4.5:1.
- Focus indicators must be visible at 3:1 against adjacent colors.
- Do not use color alone to convey index scores or status.
- Test with actual rendered colors using WebAIM Contrast Checker or equivalent.

### Dark Mode Specifics
- Maintain brand card colors where possible but adjust brightness or add overlays if contrast fails.
- Ensure hairlines, dividers, and comparison borders remain perceptible.
- Preference toggle must itself meet contrast and be keyboard accessible.
