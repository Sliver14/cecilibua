'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'
import { 
  ArrowRight, CheckCircle, Zap, Users, TrendingUp, Loader2, 
  Calendar, MapPin, Sparkles, X, ArrowUpRight, Building2,
  Clock, Video, Wallet, Target
} from 'lucide-react'

/* --- UDS REALTY: THE REAL ESTATE BROKERAGE BLUEPRINT --- */

const EventBackground = () => (
  <div className="fixed inset-0 -z-10 bg-[#051e12]">
    <div className="absolute top-[-5%] left-[-5%] h-[600px] w-[600px] rounded-full bg-[#a3e635]/10 blur-[120px]" />
    <div className="absolute bottom-[-10%] right-[-5%] h-[500px] w-[500px] rounded-full bg-[#ff3e03]/10 blur-[100px]" />
    <div className="absolute inset-0 opacity-[0.07]" 
         style={{ backgroundImage: 'radial-gradient(#a3e635 1px, transparent 1px)', backgroundSize: '30px 30px' }} />
    <div className="absolute inset-0 opacity-[0.03] pointer-events-none overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rotate-12">
            <Building2 size={800} strokeWidth={0.5} className="text-[#a3e635]" />
        </div>
    </div>
  </div>
)

const RegistrationModal = ({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) => {
  const [isLoading, setIsLoading] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    await new Promise(r => setTimeout(r, 1500))
    setIsSuccess(true)
    setIsLoading(false)
    setTimeout(() => { setIsSuccess(false); onClose(); }, 3000)
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={onClose} className="absolute inset-0 bg-black/90 backdrop-blur-sm" />
          <motion.div 
            initial={{ opacity: 0, scale: 0.95, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="relative w-full max-w-xl bg-[#0a2a1b] border border-[#a3e635]/30 rounded-[2.5rem] p-8 sm:p-10 shadow-[0_0_60px_rgba(163,230,53,0.15)] max-h-[90vh] overflow-y-auto custom-scrollbar"
          >
            <button onClick={onClose} className="absolute top-6 right-6 text-white/40 hover:text-[#a3e635] transition-colors"><X /></button>
            
            {isSuccess ? (
              <div className="text-center py-10">
                <CheckCircle className="w-20 h-20 text-[#a3e635] mx-auto mb-6" />
                <h3 className="text-3xl font-black text-white italic tracking-tighter uppercase">Registration Received</h3>
                <p className="text-[#a3e635] font-bold mt-2">Check your WhatsApp/Email for payment instructions to secure your seat.</p>
              </div>
            ) : (
              <form onSubmit={onSubmit} className="space-y-6">
                <div className="space-y-2">
                    <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#ff3e03] rounded text-[10px] font-black text-white uppercase italic">Final Step</div>
                    <h3 className="text-3xl font-black text-white leading-none uppercase italic tracking-tighter">Secure Your <span className="text-[#a3e635]">BluePrint</span></h3>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-[10px] font-black text-[#a3e635] uppercase tracking-widest">Full Name</label>
                    <input placeholder="Name" required className="w-full bg-white/5 border-b border-white/10 py-2 text-white outline-none focus:border-[#a3e635] transition-all" />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[10px] font-black text-[#a3e635] uppercase tracking-widest">WhatsApp Number</label>
                    <input type="tel" placeholder="+234..." required className="w-full bg-white/5 border-b border-white/10 py-2 text-white outline-none focus:border-[#a3e635] transition-all" />
                  </div>
                </div>

                <div className="space-y-1">
                    <label className="text-[10px] font-black text-[#a3e635] uppercase tracking-widest">Email Address</label>
                    <input type="email" placeholder="email@example.com" required className="w-full bg-white/5 border-b border-white/10 py-2 text-white outline-none focus:border-[#a3e635] transition-all" />
                </div>

                <div className="space-y-1">
                    <label className="text-[10px] font-black text-[#a3e635] uppercase tracking-widest">Current Location (City & Country)</label>
                    <input placeholder="Abuja, Nigeria" required className="w-full bg-white/5 border-b border-white/10 py-2 text-white outline-none focus:border-[#a3e635] transition-all" />
                </div>

                <div className="p-4 bg-white/5 rounded-2xl border border-white/10">
                    <label className="flex gap-3 cursor-pointer group">
                        <input type="checkbox" required className="mt-1 accent-[#a3e635] h-4 w-4" />
                        <span className="text-[11px] text-white/70 font-medium leading-relaxed group-hover:text-white transition-colors">
                            I understand that this webinar costs <span className="text-[#a3e635] font-black italic">₦50,000</span> and I am ready to make payment to secure my seat.
                        </span>
                    </label>
                </div>

                <button disabled={isLoading} className="w-full bg-[#a3e635] text-[#051e12] py-5 rounded-xl font-black tracking-tighter hover:bg-white transition-all flex items-center justify-center gap-3 italic text-lg shadow-lg">
                  {isLoading ? <Loader2 className="animate-spin" /> : <>REGISTER & PAY ₦50,000 <ArrowRight size={20} /></>}
                </button>
              </form>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  )
}

export default function Home() {
  const [isModalOpen, setIsModalOpen] = useState(false)

  return (
    <main className="min-h-screen text-white font-sans selection:bg-[#a3e635] selection:text-[#051e12]">
      <EventBackground />
      <RegistrationModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />

      <div className="relative z-10">
        <nav className="p-6 md:p-10 flex justify-between items-center max-w-7xl mx-auto">
            {/* <div className="flex flex-col"><span className="text-2xl font-black tracking-tighter italic leading-none">UDS <span className="text-[#a3e635]">REALTY</span></span></div> */}
            <Image src="/IMG_3048.png" alt="UDS Realty Logo" width={92} height={92} className="hidden md:inline-block" />
            <button onClick={() => setIsModalOpen(true)} className="bg-white/5 hover:bg-[#a3e635] border border-white/10 px-6 py-2 rounded-full transition-all text-[10px] font-black tracking-widest uppercase hover:text-[#051e12]">REGISTER NOW</button>
        </nav>

        <section className="min-h-[80vh] flex flex-col items-center justify-center text-center px-6 max-w-6xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="flex items-center gap-3 mb-6 bg-white/5 px-4 py-2 rounded-full border border-white/10">
            <div className="p-1 bg-[#ff3e03] rounded"><ArrowUpRight size={14} className="text-white" /></div>
            <span className="text-[#a3e635] text-[10px] font-black tracking-widest uppercase italic">Masterclass Series</span>
          </motion.div>
          
          <motion.h1 initial={{ y: 30, opacity: 0 }} animate={{ y: 0, opacity: 1 }} className="text-4xl md:text-7xl font-black text-white mb-8 leading-[0.9] uppercase italic tracking-tighter">
            The Real Estate <br/>
            <span className="text-[#a3e635]">Brokerage Blueprint</span>
          </motion.h1>

          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }} className="text-white/70 text-lg md:text-xl max-w-3xl mb-12 font-medium italic">
            "From getting Listings to Consistently Closing Deals" — Get to know what Top Brokers Do Differently.
          </motion.p>

          <div className="flex flex-wrap justify-center gap-4 mb-16">
            <div className="flex items-center gap-3 bg-white/5 border border-white/10 px-6 py-3 rounded-2xl backdrop-blur-md">
                <Calendar className="text-[#ff3e03]" size={20} />
                <div className="text-left"><p className="text-[10px] font-black text-white/40 uppercase">Date</p><p className="text-sm font-black italic">Sat, 28th March</p></div>
            </div>
            <div className="flex items-center gap-3 bg-white/5 border border-white/10 px-6 py-3 rounded-2xl backdrop-blur-md">
                <Clock className="text-[#ff3e03]" size={20} />
                <div className="text-left"><p className="text-[10px] font-black text-white/40 uppercase">Time</p><p className="text-sm font-black italic">6:00 PM – 8:00 PM</p></div>
            </div>
            <div className="flex items-center gap-3 bg-white/5 border border-white/10 px-6 py-3 rounded-2xl backdrop-blur-md">
                <Video className="text-[#a3e635]" size={20} />
                <div className="text-left"><p className="text-[10px] font-black text-white/40 uppercase">Platform</p><p className="text-sm font-black italic">ZOOM WEBINAR</p></div>
            </div>
          </div>

          <button onClick={() => setIsModalOpen(true)} className="group relative bg-[#a3e635] text-[#051e12] px-14 py-6 rounded-full font-black italic text-xl tracking-tighter hover:bg-white hover:scale-105 transition-all shadow-[0_20px_50px_rgba(163,230,53,0.3)]">
            SECURE MY SEAT — ₦50,000
          </button>
        </section>

        {/* Who is this for? */}
        <section className="py-24 px-6 max-w-7xl mx-auto border-t border-white/5">
            <h2 className="text-center text-3xl font-black italic uppercase tracking-tighter mb-16">This Masterclass is for:</h2>
            <div className="grid md:grid-cols-2 gap-8">
                <div className="p-10 rounded-[2.5rem] bg-white/5 border-l-4 border-[#a3e635] group hover:bg-white/10 transition-all">
                    <Target className="text-[#a3e635] mb-6" size={40} />
                    <h3 className="text-xl font-black text-white uppercase italic mb-4">Aspiring Brokers</h3>
                    <p className="text-white/50 font-medium">Individuals looking to join the real estate industry with a solid foundation and a clear path to profitability.</p>
                </div>
                <div className="p-10 rounded-[2.5rem] bg-white/5 border-l-4 border-[#ff3e03] group hover:bg-white/10 transition-all">
                    <TrendingUp className="text-[#ff3e03]" size={40} />
                    <h3 className="text-xl font-black text-white uppercase italic mb-4">Active Professionals</h3>
                    <p className="text-white/50 font-medium">Practising real estate professionals who want to sharpen their skills and improve their deal-closing performance.</p>
                </div>
            </div>
        </section>

        <footer className="py-12 text-center opacity-30 text-[10px] font-black tracking-[0.5em] uppercase border-t border-white/5">
           © 2026 UDS REALTY • THE BROKERAGE BLUEPRINT
        </footer>
      </div>
    </main>
  )
}