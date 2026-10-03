'use client'

import React, { createContext, useContext, useState, useEffect } from 'react'
import { LESSONS } from '@/data/curriculumData'

interface ProgressState {
  completedLessons: string[]
  unlockedLessons: string[]
  unlockAllMode: boolean
  passedQuickChecks: string[]
  quizScores: { [quizId: string]: number }
  bookmarkedQuestions: string[]
  targetBankingRole: string
  notes: { [lessonId: string]: string }
}

interface ProgressContextType {
  progress: ProgressState
  toggleLessonComplete: (lessonId: string) => void
  isLessonCompleted: (lessonId: string) => boolean
  isLessonUnlocked: (lessonId: string) => boolean
  isCaseStudyUnlocked: (slug: string) => boolean
  toggleUnlockAllMode: () => void
  passQuickCheck: (lessonId: string) => void
  isQuickCheckPassed: (lessonId: string) => boolean
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
  unlockedLessons: ['01_business_analysis_overview'],
  unlockAllMode: false,
  passedQuickChecks: [],
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
      const saved = localStorage.getItem('banking_ba_progress_v2')
      if (saved) {
        const parsed = JSON.parse(saved)
        setProgress({
          ...defaultProgress,
          ...parsed,
          // Always ensure the first lesson is unlocked
          unlockedLessons: Array.from(new Set(['01_business_analysis_overview', ...(parsed.unlockedLessons || [])]))
        })
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
        localStorage.setItem('banking_ba_progress_v2', JSON.stringify(progress))
      } catch (e) {
        console.error('Failed to save progress to localStorage', e)
      }
    }
  }, [progress, isLoaded])

  // Helper to unlock dependent lessons
  const unlockDependents = (lessonId: string, currentUnlocked: string[]) => {
    const lesson = LESSONS.find(l => l.id === lessonId)
    if (!lesson || !lesson.unlocks) return currentUnlocked

    const newUnlocked = [...currentUnlocked]
    lesson.unlocks.forEach(unlockId => {
      if (!newUnlocked.includes(unlockId)) {
        newUnlocked.push(unlockId)
      }
    })
    return newUnlocked
  }

  const toggleLessonComplete = (lessonId: string) => {
    setProgress((prev) => {
      const exists = prev.completedLessons.includes(lessonId)
      const newCompleted = exists
        ? prev.completedLessons.filter((id) => id !== lessonId)
        : [...prev.completedLessons, lessonId]

      // If completing, also unlock any items in its unlocks array
      let updatedUnlocked = prev.unlockedLessons
      if (!exists) {
        updatedUnlocked = unlockDependents(lessonId, prev.unlockedLessons)
      }

      return { 
        ...prev, 
        completedLessons: newCompleted,
        unlockedLessons: updatedUnlocked
      }
    })
  }

  const passQuickCheck = (lessonId: string) => {
    setProgress((prev) => {
      const newPassed = prev.passedQuickChecks.includes(lessonId)
        ? prev.passedQuickChecks
        : [...prev.passedQuickChecks, lessonId]

      // Also mark lesson completed and unlock next
      const newCompleted = prev.completedLessons.includes(lessonId)
        ? prev.completedLessons
        : [...prev.completedLessons, lessonId]

      const updatedUnlocked = unlockDependents(lessonId, prev.unlockedLessons)

      return {
        ...prev,
        passedQuickChecks: newPassed,
        completedLessons: newCompleted,
        unlockedLessons: updatedUnlocked
      }
    })
  }

  const isQuickCheckPassed = (lessonId: string) => {
    return progress.passedQuickChecks.includes(lessonId)
  }

  const toggleUnlockAllMode = () => {
    setProgress(prev => ({
      ...prev,
      unlockAllMode: !prev.unlockAllMode
    }))
  }

  const isLessonCompleted = (lessonId: string) => {
    return progress.completedLessons.includes(lessonId)
  }

  const isLessonUnlocked = (lessonId: string) => {
    if (progress.unlockAllMode) return true
    // First lesson is always unlocked
    if (lessonId === '01_business_analysis_overview') return true

    // Check if directly in unlockedLessons list
    if (progress.unlockedLessons.includes(lessonId)) return true

    // Or check if all its prerequisites are completed
    const lesson = LESSONS.find(l => l.id === lessonId)
    if (!lesson) return true
    if (!lesson.prerequisites || lesson.prerequisites.length === 0) return true

    return lesson.prerequisites.every(prereqId => progress.completedLessons.includes(prereqId))
  }

  const isCaseStudyUnlocked = (slug: string) => {
    if (progress.unlockAllMode) return true

    // Case studies depend on specific lessons:
    if (slug === 'payment_network_error_refund') {
      // Depends on Napas 247 (tier 2 lesson 2) and API Idempotency (tier 1 lesson 5)
      return progress.completedLessons.includes('05_api_data_dictionary_spec') || progress.completedLessons.includes('02_payment_switching_napas_swift')
    }
    if (slug === 'bill_splitting') {
      // Depends on BPMN 2.0 (tier 1 lesson 3)
      return progress.completedLessons.includes('03_business_process_bpmn_modeling')
    }
    if (slug === 'sample_e_wallet_cashback') {
      // Depends on Core Banking Ledger (tier 2 lesson 1)
      return progress.completedLessons.includes('01_core_banking_and_ledger')
    }
    return true
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
        isLessonUnlocked,
        isCaseStudyUnlocked,
        toggleUnlockAllMode,
        passQuickCheck,
        isQuickCheckPassed,
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
