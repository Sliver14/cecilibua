import { NextRequest, NextResponse } from 'next/server'
import { registrationSchema } from '@/lib/validations/registration'

// In-memory storage for registrations (in production, use a database)
const registrations: any[] = []

// Email sending function (placeholder for future Resend integration)
async function sendConfirmationEmail(data: any) {
  console.log('[Registration] Confirmation email would be sent to:', data.email)
  console.log('[Registration] Registration data:', {
    name: data.fullName,
    email: data.email,
    phone: data.phone,
    experience: data.experience,
    timestamp: new Date().toISOString()
  })
  
  // TODO: Integrate with Resend when ready
  return true
}

function generateEmailTemplate(data: any): string {
  const webinarDate = 'Saturday, 28th March'
  const webinarTime = '6:00 PM – 8:00 PM (WAT)'
  const zoomLink = 'https://zoom.us/meeting/YOUR_MEETING_ID' // Replace with actual link
  const whatsappGroup = process.env.NEXT_PUBLIC_WHATSAPP_GROUP || '#'

  return `
    <!DOCTYPE html>
    <html>
    <head>
      <style>
        body { font-family: Arial, sans-serif; color: #1A1A1A; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
        .header { background: linear-gradient(135deg, #D4AF37 0%, #800020 100%); color: white; padding: 30px; text-align: center; border-radius: 8px; }
        .content { padding: 30px 0; }
        .detail { margin: 20px 0; padding: 15px; background: #F5F1E6; border-left: 4px solid #D4AF37; border-radius: 4px; }
        .button { display: inline-block; background: #D4AF37; color: #1A1A1A; padding: 12px 30px; text-decoration: none; border-radius: 25px; font-weight: bold; margin: 20px 0; }
        .footer { color: #999; font-size: 12px; text-align: center; margin-top: 40px; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>Welcome to The Real Estate Brokerage Blueprint!</h1>
        </div>

        <div class="content">
          <p>Hello ${data.fullName},</p>

          <p>Thank you for registering for our exclusive webinar. We're excited to have you join us!</p>

          <div class="detail">
            <strong>📅 Webinar Details</strong><br>
            Date: ${webinarDate}<br>
            Time: ${webinarTime}<br>
            Platform: Zoom
          </div>

          <div class="detail">
            <strong>🔗 Join the Webinar</strong><br>
            <a href="${zoomLink}" class="button">Click here to join on Zoom</a>
          </div>

          <p>This 2-hour intensive session will cover:</p>
          <ul>
            <li>Business structure and model for real estate brokerages</li>
            <li>Team building and agent management</li>
            <li>Revenue optimization strategies</li>
            <li>Client acquisition and marketing</li>
            <li>Growth and scaling from 0 to 100M+</li>
          </ul>

          <div class="detail">
            <strong>👥 Join Our Community</strong><br>
            Connect with other professionals on WhatsApp:<br>
            <a href="${whatsappGroup}" class="button">Join WhatsApp Group</a>
          </div>

          <p><strong>Pro Tips:</strong></p>
          <ul>
            <li>Join 5-10 minutes early for technical setup</li>
            <li>Have a notebook ready to take notes</li>
            <li>Prepare 2-3 questions you'd like answered</li>
            <li>Join our WhatsApp group for live updates and Q&A</li>
          </ul>

          <p>If you have any issues accessing the webinar or need assistance, please reply to this email.</p>

          <p>See you on the 28th!<br>
          <strong>The UDS Realty Team</strong></p>
        </div>

        <div class="footer">
          <p>&copy; 2024 UDS Realty. All rights reserved.</p>
          <p>You received this email because you registered for our webinar.</p>
        </div>
      </div>
    </body>
    </html>
  `
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    // Validate the request body
    const validatedData = registrationSchema.parse(body)

    // Check for duplicate email
    const existingRegistration = registrations.find(r => r.email === validatedData.email)
    if (existingRegistration) {
      return NextResponse.json(
        { error: 'This email is already registered' },
        { status: 400 }
      )
    }

    // Store registration (in production, use database)
    const registration = {
      id: Math.random().toString(36).substring(7),
      ...validatedData,
      registeredAt: new Date().toISOString()
    }
    registrations.push(registration)

    // Send confirmation email
    try {
      await sendConfirmationEmail(validatedData)
    } catch (emailError) {
      console.error('Email sending failed:', emailError)
      // Don't fail the registration if email fails
    }

    return NextResponse.json(
      {
        success: true,
        message: 'Registration successful',
        registrationId: registration.id,
        redirectUrl: process.env.NEXT_PUBLIC_SELAR_LINK || '/success'
      },
      { status: 200 }
    )
  } catch (error) {
    console.error('Registration error:', error)

    if (error instanceof Error) {
      return NextResponse.json(
        { error: error.message },
        { status: 400 }
      )
    }

    return NextResponse.json(
      { error: 'An error occurred during registration' },
      { status: 500 }
    )
  }
}

// GET endpoint to retrieve all registrations (admin only)
export async function GET(request: NextRequest) {
  // In production, add authentication check
  const adminKey = request.nextUrl.searchParams.get('adminKey')

  if (adminKey !== process.env.ADMIN_KEY) {
    return NextResponse.json(
      { error: 'Unauthorized' },
      { status: 401 }
    )
  }

  return NextResponse.json({
    totalRegistrations: registrations.length,
    registrations: registrations
  })
}
