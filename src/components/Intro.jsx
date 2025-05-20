import React from 'react'
import { motion } from "framer-motion";
import useMousePosition from "../hooks/useMousePosition";
import { useEffect, useRef, useState } from "react";

export default function Intro() {
    const [isHovered, setIsHovered] = useState(false);
    const { x, y } = useMousePosition();
    const [isMobile, setIsMobile] = useState(false);
    
    // Set initial mask size based on screen size
    const defaultSize = isMobile ? 150 : 40;
    const hoverSize = isMobile ? 250 : 350;
    const [size, setSize] = useState(defaultSize);
    
    // Handle resize events to detect mobile
    useEffect(() => {
        const checkMobile = () => {
            setIsMobile(window.innerWidth <= 768);
        };
        
        // Check initially
        checkMobile();
        
        // Add resize listener
        window.addEventListener("resize", checkMobile);
        
        // Cleanup
        return () => window.removeEventListener("resize", checkMobile);
    }, []);
    
    // Update size when hover state or mobile state changes
    useEffect(() => {
        setSize(isHovered ? hoverSize : defaultSize);
    }, [isHovered, isMobile, hoverSize, defaultSize]);

    return (
        <main className="h-screen bg-black relative bg-cover bg-center bg-no-repeat">
            <motion.div 
                className="w-full h-full flex items-center justify-center text-black cursor-default absolute bg-[#ec4e39]"
                style={{ 
                    WebkitMaskImage: "url('/mask.svg')", 
                    WebkitMaskRepeat: "no-repeat" 
                }}
                animate={{
                    WebkitMaskPosition: `${x - (size / 2)}px ${y - (size / 2)}px`,
                    WebkitMaskSize: `${size}px`,
                }}
                transition={{ type: "tween", ease: "backOut", duration: 0.5 }}
            >
                <p 
                    className="w-full max-w-[1000px] p-4 md:p-10 text-2xl md:text-4xl lg:text-[64px] leading-tight md:leading-tight lg:leading-[66px]"
                    onMouseEnter={() => setIsHovered(true)} 
                    onMouseLeave={() => setIsHovered(false)}
                >
                    Let's craft clean UIs, solid APIs, and automated pipelines. I build scalable systems that look sharp, run smooth, and survive refactors.
                </p>
            </motion.div>
          
            <div className="w-full h-full flex items-center justify-center text-[#afa18f] cursor-default">
                <p className="w-full max-w-[1000px] p-4 md:p-10 text-2xl md:text-4xl lg:text-[64px] leading-tight md:leading-tight lg:leading-[66px]">
                    Like what you see? Let's <span className="text-[#ec4e39]">start</span> creating — frontend, backend, and everything in between.
                </p>
            </div>
        </main>
    )
}
// import React from 'react'
// import { motion } from "framer-motion";
// import useMousePosition from "../hooks/useMousePosition";
// import { useEffect, useRef, useState } from "react";

// export default function Intro() {

//     const [isHovered, setIsHovered] = useState(false);
//     const { x, y } = useMousePosition();
//     const size = isHovered ? 350 : 40;
//   return (
//     // <main className="h-screen bg-grey-800 relative bg-cover bg-center bg-no-repeat" 
//     // style={{ backgroundImage: "url('/test1.jpg')" }}>  
//     <>
//     {/* <br></br> */}
//     <main className="h-screen bg-black relative bg-cover bg-center bg-no-repeat" 
// >
//     <motion.div 
//       className="w-full h-full flex items-center justify-center text-black text-[64px] leading-[66px] cursor-default absolute bg-[#ec4e39]"
//       style={{ 
//         WebkitMaskImage: "url('/mask.svg')", 
//         WebkitMaskRepeat: "no-repeat" 
//       }}
//       animate={{
//         WebkitMaskPosition: `${x - (size / 2)}px ${y - (size / 2)}px`,
//         WebkitMaskSize: `${size}px`,
//       }}
//       transition={{ type: "tween", ease: "backOut", duration: 0.5 }}
//     >
//       <p 
//         className="w-[1000px] p-10"
//         onMouseEnter={() => setIsHovered(true)} 
//         onMouseLeave={() => setIsHovered(false)}
//       >
//        Let's craft clean UIs, solid APIs, and automated pipelines. I build scalable systems that look sharp, run smooth, and survive refactors.
//        </p>
//     </motion.div>
  
//     <div className="w-full h-full flex items-center justify-center text-[#afa18f] text-[64px] leading-[66px] cursor-default">
//       <p className="w-[1000px] p-10">
//         {/* I'm a <span className="text-[#ec4e39]">selectively skilled</span> product designer with strong focus on producing high quality & impactful digital experience. */}
 
                    
//         Like what you see? Let’s <span className="text-[#ec4e39]">start</span> creating — frontend, backend, and everything in between.
//       </p>
//     </div>
//   </main>
//     </>
  
//   )
// }
