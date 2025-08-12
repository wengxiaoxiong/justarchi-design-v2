'use server'

import { NextResponse } from 'next/server'
import { getSessionCookieName } from '@/lib/auth/jwt'

export async function POST() {
  const res = NextResponse.json({ success: true })
  res.cookies.set(getSessionCookieName(), '', {
    httpOnly: true,
    secure: true,
    sameSite: 'lax',
    path: '/',
    maxAge: 0,
  })
  return res
}