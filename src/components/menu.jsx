import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion';
import Button from './Button';
import Nav from './Nav';

const menu = {
  open: {
    width: "480px",
    height: "650px",
    top: "-25px",
    right: "-25px",
    transition: { duration: 0.75, type: "tween", ease: [0.76, 0, 0.24, 1]}
  },
  closed: {
    width: "100px",
    height: "40px",
    top: "0px",
    right: "0px",
    transition: { duration: 0.75, delay: 0.35, type: "tween", ease: [0.76, 0, 0.24, 1]}
  }
}

// Responsive variants for smaller screens
const responsiveMenu = {
  open: {
    width: "90vw",
    height: "80vh",
    maxWidth: "480px",
    maxHeight: "650px",
    top: "-25px",
    right: "-25px",
    transition: { duration: 0.75, type: "tween", ease: [0.76, 0, 0.24, 1]}
  },
  closed: {
    width: "100px",
    height: "40px",
    top: "0px",
    right: "0px",
    transition: { duration: 0.75, delay: 0.35, type: "tween", ease: [0.76, 0, 0.24, 1]}
  }
}

export default function MenuC() {
  const [isActive, setIsActive] = useState(false);
  const isMobile = typeof window !== 'undefined' ? window.innerWidth <= 768 : false;

  return (
    <div className="fixed right-6 sm:right-8 md:right-12 lg:right-16 top-6 sm:top-8 md:top-12 lg:top-16 z-200">
      <motion.div 
        className="bg-[#c9fd74] rounded-3xl relative"
        variants={isMobile ? responsiveMenu : menu}
        animate={isActive ? "open" : "closed"}
        initial="closed"
      >
        <AnimatePresence>
          {isActive && <Nav />}
        </AnimatePresence>
      </motion.div>
      <Button isActive={isActive} toggleMenu={() => {setIsActive(!isActive)}}/>
    </div>
  )
}