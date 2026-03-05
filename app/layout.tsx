import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import { Playfair_Display } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'

const geistSans = Geist({ subsets: ["latin"], variable: '--font-geist-sans' });
const geistMono = Geist_Mono({ subsets: ["latin"], variable: '--font-geist-mono' });
const playfairDisplay = Playfair_Display({ subsets: ["latin"], variable: '--font-playfair' });

export const metadata: Metadata = {
  title: 'The Real Estate Brokerage Blueprint | UDS Realty Premium Webinar',
  description: 'Join us for an exclusive webinar on how top real estate brokers build and scale their businesses. Premium training by industry experts.',
  icons: {
    icon: [
      {
        url: '/IMG_3048.png',
        media: '(prefers-color-scheme: light)',
      },
      {
        url: '/IMG_3045.png',
        media: '(prefers-color-scheme: dark)',
      },
      // {
      //   url: '/icon.svg',
      //   type: 'image/svg+xml',
      // },
    ],
    apple: '/IMG_3047.png',
  },
  openGraph: {
    title: 'The Real Estate Brokerage Blueprint | UDS Realty',
    description: 'Join us for an exclusive webinar on how top real estate brokers build and scale their businesses.',
    type: 'website',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${playfairDisplay.variable} ${geistSans.variable} ${geistMono.variable} scroll-smooth`}>
      <body className="font-sans antialiased bg-background text-foreground">
        {children}
        <Analytics />
      </body>
    </html>
  )
}
