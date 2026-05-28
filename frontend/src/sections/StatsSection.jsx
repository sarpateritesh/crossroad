import React from 'react'
import CountUp from 'react-countup'
import { motion } from 'framer-motion'

const CountUpComponent = typeof CountUp === 'function' ? CountUp : (CountUp.default || CountUp)

const STATS = [
  { label: 'Years Of Flame', value: 7, suffix: '+' },
  { label: 'Happy Guests', value: 50, suffix: 'K+' },
  { label: 'Signature Dishes', value: 15, suffix: '' },
  { label: 'Secret Spices', value: 24, suffix: '' },
]

export default function StatsSection() {
  return (
    <section className="py-16 md:py-24 px-5 bg-black/40 border-y border-white/5 opacity-100 visibility-visible backdrop-blur-sm">
      <div className="max-w-7xl mx-auto grid grid-cols-2 lg:grid-cols-4 gap-20">
        {STATS.map((s, i) => (
          <motion.div 
            key={s.label} 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1, duration: 1 }}
            className="text-center group"
          >
            <div className="font-display text-5xl md:text-8xl text-white group-hover:text-luxury-gold transition-colors duration-700">
              <CountUpComponent end={s.value} duration={4} enableScrollSpy scrollSpyOnce />
              <span className="text-luxury-gold">{s.suffix}</span>
            </div>
            <p className="text-[10px] uppercase tracking-[0.5em] text-zinc-500 mt-6 group-hover:text-zinc-300 transition-colors">{s.label}</p>
          </motion.div>
        ))}
      </div>
    </section>
  )
}
