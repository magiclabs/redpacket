import './globals.css'

import { Analytics } from '@vercel/analytics/react'
import { QueryProvider } from 'components/QueryProvider'
import { Web3ModalProvider } from 'components/Web3Modal'
import { Toaster } from 'components/ui/sonner'
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
    icon: '/apple-icon.png',
  },
  openGraph: {
    title,
    description,
    images: [
      {
        url: '/og.png',
        width: 1280,
        height: 720,
        alt: 'Red Packet',
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
        <link
          rel="apple-touch-icon"
          sizes="57x57"
          href="/apple-icon-57x57.png"
        />
        <link
          rel="apple-touch-icon"
          sizes="60x60"
          href="/apple-icon-60x60.png"
        />
        <link
          rel="apple-touch-icon"
          sizes="72x72"
          href="/apple-icon-72x72.png"
        />
        <link
          rel="apple-touch-icon"
          sizes="76x76"
          href="/apple-icon-76x76.png"
        />
        <link
          rel="apple-touch-icon"
          sizes="114x114"
          href="/apple-icon-114x114.png"
        />
        <link
          rel="apple-touch-icon"
          sizes="120x120"
          href="/apple-icon-120x120.png"
        />
        <link
          rel="apple-touch-icon"
          sizes="144x144"
          href="/apple-icon-144x144.png"
        />
        <link
          rel="apple-touch-icon"
          sizes="152x152"
          href="/apple-icon-152x152.png"
        />
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/apple-icon-180x180.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="192x192"
          href="/android-icon-192x192.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="96x96"
          href="/favicon-96x96.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/favicon-16x16.png"
        />
        <link rel="manifest" href="/manifest.json" />
        <meta name="msapplication-TileColor" content="#ffffff" />
        <meta name="msapplication-TileImage" content="/ms-icon-144x144.png" />
        <meta name="theme-color" content="#ffffff" />
      </head>
      <body className="h-lvh max-w-full overflow-hidden font-sans">
        <Web3ModalProvider initialState={initialState}>
          <QueryProvider>{children}</QueryProvider>
        </Web3ModalProvider>
        <Toaster />
        <Analytics />
      </body>
    </html>
  )
}
