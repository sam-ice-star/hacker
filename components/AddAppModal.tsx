'use client'

import { useState } from 'react'
import { X, Globe, Hash, Link, FileText } from 'lucide-react'
import { App } from '@/types/app'

interface AddAppModalProps {
  isOpen: boolean
  onClose: () => void
  onAdd: (app: Omit<App, 'id' | 'createdAt'>) => void
  categories: string[]
}

export default function AddAppModal({ isOpen, onClose, onAdd, categories }: AddAppModalProps) {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    category: '',
    url: '',
    icon: '🚀',
    status: 'active' as 'active' | 'inactive'
  })

  const [errors, setErrors] = useState<Record<string, string>>({})

  const validateForm = () => {
    const newErrors: Record<string, string> = {}
    
    if (!formData.name.trim()) {
      newErrors.name = '应用名称是必填项'
    }
    
    if (!formData.description.trim()) {
      newErrors.description = '应用描述是必填项'
    }
    
    if (!formData.category) {
      newErrors.category = '请选择应用分类'
    }
    
    if (!formData.url.trim()) {
      newErrors.url = '应用链接是必填项'
    } else if (!isValidUrl(formData.url)) {
      newErrors.url = '请输入有效的URL'
    }
    
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const isValidUrl = (string: string) => {
    try {
      new URL(string)
      return true
    } catch (_) {
      return false
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    if (validateForm()) {
      onAdd(formData)
      setFormData({
        name: '',
        description: '',
        category: '',
        url: '',
        icon: '🚀',
        status: 'active'
      })
      setErrors({})
    }
  }

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }))
    }
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-xl max-w-md w-full max-h-[90vh] overflow-y-auto">
        {/* 头部 */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-900">添加新应用</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 p-1 rounded-lg hover:bg-gray-100"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* 表单 */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          {/* 应用名称 */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              <Hash className="w-4 h-4 inline mr-2" />
              应用名称 *
            </label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => handleInputChange('name', e.target.value)}
              className={`input-field ${errors.name ? 'border-red-500' : ''}`}
              placeholder="输入应用名称"
            />
            {errors.name && (
              <p className="mt-1 text-sm text-red-600">{errors.name}</p>
            )}
          </div>

          {/* 应用描述 */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              <FileText className="w-4 h-4 inline mr-2" />
              应用描述 *
            </label>
            <textarea
              value={formData.description}
              onChange={(e) => handleInputChange('description', e.target.value)}
              className={`input-field ${errors.description ? 'border-red-500' : ''}`}
              placeholder="描述这个应用的用途"
              rows={3}
            />
            {errors.description && (
              <p className="mt-1 text-sm text-red-600">{errors.description}</p>
            )}
          </div>

          {/* 应用分类 */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              <Globe className="w-4 h-4 inline mr-2" />
              应用分类 *
            </label>
            <select
              value={formData.category}
              onChange={(e) => handleInputChange('category', e.target.value)}
              className={`input-field ${errors.category ? 'border-red-500' : ''}`}
            >
              <option value="">选择分类</option>
              {categories.map(category => (
                <option key={category} value={category}>{category}</option>
              ))}
            </select>
            {errors.category && (
              <p className="mt-1 text-sm text-red-600">{errors.category}</p>
            )}
          </div>

          {/* 应用链接 */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              <Link className="w-4 h-4 inline mr-2" />
              应用链接 *
            </label>
            <input
              type="url"
              value={formData.url}
              onChange={(e) => handleInputChange('url', e.target.value)}
              className={`input-field ${errors.url ? 'border-red-500' : ''}`}
              placeholder="https://example.com"
            />
            {errors.url && (
              <p className="mt-1 text-sm text-red-600">{errors.url}</p>
            )}
          </div>

          {/* 应用图标 */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              应用图标
            </label>
            <div className="grid grid-cols-8 gap-2">
              {['🚀', '💻', '🌐', '🎵', '📱', '🎮', '📚', '🔧', '🎨', '📊', '💡', '⭐', '🔥', '💎', '🌈', '🎯'].map(icon => (
                <button
                  key={icon}
                  type="button"
                  onClick={() => handleInputChange('icon', icon)}
                  className={`w-10 h-10 text-xl rounded-lg border-2 transition-colors ${
                    formData.icon === icon
                      ? 'border-primary-500 bg-primary-50'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  {icon}
                </button>
              ))}
            </div>
          </div>

          {/* 应用状态 */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              应用状态
            </label>
            <div className="flex space-x-4">
              <label className="flex items-center">
                <input
                  type="radio"
                  value="active"
                  checked={formData.status === 'active'}
                  onChange={(e) => handleInputChange('status', e.target.value)}
                  className="mr-2 text-primary-600 focus:ring-primary-500"
                />
                <span className="text-sm text-gray-700">活跃</span>
              </label>
              <label className="flex items-center">
                <input
                  type="radio"
                  value="inactive"
                  checked={formData.status === 'inactive'}
                  onChange={(e) => handleInputChange('status', e.target.value)}
                  className="mr-2 text-primary-600 focus:ring-primary-500"
                />
                <span className="text-sm text-gray-700">非活跃</span>
              </label>
            </div>
          </div>

          {/* 按钮 */}
          <div className="flex space-x-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="btn-secondary flex-1"
            >
              取消
            </button>
            <button
              type="submit"
              className="btn-primary flex-1"
            >
              添加应用
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
