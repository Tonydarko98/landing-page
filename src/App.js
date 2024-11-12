import React, { useEffect, useState, Suspense, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import CustomCursor from './components/CustomCursor';
import Header from './components/Header';
import Home from './components/Home';
import ThreeCanvas from './components/ThreeCanvas';
import Loader from './components/Loader';
import Nosotros from './components/Nosotros';

const App = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [currentSection, setCurrentSection] = useState('home');
  const sectionsRef = useRef({}); // Ref para secciones
  const [isScrolling, setIsScrolling] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 3000);
  }, []);

  useEffect(() => {
    document.body.style.cursor = 'none';
    return () => {
      document.body.style.cursor = 'default';
    };
  }, []);

  // Manejar el desplazamiento para navegar entre secciones
  useEffect(() => {
    let timeoutId;
    const handleScroll = () => {
      if (isScrolling) return;

      const sections = Object.entries(sectionsRef.current);
      if (sections.length === 0) return;

      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        const windowHeight = window.innerHeight;
        const scrollPosition = window.scrollY + (windowHeight / 2);

        // Determinar la sección actual en función de la posición de desplazamiento
        for (const [sectionId, sectionElement] of sections) {
          const { top, bottom } = sectionElement.getBoundingClientRect();
          const absoluteTop = top + window.scrollY;
          const absoluteBottom = bottom + window.scrollY;

          if (scrollPosition >= absoluteTop && scrollPosition <= absoluteBottom) {
            setCurrentSection(sectionId);
            break;
          }
        }
      }, 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
      clearTimeout(timeoutId);
    };
  }, [isScrolling]);

  // Manejar el cambio de sección al hacer clic en los botones de navegación
  useEffect(() => {
    if (!sectionsRef.current[currentSection]) return;

    setIsScrolling(true);
    const targetSection = sectionsRef.current[currentSection];
    targetSection.scrollIntoView({ behavior: 'smooth' });

    // Restablecer la bandera de desplazamiento después de la animación
    const timeout = setTimeout(() => {
      setIsScrolling(false);
    }, 1000);

    return () => clearTimeout(timeout);
  }, [currentSection]);

  const pageVariants = {
    initial: {
      opacity: 0,
      y: 20
    },
    animate: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: [0.43, 0.13, 0.23, 0.96]
      }
    },
    exit: {
      opacity: 0,
      y: -20,
      transition: {
        duration: 0.6,
        ease: [0.43, 0.13, 0.23, 0.96]
      }
    }
  };

  const renderSection = () => {
    return (
      <div className="sections-container">
        <div
          ref={el => sectionsRef.current['home'] = el}
          className="section min-h-screen"
        >
          <motion.div
            key="home"
            initial="initial"
            animate="animate"
            exit="exit"
            variants={pageVariants}
          >
            <Home />
          </motion.div>
        </div>

        <div
          ref={el => sectionsRef.current['nosotros'] = el}
          className="section min-h-screen"
        >
          <motion.div
            key="nosotros"
            initial="initial"
            animate="animate"
            exit="exit"
            variants={pageVariants}
          >
            <Nosotros />
          </motion.div>
        </div>
      </div>
    );
  };

  return (
    <motion.div className="App relative">
      {isLoading ? (
        <Loader />
      ) : (
        <>
          <CustomCursor />
          <Suspense fallback={<Loader />}>
            <ThreeCanvas />
          </Suspense>
          <motion.div className="content z-10 relative">
            <Header setCurrentSection={setCurrentSection} currentSection={currentSection} />
            {renderSection()}
          </motion.div>
        </>
      )}
    </motion.div>
  );
};

export default App;
