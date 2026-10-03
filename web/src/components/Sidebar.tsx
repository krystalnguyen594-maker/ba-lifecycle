'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { 
  Compass, 
  Layers, 
  Network, 
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
  Building2,
  FolderGit2,
  BookOpen,
  ArrowRight,
  ShieldAlert
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
  const [caseStudiesOpen, setCaseStudiesOpen] = useState(true)

  const tier1Lessons = LESSONS.filter(l => l.tier === 'tier-1')
  const tier2Lessons = LESSONS.filter(l => l.tier === 'tier-2')

  const caseStudies = [
    { slug: 'payment_network_error_refund', name: 'Hoàn Tiền Lỗi Mạng (Napas)', tag: 'Payments' },
    { slug: 'bill_splitting', name: 'Chia Bill Nhóm VietQR', tag: 'P2P' },
    { slug: 'sample_e_wallet_cashback', name: 'Cashback Engine (Ledger)', tag: 'Loyalty' },
  ]

  const mainNavItems = [
    { href: '/', label: 'Tổng Quan', icon: Compass },
    { href: '/roadmap', label: 'Lộ Trình & Tiến Độ', icon: Layers },
    { href: '/matrix', label: 'Ma Trận Quan Hệ', icon: Network, highlight: true },
    { href: '/quiz', label: 'Thi Trắc Nghiệm', icon: HelpCircle },
    { href: '/interview', label: 'Luyện Phỏng Vấn STAR', icon: Award },
  ]

  return (
    <>
      {/* Mobile Backdrop */}
      {mobileOpen && (
        <div 
          onClick={() => setMobileOpen(false)}
          className="fixed inset-0 z-40 bg-slate-900/40 backdrop-blur-xs lg:hidden"
        />
      )}

      {/* Unified Enterprise Sidebar */}
      <aside
        className={`fixed top-0 bottom-0 left-0 z-50 bg-white border-r border-slate-200/90 flex flex-col transition-all duration-300 ease-in-out shadow-xs ${
          collapsed ? 'w-20' : 'w-76'
        } ${
          mobileOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        }`}
      >
        {/* Brand Header */}
        <div className="h-15 flex items-center justify-between px-4 border-b border-slate-100 shrink-0">
          <Link href="/" className="flex items-center gap-3 overflow-hidden group">
            <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center text-white shrink-0 shadow-xs group-hover:bg-blue-700 transition-colors">
              <Building2 className="w-4 h-4" />
            </div>
            {!collapsed && (
              <div className="whitespace-nowrap">
                <div className="font-bold text-slate-900 text-sm tracking-tight flex items-center gap-1.5">
                  VPBank Talents
                  <span className="text-[9px] bg-emerald-50 text-emerald-700 font-semibold px-1.5 py-0.2 rounded border border-emerald-200">
                    Digital BA
                  </span>
                </div>
                <p className="text-[10px] text-slate-400 font-medium">Young Talents Fast-Track</p>
              </div>
            )}
          </Link>

          {/* Collapse Toggle */}
          <button
            onClick={() => setCollapsed(!collapsed)}
            className="hidden lg:flex p-1.5 rounded-md text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors"
            title={collapsed ? 'Mở rộng sidebar' : 'Thu gọn sidebar'}
          >
            {collapsed ? <PanelLeft className="w-4 h-4" /> : <PanelLeftClose className="w-4 h-4" />}
          </button>
        </div>

        {/* Scrollable Navigation Tree */}
        <div className="flex-1 overflow-y-auto overflow-x-hidden p-3 space-y-5">
          {/* Main Navigation Links */}
          <nav className="space-y-0.5">
            {mainNavItems.map((item) => {
              const Icon = item.icon
              const isActive = pathname === item.href
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setMobileOpen(false)}
                  className={`flex items-center gap-3 px-3 py-2 rounded-lg text-xs font-semibold transition-all ${
                    isActive
                      ? 'bg-blue-50 text-blue-700 font-bold'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                  }`}
                  title={collapsed ? item.label : undefined}
                >
                  <Icon className={`w-4 h-4 shrink-0 ${isActive ? 'text-blue-600' : 'text-slate-400'}`} />
                  {!collapsed && (
                    <span className="flex-1 truncate">{item.label}</span>
                  )}
                  {!collapsed && item.highlight && (
                    <span className="text-[9px] bg-blue-100 text-blue-700 font-bold px-1.5 py-0.5 rounded-full">
                      Graph
                    </span>
                  )}
                </Link>
              )
            })}
          </nav>

          <div className="border-t border-slate-100 pt-3 space-y-4">
            {/* TẦNG 1: CHẶNG 1 */}
            <div>
              {!collapsed ? (
                <button
                  onClick={() => setTier1Open(!tier1Open)}
                  className="w-full flex items-center justify-between px-2 py-1 text-[11px] font-bold text-slate-800 hover:text-blue-600 transition-colors"
                >
                  <span className="flex items-center gap-1.5 text-slate-700">
                    <span className="w-1.5 h-1.5 rounded-full bg-blue-600"></span>
                    Chặng 1: Kỹ Năng & Tư Duy BA
                  </span>
                  {tier1Open ? <ChevronDown className="w-3.5 h-3.5 text-slate-400" /> : <ChevronRight className="w-3.5 h-3.5 text-slate-400" />}
                </button>
              ) : (
                <div className="w-full h-px bg-slate-100 my-1" />
              )}

              {(tier1Open || collapsed) && (
                <div className="relative pl-3 mt-1.5">
                  {/* Vertical tree line */}
                  {!collapsed && (
                    <div className="absolute left-5 top-2 bottom-2 w-px bg-slate-200 pointer-events-none" />
                  )}

                  <div className="space-y-1">
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
                              alert(`Bài học này cần hoàn thành bài trước hoặc bật 'Chế độ mở khoá tự do' ở chân sidebar!`)
                              return
                            }
                            setMobileOpen(false)
                          }}
                          className={`relative flex items-center gap-2.5 py-1.5 px-2 rounded-lg text-xs transition-all ${
                            isActive
                              ? 'bg-blue-50 text-blue-800 font-bold'
                              : unlocked
                                ? 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                                : 'text-slate-400 cursor-not-allowed opacity-60'
                          }`}
                          title={collapsed ? `${idx + 1}. ${lesson.title}` : undefined}
                        >
                          {/* Node marker on the line */}
                          <div className="w-4 h-4 rounded-full bg-white flex items-center justify-center shrink-0 z-10">
                            {completed ? (
                              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 fill-emerald-50" />
                            ) : unlocked ? (
                              <div className="w-2.5 h-2.5 rounded-full border-2 border-blue-600 bg-white" />
                            ) : (
                              <Lock className="w-3 h-3 text-slate-400" />
                            )}
                          </div>

                          {!collapsed && (
                            <span className="truncate flex-1 text-[11px] leading-tight">
                              {idx + 1}. {lesson.title.split('&')[0]}
                            </span>
                          )}
                        </Link>
                      )
                    })}
                  </div>
                </div>
              )}
            </div>

            {/* TẦNG 2: CHẶNG 2 */}
            <div>
              {!collapsed ? (
                <button
                  onClick={() => setTier2Open(!tier2Open)}
                  className="w-full flex items-center justify-between px-2 py-1 text-[11px] font-bold text-slate-800 hover:text-emerald-600 transition-colors"
                >
                  <span className="flex items-center gap-1.5 text-slate-700">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-600"></span>
                    Chặng 2: Sản Phẩm Số & VPBank Cases
                  </span>
                  {tier2Open ? <ChevronDown className="w-3.5 h-3.5 text-slate-400" /> : <ChevronRight className="w-3.5 h-3.5 text-slate-400" />}
                </button>
              ) : (
                <div className="w-full h-px bg-slate-100 my-1" />
              )}

              {(tier2Open || collapsed) && (
                <div className="relative pl-3 mt-1.5">
                  {!collapsed && (
                    <div className="absolute left-5 top-2 bottom-2 w-px bg-slate-200 pointer-events-none" />
                  )}

                  <div className="space-y-1">
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
                              alert(`Bài học này đang bị khoá. Vui lòng hoàn thành các bài tiên quyết hoặc bật 'Mở khoá tự do'!`)
                              return
                            }
                            setMobileOpen(false)
                          }}
                          className={`relative flex items-center gap-2.5 py-1.5 px-2 rounded-lg text-xs transition-all ${
                            isActive
                              ? 'bg-indigo-50 text-indigo-800 font-bold'
                              : unlocked
                                ? 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                                : 'text-slate-400 cursor-not-allowed opacity-60'
                          }`}
                          title={collapsed ? `${idx + 1}. ${lesson.title}` : undefined}
                        >
                          <div className="w-4 h-4 rounded-full bg-white flex items-center justify-center shrink-0 z-10">
                            {completed ? (
                              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 fill-emerald-50" />
                            ) : unlocked ? (
                              <div className="w-2.5 h-2.5 rounded-full border-2 border-indigo-600 bg-white" />
                            ) : (
                              <Lock className="w-3 h-3 text-slate-400" />
                            )}
                          </div>

                          {!collapsed && (
                            <span className="truncate flex-1 text-[11px] leading-tight">
                              {idx + 1}. {lesson.title.split('&')[0]}
                            </span>
                          )}
                        </Link>
                      )
                    })}
                  </div>
                </div>
              )}
            </div>

            {/* TẦNG 3: CASE STUDIES & CAPSTONES */}
            <div>
              {!collapsed ? (
                <button
                  onClick={() => setCaseStudiesOpen(!caseStudiesOpen)}
                  className="w-full flex items-center justify-between px-2 py-1 text-[11px] font-bold text-slate-800 hover:text-purple-600 transition-colors"
                >
                  <span className="flex items-center gap-1.5 text-slate-700">
                    <span className="w-1.5 h-1.5 rounded-full bg-purple-600"></span>
                    Chặng 3: Thi Tuyển & Case Study
                  </span>
                  {caseStudiesOpen ? <ChevronDown className="w-3.5 h-3.5 text-slate-400" /> : <ChevronRight className="w-3.5 h-3.5 text-slate-400" />}
                </button>
              ) : null}

              {(caseStudiesOpen || collapsed) && (
                <div className="space-y-0.5 mt-1.5">
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
                            alert(`Case study này yêu cầu hoàn thành bài lý thuyết liên quan trước!`)
                            return
                          }
                          setMobileOpen(false)
                        }}
                        className={`flex items-center gap-2 py-1.5 px-2.5 rounded-lg text-xs transition-all ${
                          isActive
                            ? 'bg-emerald-50 text-emerald-800 font-bold'
                            : unlocked
                              ? 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                              : 'text-slate-400 cursor-not-allowed opacity-60'
                        }`}
                        title={collapsed ? cs.name : undefined}
                      >
                        {unlocked ? (
                          <FolderGit2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                        ) : (
                          <Lock className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                        )}
                        {!collapsed && (
                          <span className="truncate flex-1 text-[11px]">{cs.name}</span>
                        )}
                      </Link>
                    )
                  })}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Footer: Unlock All Mode & Progress Indicator */}
        <div className="p-3 border-t border-slate-100 bg-slate-50/50 shrink-0 space-y-2.5">
          {!collapsed ? (
            <div className="flex items-center justify-between px-2.5 py-1.5 bg-white rounded-lg border border-slate-200/80 shadow-2xs">
              <span className="text-[11px] text-slate-600 font-medium flex items-center gap-1.5">
                {progress.unlockAllMode ? (
                  <Unlock className="w-3.5 h-3.5 text-amber-600" />
                ) : (
                  <Lock className="w-3.5 h-3.5 text-slate-500" />
                )}
                {progress.unlockAllMode ? 'Mở khoá tự do' : 'Học tuyến tính'}
              </span>
              <button
                onClick={toggleUnlockAllMode}
                className={`relative inline-flex h-4.5 w-8 shrink-0 cursor-pointer rounded-full border border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
                  progress.unlockAllMode ? 'bg-amber-500' : 'bg-slate-300'
                }`}
                title="Bật/Tắt chế độ mở khoá tự do"
              >
                <span
                  className={`pointer-events-none inline-block h-3.5 w-3.5 transform rounded-full bg-white shadow-xs transition duration-200 ease-in-out mt-0.5 ml-0.5 ${
                    progress.unlockAllMode ? 'translate-x-3.5' : 'translate-x-0'
                  }`}
                />
              </button>
            </div>
          ) : (
            <button
              onClick={toggleUnlockAllMode}
              className={`w-full p-2 rounded-lg flex justify-center items-center transition-colors ${
                progress.unlockAllMode ? 'text-amber-600 bg-amber-50' : 'text-slate-400 hover:bg-slate-100'
              }`}
              title="Bật/Tắt chế độ mở khoá tự do"
            >
              {progress.unlockAllMode ? <Unlock className="w-4 h-4" /> : <Lock className="w-4 h-4" />}
            </button>
          )}

          {!collapsed && (
            <div className="space-y-1 px-1">
              <div className="flex items-center justify-between text-[10px] text-slate-500 font-medium">
                <span>Tiến độ hoàn thành:</span>
                <span className="font-bold text-slate-800">{completionPercentage}% ({completedCount}/{totalLessons})</span>
              </div>
              <div className="w-full bg-slate-200 rounded-full h-1.5 overflow-hidden">
                <div 
                  className="bg-blue-600 h-1.5 rounded-full transition-all duration-500" 
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
