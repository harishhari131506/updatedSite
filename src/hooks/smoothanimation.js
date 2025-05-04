import { useRef, useEffect } from 'react';
import { useScroll, useTransform, useSpring, useInView, useAnimationFrame } from 'framer-motion';

// Custom hook for creating smooth, spring-powered scroll animations
export const useSmoothScrollAnimation = (options = {}) => {
  const {
    start = 0,
    end = 1,
    stiffness = 100,
    damping = 30,
    mass = 1,
    initialOpacity = 0,
    initialY = 20,
    initialScale = 0.95,
    delay = 0
  } = options;
  
  const ref = useRef(null);
  
  // Create a basic scroll progress tracker
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });
  
  // Make the scroll progress smoother with spring physics
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: stiffness,
    damping: damping,
    mass: mass,
    restDelta: 0.001
  });
  
  // Create smooth transformations based on scroll position
  const opacity = useTransform(smoothProgress, [start, end], [0, 1]);
  const y = useTransform(smoothProgress, [start, end], [initialY, 0]);
  const scale = useTransform(smoothProgress, [start, end], [initialScale, 1]);
  
  return { ref, smoothProgress, opacity, y, scale };
};

// Hook for revealing elements when they enter the viewport
export const useRevealAnimation = (options = {}) => {
  const {
    threshold = 0.1,
    triggerOnce = true,
    initialOpacity = 0,
    initialY = 30,
    initialScale = 0.95,
    delay = 0,
    duration = 0.8,
    staggerChildren = 0.1,
    viewportMargin = "0px 0px -100px 0px"
  } = options;
  
  const ref = useRef(null);
  const isInView = useInView(ref, {
    once: triggerOnce,
    margin: viewportMargin,
    amount: threshold
  });
  
  // Animation variants for parent container
  const containerVariants = {
    hidden: { opacity: initialOpacity },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: delay,
        staggerChildren: staggerChildren,
        duration: duration
      }
    }
  };
  
  // Animation variants for individual items
  const itemVariants = {
    hidden: { 
      opacity: initialOpacity,
      y: initialY,
      scale: initialScale
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 15,
        duration: duration
      }
    }
  };
  
  return { ref, isInView, containerVariants, itemVariants };
};

// Hook for smooth parallax effects
export const useParallax = (options = {}) => {
  const {
    speed = 0.5,
    direction = "up",
    containerRef = null
  } = options;
  
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef || ref,
    offset: ["start end", "end start"]
  });
  
  // Determine the parallax distance based on direction
  const distance = direction === "up" ? -100 : 
                   direction === "down" ? 100 :
                   direction === "left" ? -100 : 100;
                   
  // Create the parallax transformation 
  const y = useTransform(
    scrollYProgress, 
    [0, 1], 
    ["0%", `${distance * speed}%`]
  );
  
  return { ref, y };
};

// Hook for creating smooth 3D tilt effects
export const useTilt = (options = {}) => {
  const {
    max = 10,
    perspective = 1000,
    scale = 1.05,
    speed = 500,
    easing = "cubic-bezier(.03,.98,.52,.99)"
  } = options;
  
  const ref = useRef(null);
  
  useEffect(() => {
    if (!ref.current) return;
    
    const element = ref.current;
    let updateCall = null;
    let positions = {
      x: 0,
      y: 0
    };
    
    const getValues = (x, y) => {
      const width = element.offsetWidth;
      const height = element.offsetHeight;
      const rectLeft = element.getBoundingClientRect().left;
      const rectTop = element.getBoundingClientRect().top;
      
      const centerX = rectLeft + width / 2;
      const centerY = rectTop + height / 2;
      
      const mouseX = x - centerX;
      const mouseY = y - centerY;
      
      const rotateX = max * mouseY / (height / 2);
      const rotateY = -max * mouseX / (width / 2);
      
      return {
        rotateX,
        rotateY
      };
    };
    
    const updateTransformStyle = (x, y) => {
      const values = getValues(x, y);
      element.style.transform = 
        `perspective(${perspective}px) ` +
        `rotateX(${values.rotateX}deg) ` +
        `rotateY(${values.rotateY}deg) ` +
        `scale3d(${scale}, ${scale}, ${scale})`;
    };
    
    const resetTransformStyle = () => {
      element.style.transform = 
        `perspective(${perspective}px) ` +
        `rotateX(0deg) ` +
        `rotateY(0deg) ` +
        `scale3d(1, 1, 1)`;
    };
    
    const handleMouseMove = (e) => {
      const { clientX, clientY } = e;
      
      positions = {
        x: clientX,
        y: clientY
      };
      
      if (updateCall !== null) {
        cancelAnimationFrame(updateCall);
      }
      
      updateCall = requestAnimationFrame(() => {
        updateTransformStyle(positions.x, positions.y);
      });
    };
    
    const handleMouseEnter = () => {
      element.style.transition = `transform ${speed}ms ${easing}`;
    };
    
    const handleMouseLeave = () => {
      if (updateCall !== null) {
        cancelAnimationFrame(updateCall);
        updateCall = null;
      }
      element.style.transition = `transform ${speed}ms ${easing}`;
      resetTransformStyle();
    };
    
    element.addEventListener('mousemove', handleMouseMove);
    element.addEventListener('mouseenter', handleMouseEnter);
    element.addEventListener('mouseleave', handleMouseLeave);
    
    return () => {
      element.removeEventListener('mousemove', handleMouseMove);
      element.removeEventListener('mouseenter', handleMouseEnter);
      element.removeEventListener('mouseleave', handleMouseLeave);
      
      if (updateCall !== null) {
        cancelAnimationFrame(updateCall);
      }
    };
  }, [max, perspective, scale, speed, easing]);
  
  return { ref };
};

// Create a custom smooth scrolling effect for the entire page
export const useSmoothScroll = (options = {}) => {
  const {
    ease = 0.1,
    enableOnMobile = false
  } = options;
  
  const contentRef = useRef(null);
  const scrollable = useRef(null);
  const requestRef = useRef(null);
  const previousTimeRef = useRef(null);
  const currentScrollY = useRef(0);
  const targetScrollY = useRef(0);
  
  // Check if we're on a mobile device to enable/disable smooth scrolling
  const isMobileDevice = () => {
    return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
      navigator.userAgent
    );
  };
  
  const setBodyHeight = () => {
    if (!contentRef.current) return;
    document.body.style.height = `${contentRef.current.getBoundingClientRect().height}px`;
  };
  
  const smoothScroll = () => {
    // Calculate how much to scroll
    currentScrollY.current += (targetScrollY.current - currentScrollY.current) * ease;
    
    // Apply the scrolling
    if (scrollable.current) {
      scrollable.current.style.transform = `translate3d(0, -${currentScrollY.current}px, 0)`;
    }
    
    // Continue animation
    requestRef.current = requestAnimationFrame(smoothScroll);
  };
  
  useEffect(() => {
    // Skip smooth scrolling on mobile if not enabled
    if (isMobileDevice() && !enableOnMobile) return;
    
    // Initialize
    scrollable.current = contentRef.current;
    setBodyHeight();
    
    // Start animation
    requestRef.current = requestAnimationFrame(smoothScroll);
    
    // Set up window resize listener
    const handleResize = () => {
      setBodyHeight();
    };
    
    // Update target scroll position when the window is scrolled
    const handleScroll = () => {
      targetScrollY.current = window.scrollY;
    };
    
    // Add listeners
    window.addEventListener('resize', handleResize);
    window.addEventListener('scroll', handleScroll);
    
    return () => {
      // Clean up
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('scroll', handleScroll);
      cancelAnimationFrame(requestRef.current);
    };
  }, [ease, enableOnMobile]);
  
  return { contentRef };
};

// For animations triggered by scroll velocity
export const useScrollVelocity = () => {
  const lastScrollY = useRef(0);
  const velocity = useRef(0);
  const acceleration = useRef(0);
  
  useAnimationFrame((time, delta) => {
    const currentScrollY = window.scrollY;
    
    // Calculate the scroll velocity
    if (delta) {
      const currentVelocity = (currentScrollY - lastScrollY.current) / (delta / 1000);
      
      // Apply some smoothing
      velocity.current = velocity.current * 0.8 + currentVelocity * 0.2;
      
      // Calculate acceleration (rate of change of velocity)
      acceleration.current = (currentVelocity - velocity.current) / (delta / 1000);
    }
    
    lastScrollY.current = currentScrollY;
  });
  
  return { velocity, acceleration };
};