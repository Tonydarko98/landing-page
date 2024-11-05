import React from 'react';
import { Canvas } from '@react-three/fiber';
import HanyuScene from './HanyuScene';

const ThreeCanvas = () => {
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
      <HanyuScene />
    </Canvas>
  );
};

export default ThreeCanvas;