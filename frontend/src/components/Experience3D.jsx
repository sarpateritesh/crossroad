import React, { useRef, useMemo, useState, useEffect, Component } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Float, PerspectiveCamera, Environment, ContactShadows } from '@react-three/drei'
import * as THREE from 'three'

// Error Boundary for catching Three.js Canvas runtime errors in React 19
class CanvasErrorBoundary extends Component {
  constructor(props) {
    super(props)
    this.state = { hasError: false }
  }

  static getDerivedStateFromError(error) {
    return { hasError: true }
  }

  componentDidCatch(error, errorInfo) {
    console.error("ThreeJS R3F Canvas Error caught:", error, errorInfo)
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallback || null
    }
    return this.props.children
  }
}

function FloatingElements() {
  const group = useRef()
  
  const noodles = useMemo(() => {
    return Array.from({ length: 15 }).map((_, i) => ({
      position: [
        (Math.random() - 0.5) * 10,
        (Math.random() - 0.5) * 10,
        (Math.random() - 0.5) * 5
      ],
      rotation: [Math.random() * Math.PI, Math.random() * Math.PI, 0],
      scale: 0.2 + Math.random() * 0.5,
      speed: 0.1 + Math.random() * 0.3
    }))
  }, [])

  useFrame((state) => {
    if (!group.current) return
    const t = state.clock.getElapsedTime()
    group.current.rotation.y = THREE.MathUtils.lerp(group.current.rotation.y, (state.mouse.x * Math.PI) / 10, 0.05)
    group.current.rotation.x = THREE.MathUtils.lerp(group.current.rotation.x, (state.mouse.y * Math.PI) / 10, 0.05)
  })

  return (
    <group ref={group}>
      <Float speed={2} rotationIntensity={1.5} floatIntensity={2}>
        {/* Main Bowl Placeholder (Luxury Black Porcelain) */}
        <mesh position={[0, -1, 0]} rotation={[0.4, 0, 0]}>
          <cylinderGeometry args={[2.5, 1.5, 1.2, 32]} />
          <meshStandardMaterial color="#0a0a0a" roughness={0.1} metalness={0.8} />
        </mesh>
        
        {/* Golden Rim */}
        <mesh position={[0, -0.4, 0]} rotation={[1.57, 0, 0]}>
          <torusGeometry args={[2.55, 0.05, 16, 100]} />
          <meshStandardMaterial color="#d4af37" metalness={1} roughness={0.2} />
        </mesh>

        {/* Floating "Manchurians" (Spheres) */}
        {Array.from({ length: 8 }).map((_, i) => (
          <mesh 
            key={i} 
            position={[
              Math.sin(i) * 1.2, 
              -0.4 + Math.random() * 0.5, 
              Math.cos(i) * 1.2
            ]}
          >
            <sphereGeometry args={[0.3, 16, 16]} />
            <meshStandardMaterial color="#8b0000" roughness={0.5} />
          </mesh>
        ))}
      </Float>

      {/* Floating Noodles / Particles */}
      {noodles.map((n, i) => (
        <Float key={i} speed={n.speed} rotationIntensity={2} floatIntensity={1}>
          <mesh position={n.position} rotation={n.rotation} scale={n.scale}>
            <torusGeometry args={[1, 0.02, 16, 50, Math.PI]} />
            <meshStandardMaterial color="#f4c430" emissive="#d4af37" emissiveIntensity={0.5} />
          </mesh>
        </Float>
      ))}
    </group>
  )
}

export default function Experience3D() {
  const [hasError, setHasError] = useState(false)

  useEffect(() => {
    try {
      const canvas = document.createElement('canvas')
      const support = !!(window.WebGLRenderingContext && (canvas.getContext('webgl') || canvas.getContext('experimental-webgl')))
      if (!support) {
        setHasError(true)
      }
    } catch (e) {
      setHasError(true)
    }
  }, [])

  if (hasError) return null

  return (
    <div className="fixed inset-0 -z-10 bg-luxury-black pointer-events-none">
      <CanvasErrorBoundary fallback={<div className="absolute inset-0 bg-[#050505]" />}>
        <Canvas 
          dpr={[1, 2]}
          gl={{ antialias: true, alpha: true }}
          onError={() => setHasError(true)}
        >
          <PerspectiveCamera makeDefault position={[0, 0, 8]} fov={35} />
          <ambientLight intensity={0.5} />
          <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={1.5} color="#d4af37" />
          <pointLight position={[-10, -10, -10]} intensity={1} color="#ff4500" />
          
          <FloatingElements />
          
          <Environment preset="city" />
          <ContactShadows 
            position={[0, -3.5, 0]} 
            opacity={0.4} 
            scale={20} 
            blur={2.4} 
            far={4.5} 
          />
        </Canvas>
      </CanvasErrorBoundary>
    </div>
  )
}
