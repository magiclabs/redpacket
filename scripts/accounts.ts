import hre from 'hardhat'
import { formatEther, getAddress } from 'viem'

async function main() {
  const [creator, user1, user2, user3] = await hre.viem.getWalletClients()
  const users = [creator, user1, user2, user3]
  const publicClient = await hre.viem.getPublicClient()

  for (const user of users) {
    const address = getAddress(user.account.address)
    const balance = await publicClient.getBalance({
      address: address,
    })
    console.log(`${address}: ${formatEther(balance)} ETH`)
  }
}

main().catch((error) => {
  console.error(error)
  process.exitCode = 1
})
