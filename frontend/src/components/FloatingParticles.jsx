import { motion } from 'framer-motion'

export default function FloatingParticles() {
  const particles = new Array(20).fill(null)

  return (
    <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
      {particles.map((_, i) => {
        const size = Math.random() * 3 + 1
        return (
          <motion.div
            key={i}
            className="absolute rounded-full bg-luxury-gold/20 blur-[1px]"
            style={{
              width: size,
              height: size,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -100, 0],
              opacity: [0, 0.5, 0],
              scale: [0.5, 1.2, 0.5],
            }}
            transition={{
              duration: 10 + Math.random() * 20,
              repeat: Infinity,
              ease: "linear",
              delay: Math.random() * 10
            }}
          />
        )
      })}
    </div>
  )
}
