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
  FolderGit2
} from 'lucide-react'
import { LESSONS, Lesson, INTERVIEW_QUESTIONS } from '@/data/curriculumData'
import { useProgress } from '@/context/ProgressContext'

export default function MatrixPage() {
  const { isLessonCompleted, isLessonUnlocked, isCaseStudyUnlocked, progress } = useProgress()
  const [selectedTier, setSelectedTier] = useState<'all' | 'tier-1' | 'tier-2'>('all')

  const filteredLessons = LESSONS.filter(l => selectedTier === 'all' || l.tier === selectedTier)

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-6 border-b border-slate-200">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cyan-50 text-cyan-800 text-xs font-semibold mb-2">
            <Network className="w-3.5 h-3.5" /> Bản Đồ Kiến Trúc Thông Tin (Relational Knowledge Map)
          </div>
          <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">
            Ma Trận Quan Hệ & Luồng Mở Khóa Kiến Thức
          </h1>
          <p className="text-slate-600 text-sm mt-1">
            Hiển thị rõ ràng mối quan hệ phụ thuộc: Kiến thức tiên quyết ➔ Mở khóa ➔ Bài toán thực tế ➔ Câu hỏi phỏng vấn
          </p>
        </div>

        {/* Filter */}
        <div className="flex items-center gap-1 bg-white p-1 rounded-xl border border-slate-200 shadow-xs text-xs font-semibold">
          <button
            onClick={() => setSelectedTier('all')}
            className={`px-3 py-1.5 rounded-lg transition-colors ${
              selectedTier === 'all' ? 'bg-blue-600 text-white shadow-xs' : 'text-slate-600 hover:bg-slate-100'
            }`}
          >
            Tất Cả
          </button>
          <button
            onClick={() => setSelectedTier('tier-1')}
            className={`px-3 py-1.5 rounded-lg transition-colors ${
              selectedTier === 'tier-1' ? 'bg-blue-600 text-white shadow-xs' : 'text-slate-600 hover:bg-slate-100'
            }`}
          >
            Tầng 1 (BABOK)
          </button>
          <button
            onClick={() => setSelectedTier('tier-2')}
            className={`px-3 py-1.5 rounded-lg transition-colors ${
              selectedTier === 'tier-2' ? 'bg-blue-600 text-white shadow-xs' : 'text-slate-600 hover:bg-slate-100'
            }`}
          >
            Tầng 2 (Banking)
          </button>
        </div>
      </div>

      {/* Dependency Matrix Table */}
      <div className="space-y-4">
        {filteredLessons.map((lesson, idx) => {
          const completed = isLessonCompleted(lesson.id)
          const unlocked = isLessonUnlocked(lesson.id)

          // Find prerequisite names
          const prereqLessons = (lesson.prerequisites || []).map(pId => LESSONS.find(l => l.id === pId)).filter(Boolean)
          
          // Find unlock names
          const unlockLessons = (lesson.unlocks || []).map(uId => LESSONS.find(l => l.id === uId)).filter(Boolean)

          return (
            <div
              key={lesson.id}
              className={`bg-white rounded-3xl border transition-all p-6 sm:p-7 shadow-sm ${
                completed
                  ? 'border-emerald-200 bg-emerald-50/15'
                  : unlocked
                    ? 'border-slate-200 hover:border-blue-300'
                    : 'border-slate-200 opacity-75 bg-slate-50/50'
              }`}
            >
              <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
                {/* Col 1: Lesson Main Info */}
                <div className="lg:w-1/3 space-y-2">
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-bold uppercase px-2 py-0.5 rounded bg-slate-100 text-slate-700">
                      {lesson.tier === 'tier-1' ? 'Tầng 1 BABOK' : 'Tầng 2 Banking'}
                    </span>
                    <span className="text-[10px] font-semibold text-blue-600 bg-blue-50 px-2 py-0.5 rounded">
                      {lesson.category}
                    </span>
                    {completed ? (
                      <span className="inline-flex items-center gap-1 text-[10px] font-bold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded-full">
                        <CheckCircle2 className="w-3 h-3" /> Đã xong
                      </span>
                    ) : unlocked ? (
                      <span className="inline-flex items-center gap-1 text-[10px] font-bold text-blue-700 bg-blue-100 px-2 py-0.5 rounded-full">
                        <Unlock className="w-3 h-3" /> Sẵn sàng học
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1 text-[10px] font-bold text-slate-500 bg-slate-200 px-2 py-0.5 rounded-full">
                        <Lock className="w-3 h-3" /> Đang khoá
                      </span>
                    )}
                  </div>

                  <h3 className="font-bold text-slate-900 text-base leading-snug">
                    {idx + 1}. {lesson.title}
                  </h3>
                  <p className="text-xs text-slate-500 line-clamp-2">
                    {lesson.subtitle}
                  </p>
                </div>

                {/* Col 2: Relational Dependencies (Prerequisites & Unlocks) */}
                <div className="lg:w-1/3 grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                  {/* Prerequisites */}
                  <div className="p-3 rounded-2xl bg-slate-50 border border-slate-100 space-y-1">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1">
                      <Link2 className="w-3 h-3" /> Điều Kiện Tiên Quyết:
                    </span>
                    {prereqLessons.length > 0 ? (
                      <div className="space-y-1">
                        {prereqLessons.map(p => (
                          <div key={p?.id} className="font-medium text-slate-700 truncate" title={p?.title}>
                            • {p?.title.split('&')[0]}
                          </div>
                        ))}
                      </div>
                    ) : (
                      <span className="text-slate-400 italic">Không có (Bài mở đầu)</span>
                    )}
                  </div>

                  {/* Unlocks */}
                  <div className="p-3 rounded-2xl bg-blue-50/50 border border-blue-100 space-y-1">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-blue-500 flex items-center gap-1">
                      <Unlock className="w-3 h-3" /> Mở Khóa Tiếp Theo:
                    </span>
                    {unlockLessons.length > 0 ? (
                      <div className="space-y-1">
                        {unlockLessons.map(u => (
                          <div key={u?.id} className="font-semibold text-blue-900 truncate" title={u?.title}>
                            ➔ {u?.title.split('&')[0]}
                          </div>
                        ))}
                      </div>
                    ) : (
                      <span className="text-slate-400 italic">Bài kết khóa</span>
                    )}
                  </div>
                </div>

                {/* Col 3: Applied Real-world Case Studies & Interview questions */}
                <div className="lg:w-1/3 space-y-2 text-xs">
                  {/* Related Case Study */}
                  {lesson.relatedCaseStudies && lesson.relatedCaseStudies.length > 0 && (
                    <div className="flex items-center gap-2 p-2.5 rounded-xl bg-emerald-50/70 border border-emerald-100 text-emerald-900">
                      <FolderGit2 className="w-4 h-4 text-emerald-600 shrink-0" />
                      <div className="truncate flex-1">
                        <span className="font-bold">Case Study: </span>
                        <span>{lesson.relatedCaseStudies[0].title}</span>
                      </div>
                    </div>
                  )}

                  {/* Related Interview */}
                  {lesson.relatedInterviewIds && lesson.relatedInterviewIds.length > 0 && (
                    <div className="flex items-center gap-2 p-2.5 rounded-xl bg-purple-50/70 border border-purple-100 text-purple-900">
                      <Award className="w-4 h-4 text-purple-600 shrink-0" />
                      <div className="truncate flex-1">
                        <span className="font-bold">Phỏng Vấn: </span>
                        <span>Ngân hàng tuyển dụng thực tế</span>
                      </div>
                    </div>
                  )}

                  {/* Action Link */}
                  <div className="pt-1 flex justify-end">
                    <Link
                      href={unlocked ? `/learn/${lesson.tier}/${lesson.id}` : '#'}
                      onClick={(e) => {
                        if (!unlocked) {
                          e.preventDefault()
                          alert(`Bài học này đang bị khoá. Vui lòng hoàn thành bài học trước: ${lesson.prerequisites?.[0] || 'Bài trước'} hoặc bật 'Mở khoá tự do' ở chân sidebar!`)
                        }
                      }}
                      className={`inline-flex items-center gap-1.5 px-4 py-2 rounded-xl font-bold text-xs transition-all ${
                        unlocked
                          ? 'bg-blue-600 text-white hover:bg-blue-700 shadow-xs'
                          : 'bg-slate-200 text-slate-500 cursor-not-allowed'
                      }`}
                    >
                      {completed ? 'Xem lại bài' : unlocked ? 'Vào học ngay' : 'Đang bị khoá 🔒'}
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
