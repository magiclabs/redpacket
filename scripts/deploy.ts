import assert from 'assert'
import {
  CHAINS,
  getPublicClient,
  getWalletClient,
  type NETWORK,
} from 'config/client'
import { run } from 'hardhat'
import { getContract } from 'scripts/fns/getContract'
import { getAddress } from 'viem'
import { mnemonicToAccount } from 'viem/accounts'
import { $ } from 'zx'

const network: NETWORK = 'base'
const file = 'RedPacketFactory.sol'
const contractName = 'RedPacketFactory'

const seedPhrase = process.env.SEED_PHRASE

async function main() {
  // Cleanup
  await $`rm -rf ./artifacts`
  await $`rm -rf ./cache`

  await run('compile')

  const wc = getWalletClient(network)
  const pc = getPublicClient(network)

  assert(seedPhrase, 'No seed phrase found')

  const account = mnemonicToAccount(seedPhrase)
  const address = getAddress(account.address)

  const contract = await getContract({ file, contractName })

  const { abi, bytecode } = contract

  console.log(`Deploying ...`)
  console.log({
    chain: network,
    file,
    contractName,
    address,
  })

  const txHash = await wc.deployContract({
    abi,
    bytecode,
    account,
  })

  const transaction = await pc.waitForTransactionReceipt({ hash: txHash })
  let { contractAddress } = transaction

  if (!contractAddress) {
    throw new Error(`No contract address found for txHash: ${txHash}`)
  }

  contractAddress = getAddress(contractAddress)

  console.log(`Deployed!!`)
  console.log({
    txHash,
    txURL: CHAINS[network].getTxURL(txHash),
    contractAddress,
    contractURL: CHAINS[network].getAccountURL(contractAddress),
  })

  console.log(`Wait 60s for the contract to be mined ...`)

  console.log(`Verifying ...`)

  // await $`nr hardhat verify --contract contracts/${file}:${contractName} --network ${network} ${contractAddress} ${address}`

  await $`rm -rf ./src/contracts`
  await $`cp -rf ./artifacts/contracts ./src/contracts`
}

main().catch((error) => {
  console.error(error)
  process.exitCode = 1
})
