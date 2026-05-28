import React, { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

import riteshImg from '../assets/ritesh-sarpate.jpg'
import aditiyaImg from '../assets/aditiya-sarpate.jpg'
import anmolImg from '../assets/anmol-sarpate.jpg'

gsap.registerPlugin(ScrollTrigger)

const FOUNDERS = [
  {
    name: "Aditiya Devidas Sarpate",
    role: "The Culinary Visionary",
    desc: "Co-founded with a deep passion for cooking. He brings gourmet standards and authentic wok-breath fire to every dish.",
    initial: "A",
    image: aditiyaImg
  },
  {
    name: "Anmol Devidas Sarpate",
    role: "The Operations Master",
    desc: "Managing service, consistency, and customer relationships. The heartbeat of our warm hospitality.",
    initial: "A",
    image: anmolImg
  },
  {
    name: "Ritesh Devidas Sarpate",
    role: "The Quality Architect",
    desc: "Overseeing management, hygiene, and growth. Ensuring the experience remains as premium as the food we serve.",
    initial: "R",
    image: riteshImg
  }
]

const TIMELINE = [
  { 
    year: "2017", 
    title: "THE SPARK", 
    desc: "Three brothers started a small Chinese food stall in 2017 with passion, dedication and hard work. A humble vision to serve perfect Manchurians." 
  },
  { 
    year: "2019", 
    title: "LOCAL TRUST", 
    desc: "Over the years they earned customer trust through consistency, quality and commitment. Becoming a local legend in Parbhani." 
  },
  { 
    year: "2021", 
    title: "THE ARTISTRY", 
    desc: "Refining the secret spice mix and launching signature creations like Spring Potato and Chinese Bhel." 
  },
  { 
    year: "TODAY", 
    title: "LUXURY LEGACY", 
    desc: "Transforming Crossroad Manchurians into a high-end digital dining destination for food enthusiasts." 
  }
]

export default function FounderStory() {
  const lineRef = useRef(null)
  const containerRef = useRef(null)

  useEffect(() => {
    let ctx = gsap.context(() => {
      if (!lineRef.current || !containerRef.current) return
      gsap.fromTo(lineRef.current, 
        { scaleY: 0 },
        { 
          scaleY: 1, 
          ease: "none",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 30%",
            end: "bottom 70%",
            scrub: true
          }
        }
      )
    }, containerRef)
    return () => ctx.revert()
  }, [])

  return (
    <section ref={containerRef} className="py-16 md:py-24 px-5 md:px-20 bg-[#050505] relative overflow-hidden opacity-100 visibility-visible">
      {/* Background radial lighting */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[500px] h-[500px] bg-luxury-gold/5 rounded-full blur-[150px] pointer-events-none" />
      
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12 md:mb-16 space-y-6">
          <span className="text-luxury-gold uppercase tracking-[0.5em] text-[10px] block font-bold">The Visionaries</span>
          <h2 className="font-display text-4xl sm:text-5xl md:text-7xl lg:text-8xl text-white italic">Three Brothers. <br /> <span className="text-luxury-gold not-italic">One Legacy.</span></h2>
          <p className="text-zinc-500 max-w-2xl mx-auto text-base md:text-lg font-light leading-relaxed">
            Founded in 2017, Crossroad Manchurians is the story of three brothers united by passion, dedication, and an obsession with flavor.
          </p>
        </div>

        {/* Founders Cards */}
        <div className="grid md:grid-cols-3 gap-8 mb-40">
          {FOUNDERS.map((founder, i) => (
            <motion.div 
              key={founder.name}
              initial={{ y: 50, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              transition={{ delay: i * 0.15, duration: 0.8 }}
              className="glass-card p-10 text-center group hover:border-luxury-gold/30 transition-all duration-500 relative"
            >
              <div className="w-24 h-24 mx-auto mb-8 rounded-full bg-gradient-to-tr from-luxury-black to-zinc-800 border border-luxury-gold/20 flex items-center justify-center text-2xl font-display text-luxury-gold group-hover:scale-110 group-hover:border-luxury-gold transition-all duration-500 overflow-hidden">
                {founder.image ? (
                  <img src={founder.image} alt={founder.name} className="w-full h-full object-cover" />
                ) : (
                  founder.initial
                )}
              </div>
              <h3 className="font-display text-2xl text-white mb-2">{founder.name}</h3>
              <p className="text-luxury-gold text-xs uppercase tracking-[0.2em] mb-4">{founder.role}</p>
              <p className="text-zinc-400 text-sm leading-relaxed">{founder.desc}</p>
            </motion.div>
          ))}
        </div>

        {/* Timeline Journey */}
        <div className="flex flex-col lg:flex-row gap-12 md:gap-16 items-start mt-12 md:mt-20">
          <div className="lg:w-1/3">
            <span className="text-luxury-gold uppercase tracking-[0.5em] text-[10px] block mb-6 md:mb-8 font-bold">Our Milestones</span>
            <h2 className="font-display text-3xl sm:text-4xl md:text-6xl text-white mb-6 md:mb-8 italic">A Timeline of <br /> <span className="text-luxury-gold not-italic">Dedication.</span></h2>
            <p className="text-zinc-500 font-light text-base md:text-lg leading-relaxed">
              From our humble beginnings to a modern dining experience, we have remained committed to one thing: serving unforgettable flavors with absolute integrity.
            </p>
          </div>

          <div className="lg:w-2/3 relative pl-10 md:pl-20">
            {/* Vertical timeline track line */}
            <div className="absolute left-[15px] md:left-[39px] top-0 bottom-0 w-[1px] bg-white/10" />
            <div ref={lineRef} className="absolute left-[15px] md:left-[39px] top-0 bottom-0 w-[1px] bg-gradient-to-b from-luxury-gold to-luxury-orange origin-top scale-y-0" />

            <div className="space-y-40">
              {TIMELINE.map((item) => (
                <div key={item.year} className="relative group">
                  {/* Glowing Node on Line */}
                  <div className="absolute -left-[23px] md:-left-[47px] top-2 w-4 h-4 rounded-full bg-luxury-gold border-4 border-luxury-black shadow-[0_0_15px_rgba(212,175,55,0.8)] z-10 group-hover:scale-125 transition-transform duration-500" />
                  
                  <span className="font-display text-4xl sm:text-6xl md:text-8xl text-white/5 absolute -top-8 left-0 pointer-events-none select-none transition-colors group-hover:text-luxury-gold/5 duration-700">{item.year}</span>
                  <div className="relative z-10 pl-8 md:pl-10">
                    <h3 className="font-display text-2xl md:text-3xl text-white mb-4 uppercase tracking-widest group-hover:text-luxury-gold transition-colors duration-500">{item.title}</h3>
                    <p className="text-zinc-400 max-w-lg text-base font-light leading-relaxed group-hover:text-zinc-200 transition-colors duration-500">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
