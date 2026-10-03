'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { 
  CheckCircle2, 
  Circle, 
  Clock, 
  ArrowRight, 
  Filter, 
  Layers, 
  Building2, 
  Sparkles,
  BookOpen
} from 'lucide-react'
import { useProgress } from '@/context/ProgressContext'
import { LESSONS, TIER_INFO, Lesson } from '@/data/curriculumData'

export default function RoadmapPage() {
  const { toggleLessonComplete, isLessonCompleted, completionPercentage, completedCount, totalLessons } = useProgress()
  const [selectedTier, setSelectedTier] = useState<string>('all')
  const [statusFilter, setStatusFilter] = useState<'all' | 'completed' | 'pending'>('all')

  const filteredLessons = LESSONS.filter((lesson) => {
    if (selectedTier !== 'all' && lesson.tier !== selectedTier) return false
    const completed = isLessonCompleted(lesson.id)
    if (statusFilter === 'completed' && !completed) return false
    if (statusFilter === 'pending' && completed) return false
    return true
  })

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-6 border-b border-slate-200">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 text-blue-700 text-xs font-semibold mb-2">
            <Layers className="w-3.5 h-3.5" /> Lộ Trình & Bản Đồ Kiến Thức
          </div>
          <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">
            Lộ Trình Banking IT Business Analyst
          </h1>
          <p className="text-slate-600 text-sm mt-1">
            Đánh dấu các bài học bạn đã hoàn thành để theo dõi tiến độ chuẩn bị apply ngân hàng
          </p>
        </div>

        {/* Progress summary widget */}
        <div className="flex items-center gap-4 bg-white px-5 py-3 rounded-2xl border border-slate-200 shadow-sm">
          <div className="text-right">
            <div className="text-xs font-semibold text-slate-500">Tiến độ học tập</div>
            <div className="text-xl font-extrabold text-blue-600">{completionPercentage}%</div>
          </div>
          <div className="w-24 bg-slate-100 rounded-full h-2.5 overflow-hidden">
            <div 
              className="bg-blue-600 h-2.5 rounded-full transition-all duration-500" 
              style={{ width: `${completionPercentage}%` }}
            />
          </div>
          <div className="text-xs font-medium text-slate-600 border-l border-slate-200 pl-4">
            {completedCount}/{totalLessons} Đã học
          </div>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex flex-wrap items-center justify-between gap-4 bg-white p-3 rounded-2xl border border-slate-200 shadow-sm">
        {/* Tier filter */}
        <div className="flex items-center gap-1 overflow-x-auto pb-1 sm:pb-0">
          <button
            onClick={() => setSelectedTier('all')}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-colors ${
              selectedTier === 'all'
                ? 'bg-blue-600 text-white shadow-sm'
                : 'text-slate-600 hover:bg-slate-100'
            }`}
          >
            Tất Cả Các Tầng
          </button>
          <button
            onClick={() => setSelectedTier('tier-1')}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-colors ${
              selectedTier === 'tier-1'
                ? 'bg-blue-600 text-white shadow-sm'
                : 'text-slate-600 hover:bg-slate-100'
            }`}
          >
            Tầng 1: BABOK Foundation
          </button>
          <button
            onClick={() => setSelectedTier('tier-2')}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-colors ${
              selectedTier === 'tier-2'
                ? 'bg-blue-600 text-white shadow-sm'
                : 'text-slate-600 hover:bg-slate-100'
            }`}
          >
            Tầng 2: Banking Domain
          </button>
        </div>

        {/* Completion status filter */}
        <div className="flex items-center gap-1.5 text-xs">
          <span className="text-slate-400 font-medium mr-1 flex items-center gap-1">
            <Filter className="w-3.5 h-3.5" /> Lọc:
          </span>
          <button
            onClick={() => setStatusFilter('all')}
            className={`px-2.5 py-1 rounded-lg font-medium transition-colors ${
              statusFilter === 'all' ? 'bg-slate-200 text-slate-800' : 'text-slate-500 hover:bg-slate-100'
            }`}
          >
            Toàn bộ
          </button>
          <button
            onClick={() => setStatusFilter('pending')}
            className={`px-2.5 py-1 rounded-lg font-medium transition-colors ${
              statusFilter === 'pending' ? 'bg-amber-100 text-amber-800' : 'text-slate-500 hover:bg-slate-100'
            }`}
          >
            Chưa học
          </button>
          <button
            onClick={() => setStatusFilter('completed')}
            className={`px-2.5 py-1 rounded-lg font-medium transition-colors ${
              statusFilter === 'completed' ? 'bg-emerald-100 text-emerald-800' : 'text-slate-500 hover:bg-slate-100'
            }`}
          >
            Đã hoàn thành
          </button>
        </div>
      </div>

      {/* Lesson List */}
      <div className="space-y-4">
        {filteredLessons.map((lesson, idx) => {
          const completed = isLessonCompleted(lesson.id)
          return (
            <div
              key={lesson.id}
              className={`group bg-white rounded-2xl border transition-all p-5 sm:p-6 shadow-sm hover:shadow-md ${
                completed ? 'border-emerald-200 bg-emerald-50/20' : 'border-slate-200 hover:border-blue-300'
              }`}
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                {/* Left: Checkbox & Info */}
                <div className="flex items-start gap-4 flex-1">
                  <button
                    onClick={() => toggleLessonComplete(lesson.id)}
                    className="mt-1 transition-transform group-hover:scale-110 focus:outline-none"
                    title={completed ? 'Đánh dấu chưa hoàn thành' : 'Đánh dấu đã hoàn thành'}
                  >
                    {completed ? (
                      <CheckCircle2 className="w-6 h-6 text-emerald-600 fill-emerald-100" />
                    ) : (
                      <Circle className="w-6 h-6 text-slate-300 hover:text-blue-500" />
                    )}
                  </button>

                  <div className="space-y-2 flex-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="text-[11px] font-bold px-2 py-0.5 rounded-md bg-slate-100 text-slate-700">
                        {lesson.tier === 'tier-1' ? 'Tầng 1 (BABOK)' : 'Tầng 2 (Banking)'}
                      </span>
                      <span className="text-[11px] font-semibold text-blue-600 bg-blue-50 px-2 py-0.5 rounded-md">
                        {lesson.category}
                      </span>
                      <span className="text-[11px] text-slate-400 flex items-center gap-1">
                        <Clock className="w-3 h-3" /> {lesson.estimatedMinutes} phút
                      </span>
                    </div>

                    <h3 className={`text-base sm:text-lg font-bold transition-colors ${
                      completed ? 'text-slate-700 line-through' : 'text-slate-900 group-hover:text-blue-600'
                    }`}>
                      {lesson.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                      {lesson.subtitle}
                    </p>

                    {/* Skill tags */}
                    <div className="flex flex-wrap gap-1.5 pt-1">
                      {lesson.skillsCovered.map((skill) => (
                        <span key={skill} className="text-[10px] bg-slate-100 text-slate-600 px-2 py-0.5 rounded border border-slate-200">
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Right: Action button */}
                <div className="flex items-center gap-3 self-end sm:self-center shrink-0">
                  <Link
                    href={`/learn/${lesson.tier}/${lesson.id}`}
                    className={`inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl text-xs font-bold transition-all shadow-sm ${
                      completed
                        ? 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                        : 'bg-blue-600 text-white hover:bg-blue-700 shadow-blue-500/20'
                    }`}
                  >
                    <BookOpen className="w-3.5 h-3.5" />
                    {completed ? 'Ôn tập lại' : 'Bắt đầu học'}
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            </div>
          )
        })}

        {filteredLessons.length === 0 && (
          <div className="text-center py-16 bg-white rounded-2xl border border-slate-200 text-slate-500">
            <Sparkles className="w-8 h-8 mx-auto text-slate-300 mb-2" />
            <p className="font-semibold">Không tìm thấy bài học nào phù hợp với bộ lọc hiện tại.</p>
            <button
              onClick={() => { setSelectedTier('all'); setStatusFilter('all') }}
              className="mt-3 text-xs text-blue-600 font-bold hover:underline"
            >
              Đặt lại bộ lọc
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
