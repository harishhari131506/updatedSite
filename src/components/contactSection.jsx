import React, { useState, useRef, useEffect } from 'react';
import { motion, useMotionValue, useSpring, animate } from "framer-motion";

export default function ContactSection() {
  const [isEmailCopied, setIsEmailCopied] = useState(false);
  const [isPhoneCopied, setIsPhoneCopied] = useState(false);
  const [quoteText, setQuoteText] = useState('');

  const email = "harish130615@gmail.com";
  const phone = "+91 9360461148";

  const containerRef = useRef(null);
  const [hovering, setHovering] = useState(false);

  // Motion values for the floating button
  const buttonX = useMotionValue(0);
  const buttonY = useMotionValue(0);

  const springX = useSpring(buttonX, { stiffness: 200, damping: 20 });
  const springY = useSpring(buttonY, { stiffness: 200, damping: 20 });

  // SVG curve animation references and variables
  const path = useRef(null);
  let progress = 0;
  let svgX = 0.5;
  let reqId = null;
  let time = Math.PI / 2;

  // Initialize the SVG path
  useEffect(() => {
    setPath(progress);
    
    // Handle window resize
    const handleResize = () => {
      setPath(progress);
    };
    
    window.addEventListener('resize', handleResize);
    
    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(reqId);
    };
  }, []);

  // Helper function to update SVG path
  const setPath = (value) => {
    if (!path.current) return;
    
    const width = containerRef.current ? containerRef.current.offsetWidth : window.innerWidth * 0.7;
    path.current.setAttributeNS(null, "d", `M 0 50 Q ${width * svgX} ${50 + value} ${width} 50`);
  };

  // Animation functions for SVG curve
  const animateIn = () => {
    // Cancel any existing animation
    if (reqId) {
      cancelAnimationFrame(reqId);
      time = Math.PI / 2;
    }
    
    setPath(progress);
    reqId = requestAnimationFrame(animateIn);
  };

  const manageMouseMove = (e) => {
    const { movementY } = e;
    const box = containerRef.current.getBoundingClientRect();
    svgX = (e.clientX - box.left) / box.width;
    progress += movementY;
    
    // Update the SVG path
    setPath(progress);
  };

  const lerp = (x, y, a) => x * (1 - a) + y * a;

  const animateOut = () => {
    let newProgress = progress * Math.sin(time);
    setPath(newProgress);
    
    progress = lerp(progress, 0, 0.04);
    time += 0.2;
    
    if (Math.abs(progress) > 0.5) {
      reqId = requestAnimationFrame(animateOut);
    } else {
      // Reset animation values
      time = Math.PI / 2;
      progress = 0;
      setPath(0);
    }
  };

  const resetAnimation = () => {
    cancelAnimationFrame(reqId);
    animateOut();
  };

  // Hover logic for the floating button
  const handleMouseMove = (e) => {
    if (!hovering || !containerRef.current) return;

    const rect = containerRef.current.getBoundingClientRect();
    const offsetX = e.clientX - rect.left - rect.width + 80;
    const offsetY = e.clientY - rect.top - rect.height + 80;

    buttonX.set(offsetX / 2);
    buttonY.set(offsetY / 2);
  };

  const resetPosition = () => {
    animate(buttonX, 0, { duration: 0.6, type: "spring", stiffness: 200, damping: 20 });
    animate(buttonY, 0, { duration: 0.6, type: "spring", stiffness: 200, damping: 20 });
  };

  // Clipboard functions
  const handleEmailClick = () => {
    window.location.href = `mailto:${email}`;
  };

  const handlePhoneClick = () => {
    window.location.href = `tel:${phone.replace(/\s/g, '')}`;
  };

  const copyToClipboard = (text, type) => {
    navigator.clipboard.writeText(text).then(() => {
      if (type === 'email') {
        setIsEmailCopied(true);
        setTimeout(() => setIsEmailCopied(false), 2000);
      } else {
        setIsPhoneCopied(true);
        setTimeout(() => setIsPhoneCopied(false), 2000);
      }
    });
  };

  // Quote submission handler
  const handleQuoteSubmit = () => {
    console.log('Quote submitted:', quoteText);
    // You can add additional functionality here like sending to a server
    setQuoteText(''); // Clear the input after submission
  };

  return (
    <div className="bg-[#4E4E5A] min-h-screen text-white flex flex-col justify-between py-8 px-4 md:px-12 relative">
      {/* Header Section */}
      <div className="flex items-center mb-20 relative">
        <div className="w-12 h-12 md:w-16 md:h-16 rounded-full bg-gray-400 overflow-hidden mr-4">
          <img
            src="logo.svg"
            alt="Profile"
            className="w-full h-full object-cover bg-white"
          />
        </div>
        <h1 className="text-4xl md:text-4xl font-bold" style={{ fontFamily: 'Lobster' }}>
          Let's work <br className="hidden md:block" />together
        </h1>

        <button className="absolute top-0 right-0 text-2xl">
          ↗
        </button>
      </div>

      {/* SVG Curve and Floating Button Container */}
      <div
        ref={containerRef}
        className="relative mb-24 h-32"
        onMouseMove={(e) => {
          handleMouseMove(e);
          manageMouseMove(e);
        }}
        onMouseEnter={() => {
          setHovering(true);
          animateIn();
        }}
        onMouseLeave={() => {
          setHovering(false);
          resetPosition();
          resetAnimation();
        }}
      >
        {/* This div serves as the baseline for the SVG */}
        <div className="h-px w-full bg-gray-300 absolute top-16"></div>
        
        {/* SVG container for the curve */}
        <svg className="absolute top-0 left-0 w-full h-32 overflow-visible pointer-events-none">
          <path 
            ref={path} 
            stroke="rgba(209, 213, 219, 0.5)" 
            strokeWidth="1" 
            fill="transparent"
          />
        </svg>
        
        {/* Floating button */}
        <motion.div
          style={{ 
            x: springX, 
            y: springY,
            position: 'absolute',
            top: '16px', // Align with the gray line
            right: '0'
          }}
          className="transform -translate-y-1/2"
          onMouseEnter={() => setHovering(true)}
        >
          <div className="w-24 h-24 md:w-32 md:h-32 bg-blue-600 rounded-full flex items-center justify-center cursor-pointer hover:bg-blue-700 transition-colors">
            <span className="text-sm md:text-lg" style={{ fontFamily: "Lobster" }}>
              Get in touch
            </span>
          </div>
        </motion.div>
      </div>

      {/* Contact Info */}
      <div className="flex flex-col md:flex-row md:items-center gap-4 md:gap-8">
        <div
          className="relative group bg-[#111111] hover:bg-[#191919] border border-gray-800 p-4 md:p-6 rounded-full cursor-pointer transition-all duration-300 flex items-center justify-center md:min-w-72"
          onClick={handleEmailClick}
          onContextMenu={(e) => {
            e.preventDefault();
            copyToClipboard(email, 'email');
          }}
        >
          <span className="truncate">{email}</span>
          {isEmailCopied && (
            <span className="absolute -top-8 left-0 bg-green-900 text-white text-xs px-2 py-1 rounded">
              Copied!
            </span>
          )}
        </div>

        <div
          className="relative group bg-[#111111] hover:bg-[#191919] border border-gray-800 p-4 md:p-6 rounded-full cursor-pointer transition-all duration-300 flex items-center justify-center md:min-w-52"
          onClick={handlePhoneClick}
          onContextMenu={(e) => {
            e.preventDefault();
            copyToClipboard(phone, 'phone');
          }}
        >
          <span>{phone}</span>
          {isPhoneCopied && (
            <span className="absolute -top-8 left-0 bg-green-900 text-white text-xs px-2 py-1 rounded">
              Copied!
            </span>
          )}
        </div>
      </div>

      {/* Small note */}
      <div className="text-xs text-gray-500 mt-4 text-center md:text-left mb-8">
        Click to open app • Right-click to copy
      </div>

      {/* New Quote Request Section - Clean and Sleek */}
      <div className="mt-16 mb-8 max-w-3xl mx-auto w-full">
        <h3 className="text-xl font-light mb-6 text-center" style={{ fontFamily: 'Lobster' }}>Get a Quick Quote</h3>
        <div className="relative bg-gradient-to-r from-[#333340] to-[#3D3D4A] backdrop-blur-lg rounded-xl p-1 shadow-lg">
          <div className="flex items-center">
            <textarea 
              className="flex-grow bg-transparent border-none p-4 text-white placeholder-gray-400 focus:outline-none resize-none"
              placeholder="Tell us about your project..."
              value={quoteText}
              onChange={(e) => setQuoteText(e.target.value)}
              rows={1}
            ></textarea>
            <button 
              onClick={handleQuoteSubmit}
              className="bg-blue-600 hover:bg-blue-700 text-white p-3 m-1 rounded-lg transition-all duration-300 transform hover:scale-105"
              aria-label="Submit quote request"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
// import React, { useState, useRef, useEffect } from 'react';
// import { motion, useMotionValue, useSpring, animate } from "framer-motion";

// export default function ContactSection() {
//   const [isEmailCopied, setIsEmailCopied] = useState(false);
//   const [isPhoneCopied, setIsPhoneCopied] = useState(false);

//   const email = "harish130615@gmail.com";
//   const phone = "+91 9360461148";

//   const containerRef = useRef(null);
//   const [hovering, setHovering] = useState(false);

//   // Motion values for the floating button
//   const buttonX = useMotionValue(0);
//   const buttonY = useMotionValue(0);

//   const springX = useSpring(buttonX, { stiffness: 200, damping: 20 });
//   const springY = useSpring(buttonY, { stiffness: 200, damping: 20 });

//   // SVG curve animation references and variables
//   const path = useRef(null);
//   let progress = 0;
//   let svgX = 0.5;
//   let reqId = null;
//   let time = Math.PI / 2;

//   // Initialize the SVG path
//   useEffect(() => {
//     setPath(progress);
    
//     // Handle window resize
//     const handleResize = () => {
//       setPath(progress);
//     };
    
//     window.addEventListener('resize', handleResize);
    
//     return () => {
//       window.removeEventListener('resize', handleResize);
//       cancelAnimationFrame(reqId);
//     };
//   }, []);

//   // Helper function to update SVG path
//   const setPath = (value) => {
//     if (!path.current) return;
    
//     const width = containerRef.current ? containerRef.current.offsetWidth : window.innerWidth * 0.7;
//     path.current.setAttributeNS(null, "d", `M 0 50 Q ${width * svgX} ${50 + value} ${width} 50`);
//   };

//   // Animation functions for SVG curve
//   const animateIn = () => {
//     // Cancel any existing animation
//     if (reqId) {
//       cancelAnimationFrame(reqId);
//       time = Math.PI / 2;
//     }
    
//     setPath(progress);
//     reqId = requestAnimationFrame(animateIn);
//   };

//   const manageMouseMove = (e) => {
//     const { movementY } = e;
//     const box = containerRef.current.getBoundingClientRect();
//     svgX = (e.clientX - box.left) / box.width;
//     progress += movementY;
    
//     // Update the SVG path
//     setPath(progress);
//   };

//   const lerp = (x, y, a) => x * (1 - a) + y * a;

//   const animateOut = () => {
//     let newProgress = progress * Math.sin(time);
//     setPath(newProgress);
    
//     progress = lerp(progress, 0, 0.04);
//     time += 0.2;
    
//     if (Math.abs(progress) > 0.5) {
//       reqId = requestAnimationFrame(animateOut);
//     } else {
//       // Reset animation values
//       time = Math.PI / 2;
//       progress = 0;
//       setPath(0);
//     }
//   };

//   const resetAnimation = () => {
//     cancelAnimationFrame(reqId);
//     animateOut();
//   };

//   // Hover logic for the floating button
//   const handleMouseMove = (e) => {
//     if (!hovering || !containerRef.current) return;

//     const rect = containerRef.current.getBoundingClientRect();
//     const offsetX = e.clientX - rect.left - rect.width + 80;
//     const offsetY = e.clientY - rect.top - rect.height + 80;

//     buttonX.set(offsetX / 2);
//     buttonY.set(offsetY / 2);
//   };

//   const resetPosition = () => {
//     animate(buttonX, 0, { duration: 0.6, type: "spring", stiffness: 200, damping: 20 });
//     animate(buttonY, 0, { duration: 0.6, type: "spring", stiffness: 200, damping: 20 });
//   };

//   // Clipboard functions
//   const handleEmailClick = () => {
//     window.location.href = `mailto:${email}`;
//   };

//   const handlePhoneClick = () => {
//     window.location.href = `tel:${phone.replace(/\s/g, '')}`;
//   };

//   const copyToClipboard = (text, type) => {
//     navigator.clipboard.writeText(text).then(() => {
//       if (type === 'email') {
//         setIsEmailCopied(true);
//         setTimeout(() => setIsEmailCopied(false), 2000);
//       } else {
//         setIsPhoneCopied(true);
//         setTimeout(() => setIsPhoneCopied(false), 2000);
//       }
//     });
//   };

//   return (
//     <div className="bg-[#4E4E5A] min-h-screen text-white flex flex-col justify-between py-8 px-4 md:px-12 relative">
//       {/* Header Section */}
//       <div className="flex items-center mb-20 relative">
//         <div className="w-12 h-12 md:w-16 md:h-16 rounded-full bg-gray-400 overflow-hidden mr-4">
//           <img
//             src="logo.svg"
//             alt="Profile"
//             className="w-full h-full object-cover bg-white"
//           />
//         </div>
//         <h1 className="text-4xl md:text-4xl font-bold" style={{ fontFamily: 'Lobster' }}>
//           Let's work <br className="hidden md:block" />together
//         </h1>

//         <button className="absolute top-0 right-0 text-2xl">
//           ↗
//         </button>
//       </div>

//       {/* SVG Curve and Floating Button Container */}
//       <div
//         ref={containerRef}
//         className="relative mb-24 h-32"
//         onMouseMove={(e) => {
//           handleMouseMove(e);
//           manageMouseMove(e);
//         }}
//         onMouseEnter={() => {
//           setHovering(true);
//           animateIn();
//         }}
//         onMouseLeave={() => {
//           setHovering(false);
//           resetPosition();
//           resetAnimation();
//         }}
//       >
//         {/* This div serves as the baseline for the SVG */}
//         <div className="h-px w-full bg-gray-300 absolute top-16"></div>
        
//         {/* SVG container for the curve */}
//         <svg className="absolute top-0 left-0 w-full h-32 overflow-visible pointer-events-none">
//           <path 
//             ref={path} 
//             stroke="rgba(209, 213, 219, 0.5)" 
//             strokeWidth="1" 
//             fill="transparent"
//           />
//         </svg>
        
//         {/* Floating button */}
//         <motion.div
//           style={{ 
//             x: springX, 
//             y: springY,
//             position: 'absolute',
//             top: '16px', // Align with the gray line
//             right: '0'
//           }}
//           className="transform -translate-y-1/2"
//           onMouseEnter={() => setHovering(true)}
//         >
//           <div className="w-24 h-24 md:w-32 md:h-32 bg-blue-600 rounded-full flex items-center justify-center cursor-pointer hover:bg-blue-700 transition-colors">
//             <span className="text-sm md:text-lg" style={{ fontFamily: "Lobster" }}>
//               Get in touch
//             </span>
//           </div>
//         </motion.div>
//       </div>

//       {/* Contact Info */}
//       <div className="flex flex-col md:flex-row md:items-center gap-4 md:gap-8">
//         <div
//           className="relative group bg-[#111111] hover:bg-[#191919] border border-gray-800 p-4 md:p-6 rounded-full cursor-pointer transition-all duration-300 flex items-center justify-center md:min-w-72"
//           onClick={handleEmailClick}
//           onContextMenu={(e) => {
//             e.preventDefault();
//             copyToClipboard(email, 'email');
//           }}
//         >
//           <span className="truncate">{email}</span>
//           {isEmailCopied && (
//             <span className="absolute -top-8 left-0 bg-green-900 text-white text-xs px-2 py-1 rounded">
//               Copied!
//             </span>
//           )}
//         </div>

//         <div
//           className="relative group bg-[#111111] hover:bg-[#191919] border border-gray-800 p-4 md:p-6 rounded-full cursor-pointer transition-all duration-300 flex items-center justify-center md:min-w-52"
//           onClick={handlePhoneClick}
//           onContextMenu={(e) => {
//             e.preventDefault();
//             copyToClipboard(phone, 'phone');
//           }}
//         >
//           <span>{phone}</span>
//           {isPhoneCopied && (
//             <span className="absolute -top-8 left-0 bg-green-900 text-white text-xs px-2 py-1 rounded">
//               Copied!
//             </span>
//           )}
//         </div>
//       </div>

//       {/* Small note */}
//       <div className="text-xs text-gray-500 mt-4 text-center md:text-left">
//         Click to open app • Right-click to copy
//       </div>
//     </div>
//   );
// }