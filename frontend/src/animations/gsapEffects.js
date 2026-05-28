import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export function runHeroIntro(scope) {
  const heroTargets = ['.hero-eyebrow', '.hero-title-line', '.hero-subtitle', '.hero-cta', '.hero-scroll-indicator']

  const makeHeroVisible = () => {
    gsap.set(heroTargets, {
      autoAlpha: 1,
      y: 0,
      clearProps: 'opacity,visibility,transform',
    })
  }

  const ctx = gsap.context(() => {
    const timeline = gsap.timeline({
      defaults: { ease: 'power3.out' },
      onComplete: makeHeroVisible,
    })

    timeline
      .fromTo('.hero-title-line', { y: 80, autoAlpha: 0 }, { y: 0, autoAlpha: 1, duration: 1 }, 0)
      .fromTo('.hero-subtitle', { y: 40, autoAlpha: 0 }, { y: 0, autoAlpha: 1, duration: 0.85 }, 0.3)
      .fromTo('.hero-cta', { y: 40, autoAlpha: 0 }, { y: 0, autoAlpha: 1, duration: 0.75 }, 0.45)
      .fromTo('.hero-scroll-indicator', { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.8 }, 0.8)
  }, scope)

  return () => {
    ctx.revert()
    makeHeroVisible()
  }
}

export function mountImageZoom(selector) {
  const ctx = gsap.context(() => {
    gsap.utils.toArray(selector).forEach((item) => {
      gsap.fromTo(
        item,
        { scale: 1.15, opacity: 0.7 },
        {
          scale: 1,
          opacity: 1,
          duration: 1.4,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: item,
            start: 'top 90%',
            once: true,
          },
        },
      )
    })
  })

  return () => ctx.revert()
}
