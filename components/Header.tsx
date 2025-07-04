import { Bell, User, Facebook, Store } from 'lucide-react'

export function Header() {
  return (
    <header className="flex items-center justify-between px-6 py-4 bg-white shadow-sm sticky top-0 z-20">
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2">
          <Store className="h-7 w-7 text-blue-500" />
          <span className="text-2xl font-bold tracking-tight">Marketplace</span>
        </div>
      </div>
      <div className="flex items-center gap-2">
        <button className="p-2 rounded-full hover:bg-gray-100 transition">
          <Bell className="w-5 h-5" />
        </button>
        <button className="p-2 rounded-full hover:bg-gray-100 transition">
          <User className="w-5 h-5" />
        </button>
      </div>
    </header>
  )
} 