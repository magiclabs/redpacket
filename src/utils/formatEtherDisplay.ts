import { formatEther } from 'viem'

export function formatEtherDisplay(ether: bigint): string {
  const formatted = formatEther(ether)

  return formatted
}
