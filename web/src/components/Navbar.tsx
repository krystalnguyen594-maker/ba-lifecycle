'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { 
  Compass, 
  BookOpen, 
  Layers, 
  HelpCircle, 
  Award, 
  Menu, 
  X,
  CheckCircle2,
  Sparkles
} from 'lucide-react'
import { useProgress } from '@/context/ProgressContext'

export default function Navbar() {
  const pathname = usePathname()
  const { completionPercentage, completedCount, totalLessons } = useProgress()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const navLinks = [
    { href: '/', label: 'Dashboard', icon: Compass },
    { href: '/roadmap', label: 'Lộ Trình & Checklist', icon: Layers },
    { href: '/case-studies', label: 'Case Studies Ngân Hàng', icon: BookOpen },
    { href: '/quiz', label: 'Trắc Nghiệm Kiến Thức', icon: HelpCircle },
    { href: '/interview', label: 'Luyện Phỏng Vấn', icon: Award },
  ]

  return (
    <header className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-slate-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo & Brand */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-blue-600 via-indigo-600 to-sky-500 flex items-center justify-center text-white shadow-md shadow-blue-500/20 group-hover:scale-105 transition-transform">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <div className="font-bold text-slate-900 leading-tight text-base flex items-center gap-1.5">
                Banking BA Hub
                <span className="text-[10px] bg-blue-100 text-blue-800 font-semibold px-1.5 py-0.5 rounded-full uppercase tracking-wider">
                  Pro
                </span>
              </div>
              <p className="text-[11px] text-slate-500">BABOK v3 & Banking Mastery</p>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => {
              const Icon = link.icon
              const isActive = pathname === link.href || (link.href !== '/' && pathname.startsWith(link.href))
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`flex items-center gap-2 px-3.5 py-2 rounded-lg text-sm font-medium transition-all ${
                    isActive
                      ? 'bg-blue-50 text-blue-700 shadow-sm'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                  }`}
                >
                  <Icon className={`w-4 h-4 ${isActive ? 'text-blue-600' : 'text-slate-400'}`} />
                  {link.label}
                </Link>
              )
            })}
          </nav>

          {/* Progress Badge */}
          <div className="hidden lg:flex items-center gap-3 pl-4 border-l border-slate-200">
            <div className="text-right">
              <div className="text-xs font-semibold text-slate-700 flex items-center gap-1 justify-end">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
                {completedCount}/{totalLessons} Bài học
              </div>
              <div className="text-[11px] text-slate-500">Tiến độ hoàn thành</div>
            </div>
            <div className="relative w-11 h-11 flex items-center justify-center">
              <svg className="w-11 h-11 transform -rotate-90">
                <circle
                  cx="22"
                  cy="22"
                  r="18"
                  stroke="currentColor"
                  strokeWidth="3.5"
                  className="text-slate-100"
                  fill="transparent"
                />
                <circle
                  cx="22"
                  cy="22"
                  r="18"
                  stroke="currentColor"
                  strokeWidth="3.5"
                  className="text-blue-600 transition-all duration-700 ease-out"
                  fill="transparent"
                  strokeDasharray={113}
                  strokeDashoffset={113 - (113 * completionPercentage) / 100}
                  strokeLinecap="round"
                />
              </svg>
              <span className="absolute text-[11px] font-bold text-slate-800">
                {completionPercentage}%
              </span>
            </div>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex md:hidden items-center gap-2">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-slate-600 hover:text-slate-900 hover:bg-slate-100"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-slate-200 bg-white px-4 pt-2 pb-4 space-y-1">
          {navLinks.map((link) => {
            const Icon = link.icon
            const isActive = pathname === link.href
            return (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium ${
                  isActive
                    ? 'bg-blue-50 text-blue-700'
                    : 'text-slate-700 hover:bg-slate-100'
                }`}
              >
                <Icon className="w-5 h-5 text-slate-400" />
                {link.label}
              </Link>
            )
          })}
          <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-sm px-2 text-slate-600">
            <span>Tiến độ đã học:</span>
            <span className="font-bold text-blue-600">{completionPercentage}% ({completedCount}/{totalLessons})</span>
          </div>
        </div>
      )}
    </header>
  )
}
