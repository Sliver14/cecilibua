import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { resend } from '@/lib/resend'

export const dynamic = 'force-dynamic'

export async function POST(req: Request) {
  try {
    const body = await req.json()
    
    // Log the body for debugging (Zapier will send the payload)
    console.log('Zapier Webhook Received:', body)

    // Zapier "New Sale" payload from Selar usually contains:
    // customer_email, customer_name, amount, etc.
    
    const email = body.customer_email || body.email
    const name = body.customer_name || body.name

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

    // Send confirmation email if not already sent
    if (!registration.emailSent) {
      try {
        const firstName = registration.name.split(' ')[0]
        
        await resend.emails.send({
          from: 'UDS Realty <notifications@udsrealty.com>',
          to: registration.email,
          subject: 'Your Registration for The Real Estate Brokerage Blueprint is Almost Complete',
          html: `
            <div style="font-family: sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto;">
              <p>Hello ${firstName},</p>
              
              <p>My name is Cecilia Abua, and I’d like to personally congratulate you on reaching 95% completion of your registration for <strong>The Real Estate Brokerage Blueprint: From Getting Listings to Consistently Closing Deals</strong>, scheduled for Saturday, 28th March 2026</p>
              
              <p>This webinar is designed for individuals who want to build a strong foundation in real estate brokerage, as well as practising professionals looking to improve how they secure listings and close deals.</p>
              
              <p>Here’s a glimpse of what you’ll gain from the webinar:</p>
              <ul>
                <li>Practical strategies for securing quality property listings</li>
                <li>Proven methods used by successful brokers to consistently close deals</li>
                <li>Insights on positioning yourself to attract the right clients</li>
                <li>Real-world brokerage frameworks you can implement immediately</li>
                <li>A live Q&A session where your questions will be addressed</li>
              </ul>
              
              <div style="background-color: #f9f9f9; padding: 20px; border-radius: 8px; border: 1px solid #eee; margin: 20px 0;">
                <h3 style="margin-top: 0; color: #051e12;">Event Details</h3>
                <p style="margin-bottom: 5px;"><strong>Date:</strong> Saturday, 28th March 2026</p>
                <p style="margin-bottom: 5px;"><strong>Time:</strong> 6:00 PM – 8:00 PM (WAT)</p>
                <p style="margin-bottom: 0;"><strong>Platform:</strong> Zoom</p>
              </div>
              
              <p>I look forward to connecting with you during the session.</p>
              
              <p>To complete your registration and receive updates ahead of the webinar, please join the community using the link below.</p>
              
              <p>
                <a href="https://chat.whatsapp.com/HQuDm1kXezD98Ith0bQkAr?mode=gi_t" 
                   style="display: inline-block; background-color: #25D366; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; font-weight: bold;">
                   Join the Community
                </a>
              </p>
              
              <p>Important updates and useful resources related to the webinar will be shared in the community as the event approaches.</p>
              
              <p>Kind regards,<br/>
              <strong>Cecilia Abua</strong><br/>
              UDS Realty</p>
            </div>
          `,
        })

        // Update registration to mark email as sent
        await prisma.registration.update({
          where: { id: registration.id },
          data: { emailSent: true },
        })

        console.log(`Confirmation email sent via Webhook to ${registration.email}`)
      } catch (emailError) {
        console.error('Failed to send confirmation email via Webhook:', emailError)
      }
    }

    return NextResponse.json({ success: true, registrationId: registration.id })

  } catch (error) {
    console.error('Webhook error:', error)
    return NextResponse.json({ success: false, error: 'Internal server error' }, { status: 500 })
  }
}
