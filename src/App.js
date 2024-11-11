// App.jsx
import React, { useEffect, useState, Suspense } from 'react';
import { motion } from 'framer-motion';
import CustomCursor from './components/CustomCursor';
import Header from './components/Header';
import Home from './components/Home';
import ThreeCanvas from './components/ThreeCanvas';
import Loader from './components/Loader';
import Nosotros from './components/Nosotros';

const App = () => {
  const [isLoading, setIsLoading] = useState(true);

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
            <Header />
            <Home />
            <Nosotros />
          </motion.div>
        </>
      )}
    </motion.div>
  );
};

export default App;