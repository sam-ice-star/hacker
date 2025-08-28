'use client'

import { useState } from 'react'
import { Plus, Search, Grid, List, Settings, Trash2, Edit, ExternalLink } from 'lucide-react'
import AppCard from '@/components/AppCard'
import AddAppModal from '@/components/AddAppModal'
import { App } from '@/types/app'

export default function Home() {
  const [apps, setApps] = useState<App[]>([
    {
      id: '1',
      name: 'ai beauty rating',
      description: 'Discover your beauty score instantly! Our free Beauty Score AI analyzes your face and reveals your attractiveness rating in seconds.',
      category: '工具',
      url: 'https://www.aibeautyrating.online/',
      icon: '🌐',
      status: 'active',
      createdAt: new Date('2024-01-01'),
    },
    {
      id: '2',
      name: 'mii maker online',
      description: 'Create your perfect Mii avatar for free online. No downloads, no registration required. Easy-to-use Mii character creator in your browser.',
      category: '开发',
      url: 'https://miimaker.online/',
      icon: '💻',
      status: 'active',
      createdAt: new Date('2024-01-02'),
    },
    {
      id: '3',
      name: 'em dash symbol',
      description: 'Em dash copy paste made simple! Instantly copy the em dash symbol with one click. Get detailed input guides for Windows, macOS, Android, iOS, plus HTML and CSS codes.',
      category: '娱乐',
      url: 'https://emdashsymbol.com/',
      icon: '🎵',
      status: 'active',
      createdAt: new Date('2024-01-03'),
    },
  ])
  
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState<string>('all')
  const [showAddModal, setShowAddModal] = useState(false)

  const categories = ['all', '工具', '开发', '娱乐', '生产力', '社交']

  const filteredApps = apps.filter(app => {
    const matchesSearch = app.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         app.description.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = selectedCategory === 'all' || app.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  const addApp = (newApp: Omit<App, 'id' | 'createdAt'>) => {
    const app: App = {
      ...newApp,
      id: Date.now().toString(),
      createdAt: new Date(),
    }
    setApps([...apps, app])
    setShowAddModal(false)
  }

  const deleteApp = (id: string) => {
    setApps(apps.filter(app => app.id !== id))
  }

  const updateAppStatus = (id: string, status: 'active' | 'inactive') => {
    setApps(apps.map(app => 
      app.id === id ? { ...app, status } : app
    ))
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* 头部 */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <h1 className="text-2xl font-bold text-gray-900">应用管理器</h1>
            </div>
            <div className="flex items-center space-x-4">
              <button
                onClick={() => setShowAddModal(true)}
                className="btn-primary flex items-center space-x-2"
              >
                <Plus className="w-4 h-4" />
                <span>添加应用</span>
              </button>
              <button className="btn-secondary">
                <Settings className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* 主要内容 */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* 搜索和筛选 */}
        <div className="mb-8 space-y-4">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="搜索应用..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="input-field pl-10"
              />
            </div>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="input-field max-w-xs"
            >
              {categories.map(category => (
                <option key={category} value={category}>
                  {category === 'all' ? '所有分类' : category}
                </option>
              ))}
            </select>
          </div>
          
          <div className="flex justify-between items-center">
            <p className="text-gray-600">
              共找到 {filteredApps.length} 个应用
            </p>
            <div className="flex items-center space-x-2">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-2 rounded-lg ${
                  viewMode === 'grid' 
                    ? 'bg-primary-100 text-primary-600' 
                    : 'text-gray-400 hover:text-gray-600'
                }`}
              >
                <Grid className="w-5 h-5" />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-2 rounded-lg ${
                  viewMode === 'list' 
                    ? 'bg-primary-100 text-primary-600' 
                    : 'text-gray-400 hover:text-gray-600'
                }`}
              >
                <List className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>

        {/* 应用列表 */}
        {filteredApps.length === 0 ? (
          <div className="text-center py-12">
            <div className="text-gray-400 mb-4">
              <Search className="w-16 h-16 mx-auto" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">没有找到应用</h3>
            <p className="text-gray-500">尝试调整搜索条件或添加新应用</p>
          </div>
        ) : (
          <div className={viewMode === 'grid' 
            ? 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6'
            : 'space-y-4'
          }>
            {filteredApps.map(app => (
              <AppCard
                key={app.id}
                app={app}
                viewMode={viewMode}
                onDelete={deleteApp}
                onStatusChange={updateAppStatus}
              />
            ))}
          </div>
        )}
      </main>

      {/* 添加应用模态框 */}
      <AddAppModal
        isOpen={showAddModal}
        onClose={() => setShowAddModal(false)}
        onAdd={addApp}
        categories={categories.filter(cat => cat !== 'all')}
      />
    </div>
  )
}
