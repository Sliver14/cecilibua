import { PrismaClient } from '@prisma/client'

const globalForPrisma = global as unknown as { prisma: PrismaClient }

const dbUrl = process.env.DATABASE_URL

export const prisma =
  globalForPrisma.prisma ||
  new PrismaClient({
    log: ['query'],
    ...(dbUrl?.startsWith('prisma://') || dbUrl?.startsWith('prisma+postgres://')
      ? { accelerateUrl: dbUrl }
      : { datasource: { url: dbUrl } }),
  })

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma
