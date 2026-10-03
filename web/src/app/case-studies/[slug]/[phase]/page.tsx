import React from 'react'
import fs from 'fs'
import path from 'path'
import Link from 'next/link'
import { ArrowLeft, Clock, FolderGit2 } from 'lucide-react'
import LessonViewerClient from '@/components/LessonViewerClient'
import { Lesson } from '@/data/curriculumData'

interface CaseStudyPhaseProps {
  params: {
    slug: string
    phase: string
  }
}

export default function CaseStudyPhasePage({ params }: CaseStudyPhaseProps) {
  const { slug, phase } = params
  const fileName = `${phase}.md`

  let markdownContent = ''
  try {
    const fullPath = path.join(process.cwd(), '..', 'initiatives', slug, fileName)
    if (fs.existsSync(fullPath)) {
      markdownContent = fs.readFileSync(fullPath, 'utf8')
    } else {
      markdownContent = `# Tài liệu đang hoàn thiện\n\nKhông tìm thấy file: initiatives/${slug}/${fileName}`
    }
  } catch (err) {
    markdownContent = `# Lỗi khi tải tài liệu\n\nKhông thể đọc tệp từ: initiatives/${slug}/${fileName}`
  }

  // Create mock lesson object for viewer
  const mockLesson: Lesson = {
    id: `${slug}_${phase}`,
    title: `Sáng Kiến: ${slug.replace(/_/g, ' ').toUpperCase()}`,
    subtitle: `Hồ sơ chi tiết: ${fileName} (Docs-as-Code)`,
    tier: 'tier-3',
    category: 'Banking Case Study',
    estimatedMinutes: 20,
    filePath: `initiatives/${slug}/${fileName}`,
    skillsCovered: ['Docs-as-Code', 'BABOK v3', 'Scrum/Agile', 'Banking System Architecture'],
    keyTakeaways: [
      'Phân tích kỹ lưỡng rủi ro thất thoát tài chính và gian lận trong thanh toán số.',
      'Sử dụng mô hình máy trạng thái (State Machine) và Distributed Lock để bảo vệ dữ liệu.',
      'Đặc tả kịch bản kiểm thử nghiệm thu chuẩn Gherkin không kẽ hở cho Dev & QA.'
    ]
  }

  return (
    <LessonViewerClient lesson={mockLesson} markdownContent={markdownContent} />
  )
}
