import { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const FOUNDERS = [
  {
    name: "Aditiya Sarpate",
    role: "The Visionary",
    desc: "Co-founded with a dream to bring gourmet standards to street-style Manchurian."
  },
  {
    name: "Anmol Sarpate",
    role: "The Culinary Master",
    desc: "The soul behind our secret spices and the master of the wok."
  },
  {
    name: "Ritesh Sarpate",
    role: "The Architect",
    desc: "Ensuring the experience remains as premium as the food we serve."
  }
]

const MILESTONES = [
  { year: "2017", title: "The First Wok", desc: "Crossroad Manchurians opens its first humble stall in Parbhani." },
  { year: "2019", title: "Local Legend", desc: "Voted #1 street food destination by the community." },
  { year: "2021", title: "Expansion", desc: "Refining the menu and introducing signature fusion dishes." },
  { year: "2024", title: "Digital Luxury", desc: "Transforming the brand into a world-class digital experience." }
]

export default function FoundersSection() {
  const containerRef = useRef(null)
  const lineRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(lineRef.current, 
        { scaleY: 0 },
        { 
          scaleY: 1, 
          ease: "none",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 20%",
            end: "bottom 80%",
            scrub: true
          }
        }
      )
    }, containerRef)
    return () => ctx.revert()
  }, [])

  return (
    <section ref={containerRef} className="py-32 px-5 md:px-20 bg-luxury-black relative">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-32 space-y-6">
          <motion.span 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="text-luxury-gold uppercase tracking-[0.4em] text-xs block"
          >
            The Faces Behind the Flame
          </motion.span>
          <h2 className="font-display text-5xl md:text-8xl text-white">Three Brothers. <br /> <span className="text-luxury-gold italic">One Legacy.</span></h2>
          <p className="text-zinc-500 max-w-2xl mx-auto text-lg font-light">
            Founded in 2017, Crossroad Manchurians is the story of Aditiya, Anmol, and Ritesh Sarpate — a brotherhood united by passion, dedication, and an obsession with flavor.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-12 mb-40">
          {FOUNDERS.map((founder, i) => (
            <motion.div 
              key={founder.name}
              initial={{ y: 50, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              transition={{ delay: i * 0.2, duration: 0.8 }}
              className="glass-card p-10 text-center group hover:border-luxury-gold/30 transition-all duration-500"
            >
              <div className="w-32 h-32 mx-auto mb-8 rounded-full bg-gradient-to-tr from-luxury-black to-zinc-800 border border-white/10 flex items-center justify-center text-3xl font-display text-luxury-gold group-hover:scale-110 transition-transform duration-500">
                {founder.name[0]}
              </div>
              <h3 className="font-display text-2xl text-white mb-2">{founder.name}</h3>
              <p className="text-luxury-gold text-xs uppercase tracking-[0.2em] mb-4">{founder.role}</p>
              <p className="text-zinc-400 text-sm leading-relaxed">{founder.desc}</p>
            </motion.div>
          ))}
        </div>

        <div className="relative mt-32">
          {/* Vertical Timeline Line */}
          <div className="absolute left-1/2 -translate-x-1/2 h-full w-[1px] bg-white/10" />
          <div ref={lineRef} className="absolute left-1/2 -translate-x-1/2 h-full w-[1px] bg-gradient-to-b from-luxury-gold to-luxury-orange origin-top scale-y-0" />

          <div className="space-y-40 relative z-10">
            {MILESTONES.map((item, i) => (
              <div key={item.year} className={`flex flex-col md:flex-row items-center justify-center gap-10 md:gap-40 ${i % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'}`}>
                <div className={`flex-1 text-center ${i % 2 === 0 ? 'md:text-right' : 'md:text-left'}`}>
                  <motion.div
                    initial={{ x: i % 2 === 0 ? -50 : 50, opacity: 0 }}
                    whileInView={{ x: 0, opacity: 1 }}
                    transition={{ duration: 1 }}
                  >
                    <span className="font-display text-6xl md:text-9xl text-white/5 absolute -top-10 md:-top-20 left-1/2 md:left-auto md:right-0 transform -translate-x-1/2 md:translate-x-0 select-none">
                      {item.year}
                    </span>
                    <h4 className="font-display text-3xl text-luxury-gold mb-4 relative z-10">{item.title}</h4>
                    <p className="text-zinc-400 max-w-sm mx-auto md:mx-0 relative z-10 inline-block">{item.desc}</p>
                  </motion.div>
                </div>
                
                <div className="w-4 h-4 rounded-full bg-luxury-gold border-4 border-luxury-black relative z-20 shadow-[0_0_20px_rgba(212,175,55,0.8)]" />
                
                <div className="flex-1 hidden md:block" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
