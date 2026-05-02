import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import { HeaderCMS } from '@/components/cms/header-cms'
import { FooterCMS } from '@/components/cms/footer-cms'
import './globals.css'

const inter = Inter({ 
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: {
    template: '%s | EGO Agricultural Export',
    default: 'EGO - Agricultural Supply & Export from Vietnam',
  },
  description: 'EGO is your trusted partner in Vietnamese agricultural exports. With 25+ years of experience, we supply premium rice, coffee, mango, and cassava to global markets with guaranteed quality and international certifications.',
  generator: 'v0.app',
  keywords: ['Vietnamese agricultural export', 'rice export Vietnam', 'coffee export', 'mango export', 'cassava export', 'agricultural products', 'organic certified', 'fair trade'],
  icons: {
    icon: [
      {
        url: '/icon-light-32x32.png',
        media: '(prefers-color-scheme: light)',
      },
      {
        url: '/icon-dark-32x32.png',
        media: '(prefers-color-scheme: dark)',
      },
      {
        url: '/icon.svg',
        type: 'image/svg+xml',
      },
    ],
    apple: '/apple-icon.png',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${inter.variable} font-sans antialiased bg-background`}>
        <HeaderCMS />
        {children}
        <FooterCMS />
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
