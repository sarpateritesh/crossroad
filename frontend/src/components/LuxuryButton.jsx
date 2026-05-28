import { motion } from 'framer-motion'

function LuxuryButton({ children, href, onClick, variant = 'gold', className = '', type = 'button', disabled = false }) {
  const shared =
    'inline-flex items-center justify-center rounded-full px-7 py-3 text-sm md:text-base font-medium tracking-[0.08em] uppercase transition-all duration-500'

  const variants = {
    gold: 'bg-gradient-to-r from-amber-400 to-orange-500 text-black shadow-[0_12px_35px_rgba(245,158,11,0.35)] hover:brightness-110',
    ghost: 'border border-white/45 text-white backdrop-blur-md hover:bg-white/10',
  }

  const content = (
    <motion.span
      whileHover={{ y: -2 }}
      whileTap={{ scale: 0.98 }}
      className={`${shared} ${variants[variant]} ${className}`}
    >
      {children}
    </motion.span>
  )

  if (href) {
    return <a href={href}>{content}</a>
  }

  return (
    <button type={type} onClick={onClick} disabled={disabled}>
      {content}
    </button>
  )
}

export default LuxuryButton
