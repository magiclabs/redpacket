import { ChainSwitcher } from 'app/ChainSwitcher'
import './globals.css'

import { Analytics } from '@vercel/analytics/react'
import { QueryProvider } from 'components/QueryProvider'
import { Web3ModalProvider } from 'components/Web3Modal'
import { Toaster } from 'components/ui/sonner'
import { URL } from 'config/url'
import { GeistMono } from 'geist/font/mono'
import { GeistSans } from 'geist/font/sans'
import { wagmiConfig } from 'lib/web3modal/config'
import { type Metadata } from 'next'
import { headers } from 'next/headers'
import { type PropsWithChildren } from 'react'
import { cookieToInitialState } from 'wagmi'

const title = `Magic Lunar New Year`
const description = `Happy New Year! Create an invisible wallet and open a red packet to claim your share of 1 ETH.`

export const metadata: Metadata = {
  title,
  description,
  icons: {
    icon: '/Logo.png',
  },
  openGraph: {
    title,
    description,
    images: [
      {
        url: `${URL}/og.png`,
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
      className={`dark ${GeistSans.variable} ${GeistMono.variable} h-lvh antialiased`}
    >
      <head>
        <meta name="msapplication-TileColor" content="#000000" />
        <meta name="msapplication-TileImage" content="/Logo.png" />
        <meta name="theme-color" content="#000000" />
      </head>
      <body className="h-lvh max-w-full overflow-hidden font-sans">
        <Web3ModalProvider initialState={initialState}>
          <QueryProvider>
            <ChainSwitcher>{children}</ChainSwitcher>
          </QueryProvider>
        </Web3ModalProvider>
        <Toaster />
        <Analytics debug={false} />
      </body>
    </html>
  )
}
