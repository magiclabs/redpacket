import { type NextConfig } from 'next'

const config: NextConfig = {
  reactStrictMode: true,
  async rewrites() {
    return [
      {
        source: '/api/price/:path*',
        destination: 'https://query1.finance.yahoo.com/v8/finance/chart/:path*',
        basePath: false,
      },
    ]
  },
  webpack: (config) => {
    config.externals.push('pino-pretty', 'lokijs', 'encoding')
    return config
  },
}

export default config
