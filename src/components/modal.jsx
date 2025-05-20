import { useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import gsap from 'gsap';

const scaleAnimation = {
  initial: { scale: 0, x: "-50%", y: "-50%" },
  enter: { scale: 1, x: "-50%", y: "-50%", transition: { duration: 0.4, ease: [0.76, 0, 0.24, 1] } },
  closed: { scale: 0, x: "-50%", y: "-50%", transition: { duration: 0.4, ease: [0.32, 0, 0.67, 0] } }
};

export default function Modal({ modal, projects }) {
  const { active, index } = modal;
  const modalContainer = useRef(null);
  const cursor = useRef(null);
  const cursorLabel = useRef(null);

  useEffect(() => {
    // Move Container
    let xMoveContainer = gsap.quickTo(modalContainer.current, "left", { duration: 0.8, ease: "power3" });
    let yMoveContainer = gsap.quickTo(modalContainer.current, "top", { duration: 0.8, ease: "power3" });
    // Move cursor
    let xMoveCursor = gsap.quickTo(cursor.current, "left", { duration: 0.5, ease: "power3" });
    let yMoveCursor = gsap.quickTo(cursor.current, "top", { duration: 0.5, ease: "power3" });
    // Move cursor label
    let xMoveCursorLabel = gsap.quickTo(cursorLabel.current, "left", { duration: 0.45, ease: "power3" });
    let yMoveCursorLabel = gsap.quickTo(cursorLabel.current, "top", { duration: 0.45, ease: "power3" });

    window.addEventListener('mousemove', (e) => {
      const { pageX, pageY } = e;
      xMoveContainer(pageX);
      yMoveContainer(pageY);
      xMoveCursor(pageX);
      yMoveCursor(pageY);
      xMoveCursorLabel(pageX);
      yMoveCursorLabel(pageY);
    });
  }, []);

  const handleClick = () => {
    if (active && index >= 0 && index < projects.length) {
      window.open(projects[index].link, '_blank');
    }
  };

  return (
    <>
      <motion.div 
        ref={modalContainer} 
        variants={scaleAnimation} 
        initial="initial" 
        animate={active ? "enter" : "closed"} 
        className="h-64 w-64 md:h-80 md:w-96 lg:h-88 lg:w-96 absolute bg-white overflow-hidden pointer-events-none flex items-center justify-center"
        onClick={handleClick}
      >
        <div 
          style={{ top: index * -100 + "%" }} 
          className="h-full w-full absolute transition-all duration-500 ease-[cubic-bezier(0.76,0,0.24,1)]"
        >
          {projects.map((project, index) => {
            const { src, color } = project;
            return (
              <div 
                className="h-full w-full flex items-center justify-center" 
                style={{ backgroundColor: color }} 
                key={`modal_${index}`}
              >
                <img 
                  src={`/${src}`}
                  width={350}
                  height={0}
                  alt="image"
                  className="h-auto"
                />
              </div>
            );
          })}
        </div>
      </motion.div>
      
      <motion.div 
        ref={cursor} 
        className="w-14 h-14 md:w-20 md:h-20 rounded-full bg-blue-600 text-white absolute z-10 flex items-center justify-center pointer-events-none" 
        variants={scaleAnimation} 
        initial="initial" 
        animate={active ? "enter" : "closed"}
      ></motion.div>
      
      <motion.div 
        ref={cursorLabel} 
        className="w-14 h-14 md:w-20 md:h-20 rounded-full bg-transparent text-white absolute z-10 flex items-center justify-center text-sm font-light pointer-events-none" 
        variants={scaleAnimation} 
        initial="initial" 
        animate={active ? "enter" : "closed"}
      >
        View
      </motion.div>
    </>
  );
}