import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [isMobile, setIsMobile] = useState(false);
  const [prevScrollPos, setPrevScrollPos] = useState(0);
  const [lastActivityTime, setLastActivityTime] = useState(Date.now());

  // Check if mobile
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 1024);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Update last activity time
  const updateLastActivity = useCallback(() => {
    setLastActivityTime(Date.now());
    setIsVisible(true);
  }, []);

  // Check for inactivity
  useEffect(() => {
    const inactivityTimeout = 3000; // 3 seconds of inactivity before hiding

    const checkInactivity = () => {
      const currentTime = Date.now();
      if (currentTime - lastActivityTime > inactivityTimeout && window.scrollY > 100) {
        setIsVisible(false);
      }
    };

    const inactivityInterval = setInterval(checkInactivity, 1000);
    return () => clearInterval(inactivityInterval);
  }, [lastActivityTime]);

  // Handle scroll and mouse movement
  useEffect(() => {
    let lastScrollY = window.scrollY;
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const currentScrollY = window.scrollY;
          const scrollingUp = currentScrollY < lastScrollY;

          if (scrollingUp || currentScrollY < 10) {
            setIsVisible(true);
            updateLastActivity();
          } else if (currentScrollY > 100 && currentScrollY > lastScrollY) {
            setIsVisible(false);
          }

          lastScrollY = currentScrollY;
          ticking = false;
        });
        ticking = true;
      }
    };

    const handleMouseMove = (e) => {
      if (!isMobile && e.clientY < 100) {
        setIsVisible(true);
        updateLastActivity();
      }
    };

    const handleTouchStart = () => {
      updateLastActivity();
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('touchstart', handleTouchStart);
    document.addEventListener('click', updateLastActivity);
    document.addEventListener('keydown', updateLastActivity);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('touchstart', handleTouchStart);
      document.removeEventListener('click', updateLastActivity);
      document.removeEventListener('keydown', updateLastActivity);
    };
  }, [isMobile, updateLastActivity]);

  const menuVariants = {
    hidden: {
      x: "100%",
      opacity: 0
    },
    visible: {
      x: "0%",
      opacity: 1,
      transition: {
        type: "spring",
        damping: 25,
        stiffness: 300
      }
    }
  };

  const headerVariants = {
    hidden: {
      y: "-100%",
      transition: {
        type: "spring",
        damping: 30,
        stiffness: 200
      }
    },
    visible: {
      y: "0%",
      transition: {
        type: "spring",
        damping: 20,
        stiffness: 100
      }
    }
  };

  const staggerChildren = {
    visible: {
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const childVariants = {
    hidden: {
      y: 20,
      opacity: 0
    },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        damping: 20,
        stiffness: 300
      }
    }
  };

  return (
    <motion.header
      className={`fixed top-0 left-0 right-0 z-50 ${!isMobile && 'py-4'}`}
      initial="visible"
      animate={isVisible ? "visible" : "hidden"}
      variants={headerVariants}
    >
      <nav className={`relative ${!isMobile && 'mx-auto bg-white bg-opacity-90 backdrop-blur-sm px-4 py-2 rounded-full shadow-lg w-[95%] max-w-6xl'}`}>
        {/* Desktop Version */}
        {!isMobile && (
          <div className="flex items-center justify-between">
            <motion.a
              href="#home"
              className="flex-shrink-0 mr-8"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              <img src="/images/icon.png" alt="Logo" className="w-10 h-8" />
            </motion.a>

            <motion.ul className="flex items-center space-x-6 flex-grow justify-between">
              {['Home', 'Nosotros', 'Planes', 'Traductor', 'Blog', 'FAQs'].map((item) => (
                <motion.li
                  key={item}
                  whileHover={{ scale: 1.1 }}
                >
                  <a
                    href={`#${item.toLowerCase()}`}
                    className="text-gray-800 font-semibold text-sm hover:text-red-600 transition-colors"
                  >
                    {item}
                  </a>
                </motion.li>
              ))}

              <div className="flex items-center space-x-2">
                <motion.a
                  href="User.html"
                  className="bg-black text-white px-4 py-2 rounded-full text-sm"
                  whileHover={{ scale: 1.05, backgroundColor: "#ef4444" }}
                  whileTap={{ scale: 0.95 }}
                >
                  Log In
                </motion.a>
                <motion.a
                  href="test.html"
                  className="bg-yellow-400 text-black px-4 py-2 rounded-full text-sm"
                  whileHover={{ scale: 1.05, backgroundColor: "#ef4444", color: "white" }}
                  whileTap={{ scale: 0.95 }}
                >
                  Analiza tu Nivel
                </motion.a>
              </div>
            </motion.ul>
          </div>
        )}

        {/* Mobile Version */}
        {isMobile && (
          <>
            <motion.div
              className="fixed top-4 right-4 z-50 bg-white p-3 rounded-full shadow-lg cursor-pointer"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              <motion.div
                className="w-6 h-0.5 bg-gray-800 mb-1.5"
                animate={isMenuOpen ? { rotate: 45, y: 8 } : { rotate: 0, y: 0 }}
              />
              <motion.div
                className="w-6 h-0.5 bg-gray-800 mb-1.5"
                animate={isMenuOpen ? { opacity: 0 } : { opacity: 1 }}
              />
              <motion.div
                className="w-6 h-0.5 bg-gray-800"
                animate={isMenuOpen ? { rotate: -45, y: -8 } : { rotate: 0, y: 0 }}
              />
            </motion.div>

            <AnimatePresence>
              {isMenuOpen && (
                <motion.div
                  className="fixed inset-y-0 right-0 w-60 bg-white shadow-lg"
                  variants={menuVariants}
                  initial="hidden"
                  animate="visible"
                  exit="hidden"
                >
                  <motion.div
                    className="flex flex-col h-full p-8"
                    variants={staggerChildren}
                    initial="hidden"
                    animate="visible"
                  >
                    <motion.div
                      variants={childVariants}
                      className="flex justify-center mb-8"
                    >
                      <img src="/images/icon.png" alt="Logo" className="w-14 h-12" />
                    </motion.div>

                    {['Home', 'Nosotros', 'Planes', 'Traductor', 'Blog', 'FAQs'].map((item) => (
                      <motion.a
                        key={item}
                        href={`#${item.toLowerCase()}`}
                        className="py-3 text-gray-800 font-semibold text-lg hover:text-red-600 transition-colors"
                        variants={childVariants}
                      >
                        {item}
                      </motion.a>
                    ))}

                    <div className="mt-auto space-y-4">
                      <motion.a
                        variants={childVariants}
                        href="User.html"
                        className="block w-full bg-black text-white py-3 rounded-full text-center text-sm"
                        whileHover={{ scale: 1.05, backgroundColor: "#ef4444" }}
                        whileTap={{ scale: 0.95 }}
                      >
                        Log In
                      </motion.a>
                      <motion.a
                        variants={childVariants}
                        href="test.html"
                        className="block w-full bg-yellow-400 text-black py-3 rounded-full text-center text-sm"
                        whileHover={{ scale: 1.05, backgroundColor: "#ef4444", color: "white" }}
                        whileTap={{ scale: 0.95 }}
                      >
                        Analiza tu Nivel
                      </motion.a>
                    </div>
                  </motion.div>
                </motion.div>
              )}
            </AnimatePresence>
          </>
        )}
      </nav>
    </motion.header>
  );
};

export default Header;
