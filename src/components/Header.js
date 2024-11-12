import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const Header = ({ setCurrentSection }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  // Check if the device is mobile
  useEffect(() => {
    const updateIsMobile = () => {
      setIsMobile(window.innerWidth < 1024);
    };
    updateIsMobile();
    window.addEventListener('resize', updateIsMobile);
    return () => window.removeEventListener('resize', updateIsMobile);
  }, []);

  // Handle navigation
  const handleNavigation = (section) => {
    setCurrentSection(section.toLowerCase());
    if (isMenuOpen) setIsMenuOpen(false);
  };

  const navigationItems = ['Home', 'Nosotros', 'Planes', 'Traductor', 'Blog', 'FAQs'];

  return (
    <motion.header
      className={`fixed top-0 left-0 right-0 z-50 ${!isMobile ? 'py-4' : ''}`}
    >
      <nav className={`relative ${!isMobile ? 'mx-auto bg-white bg-opacity-90 backdrop-blur-sm px-4 py-2 rounded-full shadow-lg w-[95%] max-w-6xl' : ''}`}>
        {/* Desktop Version */}
        {!isMobile && (
          <div className="flex items-center justify-between">
            <motion.button
              onClick={() => handleNavigation('home')}
              className="flex-shrink-0 mr-8"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              <img src={`${process.env.PUBLIC_URL}/images/icon.png`} alt="Logo" className="w-10 h-8 object-contain" />
            </motion.button>

            <ul className="flex items-center space-x-6 flex-grow justify-between">
              {navigationItems.map((item) => (
                <li key={item}>
                  <button
                    onClick={() => handleNavigation(item)}
                    className="text-gray-800 font-semibold text-sm hover:text-red-600 transition-colors"
                  >
                    {item}
                  </button>
                </li>
              ))}
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => handleNavigation('login')}
                  className="bg-black text-white px-4 py-2 rounded-full text-sm"
                >
                  Log In
                </button>
                <button
                  onClick={() => handleNavigation('test')}
                  className="bg-yellow-400 text-black px-4 py-2 rounded-full text-sm"
                >
                  Analiza tu Nivel
                </button>
              </div>
            </ul>
          </div>
        )}

        {/* Mobile Version */}
        {isMobile && (
          <>
            <button
              className="fixed top-4 right-4 z-50 bg-white p-3 rounded-full shadow-lg"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {/* Hamburger Icon */}
              <div className={`w-6 h-0.5 bg-gray-800 mb-1.5 ${isMenuOpen ? 'rotate-45 transform translate-y-2' : ''}`} />
              <div className={`w-6 h-0.5 bg-gray-800 mb-1.5 ${isMenuOpen ? 'opacity-0' : ''}`} />
              <div className={`w-6 h-0.5 bg-gray-800 ${isMenuOpen ? '-rotate-45 transform -translate-y-2' : ''}`} />
            </button>

            {isMenuOpen && (
              <div className="fixed inset-y-0 right-0 w-60 bg-white shadow-lg">
                <div className="flex flex-col h-full p-8">
                  <button className="flex justify-center mb-8" onClick={() => handleNavigation('home')}>
                    <img src={`${process.env.PUBLIC_URL}/images/icon.png`} alt="Logo" className="w-14 h-12 object-contain" />
                  </button>
                  {navigationItems.map((item) => (
                    <button
                      key={item}
                      onClick={() => handleNavigation(item)}
                      className="py-3 text-gray-800 font-semibold text-lg hover:text-red-600 transition-colors"
                    >
                      {item}
                    </button>
                  ))}
                  <div className="mt-auto space-y-4">
                    <button onClick={() => handleNavigation('login')} className="block w-full bg-black text-white py-3 rounded-full text-center text-sm">
                      Log In
                    </button>
                    <button onClick={() => handleNavigation('test')} className="block w-full bg-yellow-400 text-black py-3 rounded-full text-center text-sm">
                      Analiza tu Nivel
                    </button>
                  </div>
                </div>
              </div>
            )}
          </>
        )}
      </nav>
    </motion.header>
  );
};

export default Header;
