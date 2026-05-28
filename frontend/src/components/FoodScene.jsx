import { useRef, useMemo } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Float, PerspectiveCamera, Environment, ContactShadows, Stars } from '@react-three/drei'
import * as THREE from 'three'

function FloatingBowl() {
  const bowlRef = useRef()
  
  useFrame((state) => {
    const t = state.clock.getElapsedTime()
    bowlRef.current.rotation.y = t * 0.2
    bowlRef.current.position.y = Math.sin(t) * 0.1
  })

  return (
    <group ref={bowlRef}>
      <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
        {/* Luxury Black Bowl */}
        <mesh position={[0, -0.5, 0]}>
          <cylinderGeometry args={[2, 1.2, 1, 32]} />
          <meshStandardMaterial color="#0a0a0a" roughness={0.1} metalness={0.8} />
        </mesh>
        
        {/* Golden Rim */}
        <mesh position={[0, 0, 0]} rotation={[Math.PI / 2, 0, 0]}>
          <torusGeometry args={[2.05, 0.05, 16, 100]} />
          <meshStandardMaterial color="#d4af37" metalness={1} roughness={0.2} />
        </mesh>

        {/* Floating Noodles (Curvy Toruses) */}
        {Array.from({ length: 6 }).map((_, i) => (
          <mesh key={i} position={[Math.random() - 0.5, 0.2, Math.random() - 0.5]} rotation={[Math.random() * Math.PI, 0, 0]}>
            <torusGeometry args={[0.8, 0.02, 16, 100, Math.PI]} />
            <meshStandardMaterial color="#f4c430" emissive="#d4af37" emissiveIntensity={0.5} />
          </mesh>
        ))}

        {/* Manchurian Balls (Spheres) */}
        {Array.from({ length: 5 }).map((_, i) => (
          <mesh key={i} position={[(Math.random() - 0.5) * 1.5, 0.1, (Math.random() - 0.5) * 1.5]}>
            <sphereGeometry args={[0.25, 16, 16]} />
            <meshStandardMaterial color="#8b0000" roughness={0.6} />
          </mesh>
        ))}
      </Float>
    </group>
  )
}

function Particles() {
  const points = useMemo(() => {
    const p = new Float32Array(500 * 3)
    for (let i = 0; i < 500; i++) {
      p[i * 3] = (Math.random() - 0.5) * 10
      p[i * 3 + 1] = (Math.random() - 0.5) * 10
      p[i * 3 + 2] = (Math.random() - 0.5) * 10
    }
    return p
  }, [])

  const ref = useRef()
  useFrame((state) => {
    ref.current.rotation.y = state.clock.getElapsedTime() * 0.05
  })

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" count={points.length / 3} array={points} itemSize={3} />
      </bufferGeometry>
      <pointsMaterial size={0.02} color="#d4af37" transparent opacity={0.6} />
    </points>
  )
}

export default function FoodScene() {
  return (
    <div className="fixed inset-0 -z-10 pointer-events-none">
      <Canvas dpr={[1, 2]} camera={{ position: [0, 0, 6], fov: 45 }}>
        <color attach="background" args={['#050505']} />
        <PerspectiveCamera makeDefault position={[0, 0, 6]} fov={35} />
        
        <ambientLight intensity={0.5} />
        <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={2} color="#d4af37" />
        <pointLight position={[-10, -10, -10]} intensity={1} color="#ff4500" />
        
        <FloatingBowl />
        <Particles />
        <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />
        
        <Environment preset="city" />
        <ContactShadows position={[0, -2, 0]} opacity={0.5} scale={10} blur={2} far={4} />
      </Canvas>
    </div>
  )
}
