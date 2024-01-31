import { GeistMono } from 'geist/font/mono'
import { GeistSans } from 'geist/font/sans'
import { type Metadata } from 'next'
import { type PropsWithChildren } from 'react'
import './globals.css'

export const metadata: Metadata = {
  title: 'Red Packet',
  description: 'Celebrate Chinese New Year with Red Packet on Base!',
  icons: {
    icon: "data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><text y='.9em' font-size='90'>🧧</text></svg>",
  },
}

type Props = {} & PropsWithChildren<{}>

export default function RootLayout({ children }: Props) {
  return (
    <html
      lang="en"
      className={`${GeistSans.variable} ${GeistMono.variable} h-lvh antialiased`}
    >
      <head></head>
      <body className="h-lvh max-w-full overflow-hidden font-sans">
        {children}
      </body>
    </html>
  )
}
