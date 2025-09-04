'use client'

import { useEffect, useState } from 'react'
import { X, Globe, Hash, Link, FileText } from 'lucide-react'
import { App } from '@/types/app'

interface EditAppModalProps {
  isOpen: boolean
  onClose: () => void
  onSave: (app: App) => void
  categories: string[]
  app: App | null
}

export default function EditAppModal({ isOpen, onClose, onSave, categories, app }: EditAppModalProps) {
  const [formData, setFormData] = useState<App | null>(app)

  useEffect(() => {
    setFormData(app)
  }, [app])

  const [errors, setErrors] = useState<Record<string, string>>({})

  const validateForm = () => {
    if (!formData) return false
    const newErrors: Record<string, string> = {}
    if (!formData.name.trim()) newErrors.name = '应用名称是必填项'
    if (!formData.description.trim()) newErrors.description = '应用描述是必填项'
    if (!formData.category) newErrors.category = '请选择应用分类'
    if (!formData.url.trim()) newErrors.url = '应用链接是必填项'
    else if (!isValidUrl(formData.url)) newErrors.url = '请输入有效的URL'
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const isValidUrl = (string: string) => {
    try {
      new URL(string)
      return true
    } catch {
      return false
    }
  }

  const handleInput = (field: keyof App, value: string | Date) => {
    if (!formData) return
    // 处理 status 的值类型
    if (field === 'status' && (value === 'active' || value === 'inactive')) {
      setFormData(prev => prev ? { ...prev, status: value } : prev)
      if (errors[field]) setErrors(prev => ({ ...prev, [field]: '' }))
      return
    }

    setFormData(prev => prev ? { ...prev, [field]: value as any } : prev)
    if (errors[field]) setErrors(prev => ({ ...prev, [field]: '' }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!formData) return
    if (validateForm()) {
      onSave(formData)
      onClose()
    }
  }

  if (!isOpen || !formData) return null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-xl max-w-md w-full max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-900">编辑应用</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600 p-1 rounded-lg hover:bg-gray-100">
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2"><Hash className="w-4 h-4 inline mr-2" />应用名称 *</label>
            <input type="text" value={formData.name} onChange={(e)=>handleInput('name', e.target.value)} className={`input-field ${errors.name ? 'border-red-500' : ''}`} />
            {errors.name && <p className="mt-1 text-sm text-red-600">{errors.name}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2"><FileText className="w-4 h-4 inline mr-2" />应用描述 *</label>
            <textarea value={formData.description} onChange={(e)=>handleInput('description', e.target.value)} className={`input-field ${errors.description ? 'border-red-500' : ''}`} rows={3} />
            {errors.description && <p className="mt-1 text-sm text-red-600">{errors.description}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2"><Globe className="w-4 h-4 inline mr-2" />应用分类 *</label>
            <select value={formData.category} onChange={(e)=>handleInput('category', e.target.value)} className={`input-field ${errors.category ? 'border-red-500' : ''}`}>
              {categories.map(category => (<option key={category} value={category}>{category}</option>))}
            </select>
            {errors.category && <p className="mt-1 text-sm text-red-600">{errors.category}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2"><Link className="w-4 h-4 inline mr-2" />应用链接 *</label>
            <input type="url" value={formData.url} onChange={(e)=>handleInput('url', e.target.value)} className={`input-field ${errors.url ? 'border-red-500' : ''}`} />
            {errors.url && <p className="mt-1 text-sm text-red-600">{errors.url}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">应用图标</label>
            <div className="grid grid-cols-8 gap-2">
              {['🚀', '💻', '🌐', '🎵', '📱', '🎮', '📚', '🔧', '🎨', '📊', '💡', '⭐', '🔥', '💎', '🌈', '🎯'].map(icon => (
                <button key={icon} type="button" onClick={() => handleInput('icon', icon)} className={`w-10 h-10 text-xl rounded-lg border-2 transition-colors ${formData.icon === icon ? 'border-primary-500 bg-primary-50' : 'border-gray-200 hover:border-gray-300'}`}>
                  {icon}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">应用状态</label>
            <div className="flex space-x-4">
              <label className="flex items-center"><input type="radio" value="active" checked={formData.status === 'active'} onChange={(e)=>handleInput('status', e.target.value)} className="mr-2 text-primary-600 focus:ring-primary-500" /><span className="text-sm text-gray-700">活跃</span></label>
              <label className="flex items-center"><input type="radio" value="inactive" checked={formData.status === 'inactive'} onChange={(e)=>handleInput('status', e.target.value)} className="mr-2 text-primary-600 focus:ring-primary-500" /><span className="text-sm text-gray-700">非活跃</span></label>
            </div>
          </div>

          <div className="flex space-x-3 pt-4">
            <button type="button" onClick={onClose} className="btn-secondary flex-1">取消</button>
            <button type="submit" className="btn-primary flex-1">保存</button>
          </div>
        </form>
      </div>
    </div>
  )
}
