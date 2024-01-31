import { readFile } from 'fs/promises'
import { type Abi } from 'viem'

type Params = {
  file: string
  contractName: string
}

export const getContract = async ({
  file,
  contractName,
}: Params): Promise<Contract> => {
  try {
    const dir = `./artifacts/contracts/${file}/${contractName}.json`
    const f = await readFile(dir, 'utf8')
    const json = JSON.parse(f)

    return json! as Contract
  } catch (e) {
    console.log(`e`, e)
    throw new Error(`Contract is not found`)
  }
}

interface Contract {
  _format: string
  contractName: string
  sourceName: string
  abi: Abi
  bytecode: `0x${string}`
  deployedBytecode: `0x${string}`
}
