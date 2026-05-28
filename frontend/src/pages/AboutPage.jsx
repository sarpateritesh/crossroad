import React from 'react'
import FounderStory from '../sections/FounderStory'
import Footer from '../components/Footer'

export default function AboutPage() {
  return (
    <div className="bg-luxury-black min-h-screen pt-20 overflow-hidden">
      {/* Top ambient glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[300px] bg-luxury-gold/5 rounded-full blur-[150px] pointer-events-none" />
      
      <div className="relative z-10">
        <FounderStory />
        <Footer />
      </div>
    </div>
  )
}
