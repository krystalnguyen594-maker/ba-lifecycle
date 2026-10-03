'use client'

import React, { createContext, useContext, useState, useEffect } from 'react'
import { LESSONS } from '@/data/curriculumData'

interface ProgressState {
  completedLessons: string[]
  quizScores: { [quizId: string]: number }
  bookmarkedQuestions: string[]
  targetBankingRole: string
  notes: { [lessonId: string]: string }
}

interface ProgressContextType {
  progress: ProgressState
  toggleLessonComplete: (lessonId: string) => void
  isLessonCompleted: (lessonId: string) => boolean
  saveQuizScore: (quizId: string, score: number) => void
  toggleBookmark: (questionId: string) => void
  isBookmarked: (questionId: string) => boolean
  saveNote: (lessonId: string, note: string) => void
  completionPercentage: number
  tierCompletion: (tier: 'tier-1' | 'tier-2' | 'tier-3') => number
  totalLessons: number
  completedCount: number
}

const defaultProgress: ProgressState = {
  completedLessons: [],
  quizScores: {},
  bookmarkedQuestions: [],
  targetBankingRole: 'Banking IT Business Analyst',
  notes: {},
}

const ProgressContext = createContext<ProgressContextType | undefined>(undefined)

export function ProgressProvider({ children }: { children: React.ReactNode }) {
  const [progress, setProgress] = useState<ProgressState>(defaultProgress)
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    try {
      const saved = localStorage.getItem('banking_ba_progress')
      if (saved) {
        setProgress(JSON.parse(saved))
      }
    } catch (e) {
      console.error('Failed to load progress from localStorage', e)
    } finally {
      setIsLoaded(true)
    }
  }, [])

  useEffect(() => {
    if (isLoaded) {
      try {
        localStorage.setItem('banking_ba_progress', JSON.stringify(progress))
      } catch (e) {
        console.error('Failed to save progress to localStorage', e)
      }
    }
  }, [progress, isLoaded])

  const toggleLessonComplete = (lessonId: string) => {
    setProgress((prev) => {
      const exists = prev.completedLessons.includes(lessonId)
      const newCompleted = exists
        ? prev.completedLessons.filter((id) => id !== lessonId)
        : [...prev.completedLessons, lessonId]
      return { ...prev, completedLessons: newCompleted }
    })
  }

  const isLessonCompleted = (lessonId: string) => {
    return progress.completedLessons.includes(lessonId)
  }

  const saveQuizScore = (quizId: string, score: number) => {
    setProgress((prev) => ({
      ...prev,
      quizScores: { ...prev.quizScores, [quizId]: score },
    }))
  }

  const toggleBookmark = (questionId: string) => {
    setProgress((prev) => {
      const exists = prev.bookmarkedQuestions.includes(questionId)
      const newBookmarks = exists
        ? prev.bookmarkedQuestions.filter((id) => id !== questionId)
        : [...prev.bookmarkedQuestions, questionId]
      return { ...prev, bookmarkedQuestions: newBookmarks }
    })
  }

  const isBookmarked = (questionId: string) => {
    return progress.bookmarkedQuestions.includes(questionId)
  }

  const saveNote = (lessonId: string, note: string) => {
    setProgress((prev) => ({
      ...prev,
      notes: { ...prev.notes, [lessonId]: note },
    }))
  }

  const totalLessons = LESSONS.length
  const completedCount = progress.completedLessons.length
  const completionPercentage = totalLessons > 0 ? Math.round((completedCount / totalLessons) * 100) : 0

  const tierCompletion = (tier: 'tier-1' | 'tier-2' | 'tier-3') => {
    const tierLessons = LESSONS.filter((l) => l.tier === tier)
    if (tierLessons.length === 0) return 0
    const completed = tierLessons.filter((l) => progress.completedLessons.includes(l.id)).length
    return Math.round((completed / tierLessons.length) * 100)
  }

  return (
    <ProgressContext.Provider
      value={{
        progress,
        toggleLessonComplete,
        isLessonCompleted,
        saveQuizScore,
        toggleBookmark,
        isBookmarked,
        saveNote,
        completionPercentage,
        tierCompletion,
        totalLessons,
        completedCount,
      }}
    >
      {children}
    </ProgressContext.Provider>
  )
}

export function useProgress() {
  const context = useContext(ProgressContext)
  if (!context) {
    throw new Error('useProgress must be used within a ProgressProvider')
  }
  return context
}
