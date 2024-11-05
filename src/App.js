import React, { useEffect, useState, Suspense } from 'react';
import CustomCursor from './components/CustomCursor';
import Header from './components/Header';
import Home from './components/Home';
import ThreeCanvas from './components/ThreeCanvas';
import Loader from './components/Loader'; // Importa el componente Loader
import Nosotros from './components/Nosotros';

const App = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simular el tiempo de carga (puedes reemplazar esto con lógica real de carga)
    setTimeout(() => {
      setIsLoading(false);
    }, 3000); // 3 segundos de carga
  }, []);

  useEffect(() => {
    document.body.style.cursor = 'none';
    return () => {
      document.body.style.cursor = 'default';
    };
  }, []);

  return (
    <div className="App relative">
      {isLoading ? ( 
        <Loader /> // Mostrar la pantalla de carga mientras `isLoading` es true
      ) : (
        <>
          <CustomCursor />
          <Suspense fallback={<Loader />}> {/* Usa el loader como fallback */}
            <ThreeCanvas />
          </Suspense>
          <div className="content z-10 relative">
            <Header />
            <Home />
            <Nosotros />
          </div>
        </>
      )}
    </div>
  );
};

export default App;
