'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { 
  Award, 
  Search, 
  ChevronDown, 
  ChevronUp, 
  Bookmark, 
  BookmarkCheck, 
  Building2, 
  AlertTriangle, 
  CheckCircle2, 
  Sparkles,
  Layers,
  HelpCircle,
  FileText
} from 'lucide-react'
import { INTERVIEW_QUESTIONS, InterviewQuestion } from '@/data/curriculumData'
import { useProgress } from '@/context/ProgressContext'

export default function InterviewPage() {
  const { toggleBookmark, isBookmarked } = useProgress()
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState<string>('all')
  const [expandedId, setExpandedId] = useState<string | null>(INTERVIEW_QUESTIONS[0].id)
  const [onlyBookmarks, setOnlyBookmarks] = useState(false)

  const categories = ['all', 'Behavioral', 'Technical', 'Banking Domain']

  const filteredQuestions = INTERVIEW_QUESTIONS.filter((q) => {
    if (onlyBookmarks && !isBookmarked(q.id)) return false
    if (selectedCategory !== 'all' && q.category !== selectedCategory) return false
    if (searchTerm.trim() !== '') {
      const matchQuestion = q.question.toLowerCase().includes(searchTerm.toLowerCase())
      const matchAnswer = q.summaryAnswer.toLowerCase().includes(searchTerm.toLowerCase())
      const matchBank = q.bank.toLowerCase().includes(searchTerm.toLowerCase())
      return matchQuestion || matchAnswer || matchBank
    }
    return true
  })

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-6 border-b border-slate-200">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-purple-50 text-purple-700 text-xs font-semibold mb-2">
            <Award className="w-3.5 h-3.5" /> Luyện Thi Phỏng Vấn Ngân Hàng Lớn
          </div>
          <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">
            Banking BA Interview Trainer (STAR Method)
          </h1>
          <p className="text-slate-600 text-sm mt-1">
            Ngân hàng câu hỏi tuyển dụng thực tế từ Techcombank, Vietcombank, MB Bank, VPBank kèm gợi ý trả lời chuẩn STAR
          </p>
        </div>

        {/* Deep dive links */}
        <div className="flex items-center gap-2">
          <Link
            href="/roadmap"
            className="text-xs font-bold text-slate-600 hover:text-slate-900 px-3 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 transition-colors flex items-center gap-1"
          >
            <Layers className="w-3.5 h-3.5" /> Lộ trình
          </Link>
          <Link
            href="/quiz"
            className="text-xs font-bold text-blue-600 hover:text-blue-700 px-3 py-2 rounded-xl bg-blue-50 hover:bg-blue-100 transition-colors flex items-center gap-1"
          >
            <HelpCircle className="w-3.5 h-3.5" /> Thi trắc nghiệm
          </Link>
        </div>
      </div>

      {/* Search & Filters */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-white p-3 rounded-2xl border border-slate-200 shadow-sm">
        {/* Search Input */}
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Tìm theo ngân hàng, thuật ngữ (Napas, Idempotency)..."
            className="w-full pl-9 pr-4 py-2 rounded-xl border border-slate-200 text-xs focus:outline-none focus:ring-2 focus:ring-purple-500 text-slate-800"
          />
        </div>

        {/* Category Pills & Bookmark toggle */}
        <div className="flex items-center gap-2 w-full sm:w-auto overflow-x-auto">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-colors ${
                selectedCategory === cat
                  ? 'bg-purple-600 text-white shadow-sm'
                  : 'text-slate-600 hover:bg-slate-100'
              }`}
            >
              {cat === 'all' ? 'Tất Cả' : cat}
            </button>
          ))}
          <button
            onClick={() => setOnlyBookmarks(!onlyBookmarks)}
            className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap flex items-center gap-1 transition-colors ${
              onlyBookmarks
                ? 'bg-amber-500 text-white shadow-sm'
                : 'text-slate-600 hover:bg-slate-100 border border-slate-200'
            }`}
          >
            <Bookmark className="w-3.5 h-3.5" /> Đã lưu
          </button>
        </div>
      </div>

      {/* Questions Accordion List */}
      <div className="space-y-4">
        {filteredQuestions.map((q) => {
          const isExpanded = expandedId === q.id
          const bookmarked = isBookmarked(q.id)

          return (
            <div
              key={q.id}
              className={`bg-white rounded-3xl border transition-all shadow-sm ${
                isExpanded ? 'border-purple-300 ring-1 ring-purple-300' : 'border-slate-200 hover:border-slate-300'
              }`}
            >
              {/* Question Card Header */}
              <div
                onClick={() => setExpandedId(isExpanded ? null : q.id)}
                className="p-6 cursor-pointer flex items-start justify-between gap-4"
              >
                <div className="space-y-2 flex-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-md bg-purple-50 text-purple-700">
                      {q.category}
                    </span>
                    <span className="text-[11px] font-semibold text-slate-700 bg-slate-100 px-2 py-0.5 rounded-md flex items-center gap-1">
                      <Building2 className="w-3 h-3 text-slate-500" /> {q.bank}
                    </span>
                  </div>
                  <h3 className="text-base sm:text-lg font-bold text-slate-900 leading-snug">
                    {q.question}
                  </h3>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  <button
                    onClick={(e) => {
                      e.stopPropagation()
                      toggleBookmark(q.id)
                    }}
                    className="p-2 rounded-xl text-slate-400 hover:text-amber-500 hover:bg-slate-100 transition-colors"
                    title={bookmarked ? 'Bỏ lưu' : 'Lưu câu hỏi để ôn lại'}
                  >
                    {bookmarked ? (
                      <BookmarkCheck className="w-5 h-5 text-amber-500 fill-amber-100" />
                    ) : (
                      <Bookmark className="w-5 h-5" />
                    )}
                  </button>
                  <div className="p-2 text-slate-400">
                    {isExpanded ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
                  </div>
                </div>
              </div>

              {/* Expanded Answer Section */}
              {isExpanded && (
                <div className="px-6 pb-6 pt-2 border-t border-slate-100 space-y-5 text-xs sm:text-sm">
                  {/* Summary Answer */}
                  <div className="p-4 rounded-2xl bg-purple-50/50 border border-purple-100 text-slate-800 leading-relaxed space-y-1">
                    <p className="font-bold text-purple-900 flex items-center gap-1.5 text-xs uppercase tracking-wider">
                      <Sparkles className="w-3.5 h-3.5 text-purple-600" /> Tóm Lược Câu Trả Lời (Executive Summary)
                    </p>
                    <p>{q.summaryAnswer}</p>
                  </div>

                  {/* STAR Tips */}
                  <div className="space-y-2">
                    <h4 className="font-bold text-slate-900 flex items-center gap-1.5 text-xs uppercase tracking-wider text-slate-600">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                      Gợi Ý Triển Khai Theo Khung STAR
                    </h4>
                    <div className="grid grid-cols-1 gap-2">
                      {q.starTips.map((tip, i) => (
                        <div key={i} className="flex items-start gap-2.5 p-3 rounded-xl bg-slate-50 border border-slate-100 text-slate-700">
                          <span className="w-5 h-5 rounded-full bg-blue-100 text-blue-700 text-[10px] font-bold flex items-center justify-center shrink-0 mt-0.5">
                            {i + 1}
                          </span>
                          <p className="leading-relaxed">{tip}</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Red Flags / Mistakes */}
                  <div className="space-y-2">
                    <h4 className="font-bold text-rose-800 flex items-center gap-1.5 text-xs uppercase tracking-wider">
                      <AlertTriangle className="w-4 h-4 text-rose-600" />
                      Những Lỗi Sai Chí Mạng Cần Tránh (Red Flags)
                    </h4>
                    <ul className="list-disc list-inside space-y-1 text-rose-900/80 bg-rose-50/60 p-3.5 rounded-xl border border-rose-100">
                      {q.redFlags.map((flag, i) => (
                        <li key={i} className="leading-relaxed">{flag}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              )}
            </div>
          )
        })}

        {filteredQuestions.length === 0 && (
          <div className="text-center py-16 bg-white rounded-2xl border border-slate-200 text-slate-500">
            <Award className="w-8 h-8 mx-auto text-slate-300 mb-2" />
            <p className="font-semibold">Không tìm thấy câu hỏi phỏng vấn nào phù hợp.</p>
            <button
              onClick={() => { setSearchTerm(''); setSelectedCategory('all'); setOnlyBookmarks(false) }}
              className="mt-3 text-xs text-purple-600 font-bold hover:underline"
            >
              Đặt lại tìm kiếm
            </button>
          </div>
        )}
      </div>

      {/* 30 Q&A Full Reference Box */}
      <div className="p-6 rounded-3xl bg-slate-900 text-white space-y-3 shadow-md">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <h3 className="font-bold text-lg flex items-center gap-2">
              <FileText className="w-5 h-5 text-cyan-400" />
              Sổ Tay 30 Câu Hỏi Phỏng Vấn Ngân Hàng Đầy Đủ
            </h3>
            <p className="text-slate-300 text-xs">
              Đọc bản tài liệu hoàn chỉnh bao quát 5 nhóm: Thanh toán, Core Banking, Thẻ, Cho vay số, eKYC & AML tại:
            </p>
            <p className="font-mono text-cyan-300 text-xs">
              curriculum/interview_prep/03_banking_domain_questions.md
            </p>
          </div>
          <Link
            href="/roadmap"
            className="self-start sm:self-center shrink-0 bg-white text-slate-900 font-bold px-5 py-2.5 rounded-xl hover:bg-slate-100 transition-colors text-xs"
          >
            Mở toàn bộ giáo trình
          </Link>
        </div>
      </div>
    </div>
  )
}
