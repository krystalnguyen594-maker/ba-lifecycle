'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { 
  FolderGit2, 
  FileText, 
  ArrowRight, 
  CheckCircle2, 
  Clock, 
  Sparkles, 
  Layers, 
  ShieldAlert, 
  ChevronRight,
  ExternalLink
} from 'lucide-react'

interface CaseStudy {
  slug: string
  title: string
  subtitle: string
  domain: string
  techStack: string[]
  phases: {
    number: string
    file: string
    title: string
    summary: string
  }[]
}

const CASE_STUDIES: CaseStudy[] = [
  {
    slug: 'payment_network_error_refund',
    title: 'Tự Động Hoàn Tiền Khi Lỗi Mạng Thanh Toán (Payment Network Error Auto-Refund)',
    subtitle: 'Giải quyết bài toán bất đối xứng mạng phân tán 3 bên: Client - Internal Core - Cổng Thanh Toán (Bank/PG)',
    domain: 'Payment Systems & Distributed Architecture',
    techStack: ['Idempotency Key', 'Fast-Query Backoff (5s, 15s, 60s)', 'Redis Distributed Lock', 'Transaction State Machine', 'Voucher Auto-Extension'],
    phases: [
      {
        number: 'Phase 1',
        file: '01_discovery_scoping.md',
        title: 'Discovery & Scoping (BABOK v3 Strategy Analysis)',
        summary: 'First Principles về rớt mạng viễn thông, bảng 5W1H, Khung BACCM, Stakeholder RACI và Scope In/Out MVP.'
      },
      {
        number: 'Phase 2',
        file: '02_elicitation_grill.md',
        title: 'Elicitation & Collaboration (Inversion Thinking & Grill Decisions)',
        summary: 'Pre-Mortem thất thoát đối soát, Ngân hàng câu hỏi 4 phòng ban, Quyết định hoàn tiền về tài khoản nguồn và giữ tồn kho 15 phút.'
      },
      {
        number: 'Phase 3',
        file: '03_analysis_modeling.md',
        title: 'Analysis & Design Definition (Modeling, Stories & Specs)',
        summary: 'Feynman ELI5 anh bồi bàn, Sequence Diagram & State Machine Mermaid, INVEST Stories, Gherkin AC, Data Dictionary & REST API Spec.'
      },
      {
        number: 'Phase 4',
        file: '04_delivery_verification.md',
        title: 'Requirements Life Cycle Management (Delivery & Verification)',
        summary: '2nd-Order Thinking chống nghẽn Cổng PG, Sprint Backlog MoSCoW, Ma trận kiểm thử biên QA Edge Cases, Kịch bản UAT và Change Request.'
      },
      {
        number: 'Phase 5',
        file: '05_solution_evaluation.md',
        title: 'Solution Evaluation (Metrics Tree & Telemetry Tracking)',
        summary: 'Cây chỉ số North Star (Zero-touch >= 98.5%), HEART Framework, Telemetry Funnel Tracking và Kế hoạch giám sát D+7/D+30.'
      }
    ]
  },
  {
    slug: 'bill_splitting',
    title: 'Chia Hoá Đơn Nhóm Qua QR Code (Group Bill Splitting via QR)',
    subtitle: 'Xoá bỏ rào cản tâm lý ngại nhắc nợ sau các bữa ăn uống, tích hợp cầu nối VietQR 247 và tăng trưởng K-Factor',
    domain: 'P2P Payments & Social Growth Loop',
    techStack: ['Remainder Distribution Algorithm', 'WebSocket Real-time Room', 'Dynamic VietQR 247', '1-Touch Pay'],
    phases: [
      {
        number: 'Phase 1',
        file: '01_discovery_scoping.md',
        title: 'Discovery & Scoping',
        summary: 'Phân tích Social Friction, 5W1H và cơ hội Viral Loop K-factor > 1.35.'
      },
      {
        number: 'Phase 2',
        file: '02_elicitation_grill.md',
        title: 'Elicitation & Grill Decisions',
        summary: 'Pre-Mortem lỗi tiền lẻ không chia hết, Thuật toán Remainder Distribution và Cầu nối VietQR cho người chưa có app.'
      },
      {
        number: 'Phase 3',
        file: '03_analysis_modeling.md',
        title: 'Analysis & Solution Modeling',
        summary: 'Sơ đồ luồng chia đều và chia theo món, Real-time Room State Machine, INVEST Stories và API Room Spec.'
      },
      {
        number: 'Phase 4',
        file: '04_delivery_verification.md',
        title: 'Delivery & QA Verification',
        summary: 'Sprint Backlog, Ma trận kiểm thử đồng thời (Concurrency 10 người cùng thanh toán), UAT checklist.'
      },
      {
        number: 'Phase 5',
        file: '05_solution_evaluation.md',
        title: 'Solution Evaluation & Analytics',
        summary: 'Đo lường hệ số K-Factor lan truyền, Tần suất giao dịch P2P nội bộ, CSAT chia tiền nhóm.'
      }
    ]
  },
  {
    slug: 'sample_e_wallet_cashback',
    title: 'Hệ Thống Hoàn Tiền Tiêu Dùng Số (Loyalty Cashback Rules Engine)',
    subtitle: 'Thiết kế hệ thống khuyến mại hoàn tiền tự động, kiểm soát trần ngân sách và ngăn chặn trục lợi gian lận',
    domain: 'Loyalty & Promotion Finance',
    techStack: ['Rule Engine', 'Anti-Sybil Attack', 'Real-time Budget Quota', 'GL Promotion Accounting'],
    phases: [
      {
        number: 'Phases 1-5',
        file: 'README.md',
        title: 'Tài liệu sáng kiến mẫu',
        summary: 'Mô hình mẫu hồ sơ phân tích nghiệp vụ chương trình Loyalty & Promotion cho Ví điện tử/Ngân hàng số.'
      }
    ]
  }
]

export default function CaseStudiesPage() {
  const [selectedCase, setSelectedCase] = useState<CaseStudy>(CASE_STUDIES[0])

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 space-y-8">
      {/* Header */}
      <div className="pb-6 border-b border-slate-200">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 text-xs font-semibold mb-2">
          <FolderGit2 className="w-3.5 h-3.5" /> Thư Viện Case Studies Thực Chiến
        </div>
        <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">
          Các Bài Toán Ngân Hàng Số Thực Tế (Docs-as-Code)
        </h1>
        <p className="text-slate-600 text-sm mt-1">
          Hồ sơ phân tích chi tiết đầy đủ 5 phases chuẩn BABOK v3, sẵn sàng cho Dev và QA triển khai
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Column: Case Study Picker (4 cols) */}
        <div className="lg:col-span-4 space-y-4">
          <h2 className="text-xs font-bold uppercase tracking-wider text-slate-500 px-1">
            Chọn Case Study
          </h2>
          {CASE_STUDIES.map((cs) => {
            const isSelected = selectedCase.slug === cs.slug
            return (
              <button
                key={cs.slug}
                onClick={() => setSelectedCase(cs)}
                className={`w-full text-left p-5 rounded-2xl border transition-all ${
                  isSelected
                    ? 'bg-blue-50/70 border-blue-400 shadow-sm ring-1 ring-blue-400'
                    : 'bg-white border-slate-200 hover:border-slate-300 hover:bg-slate-50'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[10px] font-bold uppercase px-2 py-0.5 rounded bg-blue-100 text-blue-800">
                    {cs.domain.split('&')[0]}
                  </span>
                  <ChevronRight className={`w-4 h-4 ${isSelected ? 'text-blue-600' : 'text-slate-400'}`} />
                </div>
                <h3 className="font-bold text-slate-900 text-sm mb-1.5 leading-snug">
                  {cs.title}
                </h3>
                <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed">
                  {cs.subtitle}
                </p>
              </button>
            )
          })}
        </div>

        {/* Right Column: Case Study Details & 5 Phases (8 cols) */}
        <div className="lg:col-span-8 space-y-6">
          {/* Header Card */}
          <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-sm space-y-4">
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-xs font-bold px-3 py-1 rounded-full bg-emerald-100 text-emerald-800">
                {selectedCase.domain}
              </span>
              <span className="text-xs text-slate-500 font-mono">
                initiatives/{selectedCase.slug}/
              </span>
            </div>

            <h2 className="text-2xl font-extrabold text-slate-900">
              {selectedCase.title}
            </h2>
            <p className="text-sm text-slate-600 leading-relaxed">
              {selectedCase.subtitle}
            </p>

            {/* Tech chips */}
            <div className="pt-2">
              <p className="text-xs font-semibold text-slate-500 mb-2">Công nghệ & Kỹ thuật BA áp dụng:</p>
              <div className="flex flex-wrap gap-1.5">
                {selectedCase.techStack.map((tech) => (
                  <span key={tech} className="text-[11px] bg-slate-100 text-slate-700 px-2.5 py-1 rounded-lg border border-slate-200 font-medium">
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* 5 Phases Deliverables List */}
          <div className="space-y-4">
            <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
              <Layers className="w-4 h-4 text-blue-600" />
              Bộ Hồ Sơ 5 Phases Bàn Giao (Docs-as-Code)
            </h3>

            {selectedCase.phases.map((phase) => (
              <div
                key={phase.file}
                className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm hover:border-blue-300 transition-colors"
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="space-y-1.5 flex-1">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold text-blue-600 bg-blue-50 px-2 py-0.5 rounded-md">
                        {phase.number}
                      </span>
                      <span className="text-xs font-mono text-slate-400">
                        {phase.file}
                      </span>
                    </div>
                    <h4 className="font-bold text-slate-900 text-base">
                      {phase.title}
                    </h4>
                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                      {phase.summary}
                    </p>
                  </div>

                  <Link
                    href={`/case-studies/${selectedCase.slug}/${phase.file.replace('.md', '')}`}
                    className="inline-flex items-center gap-1 text-xs font-bold text-blue-600 hover:text-blue-700 px-3 py-2 rounded-xl bg-blue-50 hover:bg-blue-100 transition-colors shrink-0"
                  >
                    Xem chi tiết <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
