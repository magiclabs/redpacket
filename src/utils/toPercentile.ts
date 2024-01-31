export function toPercentile(num1: bigint, num2: bigint) {
  return num1 === 0n ? 0 : (Number(num1) / Number(num2)) * 100
}
