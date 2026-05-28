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
        <mesh position={[0, -0.5, 0]}>
          <cylinderGeometry args={[2, 1.2, 1, 32]} />
          <meshStandardMaterial color="#0a0a0a" roughness={0.1} metalness={0.8} />
        </mesh>
        
        <mesh position={[0, 0, 0]} rotation={[Math.PI / 2, 0, 0]}>
          <torusGeometry args={[2.05, 0.05, 16, 100]} />
          <meshStandardMaterial color="#d4af37" metalness={1} roughness={0.2} />
        </mesh>

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

export default function FoodScene3D() {
  return (
    <div className="fixed inset-0 z-0 pointer-events-none opacity-50">
      <Canvas dpr={[1, 2]} camera={{ position: [0, 0, 6], fov: 45 }}>
        <PerspectiveCamera makeDefault position={[0, 0, 6]} fov={35} />
        <ambientLight intensity={0.5} />
        <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={2} color="#d4af37" />
        <FloatingBowl />
        <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />
        <Environment preset="city" />
        <ContactShadows position={[0, -2, 0]} opacity={0.5} scale={10} blur={2} far={4} />
      </Canvas>
    </div>
  )
}
