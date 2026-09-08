export type SleeveValue = { id: string; targetWeight: number; value: number }
export type HoldingTarget = { id: string; sleeveId: string; targetWeightInSleeve: number; value: number }

export const safePercent = (value: number, total: number) => total > 0 && Number.isFinite(value) ? value / total * 100 : 0
export const effectivePortfolioTarget = (sleeveTarget: number, holdingTargetInSleeve: number) => sleeveTarget * holdingTargetInSleeve / 100
export const effectiveTargetValue = (portfolioValue: number, sleeveTarget: number, holdingTargetInSleeve: number) => portfolioValue * effectivePortfolioTarget(sleeveTarget, holdingTargetInSleeve) / 100
export const sleeveCurrentPercent = (sleeveValue: number, portfolioValue: number) => safePercent(sleeveValue, portfolioValue)
export const sleeveDrift = (sleeveValue: number, portfolioValue: number, target: number) => sleeveCurrentPercent(sleeveValue, portfolioValue) - target
export const holdingCurrentSleevePercent = (holdingValue: number, sleeveValue: number) => safePercent(holdingValue, sleeveValue)
export const isWithinTolerance = (drift: number, tolerance: number) => Math.abs(drift) <= Math.max(0, tolerance)

/** Contribution-first allocation: only positive deficits receive fresh money. */
export function allocateContribution(amount: number, portfolioValue: number, sleeves: SleeveValue[]) {
  const cleanAmount = Math.max(0, Number.isFinite(amount) ? amount : 0)
  const deficits = sleeves.map(sleeve => ({ ...sleeve, deficit: Math.max(0, (portfolioValue + cleanAmount) * sleeve.targetWeight / 100 - sleeve.value) }))
  const totalDeficit = deficits.reduce((sum, sleeve) => sum + sleeve.deficit, 0)
  return deficits.map(sleeve => ({ id: sleeve.id, amount: totalDeficit > 0 ? cleanAmount * sleeve.deficit / totalDeficit : 0, deficit: sleeve.deficit }))
}
