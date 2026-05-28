import { motion } from 'framer-motion'
import { RiPhoneLine, RiWhatsappLine, RiInstagramLine, RiMapPin2Line, RiMailLine } from 'react-icons/ri'
import { pageTransition } from '../animations/motionVariants'

const CONTACTS = [
  { icon: RiPhoneLine, label: 'Reservations Phone 1', value: '+91 81800 80616', href: 'tel:8180080616' },
  { icon: RiPhoneLine, label: 'Reservations Phone 2', value: '+91 78753 70836', href: 'tel:7875370836' },
  { icon: RiPhoneLine, label: 'Reservations Phone 3', value: '+91 72492 47258', href: 'tel:7249247258' },
  { icon: RiWhatsappLine, label: 'WhatsApp Concierge', value: 'Chat on WhatsApp', href: 'https://wa.me/918180080616' },
  { icon: RiInstagramLine, label: 'Instagram Profile', value: '@crossroad_manchurian_corner', href: 'https://www.instagram.com/crossroad_manchurian_corner' },
  { icon: RiMailLine, label: 'Email Concierge', value: 'hello@crossroad.com', href: 'mailto:hello@crossroad.com' },
]

export default function ContactPage() {
  return (
    <motion.main
      initial={pageTransition.initial}
      animate={pageTransition.animate}
      exit={pageTransition.exit}
      transition={pageTransition.transition}
      className="pt-40 pb-24 px-5 md:px-10 min-h-screen bg-luxury-black relative overflow-hidden"
    >
      {/* Background glow light */}
      <div className="absolute bottom-10 right-10 w-[500px] h-[500px] bg-luxury-gold/5 rounded-full blur-[150px] pointer-events-none" />

      <div className="max-w-7xl mx-auto">
        <div className="mb-20 space-y-4 text-center md:text-left">
          <span className="text-luxury-gold uppercase tracking-[0.4em] text-xs block">Get in Touch</span>
          <h1 className="font-display text-5xl md:text-8xl text-white">Contact the <span className="text-luxury-gold italic">Concierge</span></h1>
        </div>

        <div className="grid lg:grid-cols-[1.2fr_1.5fr] gap-12">
          <div className="space-y-8">
            <div className="glass-card p-10 space-y-8">
              <div className="space-y-4">
                <div className="flex items-center gap-3 text-luxury-gold">
                  <RiMapPin2Line className="text-xl" />
                  <span className="uppercase tracking-widest text-[10px] font-bold">The Landmark</span>
                </div>
                <p className="text-zinc-400 text-lg leading-relaxed font-light">
                  Shree Shivaji Maharaj College,<br />
                  Near Vasmat Road, Parbhani,<br />
                  Maharashtra, 431401
                </p>
              </div>

              {/* Click-to-action list */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 pt-8 border-t border-white/10">
                {CONTACTS.map((c) => (
                  <a 
                    key={c.label} 
                    href={c.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group space-y-2 block"
                  >
                    <div className="flex items-center gap-3 text-zinc-500 group-hover:text-luxury-gold transition-colors duration-500">
                      <c.icon className="text-lg" />
                      <span className="text-[9px] uppercase tracking-widest font-bold">{c.label}</span>
                    </div>
                    <p className="text-white font-medium group-hover:text-luxury-gold group-hover:underline underline-offset-4 transition-colors duration-500">{c.value}</p>
                  </a>
                ))}
              </div>
            </div>

            {/* Opening Hours Info */}
            <div className="glass-card p-10 bg-gradient-to-br from-luxury-gold/5 to-transparent border border-white/10">
              <h3 className="font-display text-2xl text-white mb-4">Opening Hours</h3>
              <div className="space-y-2 text-zinc-400 text-sm">
                <div className="flex justify-between border-b border-white/5 pb-2">
                  <span>Monday — Sunday</span>
                  <span className="text-white">11:00 AM — 11:00 PM</span>
                </div>
              </div>
            </div>
          </div>

          {/* Map Frame Container with Luxury Design */}
          <div className="h-[550px] rounded-[2rem] overflow-hidden border border-white/10 glass-card relative p-2 bg-black/40">
            <iframe 
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3753.944747702813!2d76.75!3d19.27!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bd8037a3f33b1e3%3A0x7d6b38c355879a9d!2sParbhani%2C%20Maharashtra!5e0!3m2!1sen!2sin!4v1716700000000!5m2!1sen!2sin" 
              width="100%" 
              height="100%" 
              style={{ border: 0, filter: 'grayscale(1) invert(1) contrast(1.2)', borderRadius: '1.8rem' }} 
              allowFullScreen="" 
              loading="lazy" 
              referrerPolicy="no-referrer-when-downgrade"
              title="Crossroad Manchurians Location"
            ></iframe>
          </div>
        </div>
      </div>
    </motion.main>
  )
}
