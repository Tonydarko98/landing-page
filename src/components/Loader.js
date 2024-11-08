import { motion } from 'framer-motion';

function Loader() {
  return (
    <div className="fixed inset-0 flex flex-col items-center justify-center bg-white z-50">
      <motion.img
        src="/images/icon.png" // Ruta relativa a la carpeta public
        alt="Logo"
        className="w-28 h-24 mb-4" // Tamaño de la imagen ajustado a 24x24
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 20 }}
        transition={{ duration: 0.5 }}
      />
      <motion.div
        className="text-red-600 text-sm font-bold" // Texto rojo más pequeño
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.8 }}
        transition={{ duration: 0.5 }}
      >
        Loading...
      </motion.div>
    </div>
  );
}

export default Loader;
