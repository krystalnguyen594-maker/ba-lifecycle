'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { 
  Network, 
  ArrowRight, 
  CheckCircle2, 
  Lock, 
  Unlock, 
  Layers, 
  Building2, 
  FileText, 
  Award, 
  Sparkles, 
  Link2, 
  FolderGit2,
  ChevronRight,
  Filter,
  Info
} from 'lucide-react'
import { LESSONS, Lesson, INTERVIEW_QUESTIONS } from '@/data/curriculumData'
import { useProgress } from '@/context/ProgressContext'

interface ConceptNode {
  id: string
  title: string
  lane: 'babok' | 'banking' | 'casestudy' | 'interview'
  laneName: string
  code: string
  prereqIds: string[]
  unlocksIds: string[]
  caseStudy?: string
  interview?: string
  href: string
}

export default function MatrixPage() {
  const { isLessonCompleted, isLessonUnlocked, isCaseStudyUnlocked, progress } = useProgress()
  const [selectedNodeId, setSelectedNodeId] = useState<string>('03_business_process_bpmn_modeling')
  const [activeLaneFilter, setActiveLaneFilter] = useState<string>('all')

  // Curated knowledge nodes with cross-cutting relational dependencies
  const KNOWLEDGE_FLOWS = [
    {
      domain: 'Thanh Toán & Chuyển Mạch (Payments & Switching Stream)',
      chain: [
        {
          phase: '1. Kỹ Thuật Nền Tảng (BABOK)',
          id: '03_business_process_bpmn_modeling',
          title: 'BPMN 2.0 & Sequence Diagram',
          desc: 'Vẽ luồng chuyển mạch 24/7 & cơ chế Hold/Commit số dư',
          href: '/learn/tier-1/03_business_process_bpmn_modeling',
          type: 'lesson'
        },
        {
          phase: '2. Nghiệp Vụ Ngân Hàng',
          id: '02_payment_switching_napas_swift',
          title: 'Napas 247 & Chuẩn ISO 8583 / 20022',
          desc: 'Cơ chế Real-time switching và Bù trừ ròng liên ngân hàng',
          href: '/learn/tier-2/02_payment_switching_napas_swift',
          type: 'lesson'
        },
        {
          phase: '3. Bài Toán Thực Chiến (Case Study)',
          id: 'cs-payment',
          title: 'Hoàn Tiền Lỗi Mạng Thanh Toán (Auto-Refund)',
          desc: 'Xử lý timeout 3 bên, Idempotency Key, Fast-query Backoff (5s, 15s, 60s)',
          href: '/case-studies/payment_network_error_refund/01_discovery_scoping',
          type: 'casestudy'
        },
        {
          phase: '4. Tuyển Dụng Ngân Hàng (STAR)',
          id: 'int-2',
          title: 'Vietcombank Digital / Techcombank',
          desc: 'Câu hỏi: Thiết kế xử lý ngoại lệ khi Napas timeout 15 giây',
          href: '/interview',
          type: 'interview'
        }
      ]
    },
    {
      domain: 'Core Banking & Sổ Cái Kế Toán (Core Ledger Stream)',
      chain: [
        {
          phase: '1. Kỹ Thuật Nền Tảng (BABOK)',
          id: '05_api_data_dictionary_spec',
          title: 'Data Dictionary & API Idempotency',
          desc: 'Kiểu dữ liệu tiền tệ DECIMAL và chống trừ tiền kép',
          href: '/learn/tier-1/05_api_data_dictionary_spec',
          type: 'lesson'
        },
        {
          phase: '2. Nghiệp Vụ Ngân Hàng',
          id: '01_core_banking_and_ledger',
          title: 'Core Banking, COA & Bút Toán Kép',
          desc: '9 loại tài khoản kế toán QĐ 479 và chu kỳ khóa sổ EOD',
          href: '/learn/tier-2/01_core_banking_and_ledger',
          type: 'lesson'
        },
        {
          phase: '3. Bài Toán Thực Chiến (Case Study)',
          id: 'cs-cashback',
          title: 'Hệ Thống Cashback Loyalty Engine',
          desc: 'Hạch toán bút toán kép chi phí khuyến mại vào sổ cái GL',
          href: '/case-studies/sample_e_wallet_cashback/README',
          type: 'casestudy'
        },
        {
          phase: '4. Tuyển Dụng Ngân Hàng (STAR)',
          id: 'int-5',
          title: 'Techcombank Core Banking',
          desc: 'Câu hỏi: Cơ chế Idempotency Key trong API tài chính ngân hàng',
          href: '/interview',
          type: 'interview'
        }
      ]
    },
    {
      domain: 'Bảo Mật & Định Danh Số (Security & Compliance Stream)',
      chain: [
        {
          phase: '1. Kỹ Thuật Nền Tảng (BABOK)',
          id: '04_user_stories_gherkin_invest',
          title: 'User Story & Gherkin AC 3 Tầng',
          desc: 'Viết kịch bản Happy, Negative và Edge Case cho Mobile App',
          href: '/learn/tier-1/04_user_stories_gherkin_invest',
          type: 'lesson'
        },
        {
          phase: '2. Nghiệp Vụ Ngân Hàng',
          id: '05_ekyc_biometrics_aml_compliance',
          title: 'eKYC NFC, Sinh Trắc Học QĐ 2345 & AML',
          desc: 'Ngưỡng chuyển tiền >= 10tr và báo cáo đáng ngờ STR',
          href: '/learn/tier-2/05_ekyc_biometrics_aml_compliance',
          type: 'lesson'
        },
        {
          phase: '3. Bài Toán Thực Chiến (Case Study)',
          id: 'cs-bill',
          title: 'Chia Bill Nhóm VietQR Napas 247',
          desc: 'Mã QR động, cầu nối liên ngân hàng và phân bổ tiền lẻ',
          href: '/case-studies/bill_splitting/01_discovery_scoping',
          type: 'casestudy'
        },
        {
          phase: '4. Tuyển Dụng Ngân Hàng (STAR)',
          id: 'int-1',
          title: 'Techcombank / MB Bank',
          desc: 'Câu hỏi: Dung hòa mâu thuẫn giữa UX tiện lợi vs Quy định bảo mật QĐ 2345',
          href: '/interview',
          type: 'interview'
        }
      ]
    }
  ]

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 pt-6 space-y-8">
      {/* Header */}
      <div className="pb-4 border-b border-slate-200/80">
        <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-blue-50 text-blue-700 text-[11px] font-semibold mb-2 border border-blue-200/60">
          <Network className="w-3.5 h-3.5" /> Kiến Trúc Quan Hệ Liên Kết (Connected DAG Matrix)
        </div>
        <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">
          Ma Trận Phụ Thuộc Kiến Thức (Relational Knowledge Streams)
        </h1>
        <p className="text-slate-600 text-xs sm:text-sm mt-1 leading-relaxed">
          Cấu trúc rõ ràng thể hiện mối liên hệ nhân quả: <strong>Kỹ Năng Nền Tảng BABOK ➔ Nghiệp Vụ Ngân Hàng ➔ Case Study Thực Tế ➔ Câu Hỏi Phỏng Vấn STAR</strong>
        </p>
      </div>

      {/* Visual Knowledge Flow Streams */}
      <div className="space-y-6">
        {KNOWLEDGE_FLOWS.map((stream, sIdx) => (
          <div 
            key={sIdx}
            className="bg-white rounded-2xl border border-slate-200/90 p-5 sm:p-6 shadow-2xs space-y-4"
          >
            {/* Stream Header */}
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-blue-600" />
                <h3 className="font-bold text-slate-900 text-sm sm:text-base">
                  {stream.domain}
                </h3>
              </div>
              <span className="text-[11px] font-semibold text-slate-400 bg-slate-50 px-2 py-0.5 rounded border border-slate-200">
                Luồng quan hệ {sIdx + 1}/3
              </span>
            </div>

            {/* 4 Connected Flow Steps */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-3 relative">
              {stream.chain.map((step, stepIdx) => {
                const isLesson = step.type === 'lesson'
                const isCase = step.type === 'casestudy'
                const isInterview = step.type === 'interview'

                let badgeColor = 'bg-blue-50 text-blue-700 border-blue-200'
                if (isCase) badgeColor = 'bg-emerald-50 text-emerald-800 border-emerald-200'
                if (isInterview) badgeColor = 'bg-purple-50 text-purple-800 border-purple-200'

                return (
                  <div key={step.id} className="relative group">
                    <Link
                      href={step.href}
                      className="block h-full p-4 rounded-xl border border-slate-200/80 bg-slate-50/50 hover:bg-white hover:border-blue-400 hover:shadow-xs transition-all space-y-2"
                    >
                      {/* Step Header */}
                      <div className="flex items-center justify-between gap-1">
                        <span className={`text-[10px] font-bold uppercase px-2 py-0.5 rounded border ${badgeColor}`}>
                          {step.phase.split('(')[0]}
                        </span>
                        <ChevronRight className="w-3.5 h-3.5 text-slate-400 group-hover:text-blue-600 transition-colors" />
                      </div>

                      {/* Title */}
                      <h4 className="font-bold text-slate-900 text-xs sm:text-sm group-hover:text-blue-700 transition-colors leading-snug">
                        {step.title}
                      </h4>

                      {/* Description */}
                      <p className="text-[11px] text-slate-500 leading-relaxed">
                        {step.desc}
                      </p>
                    </Link>

                    {/* Arrow between columns on desktop */}
                    {stepIdx < 3 && (
                      <div className="hidden md:flex absolute -right-2 top-1/2 -translate-y-1/2 z-10 w-4 h-4 rounded-full bg-white border border-slate-200 items-center justify-center text-slate-400 shadow-2xs pointer-events-none">
                        <ChevronRight className="w-3 h-3" />
                      </div>
                    )}
                  </div>
                )
              })}
            </div>
          </div>
        ))}
      </div>

      {/* Architectural Philosophy Note */}
      <div className="bg-slate-50 rounded-2xl border border-slate-200/80 p-5 text-xs text-slate-600 leading-relaxed space-y-2">
        <div className="flex items-center gap-1.5 font-bold text-slate-800">
          <Info className="w-4 h-4 text-blue-600" />
          Quy Luật Bất Biến Trong Phân Tích Nghiệp Vụ Ngân Hàng:
        </div>
        <p>
          Bạn không thể thiết kế tính năng <strong>Hoàn tiền khi lỗi mạng (Payment Auto-Refund)</strong> nếu không nắm vững <strong>Chuẩn ISO Napas 247</strong> (Tầng 2) và cơ chế <strong>Idempotency Key / Vẽ luồng BPMN 2.0</strong> (Tầng 1). Bản đồ ma trận trên giúp bạn học có trọng tâm, không bị lan man và hiểu rõ tại sao mỗi kiến thức lại cần thiết cho công việc thực tế tại Ngân hàng.
        </p>
      </div>
    </div>
  )
}
