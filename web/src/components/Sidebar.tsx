'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { 
  Compass, 
  Layers, 
  Network, 
  BookOpen, 
  HelpCircle, 
  Award, 
  ChevronDown, 
  ChevronRight, 
  Lock, 
  Unlock, 
  CheckCircle2, 
  Circle, 
  PanelLeftClose, 
  PanelLeft, 
  Sparkles,
  Building2,
  FolderGit2,
  ShieldCheck,
  Eye,
  EyeOff
} from 'lucide-react'
import { useProgress } from '@/context/ProgressContext'
import { LESSONS, Lesson } from '@/data/curriculumData'

interface SidebarProps {
  collapsed: boolean
  setCollapsed: (v: boolean) => void
  mobileOpen: boolean
  setMobileOpen: (v: boolean) => void
}

export default function Sidebar({ collapsed, setCollapsed, mobileOpen, setMobileOpen }: SidebarProps) {
  const pathname = usePathname()
  const { 
    isLessonCompleted, 
    isLessonUnlocked, 
    isCaseStudyUnlocked,
    completionPercentage, 
    completedCount, 
    totalLessons,
    progress,
    toggleUnlockAllMode
  } = useProgress()

  const [tier1Open, setTier1Open] = useState(true)
  const [tier2Open, setTier2Open] = useState(true)
  const [caseStudiesOpen, setCaseStudiesOpen] = useState(false)

  const tier1Lessons = LESSONS.filter(l => l.tier === 'tier-1')
  const tier2Lessons = LESSONS.filter(l => l.tier === 'tier-2')

  const caseStudies = [
    { slug: 'payment_network_error_refund', name: 'Hoàn Tiền Khi Lỗi Mạng', tag: 'Payments' },
    { slug: 'bill_splitting', name: 'Chia Bill Nhóm VietQR', tag: 'Growth' },
    { slug: 'sample_e_wallet_cashback', name: 'Hệ Thống Cashback', tag: 'Ledger' },
  ]

  const mainLinks = [
    { href: '/', label: 'Dashboard', icon: Compass },
    { href: '/roadmap', label: 'Lộ Trình & Checklist', icon: Layers },
    { href: '/matrix', label: 'Ma Trận Quan Hệ', icon: Network, badge: 'Mới' },
    { href: '/quiz', label: 'Trắc Nghiệm Kiến Thức', icon: HelpCircle },
    { href: '/interview', label: 'Luyện Phỏng Vấn STAR', icon: Award },
  ]

  return (
    <>
      {/* Mobile Backdrop */}
      {mobileOpen && (
        <div 
          onClick={() => setMobileOpen(false)}
          className="fixed inset-0 z-40 bg-slate-900/50 backdrop-blur-sm lg:hidden"
        />
      )}

      {/* Sidebar Container */}
      <aside
        className={`fixed top-0 bottom-0 left-0 z-50 bg-slate-900 text-slate-300 flex flex-col border-r border-slate-800 transition-all duration-300 ease-in-out ${
          collapsed ? 'w-18' : 'w-72'
        } ${
          mobileOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        }`}
      >
        {/* Brand Header */}
        <div className="h-16 flex items-center justify-between px-4 border-b border-slate-800 shrink-0">
          <Link href="/" className="flex items-center gap-3 overflow-hidden">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-blue-600 via-indigo-600 to-cyan-500 flex items-center justify-center text-white shrink-0 shadow-md shadow-blue-500/20">
              <Sparkles className="w-5 h-5" />
            </div>
            {!collapsed && (
              <div className="whitespace-nowrap">
                <div className="font-bold text-white text-sm tracking-tight flex items-center gap-1.5">
                  Banking BA Hub
                  <span className="text-[9px] bg-blue-500/20 text-blue-300 font-semibold px-1.5 py-0.2 rounded border border-blue-400/30">
                    Enterprise
                  </span>
                </div>
                <p className="text-[10px] text-slate-400">BABOK v3 & Banking Mastery</p>
              </div>
            )}
          </Link>

          {/* Collapse Toggle (Desktop only) */}
          <button
            onClick={() => setCollapsed(!collapsed)}
            className="hidden lg:flex p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
            title={collapsed ? 'Mở rộng sidebar' : 'Thu gọn sidebar'}
          >
            {collapsed ? <PanelLeft className="w-4 h-4" /> : <PanelLeftClose className="w-4 h-4" />}
          </button>
        </div>

        {/* Scrollable Navigation Tree */}
        <div className="flex-1 overflow-y-auto overflow-x-hidden p-3 space-y-6">
          {/* Main Top Links */}
          <div className="space-y-1">
            {mainLinks.map((item) => {
              const Icon = item.icon
              const isActive = pathname === item.href
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setMobileOpen(false)}
                  className={`flex items-center gap-3 px-3 py-2 rounded-xl text-xs font-semibold transition-all ${
                    isActive
                      ? 'bg-blue-600 text-white shadow-sm shadow-blue-600/30'
                      : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
                  }`}
                  title={collapsed ? item.label : undefined}
                >
                  <Icon className={`w-4 h-4 shrink-0 ${isActive ? 'text-white' : 'text-slate-400'}`} />
                  {!collapsed && (
                    <span className="flex-1 truncate">{item.label}</span>
                  )}
                  {!collapsed && item.badge && (
                    <span className="text-[9px] bg-cyan-500/20 text-cyan-300 font-bold px-1.5 py-0.5 rounded">
                      {item.badge}
                    </span>
                  )}
                </Link>
              )
            })}
          </div>

          {/* Section: TẦNG 1 - BABOK FOUNDATION */}
          <div className="space-y-1">
            {!collapsed ? (
              <button
                onClick={() => setTier1Open(!tier1Open)}
                className="w-full flex items-center justify-between px-2 py-1.5 text-[10px] font-bold uppercase tracking-wider text-slate-500 hover:text-slate-300"
              >
                <span className="flex items-center gap-1.5 text-blue-400">
                  <span className="w-1.5 h-1.5 rounded-full bg-blue-500"></span>
                  Tầng 1: BABOK Foundation
                </span>
                {tier1Open ? <ChevronDown className="w-3.5 h-3.5" /> : <ChevronRight className="w-3.5 h-3.5" />}
              </button>
            ) : (
              <div className="w-full h-px bg-slate-800 my-2" />
            )}

            {(tier1Open || collapsed) && (
              <div className="space-y-0.5">
                {tier1Lessons.map((lesson, idx) => {
                  const completed = isLessonCompleted(lesson.id)
                  const unlocked = isLessonUnlocked(lesson.id)
                  const isActive = pathname.includes(lesson.id)

                  return (
                    <Link
                      key={lesson.id}
                      href={unlocked ? `/learn/${lesson.tier}/${lesson.id}` : '#'}
                      onClick={(e) => {
                        if (!unlocked) {
                          e.preventDefault()
                          alert(`Bài học này đang bị khoá. Vui lòng hoàn thành bài học trước: ${lesson.prerequisites?.[0] || 'Bài trước'} hoặc bật chế độ 'Mở khoá tự do' ở chân sidebar!`)
                          return
                        }
                        setMobileOpen(false)
                      }}
                      className={`flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs transition-all ${
                        isActive
                          ? 'bg-blue-600/20 text-blue-400 font-bold border border-blue-500/30'
                          : unlocked
                            ? 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/40'
                            : 'text-slate-600 cursor-not-allowed opacity-60'
                      }`}
                      title={collapsed ? `${idx + 1}. ${lesson.title}` : undefined}
                    >
                      {completed ? (
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                      ) : unlocked ? (
                        <Circle className="w-3.5 h-3.5 text-blue-400 shrink-0" />
                      ) : (
                        <Lock className="w-3.5 h-3.5 text-slate-600 shrink-0" />
                      )}

                      {!collapsed && (
                        <span className="truncate flex-1">
                          {idx + 1}. {lesson.title.split('&')[0]}
                        </span>
                      )}
                    </Link>
                  )
                })}
              </div>
            )}
          </div>

          {/* Section: TẦNG 2 - BANKING DOMAIN */}
          <div className="space-y-1">
            {!collapsed ? (
              <button
                onClick={() => setTier2Open(!tier2Open)}
                className="w-full flex items-center justify-between px-2 py-1.5 text-[10px] font-bold uppercase tracking-wider text-slate-500 hover:text-slate-300"
              >
                <span className="flex items-center gap-1.5 text-indigo-400">
                  <span className="w-1.5 h-1.5 rounded-full bg-indigo-500"></span>
                  Tầng 2: Banking Domain
                </span>
                {tier2Open ? <ChevronDown className="w-3.5 h-3.5" /> : <ChevronRight className="w-3.5 h-3.5" />}
              </button>
            ) : (
              <div className="w-full h-px bg-slate-800 my-2" />
            )}

            {(tier2Open || collapsed) && (
              <div className="space-y-0.5">
                {tier2Lessons.map((lesson, idx) => {
                  const completed = isLessonCompleted(lesson.id)
                  const unlocked = isLessonUnlocked(lesson.id)
                  const isActive = pathname.includes(lesson.id)

                  return (
                    <Link
                      key={lesson.id}
                      href={unlocked ? `/learn/${lesson.tier}/${lesson.id}` : '#'}
                      onClick={(e) => {
                        if (!unlocked) {
                          e.preventDefault()
                          alert(`Bài học này đang bị khoá. Vui lòng hoàn thành các bài tiên quyết hoặc bật 'Mở khoá tự do' ở chân sidebar!`)
                          return
                        }
                        setMobileOpen(false)
                      }}
                      className={`flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs transition-all ${
                        isActive
                          ? 'bg-indigo-600/20 text-indigo-400 font-bold border border-indigo-500/30'
                          : unlocked
                            ? 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/40'
                            : 'text-slate-600 cursor-not-allowed opacity-60'
                      }`}
                      title={collapsed ? `${idx + 1}. ${lesson.title}` : undefined}
                    >
                      {completed ? (
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                      ) : unlocked ? (
                        <Circle className="w-3.5 h-3.5 text-indigo-400 shrink-0" />
                      ) : (
                        <Lock className="w-3.5 h-3.5 text-slate-600 shrink-0" />
                      )}

                      {!collapsed && (
                        <span className="truncate flex-1">
                          {idx + 1}. {lesson.title.split('&')[0]}
                        </span>
                      )}
                    </Link>
                  )
                })}
              </div>
            )}
          </div>

          {/* Section: TẦNG 3 - CASE STUDIES */}
          <div className="space-y-1">
            {!collapsed ? (
              <button
                onClick={() => setCaseStudiesOpen(!caseStudiesOpen)}
                className="w-full flex items-center justify-between px-2 py-1.5 text-[10px] font-bold uppercase tracking-wider text-slate-500 hover:text-slate-300"
              >
                <span className="flex items-center gap-1.5 text-emerald-400">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                  Tầng 3: Case Studies
                </span>
                {caseStudiesOpen ? <ChevronDown className="w-3.5 h-3.5" /> : <ChevronRight className="w-3.5 h-3.5" />}
              </button>
            ) : null}

            {(caseStudiesOpen || collapsed) && (
              <div className="space-y-0.5">
                {caseStudies.map((cs) => {
                  const unlocked = isCaseStudyUnlocked(cs.slug)
                  const isActive = pathname.includes(cs.slug)

                  return (
                    <Link
                      key={cs.slug}
                      href={unlocked ? `/case-studies/${cs.slug}/01_discovery_scoping` : '#'}
                      onClick={(e) => {
                        if (!unlocked) {
                          e.preventDefault()
                          alert(`Case study này yêu cầu hoàn thành bài lý thuyết liên quan (hoặc bật 'Mở khoá tự do' ở chân sidebar)!`)
                          return
                        }
                        setMobileOpen(false)
                      }}
                      className={`flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs transition-all ${
                        isActive
                          ? 'bg-emerald-600/20 text-emerald-400 font-bold border border-emerald-500/30'
                          : unlocked
                            ? 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/40'
                            : 'text-slate-600 cursor-not-allowed opacity-60'
                      }`}
                      title={collapsed ? cs.name : undefined}
                    >
                      {unlocked ? (
                        <FolderGit2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                      ) : (
                        <Lock className="w-3.5 h-3.5 text-slate-600 shrink-0" />
                      )}
                      {!collapsed && (
                        <span className="truncate flex-1">{cs.name}</span>
                      )}
                    </Link>
                  )
                })}
              </div>
            )}
          </div>
        </div>

        {/* Footer Utilities: Unlock All & Progress Mini */}
        <div className="p-3 border-t border-slate-800 bg-slate-950/60 shrink-0 space-y-3">
          {/* Unlock All Mode Switcher */}
          {!collapsed ? (
            <div className="flex items-center justify-between px-2 py-1 bg-slate-900 rounded-xl border border-slate-800">
              <span className="text-[11px] text-slate-400 flex items-center gap-1.5">
                {progress.unlockAllMode ? (
                  <Unlock className="w-3.5 h-3.5 text-amber-400" />
                ) : (
                  <Lock className="w-3.5 h-3.5 text-blue-400" />
                )}
                {progress.unlockAllMode ? 'Mở khoá tự do' : 'Khoá tuyến tính'}
              </span>
              <button
                onClick={toggleUnlockAllMode}
                className={`relative inline-flex h-5 w-9 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
                  progress.unlockAllMode ? 'bg-amber-500' : 'bg-slate-700'
                }`}
                title={progress.unlockAllMode ? 'Chuyển sang chế độ khoá bài theo thứ tự' : 'Mở khoá toàn bộ bài học để tra cứu tự do'}
              >
                <span
                  className={`pointer-events-none inline-block h-4 w-4 transform rounded-full bg-white shadow-lg ring-0 transition duration-200 ease-in-out ${
                    progress.unlockAllMode ? 'translate-x-4' : 'translate-x-0'
                  }`}
                />
              </button>
            </div>
          ) : (
            <button
              onClick={toggleUnlockAllMode}
              className={`w-full p-2 rounded-xl flex justify-center items-center transition-colors ${
                progress.unlockAllMode ? 'text-amber-400 bg-amber-500/10' : 'text-slate-400 hover:bg-slate-800'
              }`}
              title={progress.unlockAllMode ? 'Đang bật Mở khoá tự do' : 'Đang bật Khoá tuyến tính'}
            >
              {progress.unlockAllMode ? <Unlock className="w-4 h-4" /> : <Lock className="w-4 h-4" />}
            </button>
          )}

          {/* Progress Mini Bar */}
          {!collapsed && (
            <div className="space-y-1.5 px-2">
              <div className="flex items-center justify-between text-[11px]">
                <span className="text-slate-400">Tiến độ bài học:</span>
                <span className="font-bold text-blue-400">{completionPercentage}%</span>
              </div>
              <div className="w-full bg-slate-800 rounded-full h-1.5 overflow-hidden">
                <div 
                  className="bg-blue-500 h-1.5 rounded-full transition-all duration-500" 
                  style={{ width: `${completionPercentage}%` }}
                />
              </div>
            </div>
          )}
        </div>
      </aside>
    </>
  )
}
