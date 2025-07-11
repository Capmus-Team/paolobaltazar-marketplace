'use client';

import { Bell, Store, LogOut } from 'lucide-react'
import { UserWithMetadata } from '@/lib/types'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { useEffect, useState } from 'react'
import { Button } from './ui/button'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

export function Header() {
  const router = useRouter()
  const supabase = createClientComponentClient()
  const [user, setUser] = useState<UserWithMetadata | null>(null)

  useEffect(() => {
    const getUser = async () => {
      const { data: { user } } = await supabase.auth.getUser()
      setUser(user as UserWithMetadata)
    }
    getUser()

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user as UserWithMetadata ?? null)
    })

    return () => subscription.unsubscribe()
  }, [supabase.auth])

  const handleSignOut = async () => {
    await supabase.auth.signOut()
    router.refresh()
  }

  return (
    <header className="flex items-center justify-between px-6 py-4 bg-white shadow-sm sticky top-0 z-20">
      <div className="flex items-center gap-4">
        <Link href="/" className="flex items-center gap-2">
          <Store className="h-7 w-7 text-blue-500" />
          <span className="text-2xl font-bold tracking-tight">Marketplace</span>
        </Link>
      </div>
      <div className="flex items-center gap-4">
        {user ? (
          <>
            <button className="p-2 rounded-full hover:bg-gray-100 transition">
              <Bell className="w-5 h-5" />
            </button>
            <div className="flex items-center gap-2">
              <span className="text-sm font-medium">
                {user.user_metadata.first_name} {user.user_metadata.last_name}
              </span>
              <button 
                onClick={handleSignOut}
                className="p-2 rounded-full hover:bg-gray-100 transition"
              >
                <LogOut className="w-5 h-5" />
              </button>
            </div>
          </>
        ) : (
          <div className="flex items-center gap-2">
            <Button variant="ghost" asChild>
              <Link href="/auth/login">Login</Link>
            </Button>
            <Button asChild>
              <Link href="/auth/signup">Sign Up</Link>
            </Button>
          </div>
        )}
      </div>
    </header>
  )
} 