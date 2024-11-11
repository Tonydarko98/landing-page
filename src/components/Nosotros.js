import React, { useState } from 'react';

const TablaInteractivas = () => {
  const [tablaActiva, setTablaActiva] = useState(1);

  return (
    <div className="relative w-full min-h-screen flex justify-center items-center bg-gradient-to-r from-red-500 to-yellow-500">
      <div className="hidden lg:flex w-1/2 h-full flex-col justify-center items-start p-8 space-y-6 bg-white bg-opacity-90 backdrop-blur-sm rounded-xl shadow-lg">
        {/* Tabla 1 */}
        <div
          className={`w-full h-1/3 p-4 bg-red-500 rounded-3xl shadow-lg ${
            tablaActiva === 1 ? 'transform scale-105' : ''
          } cursor-pointer transition-all`}
          onClick={() => setTablaActiva(1)}
        >
          <h2 className="text-white text-xl font-semibold">Tabla 1</h2>
          <p className="text-white">Contenido de la primera tabla.</p>
        </div>

        {/* Tabla 2 */}
        <div
          className={`w-full h-1/3 p-4 bg-yellow-500 rounded-3xl shadow-lg ${
            tablaActiva === 2 ? 'transform scale-105' : ''
          } cursor-pointer transition-all`}
          onClick={() => setTablaActiva(2)}
        >
          <h2 className="text-white text-xl font-semibold">Tabla 2</h2>
          <p className="text-white">Contenido de la segunda tabla.</p>
        </div>

        {/* Tabla 3 */}
        <div
          className={`w-full h-1/3 p-4 bg-red-600 rounded-3xl shadow-lg ${
            tablaActiva === 3 ? 'transform scale-105' : ''
          } cursor-pointer transition-all`}
          onClick={() => setTablaActiva(3)}
        >
          <h2 className="text-white text-xl font-semibold">Tabla 3</h2>
          <p className="text-white">Contenido de la tercera tabla.</p>
        </div>
      </div>

      {/* Mobile Version */}
      <div className="lg:hidden w-full h-full flex flex-col justify-center items-center p-4 space-y-6 bg-white bg-opacity-90 backdrop-blur-sm rounded-xl shadow-lg">
        {/* Tabla 1 */}
        <div
          className={`w-full p-4 bg-red-500 rounded-3xl shadow-lg ${
            tablaActiva === 1 ? 'transform scale-105' : ''
          } cursor-pointer transition-all`}
          onClick={() => setTablaActiva(1)}
        >
          <h2 className="text-white text-xl font-semibold">Tabla 1</h2>
          <p className="text-white">Contenido de la primera tabla.</p>
        </div>

        {/* Tabla 2 */}
        <div
          className={`w-full p-4 bg-yellow-500 rounded-3xl shadow-lg ${
            tablaActiva === 2 ? 'transform scale-105' : ''
          } cursor-pointer transition-all`}
          onClick={() => setTablaActiva(2)}
        >
          <h2 className="text-white text-xl font-semibold">Tabla 2</h2>
          <p className="text-white">Contenido de la segunda tabla.</p>
        </div>

        {/* Tabla 3 */}
        <div
          className={`w-full p-4 bg-red-600 rounded-3xl shadow-lg ${
            tablaActiva === 3 ? 'transform scale-105' : ''
          } cursor-pointer transition-all`}
          onClick={() => setTablaActiva(3)}
        >
          <h2 className="text-white text-xl font-semibold">Tabla 3</h2>
          <p className="text-white">Contenido de la tercera tabla.</p>
        </div>
      </div>
    </div>
  );
};

export default TablaInteractivas;
