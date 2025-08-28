export interface App {
  id: string
  name: string
  description: string
  category: string
  url: string
  icon: string
  status: 'active' | 'inactive'
  createdAt: Date
  favorite?: boolean
}
