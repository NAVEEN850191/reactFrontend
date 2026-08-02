import type { Metadata } from 'next'
import Link from "next/link";
import './globals.css'
import { Inter } from 'next/font/google'
//serverComponent, fileBasedRouting, appDirectory
// useState,useClient
// generateMetadata
// nextImage, nextFont
const inter = Inter({
  subsets: ['latin'],
})

export const metadata: Metadata = {
  title: 'Next.js App Router Project',
  description: 'Complete challenges to build your Next.js skills',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <nav>
          <Link href="/">Home</Link>
          <Link href="/about">About</Link>
        </nav>

        {children}
      </body>
    </html>
  )
}