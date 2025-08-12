'use client'

import { useTransition } from 'react'
import { useRouter } from 'next/navigation'

export function LogoutButton() {
  const router = useRouter()
  const [isPending, startTransition] = useTransition()

  async function onLogout() {
    await fetch('/api/auth/logout', { method: 'POST' })
    startTransition(() => router.replace('/admin/login'))
  }

  return (
    <button
      type="button"
      onClick={onLogout}
      disabled={isPending}
      className="text-gray-600 hover:text-gray-900 text-sm font-medium disabled:opacity-60"
    >
      {isPending ? '正在退出...' : '退出登录'}
    </button>
  )
}