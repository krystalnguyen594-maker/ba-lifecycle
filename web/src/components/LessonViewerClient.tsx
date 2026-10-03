'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { 
  CheckCircle2, 
  Circle, 
  ArrowLeft, 
  ArrowRight, 
  BookOpen, 
  Clock, 
  Check, 
  Edit3, 
  Layers, 
  Share2,
  Bookmark,
  Lock,
  Unlock,
  AlertTriangle,
  FolderGit2,
  Award,
  Sparkles,
  Link2,
  XCircle
} from 'lucide-react'
import { Lesson, LESSONS } from '@/data/curriculumData'
import { useProgress } from '@/context/ProgressContext'
import MermaidViewer from '@/components/MermaidViewer'

interface LessonViewerClientProps {
  lesson: Lesson
  markdownContent: string
}

export default function LessonViewerClient({ lesson, markdownContent }: LessonViewerClientProps) {
  const { 
    toggleLessonComplete, 
    isLessonCompleted, 
    isLessonUnlocked, 
    passQuickCheck,
    isQuickCheckPassed,
    toggleUnlockAllMode,
    saveNote, 
    progress 
  } = useProgress()

  const [activeTab, setActiveTab] = useState<'content' | 'takeaways' | 'notes'>('content')
  const [userNote, setUserNote] = useState<string>(progress.notes[lesson.id] || '')
  const [isNoteSaved, setIsNoteSaved] = useState(false)

  // Quick check state
  const [selectedOption, setSelectedOption] = useState<number | null>(null)
  const [quickCheckSubmitted, setQuickCheckSubmitted] = useState(isQuickCheckPassed(lesson.id))
  const [isQuickCheckCorrect, setIsQuickCheckCorrect] = useState(isQuickCheckPassed(lesson.id))

  const completed = isLessonCompleted(lesson.id)
  const unlocked = isLessonUnlocked(lesson.id)

  // Find previous and next lessons
  const currentIndex = LESSONS.findIndex(l => l.id === lesson.id)
  const prevLesson = currentIndex > 0 ? LESSONS[currentIndex - 1] : null
  const nextLesson = currentIndex < LESSONS.length - 1 ? LESSONS[currentIndex + 1] : null

  // Prerequisite lessons objects
  const prereqLessons = (lesson.prerequisites || []).map(pId => LESSONS.find(l => l.id === pId)).filter(Boolean)

  const handleSaveNote = () => {
    saveNote(lesson.id, userNote)
    setIsNoteSaved(true)
    setTimeout(() => setIsNoteSaved(false), 2000)
  }

  const handleQuickCheckSubmit = () => {
    if (selectedOption === null || !lesson.quickCheck) return
    const correct = selectedOption === lesson.quickCheck.correctIndex
    setIsQuickCheckCorrect(correct)
    setQuickCheckSubmitted(true)

    if (correct) {
      passQuickCheck(lesson.id)
    }
  }

  // Parse markdown content to separate Mermaid blocks from text blocks
  const renderContentWithMermaid = (content: string) => {
    const parts = content.split(/(```mermaid[\s\S]*?```)/g)

    return parts.map((part, index) => {
      if (part.startsWith('```mermaid')) {
        const chartCode = part.replace(/^```mermaid\n/, '').replace(/\n```$/, '')
        return <MermaidViewer key={index} chart={chartCode} />
      }

      return (
        <div 
          key={index}
          className="markdown-body space-y-4 text-slate-800"
          dangerouslySetInnerHTML={{ __html: formatSimpleMarkdown(part) }}
        />
      )
    })
  }

  function formatSimpleMarkdown(md: string): string {
    let html = md
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')

    html = html.replace(/^### (.*$)/gim, '<h3 class="text-lg font-bold text-slate-900 mt-6 mb-2">$1</h3>')
    html = html.replace(/^## (.*$)/gim, '<h2 class="text-xl font-bold text-slate-900 mt-8 mb-3 pb-1 border-b border-slate-200">$1</h2>')
    html = html.replace(/^# (.*$)/gim, '<h1 class="text-2xl font-extrabold text-slate-900 mt-4 mb-4 pb-2 border-b border-slate-300">$1</h1>')

    html = html.replace(/\*\*(.*?)\*\*/gim, '<strong class="font-bold text-slate-900">$1</strong>')
    html = html.replace(/\*(.*?)\*/gim, '<em class="italic text-slate-800">$1</em>')
    html = html.replace(/`([^`]+)`/gim, '<code class="bg-slate-100 text-blue-700 px-1.5 py-0.5 rounded text-xs font-mono border border-slate-200">$1</code>')
    html = html.replace(/^\&gt; (.*$)/gim, '<blockquote class="border-l-4 border-blue-500 bg-blue-50/60 p-3 rounded-r my-3 text-slate-700 text-sm italic">$1</blockquote>')
    html = html.replace(/^---$/gim, '<hr class="my-6 border-slate-200" />')
    html = html.replace(/\n\n/g, '</p><p class="mb-4 leading-relaxed text-[15px] text-slate-700">')

    return `<p class="mb-4 leading-relaxed text-[15px] text-slate-700">${html}</p>`
  }

  // If lesson is locked, show Locked Gatekeeper Screen
  if (!unlocked) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-16 text-center space-y-6">
        <div className="w-16 h-16 rounded-3xl bg-slate-100 text-slate-500 border border-slate-200 flex items-center justify-center mx-auto shadow-inner">
          <Lock className="w-8 h-8 text-slate-600" />
        </div>
        <div className="space-y-2">
          <span className="text-xs font-bold uppercase tracking-wider text-amber-600 bg-amber-50 px-3 py-1 rounded-full border border-amber-200">
            Lộ Trình Tuyến Tính Đang Khoá
          </span>
          <h1 className="text-2xl font-extrabold text-slate-900">
            Bài Học Này Đang Bị Khoá
          </h1>
          <p className="text-slate-600 text-sm max-w-lg mx-auto leading-relaxed">
            Để đảm bảo nắm vững kiến thức từ gốc, bạn cần hoàn thành bài học tiên quyết trước khi mở bài: <strong className="text-slate-900 font-semibold">{lesson.title}</strong>
          </p>
        </div>

        {/* Prerequisite Link */}
        {prereqLessons.length > 0 && (
          <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-sm max-w-md mx-auto space-y-3 text-left">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider flex items-center gap-1.5">
              <Link2 className="w-3.5 h-3.5" /> Bài học cần hoàn thành trước:
            </span>
            {prereqLessons.map((p) => (
              <div key={p?.id} className="flex items-center justify-between gap-3">
                <span className="text-sm font-bold text-slate-800 truncate">{p?.title}</span>
                <Link
                  href={`/learn/${p?.tier}/${p?.id}`}
                  className="px-3 py-1.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold shrink-0 transition-colors"
                >
                  Học bài này ngay
                </Link>
              </div>
            ))}
          </div>
        )}

        {/* Or Unlock All */}
        <div className="pt-4 flex items-center justify-center gap-3">
          <button
            onClick={toggleUnlockAllMode}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold text-slate-600 hover:text-slate-900 bg-slate-100 hover:bg-slate-200 transition-colors"
          >
            <Unlock className="w-4 h-4 text-amber-500" /> Bật chế độ "Mở khoá tự do" để đọc ngay
          </button>
          <Link
            href="/roadmap"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold text-blue-600 hover:text-blue-700 hover:bg-blue-50 transition-colors"
          >
            Quay lại Lộ trình
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 space-y-6">
      {/* Top Breadcrumb & Metadata */}
      <div className="flex flex-wrap items-center justify-between gap-3 text-xs text-slate-500 pb-3 border-b border-slate-200">
        <Link href="/roadmap" className="inline-flex items-center gap-1.5 hover:text-blue-600 transition-colors font-medium">
          <ArrowLeft className="w-3.5 h-3.5" /> Lộ trình & Checklist
        </Link>
        <div className="flex items-center gap-2">
          <span className="font-semibold text-slate-700 bg-slate-100 px-2.5 py-1 rounded-md">
            {lesson.tier === 'tier-1' ? 'Tầng 1: BABOK Foundation' : 'Tầng 2: Banking Domain'}
          </span>
          <span className="text-slate-400">•</span>
          <span className="flex items-center gap-1">
            <Clock className="w-3.5 h-3.5" /> {lesson.estimatedMinutes} phút đọc
          </span>
        </div>
      </div>

      {/* Relational Knowledge Graph Banner (Cấu Trúc Quan Hệ Liên Kết) */}
      <div className="bg-gradient-to-r from-blue-900 via-indigo-900 to-slate-900 text-white rounded-3xl p-5 sm:p-6 shadow-sm space-y-3">
        <div className="flex items-center justify-between text-xs text-cyan-300 font-bold uppercase tracking-wider">
          <span className="flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5" /> Mạng Lưới Quan Hệ Của Bài Học Này
          </span>
          <Link href="/matrix" className="hover:underline flex items-center gap-1 text-[11px] text-slate-300">
            Xem toàn bộ Ma Trận <ArrowRight className="w-3 h-3" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 text-xs">
          {/* Unlocks Next */}
          <div className="p-3 rounded-2xl bg-white/10 border border-white/10 space-y-1">
            <span className="text-[10px] font-bold uppercase tracking-wider text-cyan-300 flex items-center gap-1">
              <Unlock className="w-3 h-3" /> Mở Khóa Tiếp Theo:
            </span>
            <p className="font-semibold text-white">
              {nextLesson ? nextLesson.title.split('&')[0] : 'Bài học cuối Tầng'}
            </p>
          </div>

          {/* Related Case Study */}
          {lesson.relatedCaseStudies && lesson.relatedCaseStudies.length > 0 ? (
            <Link
              href={`/case-studies/${lesson.relatedCaseStudies[0].slug}/01_discovery_scoping`}
              className="p-3 rounded-2xl bg-emerald-500/20 border border-emerald-400/30 hover:bg-emerald-500/30 transition-colors space-y-1 block"
            >
              <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-300 flex items-center gap-1">
                <FolderGit2 className="w-3 h-3" /> Case Study Thực Tế:
              </span>
              <p className="font-semibold text-white truncate">
                {lesson.relatedCaseStudies[0].title}
              </p>
            </Link>
          ) : (
            <div className="p-3 rounded-2xl bg-white/5 border border-white/5 text-slate-400 space-y-1">
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Case Study:</span>
              <p className="italic">Nền tảng kiến thức lõi</p>
            </div>
          )}

          {/* Related Interview */}
          <Link
            href="/interview"
            className="p-3 rounded-2xl bg-purple-500/20 border border-purple-400/30 hover:bg-purple-500/30 transition-colors space-y-1 block sm:col-span-2 lg:col-span-1"
          >
            <span className="text-[10px] font-bold uppercase tracking-wider text-purple-300 flex items-center gap-1">
              <Award className="w-3 h-3" /> Câu Hỏi Tuyển Dụng:
            </span>
            <p className="font-semibold text-white truncate">
              {lesson.relatedInterviewIds && lesson.relatedInterviewIds.length > 0 ? 'Phỏng Vấn Ngân Hàng Lớn' : 'Luyện STAR Trainer'}
            </p>
          </Link>
        </div>
      </div>

      {/* Lesson Header Card */}
      <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-sm space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
          <div className="space-y-2 flex-1">
            <div className="inline-flex items-center gap-1 text-xs font-bold text-blue-600 bg-blue-50 px-2.5 py-1 rounded-full uppercase tracking-wider">
              {lesson.category}
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight leading-snug">
              {lesson.title}
            </h1>
            <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
              {lesson.subtitle}
            </p>
          </div>

          {/* Toggle Complete Button */}
          <button
            onClick={() => toggleLessonComplete(lesson.id)}
            className={`inline-flex items-center gap-2 px-5 py-3 rounded-2xl font-bold text-xs sm:text-sm transition-all shadow-sm shrink-0 ${
              completed
                ? 'bg-emerald-100 text-emerald-800 border border-emerald-300 hover:bg-emerald-200'
                : 'bg-blue-600 text-white hover:bg-blue-700 shadow-blue-500/20'
            }`}
          >
            {completed ? (
              <>
                <CheckCircle2 className="w-5 h-5 text-emerald-600 fill-emerald-100" />
                Đã Hoàn Thành
              </>
            ) : (
              <>
                <Circle className="w-5 h-5" />
                Đánh Dấu Đã Học Xong
              </>
            )}
          </button>
        </div>

        {/* Tab Switchers */}
        <div className="flex items-center gap-2 pt-4 border-t border-slate-100">
          <button
            onClick={() => setActiveTab('content')}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-colors ${
              activeTab === 'content'
                ? 'bg-blue-50 text-blue-700 shadow-sm'
                : 'text-slate-600 hover:bg-slate-100'
            }`}
          >
            <BookOpen className="w-4 h-4" /> Nội Dung Bài Học
          </button>
          <button
            onClick={() => setActiveTab('takeaways')}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-colors ${
              activeTab === 'takeaways'
                ? 'bg-blue-50 text-blue-700 shadow-sm'
                : 'text-slate-600 hover:bg-slate-100'
            }`}
          >
            <Layers className="w-4 h-4" /> Điểm Cốt Lõi ({lesson.keyTakeaways.length})
          </button>
          <button
            onClick={() => setActiveTab('notes')}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-colors ${
              activeTab === 'notes'
                ? 'bg-blue-50 text-blue-700 shadow-sm'
                : 'text-slate-600 hover:bg-slate-100'
            }`}
          >
            <Edit3 className="w-4 h-4" /> Ghi Chú Cá Nhân
          </button>
        </div>
      </div>

      {/* Tab 1: Content */}
      {activeTab === 'content' && (
        <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-10 shadow-sm space-y-8">
          {renderContentWithMermaid(markdownContent)}

          {/* Quick Check Challenge Box at Bottom of Lesson */}
          {lesson.quickCheck && (
            <div className="mt-12 pt-8 border-t-2 border-slate-100 space-y-5">
              <div className="flex items-center gap-2 text-indigo-700 font-extrabold text-sm uppercase tracking-wider">
                <Sparkles className="w-4 h-4" /> Thử Thách Mở Khóa Tuyến Tính (Quick Check Challenge)
              </div>
              <div className="p-6 rounded-3xl bg-indigo-50/60 border border-indigo-200 space-y-4">
                <p className="font-bold text-slate-900 text-sm sm:text-base">
                  {lesson.quickCheck.question}
                </p>

                {/* Option list */}
                <div className="space-y-2">
                  {lesson.quickCheck.options.map((opt, oIdx) => {
                    const isSelected = selectedOption === oIdx
                    let btnStyle = 'border-slate-200 bg-white hover:border-indigo-300 text-slate-700'

                    if (quickCheckSubmitted) {
                      if (oIdx === lesson.quickCheck!.correctIndex) {
                        btnStyle = 'border-emerald-500 bg-emerald-50 text-emerald-900 font-semibold ring-1 ring-emerald-500'
                      } else if (isSelected) {
                        btnStyle = 'border-rose-500 bg-rose-50 text-rose-900 line-through'
                      } else {
                        btnStyle = 'border-slate-200 bg-white/50 text-slate-400'
                      }
                    } else if (isSelected) {
                      btnStyle = 'border-indigo-600 bg-indigo-50 text-indigo-900 font-semibold ring-1 ring-indigo-500'
                    }

                    return (
                      <button
                        key={oIdx}
                        disabled={quickCheckSubmitted && isQuickCheckCorrect}
                        onClick={() => setSelectedOption(oIdx)}
                        className={`w-full text-left p-3.5 rounded-2xl border text-xs sm:text-sm transition-all flex items-start gap-3 ${btnStyle}`}
                      >
                        <span className="w-5 h-5 rounded-full border border-current flex items-center justify-center text-[10px] font-bold shrink-0 mt-0.5">
                          {String.fromCharCode(65 + oIdx)}
                        </span>
                        <span className="flex-1 leading-relaxed">{opt}</span>
                      </button>
                    )
                  })}
                </div>

                {/* Submit button or Success Feedback */}
                {!quickCheckSubmitted || !isQuickCheckCorrect ? (
                  <button
                    disabled={selectedOption === null}
                    onClick={handleQuickCheckSubmit}
                    className={`px-6 py-2.5 rounded-xl font-bold text-xs transition-colors ${
                      selectedOption !== null
                        ? 'bg-indigo-600 hover:bg-indigo-700 text-white shadow-sm'
                        : 'bg-slate-200 text-slate-400 cursor-not-allowed'
                    }`}
                  >
                    Kiểm tra đáp án & Mở khóa bài tiếp theo
                  </button>
                ) : (
                  <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-900 text-xs sm:text-sm space-y-2">
                    <div className="font-bold flex items-center gap-1.5 text-emerald-800">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                      🎉 Chính xác! Bạn đã hoàn thành bài học và mở khóa nội dung tiếp theo!
                    </div>
                    <p className="text-slate-700 text-xs leading-relaxed">
                      {lesson.quickCheck.explanation}
                    </p>
                    {nextLesson && (
                      <div className="pt-2">
                        <Link
                          href={`/learn/${nextLesson.tier}/${nextLesson.id}`}
                          className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-sm transition-colors"
                        >
                          Chuyển sang bài tiếp theo: {nextLesson.title.split('&')[0]} <ArrowRight className="w-3.5 h-3.5" />
                        </Link>
                      </div>
                    )}
                  </div>
                )}

                {/* Incorrect alert */}
                {quickCheckSubmitted && !isQuickCheckCorrect && (
                  <div className="p-4 rounded-2xl bg-rose-50 border border-rose-200 text-rose-900 text-xs space-y-2">
                    <div className="font-bold flex items-center gap-1.5">
                      <XCircle className="w-4 h-4 text-rose-600" />
                      Chưa chính xác! Bạn vui lòng đọc lại tài liệu và chọn lại đáp án để mở khoá.
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      )}

      {/* Tab 2: Takeaways */}
      {activeTab === 'takeaways' && (
        <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-sm space-y-4">
          <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
            <CheckCircle2 className="w-5 h-5 text-blue-600" />
            Những Kiến Thức Cốt Lõi Bạn Cần Khắc Cốt Ghi Tâm
          </h2>
          <div className="space-y-3 pt-2">
            {lesson.keyTakeaways.map((takeaway, i) => (
              <div key={i} className="flex items-start gap-3 p-4 rounded-2xl bg-blue-50/50 border border-blue-100">
                <span className="w-6 h-6 rounded-full bg-blue-600 text-white text-xs font-bold flex items-center justify-center shrink-0 mt-0.5">
                  {i + 1}
                </span>
                <p className="text-sm font-medium text-slate-800 leading-relaxed">
                  {takeaway}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tab 3: Notes */}
      {activeTab === 'notes' && (
        <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-sm space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
              <Edit3 className="w-5 h-5 text-indigo-600" />
              Sổ Tay Ghi Chú Cá Nhân (Lưu tự động vào LocalStorage)
            </h2>
            {isNoteSaved && (
              <span className="text-xs text-emerald-600 font-semibold flex items-center gap-1">
                <Check className="w-3.5 h-3.5" /> Đã lưu ghi chú
              </span>
            )}
          </div>
          <textarea
            value={userNote}
            onChange={(e) => setUserNote(e.target.value)}
            placeholder="Ghi lại các thuật ngữ mới, câu hỏi muốn tìm hiểu thêm hoặc ghi chú chuẩn bị phỏng vấn..."
            rows={8}
            className="w-full p-4 rounded-2xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 font-sans leading-relaxed text-slate-800"
          />
          <button
            onClick={handleSaveNote}
            className="px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold rounded-xl shadow-sm transition-colors"
          >
            Lưu ghi chú bài học
          </button>
        </div>
      )}

      {/* Bottom Prev / Next Navigation Bar */}
      <div className="flex items-center justify-between pt-6 pb-12 border-t border-slate-200">
        {prevLesson ? (
          <Link
            href={`/learn/${prevLesson.tier}/${prevLesson.id}`}
            className="inline-flex items-center gap-2 text-xs sm:text-sm font-bold text-slate-700 hover:text-blue-600 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Bài trước: {prevLesson.title.split('&')[0]}</span>
          </Link>
        ) : <div />}

        {nextLesson ? (
          <Link
            href={`/learn/${nextLesson.tier}/${nextLesson.id}`}
            className="inline-flex items-center gap-2 text-xs sm:text-sm font-bold text-blue-600 hover:text-blue-700 transition-colors"
          >
            <span>Bài tiếp theo: {nextLesson.title.split('&')[0]}</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        ) : (
          <Link
            href="/roadmap"
            className="inline-flex items-center gap-2 text-xs sm:text-sm font-bold text-emerald-600 hover:text-emerald-700 transition-colors"
          >
            <span>Hoàn thành lộ trình! Quay về Roadmap</span>
            <CheckCircle2 className="w-4 h-4" />
          </Link>
        )}
      </div>
    </div>
  )
}
