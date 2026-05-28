import { motion, useScroll, useTransform } from 'framer-motion'
import { RiArrowRightLine, RiCalendarEventLine } from 'react-icons/ri'
import mascotImg from '../assets/mascot-transparent.png'

export default function HeroSection({ onExplore, onReserve }) {
  const { scrollY } = useScroll()

  const yBg = useTransform(scrollY, [0, 1000], ['0%', '15%'])
  const yText = useTransform(scrollY, [0, 800], [0, -80])

  return (
    <section className="relative h-screen w-full flex flex-col justify-center items-center overflow-hidden bg-[#0a0a0a] force-visible">
      
      {/* Brand New Cinematic Background */}
      <motion.div className="absolute inset-0 z-0" style={{ y: yBg }}>
        {/* Deep luxurious dark background with a completely different image to ensure it looks new */}
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?q=80&w=2000')] bg-cover bg-center -z-10 opacity-30 scale-110 filter blur-[8px]" />
        
        {/* Massive Center Spotlight Vignette */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(10,10,10,0.1)_0%,rgba(5,5,5,0.99)_85%)]" />
        
        {/* Epic Golden Fire Lighting from below */}
        <div className="absolute bottom-[-10%] left-1/2 -translate-x-1/2 w-[1000px] h-[500px] bg-[#ff8c00]/25 blur-[150px] rounded-[100%] pointer-events-none mix-blend-screen" />
      </motion.div>

      {/* Subtle Smoke Atmosphere */}
      <motion.div 
        animate={{ y: [0, -20, 0], opacity: [0.15, 0.25, 0.15] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        className="absolute inset-0 z-0 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-20 pointer-events-none mix-blend-screen"
      />

      <motion.div 
        className="relative z-20 px-5 max-w-[90rem] mx-auto w-full flex flex-col items-center text-center mt-20"
        style={{ y: yText }}
      >
        {/* NEW Elegant Sub-header */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.2, ease: "easeOut" }}
          className="flex items-center justify-center gap-6 mb-8 w-full"
        >
          <div className="h-[1px] w-12 sm:w-32 bg-gradient-to-r from-transparent to-[#d4af37]" />
          <span className="text-[#e2c779] uppercase text-[9px] sm:text-sm tracking-[0.3em] sm:tracking-[0.5em] font-sans font-medium drop-shadow-md text-center">
            An Unforgettable Culinary Journey
          </span>
          <div className="h-[1px] w-12 sm:w-32 bg-gradient-to-l from-transparent to-[#d4af37]" />
        </motion.div>
        
        {/* Massive Centered Serif Typography (Shifted Left only on Desktop) */}
        <motion.h1 
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
          className="font-display text-[2.5rem] min-[400px]:text-5xl sm:text-7xl md:text-[7.5rem] lg:text-[9.5rem] leading-[0.85] select-none tracking-tight w-full z-20 flex flex-col items-center translate-x-0 sm:-translate-x-8 md:-translate-x-16 lg:-translate-x-24"
          style={{ textShadow: '0px 20px 60px rgba(0,0,0,1)' }}
        >
          <span className="text-white drop-shadow-[0_2px_20px_rgba(255,255,255,0.3)] font-medium text-center">
            CROSSROAD
          </span>
          <span className="bg-clip-text text-transparent bg-gradient-to-b from-[#fff5d1] via-[#d4af37] to-[#8a5d10] font-bold drop-shadow-[0_10px_30px_rgba(212,175,55,0.5)] mt-4 text-center px-4">
            MANCHURIANS
          </span>
        </motion.h1>

        {/* Luxury Buttons Centered */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col sm:flex-row items-center justify-center gap-6 sm:gap-12 mt-16 z-30"
        >
          <motion.button 
            whileHover={{ scale: 1.05, backgroundColor: 'rgba(212, 175, 55, 0.15)' }}
            whileTap={{ scale: 0.95 }}
            onClick={onReserve}
            className="rounded-none border-b-2 border-[#d4af37] px-12 py-4 flex items-center justify-center gap-3 bg-transparent transition-all shadow-[0_10px_30px_rgba(212,175,55,0.1)] hover:shadow-[0_15px_40px_rgba(212,175,55,0.25)] hover:border-[#ffedba]"
          >
            <RiCalendarEventLine className="text-[#d4af37] text-xl" />
            <span className="text-[#d4af37] uppercase tracking-[0.3em] text-xs sm:text-sm font-sans font-bold">Reserve Table</span>
          </motion.button>

          <motion.button 
            whileHover={{ x: 5 }}
            onClick={onExplore}
            className="text-gray-300 hover:text-white uppercase tracking-[0.3em] text-xs sm:text-sm font-sans font-bold transition-colors py-4 flex items-center gap-3 group"
          >
            <span>Explore Experience</span>
            <RiArrowRightLine className="text-[#d4af37] group-hover:translate-x-3 transition-transform duration-300 text-xl" />
          </motion.button>
        </motion.div>
      </motion.div>

      {/* Mascot Integration - Now placed organically peeking from the bottom right */}
      <motion.div
        initial={{ opacity: 0, x: 100, y: 50 }}
        animate={{ opacity: 1, x: 0, y: 0 }}
        transition={{ delay: 1, duration: 1.8, ease: [0.2, 0.8, 0.2, 1] }}
        className="absolute right-0 sm:right-[-5%] md:right-[-2%] bottom-0 z-30 w-[110px] min-[400px]:w-[140px] sm:w-[280px] md:w-[340px] lg:w-[380px] pointer-events-none opacity-80 sm:opacity-100"
      >
        <div className="absolute top-[30%] right-[20%] w-[80%] h-[80%] bg-[#ffaa00]/30 blur-[120px] rounded-full mix-blend-screen -z-10" />
        
        <img 
          src={mascotImg} 
          alt="Premium Crossroad Manchurian Mascot" 
          className="w-full h-auto relative z-10"
          style={{
            filter: 'brightness(1.1) contrast(1.2) saturate(1.1) hue-rotate(5deg) drop-shadow(-25px 30px 50px rgba(0,0,0,0.95)) drop-shadow(20px -15px 40px rgba(212,175,55,0.4))'
          }}
        />
        
        <div className="absolute bottom-[2%] left-[45%] -translate-x-1/2 w-[60%] h-[20px] bg-black blur-[10px] rounded-[100%] -z-20 opacity-100" />
      </motion.div>

    </section>
  )
}
