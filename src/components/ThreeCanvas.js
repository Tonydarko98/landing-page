// ThreeCanvas.jsx
import React, { useEffect } from 'react';
import { Canvas } from '@react-three/fiber';
import { motion } from 'framer-motion';
import HanyuScene from './HanyuScene';
import { useScroll } from 'framer-motion';

const ThreeCanvas = () => {
  const { scrollY } = useScroll();

  return (
    <Canvas
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        height: '100vh',
        width: '100vw',
        pointerEvents: 'none',
      }}
      camera={{ position: [0, 0, 5], fov: 50 }}
    >
      <HanyuScene scrollY={scrollY} />
    </Canvas>
  );
};

export default ThreeCanvas;