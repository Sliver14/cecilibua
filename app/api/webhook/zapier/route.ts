import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function POST(req: Request) {
  try {
    const body = await req.json()
    
    // Log the body for debugging (Zapier will send the payload)
    console.log('Zapier Webhook Received:', body)

    // Zapier "New Sale" payload from Selar usually contains:
    // customer_email, customer_name, amount, etc.
    // The user suggested matching by email + name + amount.
    
    const email = body.customer_email || body.email
    const name = body.customer_name || body.name
    const amount = body.amount

    if (!email) {
      return NextResponse.json({ success: false, error: 'Email is required' }, { status: 400 })
    }

    // Update the registration record
    const registration = await prisma.registration.update({
      where: { email: email.toLowerCase() },
      data: {
        status: 'PAID',
      },
    })

    console.log(`Registration updated to PAID for: ${email}`)

    return NextResponse.json({ success: true, registrationId: registration.id })

  } catch (error) {
    console.error('Webhook error:', error)
    return NextResponse.json({ success: false, error: 'Internal server error' }, { status: 500 })
  }
}
