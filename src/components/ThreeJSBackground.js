import React, { useRef, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

function FloatingSphere({ position, color, speed = 1 }) {
  const meshRef = useRef();
  
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * speed) * 0.5;
      meshRef.current.rotation.x = state.clock.elapsedTime * 0.2;
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.3;
    }
  });

  return (
    <mesh ref={meshRef} position={position}>
      <sphereGeometry args={[1, 32, 32]} />
      <meshStandardMaterial
        color={color}
        transparent
        opacity={0.1}
        roughness={0.1}
        metalness={0.1}
      />
    </mesh>
  );
}

function ParticleField() {
  const pointsRef = useRef();
  const particleCount = 100;
  
  useEffect(() => {
    if (pointsRef.current) {
      const positions = new Float32Array(particleCount * 3);
      const colors = new Float32Array(particleCount * 3);
      
      for (let i = 0; i < particleCount; i++) {
        positions[i * 3] = (Math.random() - 0.5) * 20;
        positions[i * 3 + 1] = (Math.random() - 0.5) * 20;
        positions[i * 3 + 2] = (Math.random() - 0.5) * 20;
        
        // Random colors from our brand palette
        const colorPalette = [
          new THREE.Color('#8C5BAA'), // sarya-purple
          new THREE.Color('#F4C542'), // sunshine-yellow
          new THREE.Color('#58AEDA'), // sky-blue
          new THREE.Color('#7CAF3F'), // grass-green
        ];
        
        const color = colorPalette[Math.floor(Math.random() * colorPalette.length)];
        colors[i * 3] = color.r;
        colors[i * 3 + 1] = color.g;
        colors[i * 3 + 2] = color.b;
      }
      
      pointsRef.current.geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
      pointsRef.current.geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));
    }
  }, []);
  
  useFrame((state) => {
    if (pointsRef.current) {
      pointsRef.current.rotation.y = state.clock.elapsedTime * 0.05;
    }
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry />
      <pointsMaterial
        size={0.02}
        vertexColors
        transparent
        opacity={0.6}
        sizeAttenuation
      />
    </points>
  );
}

const ThreeJSBackground = () => {
  return (
    <div className="fixed inset-0 -z-10">
      <Canvas camera={{ position: [0, 0, 5], fov: 75 }}>
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} intensity={0.5} />
        
        {/* Floating spheres */}
        <FloatingSphere position={[-3, 2, -2]} color="#8C5BAA" speed={0.8} />
        <FloatingSphere position={[3, -1, -3]} color="#F4C542" speed={1.2} />
        <FloatingSphere position={[0, 3, -1]} color="#58AEDA" speed={0.6} />
        <FloatingSphere position={[-2, -2, -4]} color="#7CAF3F" speed={1.0} />
        
        {/* Particle field */}
        <ParticleField />
      </Canvas>
    </div>
  );
};

export default ThreeJSBackground;
