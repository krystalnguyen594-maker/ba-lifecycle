import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Navbar from '@/components/Navbar'
import { ProgressProvider } from '@/context/ProgressContext'

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
      <body className={`${inter.className} antialiased bg-slate-50 text-slate-900 min-h-screen flex flex-col`}>
        <ProgressProvider>
          <Navbar />
          <main className="flex-1 pb-16">
            {children}
          </main>
          <footer className="border-t border-slate-200 bg-white py-8 text-center text-xs text-slate-500">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <p className="font-semibold text-slate-700 mb-1">
                Banking Business Analyst Career Roadmap & Knowledge Hub
              </p>
              <p>Mô hình Docs-as-Code kết hợp BABOK v3, Core Banking & Fintech Domain Mastery</p>
            </div>
          </footer>
        </ProgressProvider>
      </body>
    </html>
  )
}
