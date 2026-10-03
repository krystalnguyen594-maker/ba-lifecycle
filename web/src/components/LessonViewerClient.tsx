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
  Lock, 
  Unlock, 
  FolderGit2, 
  Award, 
  Sparkles, 
  Link2, 
  XCircle,
  ExternalLink
} from 'lucide-react'
import { Lesson, LESSONS } from '@/data/curriculumData'
import { useProgress } from '@/context/ProgressContext'
import MarkdownRenderer from '@/components/MarkdownRenderer'

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

  const currentIndex = LESSONS.findIndex(l => l.id === lesson.id)
  const prevLesson = currentIndex > 0 ? LESSONS[currentIndex - 1] : null
  const nextLesson = currentIndex < LESSONS.length - 1 ? LESSONS[currentIndex + 1] : null

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

  // Render markdown content using proper MarkdownRenderer
  const renderContent = (content: string) => {
    return <MarkdownRenderer content={content} />
  }

  // Locked Gatekeeper Screen
  if (!unlocked) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-20 text-center space-y-6">
        <div className="w-14 h-14 rounded-2xl bg-slate-100 border border-slate-200 flex items-center justify-center mx-auto text-slate-500 shadow-2xs">
          <Lock className="w-6 h-6 text-slate-600" />
        </div>
        <div className="space-y-2">
          <span className="text-[11px] font-bold uppercase tracking-wider text-amber-700 bg-amber-50 px-2.5 py-0.5 rounded-full border border-amber-200">
            Lộ Trình Đang Khoá
          </span>
          <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">
            Bài Học Chưa Được Mở Khóa
          </h1>
          <p className="text-slate-600 text-sm max-w-md mx-auto leading-relaxed">
            Để đảm bảo tính liên kết kiến thức, bạn vui lòng hoàn thành bài học tiên quyết trước: <strong className="text-slate-900 font-semibold">{lesson.title}</strong>
          </p>
        </div>

        {prereqLessons.length > 0 && (
          <div className="p-4 rounded-xl bg-white border border-slate-200 shadow-2xs max-w-md mx-auto space-y-2 text-left">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
              <Link2 className="w-3 h-3" /> Bài học cần học trước:
            </span>
            {prereqLessons.map((p) => (
              <div key={p?.id} className="flex items-center justify-between gap-3 pt-1">
                <span className="text-xs font-bold text-slate-800 truncate">{p?.title}</span>
                <Link
                  href={`/learn/${p?.tier}/${p?.id}`}
                  className="px-3 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold shrink-0 transition-colors"
                >
                  Học bài này ngay
                </Link>
              </div>
            ))}
          </div>
        )}

        <div className="pt-2 flex items-center justify-center gap-3">
          <button
            onClick={toggleUnlockAllMode}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-xs font-semibold text-slate-600 hover:text-slate-900 bg-white border border-slate-200 hover:bg-slate-50 transition-colors shadow-2xs"
          >
            <Unlock className="w-3.5 h-3.5 text-amber-600" /> Bật mở khoá tự do
          </button>
          <Link
            href="/roadmap"
            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-xs font-semibold text-blue-600 hover:text-blue-700 hover:bg-blue-50 transition-colors"
          >
            Xem lộ trình
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 pt-6 space-y-6">
      {/* Contextual Connected Knowledge Strip */}
      <div className="bg-white rounded-xl border border-slate-200/80 p-3.5 shadow-2xs">
        <div className="flex flex-wrap items-center justify-between gap-3 text-xs">
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1 mr-1">
              <Link2 className="w-3 h-3" /> Mạng Lưới Quan Hệ:
            </span>

            {/* Unlocks Next */}
            {nextLesson && (
              <span className="inline-flex items-center gap-1 bg-blue-50 text-blue-700 px-2 py-0.5 rounded text-[11px] font-medium border border-blue-100">
                <Unlock className="w-3 h-3 text-blue-500" /> Mở: {nextLesson.title.split('&')[0]}
              </span>
            )}

            {/* Related Case Study */}
            {lesson.relatedCaseStudies && lesson.relatedCaseStudies.length > 0 && (
              <Link
                href={`/case-studies/${lesson.relatedCaseStudies[0].slug}/01_discovery_scoping`}
                className="inline-flex items-center gap-1 bg-emerald-50 text-emerald-800 hover:bg-emerald-100 px-2 py-0.5 rounded text-[11px] font-medium border border-emerald-200/60 transition-colors"
                title={lesson.relatedCaseStudies[0].reason}
              >
                <FolderGit2 className="w-3 h-3 text-emerald-600" /> Case Study: {lesson.relatedCaseStudies[0].title}
              </Link>
            )}

            {/* Related Interview */}
            {lesson.relatedInterviewIds && lesson.relatedInterviewIds.length > 0 && (
              <Link
                href="/interview"
                className="inline-flex items-center gap-1 bg-purple-50 text-purple-800 hover:bg-purple-100 px-2 py-0.5 rounded text-[11px] font-medium border border-purple-200/60 transition-colors"
              >
                <Award className="w-3 h-3 text-purple-600" /> Câu hỏi tuyển dụng STAR
              </Link>
            )}
          </div>

          <Link
            href="/matrix"
            className="text-[11px] font-semibold text-slate-500 hover:text-blue-600 flex items-center gap-1 shrink-0 ml-auto"
          >
            Mở Ma Trận <ExternalLink className="w-3 h-3" />
          </Link>
        </div>
      </div>

      {/* Lesson Header Card */}
      <div className="bg-white rounded-2xl border border-slate-200/80 p-6 sm:p-8 shadow-2xs space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
          <div className="space-y-2 flex-1">
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-bold text-blue-700 bg-blue-50 px-2 py-0.5 rounded border border-blue-200 uppercase tracking-wider">
                {lesson.category}
              </span>
              <span className="text-[11px] text-slate-400 flex items-center gap-1">
                <Clock className="w-3 h-3" /> {lesson.estimatedMinutes} phút đọc
              </span>
            </div>
            <h1 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight leading-snug">
              {lesson.title}
            </h1>
            <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
              {lesson.subtitle}
            </p>
          </div>

          {/* Toggle Complete Button */}
          <button
            onClick={() => toggleLessonComplete(lesson.id)}
            className={`inline-flex items-center gap-1.5 px-4 py-2 rounded-xl font-bold text-xs transition-all shadow-2xs shrink-0 ${
              completed
                ? 'bg-emerald-50 text-emerald-800 border border-emerald-300 hover:bg-emerald-100'
                : 'bg-blue-600 text-white hover:bg-blue-700'
            }`}
          >
            {completed ? (
              <>
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                Đã Hoàn Thành
              </>
            ) : (
              <>
                <Circle className="w-4 h-4" />
                Đánh Dấu Xong
              </>
            )}
          </button>
        </div>

        {/* Tab Switchers */}
        <div className="flex items-center gap-1 pt-3 border-t border-slate-100 text-xs">
          <button
            onClick={() => setActiveTab('content')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg font-semibold transition-colors ${
              activeTab === 'content'
                ? 'bg-slate-100 text-slate-900 font-bold'
                : 'text-slate-500 hover:text-slate-800'
            }`}
          >
            <BookOpen className="w-3.5 h-3.5" /> Bài Học
          </button>
          <button
            onClick={() => setActiveTab('takeaways')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg font-semibold transition-colors ${
              activeTab === 'takeaways'
                ? 'bg-slate-100 text-slate-900 font-bold'
                : 'text-slate-500 hover:text-slate-800'
            }`}
          >
            <Layers className="w-3.5 h-3.5" /> Điểm Cốt Lõi ({lesson.keyTakeaways.length})
          </button>
          <button
            onClick={() => setActiveTab('notes')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg font-semibold transition-colors ${
              activeTab === 'notes'
                ? 'bg-slate-100 text-slate-900 font-bold'
                : 'text-slate-500 hover:text-slate-800'
            }`}
          >
            <Edit3 className="w-3.5 h-3.5" /> Ghi Chú Cá Nhân
          </button>
        </div>
      </div>

      {/* Tab 1: Editorial Content */}
      {activeTab === 'content' && (
        <div className="bg-white rounded-2xl border border-slate-200/80 p-6 sm:p-10 shadow-2xs space-y-6">
          {renderContent(markdownContent)}

          {/* Quick Check Challenge at bottom */}
          {lesson.quickCheck && (
            <div className="mt-12 pt-6 border-t border-slate-200/70 space-y-4">
              <div className="flex items-center gap-2 text-blue-700 font-bold text-xs uppercase tracking-wider">
                <Sparkles className="w-4 h-4" /> Thử Thách Mở Khóa Tuyến Tính (Quick Check)
              </div>
              <div className="p-5 rounded-xl bg-slate-50 border border-slate-200 space-y-3">
                <p className="font-bold text-slate-900 text-sm">
                  {lesson.quickCheck.question}
                </p>

                <div className="space-y-2">
                  {lesson.quickCheck.options.map((opt, oIdx) => {
                    const isSelected = selectedOption === oIdx
                    let btnStyle = 'border-slate-200 bg-white hover:border-slate-300 text-slate-700'

                    if (quickCheckSubmitted) {
                      if (oIdx === lesson.quickCheck!.correctIndex) {
                        btnStyle = 'border-emerald-500 bg-emerald-50 text-emerald-900 font-semibold ring-1 ring-emerald-500'
                      } else if (isSelected) {
                        btnStyle = 'border-rose-400 bg-rose-50 text-rose-800 line-through'
                      } else {
                        btnStyle = 'border-slate-200 bg-white/50 text-slate-400 opacity-60'
                      }
                    } else if (isSelected) {
                      btnStyle = 'border-blue-600 bg-blue-50 text-blue-900 font-semibold ring-1 ring-blue-600'
                    }

                    return (
                      <button
                        key={oIdx}
                        disabled={quickCheckSubmitted && isQuickCheckCorrect}
                        onClick={() => setSelectedOption(oIdx)}
                        className={`w-full text-left p-3 rounded-lg border text-xs sm:text-sm transition-all flex items-start gap-2.5 ${btnStyle}`}
                      >
                        <span className="w-4 h-4 rounded-full border border-current flex items-center justify-center text-[10px] font-bold shrink-0 mt-0.5">
                          {String.fromCharCode(65 + oIdx)}
                        </span>
                        <span className="flex-1 leading-relaxed">{opt}</span>
                      </button>
                    )
                  })}
                </div>

                {!quickCheckSubmitted || !isQuickCheckCorrect ? (
                  <button
                    disabled={selectedOption === null}
                    onClick={handleQuickCheckSubmit}
                    className={`px-5 py-2 rounded-lg font-bold text-xs transition-colors ${
                      selectedOption !== null
                        ? 'bg-blue-600 hover:bg-blue-700 text-white shadow-2xs'
                        : 'bg-slate-200 text-slate-400 cursor-not-allowed'
                    }`}
                  >
                    Kiểm tra & Mở khóa bài tiếp theo
                  </button>
                ) : (
                  <div className="p-3.5 rounded-lg bg-emerald-50 border border-emerald-200 text-emerald-900 text-xs space-y-2">
                    <div className="font-bold flex items-center gap-1.5 text-emerald-800">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                      Chính xác! Đã mở khóa thành công bài học tiếp theo.
                    </div>
                    <p className="text-slate-600 text-xs leading-relaxed">
                      {lesson.quickCheck.explanation}
                    </p>
                    {nextLesson && (
                      <div className="pt-1">
                        <Link
                          href={`/learn/${nextLesson.tier}/${nextLesson.id}`}
                          className="inline-flex items-center gap-1 px-3 py-1.5 rounded-md bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-2xs transition-colors"
                        >
                          Chuyển sang bài tiếp theo <ArrowRight className="w-3 h-3" />
                        </Link>
                      </div>
                    )}
                  </div>
                )}

                {quickCheckSubmitted && !isQuickCheckCorrect && (
                  <div className="p-3 rounded-lg bg-rose-50 border border-rose-200 text-rose-800 text-xs flex items-center gap-1.5">
                    <XCircle className="w-4 h-4 text-rose-600 shrink-0" />
                    <span>Chưa đúng. Vui lòng đọc lại tài liệu và chọn lại đáp án.</span>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      )}

      {/* Tab 2: Takeaways */}
      {activeTab === 'takeaways' && (
        <div className="bg-white rounded-2xl border border-slate-200/80 p-6 sm:p-8 shadow-2xs space-y-4">
          <h2 className="text-base font-bold text-slate-900 flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-blue-600" />
            Những Điểm Cốt Lõi Cần Nhớ
          </h2>
          <div className="space-y-2.5 pt-1">
            {lesson.keyTakeaways.map((takeaway, i) => (
              <div key={i} className="flex items-start gap-3 p-3.5 rounded-xl bg-slate-50 border border-slate-100">
                <span className="w-5 h-5 rounded-full bg-blue-600 text-white text-xs font-bold flex items-center justify-center shrink-0 mt-0.5">
                  {i + 1}
                </span>
                <p className="text-xs sm:text-sm font-medium text-slate-700 leading-relaxed">
                  {takeaway}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tab 3: Notes */}
      {activeTab === 'notes' && (
        <div className="bg-white rounded-2xl border border-slate-200/80 p-6 sm:p-8 shadow-2xs space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-base font-bold text-slate-900 flex items-center gap-2">
              <Edit3 className="w-4 h-4 text-blue-600" />
              Sổ Tay Ghi Chú Cá Nhân
            </h2>
            {isNoteSaved && (
              <span className="text-xs text-emerald-600 font-semibold flex items-center gap-1">
                <Check className="w-3.5 h-3.5" /> Đã lưu
              </span>
            )}
          </div>
          <textarea
            value={userNote}
            onChange={(e) => setUserNote(e.target.value)}
            placeholder="Ghi lại các thuật ngữ mới, câu hỏi muốn tìm hiểu thêm hoặc ghi chú chuẩn bị phỏng vấn..."
            rows={8}
            className="w-full p-3.5 rounded-xl border border-slate-200 text-xs sm:text-sm focus:outline-none focus:ring-1 focus:ring-blue-600 font-sans leading-relaxed text-slate-800"
          />
          <button
            onClick={handleSaveNote}
            className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold rounded-lg shadow-2xs transition-colors"
          >
            Lưu ghi chú
          </button>
        </div>
      )}

      {/* Bottom Prev / Next Navigation Bar */}
      <div className="flex items-center justify-between pt-4 pb-12 border-t border-slate-200/70 text-xs">
        {prevLesson ? (
          <Link
            href={`/learn/${prevLesson.tier}/${prevLesson.id}`}
            className="inline-flex items-center gap-1.5 font-bold text-slate-600 hover:text-blue-600 transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Bài trước: {prevLesson.title.split('&')[0]}</span>
          </Link>
        ) : <div />}

        {nextLesson ? (
          <Link
            href={`/learn/${nextLesson.tier}/${nextLesson.id}`}
            className="inline-flex items-center gap-1.5 font-bold text-blue-600 hover:text-blue-700 transition-colors"
          >
            <span>Bài tiếp theo: {nextLesson.title.split('&')[0]}</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        ) : (
          <Link
            href="/roadmap"
            className="inline-flex items-center gap-1.5 font-bold text-emerald-600 hover:text-emerald-700 transition-colors"
          >
            <span>Hoàn thành lộ trình! Quay về Roadmap</span>
            <CheckCircle2 className="w-3.5 h-3.5" />
          </Link>
        )}
      </div>
    </div>
  )
}
