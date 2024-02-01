import { useSharedState } from 'hooks/useSharedState'

export const WALLET_TYPE = {
  MAGIC: 'magic',
  WEB3: 'web3',
} as const

export function useWalletType() {
  return useSharedState<string>(['walletType'], '')
}
