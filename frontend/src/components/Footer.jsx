import { RiInstagramLine, RiMapPin2Line, RiPhoneLine, RiWhatsappLine } from 'react-icons/ri'
import { SITE_META } from '../assets/data/siteData'

const SOCIALS = [
  { icon: RiInstagramLine, href: "https://www.instagram.com/crossroad_manchurian_corner?igsh=MWJweTk3YnVvMWZibw==" },
  { icon: RiWhatsappLine, href: "https://wa.me/918180080616" }
]

export default function Footer() {
  return (
    <footer className="relative z-10 bg-luxury-black border-t border-white/5 px-5 pt-20 pb-10">
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-4 gap-12 mb-20">
          <div className="col-span-1 md:col-span-2 space-y-8">
            <h2 className="font-display text-4xl text-white tracking-widest">CROSSROAD</h2>
            <p className="text-zinc-500 max-w-sm text-sm leading-relaxed">
              Redefining Indo-Chinese cuisine since 2017. A symphony of spice, texture, and luxury delivered with every plate.
            </p>
            <div className="flex gap-6">
              {SOCIALS.map((soc, i) => (
                <a 
                  key={i} 
                  href={soc.href} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-zinc-400 hover:text-luxury-gold hover:border-luxury-gold transition-all"
                >
                  <soc.icon />
                </a>
              ))}
            </div>
          </div>

          <div className="space-y-6">
            <h4 className="text-[10px] uppercase tracking-[0.3em] text-luxury-gold">Navigation</h4>
            <nav className="flex flex-col gap-3 text-sm text-zinc-400">
              <a href="#/" className="hover:text-white transition-colors">The Experience</a>
              <a href="#/gallery" className="hover:text-white transition-colors">Gallery</a>
              <a href="#/booking" className="hover:text-white transition-colors">Reservations</a>
              <a href="#/contact" className="hover:text-white transition-colors">Concierge</a>
              <a href="#/about" className="hover:text-white transition-colors">About Us</a>
            </nav>
          </div>

          <div className="space-y-6">
            <h4 className="text-[10px] uppercase tracking-[0.3em] text-luxury-gold">Location</h4>
            <div className="space-y-3 text-sm text-zinc-400 leading-relaxed">
              <p>Shree Shivaji Maharaj College,<br />Parbhani, Maharashtra</p>
              <a href="tel:8180080616" className="block text-white hover:text-luxury-gold transition-colors">+91 81800 80616</a>
            </div>
          </div>
        </div>

        <div className="pt-10 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-[10px] uppercase tracking-[0.2em] text-zinc-600 text-center md:text-left">
            &copy; {new Date().getFullYear()} Crossroad Manchurians. All Rights Reserved.
          </p>
          <div className="flex flex-wrap justify-center gap-8 text-[10px] uppercase tracking-[0.2em] text-zinc-600">
             <a href="#" className="hover:text-white transition-colors">Privacy</a>
             <a href="#" className="hover:text-white transition-colors">Terms</a>
             <span className="text-luxury-gold/50 italic">Designed for Excellence</span>
          </div>
        </div>
      </div>
    </footer>
  )
}
