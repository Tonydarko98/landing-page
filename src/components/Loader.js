import { motion } from 'framer-motion';

function Loader() {
  return (
    <div className="fixed inset-0 flex flex-col items-center justify-center bg-white z-50">
      <motion.img
        // Usa process.env.PUBLIC_URL para asegurar la ruta correcta en GitHub Pages
        src={`${process.env.PUBLIC_URL}/images/icon.png`}
        alt="Logo"
        className="w-28 h-24 mb-4 object-contain" // Añadido object-contain para mejor manejo de aspecto
        initial={{ opacity: 0, y: -20 }}
        animate={{ 
          opacity: [0, 1, 1],
          y: [-20, 0, 0],
          scale: [1, 1.1, 1] 
        }}
        exit={{ opacity: 0, y: 20 }}
        transition={{ 
          duration: 1,
          repeat: Infinity,
          repeatType: "reverse"
        }}
      />
      <motion.div
        className="text-red-600 text-sm font-bold tracking-wider" // Añadido tracking-wider para mejor legibilidad
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ 
          opacity: [0, 1],
          scale: [0.8, 1]
        }}
        exit={{ opacity: 0, scale: 0.8 }}
        transition={{ 
          duration: 0.5,
          ease: "easeOut"
        }}
      >
        <motion.span
          animate={{ opacity: [1, 0.5, 1] }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            repeatType: "reverse"
          }}
        >
          Loading...
        </motion.span>
      </motion.div>
    </div>
  );
}

export default Loader;