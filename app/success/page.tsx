'use client'

import { useState, useEffect, Suspense } from 'react'
import { useSearchParams } from 'next/navigation'
import { motion } from 'framer-motion'
import { 
  CheckCircle2, 
  MessageCircle, 
  Video, 
  Download, 
  ArrowRight, 
  Copy,
  Calendar,
  Clock,
  ExternalLink,
  ShieldCheck,
  Loader2,
  XCircle
} from 'lucide-react'

/* --- SUCCESS PAGE: POST-PAYMENT ONBOARDING --- */

const SuccessBackground = () => (
  <div className="fixed inset-0 -z-10 bg-[#051e12]">
    <div className="absolute top-[-10%] right-[-10%] h-[500px] w-[500px] rounded-full bg-[#a3e635]/10 blur-[120px]" />
    <div className="absolute bottom-[-5%] left-[-5%] h-[600px] w-[600px] rounded-full bg-[#ff3e03]/5 blur-[100px]" />
    <div className="absolute inset-0 opacity-[0.05]" 
         style={{ backgroundImage: 'radial-gradient(#a3e635 1px, transparent 1px)', backgroundSize: '40px 40px' }} />
  </div>
)

function SuccessContent() {
  const searchParams = useSearchParams()
  const email = searchParams.get('email')
  const [status, setStatus] = useState<'LOADING' | 'PAID' | 'PENDING' | 'NOT_FOUND'>('LOADING')

  useEffect(() => {
    if (!email) {
      setStatus('NOT_FOUND')
      return
    }

    const checkStatus = async () => {
      try {
        const res = await fetch(`/api/register/status?email=${encodeURIComponent(email)}`)
        const data = await res.json()
        if (data.success) {
          setStatus(data.status)
        } else {
          setStatus('NOT_FOUND')
        }
      } catch (err) {
        console.error(err)
        setStatus('NOT_FOUND')
      }
    }

    checkStatus()
  }, [email])

  const joinWhatsApp = () => {
    window.open('https://chat.whatsapp.com/HQuDm1kXezD98Ith0bQkAr?mode=gi_t', '_blank')
  }

  if (status === 'LOADING') {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh]">
        <Loader2 className="w-12 h-12 text-[#a3e635] animate-spin mb-4" />
        <p className="text-white/60 font-black italic uppercase tracking-tighter">Verifying Payment...</p>
      </div>
    )
  }

  if (status === 'PENDING') {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] text-center px-6">
        <XCircle className="w-20 h-20 text-[#ff3e03] mb-8" />
        <h1 className="text-4xl font-black italic uppercase tracking-tighter mb-4">Payment <span className="text-[#ff3e03]">Pending</span></h1>
        <p className="text-white/70 max-w-md mb-8">We haven't confirmed your payment yet. If you've just paid, please wait a few minutes for Zapier to update our records.</p>
        <button onClick={() => window.location.reload()} className="bg-[#a3e635] text-[#051e12] px-8 py-4 rounded-xl font-black italic uppercase">Refresh Page</button>
      </div>
    )
  }

  if (status === 'NOT_FOUND') {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] text-center px-6">
        <XCircle className="w-20 h-20 text-[#ff3e03] mb-8" />
        <h1 className="text-4xl font-black italic uppercase tracking-tighter mb-4">Access <span className="text-[#ff3e03]">Denied</span></h1>
        <p className="text-white/70 max-w-md mb-8">We couldn't find a registration for this email. Please ensure you've registered and paid.</p>
        <a href="/" className="bg-[#a3e635] text-[#051e12] px-8 py-4 rounded-xl font-black italic uppercase">Back to Home</a>
      </div>
    )
  }

  return (
    <div className="relative z-10 max-w-4xl mx-auto px-6 py-12 md:py-20 flex-grow w-full">
      {/* Success Header */}
      <div className="text-center mb-12">
        <motion.div 
          initial={{ scale: 0 }} 
          animate={{ scale: 1 }} 
          className="inline-flex items-center justify-center w-24 h-24 bg-[#a3e635] rounded-full mb-8 shadow-[0_0_40px_rgba(163,230,53,0.4)]"
        >
          <ShieldCheck size={48} className="text-[#051e12]" />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <h1 className="text-4xl md:text-6xl font-black italic uppercase tracking-tighter mb-4">
              Payment <span className="text-[#a3e635]">Confirmed</span>
          </h1>
          <p className="text-white/60 text-lg font-medium">Welcome to the Brokerage Blueprint Masterclass.</p>
        </motion.div>
      </div>

      {/* Action Card */}
      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="bg-white/5 border border-[#a3e635]/30 rounded-[3rem] p-8 md:p-12 backdrop-blur-xl shadow-2xl relative overflow-hidden"
      >
        <div className="absolute top-0 right-0 p-8 opacity-5">
          <MessageCircle size={150} className="text-[#a3e635]" />
        </div>

        <div className="relative z-10 flex flex-col items-center text-center">
          <div className="inline-block px-4 py-1 bg-[#ff3e03] text-white text-[10px] font-black uppercase italic rounded-full mb-6">Action Required</div>
          <h2 className="text-2xl md:text-3xl font-black italic uppercase tracking-tighter mb-6">Join the Private Attendee Group</h2>
          <p className="text-white/70 mb-10 max-w-md">
            All webinar links, the <strong>Brokerage Blueprint PDF</strong>, and pre-class materials will be shared inside the private WhatsApp group.
          </p>

          <button 
            onClick={joinWhatsApp}
            className="group w-full max-w-sm bg-[#a3e635] text-[#051e12] py-6 rounded-2xl font-black italic text-xl flex items-center justify-center gap-4 hover:bg-white hover:scale-[1.02] transition-all shadow-[0_15px_30px_rgba(163,230,53,0.2)]"
          >
            <MessageCircle size={28} />
            JOIN WHATSAPP GROUP
            <ArrowRight className="group-hover:translate-x-2 transition-transform" />
          </button>

          <p className="mt-6 text-[10px] font-black text-white/30 uppercase tracking-widest">Only registered attendees are admitted</p>
        </div>
      </motion.div>

      {/* Event Summary Grid */}
      <div className="grid md:grid-cols-3 gap-4 mt-8">
          <div className="bg-white/5 border border-white/10 p-6 rounded-2xl flex flex-col items-center text-center">
              <Calendar className="text-[#a3e635] mb-3" size={24} />
              <span className="text-[10px] font-black text-white/40 uppercase">Date</span>
              <span className="text-sm font-black italic">Sat, 28th March</span>
          </div>
          <div className="bg-white/5 border border-white/10 p-6 rounded-2xl flex flex-col items-center text-center">
              <Clock className="text-[#a3e635] mb-3" size={24} />
              <span className="text-[10px] font-black text-white/40 uppercase">Time</span>
              <span className="text-sm font-black italic">6:00 PM (WAT)</span>
          </div>
          <div className="bg-white/5 border border-white/10 p-6 rounded-2xl flex flex-col items-center text-center">
              <Video className="text-[#a3e635] mb-3" size={24} />
              <span className="text-[10px] font-black text-white/40 uppercase">Platform</span>
              <span className="text-sm font-black italic">Zoom Meeting</span>
          </div>
      </div>

      <div className="mt-12 text-center">
          <p className="text-white/40 text-sm font-medium">
              Having issues joining? Contact support at <br/>
              <a href="mailto:support@udsrealty.com" className="text-[#a3e635] hover:underline font-bold">support@udsrealty.com</a>
          </p>
      </div>
    </div>
  )
}

export default function PaymentSuccess() {
  return (
    <main className="min-h-screen text-white font-sans selection:bg-[#a3e635] selection:text-[#051e12] flex flex-col">
      <SuccessBackground />
      <Suspense fallback={<div className="flex items-center justify-center min-h-screen"><Loader2 className="animate-spin" /></div>}>
        <SuccessContent />
      </Suspense>
      <footer className="py-8 text-center opacity-20 text-[8px] font-black tracking-[0.5em] uppercase border-t border-white/5 mt-auto">
        UDS REALTY • THE REAL ESTATE BROKERAGE BLUEPRINT • SUCCESS
      </footer>
    </main>
  )
}