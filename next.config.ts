import assert from 'assert'
import { type NextConfig } from 'next'

const ALCHEMY_RPC_BASE_MAINNET = process.env.ALCHEMY_RPC_BASE_MAINNET
const ALCHEMY_RPC_POLYGON_TESTNET = process.env.ALCHEMY_RPC_POLYGON_TESTNET

assert(ALCHEMY_RPC_BASE_MAINNET, 'ALCHEMY_RPC_BASE_MAINNET is required')
assert(ALCHEMY_RPC_POLYGON_TESTNET, 'ALCHEMY_RPC_POLYGON_TESTNET is required')

const config: NextConfig = {
  reactStrictMode: true,
  async rewrites() {
    return [
      {
        source: '/api/price/:path*',
        destination: 'https://query1.finance.yahoo.com/v8/finance/chart/:path*',
        basePath: false,
      },
      {
        source: '/rpc/base',
        destination: ALCHEMY_RPC_BASE_MAINNET,
        basePath: false,
      },
      {
        source: '/rpc/mumbai',
        destination: ALCHEMY_RPC_POLYGON_TESTNET,
        basePath: false,
      },
    ]
  },
  webpack: (config, { nextRuntime }) => {
    if (typeof nextRuntime === 'undefined') {
      config.resolve.fallback = {
        ...config.resolve.fallback,
        fs: false,
        net: false,
        tls: false,
      }
    }

    config.externals.push('pino-pretty', 'lokijs', 'encoding')
    return config
  },
  compiler: {
    removeConsole: true,
  },
}

export default config
