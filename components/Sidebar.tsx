"use client"

import {
  Home,
  Tag,
  Users,
  Car,
  Building2,
  Shirt,
  Plug,
  Flower,
  Gamepad2,
} from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

const categories = [
  { name: 'Vehicles', icon: Car },
  { name: 'Property Rentals', icon: Building2 },
  { name: 'Apparel', icon: Shirt },
  { name: 'Electronics', icon: Plug },
  { name: 'Toys & Games', icon: Users },
  { name: 'Sporting Goods', icon: Gamepad2 },
  { name: 'Garden & Outdoor', icon: Flower },
]

function normalizeCategory(name: string) {
  return name.toLowerCase().replace(/&/g, 'and').replace(/\s+/g, '-')
}

export function Sidebar() {
  const pathname = usePathname()

  return (
    <aside className="w-80 h-screen bg-white p-4 space-y-6 overflow-y-auto border-r">
      <div>
        <h2 className="text-xl font-bold mb-4">Create new listing</h2>
        <nav className="space-y-2">
          <Link href="/" className={`flex items-center gap-3 p-2 rounded-lg ${pathname === '/' ? 'bg-gray-100' : ''}`}>
            <Home className="w-5 h-5" />
            <span>Browse all</span>
          </Link>
          <Link href="/create/item" className={`flex items-center gap-3 p-2 rounded-lg ${pathname === '/create/item' ? 'bg-gray-100' : ''}`}>
            <Tag className="w-5 h-5" />
            <span>Create New Listing</span>
          </Link>
        </nav>
      </div>
      <div className="border-t pt-6">
        <h2 className="text-xl font-bold mb-4">Categories</h2>
        <nav className="space-y-2">
          {categories.map((category) => (
            <Link 
              href={`/category/${normalizeCategory(category.name)}`}
              key={category.name}
              className={`flex items-center gap-3 p-2 rounded-lg ${pathname.includes(normalizeCategory(category.name)) ? 'bg-blue-100 text-blue-600' : ''}`}
            >
              <category.icon className="w-5 h-5" />
              <span>{category.name}</span>
            </Link>
          ))}
        </nav>
      </div>
    </aside>
  )
} 