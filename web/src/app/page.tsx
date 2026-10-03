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
  Sparkles
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
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 space-y-10">
      {/* Hero Banner */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-slate-900 via-blue-950 to-indigo-950 text-white p-8 md:p-12 shadow-xl border border-blue-900/40">
        <div className="absolute top-0 right-0 -mt-10 -mr-10 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl pointer-events-none"></div>
        <div className="relative z-10 max-w-3xl space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/20 border border-blue-400/30 text-blue-300 text-xs font-semibold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5 text-blue-300" />
            Lộ Trình Nghề Nghiệp Banking IT BA
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight leading-tight">
            Chinh Phục Khung <span className="bg-gradient-to-r from-blue-400 to-cyan-300 bg-clip-text text-transparent">BABOK v3</span> & Bản Đồ Nghiệp Vụ <span className="bg-gradient-to-r from-indigo-300 to-sky-300 bg-clip-text text-transparent">Ngân Hàng</span>
          </h1>
          <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
            Hệ thống đào tạo thực chiến kết hợp mô hình Docs-as-Code trên IDE. Nắm vững từ kiến trúc Core Banking, Napas 247, Sổ cái kế toán, cho đến quy trình giải quyết sự cố phân tán và luyện phỏng vấn ngân hàng lớn.
          </p>

          <div className="pt-4 flex flex-wrap items-center gap-4">
            <Link
              href={`/learn/${nextLesson.tier}/${nextLesson.id}`}
              className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-500 hover:to-cyan-500 text-white font-semibold px-6 py-3 rounded-xl shadow-lg shadow-blue-600/30 transition-all hover:scale-[1.02]"
            >
              <BookOpen className="w-4 h-4" />
              Tiếp tục học: {nextLesson.title.split('&')[0]}
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              href="/roadmap"
              className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/20 text-white font-medium px-5 py-3 rounded-xl backdrop-blur-sm border border-white/10 transition-colors"
            >
              <Layers className="w-4 h-4 text-blue-300" />
              Xem bản đồ lộ trình 3 tầng
            </Link>
          </div>
        </div>
      </div>

      {/* Progress Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between mb-4">
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">Tiến Độ Tổng Thể</span>
            <div className="w-9 h-9 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
              <TrendingUp className="w-5 h-5" />
            </div>
          </div>
          <div className="flex items-baseline gap-2 mb-2">
            <span className="text-3xl font-extrabold text-slate-900">{completionPercentage}%</span>
            <span className="text-xs text-slate-500">({completedCount}/{totalLessons} bài học)</span>
          </div>
          <div className="w-full bg-slate-100 rounded-full h-2 overflow-hidden">
            <div 
              className="bg-blue-600 h-2 rounded-full transition-all duration-500" 
              style={{ width: `${completionPercentage}%` }}
            />
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between mb-4">
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">Tầng 1: BABOK</span>
            <div className="w-9 h-9 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center">
              <Layers className="w-5 h-5" />
            </div>
          </div>
          <div className="flex items-baseline gap-2 mb-2">
            <span className="text-3xl font-extrabold text-slate-900">{tier1Pct}%</span>
            <span className="text-xs text-slate-500">Nền tảng kỹ thuật</span>
          </div>
          <div className="w-full bg-slate-100 rounded-full h-2 overflow-hidden">
            <div 
              className="bg-indigo-600 h-2 rounded-full transition-all duration-500" 
              style={{ width: `${tier1Pct}%` }}
            />
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between mb-4">
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">Tầng 2: Banking</span>
            <div className="w-9 h-9 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center">
              <Building2 className="w-5 h-5" />
            </div>
          </div>
          <div className="flex items-baseline gap-2 mb-2">
            <span className="text-3xl font-extrabold text-slate-900">{tier2Pct}%</span>
            <span className="text-xs text-slate-500">Nghiệp vụ ngân hàng</span>
          </div>
          <div className="w-full bg-slate-100 rounded-full h-2 overflow-hidden">
            <div 
              className="bg-purple-600 h-2 rounded-full transition-all duration-500" 
              style={{ width: `${tier2Pct}%` }}
            />
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between mb-4">
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">Luyện Phỏng Vấn</span>
            <div className="w-9 h-9 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
              <Award className="w-5 h-5" />
            </div>
          </div>
          <div className="flex items-baseline gap-2 mb-2">
            <span className="text-3xl font-extrabold text-slate-900">30+</span>
            <span className="text-xs text-slate-500">Câu hỏi STAR thực tế</span>
          </div>
          <Link href="/interview" className="text-xs font-semibold text-emerald-600 hover:text-emerald-700 flex items-center gap-1">
            Vào phòng luyện thi <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>

      {/* 3-Tier Roadmap Overview */}
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-bold text-slate-900">Lộ Trình Đào Tạo 3 Tầng Thực Chiến</h2>
            <p className="text-xs text-slate-500">Được thiết kế bám sát chuẩn kiến trúc công nghệ và nghiệp vụ của các Ngân hàng lớn</p>
          </div>
          <Link href="/roadmap" className="text-sm font-semibold text-blue-600 hover:text-blue-700 flex items-center gap-1">
            Xem toàn bộ <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Tier 1 */}
          <div className="bg-white rounded-2xl border border-slate-200 p-6 flex flex-col justify-between shadow-sm hover:border-blue-400 transition-colors">
            <div className="space-y-3">
              <div className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-blue-50 text-blue-700 text-xs font-semibold">
                Tầng 1 - Nền tảng
              </div>
              <h3 className="font-bold text-slate-900 text-lg">BABOK v3 & Kỹ Năng Kỹ Thuật BA</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Nắm vững kỹ thuật khơi gợi yêu cầu, vẽ sơ đồ BPMN 2.0 / Sequence Diagram, viết User Story INVEST và Gherkin AC, thiết kế Data Dictionary và hợp đồng API có Idempotency.
              </p>
              <div className="pt-2 text-xs text-slate-500 flex items-center gap-2">
                <BookOpen className="w-4 h-4 text-blue-500" /> 5 Mô-đun chuyên sâu
              </div>
            </div>
            <div className="pt-6 border-t border-slate-100 mt-6 flex items-center justify-between">
              <span className="text-xs font-medium text-slate-600">{tier1Pct}% Hoàn thành</span>
              <Link
                href="/learn/tier-1/01_business_analysis_overview"
                className="text-xs font-bold text-blue-600 hover:text-blue-700 flex items-center gap-1"
              >
                Học Tầng 1 <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>

          {/* Tier 2 */}
          <div className="bg-white rounded-2xl border border-slate-200 p-6 flex flex-col justify-between shadow-sm hover:border-indigo-400 transition-colors">
            <div className="space-y-3">
              <div className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-indigo-50 text-indigo-700 text-xs font-semibold">
                Tầng 2 - Chuyên sâu
              </div>
              <h3 className="font-bold text-slate-900 text-lg">Bản Đồ Nghiệp Vụ Ngân Hàng & Fintech</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Thấu hiểu trái tim Core Banking, Sổ cái kế toán kép (COA), Mạng chuyển mạch Napas 247/SWIFT, Thẻ Visa/Mastercard & POS, Cho vay số STP, và eKYC/AML QĐ 2345.
              </p>
              <div className="pt-2 text-xs text-slate-500 flex items-center gap-2">
                <Building2 className="w-4 h-4 text-indigo-500" /> 5 Phân hệ ngân hàng
              </div>
            </div>
            <div className="pt-6 border-t border-slate-100 mt-6 flex items-center justify-between">
              <span className="text-xs font-medium text-slate-600">{tier2Pct}% Hoàn thành</span>
              <Link
                href="/learn/tier-2/01_core_banking_and_ledger"
                className="text-xs font-bold text-indigo-600 hover:text-indigo-700 flex items-center gap-1"
              >
                Học Tầng 2 <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>

          {/* Tier 3 */}
          <div className="bg-white rounded-2xl border border-slate-200 p-6 flex flex-col justify-between shadow-sm hover:border-emerald-400 transition-colors">
            <div className="space-y-3">
              <div className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-emerald-50 text-emerald-700 text-xs font-semibold">
                Tầng 3 - Thực chiến
              </div>
              <h3 className="font-bold text-slate-900 text-lg">Case Studies Bài Toán Ngân Hàng Thật</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Khám phá hồ sơ hoàn chỉnh 5 phases (Discovery, Elicitation Grill, Modeling, Delivery, Evaluation) của các sáng kiến: Hoàn tiền lỗi mạng, Chia bill QR Napas, Cashback loyalty.
              </p>
              <div className="pt-2 text-xs text-slate-500 flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-500" /> 3 Dự án Docs-as-Code
              </div>
            </div>
            <div className="pt-6 border-t border-slate-100 mt-6 flex items-center justify-between">
              <span className="text-xs font-medium text-slate-600">Đã cập nhật trên Git</span>
              <Link
                href="/case-studies"
                className="text-xs font-bold text-emerald-600 hover:text-emerald-700 flex items-center gap-1"
              >
                Khám phá ngay <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Featured Case Study: Payment Error Auto-Refund */}
      <div className="rounded-3xl bg-gradient-to-r from-blue-900 via-indigo-900 to-slate-900 text-white p-8 border border-blue-800/50 shadow-md">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-3 max-w-2xl">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-500/20 text-cyan-300 text-xs font-semibold">
              <Zap className="w-3.5 h-3.5" /> Case Study Tiêu Điểm Vừa Hoàn Thành
            </div>
            <h3 className="text-2xl font-bold">Tự Động Hoàn Tiền Khi Lỗi Mạng Thanh Toán (Auto-Refund)</h3>
            <p className="text-slate-300 text-sm leading-relaxed">
              Bài toán thực chiến xử lý sự cố rớt mạng phân tán 3 bên (Client - Core - Ngân hàng). Tích hợp Idempotency Key, Fast-query Backoff (5s, 15s, 60s), Distributed Lock chống hoàn tiền kép (Double-dip), và tự động bảo vệ quyền lợi voucher khách hàng.
            </p>
          </div>
          <Link
            href="/case-studies"
            className="self-start md:self-center shrink-0 bg-white text-slate-900 font-bold px-6 py-3 rounded-xl hover:bg-slate-100 transition-colors shadow-lg flex items-center gap-2 text-sm"
          >
            Đọc hồ sơ 5 Phases <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>

      {/* Daily Golden Rules for Banking BAs */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 space-y-4">
        <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
          <ShieldCheck className="w-5 h-5 text-blue-600" />
          3 Nguyên Tắc Vàng Của Banking IT BA Chuyên Nghiệp
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs sm:text-sm text-slate-700">
          <div className="p-4 rounded-xl bg-slate-50 border border-slate-100 space-y-1">
            <p className="font-bold text-slate-900">1. Không bao giờ tin cậy số thực Float</p>
            <p className="text-slate-600 text-xs leading-relaxed">
              Mọi số tiền và số dư tài khoản bắt buộc phải dùng `DECIMAL(18,2)` hoặc `BIGINT` để triệt tiêu hoàn toàn rủi ro sai số làm tròn tiền lẻ làm lệch sổ cái ngân hàng.
            </p>
          </div>
          <div className="p-4 rounded-xl bg-slate-50 border border-slate-100 space-y-1">
            <p className="font-bold text-slate-900">2. Luôn khoá tiền trước khi gọi đối tác</p>
            <p className="text-slate-600 text-xs leading-relaxed">
              Khi gọi dịch vụ bên ngoài (Napas/Visa), luôn thực hiện `HOLD Funds` trước. Chỉ hạch toán trừ tiền thật khi có xác nhận 200 OK. Nếu timeout, đưa vào trạng thái In-Doubt.
            </p>
          </div>
          <div className="p-4 rounded-xl bg-slate-50 border border-slate-100 space-y-1">
            <p className="font-bold text-slate-900">3. Idempotency là lá chắn sống còn</p>
            <p className="text-slate-600 text-xs leading-relaxed">
              Mọi API thanh toán đều phải mang `X-Idempotency-Key` từ Client và được khoá phân tán bằng Redis để ngăn chặn tuyệt đối khách hàng bị trừ tiền 2 lần do mạng lag.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
