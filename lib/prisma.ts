import { PrismaClient } from '@prisma/client'
import { PrismaPg } from '@prisma/adapter-pg'
import pg from 'pg'

const globalForPrisma = global as unknown as { prisma: PrismaClient }

const dbUrl = process.env.DATABASE_URL

const createPrisma = () => {
  if (!dbUrl) return new PrismaClient()

  if (dbUrl.startsWith('prisma://') || dbUrl.startsWith('prisma+postgres://')) {
    return new PrismaClient({
      log: ['query'],
      accelerateUrl: dbUrl,
    } as any)
  }

  // Use pg adapter for Prisma 7 standard connections in some environments
  const pool = new pg.Pool({ connectionString: dbUrl })
  const adapter = new PrismaPg(pool)
  return new PrismaClient({ 
    log: ['query'],
    adapter 
  } as any)
}

export const prisma = globalForPrisma.prisma || createPrisma()

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma
