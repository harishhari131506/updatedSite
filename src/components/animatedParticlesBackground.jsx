import React, { useRef, useEffect } from 'react';
import { motion } from 'framer-motion';

// Particle component with physics and motion
const Particle = ({ size, color, initialPosition, speed, animationDuration }) => {
  const randomDelay = Math.random() * 5;
  
  return (
    <motion.div
      className="absolute rounded-full"
      style={{
        width: size,
        height: size,
        backgroundColor: color,
        top: initialPosition.y,
        left: initialPosition.x,
        filter: 'blur(1px)',
      }}
      animate={{
        y: [0, -30, 30, -10, 0],
        x: [0, 15, -15, 5, 0],
        opacity: [0.5, 0.8, 0.5, 0.7, 0.5],
      }}
      transition={{
        duration: animationDuration,
        ease: "easeInOut",
        repeat: Infinity,
        delay: randomDelay,
      }}
    />
  );
};

// Interactive particles with mouse movement reaction
const AnimatedParticlesBackground = ({ count = 40, colorScheme = "light" }) => {
  const containerRef = useRef(null);
  const mousePosition = useRef({ x: 0, y: 0 });
  const particles = useRef([]);
  
  // Generate particles with random properties
  useEffect(() => {
    if (!containerRef.current) return;
    
    const { width, height } = containerRef.current.getBoundingClientRect();
    
    // Create particles with random sizes and positions
    particles.current = Array.from({ length: count }).map(() => ({
      size: Math.random() * 5 + 2,
      initialPosition: {
        x: Math.random() * width,
        y: Math.random() * height,
      },
      speed: Math.random() * 0.5 + 0.2,
      animationDuration: Math.random() * 10 + 15,
      color: colorScheme === "light" 
        ? `rgba(255, 253, 250, ${Math.random() * 0.3 + 0.1})` 
        : `rgba(10, 10, 10, ${Math.random() * 0.3 + 0.1})`,
    }));
  }, [count, colorScheme]);
  
  // Mouse movement interaction
  useEffect(() => {
    if (!containerRef.current) return;
    
    const handleMouseMove = (e) => {
      const { left, top } = containerRef.current.getBoundingClientRect();
      mousePosition.current = {
        x: e.clientX - left,
        y: e.clientY - top,
      };
    };
    
    containerRef.current.addEventListener('mousemove', handleMouseMove);
    
    return () => {
      if (containerRef.current) {
        containerRef.current.removeEventListener('mousemove', handleMouseMove);
      }
    };
  }, []);

  return (
    <motion.div 
      ref={containerRef}
      className="fixed inset-0 overflow-hidden -z-10"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1.5 }}
    >
      {particles.current.map((particle, index) => (
        <Particle 
          key={index}
          size={particle.size}
          color={particle.color}
          initialPosition={particle.initialPosition}
          speed={particle.speed}
          animationDuration={particle.animationDuration}
        />
      ))}
      
      {/* Radial gradient that follows mouse */}
      <motion.div 
        className="absolute pointer-events-none"
        style={{
          width: 300,
          height: 300,
          borderRadius: '50%',
          background: colorScheme === "light" 
            ? 'radial-gradient(circle, rgba(255,253,250,0.1) 0%, rgba(255,253,250,0) 70%)' 
            : 'radial-gradient(circle, rgba(10,10,10,0.1) 0%, rgba(10,10,10,0) 70%)',
          x: -150,
          y: -150,
        }}
        animate={{
          x: mousePosition.current.x - 150,
          y: mousePosition.current.y - 150,
        }}
        transition={{
          type: "spring",
          stiffness: 50,
          damping: 20,
          mass: 0.8,
        }}
      />
    </motion.div>
  );
};

export default AnimatedParticlesBackground;