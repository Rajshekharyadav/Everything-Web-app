import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import Layout from '@/components/layout/Layout'
import { ThemeProvider } from '@/components/providers/ThemeProvider'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Everything - Book & Order Everything',
  description: 'Your one-stop destination for booking travel, entertainment, food, shopping, and healthcare services.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.className} bg-white dark:bg-gray-900 transition-colors duration-300`}>
        <ThemeProvider>
          <Layout>{children}</Layout>
        </ThemeProvider>
      </body>
    </html>
  )
}
