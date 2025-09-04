'use client'

import { ExternalLink, Edit, Trash2, MoreVertical, Globe, Calendar } from 'lucide-react'
import { App } from '@/types/app'
import { Menu } from '@headlessui/react'

interface AppCardProps {
  app: App
  viewMode: 'grid' | 'list'
  onDelete: (id: string) => void
  onStatusChange: (id: string, status: 'active' | 'inactive') => void
  onEdit?: (app: App) => void
}

export default function AppCard({ app, viewMode, onDelete, onStatusChange, onEdit }: AppCardProps) {

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('zh-CN', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    }).format(date)
  }

  if (viewMode === 'list') {
    return (
      <div 
        className="card hover:shadow-md transition-shadow duration-200"
      >
        <div className="flex items-center space-x-4">
          <div className="flex-shrink-0">
            <div className="w-12 h-12 bg-gradient-to-br from-primary-100 to-primary-200 rounded-lg flex items-center justify-center text-2xl">
              {app.icon}
            </div>
          </div>
          
          <div className="flex-1 min-w-0">
            <div className="flex items-center space-x-2">
              <h3 className="text-lg font-semibold text-gray-900 truncate">
                <a 
                  href={`/apps/${app.id}`}
                  className="hover:text-primary-600 transition-colors duration-200 cursor-pointer"
                >
                  {app.name}
                </a>
              </h3>
              <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                app.status === 'active' 
                  ? 'bg-green-100 text-green-800' 
                  : 'bg-gray-100 text-gray-800'
              }`}>
                {app.status === 'active' ? '活跃' : '非活跃'}
              </span>
            </div>
            <p className="text-gray-600 truncate">{app.description}</p>
            <div className="flex items-center space-x-4 text-sm text-gray-500 mt-1">
              <span className="flex items-center space-x-1">
                <Globe className="w-4 h-4" />
                <span>{app.category}</span>
              </span>
              <span className="flex items-center space-x-1">
                <Calendar className="w-4 h-4" />
                <span>{formatDate(app.createdAt)}</span>
              </span>
            </div>
          </div>
          
          <div className="flex items-center space-x-2">
            <a
              href={app.url}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-secondary flex items-center space-x-2"
            >
              <ExternalLink className="w-4 h-4" />
              <span>访问</span>
            </a>
            
            <Menu as="div" className="relative">
              <Menu.Button className="p-2 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-100">
                <MoreVertical className="w-5 h-5" />
              </Menu.Button>
              <Menu.Items className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-1 z-10">
                <Menu.Item>
                  {({ active }) => (
                    <button
                      onClick={() => onEdit?.(app)}
                      className={`${active ? 'bg-gray-100' : ''} flex items-center space-x-2 w-full px-4 py-2 text-sm text-gray-700`}
                    >
                      <Edit className="w-4 h-4" />
                      <span>编辑</span>
                    </button>
                  )}
                </Menu.Item>
                <Menu.Item>
                  {({ active }) => (
                    <button
                      onClick={() => onStatusChange(app.id, app.status === 'active' ? 'inactive' : 'active')}
                      className={`${
                        active ? 'bg-gray-100' : ''
                      } flex items-center space-x-2 w-full px-4 py-2 text-sm text-gray-700`}
                    >
                      <Edit className="w-4 h-4" />
                      <span>{app.status === 'active' ? '设为非活跃' : '设为活跃'}</span>
                    </button>
                  )}
                </Menu.Item>
                <Menu.Item>
                  {({ active }) => (
                    <button
                      onClick={() => onDelete(app.id)}
                      className={`${
                        active ? 'bg-gray-100' : ''
                      } flex items-center space-x-2 w-full px-4 py-2 text-sm text-red-600`}
                    >
                      <Trash2 className="w-4 h-4" />
                      <span>删除</span>
                    </button>
                  )}
                </Menu.Item>
              </Menu.Items>
            </Menu>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div 
      className="card hover:shadow-md transition-all duration-200 transform hover:-translate-y-1"
    >
      <div className="flex flex-col h-full">
        <div className="flex items-start justify-between mb-4">
          <div className="w-16 h-16 bg-gradient-to-br from-primary-100 to-primary-200 rounded-xl flex items-center justify-center text-3xl">
            {app.icon}
          </div>
          <div className="flex items-center space-x-1">
            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
              app.status === 'active' 
                ? 'bg-green-100 text-green-800' 
                : 'bg-gray-100 text-gray-800'
            }`}>
              {app.status === 'active' ? '活跃' : '非活跃'}
            </span>
          </div>
        </div>

        <div className="flex-1">
          <h3 className="text-lg font-semibold text-gray-900 mb-2">
            <a 
              href={`/apps/${app.id}`}
              className="hover:text-primary-600 transition-colors duration-200 cursor-pointer"
            >
              {app.name}
            </a>
          </h3>
          <p className="text-gray-600 text-sm mb-3 line-clamp-2">{app.description}</p>
          
          <div className="space-y-2 text-sm text-gray-500">
            <div className="flex items-center space-x-2">
              <Globe className="w-4 h-4" />
              <span>{app.category}</span>
            </div>
            <div className="flex items-center space-x-2">
              <Calendar className="w-4 h-4" />
              <span>{formatDate(app.createdAt)}</span>
            </div>
          </div>
        </div>

        <div className="flex items-center space-x-2 mt-4 pt-4 border-t border-gray-100">
          <a
            href={app.url}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary flex-1 flex items-center justify-center space-x-2"
          >
            <ExternalLink className="w-4 h-4" />
            <span>访问</span>
          </a>
          
          <Menu as="div" className="relative">
            <Menu.Button className="p-2 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-100">
              <MoreVertical className="w-5 h-5" />
            </Menu.Button>
            <Menu.Items className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-1 z-10">
              <Menu.Item>
                {({ active }) => (
                  <button
                    onClick={() => onEdit?.(app)}
                    className={`${active ? 'bg-gray-100' : ''} flex items-center space-x-2 w-full px-4 py-2 text-sm text-gray-700`}
                  >
                    <Edit className="w-4 h-4" />
                    <span>编辑</span>
                  </button>
                )}
              </Menu.Item>
              <Menu.Item>
                {({ active }) => (
                  <button
                    onClick={() => onStatusChange(app.id, app.status === 'active' ? 'inactive' : 'active')}
                    className={`${
                      active ? 'bg-gray-100' : ''
                    } flex items-center space-x-2 w-full px-4 py-2 text-sm text-gray-700`}
                  >
                    <Edit className="w-4 h-4" />
                    <span>{app.status === 'active' ? '设为非活跃' : '设为活跃'}</span>
                  </button>
                )}
              </Menu.Item>
              <Menu.Item>
                {({ active }) => (
                  <button
                    onClick={() => onDelete(app.id)}
                    className={`${
                      active ? 'bg-gray-100' : ''
                    } flex items-center space-x-2 w-full px-4 py-2 text-sm text-red-600`}
                  >
                    <Trash2 className="w-4 h-4" />
                    <span>删除</span>
                  </button>
                )}
              </Menu.Item>
            </Menu.Items>
          </Menu>
        </div>
      </div>
    </div>
  )
}
