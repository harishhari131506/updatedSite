import React, { useEffect, useRef, createContext, useContext, useState } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';

// Create context for smooth scrolling
const SmoothScrollContext = createContext({
  scrollYProgress: 0,
  scrollY: 0,
  smoothScrollY: 0,
  viewportHeight: 0,
});

export const useSmoothScrollContext = () => useContext(SmoothScrollContext);

export const SmoothScrollProvider = ({ children, options = {} }) => {
  const {
    ease = 0.1,
    skew = false,
    skewPower = 8,
    enableOnMobile = false,
    stiffness = 100,
    damping = 20,
    mass = 1,
  } = options;

  const containerRef = useRef(null);
  const contentRef = useRef(null);
  const [viewportHeight, setViewportHeight] = useState(0);
  const [isReady, setIsReady] = useState(false);
  
  // Get scroll progress using Framer Motion
  const { scrollYProgress, scrollY } = useScroll();
  
  // Create smoother scrolling effect with spring physics
  const smoothScrollY = useSpring(scrollY, {
    stiffness,
    damping,
    mass,
    restDelta: 0.001
  });
  
  // Determine if we should enable smooth scrolling based on device
  const isMobile = () => {
    if (typeof window === 'undefined') return false;
    return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
      navigator.userAgent
    );
  };
  
  // Skip smooth scrolling implementation on mobile devices if not explicitly enabled
  const shouldUseNativeScroll = isMobile() && !enableOnMobile;

  useEffect(() => {
    if (typeof window === 'undefined' || shouldUseNativeScroll) return;

    // Calculate viewport height
    const handleResize = () => {
      if (containerRef.current) {
        setViewportHeight(window.innerHeight);
      }
    };

    // Initialize on mount
    handleResize();
    
    // Set body height to enable scrolling
    const setBodyHeight = () => {
      if (!contentRef.current) return;
      document.body.style.height = `${contentRef.current.offsetHeight}px`;
    };

    // Run once when content is loaded
    const readyTimer = setTimeout(() => {
      setBodyHeight();
      setIsReady(true);
    }, 500);

    // Add event listeners
    window.addEventListener('resize', () => {
      handleResize();
      setBodyHeight();
    });

    return () => {
      clearTimeout(readyTimer);
      window.removeEventListener('resize', handleResize);
    };
  }, [shouldUseNativeScroll]);

  // Create skew animation based on scroll velocity
  const skewY = useRef(0);
  const lastScrollY = useRef(0);
  
  useEffect(() => {
    if (shouldUseNativeScroll || !skew) return;
    
    let rafId = null;
    
    // Animation loop for skew effect
    const render = () => {
      if (containerRef.current) {
        // Get current scroll position
        const currentScrollY = window.scrollY;
        
        // Calculate skew based on scroll velocity
        const scrollVelocity = (currentScrollY - lastScrollY.current);
        skewY.current = Math.max(-skewPower, Math.min(skewPower, scrollVelocity));
        
        // Apply skew transformation
        contentRef.current.style.transform = `skewY(${skewY.current * 0.1}deg)`;
        
        // Store current position for next frame
        lastScrollY.current = currentScrollY;
        
        // Gradual reset to normal
        skewY.current *= 0.9;
      }
      
      rafId = requestAnimationFrame(render);
    };
    
    rafId = requestAnimationFrame(render);
    
    return () => {
      if (rafId) {
        cancelAnimationFrame(rafId);
      }
    };
  }, [skew, skewPower, shouldUseNativeScroll]);

  if (shouldUseNativeScroll) {
    // Render without smooth scrolling on mobile
    return (
      <SmoothScrollContext.Provider value={{ scrollYProgress, scrollY, smoothScrollY, viewportHeight }}>
        {children}
      </SmoothScrollContext.Provider>
    );
  }

  return (
    <SmoothScrollContext.Provider value={{ scrollYProgress, scrollY, smoothScrollY, viewportHeight }}>
      <div ref={containerRef} className="smooth-scroll-container h-screen overflow-hidden fixed inset-0">
        <motion.div
          ref={contentRef}
          className="smooth-scroll-content"
          style={{
            y: isReady ? smoothScrollY.get() * -1 : 0, // Only apply smooth scrolling when ready
            transition: !isReady ? 'none' : undefined,
          }}
        >
          {children}
        </motion.div>
      </div>
    </SmoothScrollContext.Provider>
  );
};

// HOC to wrap page with smooth scrolling
export const withSmoothScroll = (Component, options = {}) => {
  return function WithSmoothScroll(props) {
    return (
      <SmoothScrollProvider options={options}>
        <Component {...props} />
      </SmoothScrollProvider>
    );
  };
};