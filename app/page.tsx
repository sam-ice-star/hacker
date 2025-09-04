'use client'

import { useEffect, useMemo, useState } from 'react'
import { Plus, Search, Grid, List, Star, StarOff, Download, Upload } from 'lucide-react'
import AppCard from '@/components/AppCard'
import AddAppModal from '@/components/AddAppModal'
import EditAppModal from '@/components/EditAppModal'
import { App } from '@/types/app'

const STORAGE_KEY = 'app-manager:apps'

export default function Home() {
  const seed: App[] = [
    { id: '1', name: 'ai beauty rating', description: 'Discover your beauty score instantly! Our free Beauty Score AI analyzes your face and reveals your attractiveness rating in seconds.', category: '工具', url: 'https://www.aibeautyrating.online/', icon: '🌐', status: 'active', createdAt: new Date('2024-01-01'), favorite: true },
    { id: '2', name: 'mii maker online', description: 'Create your perfect Mii avatar for free online. No downloads, no registration required. Easy-to-use Mii character creator in your browser.', category: '开发', url: 'https://miimaker.online/', icon: '💻', status: 'active', createdAt: new Date('2024-01-02'), favorite: false },
    { id: '3', name: 'em dash symbol', description: 'Em dash copy paste made simple! Instantly copy the em dash symbol with one click. Get detailed input guides for Windows, macOS, Android, iOS, plus HTML and CSS codes.', category: '娱乐', url: 'https://emdashsymbol.com/', icon: '🎵', status: 'active', createdAt: new Date('2024-01-03'), favorite: false },
    { id: '4', name: 'squared symbol', description: 'Squared symbol copy paste made simple! Instantly copy the squared symbol with one click. Includes input guides for Windows, macOS, Android, iOS, plus HTML/CSS codes.', category: '工具', url: 'https://squaredsymbol.org/', icon: '🔣', status: 'active', createdAt: new Date('2024-01-04'), favorite: false },
  ]

  const [apps, setApps] = useState<App[]>(seed)
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState<string>('all')
  const [showAddModal, setShowAddModal] = useState(false)
  const [statusFilter, setStatusFilter] = useState<'all' | 'active' | 'inactive'>('all')
  const [sortBy, setSortBy] = useState<'createdAt' | 'name' | 'favorite'>('favorite')
  const [editing, setEditing] = useState<App | null>(null)

  // 载入本地数据
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

  // 保存本地
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(apps))
    } catch {}
  }, [apps])

  const categories = ['all', '工具', '开发', '娱乐', '生产力', '社交']

  const filteredAndSorted = useMemo(() => {
    let list = apps.filter(app => {
      const matchesSearch = app.name.toLowerCase().includes(searchTerm.toLowerCase()) || app.description.toLowerCase().includes(searchTerm.toLowerCase())
      const matchesCategory = selectedCategory === 'all' || app.category === selectedCategory
      const matchesStatus = statusFilter === 'all' || app.status === statusFilter
      return matchesSearch && matchesCategory && matchesStatus
    })
    if (sortBy === 'favorite') list = list.sort((a,b) => Number(Boolean(b.favorite)) - Number(Boolean(a.favorite)) || b.createdAt.getTime() - a.createdAt.getTime())
    if (sortBy === 'createdAt') list = list.sort((a,b) => b.createdAt.getTime() - a.createdAt.getTime())
    if (sortBy === 'name') list = list.sort((a,b) => a.name.localeCompare(b.name))
    return list
  }, [apps, searchTerm, selectedCategory, statusFilter, sortBy])

  const addApp = (newApp: Omit<App, 'id' | 'createdAt'>) => {
    const app: App = { ...newApp, id: Date.now().toString(), createdAt: new Date(), favorite: false }
    setApps(prev => [...prev, app])
    setShowAddModal(false)
  }

  const deleteApp = (id: string) => setApps(apps.filter(app => app.id !== id))
  const updateAppStatus = (id: string, status: 'active' | 'inactive') => setApps(apps.map(app => app.id === id ? { ...app, status } : app))
  const toggleFavorite = (id: string) => setApps(apps.map(app => app.id === id ? { ...app, favorite: !app.favorite } : app))

  const saveEdit = (updated: App) => {
    setApps(prev => prev.map(a => a.id === updated.id ? { ...updated, createdAt: new Date(updated.createdAt) } : a))
    setEditing(null)
  }

  const exportJson = () => {
    const blob = new Blob([JSON.stringify(apps, null, 2)], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'apps.json'
    a.click()
    URL.revokeObjectURL(url)
  }

  const importJson = (file: File) => {
    const reader = new FileReader()
    reader.onload = () => {
      try {
        const parsed = JSON.parse(String(reader.result)) as App[]
        const restored = parsed.map(a => ({ ...a, createdAt: new Date(a.createdAt) }))
        setApps(restored)
      } catch {}
    }
    reader.readAsText(file)
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <h1 className="text-2xl font-bold text-gray-900">应用管理器</h1>
            </div>
            <div className="flex items-center gap-2">
              <label className="btn-secondary cursor-pointer">
                <input type="file" accept="application/json" className="hidden" onChange={(e)=>{const f=e.target.files?.[0]; if(f) importJson(f)}} />
                <span className="inline-flex items-center gap-2"><Upload className="w-4 h-4" />导入</span>
              </label>
              <button onClick={exportJson} className="btn-secondary inline-flex items-center gap-2"><Download className="w-4 h-4" />导出</button>
              <button onClick={() => setShowAddModal(true)} className="btn-primary flex items-center gap-2">
                <Plus className="w-4 h-4" />
                <span>添加应用</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8 space-y-4">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input type="text" placeholder="搜索应用..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className="input-field pl-10" />
            </div>
            <select value={selectedCategory} onChange={(e) => setSelectedCategory(e.target.value)} className="input-field max-w-xs">
              {['all', '工具', '开发', '娱乐', '生产力', '社交'].map(category => (<option key={category} value={category}>{category === 'all' ? '所有分类' : category}</option>))}
            </select>
            <select value={statusFilter} onChange={(e)=>setStatusFilter(e.target.value as 'all' | 'active' | 'inactive')} className="input-field max-w-xs">
              <option value="all">全部状态</option>
              <option value="active">仅活跃</option>
              <option value="inactive">仅非活跃</option>
            </select>
            <select value={sortBy} onChange={(e)=>setSortBy(e.target.value as 'favorite' | 'createdAt' | 'name')} className="input-field max-w-xs">
              <option value="favorite">按收藏优先</option>
              <option value="createdAt">按创建时间</option>
              <option value="name">按名称</option>
            </select>
          </div>
          
          <div className="flex justify-between items-center">
            <p className="text-gray-600">共找到 {filteredAndSorted.length} 个应用</p>
            <div className="flex items-center space-x-2">
              <button onClick={() => setViewMode('grid')} className={`p-2 rounded-lg ${viewMode === 'grid' ? 'bg-primary-100 text-primary-600' : 'text-gray-400 hover:text-gray-600'}`}>
                <Grid className="w-5 h-5" />
              </button>
              <button onClick={() => setViewMode('list')} className={`p-2 rounded-lg ${viewMode === 'list' ? 'bg-primary-100 text-primary-600' : 'text-gray-400 hover:text-gray-600'}`}>
                <List className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>

        {filteredAndSorted.length === 0 ? (
          <div className="text-center py-12">
            <div className="text-gray-400 mb-4"><Search className="w-16 h-16 mx-auto" /></div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">没有找到应用</h3>
            <p className="text-gray-500">尝试调整搜索条件或添加新应用</p>
          </div>
        ) : (
          <div className={viewMode === 'grid' ? 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6' : 'space-y-4'}>
            {filteredAndSorted.map(app => (
              <div key={app.id} className="relative">
                <button onClick={()=>toggleFavorite(app.id)} className="absolute -top-2 -right-2 z-10 bg-white shadow p-1 rounded-full border border-gray-200" title={app.favorite ? '取消收藏' : '收藏'}>
                  {app.favorite ? <Star className="w-4 h-4 text-yellow-500" /> : <StarOff className="w-4 h-4 text-gray-400" />}
                </button>
                <AppCard app={app} viewMode={viewMode} onDelete={deleteApp} onStatusChange={updateAppStatus} onEdit={setEditing} />
              </div>
            ))}
          </div>
        )}
      </main>

      <AddAppModal isOpen={showAddModal} onClose={() => setShowAddModal(false)} onAdd={addApp} categories={categories.filter(cat => cat !== 'all')} />
      <EditAppModal isOpen={!!editing} onClose={()=>setEditing(null)} onSave={saveEdit} categories={categories.filter(cat => cat !== 'all')} app={editing} />
    </div>
  )
}
