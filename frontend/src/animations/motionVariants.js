export const pageTransition = {
  initial: { opacity: 0, scale: 1.02, y: 10 },
  animate: { 
    opacity: 1, 
    scale: 1, 
    y: 0,
    transition: { 
      duration: 1, 
      ease: [0.77, 0, 0.175, 1] 
    }
  },
  exit: { 
    opacity: 0, 
    scale: 0.98,
    transition: { 
      duration: 0.6, 
      ease: [0.77, 0, 0.175, 1] 
    }
  },
}

export const staggerContainer = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.3
    },
  },
}

export const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 1,
      ease: [0.22, 1, 0.36, 1],
    },
  },
}
