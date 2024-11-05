import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

// Datos estáticos para las diferentes secciones
const featureData = [
  { icon: '/icon.png', text: 'Clases online' },
  { icon: '/icon.png', text: 'Preparación exámenes HSK' },
  { icon: '/icon.png', text: 'Certificado en cada nivel' },
  { icon: '/icon.png', text: 'Profesores nativos' },
  { icon: '/icon.png', text: 'Inmersión cultural' },
  { icon: '/icon.png', text: 'Comunidad Internacional' },
];

const profesoresData = [
  { foto: '/foto1.jpg', nombre: 'Profesor 1', descripcion: 'Descripción del profesor 1.' },
  { foto: '/foto2.jpg', nombre: 'Profesor 2', descripcion: 'Descripción del profesor 2.' },
  { foto: '/foto3.jpg', nombre: 'Profesor 3', descripcion: 'Descripción del profesor 3.' },
  { foto: '/foto4.jpg', nombre: 'Profesor 4', descripcion: 'Descripción del profesor 4.' },
];

const cursosData = [
  { imagen: '/curso1.jpg', nombre: 'Curso 1', descripcion: 'Descripción del curso 1.' },
  { imagen: '/curso2.jpg', nombre: 'Curso 2', descripcion: 'Descripción del curso 2.' },
  { imagen: '/curso3.jpg', nombre: 'Curso 3', descripcion: 'Descripción del curso 3.' },
  { imagen: '/curso4.jpg', nombre: 'Curso 4', descripcion: 'Descripción del curso 4.' },
];

// Componente de sección con animaciones de scroll
const Section = ({ title, children }) => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });

  // Animaciones basadas en el scroll
  const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [0, 1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.8, 1, 0.8]);

  return (
    <motion.section
      ref={ref}
      className="min-h-screen w-full flex flex-col justify-center items-center px-4 py-8 sm:px-6 md:px-8 lg:px-12"
      style={{ opacity, scale }}
    >
      {/* Contenedor con ancho máximo y padding ajustado para móvil */}
      <div className="w-full max-w-7xl mx-auto pt-16 sm:pt-0"> {/* Añadido pt-16 para móvil */}
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-center mb-6 sm:mb-8 md:mb-12">
          {title}
        </h2>
        {children}
      </div>
    </motion.section>
  );
};

// Tarjeta de característica con animación de entrada
const FeatureCard = ({ icon, text, index }) => (
  <motion.div
    className="flex flex-col items-center justify-start p-4 sm:p-6"
    initial={{ opacity: 0, y: 50 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: false }}
    transition={{ delay: index * 0.1 }}
  >
    <img 
      src={icon} 
      alt={`Icono ${text}`} 
      className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 object-contain mb-3 sm:mb-4" 
    />
    <p className="text-sm sm:text-base text-center">{text}</p>
  </motion.div>
);

// Tarjeta de profesor con imagen circular
const ProfesorCard = ({ foto, nombre, descripcion, index }) => (
  <motion.div
    className="flex flex-col items-center p-4 sm:p-6"
    initial={{ opacity: 0, y: 50 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: false }}
    transition={{ delay: index * 0.1 }}
  > 
    <img 
      src={foto} 
      alt={nombre} 
      className="w-24 h-24 sm:w-28 sm:h-28 md:w-32 md:h-32 rounded-full object-cover mb-3 sm:mb-4" 
    />
    <h4 className="font-semibold text-sm sm:text-base text-center mb-2">{nombre}</h4>
    <p className="text-xs sm:text-sm text-center">{descripcion}</p>
  </motion.div>
);

// Tarjeta de curso con imagen rectangular
const CursoCard = ({ imagen, nombre, descripcion, index }) => (
  <motion.div
    className="flex flex-col items-center p-4 sm:p-6"
    initial={{ opacity: 0, y: 50 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: false }}
    transition={{ delay: index * 0.1 }}
  >
    <img 
      src={imagen} 
      alt={nombre} 
      className="w-full h-40 sm:h-44 md:h-48 object-cover rounded-lg mb-3 sm:mb-4" 
    />
    <h4 className="font-semibold text-sm sm:text-base text-center mb-2">{nombre}</h4>
    <p className="text-xs sm:text-sm text-center">{descripcion}</p>
  </motion.div>
);

// Componente principal con scroll snap
const Nosotros = () => {
  return (
    // Contenedor principal con scroll snap
    <div className="snap-y snap-mandatory h-screen overflow-y-scroll">
      {/* Sección de Metodología */}
      <Section title="METODOLOGÍA">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
          {featureData.map((feature, index) => (
            <FeatureCard key={index} {...feature} index={index} />
          ))}
        </div>
      </Section>

      {/* Sección de Profesores */}
      <Section title="PROFESORES NATIVOS">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 md:gap-8">
          {profesoresData.map((profesor, index) => (
            <ProfesorCard key={index} {...profesor} index={index} />
          ))}
        </div>
      </Section>

      {/* Sección de Plan de Estudios */}
      <Section title="PLAN DE ESTUDIOS">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 md:gap-8">
          {cursosData.map((curso, index) => (
            <CursoCard key={index} {...curso} index={index} />
          ))}
        </div>
      </Section>
    </div>
  );
};

export default Nosotros;