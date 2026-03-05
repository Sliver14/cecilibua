import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { z } from 'zod'

export const dynamic = 'force-dynamic'

const registrationSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  whatsapp: z.string().min(10),
  location: z.string().min(2),
  amount: z.number().default(50000),
})

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const validatedData = registrationSchema.parse(body)

    // Upsert registration: if email already exists, update the data and keep status PENDING
    // Or just create a new one. The user said "create/update db".
    const registration = await prisma.registration.upsert({
      where: { email: validatedData.email },
      update: {
        name: validatedData.name,
        whatsapp: validatedData.whatsapp,
        location: validatedData.location,
        status: 'PENDING',
        amount: validatedData.amount,
        transactionNote: validatedData.email, // Using email as note for matching
      },
      create: {
        ...validatedData,
        status: 'PENDING',
        transactionNote: validatedData.email,
      },
    })

    // Construct Selar payment link
    // Replace YOUR_SELAR_SLUG with the actual product slug from the user.
    // Selar URLs can sometimes take custom parameters or we just rely on the user filling the note.
    const selarProductSlug = process.env.NEXT_PUBLIC_SELAR_PRODUCT_SLUG || 'uds-masterclass'
    const selarUrl = `https://selar.co/${selarProductSlug}`

    return NextResponse.json({ 
      success: true, 
      registrationId: registration.id,
      paymentUrl: selarUrl 
    })

  } catch (error) {
    console.error('Registration error:', error)
    if (error instanceof z.ZodError) {
      return NextResponse.json({ success: false, error: error.errors }, { status: 400 })
    }
    return NextResponse.json({ success: false, error: 'Internal server error' }, { status: 500 })
  }
}
