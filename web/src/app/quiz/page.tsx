'use client'

import React, { useState } from 'react'
import { 
  HelpCircle, 
  CheckCircle2, 
  XCircle, 
  RotateCcw, 
  Award, 
  Sparkles, 
  Filter, 
  ChevronRight,
  BookOpen,
  Building2
} from 'lucide-react'
import { QUIZ_QUESTIONS, QuizQuestion } from '@/data/curriculumData'
import { useProgress } from '@/context/ProgressContext'

export default function QuizPage() {
  const { saveQuizScore } = useProgress()
  const [selectedCategory, setSelectedCategory] = useState<string>('all')
  const [userAnswers, setUserAnswers] = useState<{ [qId: string]: number }>({})
  const [submittedQuestions, setSubmittedQuestions] = useState<{ [qId: string]: boolean }>({})

  const categories = ['all', 'API & Data Modeling', 'Process Modeling', 'Core Banking', 'Compliance', 'Cards', 'Lending', 'Payments', 'BABOK']

  const filteredQuestions = QUIZ_QUESTIONS.filter((q) => {
    if (selectedCategory === 'all') return true
    return q.category === selectedCategory
  })

  const handleSelectOption = (questionId: string, optionIndex: number) => {
    if (submittedQuestions[questionId]) return // Already answered
    setUserAnswers((prev) => ({ ...prev, [questionId]: optionIndex }))
    setSubmittedQuestions((prev) => ({ ...prev, [questionId]: true }))

    // Save score if correct
    const question = QUIZ_QUESTIONS.find((q) => q.id === questionId)
    if (question && question.correctIndex === optionIndex) {
      saveQuizScore(questionId, 100)
    } else {
      saveQuizScore(questionId, 0)
    }
  }

  const handleResetQuiz = () => {
    setUserAnswers({})
    setSubmittedQuestions({})
  }

  // Calculate score
  const totalAnswered = Object.keys(submittedQuestions).length
  const correctCount = Object.entries(userAnswers).filter(([qId, ans]) => {
    const q = QUIZ_QUESTIONS.find((item) => item.id === qId)
    return q && q.correctIndex === ans
  }).length

  const scorePercentage = totalAnswered > 0 ? Math.round((correctCount / totalAnswered) * 100) : 0

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-6 border-b border-slate-200">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-50 text-indigo-700 text-xs font-semibold mb-2">
            <HelpCircle className="w-3.5 h-3.5" /> Kiểm Tra Kiến Thức Thực Chiến
          </div>
          <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">
            Banking BA Knowledge Quiz Simulator
          </h1>
          <p className="text-slate-600 text-sm mt-1">
            Bộ câu hỏi trắc nghiệm tình huống chuyên sâu, rèn luyện tư duy chuẩn xác từng chi tiết kỹ thuật
          </p>
        </div>

        {/* Score widget */}
        <div className="flex items-center gap-4 bg-white px-5 py-3 rounded-2xl border border-slate-200 shadow-sm">
          <div className="text-right">
            <div className="text-xs font-semibold text-slate-500">Điểm số hiện tại</div>
            <div className="text-xl font-extrabold text-indigo-600">
              {scorePercentage}%
            </div>
          </div>
          <div className="border-l border-slate-200 pl-4 text-xs space-y-0.5">
            <div className="text-emerald-600 font-bold flex items-center gap-1">
              <CheckCircle2 className="w-3.5 h-3.5" /> {correctCount} Đúng
            </div>
            <div className="text-slate-500">
              {totalAnswered}/{filteredQuestions.length} Đã trả lời
            </div>
          </div>
          {totalAnswered > 0 && (
            <button
              onClick={handleResetQuiz}
              className="p-2 text-slate-400 hover:text-slate-700 rounded-lg hover:bg-slate-100 transition-colors"
              title="Làm lại bài kiểm tra"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>

      {/* Category Filters */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-2 text-xs">
        <span className="text-slate-400 font-medium mr-1 flex items-center gap-1">
          <Filter className="w-3.5 h-3.5" /> Chủ đề:
        </span>
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-3 py-1.5 rounded-xl font-semibold whitespace-nowrap transition-colors ${
              selectedCategory === cat
                ? 'bg-indigo-600 text-white shadow-sm'
                : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'
            }`}
          >
            {cat === 'all' ? 'Tất Cả' : cat}
          </button>
        ))}
      </div>

      {/* Questions list */}
      <div className="space-y-6">
        {filteredQuestions.map((q, idx) => {
          const isSubmitted = submittedQuestions[q.id]
          const selectedOption = userAnswers[q.id]
          const isCorrect = selectedOption === q.correctIndex

          return (
            <div
              key={q.id}
              className={`bg-white rounded-3xl border transition-all p-6 sm:p-8 shadow-sm ${
                isSubmitted
                  ? isCorrect
                    ? 'border-emerald-300 bg-emerald-50/20 ring-1 ring-emerald-300'
                    : 'border-rose-300 bg-rose-50/20 ring-1 ring-rose-300'
                  : 'border-slate-200'
              }`}
            >
              {/* Question metadata */}
              <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
                <div className="flex items-center gap-2">
                  <span className="w-6 h-6 rounded-full bg-slate-900 text-white text-xs font-bold flex items-center justify-center">
                    {idx + 1}
                  </span>
                  <span className="text-xs font-bold px-2.5 py-0.5 rounded-md bg-indigo-50 text-indigo-700">
                    {q.category}
                  </span>
                </div>
                {q.bankReference && (
                  <span className="text-[11px] text-slate-400 flex items-center gap-1">
                    <Building2 className="w-3 h-3" /> {q.bankReference}
                  </span>
                )}
              </div>

              {/* Question text */}
              <h3 className="text-base sm:text-lg font-bold text-slate-900 leading-snug mb-5">
                {q.question}
              </h3>

              {/* Options */}
              <div className="space-y-2.5">
                {q.options.map((opt, optIdx) => {
                  let optionStyle = 'border-slate-200 hover:border-slate-300 hover:bg-slate-50 text-slate-800'

                  if (isSubmitted) {
                    if (optIdx === q.correctIndex) {
                      optionStyle = 'border-emerald-500 bg-emerald-50 text-emerald-900 font-semibold ring-1 ring-emerald-500'
                    } else if (optIdx === selectedOption) {
                      optionStyle = 'border-rose-500 bg-rose-50 text-rose-900 ring-1 ring-rose-500 line-through'
                    } else {
                      optionStyle = 'border-slate-200 text-slate-400 opacity-60'
                    }
                  }

                  return (
                    <button
                      key={optIdx}
                      disabled={isSubmitted}
                      onClick={() => handleSelectOption(q.id, optIdx)}
                      className={`w-full text-left p-4 rounded-2xl border text-xs sm:text-sm transition-all flex items-start gap-3 ${optionStyle}`}
                    >
                      <span className="w-5 h-5 rounded-full border border-current flex items-center justify-center text-[10px] font-bold shrink-0 mt-0.5">
                        {String.fromCharCode(65 + optIdx)}
                      </span>
                      <span className="leading-relaxed flex-1">{opt}</span>
                    </button>
                  )
                })}
              </div>

              {/* Explanation box after answer */}
              {isSubmitted && (
                <div className={`mt-5 p-4 rounded-2xl border text-xs sm:text-sm leading-relaxed space-y-1.5 ${
                  isCorrect
                    ? 'bg-emerald-50/80 border-emerald-200 text-emerald-900'
                    : 'bg-rose-50/80 border-rose-200 text-rose-900'
                }`}>
                  <div className="font-bold flex items-center gap-1.5">
                    {isCorrect ? (
                      <>
                        <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                        Chính xác!
                      </>
                    ) : (
                      <>
                        <XCircle className="w-4 h-4 text-rose-600" />
                        Chưa chính xác. Đáp án đúng là: {String.fromCharCode(65 + q.correctIndex)}
                      </>
                    )}
                  </div>
                  <p className="text-slate-700 text-xs leading-relaxed pt-1">
                    <strong>Giải thích nghiệp vụ:</strong> {q.explanation}
                  </p>
                </div>
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}
