import React from 'react'
import CountUp from 'react-countup'
import { motion } from 'framer-motion'
import { RiStarFill, RiGoogleFill } from 'react-icons/ri'

const CountUpComponent = typeof CountUp === 'function' ? CountUp : (CountUp.default || CountUp)

const REVIEWS = [
  { 
    name: "Rahul Deshmukh", 
    role: "Local Foodie", 
    text: "The texture of their Manchurian is unlike anything else. It's crispy even after 30 minutes. Truly the best in Parbhani." 
  },
  { 
    name: "Priya Sharma", 
    role: "Critics Choice", 
    text: "Crossroad has maintained its quality for 7 years. The new luxury experience perfectly matches their incredible food." 
  },
  { 
    name: "Siddharth Malhotra", 
    role: "Frequent Diner", 
    text: "The Spring Potato is a must-try. The spice blend is addictive. A world-class experience right here in our city." 
  },
]

export default function ReviewsSection() {
  return (
    <section className="py-16 md:py-24 px-5 md:px-20 bg-[#050505] overflow-hidden relative opacity-100 visibility-visible">
      {/* Top Divider */}
      <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent" />
      
      {/* Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[300px] bg-luxury-gold/3 rounded-full blur-[180px] pointer-events-none" />

      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-[1.2fr_2fr] gap-12 lg:gap-16 items-center mb-12 md:mb-16">
          <div className="space-y-8">
            <span className="text-luxury-gold uppercase tracking-[0.4em] text-[10px] block font-bold">Social Proof</span>
            <h2 className="font-display text-4xl sm:text-5xl md:text-7xl text-white italic">Guest <br /> <span className="text-luxury-gold not-italic">Reflections</span></h2>
            <p className="text-zinc-500 font-light text-base leading-relaxed">
              We take pride in our service and food quality. See what our community has to say about their dining experiences at Crossroad.
            </p>

            {/* Google Badge Card */}
            <div className="glass-card p-8 border-l-4 border-l-luxury-gold flex items-center gap-6 max-w-sm">
              <div className="w-14 h-14 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white text-3xl">
                <RiGoogleFill className="text-luxury-gold" />
              </div>
              <div className="space-y-1">
                <h4 className="font-semibold text-white">Google Reviews</h4>
                <div className="flex gap-1 text-luxury-gold">
                  {[...Array(5)].map((_, i) => <RiStarFill key={i} />)}
                </div>
                <p className="text-xs text-zinc-500 font-light">4.8 / 5.0 Average Rating</p>
              </div>
            </div>
          </div>

          {/* Stats & Counters Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-6 bg-white/[0.02] border border-white/5 backdrop-blur-md rounded-[2rem] p-10">
            <div className="text-center space-y-2 border-b sm:border-b-0 sm:border-r border-white/10 pb-6 sm:pb-0">
              <div className="font-display text-4xl md:text-6xl text-luxury-gold">
                <CountUpComponent end={4.8} decimals={1} duration={3} enableScrollSpy scrollSpyOnce />
              </div>
              <p className="text-[9px] uppercase tracking-widest text-zinc-500 font-bold">Rating</p>
            </div>
            
            <div className="text-center space-y-2 border-b sm:border-b-0 sm:border-r border-white/10 pb-6 sm:pb-0">
              <div className="font-display text-4xl md:text-6xl text-white">
                <CountUpComponent end={1500} suffix="+" duration={3} enableScrollSpy scrollSpyOnce />
              </div>
              <p className="text-[9px] uppercase tracking-widest text-zinc-500 font-bold">Reviews</p>
            </div>

            <div className="text-center space-y-2">
              <div className="font-display text-4xl md:text-6xl text-luxury-gold">
                <CountUpComponent end={99} suffix="%" duration={3} enableScrollSpy scrollSpyOnce />
              </div>
              <p className="text-[9px] uppercase tracking-widest text-zinc-500 font-bold">Loyalty</p>
            </div>
          </div>
        </div>

        {/* Testimonials List */}
        <div className="grid md:grid-cols-3 gap-8">
          {REVIEWS.map((r, i) => (
            <motion.div 
              key={i}
              initial={{ y: 40, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              transition={{ delay: i * 0.15, duration: 0.8 }}
              className="glass-card p-10 flex flex-col justify-between hover:border-luxury-gold/30 group transition-all duration-500 relative"
            >
              {/* Star icons inside testimonial */}
              <div className="flex gap-1 text-luxury-gold mb-6 text-sm">
                {[...Array(5)].map((_, idx) => <RiStarFill key={idx} />)}
              </div>
              
              <p className="text-zinc-400 text-base font-light leading-relaxed italic group-hover:text-zinc-200 transition-colors duration-500 mb-10">
                "{r.text}"
              </p>
              
              <div className="pt-6 border-t border-white/5">
                <h4 className="font-display text-xl text-white">{r.name}</h4>
                <p className="text-[8px] uppercase tracking-[0.3em] text-luxury-gold mt-2 font-bold">{r.role}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
