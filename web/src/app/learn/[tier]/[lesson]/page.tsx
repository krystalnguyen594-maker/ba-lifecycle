import React from 'react'
import fs from 'fs'
import path from 'path'
import { notFound } from 'next/navigation'
import { LESSONS } from '@/data/curriculumData'
import LessonViewerClient from '@/components/LessonViewerClient'

interface LessonPageProps {
  params: {
    tier: string
    lesson: string
  }
}

export function generateStaticParams() {
  return LESSONS.map((lesson) => ({
    tier: lesson.tier,
    lesson: lesson.id,
  }))
}

export default function LessonPage({ params }: LessonPageProps) {
  const lesson = LESSONS.find((l) => l.tier === params.tier && l.id === params.lesson)

  if (!lesson) {
    notFound()
  }

  // Read the markdown file from root curriculum directory
  let markdownContent = ''
  try {
    const fullPath = path.join(process.cwd(), '..', lesson.filePath)
    if (fs.existsSync(fullPath)) {
      markdownContent = fs.readFileSync(fullPath, 'utf8')
    } else {
      markdownContent = `# Bài học đang được cập nhật\n\nNội dung cho bài học **${lesson.title}** đang được hoàn thiện.`
    }
  } catch (err) {
    console.error('Error reading markdown file:', err)
    markdownContent = `# Lỗi khi tải tài liệu bài học\n\nKhông thể đọc tệp từ: ${lesson.filePath}`
  }

  return (
    <LessonViewerClient lesson={lesson} markdownContent={markdownContent} />
  )
}
