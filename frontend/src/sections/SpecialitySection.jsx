import React from 'react'
import { motion } from 'framer-motion'
import { RiFireLine, RiCheckboxCircleLine } from 'react-icons/ri'
import MediaWithFallback from '../components/MediaWithFallback'

export default function SpecialitySection() {
  return (
    <section className="py-16 md:py-24 px-5 md:px-20 bg-luxury-black relative overflow-hidden">
      {/* Cinematic Spotlight Radial Background */}
      <div className="absolute top-1/2 left-2/3 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-gradient-to-r from-luxury-gold/10 to-transparent rounded-full blur-[200px] pointer-events-none" />
      <div className="absolute top-10 left-10 w-[300px] h-[300px] bg-luxury-orange/5 rounded-full blur-[150px] pointer-events-none" />

      <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
        {/* Left Side: Spotlight Details */}
        <motion.div 
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 1.2, ease: "easeOut" }}
          viewport={{ once: true }}
          className="space-y-8 relative z-10"
        >
          <div className="inline-flex items-center gap-3 px-4 py-1.5 rounded-full border border-luxury-gold/40 bg-luxury-gold/5 text-luxury-gold text-[9px] uppercase tracking-[0.25em] font-bold">
            <RiFireLine className="animate-pulse" /> Main Speciality
          </div>
          
          <h2 className="font-display text-4xl sm:text-5xl md:text-7xl lg:text-8xl text-white leading-none uppercase">
            Manchurian <br />
            <span className="text-luxury-gold italic font-light not-uppercase">Pakoda</span>
          </h2>
          
          <p className="text-zinc-300 text-lg md:text-xl font-light leading-relaxed max-w-xl">
            “Perfectly crispy outside and loaded with bold flavours inside — the signature taste that made Crossroad Manchurians a local favourite since 2017.”
          </p>

          <div className="grid grid-cols-2 gap-6 pt-6 border-t border-white/10 max-w-md">
            <div className="flex items-center gap-3">
              <RiCheckboxCircleLine className="text-luxury-gold text-lg" />
              <span className="text-xs text-zinc-400 font-light">Double-Fried Crunch</span>
            </div>
            <div className="flex items-center gap-3">
              <RiCheckboxCircleLine className="text-luxury-gold text-lg" />
              <span className="text-xs text-zinc-400 font-light">Secret Spice Glaze</span>
            </div>
            <div className="flex items-center gap-3">
              <RiCheckboxCircleLine className="text-luxury-gold text-lg" />
              <span className="text-xs text-zinc-400 font-light">Est. 2017 Heritage</span>
            </div>
            <div className="flex items-center gap-3">
              <RiCheckboxCircleLine className="text-luxury-gold text-lg" />
              <span className="text-xs text-zinc-400 font-light">Crafted by Brothers</span>
            </div>
          </div>

          <div className="pt-6">
            <a 
              href="#/booking" 
              className="inline-flex items-center justify-center rounded-full px-10 py-4 text-sm font-semibold tracking-[0.1em] uppercase bg-gradient-to-r from-luxury-gold to-amber-500 text-black shadow-[0_12px_40px_rgba(212,175,55,0.35)] hover:brightness-110 transition-all duration-500 hover:scale-105"
            >
              Reserve a Table to Experience
            </a>
          </div>
        </motion.div>

        {/* Right Side: Cinematic Image Wrapper with Spotlights */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.5, ease: "easeOut" }}
          viewport={{ once: true }}
          className="relative group justify-self-center lg:justify-self-end w-full max-w-xl"
        >
          {/* Outer glowing border ring */}
          <div className="absolute -inset-1 rounded-[2.5rem] bg-gradient-to-tr from-luxury-gold to-luxury-orange opacity-30 blur-lg group-hover:opacity-75 transition-all duration-700 pointer-events-none" />
          
          {/* Outer spotlight frame */}
          <div className="relative rounded-[2.5rem] overflow-hidden border border-white/20 glass-card p-3 bg-black/40">
            <div className="relative h-[480px] w-full rounded-[2rem] overflow-hidden">
              <MediaWithFallback
                type="image"
                src="https://images.unsplash.com/photo-1585032226651-759b368d7246?q=80&w=1200"
                alt="Manchurian Pakoda Specialty"
                className="h-full w-full object-cover transition-transform duration-[2000ms] group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/10 to-transparent" />
            </div>
          </div>

          {/* Glowing dot highlights */}
          <div className="absolute -top-4 -left-4 w-8 h-8 rounded-full bg-luxury-gold/20 border border-luxury-gold/50 flex items-center justify-center text-[10px] text-luxury-gold font-bold shadow-[0_0_15px_rgba(212,175,55,0.6)] animate-bounce">
            ★
          </div>
        </motion.div>
      </div>
    </section>
  )
}
