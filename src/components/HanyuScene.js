import React, { useRef, useEffect, useMemo, Suspense, useState } from 'react';
import { useThree, useFrame } from '@react-three/fiber';
import { useGLTF, useAnimations, Environment, ContactShadows } from '@react-three/drei';
import { EffectComposer, SSAO, Bloom, HueSaturation } from '@react-three/postprocessing';
import { MeshStandardMaterial, SRGBColorSpace } from 'three';
import * as THREE from 'three';
import gsap from 'gsap';

// Define viewport hook at the top
const useViewport = () => {
  const [viewport, setViewport] = useState({
    isMobile: window.innerWidth < 768,
    isTablet: window.innerWidth >= 768 && window.innerWidth < 1024,
    isDesktop: window.innerWidth >= 1024,
  });

  useEffect(() => {
    const handleResize = () => {
      setViewport({
        isMobile: window.innerWidth < 768,
        isTablet: window.innerWidth >= 768 && window.innerWidth < 1024,
        isDesktop: window.innerWidth >= 1024,
      });
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return viewport;
};

const MODEL_PATH = process.env.PUBLIC_URL + '/assets/models/static/Hanyu.glb';

function Model({ mousePosition, scale }) {
  const { scene, animations } = useGLTF(MODEL_PATH);
  const { actions } = useAnimations(animations, scene);
  const groupRef = useRef();
  const morphTargets = useRef([]);

  useMemo(() => {
    scene.traverse((child) => {
      if (child.isMesh) {
        child.material = new MeshStandardMaterial({
          map: child.material.map,
          normalMap: child.material.normalMap,
          roughnessMap: child.material.roughnessMap,
          metalnessMap: child.material.metalnessMap,
          envMapIntensity: 0.1,
          roughness: 0.3,
          metalness: 0.1,
        });
        if (child.material.map) child.material.map.colorSpace = SRGBColorSpace;
        child.material.needsUpdate = true;
      }
    });
  }, [scene]);

  useEffect(() => {
    if (actions && Object.keys(actions).length > 0) {
      Object.values(actions).forEach(action => {
        action.setLoop(THREE.LoopRepeat).play();
      });
    }

    if (scene.children[0] && scene.children[0].morphTargetInfluences) {
      morphTargets.current = scene.children[0].morphTargetInfluences;
      const morphKeys = Object.keys(scene.children[0].morphTargetDictionary);
      let frame = 0;

      const updateShapekeys = () => {
        morphKeys.forEach((key, index) => {
          morphTargets.current[scene.children[0].morphTargetDictionary[key]] = 
            Math.sin((frame + index) * Math.PI / 30) * 0.5 + 0.5;
        });
        frame = (frame + 1) % 60;
      };

      const intervalId = setInterval(updateShapekeys, 1000 / 30);
      return () => clearInterval(intervalId);
    }
  }, [actions, scene]);

  useFrame(() => {
    if (groupRef.current) {
      groupRef.current.rotation.y = mousePosition.x * 0.2;
      groupRef.current.rotation.x = -mousePosition.y * 0.2;
    }
  });

  return (
    <group ref={groupRef} scale={scale}>
      <primitive object={scene} />
    </group>
  );
}

const Effects = React.memo(() => (
  <EffectComposer multisampling={8}>
    <SSAO radius={0.04} intensity={50} luminanceInfluence={0.5} color="black" />
    <Bloom intensity={0.1} luminanceThreshold={0.9} luminanceSmoothing={0.08} />
    <HueSaturation saturation={0.05} />
  </EffectComposer>
));

export default function HanyuScene({ section }) {
  const [mousePosition, setMousePosition] = React.useState({ x: 0, y: 0 });
  const { gl, camera, scene } = useThree();
  const viewport = useViewport();

  // Configuraciones responsivas
  const getResponsiveConfig = () => {
    if (viewport.isMobile) {
      return {
        scale: 0.6,
        cameraPosition: [0, 11, 7],
        focalLength: 24,
      };
    } else if (viewport.isTablet) {
      return {
        scale: 0.8,
        cameraPosition: [0, 16, 60],
        focalLength: 60,
      };
    } else {
      return {
        scale: 1,
        cameraPosition: [0, 24, 50],
        focalLength: 30,
      };
    }
  };

  const config = getResponsiveConfig();

  useEffect(() => {
    const handleMouseMove = (event) => {
      const x = (event.clientX / gl.domElement.clientWidth) * 2 - 1;
      const y = -(event.clientY / gl.domElement.clientHeight) * 2 + 1;
      setMousePosition({ x, y });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [gl.domElement.clientWidth, gl.domElement.clientHeight]);

  // Ajuste de la cámara en función de la sección activa
  useEffect(() => {
    const cameraPositions = {
      Home: config.cameraPosition,
      Nosotros: [0, 95, 10], // Posición de la cámara para la sección "Nosotros"
      contacto: [0, 20, 70], // Otra sección, si lo necesitas
    };

    // Cámara para la sección activa
    const targetCameraPosition = cameraPositions[section] || config.cameraPosition;

    // Animar la transición de la cámara
    gsap.to(camera.position, {
      duration: 2,
      x: targetCameraPosition[0],
      y: targetCameraPosition[1],
      z: targetCameraPosition[2],
      ease: "power2.inOut",
    });
    camera.updateProjectionMatrix();
  }, [section, camera, config]);

  useEffect(() => {
    const sensorWidth = 36;
    const fov = (2 * Math.atan((sensorWidth / 2) / config.focalLength) * 180) / Math.PI;
    
    camera.fov = fov;
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.near = 0.1;
    camera.far = 1000;
    camera.position.set(...config.cameraPosition);
    camera.updateProjectionMatrix();

    scene.background.colorSpace = SRGBColorSpace;
    gl.outputColorSpace = SRGBColorSpace;
  }, [camera, scene, gl, config, viewport]);

  // Ajusta la intensidad de las luces según el viewport
  const lightIntensity = viewport.isMobile ? 0.7 : 0.6;
  const shadowMapSize = viewport.isMobile ? 512 : 1024;

  return (
    <>
      <color attach="background" args={['#f0f0f0']} />
      <ambientLight intensity={lightIntensity} />
      <spotLight 
        position={[10, 20, 20]} 
        angle={0.5} 
        penumbra={1} 
        intensity={lightIntensity} 
        castShadow 
        shadow-mapSize-width={shadowMapSize} 
        shadow-mapSize-height={shadowMapSize}
      />
      <directionalLight 
        position={[-5, 5, 5]} 
        intensity={lightIntensity * 0.67} 
        castShadow
      />
      
      <Suspense fallback={null}>
        <Model 
          mousePosition={mousePosition} 
          scale={config.scale}
        />
        <ContactShadows 
          opacity={viewport.isMobile ? 0.25 : 0.3} 
          scale={viewport.isMobile ? 8 : 10} 
          blur={viewport.isMobile ? 2 : 3} 
          far={viewport.isMobile ? 8 : 10} 
          resolution={viewport.isMobile ? 256 : 512} 
          color="#000000" 
        />
        <Environment preset="city" />
      </Suspense>
      
      <Effects />
    </>
  );
}

useGLTF.preload(MODEL_PATH);
