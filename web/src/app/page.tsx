'use client'

import React from 'react'
import Link from 'next/link'
import { 
  ArrowRight, 
  CheckCircle2, 
  Clock, 
  BookOpen, 
  Award, 
  Layers, 
  HelpCircle,
  Building2,
  TrendingUp,
  ShieldCheck,
  Zap,
  Sparkles,
  Network,
  FolderGit2
} from 'lucide-react'
import { useProgress } from '@/context/ProgressContext'
import { LESSONS, TIER_INFO } from '@/data/curriculumData'

export default function DashboardPage() {
  const { 
    completionPercentage, 
    completedCount, 
    totalLessons, 
    tierCompletion, 
    isLessonCompleted 
  } = useProgress()

  const tier1Pct = tierCompletion('tier-1')
  const tier2Pct = tierCompletion('tier-2')

  // Find next uncompleted lesson
  const nextLesson = LESSONS.find(l => !isLessonCompleted(l.id)) || LESSONS[0]

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 pt-6 space-y-8">
      {/* Editorial Focus Hero */}
      <div className="bg-white rounded-3xl border border-slate-200/90 p-6 sm:p-10 shadow-2xs space-y-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-3 max-w-2xl">
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-blue-50 text-blue-700 text-xs font-semibold border border-blue-200/60">
              <Building2 className="w-3.5 h-3.5" /> Banking IT Business Analyst Mastery Hub
            </div>
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 tracking-tight leading-tight">
              Lộ Trình Phân Tích Nghiệp Vụ Chuẩn BABOK v3 & Banking Domain
            </h1>
            <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
              Mô hình học tập 3 tầng kết hợp Docs-as-Code trên IDE. Nắm vững từ kiến trúc Core Banking, Napas 247, Sổ cái kế toán bút toán kép, cho đến giải quyết bài toán hoàn tiền lỗi mạng và luyện thi phỏng vấn STAR.
            </p>
          </div>

          {/* Primary Action Card */}
          <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-3 shrink-0 md:w-80 shadow-2xs">
            <div className="flex items-center justify-between text-xs">
              <span className="text-slate-500 font-medium">Bài học tiếp theo:</span>
              <span className="text-blue-600 font-bold">{nextLesson.tier === 'tier-1' ? 'Tầng 1' : 'Tầng 2'}</span>
            </div>
            <h3 className="font-bold text-slate-900 text-sm line-clamp-2 leading-snug">
              {nextLesson.title}
            </h3>
            <Link
              href={`/learn/${nextLesson.tier}/${nextLesson.id}`}
              className="w-full inline-flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-bold py-2.5 px-4 rounded-xl text-xs transition-colors shadow-2xs"
            >
              <span>Vào học ngay</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>

        {/* Clean Progress Metric Bar */}
        <div className="pt-6 border-t border-slate-100 grid grid-cols-2 md:grid-cols-4 gap-4 text-xs">
          <div className="space-y-1.5">
            <span className="text-slate-400 font-medium">Tổng tiến độ:</span>
            <div className="flex items-baseline gap-1.5">
              <span className="text-xl font-extrabold text-slate-900">{completionPercentage}%</span>
              <span className="text-slate-400">({completedCount}/{totalLessons})</span>
            </div>
            <div className="w-full bg-slate-100 rounded-full h-1.5 overflow-hidden">
              <div className="bg-blue-600 h-1.5 rounded-full" style={{ width: `${completionPercentage}%` }} />
            </div>
          </div>

          <div className="space-y-1.5">
            <span className="text-slate-400 font-medium">Tầng 1 (BABOK):</span>
            <div className="flex items-baseline gap-1.5">
              <span className="text-xl font-extrabold text-slate-900">{tier1Pct}%</span>
              <span className="text-slate-400">Foundation</span>
            </div>
            <div className="w-full bg-slate-100 rounded-full h-1.5 overflow-hidden">
              <div className="bg-blue-600 h-1.5 rounded-full" style={{ width: `${tier1Pct}%` }} />
            </div>
          </div>

          <div className="space-y-1.5">
            <span className="text-slate-400 font-medium">Tầng 2 (Banking):</span>
            <div className="flex items-baseline gap-1.5">
              <span className="text-xl font-extrabold text-slate-900">{tier2Pct}%</span>
              <span className="text-slate-400">Mastery</span>
            </div>
            <div className="w-full bg-slate-100 rounded-full h-1.5 overflow-hidden">
              <div className="bg-indigo-600 h-1.5 rounded-full" style={{ width: `${tier2Pct}%` }} />
            </div>
          </div>

          <div className="space-y-1.5">
            <span className="text-slate-400 font-medium">Luyện phỏng vấn:</span>
            <div className="flex items-baseline gap-1.5">
              <span className="text-xl font-extrabold text-slate-900">30</span>
              <span className="text-slate-400">Câu hỏi STAR</span>
            </div>
            <Link href="/interview" className="text-blue-600 font-semibold hover:underline block pt-0.5">
              Vào luyện thi ➔
            </Link>
          </div>
        </div>
      </div>

      {/* 3-Tier Structured Roadmap */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-base font-bold text-slate-900 flex items-center gap-2">
            <Layers className="w-4 h-4 text-blue-600" />
            Lộ Trình Đào Tạo 3 Tầng Thực Chiến
          </h2>
          <Link href="/roadmap" className="text-xs font-semibold text-blue-600 hover:text-blue-700 flex items-center gap-1">
            Xem toàn bộ bài học <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Tier 1 Card */}
          <div className="bg-white rounded-2xl border border-slate-200/90 p-5 flex flex-col justify-between shadow-2xs hover:border-slate-300 transition-colors">
            <div className="space-y-2.5">
              <span className="text-[10px] font-bold uppercase tracking-wider text-blue-700 bg-blue-50 px-2 py-0.5 rounded border border-blue-200">
                Tầng 1
              </span>
              <h3 className="font-bold text-slate-900 text-sm">
                BABOK v3 & Kỹ Năng Kỹ Thuật BA
              </h3>
              <p className="text-xs text-slate-500 leading-relaxed">
                Khơi gợi yêu cầu, vẽ luồng BPMN 2.0 / Sequence Diagram, User Story chuẩn INVEST và Data Dictionary có Idempotency.
              </p>
            </div>
            <div className="pt-4 border-t border-slate-100 mt-4 flex items-center justify-between text-xs">
              <span className="text-slate-400 font-medium">{tier1Pct}% xong</span>
              <Link
                href="/learn/tier-1/01_business_analysis_overview"
                className="font-bold text-blue-600 hover:text-blue-700 flex items-center gap-1"
              >
                Học Tầng 1 <ArrowRight className="w-3 h-3" />
              </Link>
            </div>
          </div>

          {/* Tier 2 Card */}
          <div className="bg-white rounded-2xl border border-slate-200/90 p-5 flex flex-col justify-between shadow-2xs hover:border-slate-300 transition-colors">
            <div className="space-y-2.5">
              <span className="text-[10px] font-bold uppercase tracking-wider text-indigo-700 bg-indigo-50 px-2 py-0.5 rounded border border-indigo-200">
                Tầng 2
              </span>
              <h3 className="font-bold text-slate-900 text-sm">
                Bản Đồ Nghiệp Vụ Ngân Hàng & Fintech
              </h3>
              <p className="text-xs text-slate-500 leading-relaxed">
                Core Banking, Sổ cái bút toán kép (COA QĐ 479), Chuyển mạch Napas 247/SWIFT, Thẻ POS, Vay số STP và eKYC QĐ 2345.
              </p>
            </div>
            <div className="pt-4 border-t border-slate-100 mt-4 flex items-center justify-between text-xs">
              <span className="text-slate-400 font-medium">{tier2Pct}% xong</span>
              <Link
                href="/learn/tier-2/01_core_banking_and_ledger"
                className="font-bold text-indigo-600 hover:text-indigo-700 flex items-center gap-1"
              >
                Học Tầng 2 <ArrowRight className="w-3 h-3" />
              </Link>
            </div>
          </div>

          {/* Tier 3 Card */}
          <div className="bg-white rounded-2xl border border-slate-200/90 p-5 flex flex-col justify-between shadow-2xs hover:border-slate-300 transition-colors">
            <div className="space-y-2.5">
              <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                Tầng 3
              </span>
              <h3 className="font-bold text-slate-900 text-sm">
                Case Studies Thực Chiến (Docs-as-Code)
              </h3>
              <p className="text-xs text-slate-500 leading-relaxed">
                Hồ sơ bàn giao hoàn chỉnh 5 phases cho các bài toán: Hoàn tiền lỗi mạng, Chia bill VietQR nhóm, và Cashback Engine.
              </p>
            </div>
            <div className="pt-4 border-t border-slate-100 mt-4 flex items-center justify-between text-xs">
              <span className="text-slate-400 font-medium">3 Sáng Kiến</span>
              <Link
                href="/case-studies"
                className="font-bold text-emerald-600 hover:text-emerald-700 flex items-center gap-1"
              >
                Khám phá <ArrowRight className="w-3 h-3" />
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Relational Knowledge Matrix Shortcut Banner */}
      <div className="p-6 rounded-2xl bg-white border border-slate-200/90 shadow-2xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <Network className="w-4 h-4 text-blue-600" />
            <h3 className="font-bold text-slate-900 text-sm">
              Ma Trận Quan Hệ Kiến Thức (Relational Knowledge Graph)
            </h3>
          </div>
          <p className="text-xs text-slate-500">
            Xem rõ luồng kết nối nhân quả: Từ lý thuyết BABOK ➔ Nghiệp vụ Ngân hàng ➔ Bài toán thực tế ➔ Câu hỏi phỏng vấn
          </p>
        </div>
        <Link
          href="/matrix"
          className="self-start sm:self-center shrink-0 px-4 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs transition-colors shadow-2xs flex items-center gap-1.5"
        >
          <span>Khám phá đồ thị</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>
    </div>
  )
}
