import { map, pipe, toArray } from '@fxts/core'
import { createConnector } from '@wagmi/core'
import { type Magic } from 'magic-sdk'
import { getAddress } from 'viem'

type Params = {
  magic: Magic
}

export function createMagicConector({ magic }: Params) {
  type Provider = typeof magic.rpcProvider

  return createConnector<Provider>(() => ({
    icon: 'https://media.licdn.com/dms/image/C4D0BAQG_a0mmkUiPiQ/company-logo_200_200/0/1630561736072/magiclabs_inc_logo?e=2147483647&v=beta&t=HndGi5H8hpQwuLMb6k4rB2km8f88poQGcV8FomNZ0-k',
    id: 'magicConnector',
    name: 'Magic',
    type: 'magic',
    async connect(parameters) {
      const addresses = await magic.wallet.connectWithUI()
      return {
        chainId: parameters?.chainId || 0,
        accounts: pipe(
          addresses,
          map((address) => getAddress(address)),
          toArray,
        ),
      }
    },
    async disconnect() {
      const res = await magic.wallet.disconnect()
      console.log({ res })
    },
    async getProvider() {
      return magic.rpcProvider
    },
    async getAccounts() {
      const provider = await this.getProvider()
      return provider.send('eth_accounts')
    },
    async getChainId() {
      const provider = await this.getProvider()
      return provider.send('eth_chainId')
    },
    async isAuthorized() {
      return magic.user.isLoggedIn()
    },
    onAccountsChanged: () => {},
    onChainChanged: () => {},
    onDisconnect: () => {},
    onMessage: () => {},
  }))
}
