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
  Bookmark
} from 'lucide-react'
import { Lesson, LESSONS } from '@/data/curriculumData'
import { useProgress } from '@/context/ProgressContext'
import MermaidViewer from '@/components/MermaidViewer'

interface LessonViewerClientProps {
  lesson: Lesson
  markdownContent: string
}

export default function LessonViewerClient({ lesson, markdownContent }: LessonViewerClientProps) {
  const { toggleLessonComplete, isLessonCompleted, saveNote, progress } = useProgress()
  const [activeTab, setActiveTab] = useState<'content' | 'takeaways' | 'notes'>('content')
  const [userNote, setUserNote] = useState<string>(progress.notes[lesson.id] || '')
  const [isNoteSaved, setIsNoteSaved] = useState(false)

  const completed = isLessonCompleted(lesson.id)

  // Find previous and next lessons
  const currentIndex = LESSONS.findIndex(l => l.id === lesson.id)
  const prevLesson = currentIndex > 0 ? LESSONS[currentIndex - 1] : null
  const nextLesson = currentIndex < LESSONS.length - 1 ? LESSONS[currentIndex + 1] : null

  const handleSaveNote = () => {
    saveNote(lesson.id, userNote)
    setIsNoteSaved(true)
    setTimeout(() => setIsNoteSaved(false), 2000)
  }

  // Parse markdown content to separate Mermaid blocks from text blocks
  const renderContentWithMermaid = (content: string) => {
    const parts = content.split(/(```mermaid[\s\S]*?```)/g)

    return parts.map((part, index) => {
      if (part.startsWith('```mermaid')) {
        const chartCode = part.replace(/^```mermaid\n/, '').replace(/\n```$/, '')
        return <MermaidViewer key={index} chart={chartCode} />
      }

      // Convert basic markdown formatting
      return (
        <div 
          key={index}
          className="markdown-body space-y-4 text-slate-800"
          dangerouslySetInnerHTML={{ __html: formatSimpleMarkdown(part) }}
        />
      )
    })
  }

  // Simple Markdown Formatter for headings, lists, bold, blockquotes, tables
  function formatSimpleMarkdown(md: string): string {
    let html = md
      // Escape HTML entities to prevent raw injection
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')

    // Headers
    html = html.replace(/^### (.*$)/gim, '<h3 class="text-lg font-bold text-slate-900 mt-6 mb-2">$1</h3>')
    html = html.replace(/^## (.*$)/gim, '<h2 class="text-xl font-bold text-slate-900 mt-8 mb-3 pb-1 border-b border-slate-200">$1</h2>')
    html = html.replace(/^# (.*$)/gim, '<h1 class="text-2xl font-extrabold text-slate-900 mt-4 mb-4 pb-2 border-b border-slate-300">$1</h1>')

    // Bold & Italic
    html = html.replace(/\*\*(.*?)\*\*/gim, '<strong class="font-bold text-slate-900">$1</strong>')
    html = html.replace(/\*(.*?)\*/gim, '<em class="italic text-slate-800">$1</em>')

    // Code inline
    html = html.replace(/`([^`]+)`/gim, '<code class="bg-slate-100 text-blue-700 px-1.5 py-0.5 rounded text-xs font-mono border border-slate-200">$1</code>')

    // Blockquotes
    html = html.replace(/^\&gt; (.*$)/gim, '<blockquote class="border-l-4 border-blue-500 bg-blue-50/60 p-3 rounded-r my-3 text-slate-700 text-sm italic">$1</blockquote>')

    // Horizontal rule
    html = html.replace(/^---$/gim, '<hr class="my-6 border-slate-200" />')

    // Paragraphs
    html = html.replace(/\n\n/g, '</p><p class="mb-4 leading-relaxed text-[15px] text-slate-700">')

    return `<p class="mb-4 leading-relaxed text-[15px] text-slate-700">${html}</p>`
  }

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 space-y-6">
      {/* Top Navigation & Breadcrumbs */}
      <div className="flex flex-wrap items-center justify-between gap-3 text-xs text-slate-500 pb-4 border-b border-slate-200">
        <Link href="/roadmap" className="inline-flex items-center gap-1.5 hover:text-blue-600 transition-colors font-medium">
          <ArrowLeft className="w-3.5 h-3.5" /> Quay lại Lộ trình
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

      {/* Lesson Header Banner */}
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

        {/* Tab switchers */}
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
            <Edit3 className="w-4 h-4" /> Ghi Chú Của Bạn
          </button>
        </div>
      </div>

      {/* Tab 1: Full Content */}
      {activeTab === 'content' && (
        <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-10 shadow-sm space-y-6">
          {renderContentWithMermaid(markdownContent)}
        </div>
      )}

      {/* Tab 2: Key Takeaways */}
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

      {/* Tab 3: Personal Notes */}
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
