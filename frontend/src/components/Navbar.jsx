import { useEffect, useState } from 'react'
import { RiMenu4Line, RiCloseLine, RiInstagramLine, RiWhatsappLine } from 'react-icons/ri'

const NAV_ITEMS = [
  { label: 'Experience', route: '/' },
  { label: 'Artistry', route: '/gallery' },
  { label: 'Reservation', route: '/booking' },
  { label: 'Concierge', route: '/contact' },
  { label: 'About', route: '/about' },
]

export default function Navbar({ route, navigate }) {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const handleNav = (r) => {
    setOpen(false)
    navigate(r)
  }

  return (
    <>
      <header className={`fixed inset-x-0 top-0 z-[100] transition-all duration-500 opacity-100 visibility-visible ${scrolled ? 'py-4 bg-black/80 backdrop-blur-xl border-b border-white/10' : 'py-10'}`}>
        <div className="max-w-7xl mx-auto px-5 flex items-center justify-between">
          <button onClick={() => handleNav('/')} className="group relative z-[110] flex flex-col items-start">
            <span className="font-display text-2xl text-white tracking-[0.2em] group-hover:text-luxury-gold transition-colors uppercase">CROSSROAD</span>
            <div className="flex items-center gap-2 mt-1">
               <div className="h-[1px] w-6 bg-luxury-gold group-hover:w-12 transition-all duration-500" />
               <span className="text-[8px] uppercase tracking-[0.4em] text-luxury-gold font-bold">Luxury</span>
            </div>
          </button>

          <nav className="hidden md:flex items-center gap-12">
            {NAV_ITEMS.map((item) => (
              <button
                key={item.route}
                onClick={() => handleNav(item.route)}
                className="relative group py-2"
              >
                <span className={`text-[9px] uppercase tracking-[0.4em] font-bold transition-colors duration-500 ${route === item.route ? 'text-luxury-gold' : 'text-zinc-400 group-hover:text-white'}`}>
                  {item.label}
                </span>
                <span className={`absolute bottom-0 left-0 h-[1px] bg-luxury-gold transition-all duration-500 ${route === item.route ? 'w-full' : 'w-0 group-hover:w-full'}`} />
              </button>
            ))}
          </nav>

          <div className="flex items-center gap-8">
            <div className="hidden lg:flex gap-6">
               <a href="https://www.instagram.com/crossroad_manchurian_corner?igsh=MWJweTk3YnVvMWZibw==" target="_blank" rel="noopener noreferrer">
                 <RiInstagramLine className="text-zinc-500 hover:text-luxury-gold cursor-pointer transition-colors text-lg" />
               </a>
               <a href="https://wa.me/918180080616" target="_blank" rel="noopener noreferrer">
                 <RiWhatsappLine className="text-zinc-500 hover:text-luxury-gold cursor-pointer transition-colors text-lg" />
               </a>
            </div>
            <button 
              onClick={() => setOpen(!open)}
              className="relative z-[110] w-12 h-12 flex items-center justify-center rounded-full border border-white/10 bg-white/5 text-white hover:text-luxury-gold transition-all md:hidden"
            >
              {open ? <RiCloseLine size={24} /> : <RiMenu4Line size={24} />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu - Simple and Robust */}
      {open && (
        <div className="fixed inset-0 z-[105] bg-[#050505] flex flex-col items-center justify-center gap-8 px-5 md:hidden opacity-100 visibility-visible">
          {NAV_ITEMS.map((item) => (
            <button
              key={item.route}
              onClick={() => handleNav(item.route)}
              className={`font-display text-4xl uppercase tracking-widest ${route === item.route ? 'text-luxury-gold italic' : 'text-white'}`}
            >
              {item.label}
            </button>
          ))}
          
          <button 
            onClick={() => setOpen(false)}
            className="mt-8 px-6 py-2 rounded-full border border-white/20 text-xs uppercase tracking-[0.3em] text-zinc-400 hover:text-white transition-all flex items-center gap-2"
          >
            <RiCloseLine size={16} /> Close Menu
          </button>

          <div className="flex gap-10 mt-10">
             <a href="https://www.instagram.com/crossroad_manchurian_corner?igsh=MWJweTk3YnVvMWZibw==" target="_blank" rel="noopener noreferrer">
                <RiInstagramLine className="text-luxury-gold text-2xl" />
             </a>
             <a href="https://wa.me/918180080616" target="_blank" rel="noopener noreferrer">
                <RiWhatsappLine className="text-luxury-gold text-2xl" />
             </a>
          </div>
        </div>
      )}
    </>
  )
}
