'use client'

import { type Address } from '@alchemy/aa-core'
import Footer from 'components/Footer'
import Login from 'components/Login'
import { useWalletContext } from 'context/wallet'
import RedPacketFactoryContract from 'contracts/RedPacketFactory.json'
import { clientEnv } from 'env/client'
import Image from 'next/image'
import { useCallback, useState } from 'react'
import {
  decodeEventLog,
  encodeFunctionData,
  parseAbiItem,
  parseEther,
  type Hash,
} from 'viem'

export default function DeployPacket() {
  const {
    isLoggedIn,
    scaAddress,
    client: provider,
    publicClient,
    isConnecting,
  } = useWalletContext()
  const [totalClaimCount, setTotalClaimCount] = useState<bigint>(BigInt(0))
  const [totalBalance, setTotalBalance] = useState<bigint>(BigInt(0))
  const [isDeploying, setIsDeploying] = useState<boolean>(false)
  const [deployedRedPacketAddress, setDeployedRedPacketAddress] =
    useState<Address>()

  const onTotalClaimCountChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      e.preventDefault()
      setTotalClaimCount(BigInt(e.target.value))
    },
    [],
  )

  const onTotalBalanceChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      e.preventDefault()
      setTotalBalance(parseEther(e.target.value))
    },
    [],
  )

  async function handleCreateRedPacket() {
    if (!provider) {
      throw new Error('Provider not initialized')
    }
    if (!totalClaimCount || !totalBalance) {
      throw new Error('Please input the required fields')
    }
    publicClient.watchEvent({
      address:
        clientEnv.NEXT_PUBLIC_REDPACKET_CONTRACT_FACTORY_ADDRESS as Address,
      event: parseAbiItem(
        'event RedPacketCreated(address redPacketAddress, address indexed creator, uint256 totalClaimCount, uint256 totalBalance)',
      ),
      args: {
        creator: scaAddress as Address,
      },
      onLogs: (logs) => {
        const topics = decodeEventLog({
          abi: RedPacketFactoryContract.abi,
          data: logs[0].data,
          topics: logs[0].topics,
        })
        console.log(topics)
        //@ts-ignore
        setDeployedRedPacketAddress(topics.args.redPacketAddress)
        //@ts-ignore
        setIsDeploying(false)
      },
    })
    setIsDeploying(true)
    const uoHash = await provider.sendUserOperation({
      target:
        clientEnv.NEXT_PUBLIC_REDPACKET_CONTRACT_FACTORY_ADDRESS as Address,
      data: encodeFunctionData({
        abi: RedPacketFactoryContract.abi,
        functionName: 'createRedPacket',
        args: [totalClaimCount],
      }),
      value: totalBalance,
    })
    console.log(uoHash)
    let txnHash: Hash
    try {
      txnHash = await provider.waitForUserOperationTransaction(uoHash.hash)
      console.log(txnHash)
    } catch (e) {
      setTimeout(() => {
        setIsDeploying(false)
      }, 5000)
      return
    }
  }

  const copyLinkToClipboard = async () => {
    const link = `https://magic-redpacket.vercel.app/${deployedRedPacketAddress}`
    await navigator.clipboard.writeText(link)
  }

  return (
    <div>
      <div className="card bg-base-100 shadow-xl">
        <figure>
          <Image
            src="/red-packet.png"
            width={1424}
            height={832}
            alt="Red Packet"
          />
        </figure>
        <div className="card-body">
          <h1 className="card-title mb-3">🧧 Create a red packet!</h1>
          {isConnecting ? (
            <div>
              <div className="flex w-full flex-col gap-3">
                <div className="skeleton h-3 w-full"></div>
                <div className="skeleton h-3 w-full"></div>
                <div className="skeleton h-3 w-full"></div>
                <div className="skeleton h-12 w-full"></div>
              </div>
            </div>
          ) : (
            <div>
              {isLoggedIn ? (
                <div className="w-full">
                  {deployedRedPacketAddress && (
                    <div role="alert" className="alert mb-3">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        className="stroke-info h-6 w-6 shrink-0"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                        ></path>
                      </svg>
                      <span className="text-xs">
                        Share the link to let your friends claim the red packet!
                      </span>
                      <div>
                        <button
                          onClick={copyLinkToClipboard}
                          className="btn btn-xs btn-primary"
                        >
                          Copy Link
                        </button>
                      </div>
                    </div>
                  )}
                  <label className="form-control w-full">
                    <div className="label">
                      <span className="label-text">How many packets?</span>
                    </div>
                    <input
                      type="number"
                      min="0"
                      className="input input-bordered w-full"
                      placeholder="3"
                      required
                      onChange={onTotalClaimCountChange}
                    />
                  </label>
                  <label className="form-control w-full">
                    <div className="label">
                      <span className="label-text">
                        How much ETH to deposit?
                      </span>
                    </div>
                    <input
                      type="number"
                      step="0.01"
                      min="0"
                      className="input input-bordered w-full"
                      placeholder="0.05"
                      required
                      onChange={onTotalBalanceChange}
                    />
                  </label>
                  {isDeploying ? (
                    <button
                      disabled={true}
                      className="btn btn-primary btn-block btn-lg mt-3"
                    >
                      Creating
                      <span className="loading loading-infinity loading-lg"></span>
                    </button>
                  ) : (
                    <button
                      onClick={handleCreateRedPacket}
                      className="btn btn-primary btn-lg btn-block mt-3"
                    >
                      Create Red Packet
                    </button>
                  )}
                </div>
              ) : (
                <div>
                  <div className="text-md mb-6">
                    You need to be logged in to create a red packet.
                  </div>
                  <Login />
                </div>
              )}
            </div>
          )}
        </div>
      </div>
      <Footer />
    </div>
  )
}
