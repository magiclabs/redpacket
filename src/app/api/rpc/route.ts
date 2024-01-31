import { serverEnv } from 'env/server.mjs'
import { NextResponse } from 'next/server'

export async function POST(req: Request) {
  const res = await fetch(serverEnv.ALCHEMY_RPC_URL_BASE, {
    method: 'POST',
    headers: {
      ...req.headers,
    },
    body: JSON.stringify(await req.json()),
  })

  return NextResponse.json(await res.json())
}
