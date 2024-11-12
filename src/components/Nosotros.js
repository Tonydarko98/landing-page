import React, { useState } from 'react';
import { motion } from 'framer-motion';

const TablaInteractivas = () => {
  const [tablaActiva, setTablaActiva] = useState(1);

  const textVariants = {
    hidden: { 
      opacity: 0, 
      y: 50,
      scale: 0.9 
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.8,
        ease: "easeOut"
      }
    },
    exit: {
      opacity: 0,
      y: -50,
      scale: 0.9,
      transition: {
        duration: 0.8,
        ease: "easeIn"
      }
    }
  };

  return (
    <div className="w-full">
      {/* Texto introductorio responsivo */}
      <div className="w-full min-h-screen flex items-center lg:items-center">
        {/* Versión Desktop */}
        <motion.div 
          className="hidden lg:block w-1/2 px-20 space-y-60"
          initial="hidden"
          whileInView="visible"
          exit="exit"
          variants={textVariants}
          viewport={{ once: false, margin: "-100px" }}
        >
          <motion.p 
            className="text-4xl font-bold text-gray-800 text-left leading-relaxed"
            variants={{
              hidden: { opacity: 0, x: -50 },
              visible: { 
                opacity: 1, 
                x: 0,
                transition: { duration: 1 }
              },
              exit: { 
                opacity: 0, 
                x: 50,
                transition: { duration: 1 }
              }
            }}
          >
            La comunidad que combina la pasión por la enseñanza del mandarín y la innovación tecnológica. 
            Ofrecemos una experiencia de aprendizaje auténtica, 
            con herramientas avanzadas y recursos interactivos con enfoque cultural para conectar a personas con China.
          </motion.p>
          
          <motion.button
            className="px-8 py-3 bg-red-500 text-white text-lg rounded-full hover:bg-red-600 
              transition-colors shadow-lg hover:shadow-xl transform hover:-translate-y-1"
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: { 
                opacity: 1, 
                y: 0,
                transition: { delay: 0.3, duration: 0.6 }
              },
              exit: { 
                opacity: 0, 
                y: -20,
                transition: { duration: 0.6 }
              }
            }}
          >
            Saber más
          </motion.button>
        </motion.div>

        {/* Versión Mobile/Tablet */}
        <motion.div 
          className="lg:hidden w-full px-6 pt-16 pb-8 flex flex-col items-center space-y-8"
          initial="hidden"
          whileInView="visible"
          exit="exit"
          variants={textVariants}
          viewport={{ once: false, margin: "-100px" }}
        >
          <motion.p 
            className="text-2xl md:text-3xl font-bold text-gray-800 text-center leading-relaxed"
            variants={{
              hidden: { opacity: 0, y: 30 },
              visible: { 
                opacity: 1, 
                y: 0,
                transition: { duration: 1 }
              },
              exit: { 
                opacity: 0, 
                y: -30,
                transition: { duration: 1 }
              }
            }}
          >
            La comunidad hispanohablante internacional donde se puede aprender chino mandarín 
            de manera accesible y personalizada. Nos dedicamos a ofrecer una educación de 
            alta calidad, enfocada en las necesidades únicas de los hispanohablantes.
          </motion.p>
          
          <motion.button
            className="px-8 py-3 bg-red-500 text-white text-lg rounded-full hover:bg-red-600 
              transition-colors shadow-lg hover:shadow-xl transform hover:-translate-y-1"
            variants={{
              hidden: { opacity: 0, y: 20, scale: 0.9 },
              visible: { 
                opacity: 1, 
                y: 0,
                scale: 1,
                transition: { delay: 0.3, duration: 0.6 }
              },
              exit: { 
                opacity: 0, 
                y: -20,
                scale: 0.9,
                transition: { duration: 0.6 }
              }
            }}
          >
            Saber más
          </motion.button>
        </motion.div>
      </div>

      {/* Contenedor de tablas */}
      <div className="w-full bg-gradient-to-r from-red-500 to-yellow-500 p-4 md:p-8">
        {/* Versión Desktop */}
        <div className="hidden lg:flex flex-col gap-8 max-w-7xl mx-auto">
          {[1, 2, 3].map((index) => (
            <motion.div
              key={index}
              className={`w-full min-h-screen flex items-center justify-center p-8 
                bg-white bg-opacity-90 backdrop-blur-sm rounded-3xl shadow-lg 
                ${tablaActiva === index ? 'ring-4 ring-red-400' : ''}`}
              initial={{ opacity: 0, y: 100, scale: 0.9 }}
              whileInView={{ 
                opacity: 1,
                y: 0,
                scale: 1,
                transition: { duration: 0.8 }
              }}
              exit={{ opacity: 0, y: -100, scale: 0.9 }}
              viewport={{ once: false, margin: "-100px" }}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setTablaActiva(index)}
            >
              {/* Contenido de las tablas igual que antes */}
              <div className="w-full space-y-4">
                <motion.h2 
                  className="text-3xl font-bold text-gray-800"
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 30 }}
                  viewport={{ once: false }}
                >
                  Tabla {index}
                </motion.h2>
                <motion.p 
                  className="text-xl text-gray-600"
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 30 }}
                  viewport={{ once: false }}
                >
                  Contenido expandido de la tabla {index}. Esta sección ocupará toda la pantalla 
                  y podrás agregar más información aquí.
                </motion.p>
                <motion.div 
                  className="flex gap-4"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  viewport={{ once: false }}
                >
                  <button className="px-6 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 
                    transition-colors">
                    Acción 1
                  </button>
                  <button className="px-6 py-2 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600 
                    transition-colors">
                    Acción 2
                  </button>
                </motion.div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Versión Mobile/Tablet */}
        <div className="lg:hidden flex flex-col gap-6">
          {[1, 2, 3].map((index) => (
            <motion.div
              key={index}
              className={`w-full min-h-screen flex items-center justify-center p-6 
                bg-white bg-opacity-90 backdrop-blur-sm rounded-3xl shadow-lg 
                ${tablaActiva === index ? 'ring-4 ring-red-400' : ''}`}
              initial={{ opacity: 0, y: 100, scale: 0.9 }}
              whileInView={{ 
                opacity: 1,
                y: 0,
                scale: 1,
                transition: { duration: 0.8 }
              }}
              exit={{ opacity: 0, y: -100, scale: 0.9 }}
              viewport={{ once: false, margin: "-100px" }}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setTablaActiva(index)}
            >
              <div className="w-full space-y-4 text-center">
                <motion.h2 
                  className="text-2xl font-bold text-gray-800"
                  initial={{ opacity: 0, y: -20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 20 }}
                  viewport={{ once: false }}
                >
                  Tabla {index}
                </motion.h2>
                <motion.p 
                  className="text-lg text-gray-600"
                  initial={{ opacity: 0, y: -20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 20 }}
                  viewport={{ once: false }}
                >
                  Contenido expandido de la tabla {index}. Esta sección ocupará toda la pantalla 
                  y podrás agregar más información aquí.
                </motion.p>
                <motion.div 
                  className="flex flex-col gap-3"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  viewport={{ once: false }}
                >
                  <button className="w-full px-6 py-2 bg-red-500 text-white rounded-lg 
                    hover:bg-red-600 transition-colors">
                    Acción 1
                  </button>
                  <button className="w-full px-6 py-2 bg-yellow-500 text-white rounded-lg 
                    hover:bg-yellow-600 transition-colors">
                    Acción 2
                  </button>
                </motion.div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TablaInteractivas;