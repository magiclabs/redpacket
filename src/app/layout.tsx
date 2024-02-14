import './globals.css'

import { Analytics } from '@vercel/analytics/react'
import { DemoByMagic } from 'app/DemoByMagic'
import { WagmiAuth } from 'app/WagmiAuth'
import { QueryProvider } from 'components/QueryProvider'
import { Web3ModalProvider } from 'components/Web3Modal'
import { Toaster } from 'components/ui/sonner'
import { PROD_URL } from 'config/url'
import { GeistMono } from 'geist/font/mono'
import { GeistSans } from 'geist/font/sans'
import { wagmiConfig } from 'lib/web3modal/config'
import { type Metadata } from 'next'
import { headers } from 'next/headers'
import { type PropsWithChildren } from 'react'
import { getBaseURL } from 'utils/getBaseURL'
import { isProd } from 'utils/isProd'
import { cookieToInitialState } from 'wagmi'

const title = `Magic Lunar New Year`
const description = `Happy New Year! Create an invisible wallet and open a red packet to claim your share of 1 ETH.`

export const metadata: Metadata = {
  title,
  description,
  icons: {
    icon: '/favicon.png',
  },
  metadataBase: new URL(getBaseURL()),
  openGraph: {
    title,
    description,
    images: [
      {
        url: `${PROD_URL}/og.png`,
        width: 1280,
        height: 720,
        alt: title,
      },
    ],
  },
}

type Props = {} & PropsWithChildren<{}>

export default function RootLayout({ children }: Props) {
  const initialState = cookieToInitialState(
    wagmiConfig,
    headers().get('cookie'),
  )

  return (
    <html
      lang="en"
      className={`dark ${GeistSans.variable} ${GeistMono.variable} antialiased`}
    >
      <head>
        <meta name="msapplication-TileColor" content="#000000" />
        <meta name="msapplication-TileImage" content="/favicon.png" />
        <meta name="theme-color" content="#000000" />
      </head>
      <body className="bg-[#03010B] font-sans ">
        <Web3ModalProvider initialState={initialState}>
          <QueryProvider>
            <WagmiAuth>
              <main className="relative flex min-h-dvh w-dvw flex-col items-center overflow-x-hidden scrollbar-hide">
                {children}
                <DemoByMagic />
              </main>
            </WagmiAuth>
          </QueryProvider>
        </Web3ModalProvider>
        <Toaster />
        {isProd() && <Analytics debug />}
      </body>
    </html>
  )
}
