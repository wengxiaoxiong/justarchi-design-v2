'use server'

import { NextResponse } from 'next/server'
import { prisma } from '@/lib/db'
import { createJwtForAdmin, getSessionCookieName } from '@/lib/auth/jwt'
import { verifyPassword } from '@/lib/auth/password'

export async function POST(request: Request) {
  try {
    const { email, password } = await request.json()

    if (!email || !password) {
      return NextResponse.json({ success: false, error: '缺少邮箱或密码' }, { status: 400 })
    }

    const user = await prisma.adminUser.findUnique({ where: { email } })
    if (!user) {
      return NextResponse.json({ success: false, error: '账户不存在或密码错误' }, { status: 401 })
    }

    const ok = await verifyPassword(password, user.passwordHash)
    if (!ok) {
      return NextResponse.json({ success: false, error: '账户不存在或密码错误' }, { status: 401 })
    }

    const token = await createJwtForAdmin(user.id)

    const res = NextResponse.json({ success: true })
    res.cookies.set(getSessionCookieName(), token, {
      httpOnly: true,
      secure: true,
      sameSite: 'lax',
      path: '/',
      maxAge: 7 * 24 * 60 * 60,
    })
    return res
  } catch (err) {
    return NextResponse.json({ success: false, error: '登录失败' }, { status: 500 })
  }
}