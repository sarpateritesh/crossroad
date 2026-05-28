import { useState, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { RiCloseLine, RiFullscreenLine, RiPlayCircleLine } from 'react-icons/ri'

const MEDIA = [
  { id: 1, type: 'video', category: 'video', url: 'https://assets.mixkit.co/videos/preview/mixkit-vegetables-and-spices-being-fried-in-a-pan-41223-large.mp4', span: 'md:col-span-2 md:row-span-2' },
  { id: 2, type: 'image', category: 'image', url: 'https://images.unsplash.com/photo-1552611052-33e04de081de?q=80&w=800', span: 'col-span-1' },
  { id: 3, type: 'image', category: 'image', url: 'https://images.unsplash.com/photo-1541696490-8744a5db7f34?q=80&w=800', span: 'col-span-1 row-span-2' },
  { id: 4, type: 'video', category: 'video', url: 'https://assets.mixkit.co/videos/preview/mixkit-chef-tossing-vegetables-in-a-wok-41225-large.mp4', span: 'md:col-span-2' },
  { id: 5, type: 'image', category: 'image', url: 'https://images.unsplash.com/photo-1512058560366-cd2427ffaa74?q=80&w=800', span: 'col-span-1' },
  { id: 6, type: 'image', category: 'image', url: 'https://images.unsplash.com/photo-1525755662778-989d0524087e?q=80&w=800', span: 'col-span-1' },
]

export default function GalleryPage() {
  const [selected, setSelected] = useState(null)
  const [activeFilter, setActiveFilter] = useState('ALL')

  const filteredMedia = useMemo(() => {
    if (activeFilter === 'ALL') return MEDIA
    if (activeFilter === 'PHOTOS') return MEDIA.filter(m => m.type === 'image')
    if (activeFilter === 'VIDEOS') return MEDIA.filter(m => m.type === 'video')
    return MEDIA
  }, [activeFilter])

  return (
    <div className="pt-40 pb-24 px-5 md:px-10 min-h-screen bg-luxury-black relative overflow-hidden">
      {/* Ambient BG Glow */}
      <div className="absolute top-10 left-10 w-[400px] h-[400px] bg-luxury-gold/5 rounded-full blur-[150px] pointer-events-none" />

      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-20 gap-8">
          <div className="space-y-4">
             <span className="text-luxury-gold uppercase tracking-[0.5em] text-[10px] block font-bold">Visual Art</span>
             <h1 className="font-display text-5xl md:text-8xl text-white italic">The <span className="text-luxury-gold not-italic">Gallery</span></h1>
          </div>

          {/* Filter Tabs */}
          <div className="flex gap-4 bg-white/[0.02] border border-white/10 rounded-full p-2 self-start md:self-auto backdrop-blur-md">
            {['ALL', 'PHOTOS', 'VIDEOS'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveFilter(tab)}
                className={`px-6 py-2.5 rounded-full text-[9px] uppercase tracking-widest font-bold transition-all duration-500 relative ${activeFilter === tab ? 'text-black' : 'text-zinc-400 hover:text-white'}`}
              >
                {activeFilter === tab && (
                  <motion.div 
                    layoutId="activeTabGlow"
                    className="absolute inset-0 bg-luxury-gold rounded-full -z-10 shadow-[0_0_15px_rgba(212,175,55,0.4)]"
                    transition={{ duration: 0.5, ease: [0.77, 0, 0.175, 1] }}
                  />
                )}
                {tab}
              </button>
            ))}
          </div>
        </div>

        {/* Gallery Grid */}
        <motion.div 
          layout 
          className="grid grid-cols-1 md:grid-cols-4 gap-6 auto-rows-[300px]"
        >
          <AnimatePresence mode="popLayout">
            {filteredMedia.map((item) => (
              <motion.div
                key={item.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.6 }}
                layoutId={`media-${item.id}`}
                onClick={() => setSelected(item)}
                className={`relative rounded-[2rem] overflow-hidden cursor-pointer group glass-card border border-white/10 ${item.span}`}
              >
                {item.type === 'video' ? (
                  <div className="h-full w-full relative">
                     <video muted loop autoPlay playsInline className="h-full w-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700">
                       <source src={item.url} type="video/mp4" />
                     </video>
                     <div className="absolute inset-0 flex items-center justify-center bg-black/20 group-hover:bg-transparent transition-colors">
                        <RiPlayCircleLine className="text-luxury-gold/80 text-6xl group-hover:scale-110 transition-transform duration-500" />
                     </div>
                  </div>
                ) : (
                  <img src={item.url} alt="Food" className="h-full w-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700" />
                )}
                {/* Hover overlay with zoom button */}
                <div className="absolute inset-0 bg-luxury-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center">
                   <div className="w-14 h-14 rounded-full border border-luxury-gold/50 flex items-center justify-center text-luxury-gold text-2xl bg-black/40 shadow-[0_0_15px_rgba(212,175,55,0.3)] group-hover:scale-110 transition-all duration-500">
                      <RiFullscreenLine />
                   </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>

      {/* Lightbox / Modal */}
      <AnimatePresence>
        {selected && (
          <motion.div 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-black/95 backdrop-blur-2xl flex items-center justify-center p-5 md:p-20"
          >
            <button onClick={() => setSelected(null)} className="absolute top-8 right-8 text-white/70 hover:text-luxury-gold text-4xl transition-colors duration-500 z-50">
              <RiCloseLine />
            </button>
            <motion.div 
              layoutId={`media-${selected.id}`} 
              className="w-full max-w-5xl rounded-[2rem] overflow-hidden shadow-2xl border border-white/10 relative bg-black/40"
            >
               {selected.type === 'video' ? (
                 <video autoPlay loop controls className="w-full h-auto max-h-[80vh] object-contain">
                    <source src={selected.url} type="video/mp4" />
                 </video>
               ) : (
                 <img src={selected.url} alt="Large" className="w-full h-auto max-h-[80vh] object-contain mx-auto" />
               )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
