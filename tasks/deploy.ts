import fs from 'fs'
import { task, vars } from 'hardhat/config'
import path from 'path'
import { formatEther, parseEther } from 'viem'

const getContractData = (contractName: string) => {
  try {
    const dir = path.resolve(
      __dirname,
      `../artifacts/contracts/${contractName}.sol/${contractName}.json`,
    )
    const file = fs.readFileSync(dir, 'utf8')
    const json = JSON.parse(file)
    const abi = json.abi
    const bytecode = json.bytecode

    return {
      abi,
      bytecode,
    }
  } catch (e) {
    console.log(`e`, e)
  }
}

const saveContractDataFile = (contractName: string) => {
  const contractsDir = path.join(__dirname, '..', 'client', 'src', 'contracts')

  if (!fs.existsSync(contractsDir)) {
    fs.mkdirSync(contractsDir)
  }

  fs.writeFileSync(
    path.join(contractsDir, `${contractName}.json`),
    JSON.stringify(getContractData(contractName), null, 2),
  )
}

// npx hardhat deploy --count 3 --balance 10 --network localhost
// npx hardhat deploy --count 3 --balance 0.01 --network base
task('deploy', 'Deploy a RedPacket contract with custom parameters')
  .addParam('count', 'The total number of users who can claim the packet')
  .addParam('balance', 'The total amount of ETH in the packet')
  .setAction(async (taskArgs, hre) => {
    // This is just a convenience check
    if (hre.network.name === 'hardhat') {
      console.warn(
        'You are trying to deploy a contract to the Hardhat Network, which' +
          'gets automatically created and destroyed every time. Use the Hardhat' +
          " option '--network localhost'",
      )
    }

    const count = taskArgs.count
    const balance = parseEther(taskArgs.balance.toString())
    const creatorAddress = vars.get('PUBLIC_KEY_BASE')

    const packet = await hre.viem.deployContract(
      'RedPacket',
      [count, creatorAddress],
      {
        value: balance,
      },
    )

    saveContractDataFile('RedPacket')

    console.log(
      `RedPacket with ${formatEther(
        balance,
      )} ETH and ${count} users deployed to ${packet.address}`,
    )
  })

// npx hardhat deployFactory --network base
task('deployFactory', 'Deploy a RedPacket contract factory').setAction(
  async (taskArgs, hre) => {
    // This is just a convenience check
    if (hre.network.name === 'hardhat') {
      console.warn(
        'You are trying to deploy a contract to the Hardhat Network, which' +
          'gets automatically created and destroyed every time. Use the Hardhat' +
          " option '--network localhost'",
      )
    }

    const factory = await hre.viem.deployContract('RedPacketFactory')

    saveContractDataFile('RedPacketFactory')

    console.log(`RedPacketFactory deployed to ${factory.address}`)
  },
)
