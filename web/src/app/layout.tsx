import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { ProgressProvider } from '@/context/ProgressContext'
import AppShell from '@/components/AppShell'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Banking BA Learning Hub & Career Tracker',
  description: 'Nền tảng học tập và theo dõi lộ trình Business Analyst chuyên sâu cho ngành Ngân Hàng & Fintech (BABOK v3 & Scrum/Agile)',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="vi" className="scroll-smooth">
      <body className={`${inter.className} antialiased bg-slate-50 text-slate-900 min-h-screen`}>
        <ProgressProvider>
          <AppShell>
            {children}
          </AppShell>
        </ProgressProvider>
      </body>
    </html>
  )
}
