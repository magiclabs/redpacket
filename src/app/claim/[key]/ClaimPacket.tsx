'use client'

import { createLightAccount } from '@alchemy/aa-accounts'
import {
  createAlchemySmartAccountClient,
  createLightAccountAlchemyClient,
} from '@alchemy/aa-alchemy'
import {
  createBundlerClient,
  createSmartAccountClient,
  createSmartAccountClientFromExisting,
  type BatchUserOperationCallData,
  type UserOperationCallData,
} from '@alchemy/aa-core'
import { MagicSigner } from '@alchemy/aa-signers/magic'
import { RedPacket } from 'app/RedPacket'
import { Progress } from 'components/ui/progress'
import { CHAINS } from 'config/client'
import { motion } from 'framer-motion'
import {
  ALCHEMY_GASMANAGER_POLICY_ID,
  ALCHEMY_RPC_URL,
  CURRENT_CHAIN,
  CURRENT_CHAIN_KEY,
  REDPACKET_ABI,
} from 'lib/constants'
import { magic } from 'lib/magic'
import { useParams, useRouter } from 'next/navigation'
import { isProd } from 'utils/isProd'
import { encodeFunctionData, formatEther, http, type Address } from 'viem'

const chain = CURRENT_CHAIN

export function ClaimPacket() {
  const { push } = useRouter()
  const { key } = useParams<{ key: string }>()

  const handleOpen = async () => {
    const owner = new MagicSigner({ inner: magic })

    // const mn = `ball drive scale chat quantum poet youth average start raven raw able`
    // console.log(mn)
    // const owner = LocalAccountSigner.mnemonicToAccountSigner(mn)

    // const client = createAlchemySmartAccountClient({
    //   chain,
    //   rpcUrl: getRpcUrl(),
    // })

    // const client = createBundlerClient({
    //   transport: http(),
    //   chain,
    // })

    const { publicAddress } = await magic.user.getInfo()

    console.log({ publicAddress })

    const auth = await owner.authenticate({
      authenticate: async () => {},
    })

    console.log({ auth })

    const metadata = await owner.getAuthDetails()

    console.log({ metadata })

    if (!metadata.publicAddress || !metadata.email) {
      throw new Error('Magic login failed')
    }

    // const account = toAccoun

    const addr = await owner.getAddress()

    console.log({ addr })

    // const account = await createLightAccountProvider({})

    const account = await createLightAccount({
      chain,
      owner,
      transport: http(ALCHEMY_RPC_URL[CURRENT_CHAIN_KEY]),
    })

    const clien = createAlchemySmartAccountClient({
      chain,
      rpcUrl: ALCHEMY_RPC_URL[CURRENT_CHAIN_KEY],
      // account,
    })

    // const client = createLightAccountClient({
    //   chain,
    //   transport: http(ALCHEMY_RPC_URL[CURRENT_CHAIN_KEY]),
    //   account,
    // })

    // const c = createBundlerClient({
    //   transport: http(ALCHEMY_RPC_URL[CURRENT_CHAIN]),
    //   chain,
    // })

    // createSmartAccountClientFromExisting({
    //   client: c,
    //   paymasterAndData: {
    //     dummyPaymasterAndData,
    //   },
    // })

    const c1 = createSmartAccountClient({
      transport: http(ALCHEMY_RPC_URL[CURRENT_CHAIN_KEY]),
      chain,
      account,
      opts: {
        feeOptions: {
          maxPriorityFeePerGas: {
            min: 1575000000n,
          },
        },
      },
    })

    const initCode = await account.getInitCode()

    console.log({ initCode })

    const cl = await createLightAccountAlchemyClient({
      rpcUrl: ALCHEMY_RPC_URL[CURRENT_CHAIN_KEY],
      owner,
      // useSimulation: true,
      // accountAddress: addr,
      initCode,
      accountAddress: account.address,
      chain,
      // entrypointAddress: getDefaultEntryPointAddress(chain),
      // factoryAddress: getDefaultLightAccountFactoryAddress(chain),
      // useSimulation: true,
      // opts: {
      //   feeOptions: {
      //     preVerificationGas: {
      //       min: 1500000n,
      //     },
      //   },
      // },
      ...(isProd()
        ? {
            gasManagerConfig: {
              policyId: ALCHEMY_GASMANAGER_POLICY_ID,
            },
          }
        : {}),
    })

    const c = createBundlerClient({
      transport: http(ALCHEMY_RPC_URL[CURRENT_CHAIN_KEY]),
      chain,
    })

    const client = createSmartAccountClientFromExisting({
      // @ts-ignore
      client: c,
      account,
    })

    console.log({ client })

    const contractAddress: Address = `0x${key}`

    const uo: UserOperationCallData | BatchUserOperationCallData = {
      target: contractAddress,
      data: encodeFunctionData({
        abi: REDPACKET_ABI,
        functionName: 'claim',
      }),
      // value: 8615874391696200n,
    }

    // const elligibility = await client.checkGasSponsorshipEligibility({
    //   uo,
    //   account: client.account,
    // })

    // console.log({ elligibility })

    const { hash, request } = await client.sendUserOperation({
      uo,
    })

    // const { hash, request } = await c.sendUserOperation({
    //   uo,
    //   account,
    // })

    console.log({ hash, request })

    const tx = await client.waitForUserOperationTransaction({ hash })

    console.log(CHAINS[CURRENT_CHAIN_KEY].getTxURL(tx))

    console.table([
      {
        name: 'account',
        address: client.getAddress(),
        balance: formatEther(
          await client.getBalance({ address: client.getAddress() }),
        ),
      },
      {
        name: 'publicAddress',
        address: publicAddress,
        balance: formatEther(
          await client.getBalance({ address: publicAddress as Address }),
        ),
      },
      {
        name: `contractAddress`,
        address: contractAddress,
        balance: formatEther(
          await client.getBalance({ address: contractAddress }),
        ),
      },
    ])

    await push(`/claim/${key}/result`)
  }

  return (
    <>
      <div className="z-10 flex flex-1 flex-col items-center justify-center">
        <div
          role="button"
          className="relative z-50 cursor-pointer transition-all duration-300 ease-in-out hover:translate-y-[-8px] hover:transform"
          onClick={handleOpen}
        >
          <RedPacket
            className="rotate-0 md:h-[480px] md:w-[480px]"
            initial={{ scale: 0.55, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.7 }}
          />

          <motion.div
            className="pointer-events-none absolute left-1/2 top-1/2 inline-flex h-14 shrink-0 -translate-x-1/2 -translate-y-1/2 transform items-center justify-center rounded-xl border border-solid border-[rgba(255,255,255,0.20)] px-10 py-[19px] shadow-[0px_2px_4px_0px_rgba(0,0,0,0.14),0px_6px_44px_8px_rgba(0,0,0,0.28)] backdrop-blur [background:rgba(255,255,255,0.08)]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.9, ease: 'easeInOut' }}
          >
            <span>Open</span>
          </motion.div>
        </div>

        <motion.div
          className="mt-[15px] flex w-full flex-col items-center px-5 sm:px-0"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.9, ease: 'easeInOut' }}
        >
          <span className="self-stretch text-center text-xs font-semibold leading-normal tracking-[3px] text-white opacity-50">
            FEELING LUCKY?
          </span>

          <div className="mt-2 text-white">
            <span className="font-mono font-medium leading-normal tracking-[-0.408px]">
              {Number(1).toFixed(5)} ETH
            </span>
            <span className="opacity-70">{` / 1 ETH up for grabs`}</span>
          </div>

          <Progress
            value={100}
            className="mt-[19px] w-full"
            style={{
              background: 'linear-gradient(90deg, #DF0005 0%, #FF3C40 100%)',
              boxShadow: '0px 3px 10px 2px rgba(255, 52, 52, 0.30)',
            }}
          />
        </motion.div>
      </div>
    </>
  )
}
