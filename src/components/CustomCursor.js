import React, { useEffect, useRef, useState } from 'react';

const CustomCursor = () => {
  const canvasRef = useRef(null);
  const cursorImageRef = useRef(null);
  const [dimensions, setDimensions] = useState({ width: window.innerWidth, height: window.innerHeight });
  const lastMoveTimeRef = useRef(Date.now());
  const [isMobileOrTablet, setIsMobileOrTablet] = useState(false);

  // Función para detectar si es dispositivo móvil o tablet
  const checkDevice = () => {
    const userAgent = window.navigator.userAgent.toLowerCase();
    const isMobile = /mobile|iphone|ipad|android|windows phone/.test(userAgent);
    const isTablet = /(ipad|tablet|playbook|silk)|(android(?!.*mobile))/.test(userAgent);
    return isMobile || isTablet;
  };

  useEffect(() => {
    // Establecer el estado inicial de dispositivo
    setIsMobileOrTablet(checkDevice());

    // Si es móvil o tablet, no renderizar el cursor personalizado
    if (checkDevice()) {
      return;
    }

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let animationFrameId;

    const cursorImage = new Image();
    cursorImage.src = '/images/Iconocursor.png';
    cursorImageRef.current = cursorImage;

    const params = {
      pointsNumber: 15,
      tailLength: 100,
      spring: 0.4,
      friction: 0.5,
      startWidth: 5,
      endWidth: 1,
      cursorSize: 25,
      yOffset: 10,
      fadeOutDuration: 500
    };

    const pointer = { x: dimensions.width / 2, y: dimensions.height / 2 };
    const trail = new Array(params.pointsNumber).fill().map(() => ({ ...pointer, dx: 0, dy: 0 }));

    const updateMousePosition = (e) => {
      pointer.x = e.clientX;
      pointer.y = e.clientY;
      lastMoveTimeRef.current = Date.now();
    };

    const update = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const currentTime = Date.now();
      const timeSinceLastMove = currentTime - lastMoveTimeRef.current;
      const opacity = Math.max(0, 1 - timeSinceLastMove / params.fadeOutDuration);

      trail.forEach((p, pIdx) => {
        const prev = pIdx === 0 ? pointer : trail[pIdx - 1];
        const spring = pIdx === 0 ? 0.5 * params.spring : params.spring;
        p.dx += (prev.x - p.x) * spring;
        p.dy += (prev.y - p.y) * spring;
        p.dx *= params.friction;
        p.dy *= params.friction;
        p.x += p.dx;
        p.y += p.dy;

        if (pIdx === 0) {
          p.y = pointer.y + params.yOffset;
        }
      });

      for (let i = 0; i < trail.length - 1; i++) {
        const t = i / (trail.length - 1);
        const width = params.startWidth * (1 - t) + params.endWidth * t;
        const alpha = opacity * (1 - t * 0.5);

        ctx.beginPath();
        ctx.moveTo(trail[i].x, trail[i].y);
        ctx.lineTo(trail[i + 1].x, trail[i + 1].y);
        ctx.lineWidth = width;
        ctx.strokeStyle = `rgba(222, 41, 16, ${alpha})`;
        ctx.lineCap = "round";
        ctx.lineJoin = "round";
        ctx.stroke();
      }

      if (cursorImageRef.current.complete) {
        ctx.drawImage(cursorImageRef.current, pointer.x - params.cursorSize / 2, pointer.y - params.cursorSize / 2, params.cursorSize, params.cursorSize);
      }

      animationFrameId = requestAnimationFrame(update);
    };

    const handleResize = () => {
      setDimensions({ width: window.innerWidth, height: window.innerHeight });
      // Verificar el dispositivo en cada resize
      setIsMobileOrTablet(checkDevice());
    };

    canvas.width = dimensions.width;
    canvas.height = dimensions.height;

    window.addEventListener("mousemove", updateMousePosition);
    window.addEventListener("resize", handleResize);

    update();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("mousemove", updateMousePosition);
      window.removeEventListener("resize", handleResize);
    };
  }, [dimensions]);

  // Si es móvil o tablet, no renderizar nada
  if (isMobileOrTablet) {
    return null;
  }

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        pointerEvents: 'none',
        zIndex: 9999,
      }}
    />
  );
};

export default CustomCursor;