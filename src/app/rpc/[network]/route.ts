import assert from 'assert'

const ALCHEMY_RPC_BASE_MAINNET = process.env.ALCHEMY_RPC_BASE_MAINNET
const ALCHEMY_RPC_POLYGON_TESTNET = process.env.ALCHEMY_RPC_POLYGON_TESTNET

export async function POST(req: Request) {
  const network = req.url.split('/').pop()!

  assert(ALCHEMY_RPC_BASE_MAINNET, 'ALCHEMY_RPC_BASE_MAINNET is required')
  assert(ALCHEMY_RPC_POLYGON_TESTNET, 'ALCHEMY_RPC_POLYGON_TESTNET is required')

  const RPC_URL =
    network === 'base' ? ALCHEMY_RPC_BASE_MAINNET : ALCHEMY_RPC_POLYGON_TESTNET

  const data = await fetch(RPC_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(await req.json()),
  }).then((r) => r.json())

  return new Response(JSON.stringify(data), {
    status: 200,
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    },
  })
}

export async function OPTIONS() {
  return new Response(null, {
    status: 204,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    },
  })
}
