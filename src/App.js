import React, { useEffect, useState, Suspense } from 'react';
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
      <AnimatePresence mode="wait">
        {currentSection === 'home' && (
          <motion.div
            key="home"
            initial="initial"
            animate="animate"
            exit="exit"
            variants={pageVariants}
          >
            <Home />
          </motion.div>
        )}
        {currentSection === 'nosotros' && (
          <motion.div
            key="nosotros"
            initial="initial"
            animate="animate"
            exit="exit"
            variants={pageVariants}
          >
            <Nosotros />
          </motion.div>
        )}
      </AnimatePresence>
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
            <Header setCurrentSection={setCurrentSection} />
            {renderSection()}
          </motion.div>
        </>
      )}
    </motion.div>
  );
};

export default App;