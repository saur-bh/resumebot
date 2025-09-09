import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Sphere, Box, Torus } from '@react-three/drei';
import * as THREE from 'three';

// Floating geometric shapes
function FloatingShape({ position, color, shape = 'sphere' }) {
  const meshRef = useRef();
  
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.5) * 0.1;
      meshRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.3) * 0.1;
      meshRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * 0.8) * 0.5;
    }
  });

  const geometry = useMemo(() => {
    switch (shape) {
      case 'box':
        return new THREE.BoxGeometry(0.5, 0.5, 0.5);
      case 'torus':
        return new THREE.TorusGeometry(0.3, 0.1, 8, 16);
      default:
        return new THREE.SphereGeometry(0.3, 16, 16);
    }
  }, [shape]);

  return (
    <mesh ref={meshRef} position={position} geometry={geometry}>
      <meshStandardMaterial 
        color={color} 
        transparent 
        opacity={0.6}
        roughness={0.2}
        metalness={0.1}
      />
    </mesh>
  );
}

// Particle system
function ParticleField() {
  const pointsRef = useRef();
  
  const particles = useMemo(() => {
    const temp = new THREE.Object3D();
    const positions = new Float32Array(100 * 3);
    
    for (let i = 0; i < 100; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 20;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 20;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 20;
    }
    
    return positions;
  }, []);

  useFrame((state) => {
    if (pointsRef.current) {
      pointsRef.current.rotation.y = state.clock.elapsedTime * 0.05;
      pointsRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.1) * 0.1;
    }
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={100}
          array={particles}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial 
        color="#8C5BAA" 
        size={0.02} 
        transparent 
        opacity={0.6}
      />
    </points>
  );
}

// Main Three.js scene
function ThreeScene() {
  return (
    <div className="fixed inset-0 -z-10">
      <Canvas
        camera={{ position: [0, 0, 5], fov: 75 }}
        style={{ background: 'transparent' }}
      >
        {/* Lighting */}
        <ambientLight intensity={0.4} />
        <directionalLight position={[10, 10, 5]} intensity={0.6} />
        <pointLight position={[-10, -10, -5]} intensity={0.3} color="#8C5BAA" />
        
        {/* Floating shapes */}
        <FloatingShape 
          position={[-3, 2, -2]} 
          color="#8C5BAA" 
          shape="sphere" 
        />
        <FloatingShape 
          position={[3, -1, -3]} 
          color="#58AEDA" 
          shape="box" 
        />
        <FloatingShape 
          position={[-2, -2, -1]} 
          color="#F4C542" 
          shape="torus" 
        />
        <FloatingShape 
          position={[2, 3, -4]} 
          color="#7CAF3F" 
          shape="sphere" 
        />
        <FloatingShape 
          position={[0, -3, -2]} 
          color="#D9534F" 
          shape="box" 
        />
        
        {/* Particle field */}
        <ParticleField />
      </Canvas>
    </div>
  );
}

export default ThreeScene;
