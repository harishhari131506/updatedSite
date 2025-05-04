import React, { useState, useEffect } from 'react';
import { motion, useAnimation, useMotionValue, useTransform, AnimatePresence } from 'framer-motion';

// Split text into individual characters for advanced animations
export const AnimatedCharacters = ({ text, highlightIndices = [], className = '', options = {} }) => {
  const {
    delay = 0.03,
    duration = 0.5,
    staggerChildren = 0.03,
    highlightColor = "text-cream",
    defaultColor = "text-cream/70",
    animate = true,
  } = options;
  
  // Animation variants for characters
  const characterVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * staggerChildren + delay,
        duration: duration,
        ease: [0.2, 0.65, 0.3, 0.9],
      }
    }),
    exit: { opacity: 0, y: 20, transition: { duration: 0.2 } }
  };
  
  // Create array of characters
  const characters = text.split('');
  
  return (
    <motion.span 
      className={`inline-block ${className}`}
      initial="hidden"
      animate={animate ? "visible" : "hidden"}
      exit="exit"
      aria-label={text}
    >
      {characters.map((char, index) => (
        <motion.span
          key={`${char}-${index}`}
          className={`inline-block ${highlightIndices.includes(index) ? highlightColor : defaultColor}`}
          variants={characterVariants}
          custom={index}
          style={{ originX: 0.5, originY: 0.5 }}
        >
          {char === ' ' ? '\u00A0' : char}
        </motion.span>
      ))}
    </motion.span>
  );
};

// Animated typing effect with cursor
export const TypewriterText = ({ phrases, options = {} }) => {
  const {
    typingSpeed = 100, 
    deletingSpeed = 50,
    delayAfterPhrase = 1500,
    delayBeforeDelete = 1500,
    cursorBlinkSpeed = 0.8,
    loop = true,
    className = '',
    cursorClassName = 'font-normal ml-0.5',
  } = options;
  
  const [displayText, setDisplayText] = useState('');
  const [currentPhraseIndex, setCurrentPhraseIndex] = useState(0);
  const [isTyping, setIsTyping] = useState(true);
  const [isDone, setIsDone] = useState(false);
  
  useEffect(() => {
    if (!phrases || phrases.length === 0) return;
    
    const currentPhrase = phrases[currentPhraseIndex];
    
    if (isTyping) {
      // Typing effect
      if (displayText.length < currentPhrase.length) {
        const timeout = setTimeout(() => {
          setDisplayText(currentPhrase.substring(0, displayText.length + 1));
        }, typingSpeed);
        
        return () => clearTimeout(timeout);
      } else {
        // Finished typing current phrase
        setIsTyping(false);
        
        const timeout = setTimeout(() => {
          if (!loop && currentPhraseIndex === phrases.length - 1) {
            setIsDone(true);
          } else {
            setIsTyping(false);
          }
        }, delayAfterPhrase);
        
        return () => clearTimeout(timeout);
      }
    } else {
      // Deleting effect
      if (!isDone && displayText.length > 0) {
        const timeout = setTimeout(() => {
          setDisplayText(displayText.substring(0, displayText.length - 1));
        }, deletingSpeed);
        
        return () => clearTimeout(timeout);
      } else if (!isDone) {
        // Finished deleting, move to next phrase
        setIsTyping(true);
        setCurrentPhraseIndex((prevIndex) => (prevIndex + 1) % phrases.length);
        
        const timeout = setTimeout(() => {}, delayBeforeDelete);
        return () => clearTimeout(timeout);
      }
    }
  }, [
    displayText, 
    currentPhraseIndex, 
    isTyping, 
    isDone, 
    phrases, 
    typingSpeed, 
    deletingSpeed, 
    delayAfterPhrase, 
    delayBeforeDelete, 
    loop
  ]);
  
  return (
    <span className={className}>
      {displayText}
      <motion.span 
        className={`inline-block ${cursorClassName}`}
        animate={{ opacity: [1, 0, 1] }}
        transition={{ 
          repeat: Infinity, 
          duration: cursorBlinkSpeed, 
          ease: "linear" 
        }}
      >|</motion.span>
    </span>
  );
};

// Text that reveals word by word
export const RevealText = ({ text, options = {} }) => {
  const {
    staggerChildren = 0.12,
    duration = 0.6,
    delay = 0,
    className = '',
    once = true,
  } = options;
  
  // Control for animations
  const controls = useAnimation();
  
  // Split text into words
  const words = text.split(' ');
  
  useEffect(() => {
    controls.start((i) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * staggerChildren + delay,
        duration,
        ease: [0.2, 0.65, 0.3, 0.9],
      }
    }));
  }, [controls, staggerChildren, duration, delay]);
  
  return (
    <motion.p className={className}>
      {words.map((word, index) => (
        <motion.span
          key={index}
          custom={index}
          animate={controls}
          initial={{ opacity: 0, y: 20 }}
          className="inline-block mr-1"
        >
          {word}
        </motion.span>
      ))}
    </motion.p>
  );
};

// Text that reacts to scroll position
export const ScrollTriggeredText = ({ words, options = {} }) => {
  const {
    threshold = 0.1,
    stagger = 0.1,
    scrollOffset = ["0 0.7", "0 0.3"],
    className = '',
  } = options;
  
  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: stagger,
        delayChildren: 0.1,
      },
    },
  };
  
  const wordVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 200,
        damping: 20,
      },
    },
  };
  
  // Reference for the text element
  const ref = React.useRef(null);
  const inView = useInView(ref, { once: true, threshold });
  
  return (
    <motion.div
      ref={ref}
      className={className}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      variants={containerVariants}
    >
      {words.map((word, index) => (
        <motion.span
          key={index}
          className="inline-block mr-2"
          variants={wordVariants}
        >
          {word}
        </motion.span>
      ))}
    </motion.div>
  );
};

// Helper for useInView hook
const useInView = (ref, options = {}) => {
  const [isInView, setIsInView] = useState(false);
  
  useEffect(() => {
    if (!ref.current) return;
    
    const observer = new IntersectionObserver(([entry]) => {
      setIsInView(entry.isIntersecting);
      
      if (entry.isIntersecting && options.once) {
        observer.unobserve(ref.current);
      }
    }, options);
    
    observer.observe(ref.current);
    
    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, [ref, options.once, options.threshold]);
  
  return isInView;
};

// Gradient text that animates on hover
export const AnimatedGradientText = ({ text, options = {} }) => {
  const {
    colors = ['#FF1CF7', '#00BFFF', '#00FF5E', '#F5F5F5'],
    duration = 4,
    className = 'font-bold',
    animateOnHover = true,
  } = options;
  
  // Create a gradient that moves
  const gradientControls = useAnimation();
  
  const handleHoverStart = () => {
    if (animateOnHover) {
      gradientControls.start({
        backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
        transition: { duration, ease: 'linear', repeat: Infinity }
      });
    }
  };
  
  const handleHoverEnd = () => {
    if (animateOnHover) {
      gradientControls.stop();
    }
  };
  
  // Always animate if not hover-triggered
  useEffect(() => {
    if (!animateOnHover) {
      gradientControls.start({
        backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
        transition: { duration, ease: 'linear', repeat: Infinity }
      });
    }
  }, [animateOnHover, duration, gradientControls]);
  
  const colorString = colors.join(', ');
  
  return (
    <motion.span
      className={`bg-clip-text text-transparent inline-block ${className}`}
      style={{
        backgroundSize: '200% 200%',
        backgroundImage: `linear-gradient(90deg, ${colorString})`,
      }}
      animate={gradientControls}
      onHoverStart={handleHoverStart}
      onHoverEnd={handleHoverEnd}
    >
      {text}
    </motion.span> 
  );
};

export default {
  AnimatedCharacters,
  TypewriterText,
  RevealText,
  ScrollTriggeredText,
  AnimatedGradientText
};