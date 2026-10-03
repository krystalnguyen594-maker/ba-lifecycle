'use client'

import React, { useState } from 'react'
import Sidebar from '@/components/Sidebar'
import { Menu, Sparkles, CheckCircle2, Unlock, Lock } from 'lucide-react'
import { useProgress } from '@/context/ProgressContext'
import Link from 'next/link'

export default function AppShell({ children }: { children: React.ReactNode }) {
  const [collapsed, setCollapsed] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const { completionPercentage, completedCount, totalLessons, progress, toggleUnlockAllMode } = useProgress()

  return (
    <div className="min-h-screen bg-slate-50 flex">
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
          collapsed ? 'lg:pl-20' : 'lg:pl-72'
        }`}
      >
        {/* Top Header Bar */}
        <header className="sticky top-0 z-30 h-16 bg-white/90 backdrop-blur-md border-b border-slate-200 px-4 sm:px-6 flex items-center justify-between shadow-xs">
          <div className="flex items-center gap-3">
            {/* Mobile Menu Toggle Button */}
            <button
              onClick={() => setMobileOpen(true)}
              className="lg:hidden p-2 rounded-xl text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition-colors"
            >
              <Menu className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-slate-800 hidden sm:inline">
                Banking BA Learning Hub
              </span>
              <span className="text-slate-300 hidden sm:inline">•</span>
              <span className="text-xs font-semibold text-blue-600 bg-blue-50 px-2 py-0.5 rounded-md">
                Docs-as-Code Monorepo
              </span>
            </div>
          </div>

          {/* Top Right Utilities */}
          <div className="flex items-center gap-3">
            {/* Mode Indicator */}
            <button
              onClick={toggleUnlockAllMode}
              className={`text-xs font-semibold px-2.5 py-1 rounded-lg border flex items-center gap-1.5 transition-colors ${
                progress.unlockAllMode
                  ? 'bg-amber-50 text-amber-800 border-amber-200 hover:bg-amber-100'
                  : 'bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100'
              }`}
              title="Click để đổi giữa Chế độ Mở khóa theo điều kiện và Mở khóa tự do"
            >
              {progress.unlockAllMode ? <Unlock className="w-3.5 h-3.5 text-amber-600" /> : <Lock className="w-3.5 h-3.5 text-blue-600" />}
              <span className="hidden sm:inline">{progress.unlockAllMode ? 'Mở khoá tự do' : 'Khoá tuyến tính'}</span>
            </button>

            {/* Progress Badge */}
            <div className="flex items-center gap-2 bg-slate-100 px-3 py-1 rounded-full text-xs font-bold text-slate-700">
              <CheckCircle2 className="w-4 h-4 text-emerald-500" />
              <span>{completedCount}/{totalLessons} ({completionPercentage}%)</span>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 pb-16">
          {children}
        </main>

        {/* Footer */}
        <footer className="border-t border-slate-200 bg-white py-6 text-center text-xs text-slate-500">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <p className="font-semibold text-slate-700">
              Banking IT Business Analyst Mastery Hub & Career Roadmap
            </p>
            <p className="text-[11px] text-slate-400 mt-1">
              Kiến trúc chuẩn BABOK v3, Core Banking & Fintech Domain Mastery
            </p>
          </div>
        </footer>
      </div>
    </div>
  )
}
