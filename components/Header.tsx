import { Bell, User, Facebook } from 'lucide-react'

export function Header() {
  return (
    <header className="flex items-center justify-between p-4 border-b">
      <div className="flex items-center gap-4">
        <Facebook className="h-10 w-10 text-blue-600 bg-white rounded-full" />
        <h1 className="text-2xl font-bold">Marketplace</h1>
      </div>
      <div className="flex items-center gap-4">
        <button className="p-2 rounded-full hover:bg-gray-100">
          <Bell />
        </button>
        <button className="p-2 rounded-full hover:bg-gray-100">
          <User />
        </button>
      </div>
    </header>
  )
} 