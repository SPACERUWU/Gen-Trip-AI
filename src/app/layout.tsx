import './globals.css'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Gen-Trip AI',
  description: 'AI ที่จะช่วยวางแผนทริปเที่ยวให้คุณ',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="th">
      <body>{children}</body>
    </html>
  )
}
