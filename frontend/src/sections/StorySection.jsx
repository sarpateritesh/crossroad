import { useEffect, useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export default function StorySection() {
  const sectionRef = useRef(null)
  const textRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(textRef.current, 
        { y: 100, opacity: 0 },
        { 
          y: 0, 
          opacity: 1, 
          duration: 1.5, 
          ease: "power4.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 80%",
            end: "top 20%",
            scrub: 1
          }
        }
      )
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} className="relative min-h-screen py-32 px-5 md:px-20 flex flex-col items-center justify-center">
      <div className="max-w-4xl text-center space-y-12">
        <motion.span 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          className="text-luxury-gold uppercase tracking-[0.3em] text-sm block"
        >
          The Genesis
        </motion.span>
        
        <h2 ref={textRef} className="font-display text-4xl md:text-7xl text-white leading-tight">
          A Legacy of <span className="text-luxury-gold italic font-light">Taste</span> Born from <span className="underline decoration-luxury-orange underline-offset-8">Passion</span>
        </h2>

        <div className="grid md:grid-cols-2 gap-12 text-left mt-20">
          <motion.div 
            initial={{ x: -50, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            transition={{ duration: 1 }}
            className="space-y-6"
          >
            <p className="text-zinc-400 text-lg leading-relaxed">
              In 2017, Crossroad Manchurians began as a humble vision in Parbhani. What started as a quest for the perfect Manchurian texture evolved into a local legend, defined by the secret blend of spices and the unmistakable "wok-breath" flavor.
            </p>
          </motion.div>

          <motion.div 
            initial={{ x: 50, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            transition={{ duration: 1 }}
            className="space-y-6"
          >
            <p className="text-zinc-400 text-lg leading-relaxed">
              Our philosophy is simple: Luxury isn't just about the setting; it's about the depth of flavor. We source the finest ingredients, from hand-picked vegetables to artisanal sauces, ensuring every plate tells a story of dedication and craftsmanship.
            </p>
          </motion.div>
        </div>

        <div className="mt-20 relative h-[400px] w-full rounded-3xl overflow-hidden glass-card p-2">
          <video
            autoPlay
            muted
            loop
            playsInline
            className="h-full w-full object-cover rounded-2xl opacity-60"
          >
            <source src="https://assets.mixkit.co/videos/preview/mixkit-chef-preparing-vegetables-for-cooking-41219-large.mp4" type="video/mp4" />
          </video>
          <div className="absolute inset-0 flex items-center justify-center">
             <div className="px-8 py-4 border border-white/20 backdrop-blur-md rounded-full text-white text-xs uppercase tracking-[0.2em]">
                Authentic Craftsmanship
             </div>
          </div>
        </div>
      </div>
    </section>
  )
}
