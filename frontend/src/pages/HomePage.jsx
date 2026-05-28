import React from 'react'
import HeroSection from '../sections/HeroSection'
import StatsSection from '../sections/StatsSection'
import SpecialitySection from '../sections/SpecialitySection'
import SignatureDishesSection from '../sections/SignatureDishesSection'
import ReviewsSection from '../sections/ReviewsSection'
import Footer from '../components/Footer'

export default function HomePage({ navigate }) {
  const scrollToExperience = () => {
    const el = document.getElementById('experience')
    if (el) el.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <div className="bg-[#050505] min-h-screen opacity-100 visibility-visible">
      <HeroSection 
        onExplore={scrollToExperience} 
        onReserve={() => navigate('/booking')} 
      />
      
      <div id="experience" className="relative z-10 bg-black/50 backdrop-blur-sm opacity-100 visibility-visible">
        <StatsSection />
        <SpecialitySection />
        <SignatureDishesSection />
        <ReviewsSection />
        <Footer />
      </div>
    </div>
  )
}
