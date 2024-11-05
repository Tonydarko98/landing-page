import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Flag from './Flag';

// Datos estáticos de banderas
const flagsData = [
  { id: 'flag1', src: '/images/Ecuador.svg', alt: 'Ecuador' },
  { id: 'flag2', src: '/images/Mexico.svg', alt: 'Mexico' },
  { id: 'flag3', src: '/images/Colombia.svg', alt: 'Colombia' },
  { id: 'flag4', src: '/images/Peru.svg', alt: 'Peru' },
  { id: 'flag5', src: '/images/Venezuela.svg', alt: 'Venezuela' },
  { id: 'flag6', src: '/images/Argentina.svg', alt: 'Argentina' },
  { id: 'flag7', src: '/images/Bolivia.svg', alt: 'Bolivia' },
  { id: 'flag8', src: '/images/Chile.svg', alt: 'Chile' },
];

// Componente de texto con efecto de escritura
const TypingText = ({ words }) => {
  const [currentWord, setCurrentWord] = useState(words[0]);
  const [displayText, setDisplayText] = useState('');
  const [wordIndex, setWordIndex] = useState(0);

  // Efecto para manejar la animación de escritura
  useEffect(() => {
    let timeout;
    if (displayText.length === currentWord.length) {
      timeout = setTimeout(() => {
        setDisplayText('');
        setWordIndex((prevIndex) => (prevIndex + 1) % words.length);
      }, 2000);
    } else {
      timeout = setTimeout(() => {
        setDisplayText(currentWord.slice(0, displayText.length + 1));
      }, 100);
    }
    return () => clearTimeout(timeout);
  }, [displayText, currentWord, words]);

  // Efecto para cambiar la palabra actual
  useEffect(() => {
    setCurrentWord(words[wordIndex]);
    setDisplayText('');
  }, [wordIndex, words]);

  return (
    <span className="inline-block relative animated-gradient">
      {displayText}
      <span className="absolute animate-blink text-red-600" style={{ right: '-10px', top: '0' }}>|</span>
    </span>
  );
};

const Home = () => {
  // Estado para manejar el ancho de la ventana
  const [windowWidth, setWindowWidth] = useState(
    typeof window !== 'undefined' ? window.innerWidth : 0
  );

  // Efecto para actualizar el ancho de la ventana
  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const isMobile = windowWidth < 1000;

  // Variantes de animación para el contenedor principal
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.3,
        staggerChildren: 0.2
      }
    }
  };

  // Variantes de animación para elementos individuales
  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.8,
        ease: "easeOut"
      }
    }
  };

  // Variantes de animación para las banderas
  const flagVariants = {
    hidden: { scale: 0, opacity: 0 },
    visible: (i) => ({
      scale: 1,
      opacity: 1,
      transition: {
        delay: i * 0.1,
        duration: 0.5,
        ease: "easeOut"
      }
    })
  };

  return (
    <motion.section
  id="home"
  className={`min-h-screen flex flex-col relative overflow-hidden bg-transparent
    ${isMobile ? 'justify-start pt-12 mt-12' : 'justify-center pb-[5%]'}`}
  variants={containerVariants}
  initial="hidden"
  animate="visible"
>
    
      {/* Contenedor de banderas para móvil */}
      {isMobile && (
        <motion.div 
          className="flex justify-center space-x-1 w-4/5 mx-auto mb-8"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {flagsData.map((flag, index) => (
            <motion.div
              key={flag.id}
              variants={flagVariants}
              custom={index}
            >
              <Flag src={flag.src} alt={flag.alt} index={index} isMobile={true} />
            </motion.div>
          ))}
        </motion.div>
      )}

      {/* Contenido principal */}
      <div className={`home-content text-center z-10 mx-auto px-4 
        ${isMobile ? 'w-full space-y-4 mt-4' : 'max-w-6xl space-y-8'}`}> {/* Añadido mt-4 para móvil */}
        
        {/* Título principal */}
        <motion.h1
          className={`title font-bold text-[#DE2910] 
            ${isMobile ? 'text-5xl mb-4 w-[85%] mx-auto' : 'text-2xl sm:text-3xl md:text-5xl lg:text-7xl mb-8'}`}
          variants={itemVariants}
        >
          {isMobile ? (
            <>
              <div>LÍDERES EN</div>
              <div><TypingText words={['EDUCACIÓN', '教育']} /></div>
              <div>ONLINE</div>
            </>
          ) : (
            <>LÍDERES EN <TypingText words={['EDUCACIÓN', '教育']} /> ONLINE</>
          )}
        </motion.h1>
        
        {/* Subtítulo */}
        <motion.p 
          className={`subtitle font-bold text-black hover:text-[#DE2910] transition-colors duration-300 
            ${isMobile ? 'text-lg mb-4 mx-auto w-[70%]' : 'text-xl sm:text-2xl md:text-3xl lg:text-4xl mb-8'}`}
          variants={itemVariants}
        >
          CLASES 100% EN VIVO
        </motion.p>
        
        {/* Descripción */}
        <motion.p 
          className={`description text-black hover:text-[#DE2910] transition-colors duration-300 leading-snug 
            ${isMobile ? 'text-sm mb-6 mx-auto w-[90%] leading-tight' : 'text-sm sm:text-base md:text-lg lg:text-xl mb-12'}`}
          variants={itemVariants}
        >
          {isMobile ? (
            <>
              Formación estándar de competencia en<br />
              mandarín de la República Popular China.
            </>
          ) : (
            "Formación estándar de competencia en mandarín de la República Popular China."
          )}
        </motion.p>
        
        {/* Botones */}
        <motion.div
          className={`home-buttons flex flex-col 
            ${isMobile ? 'space-y-4 w-[80%] mx-auto' : 'sm:flex-row sm:space-y-0 sm:space-x-4 justify-center'}`}
          variants={itemVariants}
        >
          {/* Botón de Aprender */}
          <motion.button 
            className={`button relative overflow-hidden rounded-full font-bold text-white bg-black hover:bg-gradient-to-r hover:from-[#ff6702] hover:to-[#edc307] 
              ${isMobile ? 'px-4 py-2 text-xs' : 'px-4 sm:px-6 py-2 sm:py-3'}`}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <div className="shimmer"></div>
            <span className="relative z-10">
              <img src="/images/graduation-cap-fill.svg" alt="Learn Icon" className="inline-block w-4 h-4 mr-2" />
              QUIERO APRENDER
            </span>
          </motion.button>

          {/* Botón de Video */}
          <motion.button 
            className={`button2 relative overflow-hidden rounded-full font-bold text-white bg-[#000000] hover:bg-[#DE2910] 
              ${isMobile ? 'px-4 py-2 text-xs' : 'px-4 sm:px-6 py-2 sm:py-3'}`}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <span className="relative z-10">
              <img src="/images/play-circle-line.svg" alt="Play Icon" className="inline-block w-4 h-4 mr-2" />
              VIDEO
            </span>
          </motion.button>
        </motion.div>
      </div>
      
      {/* Contenedor de banderas para desktop */}
      {!isMobile && (
        <div className="flags-container absolute inset-0 pointer-events-none z-40">
          {/* Banderas del lado izquierdo */}
          <motion.div 
            className="absolute left-0 top-0 bottom-0 w-1/3 flex flex-col justify-center"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {flagsData.slice(0, 4).map((flag, index) => (
              <motion.div 
                key={flag.id} 
                style={{
                  position: 'absolute',
                  left: `${15 + index * 5}%`,
                  top: `${15 + index * 15}%`,
                }}
                variants={flagVariants}
                custom={index}
              >
                <Flag src={flag.src} alt={flag.alt} index={index} isMobile={false} side="left" />
              </motion.div>
            ))}
          </motion.div>

          {/* Banderas del lado derecho */}
          <motion.div 
            className="absolute right-0 top-0 bottom-0 w-1/3 flex flex-col justify-center"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {flagsData.slice(4).map((flag, index) => (
              <motion.div 
                key={flag.id} 
                style={{
                  position: 'absolute',
                  right: `${15 + index * 5}%`,
                  top: `${15 + index * 15}%`,
                }}
                variants={flagVariants}
                custom={index + 4}
              >
                <Flag src={flag.src} alt={flag.alt} index={index + 4} isMobile={false} side="right" />
              </motion.div>
            ))}
          </motion.div>
        </div>
      )}
    </motion.section>
  );
};

export default Home;