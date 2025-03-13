import type React from 'react'

import { Inter } from 'next/font/google'
import './globals.css'

import { Navbar } from '@/components/navbar'
import { Providers } from '@/components/providers'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'JSONPlaceholder Explorer',
  description: 'A Next.js app displaying data from JSONPlaceholder',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="es" suppressHydrationWarning>
      <body className={inter.className}>
        <Providers>
          <div className="flex min-h-screen flex-col">
            <Navbar />
            <main className="container mx-auto flex-1 px-4 py-8">
              {children}
            </main>
            <footer className="border-t py-4">
              <div className="container mx-auto text-center text-sm text-muted-foreground">
                &copy; {new Date().getFullYear()} JSONPlaceholder Explorer
              </div>
            </footer>
          </div>
        </Providers>
      </body>
    </html>
  )
}
