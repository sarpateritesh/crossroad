import React, { useState, useEffect } from 'react'
import { AnimatePresence } from 'framer-motion'
import { useHashRoute } from './hooks/useHashRoute'
import { useLenisScroll } from './hooks/useLenisScroll'
import { useScrollReveal } from './hooks/useScrollReveal'
import Navbar from './components/Navbar'
import LoadingScreen from './components/LoadingScreen'
import Experience3D from './components/Experience3D'
import HomePage from './pages/HomePage'
import BookingPage from './pages/BookingPage'
import GalleryPage from './pages/GalleryPage'
import ContactPage from './pages/ContactPage'
import AdminDashboardPage from './pages/AdminDashboardPage'
import AboutPage from './pages/AboutPage'

export default function App() {
  const { route, navigate } = useHashRoute()
  const [isLoading, setIsLoading] = useState(true)

  // Initialize smooth scroll and scroll trigger animations globally
  useLenisScroll()
  useScrollReveal()

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 1800)
    return () => clearTimeout(timer)
  }, [])

  const renderPage = () => {
    switch (route) {
      case '/':
        return <HomePage navigate={navigate} />
      case '/booking':
        return <BookingPage navigate={navigate} />
      case '/gallery':
        return <GalleryPage navigate={navigate} />
      case '/about':
        return <AboutPage navigate={navigate} />
      case '/contact':
        return <ContactPage navigate={navigate} />
      case '/admin':
        return <AdminDashboardPage navigate={navigate} />
      default:
        return <HomePage navigate={navigate} />
    }
  }

  return (
    <div className="bg-[#050505] text-white min-h-screen relative overflow-x-hidden selection:bg-luxury-gold selection:text-black">


      {/* Screen Loader */}
      <AnimatePresence mode="wait">
        {isLoading && <LoadingScreen key="loader" />}
      </AnimatePresence>

      {/* 3D Background scene */}
      <Experience3D />

      {/* Main Header / Navigation */}
      <Navbar route={route} navigate={navigate} />

      {/* Route Content Area */}
      <div className="relative z-10">
        <AnimatePresence mode="wait">
          {renderPage()}
        </AnimatePresence>
      </div>
    </div>
  )
}
