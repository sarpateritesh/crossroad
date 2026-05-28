import { motion } from 'framer-motion'

const MENU_DATA = [
  {
    category: "MANCHURIAN",
    items: [
      { name: "Veg Manchurian", desc: "Crispy vegetable balls in aromatic black pepper sauce.", price: "₹180" },
      { name: "Schezwan Manchurian", desc: "Spicy & tangy balls tossed in house-made Schezwan sauce.", price: "₹200" }
    ]
  },
  {
    category: "NOODLES",
    items: [
      { name: "Hakka Noodles", desc: "Wok-tossed noodles with garden fresh vegetables.", price: "₹160" },
      { name: "Schezwan Noodles", desc: "Fiery noodles with a punch of red chilies and garlic.", price: "₹180" }
    ]
  },
  {
    category: "RICE",
    items: [
      { name: "Fried Rice", desc: "Classic wok-fried rice with fine chopped vegetables.", price: "₹160" },
      { name: "Schezwan Rice", desc: "Flavorful fried rice with authentic spicy seasonings.", price: "₹180" }
    ]
  },
  {
    category: "STARTERS",
    items: [
      { name: "Spring Potato", desc: "Our legendary spiral-cut crispy golden potatoes.", price: "₹120" },
      { name: "Chinese Bhel", desc: "The perfect crunch: fusion of fried noodles & spices.", price: "₹150" }
    ]
  }
]

export default function MenuSection() {
  return (
    <section className="py-16 md:py-24 px-5 md:px-20 bg-black/40 relative force-visible backdrop-blur-sm">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12 md:mb-16 space-y-6">
          <span className="text-luxury-gold uppercase tracking-[0.5em] text-[10px] block font-bold">The Menu</span>
          <h2 className="font-display text-4xl sm:text-5xl md:text-7xl lg:text-[8rem] text-white italic">Artisanal <span className="text-luxury-gold not-italic">Selections</span></h2>
        </div>

        <div className="grid md:grid-cols-2 gap-12 md:gap-16">
          {MENU_DATA.map((cat) => (
            <div key={cat.category} className="space-y-12">
              <h3 className="font-display text-2xl text-luxury-gold border-b border-white/10 pb-6 tracking-widest uppercase">{cat.category}</h3>
              <div className="space-y-10">
                {cat.items.map((item) => (
                  <div key={item.name} className="group">
                    <div className="flex flex-row justify-between items-end mb-4 gap-2">
                      <h4 className="text-lg sm:text-xl text-white group-hover:text-luxury-gold transition-colors font-light shrink-0">{item.name}</h4>
                      <div className="flex-1 border-b border-dashed border-white/20 sm:mx-4 mb-2 hidden sm:block" />
                      <span className="font-display text-lg sm:text-xl text-white shrink-0">{item.price}</span>
                    </div>
                    <p className="text-zinc-500 text-sm font-light leading-relaxed group-hover:text-zinc-300 transition-colors">{item.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
