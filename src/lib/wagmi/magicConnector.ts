import { map, pipe, toArray } from '@fxts/core'
import { createConnector } from '@wagmi/core'
import { type Magic } from 'magic-sdk'
import { getAddress, type Address } from 'viem'

type Params = {
  magic: Magic
  login?: () => Promise<string | null>
}

export function createMagicConector({ magic, login }: Params) {
  type Provider = typeof magic.rpcProvider

  return createConnector<Provider>(() => ({
    icon: 'https://media.licdn.com/dms/image/C4D0BAQG_a0mmkUiPiQ/company-logo_200_200/0/1630561736072/magiclabs_inc_logo?e=2147483647&v=beta&t=HndGi5H8hpQwuLMb6k4rB2km8f88poQGcV8FomNZ0-k',
    id: 'magicConnector',
    name: 'Magic',
    type: 'magic',

    async connect({ chainId: input } = {}) {
      const didToken = login
        ? await login()
        : await magic.wallet.connectWithUI()
      if (!didToken) {
        throw new Error('Failed to login with Magic.')
      }

      const accounts = await this.getAccounts()
      const chainId = await this.getChainId()

      return {
        chainId,
        accounts,
      }
    },
    async disconnect() {
      await magic.wallet.disconnect()
    },
    async getProvider() {
      return magic?.rpcProvider
    },
    async getAccounts() {
      const provider = await this.getProvider()
      const accounts = await provider.send<Address[]>('eth_accounts')

      return pipe(
        accounts,
        map((address) => getAddress(address)),
        toArray,
      )
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
