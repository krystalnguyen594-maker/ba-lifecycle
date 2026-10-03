'use client'

import React, { useState } from 'react'
import Sidebar from '@/components/Sidebar'
import { Menu, CheckCircle2, Unlock, Lock, Network, BookOpen, Layers } from 'lucide-react'
import { useProgress } from '@/context/ProgressContext'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

export default function AppShell({ children }: { children: React.ReactNode }) {
  const [collapsed, setCollapsed] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const pathname = usePathname()
  const { completionPercentage, completedCount, totalLessons, progress, toggleUnlockAllMode } = useProgress()

  // Generate dynamic breadcrumb label
  const getBreadcrumb = () => {
    if (pathname === '/') return 'Bảng Điều Khiển Young Talents'
    if (pathname === '/roadmap') return 'Lộ Trình & Tiến Độ'
    if (pathname === '/matrix') return 'Ma Trận Quan Hệ Kiến Thức'
    if (pathname === '/case-studies') return 'Case Studies VPBank'
    if (pathname.includes('/case-studies/')) return 'Case Studies > Hồ Sơ Sáng Kiến'
    if (pathname === '/quiz') return 'Luyện Đề Logic & Tình Huống'
    if (pathname === '/interview') return 'Phòng Luyện Phỏng Vấn STAR'
    if (pathname.includes('/learn/tier-1/')) return 'Chặng 1: Kỹ Năng & Tư Duy BA'
    if (pathname.includes('/learn/tier-2/')) return 'Chặng 2: Sản Phẩm Số & VPBank Cases'
    if (pathname.includes('/learn/tier-3/')) return 'Chặng 3: Thi Tuyển & Case Study'
    return 'Tài Liệu'
  }

  return (
    <div className="min-h-screen bg-[#F8FAFC] flex font-sans">
      {/* Sidebar Navigation */}
      <Sidebar
        collapsed={collapsed}
        setCollapsed={setCollapsed}
        mobileOpen={mobileOpen}
        setMobileOpen={setMobileOpen}
      />

      {/* Main Content Area */}
      <div
        className={`flex-1 flex flex-col min-w-0 transition-all duration-300 ease-in-out ${
          collapsed ? 'lg:pl-20' : 'lg:pl-76'
        }`}
      >
        {/* Top Header Bar */}
        <header className="sticky top-0 z-30 h-14 bg-white/80 backdrop-blur-md border-b border-slate-200/80 px-4 sm:px-6 flex items-center justify-between shadow-2xs">
          <div className="flex items-center gap-3">
            {/* Mobile Hamburger */}
            <button
              onClick={() => setMobileOpen(true)}
              className="lg:hidden p-1.5 rounded-lg text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition-colors"
            >
              <Menu className="w-5 h-5" />
            </button>

            {/* Breadcrumb Path */}
            <div className="flex items-center gap-2 text-xs">
              <span className="text-slate-400 font-medium">VPBank Talents Hub</span>
              <span className="text-slate-300">/</span>
              <span className="font-semibold text-slate-800">{getBreadcrumb()}</span>
            </div>
          </div>

          {/* Top Right Quick Actions */}
          <div className="flex items-center gap-3">
            <Link
              href="/matrix"
              className="hidden sm:inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-semibold text-emerald-700 bg-emerald-50 border border-emerald-200/80 hover:bg-emerald-100 transition-colors"
            >
              <Network className="w-3.5 h-3.5" />
              <span>Đồ thị quan hệ</span>
            </Link>

            {/* Unlock All Toggle */}
            <button
              onClick={toggleUnlockAllMode}
              className={`text-xs font-semibold px-2.5 py-1 rounded-md border flex items-center gap-1.5 transition-colors ${
                progress.unlockAllMode
                  ? 'bg-amber-50 text-amber-800 border-amber-200 hover:bg-amber-100'
                  : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50'
              }`}
              title="Click để đổi giữa Học tuần tự và Mở khoá toàn bộ"
            >
              {progress.unlockAllMode ? <Unlock className="w-3 h-3 text-amber-600" /> : <Lock className="w-3 h-3 text-slate-400" />}
              <span className="hidden md:inline">{progress.unlockAllMode ? 'Mở khoá tự do' : 'Học tuyến tính'}</span>
            </button>

            {/* Progress Badge */}
            <div className="flex items-center gap-1.5 bg-slate-100 px-2.5 py-1 rounded-full text-xs font-bold text-slate-700">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
              <span>{completionPercentage}%</span>
            </div>
          </div>
        </header>

        {/* Page Content Viewport */}
        <main className="flex-1 pb-16">
          {children}
        </main>

        {/* Minimalist Editorial Footer */}
        <footer className="border-t border-slate-200/70 bg-white py-6 text-center text-xs text-slate-400">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <p className="font-semibold text-slate-600">
              VPBank Young Talents — Digital Business Analyst Fast-Track
            </p>
            <p className="text-[11px] text-slate-400 mt-0.5">
              Hệ thống huấn luyện tư duy phân tích, giải case thực chiến và chinh phục Hội đồng tuyển dụng
            </p>
          </div>
        </footer>
      </div>
    </div>
  )
}
