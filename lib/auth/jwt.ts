import { SignJWT, jwtVerify } from 'jose'

const DEFAULT_JWT_TTL_SECONDS = 7 * 24 * 60 * 60 // 7 days
const COOKIE_NAME = 'admin_session'

function getJwtSecret(): Uint8Array {
  const secret = process.env.ADMIN_JWT_SECRET || 'dev-insecure-admin-secret-change-me'
  return new TextEncoder().encode(secret)
}

export async function createJwtForAdmin(userId: string): Promise<string> {
  const secret = getJwtSecret()
  const token = await new SignJWT({ role: 'admin' })
    .setProtectedHeader({ alg: 'HS256' })
    .setSubject(userId)
    .setIssuedAt()
    .setExpirationTime(DEFAULT_JWT_TTL_SECONDS)
    .sign(secret)
  return token
}

export async function verifyAdminJwt(token: string): Promise<{ sub: string } | null> {
  try {
    const secret = getJwtSecret()
    const { payload } = await jwtVerify(token, secret)
    if (payload.role !== 'admin' || typeof payload.sub !== 'string') return null
    return { sub: payload.sub }
  } catch {
    return null
  }
}

export function getSessionCookieName() {
  return COOKIE_NAME
}