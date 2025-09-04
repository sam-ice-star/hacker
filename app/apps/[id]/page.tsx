'use client'

import { useEffect, useMemo, useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { ArrowLeft, Globe, Calendar, Star, StarOff } from 'lucide-react'
import { App } from '@/types/app'

const STORAGE_KEY = 'app-manager:apps'

export default function AppDetailPage() {
  const params = useParams<{ id: string }>()
  const router = useRouter()
  const [apps, setApps] = useState<App[]>([])

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY)
      if (raw) {
        const parsed = JSON.parse(raw) as App[]
        const restored = parsed.map(a => ({ ...a, createdAt: new Date(a.createdAt) }))
        setApps(restored)
      }
    } catch {}
  }, [])

  const app: App | undefined = useMemo(() => {
    if (!params?.id) return undefined
    return apps.find(a => a.id === String(params.id))
  }, [apps, params])

  const toggleFavorite = () => {
    if (!app) return
    const updated = apps.map(a => a.id === app.id ? { ...a, favorite: !a.favorite } : a)
    setApps(updated)
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated))
    } catch {}
  }

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('zh-CN', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    }).format(date)
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center h-16 gap-3">
            <button onClick={() => router.back()} className="p-2 rounded-lg hover:bg-gray-100 text-gray-600">
              <ArrowLeft className="w-5 h-5" />
            </button>
            <h1 className="text-xl font-semibold text-gray-900">网站详情</h1>
          </div>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {!app ? (
          <div className="text-center py-20">
            <p className="text-gray-500 mb-4">未找到该网站，可能已被删除或本地数据为空。</p>
            <button onClick={() => router.push('/')} className="btn-primary">返回主页</button>
          </div>
        ) : (
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-primary-100 to-primary-200 flex items-center justify-center text-3xl">
                  {app.icon}
                </div>
                <div>
                  <div className="flex items-center gap-3">
                    <h2 className="text-2xl font-bold text-gray-900">{app.name}</h2>
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${app.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}`}>
                      {app.status === 'active' ? '活跃' : '非活跃'}
                    </span>
                  </div>
                  <div className="flex items-center gap-4 text-sm text-gray-500 mt-1">
                    <span className="inline-flex items-center gap-1"><Globe className="w-4 h-4" />{app.category}</span>
                    <span className="inline-flex items-center gap-1"><Calendar className="w-4 h-4" />{formatDate(app.createdAt)}</span>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button onClick={toggleFavorite} className="btn-secondary inline-flex items-center gap-2">
                  {app.favorite ? <Star className="w-4 h-4 text-yellow-500" /> : <StarOff className="w-4 h-4" />}
                  <span>{app.favorite ? '已收藏' : '收藏'}</span>
                </button>
              </div>
            </div>

            <div className="mt-6">
              <h3 className="text-base font-semibold text-gray-900 mb-2">简介</h3>
              <p className="text-gray-700 leading-relaxed">{app.description}</p>
            </div>

            <div className="mt-6">
              <h3 className="text-base font-semibold text-gray-900 mb-2">网站链接</h3>
              <a href={app.url} target="_blank" rel="noopener noreferrer" className="text-primary-600 hover:underline break-all">{app.name}</a>
            </div>
          </div>
        )}
      </main>
    </div>
  )
}


