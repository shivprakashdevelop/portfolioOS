/**
 * Portfolio OS design tokens.
 *
 * Platform-neutral values intended to be reused in a React Native or mobile
 * app. Keep semantic tokens in components; use raw palette values sparingly.
 */
export const colors = {
  background: '#0b0e0c',
  surface: '#171c19',
  surfaceElevated: '#1d2520',
  surfaceMuted: '#101511',
  border: '#2a332c',
  borderStrong: '#3a473b',
  textPrimary: '#f4f7f3',
  textSecondary: '#9da69d',
  textMuted: '#707b71',
  brand: '#00c805',
  brandPressed: '#16df1d',
  brandText: '#061006',
  positive: '#70e875',
  negative: '#e09a7f',
  information: '#71aee0',
  active: '#8b8ee8',
  satellite: '#db876d',
  defensive: '#cdb174',
  white: '#ffffff',
} as const

export const typography = {
  family: {
    sans: 'Manrope',
    mono: 'DM Mono',
  },
  display: { fontSize: 34, lineHeight: 1.1, fontWeight: '700', letterSpacing: -1.8 },
  screenTitle: { fontSize: 30, lineHeight: 1.15, fontWeight: '700', letterSpacing: -1.2 },
  sectionTitle: { fontSize: 23, lineHeight: 1.2, fontWeight: '700', letterSpacing: -0.7 },
  cardTitle: { fontSize: 19, lineHeight: 1.25, fontWeight: '700', letterSpacing: -0.4 },
  body: { fontSize: 15, lineHeight: 1.5, fontWeight: '400', letterSpacing: 0 },
  bodySmall: { fontSize: 12, lineHeight: 1.45, fontWeight: '400', letterSpacing: 0 },
  label: { fontSize: 11, lineHeight: 1.2, fontWeight: '500', letterSpacing: 1.1, textTransform: 'uppercase' as const },
  mono: { fontSize: 10, lineHeight: 1.3, fontWeight: '500', letterSpacing: 0.4 },
  portfolioValue: { fontSize: 58, lineHeight: 1, fontWeight: '700', letterSpacing: -4 },
} as const

export const spacing = {
  xxs: 4,
  xs: 8,
  sm: 12,
  md: 16,
  lg: 20,
  xl: 24,
  xxl: 32,
  section: 48,
  screen: 20,
} as const

export const radii = {
  sm: 6,
  md: 8,
  lg: 12,
  card: 13,
  pill: 999,
} as const

export const touch = {
  minimum: 44,
  comfortable: 48,
} as const

export const sleeves = {
  core: colors.positive,
  active: colors.active,
  diversifier: colors.information,
  satellite: colors.satellite,
  defensive: colors.defensive,
} as const

export const semantic = {
  screen: { background: colors.background, text: colors.textPrimary },
  card: { background: colors.surface, border: colors.border },
  input: { background: colors.surfaceMuted, border: colors.borderStrong, text: colors.textPrimary },
  primaryAction: { background: colors.brand, pressed: colors.brandPressed, text: colors.brandText },
  secondaryAction: { background: colors.surfaceElevated, border: colors.borderStrong, text: colors.textPrimary },
  success: { text: colors.positive, background: '#18351c' },
  warning: { text: colors.negative, background: '#2c211d' },
} as const

export type SleeveKey = keyof typeof sleeves
export type ThemeColors = typeof colors
