import { PrismaClient } from '@prisma/client'
import { hashPassword } from '@/lib/auth/password'

const prisma = new PrismaClient()

async function main() {
  const email = process.env.ADMIN_EMAIL
  const password = process.env.ADMIN_PASSWORD
  const name = process.env.ADMIN_NAME || 'Administrator'

  if (!email || !password) {
    console.error('请通过环境变量提供 ADMIN_EMAIL 与 ADMIN_PASSWORD')
    process.exit(1)
  }

  const existing = await prisma.adminUser.findUnique({ where: { email } })
  if (existing) {
    console.log('管理员已存在，跳过创建')
    return
  }

  const passwordHash = await hashPassword(password)
  await prisma.adminUser.create({ data: { email, name, passwordHash } })
  console.log(`已创建管理员: ${email}`)
}

main().catch((e) => {
  console.error(e)
  process.exit(1)
}).finally(async () => {
  await prisma.$disconnect()
})