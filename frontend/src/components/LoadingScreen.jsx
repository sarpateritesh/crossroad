import { motion } from 'framer-motion'

export default function LoadingScreen() {
  return (
    <motion.div
      className="fixed inset-0 z-[999] flex items-center justify-center bg-luxury-black"
      initial={{ opacity: 1 }}
      animate={{ opacity: 1 }}
      exit={{ 
        opacity: 0,
        transition: { duration: 1, ease: [0.77, 0, 0.175, 1] }
      }}
    >
      <div className="relative flex flex-col items-center">
        <motion.div
          initial={{ y: "100%", opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 1.2, ease: "circOut" }}
          className="text-center"
        >
          <h2 className="font-display text-4xl md:text-[6rem] text-white tracking-[0.4em] uppercase leading-none">CROSSROAD</h2>
          <div className="flex items-center gap-6 mt-8 overflow-hidden">
            <div className="h-[1px] flex-1 bg-gradient-to-r from-transparent to-luxury-gold" />
            <span className="text-[10px] uppercase tracking-[0.8em] text-luxury-gold whitespace-nowrap italic">EST. 2017</span>
            <div className="h-[1px] flex-1 bg-gradient-to-l from-transparent to-luxury-gold" />
          </div>
        </motion.div>
        
        <div className="mt-20 flex flex-col items-center gap-4">
           <motion.div 
             className="h-[1px] w-40 bg-white/10 overflow-hidden"
           >
             <motion.div 
               className="h-full bg-luxury-gold"
               initial={{ x: "-100%" }}
               animate={{ x: "100%" }}
               transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
             />
           </motion.div>
           <span className="text-[8px] uppercase tracking-[0.6em] text-zinc-600">Preparing the Experience</span>
        </div>
      </div>
    </motion.div>
  )
}
