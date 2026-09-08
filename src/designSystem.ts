export const fontFamily = {
  ui: 'Manrope, ui-sans-serif, system-ui, sans-serif',
  mono: 'DM Mono, ui-monospace, SFMono-Regular, Menlo, monospace',
} as const

export const designTokens = {
  colors: {
    background: '#0B0E0C',
    surface: '#171C19',
    surfaceRaised: '#1E2720',
    border: '#2A332C',
    text: '#F4F7F3',
    textMuted: '#9DA69D',
    primary: '#00C805',
    positive: '#70E875',
    underweight: '#71AEE0',
    overweight: '#DB876D',
    defensive: '#CDB174',
    active: '#8B8EE8',
    diversifier: '#71AEE0',
    satellite: '#DB876D',
  },
  spacing: { xs: 4, sm: 8, md: 12, lg: 16, xl: 20, xxl: 24, xxxl: 32, section: 48 },
  radius: { control: 8, card: 14, sheet: 20, pill: 999 },
  type: {
    display: { fontFamily: 'Manrope', fontSize: 32, fontWeight: 700, lineHeight: 1.08, letterSpacing: -1.28 },
    screenTitle: { fontFamily: 'Manrope', fontSize: 28, fontWeight: 700, lineHeight: 1.12, letterSpacing: -1.12 },
    section: { fontFamily: 'Manrope', fontSize: 20, fontWeight: 700, lineHeight: 1.25 },
    body: { fontFamily: 'Manrope', fontSize: 14, fontWeight: 400, lineHeight: 1.55 },
    label: { fontFamily: 'Manrope', fontSize: 12, fontWeight: 600, lineHeight: 1.3 },
    meta: { fontFamily: 'DM Mono', fontSize: 11, fontWeight: 500, lineHeight: 1.4 },
  },
} as const
