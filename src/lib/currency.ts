/** Fixed BGN → EUR peg used for eurozone conversion (1 EUR = 1.95583 BGN). */
export const BGN_PER_EUR = 1.95583

export function bgnToEur(bgn: number): number {
  return bgn / BGN_PER_EUR
}
