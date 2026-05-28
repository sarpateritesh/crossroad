import { useEffect, useMemo, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { RiCalendarCheckLine, RiUserLine, RiPhoneLine, RiMailLine, RiChat3Line } from 'react-icons/ri'
import { BOOKING_TIMES } from '../assets/data/siteData'
import { createBooking } from '../services/bookingService'

const initialForm = {
  name: '',
  phone: '',
  email: '',
  bookingDate: '',
  bookingTime: '',
  guests: '2',
  specialRequest: '',
}

const STEPS = [
  { id: 1, title: 'Identity', icon: RiUserLine },
  { id: 2, title: 'Schedule', icon: RiCalendarCheckLine },
  { id: 3, title: 'Personalize', icon: RiChat3Line },
]

export default function BookingPage({ navigate }) {
  const [step, setStep] = useState(1)
  const [form, setForm] = useState(initialForm)
  const [errors, setErrors] = useState({})
  const [submitting, setSubmitting] = useState(false)
  const [serverMessage, setServerMessage] = useState('')

  const minDate = useMemo(() => new Date().toISOString().split('T')[0], [])

  const validateStep = (s) => {
    const nextErrors = {}
    if (s === 1) {
      if (!form.name.trim()) nextErrors.name = 'Full name is required'
      if (!/^[6-9]\d{9}$/.test(form.phone.trim())) nextErrors.phone = 'Valid 10-digit mobile required'
      if (!/^\S+@\S+\.\S+$/.test(form.email.trim())) nextErrors.email = 'Valid email required'
    } else if (s === 2) {
      if (!form.bookingDate) nextErrors.bookingDate = 'Select a date'
      if (!form.bookingTime) nextErrors.bookingTime = 'Select a time'
    }
    setErrors(nextErrors)
    return Object.keys(nextErrors).length === 0
  }

  const handleNext = () => {
    if (validateStep(step)) setStep(step + 1)
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setForm(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setSubmitting(true)
    try {
      await createBooking({
        customerName: form.name.trim(),
        mobileNumber: form.phone.trim(),
        email: form.email.trim(),
        bookingDate: form.bookingDate,
        bookingTime: form.bookingTime,
        numberOfGuests: Number(form.guests),
        specialRequest: form.specialRequest.trim(),
      })
      setServerMessage('Your table is being prepared. Our team will contact you shortly.')
      setStep(4)
    } catch (err) {
      setServerMessage(err.message)
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div className="pt-40 pb-24 px-5 md:px-10 min-h-screen bg-luxury-black flex flex-col items-center relative overflow-hidden">
      {/* Background Lighting */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-luxury-gold/5 rounded-full blur-[180px] pointer-events-none" />

      <div className="w-full max-w-3xl relative z-10">
        <div className="text-center mb-16 space-y-4">
          <span className="text-luxury-gold uppercase tracking-[0.5em] text-[10px] block font-bold">Reservations</span>
          <h1 className="font-display text-5xl md:text-8xl text-white italic">Secure Your <span className="text-luxury-gold not-italic">Table</span></h1>
        </div>

        {/* Custom Progress Tracker */}
        {step <= 3 && (
          <div className="mb-20 flex justify-between relative max-w-md mx-auto px-4">
            <div className="absolute top-[20px] left-[40px] right-[40px] h-[1px] bg-white/10 -z-0" />
            <motion.div 
              className="absolute top-[20px] left-[40px] h-[1px] bg-luxury-gold z-0"
              initial={{ width: '0%' }}
              animate={{ width: `${((step - 1) / (STEPS.length - 1)) * 78}%` }}
              transition={{ duration: 0.5 }}
            />
            {STEPS.map((s) => (
              <div key={s.id} className="relative z-10 flex flex-col items-center gap-3">
                <button 
                  onClick={() => step > s.id && setStep(s.id)}
                  disabled={step <= s.id}
                  className={`w-10 h-10 rounded-full flex items-center justify-center border transition-all duration-700 ${step >= s.id ? 'bg-luxury-gold border-luxury-gold text-luxury-black shadow-[0_0_15px_rgba(212,175,55,0.5)]' : 'bg-luxury-black border-white/10 text-zinc-500'}`}
                >
                  <s.icon />
                </button>
                <span className={`text-[8px] uppercase tracking-widest font-bold ${step >= s.id ? 'text-luxury-gold' : 'text-zinc-600'}`}>{s.title}</span>
              </div>
            ))}
          </div>
        )}

        <div className="glass-card p-8 md:p-16 relative overflow-hidden border border-white/10 backdrop-blur-2xl bg-white/[0.02]">
          <AnimatePresence mode="wait">
            {step === 1 && (
              <motion.div key="s1" initial={{ x: 20, opacity: 0 }} animate={{ x: 0, opacity: 1 }} exit={{ x: -20, opacity: 0 }} className="space-y-8">
                <div className="grid md:grid-cols-2 gap-8">
                  <div className="flex flex-col gap-2">
                    <span className="text-[10px] uppercase tracking-widest text-luxury-gold font-bold flex items-center gap-2"><RiUserLine /> Full Name</span>
                    <input 
                      name="name" 
                      value={form.name} 
                      onChange={handleChange} 
                      placeholder="Aditiya Devidas Sarpate" 
                      className="w-full rounded-xl border border-white/10 bg-white/5 px-5 py-3.5 text-sm text-white focus:border-luxury-gold/50 focus:shadow-[0_0_15px_rgba(212,175,55,0.15)] outline-none transition-all"
                    />
                    {errors.name && <small className="text-luxury-orange text-xs mt-1">{errors.name}</small>}
                  </div>
                  <div className="flex flex-col gap-2">
                    <span className="text-[10px] uppercase tracking-widest text-luxury-gold font-bold flex items-center gap-2"><RiPhoneLine /> Mobile Number</span>
                    <input 
                      name="phone" 
                      value={form.phone} 
                      onChange={handleChange} 
                      placeholder="8180080616" 
                      maxLength="10" 
                      className="w-full rounded-xl border border-white/10 bg-white/5 px-5 py-3.5 text-sm text-white focus:border-luxury-gold/50 focus:shadow-[0_0_15px_rgba(212,175,55,0.15)] outline-none transition-all"
                    />
                    {errors.phone && <small className="text-luxury-orange text-xs mt-1">{errors.phone}</small>}
                  </div>
                </div>
                <div className="flex flex-col gap-2">
                  <span className="text-[10px] uppercase tracking-widest text-luxury-gold font-bold flex items-center gap-2"><RiMailLine /> Email Address</span>
                  <input 
                    name="email" 
                    value={form.email} 
                    onChange={handleChange} 
                    placeholder="hello@crossroad.com" 
                    className="w-full rounded-xl border border-white/10 bg-white/5 px-5 py-3.5 text-sm text-white focus:border-luxury-gold/50 focus:shadow-[0_0_15px_rgba(212,175,55,0.15)] outline-none transition-all"
                  />
                  {errors.email && <small className="text-luxury-orange text-xs mt-1">{errors.email}</small>}
                </div>
                <button onClick={handleNext} className="luxury-button w-full mt-10 hover:border-luxury-gold hover:text-white transition-all cursor-pointer">
                  Next: Choose Schedule
                </button>
              </motion.div>
            )}

            {step === 2 && (
              <motion.div key="s2" initial={{ x: 20, opacity: 0 }} animate={{ x: 0, opacity: 1 }} exit={{ x: -20, opacity: 0 }} className="space-y-8">
                <div className="grid md:grid-cols-3 gap-8">
                  <div className="flex flex-col gap-2">
                    <span className="text-[10px] uppercase tracking-widest text-luxury-gold font-bold">Date</span>
                    <input 
                      type="date" 
                      name="bookingDate" 
                      value={form.bookingDate} 
                      onChange={handleChange} 
                      min={minDate} 
                      className="w-full rounded-xl border border-white/10 bg-white/5 px-5 py-3.5 text-sm text-white focus:border-luxury-gold/50 focus:shadow-[0_0_15px_rgba(212,175,55,0.15)] outline-none transition-all [color-scheme:dark]"
                    />
                    {errors.bookingDate && <small className="text-luxury-orange text-xs mt-1">{errors.bookingDate}</small>}
                  </div>
                  <div className="flex flex-col gap-2">
                    <span className="text-[10px] uppercase tracking-widest text-luxury-gold font-bold">Time Slot</span>
                    <select 
                      name="bookingTime" 
                      value={form.bookingTime} 
                      onChange={handleChange}
                      className="w-full rounded-xl border border-white/10 bg-white/5 px-5 py-3.5 text-sm text-white focus:border-luxury-gold/50 focus:shadow-[0_0_15px_rgba(212,175,55,0.15)] outline-none transition-all cursor-pointer appearance-none bg-[url('data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%2020%2020%22%20fill%3D%22none%22%3E%3Cpath%20d%3D%22M7%209l3%203%203-3%22%20stroke%3D%22%23d4af37%22%20stroke-width%3D%221.5%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%2F%3E%3C%2Fsvg%3E')] bg-[length:20px_20px] bg-[right_12px_center] bg-no-repeat pr-10"
                    >
                      <option value="" className="bg-[#050505] text-zinc-500">Choose Time</option>
                      {BOOKING_TIMES.map(t => <option key={t} value={t} className="bg-[#050505] text-white">{t}</option>)}
                    </select>
                    {errors.bookingTime && <small className="text-luxury-orange text-xs mt-1">{errors.bookingTime}</small>}
                  </div>
                  <div className="flex flex-col gap-2">
                    <span className="text-[10px] uppercase tracking-widest text-luxury-gold font-bold">Guests</span>
                    <input 
                      type="number" 
                      name="guests" 
                      value={form.guests} 
                      onChange={handleChange} 
                      min="1" 
                      max="20" 
                      className="w-full rounded-xl border border-white/10 bg-white/5 px-5 py-3.5 text-sm text-white focus:border-luxury-gold/50 focus:shadow-[0_0_15px_rgba(212,175,55,0.15)] outline-none transition-all"
                    />
                  </div>
                </div>
                <div className="flex gap-4 pt-4">
                  <button onClick={() => setStep(1)} className="px-8 py-4 border border-white/10 rounded-full text-zinc-500 hover:text-white transition-all text-[10px] uppercase tracking-widest font-bold bg-transparent">Back</button>
                  <button onClick={handleNext} className="luxury-button flex-1 cursor-pointer">Next: Personalize</button>
                </div>
              </motion.div>
            )}

            {step === 3 && (
              <motion.div key="s3" initial={{ x: 20, opacity: 0 }} animate={{ x: 0, opacity: 1 }} exit={{ x: -20, opacity: 0 }} className="space-y-8">
                <div className="flex flex-col gap-2">
                  <span className="text-[10px] uppercase tracking-widest text-luxury-gold font-bold flex items-center gap-2"><RiChat3Line /> Special Request (Optional)</span>
                  <textarea 
                    name="specialRequest" 
                    value={form.specialRequest} 
                    onChange={handleChange} 
                    rows="4" 
                    placeholder="Allergies, birthday celebration, table preferences..." 
                    className="w-full rounded-xl border border-white/10 bg-white/5 px-5 py-3.5 text-sm text-white focus:border-luxury-gold/50 focus:shadow-[0_0_15px_rgba(212,175,55,0.15)] outline-none transition-all resize-none"
                  />
                </div>
                <div className="flex gap-4 pt-4">
                  <button onClick={() => setStep(2)} className="px-8 py-4 border border-white/10 rounded-full text-zinc-500 hover:text-white transition-all text-[10px] uppercase tracking-widest font-bold bg-transparent">Back</button>
                  <button onClick={handleSubmit} disabled={submitting} className="luxury-button flex-1 cursor-pointer disabled:opacity-50">
                    {submitting ? 'Confirming...' : 'Request Reservation'}
                  </button>
                </div>
                {serverMessage && <p className="text-center text-luxury-orange text-sm mt-4 italic">{serverMessage}</p>}
              </motion.div>
            )}

            {step === 4 && (
              <motion.div key="s4" initial={{ scale: 0.95, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="text-center space-y-8 py-10">
                <div className="w-20 h-20 rounded-full bg-luxury-gold/10 border border-luxury-gold flex items-center justify-center mx-auto text-luxury-gold text-4xl shadow-[0_0_20px_rgba(212,175,55,0.35)] animate-pulse">
                   <RiCalendarCheckLine />
                </div>
                <h2 className="font-display text-4xl text-white">Reservation Secured</h2>
                <p className="text-zinc-400 max-w-md mx-auto leading-relaxed text-sm">{serverMessage}</p>
                <button onClick={() => navigate('/')} className="luxury-button cursor-pointer">Return to Experience</button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  )
}
