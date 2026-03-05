import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export const dynamic = 'force-dynamic'

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url)
    const email = searchParams.get('email')

    if (!email) {
      return NextResponse.json({ success: false, error: 'Email is required' }, { status: 400 })
    }

    const registration = await prisma.registration.findUnique({
      where: { email: email.toLowerCase() },
    })

    if (!registration) {
      return NextResponse.json({ success: false, error: 'Registration not found' }, { status: 404 })
    }

    return NextResponse.json({ 
      success: true, 
      status: registration.status,
      name: registration.name 
    })

  } catch (error) {
    console.error('Status check error:', error)
    return NextResponse.json({ success: false, error: 'Internal server error' }, { status: 500 })
  }
}
