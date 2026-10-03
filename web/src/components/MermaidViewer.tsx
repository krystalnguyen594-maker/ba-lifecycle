'use client'

import React, { useEffect, useRef, useState } from 'react'
import { Copy, Check, Maximize2 } from 'lucide-react'

interface MermaidViewerProps {
  chart: string
  id?: string
  caption?: string
}

export default function MermaidViewer({ chart, id = 'mermaid-chart', caption }: MermaidViewerProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const [svg, setSvg] = useState<string>('')
  const [error, setError] = useState<string | null>(null)
  const [copied, setCopied] = useState(false)
  const [isExpanded, setIsExpanded] = useState(false)

  useEffect(() => {
    let isMounted = true

    async function renderChart() {
      if (!chart.trim()) return

      try {
        const mermaid = (await import('mermaid')).default
        mermaid.initialize({
          startOnLoad: false,
          theme: 'neutral',
          securityLevel: 'loose',
          flowchart: { curve: 'basis', htmlLabels: true },
          sequence: { actorMargin: 50, showSequenceNumbers: true },
          fontFamily: 'Inter, system-ui, sans-serif',
        })

        const uniqueId = `mermaid-${Math.random().toString(36).substring(2, 9)}`
        const { svg: renderedSvg } = await mermaid.render(uniqueId, chart.trim())
        
        if (isMounted) {
          setSvg(renderedSvg)
          setError(null)
        }
      } catch (err: any) {
        if (isMounted) {
          console.error('Mermaid render error:', err)
          setError(err?.message || 'Không thể render sơ đồ Mermaid')
        }
      }
    }

    renderChart()

    return () => {
      isMounted = false
    }
  }, [chart])

  const copyCode = () => {
    navigator.clipboard.writeText(chart.trim())
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className={`my-6 rounded-2xl border border-slate-200 bg-white shadow-sm overflow-hidden transition-all ${
      isExpanded ? 'fixed inset-4 z-50 overflow-auto shadow-2xl p-6 bg-white/98' : ''
    }`}>
      {/* Header bar */}
      <div className="flex items-center justify-between px-4 py-2.5 bg-slate-50 border-b border-slate-200 text-xs text-slate-500">
        <span className="font-semibold text-slate-700 flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-full bg-blue-500"></span>
          Sơ đồ quy trình (Mermaid Diagram) {caption ? `- ${caption}` : ''}
        </span>
        <div className="flex items-center gap-2">
          <button
            onClick={copyCode}
            className="flex items-center gap-1 hover:text-slate-800 px-2 py-1 rounded hover:bg-slate-200/60 transition-colors"
            title="Copy mã nguồn Mermaid"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
            {copied ? 'Đã sao chép' : 'Sao chép mã'}
          </button>
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="p-1 hover:text-slate-800 rounded hover:bg-slate-200/60 transition-colors"
            title={isExpanded ? 'Thu nhỏ' : 'Phóng to toàn màn hình'}
          >
            <Maximize2 className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Render Canvas */}
      <div className="p-6 overflow-x-auto flex justify-center bg-slate-50/40">
        {error ? (
          <div className="text-xs text-rose-600 bg-rose-50 p-4 rounded-xl border border-rose-200 w-full font-mono">
            <p className="font-semibold mb-1">Lỗi cú pháp Mermaid:</p>
            <pre className="text-[11px] whitespace-pre-wrap">{error}</pre>
          </div>
        ) : svg ? (
          <div
            ref={containerRef}
            dangerouslySetInnerHTML={{ __html: svg }}
            className="max-w-full [&>svg]:mx-auto [&>svg]:h-auto transition-transform"
          />
        ) : (
          <div className="py-12 flex flex-col items-center gap-2 text-slate-400 text-xs">
            <div className="w-6 h-6 border-2 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
            Đang biên dịch sơ đồ...
          </div>
        )}
      </div>
    </div>
  )
}
