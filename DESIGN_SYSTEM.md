# Portfolio OS Mobile Design System

Reusable visual language for a calm, architecture-first portfolio management app.

## Design principles

- Structure before securities.
- Contributions before selling.
- Calm, clear, non-urgent language.
- Use color to communicate portfolio architecture, not market excitement.
- Prefer generous spacing and readable type over dense dashboards.
- No live-price theater: label manual snapshots clearly.

## Typography

### Font families

Use only these two families:

- **Manrope** — primary UI family. Use for headings, body copy, navigation, buttons, values, forms, and explanations.
- **DM Mono** — metadata family. Use for dates, percentages, timestamps, currency rates, caps labels, and calculation details.

Do not use Inter or introduce a third typeface.

### Type scale

| Style | Size | Weight | Line height | Use |
|---|---:|---:|---:|---|
| Display | 32px | 700 | 1.08 | Main screen headline |
| Screen title | 28px | 700 | 1.12 | Page and modal titles |
| Section title | 20px | 700 | 1.25 | Card and section headings |
| Card title | 16px | 700 | 1.3 | Holding, sleeve, and review titles |
| Body large | 16px | 400 | 1.55 | Important explanations |
| Body | 14px | 400 | 1.55 | Standard UI copy |
| Label | 12px | 600 | 1.3 | Buttons and controls |
| Meta | 11px | 500 | 1.4 | Secondary details |
| Mono label | 10px | 500 | 1.35 | Dates, percentages, system labels |

### Text treatment

- Use `letter-spacing: -0.04em` for Display and Screen title.
- Use normal tracking for body copy.
- Use `letter-spacing: 0.08em` and uppercase for Mono labels.
- Keep paragraphs between 45 and 70 characters per line where possible.
- Never communicate urgency with oversized red text or flashing treatment.

## Color tokens

### Dark theme — default

```ts
export const colors = {
  background: '#0B0E0C',
  surface: '#171C19',
  surfaceRaised: '#1E2720',
  surfaceSubtle: '#101411',
  border: '#2A332C',
  borderStrong: '#3A473B',
  text: '#F4F7F3',
  textMuted: '#9DA69D',
  textSubtle: '#6F7A70',
  primary: '#00C805',
  primaryPressed: '#16DF1D',
  positive: '#70E875',
  underweight: '#71AEE0',
  overweight: '#DB876D',
  defensive: '#CDB174',
  active: '#8B8EE8',
  diversifier: '#71AEE0',
  satellite: '#DB876D',
} as const;
```

### Optional light theme

```ts
export const lightColors = {
  background: '#F7F6F2',
  surface: '#FFFEFA',
  surfaceRaised: '#EDECE3',
  surfaceSubtle: '#F1F0E9',
  border: '#E7E5DE',
  borderStrong: '#CBCBBF',
  text: '#252722',
  textMuted: '#777971',
  textSubtle: '#999B94',
  primary: '#2B3029',
  primaryPressed: '#44483E',
  positive: '#67816A',
  underweight: '#6D8BA0',
  overweight: '#B0725F',
  defensive: '#AF9561',
  active: '#686AA9',
  diversifier: '#5D87A9',
  satellite: '#BD765B',
} as const;
```

## Portfolio architecture colors

| Sleeve | Dark token | Meaning |
|---|---|---|
| Core | `#55775B` | Long-term compounding foundation |
| Active | `#8B8EE8` | Manager or concentration risk |
| Diversifier | `#71AEE0` | Exposure missing elsewhere |
| Satellite | `#DB876D` | Small intentional themes |
| Defensive | `#CDB174` | Stability and optionality |
| Legacy | `#8C948C` | Positions without an active job |

## Spacing

Use a 4px base unit.

```ts
export const spacing = {
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 20,
  '2xl': 24,
  '3xl': 32,
  '4xl': 40,
  section: 48,
} as const;
```

Mobile screens should use 16px horizontal page padding. Use 20–24px inside cards. Reserve 32–48px gaps for major sections.

## Shape and elevation

- Screen cards: 14px radius.
- Small controls: 8px radius.
- Pills: 999px radius.
- Bottom sheets: 20px top radius.
- Avoid heavy shadows. Use surface contrast and borders first.
- Use one-pixel borders for grouping related information.

## Component rules

### Primary button

- Height: 44px minimum.
- Horizontal padding: 16px.
- Radius: 8px.
- Manrope 12px / 700.
- Dark theme uses primary green; light theme uses dark ink.
- Copy should describe an action: `Deploy new money`, `Save review`, `Add holding`.

### Cards

Use a clear title, one supporting sentence, and one action at most. Avoid putting more than one major decision inside a card.

### Portfolio value

- Use Manrope 48–58px / 700.
- Use a smaller DM Mono line underneath for invested value, gain/loss, and update date.
- Always label whether prices are manual, delayed, or live.

### Status

Use plain language:

- `Underweight`
- `Within range`
- `Overweight`
- `No target set`
- `Review required`

Do not use color alone. Pair color with text.

### Tables on mobile

Convert tables into cards. Keep the order:

1. Holding name and ticker
2. Sleeve/job
3. Current value
4. Current vs target

Avoid horizontal scrolling for normal portfolio review.

### Deployment planner

Always present two stages:

1. Sleeve allocation
2. Holding allocation inside each funded sleeve

Show the currency switcher beside the amount field. Show the conversion rate and its timestamp/source below the field.

## Copy voice

Use calm, neutral language:

- `Consider directing future contributions here`
- `Already above target`
- `No action required`
- `Review allocation`
- `This is a planning calculation, not an instruction to buy or sell.`

Avoid:

- `Buy now`
- `Hot stock`
- `Winning trade`
- `Crush the market`
- `Guaranteed`

## Accessibility baseline

- Minimum touch target: 44 × 44px.
- Body text: never smaller than 14px in normal reading surfaces.
- Mono labels may be 10–11px only when paired with a clear adjacent value.
- Maintain a visible focus state using a 2px primary-colored outline.
- Never encode underweight, overweight, or warning states by color alone.
- Support Dynamic Type / font scaling on mobile.

## Mobile navigation

Use five destinations:

- Home
- Portfolio
- Deploy
- Review
- More

Deploy is the emphasized center action. It should be visually prominent without using urgent language.
