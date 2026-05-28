import React from 'react'
import { motion } from 'framer-motion'
import { RiFireFill } from 'react-icons/ri'
import MediaWithFallback from '../components/MediaWithFallback'

const DISHES = [
  {
    name: "Manchurian Pakoda",
    desc: "Perfectly crispy outside and loaded with bold flavours inside — the signature taste that made Crossroad Manchurians a local favourite since 2017.",
    video: "https://assets.mixkit.co/videos/preview/mixkit-vegetables-and-spices-being-fried-in-a-pan-41223-large.mp4",
    image: "https://images.unsplash.com/photo-1585032226651-759b368d7246?q=80&w=800",
    tag: "Signature Speciality"
  },
  {
    name: "Spring Potato",
    desc: "Golden, crunchy and irresistibly addictive — every bite delivers the perfect mix of crispiness and flavour.",
    video: "https://assets.mixkit.co/videos/preview/mixkit-slow-motion-of-vegetables-being-fried-in-a-wok-41220-large.mp4",
    image: "https://images.unsplash.com/photo-1562967914-608f82629710?q=80&w=800",
    tag: "Popular Favorite"
  },
  {
    name: "Chinese Bhel",
    desc: "A spicy street-food experience packed with crunch, freshness and unforgettable taste.",
    video: "https://assets.mixkit.co/videos/preview/mixkit-chef-tossing-vegetables-in-a-wok-41225-large.mp4",
    image: "https://images.unsplash.com/photo-1512058560366-cd2427ffaa74?q=80&w=800",
    tag: "Street Fusion"
  }
]

function DishCard({ dish, index }) {
  return (
    <motion.div
      initial={{ y: 60, opacity: 0 }}
      whileInView={{ y: 0, opacity: 1 }}
      transition={{ delay: index * 0.15, duration: 0.8, ease: "easeOut" }}
      whileHover={{ y: -12 }}
      className="group relative h-[550px] w-full rounded-[2rem] overflow-hidden border border-white/10 glass-card transition-all duration-500 hover:border-luxury-gold/40 hover:shadow-[0_20px_50px_rgba(212,175,55,0.15)]"
    >
      {/* Media Background */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <MediaWithFallback
          type="video"
          src={dish.video}
          fallbackSrc={dish.image}
          className="h-full w-full object-cover transition-transform duration-1000 group-hover:scale-110 opacity-30 group-hover:opacity-55"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/45 to-transparent" />
      </div>

      {/* Content */}
      <div className="absolute inset-0 z-10 p-8 flex flex-col justify-end">
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <span className="px-4 py-1 rounded-full border border-luxury-gold/40 text-[9px] uppercase tracking-[0.25em] text-luxury-gold bg-luxury-gold/5 font-bold">
              {dish.tag}
            </span>
            <RiFireFill className="text-luxury-orange animate-pulse" />
          </div>
          
          <h3 className="font-display text-3xl md:text-4xl text-white group-hover:text-luxury-gold transition-colors duration-500">
            {dish.name}
          </h3>
          
          <p className="text-zinc-400 text-sm leading-relaxed max-w-sm group-hover:text-zinc-200 transition-colors duration-500">
            {dish.desc}
          </p>
          
          <div className="pt-6 flex items-center justify-between border-t border-white/10">
            <span className="text-[10px] uppercase tracking-[0.2em] text-luxury-gold hover:text-white font-bold transition-colors cursor-pointer flex items-center gap-2 group-hover:underline decoration-luxury-gold underline-offset-4">
              Explore Taste
            </span>
          </div>
        </div>
      </div>

      {/* Gold Rim Glow */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(212,175,55,0.08)_0%,transparent_60%)] opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
    </motion.div>
  )
}

export default function SignatureDishesSection() {
  return (
    <section className="py-16 md:py-24 px-5 md:px-20 bg-luxury-black relative overflow-hidden">
      <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-[600px] h-[600px] bg-luxury-gold/3 rounded-full blur-[200px] pointer-events-none" />
      
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 md:mb-16 gap-8">
          <div className="space-y-4">
            <span className="text-luxury-gold uppercase tracking-[0.4em] text-[10px] block font-bold">Chef's Masterpieces</span>
            <h2 className="font-display text-4xl sm:text-5xl md:text-7xl lg:text-8xl text-white">Signature <br /> <span className="text-luxury-gold italic font-light">Creations</span></h2>
          </div>
          <p className="text-zinc-500 max-w-sm text-base font-light leading-relaxed mb-4">
            Each dish represents a milestone in our history. A meticulous symphony of intense wok heat, crispy textures, and secret aromatics.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {DISHES.map((dish, i) => (
            <DishCard key={dish.name} dish={dish} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}
