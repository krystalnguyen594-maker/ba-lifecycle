'use client'

import React from 'react'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import MermaidViewer from '@/components/MermaidViewer'

interface MarkdownRendererProps {
  content: string
}

export default function MarkdownRenderer({ content }: MarkdownRendererProps) {
  return (
    <div className="markdown-body">
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        components={{
          // Headings
          h1: ({ children }) => (
            <h1 className="text-2xl font-extrabold text-slate-900 mt-6 mb-4 pb-2 border-b border-slate-200">
              {children}
            </h1>
          ),
          h2: ({ children }) => (
            <h2 className="text-lg font-bold text-slate-900 mt-8 mb-3 pb-1 border-b border-slate-100">
              {children}
            </h2>
          ),
          h3: ({ children }) => (
            <h3 className="text-base font-bold text-slate-900 mt-6 mb-2">
              {children}
            </h3>
          ),
          h4: ({ children }) => (
            <h4 className="text-sm font-bold text-slate-800 mt-4 mb-1.5">
              {children}
            </h4>
          ),

          // Paragraphs
          p: ({ children }) => (
            <p className="mb-4 leading-relaxed text-[15px] text-slate-700">
              {children}
            </p>
          ),

          // Strong and emphasis
          strong: ({ children }) => (
            <strong className="font-bold text-slate-900">{children}</strong>
          ),
          em: ({ children }) => (
            <em className="italic text-slate-800">{children}</em>
          ),

          // Code — inline and blocks
          code: ({ className, children }) => {
            const match = /language-(\w+)/.exec(className || '')
            const lang = match?.[1]

            // Mermaid blocks → render as diagram
            if (lang === 'mermaid') {
              return <MermaidViewer chart={String(children).replace(/\n$/, '')} />
            }

            // Fenced code blocks (with language)
            if (lang) {
              return (
                <div className="relative my-4">
                  <div className="flex items-center justify-between bg-slate-800 rounded-t-lg px-4 py-2">
                    <span className="text-[11px] font-mono text-slate-400 uppercase tracking-wider">{lang}</span>
                  </div>
                  <pre className="bg-slate-900 text-slate-100 p-4 rounded-b-lg overflow-x-auto text-xs leading-relaxed font-mono">
                    <code>{children}</code>
                  </pre>
                </div>
              )
            }

            // Block code without language (plain pre > code)
            if (String(children).includes('\n')) {
              return (
                <pre className="bg-slate-900 text-slate-100 p-4 rounded-lg overflow-x-auto text-xs leading-relaxed font-mono my-4">
                  <code>{children}</code>
                </pre>
              )
            }

            // Inline code
            return (
              <code className="bg-slate-100 text-blue-700 px-1.5 py-0.5 rounded text-xs font-mono border border-slate-200">
                {children}
              </code>
            )
          },

          // Pre wrapper — let code handle styling
          pre: ({ children }) => <>{children}</>,

          // Blockquotes
          blockquote: ({ children }) => (
            <blockquote className="border-l-[3px] border-blue-600 bg-slate-50/80 p-4 rounded-r-lg my-4 text-slate-700 text-sm">
              {children}
            </blockquote>
          ),

          // Lists
          ul: ({ children }) => (
            <ul className="list-disc list-outside pl-6 mb-4 space-y-1.5 text-[15px] text-slate-700 leading-relaxed marker:text-slate-400">
              {children}
            </ul>
          ),
          ol: ({ children }) => (
            <ol className="list-decimal list-outside pl-6 mb-4 space-y-1.5 text-[15px] text-slate-700 leading-relaxed marker:text-slate-400">
              {children}
            </ol>
          ),
          li: ({ children }) => (
            <li className="pl-1">{children}</li>
          ),

          // Tables
          table: ({ children }) => (
            <div className="my-4 overflow-x-auto rounded-lg border border-slate-200">
              <table className="min-w-full divide-y divide-slate-200 text-xs sm:text-sm">
                {children}
              </table>
            </div>
          ),
          thead: ({ children }) => (
            <thead className="bg-slate-50">{children}</thead>
          ),
          tbody: ({ children }) => (
            <tbody className="bg-white divide-y divide-slate-100">{children}</tbody>
          ),
          tr: ({ children }) => (
            <tr className="hover:bg-slate-50/50 transition-colors">{children}</tr>
          ),
          th: ({ children }) => (
            <th className="px-4 py-2.5 text-left text-[11px] font-bold text-slate-600 uppercase tracking-wider whitespace-nowrap">
              {children}
            </th>
          ),
          td: ({ children }) => (
            <td className="px-4 py-2.5 text-slate-700 leading-relaxed">
              {children}
            </td>
          ),

          // Links
          a: ({ href, children }) => (
            <a
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:text-blue-800 underline underline-offset-2 decoration-blue-200 hover:decoration-blue-400 transition-colors font-medium"
            >
              {children}
            </a>
          ),

          // Horizontal rules
          hr: () => <hr className="my-8 border-slate-200" />,

          // Images
          img: ({ src, alt }) => (
            <figure className="my-6">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={src}
                alt={alt || ''}
                className="rounded-lg border border-slate-200 shadow-sm max-w-full"
                loading="lazy"
              />
              {alt && (
                <figcaption className="text-center text-xs text-slate-400 mt-2 italic">
                  {alt}
                </figcaption>
              )}
            </figure>
          ),
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  )
}
