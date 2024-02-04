'use client'

import { type createLightAccountAlchemyClient } from '@alchemy/aa-alchemy'
import { type Address } from '@alchemy/aa-core'
import { useAlchemyProvider } from 'hooks/useAlchemyProvider'
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from 'react'
import { createMagicSigner } from 'signer/createMagicSigner'
import {
  createPublicClient,
  createWalletClient,
  custom,
  type PublicClient,
  type WalletClient,
} from 'viem'

type WalletContextProps = {
  // Functions
  login: (email: string) => Promise<void>
  logout: () => Promise<void>

  // Properties
  client: Awaited<ReturnType<typeof createLightAccountAlchemyClient>>
  ownerAddress?: Address
  scaAddress?: Address
  username?: string
  isLoggedIn: boolean
  userBalance: bigint
  walletClient: WalletClient
  publicClient: PublicClient
  isConnecting: boolean
}

const defaultUnset: any = null
const WalletContext = createContext<WalletContextProps>({
  // Default Values
  client: defaultUnset,
  login: () => Promise.resolve(),
  logout: () => Promise.resolve(),
  isLoggedIn: defaultUnset,
  userBalance: BigInt(0),
  walletClient: defaultUnset,
  publicClient: defaultUnset,
  isConnecting: true,
})

export const useWalletContext = () => useContext(WalletContext)

export const WalletContextProvider = ({
  children,
}: {
  children: ReactNode
}) => {
  const [ownerAddress, setOwnerAddress] = useState<Address>()
  const [scaAddress, setScaAddress] = useState<Address>()
  const [username, setUsername] = useState<string>()
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false)
  const [userBalance, setUserBalance] = useState<bigint>(BigInt(0))
  const [walletClient, setWalletClient] = useState<WalletClient>(defaultUnset)
  const [publicClient, setPublicClient] = useState<PublicClient>(defaultUnset)
  const [isConnecting, setIsConnecting] = useState<boolean>(true)

  const [magicSigner] = useState(() => createMagicSigner())
  const { client, connectedClient, connectClientToAccount } =
    useAlchemyProvider()

  const login = useCallback(
    async (email: string) => {
      const signer = await magicSigner

      if (signer == null) {
        throw new Error('Magic not initialized')
      }

      await signer.authenticate({
        authenticate: async () => {
          await signer.inner.auth.loginWithEmailOTP({
            email,
          })
        },
      })

      const metadata = await signer.getAuthDetails()
      if (!metadata.publicAddress || !metadata.email) {
        throw new Error('Magic login failed')
      }

      setIsLoggedIn(true)
      connectClientToAccount(signer)
      setUsername(metadata.email)
      setOwnerAddress(metadata.publicAddress as Address)
      setScaAddress(connectedClient.account?.address)
    },
    [connectClientToAccount, magicSigner, client],
  )

  const logout = useCallback(async () => {
    const signer = await magicSigner

    if (!signer) {
      throw new Error('Magic not initialized')
    }

    if (!(await signer.inner.user.logout())) {
      throw new Error('Magic logout failed')
    }

    setIsLoggedIn(false)
    setUsername(undefined)
    setOwnerAddress(undefined)
    setScaAddress(undefined)
  }, [magicSigner])

  useEffect(() => {
    async function fetchData() {
      const signer = await magicSigner

      if (signer == null) {
        throw new Error('Magic not initialized')
      }

      const isLoggedIn = await signer.inner.user.isLoggedIn()

      if (client && isLoggedIn) {
        await signer.authenticate({
          authenticate: async () => {},
        })

        const metadata = await signer.getAuthDetails()
        if (!metadata.publicAddress || !metadata.email) {
          throw new Error('Magic login failed')
        }

        if (scaAddress) {
          const _userBalance = await connectedClient.getBalance({
            address: scaAddress as Address,
          })
          setUserBalance(_userBalance)
        }

        setIsLoggedIn(isLoggedIn)
        connectClientToAccount(signer)
        setUsername(metadata.email)
        setOwnerAddress(metadata.publicAddress as Address)
        setScaAddress(connectedClient.account?.address)

        const _walletClient = createWalletClient({
          chain: connectedClient.chain,
          transport: custom(connectedClient.transport),
        })
        setWalletClient(_walletClient)
        const _publicClient = createPublicClient({
          chain: connectedClient.chain,
          transport: custom(connectedClient.transport),
        })
        setPublicClient(_publicClient)
      }

      setIsConnecting(false)
    }
    fetchData()
  }, [connectClientToAccount, magicSigner, client, scaAddress, isConnecting])

  return (
    <WalletContext.Provider
      value={{
        login,
        logout,
        isLoggedIn,
        client: connectedClient,
        ownerAddress,
        scaAddress,
        username,
        userBalance,
        walletClient,
        publicClient,
        isConnecting,
      }}
    >
      {children}
    </WalletContext.Provider>
  )
}
