import { useState, useRef, useEffect } from "react";
import { motion, useMotionValue, animate } from "framer-motion";

export default function ContactSection() {
  const [hovering, setHovering] = useState(false);
  const [path, setPath] = useState(null);
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState(null);
  const pathRef = useRef(null);
  const containerRef = useRef(null);
  
  const buttonX = useMotionValue(0);
  const buttonY = useMotionValue(0);
  
  let reqId = null;
  let progress = 0;
  let time = Math.PI / 2;
  
  useEffect(() => {
    if (pathRef.current) {
      setPath(pathRef.current);
    }
  }, []);
  
  // Function to lerp (linear interpolation)
  const lerp = (start, end, t) => {
    return start * (1 - t) + end * t;
  };

  // Animation functions for SVG curve
  const animateIn = () => {
    // Cancel any existing animation
    if (reqId) {
      cancelAnimationFrame(reqId);
      time = Math.PI / 2;
    }
    
    progress += 0.05;
    if (progress > 30) progress = 30;
    
    if (path) {
      const width = containerRef.current.offsetWidth;
      const controlPointY = progress * Math.sin(time);
      const midX = width / 2;
      
      path.setAttribute(
        "d",
        `M0,16 C${midX},${16 + controlPointY} ${midX},${16 + controlPointY} ${width},16`
      );
    }
    
    reqId = requestAnimationFrame(animateIn);
  };
  
  const resetPosition = () => {
    animate(buttonX, 0, {
      duration: 0.6,
      type: "spring",
      stiffness: 200,
      damping: 20,
    });
    animate(buttonY, 0, {
      duration: 0.6,
      type: "spring",
      stiffness: 200,
      damping: 20,
    });
  };
  
  const resetAnimation = () => {
    cancelAnimationFrame(reqId);
    animateOut();
  };
  
  const animateOut = () => {
    if (path) {
      const width = containerRef.current.offsetWidth;
      const midX = width / 2;
      
      progress = lerp(progress, 0, 0.04);
      time += 0.2;
      
      const controlPointY = progress * Math.sin(time);
      
      path.setAttribute(
        "d",
        `M0,16 C${midX},${16 + controlPointY} ${midX},${16 + controlPointY} ${width},16`
      );
    }
    
    if (Math.abs(progress) > 0.5) {
      reqId = requestAnimationFrame(animateOut);
    } else {
      // Reset animation values
      time = Math.PI / 2;
      progress = 0;
      if (path) {
        const width = containerRef.current.offsetWidth;
        path.setAttribute("d", `M0,16 C${width/2},16 ${width/2},16 ${width},16`);
      }
    }
  };
  
  const handleMouseMove = (e) => {
    if (!hovering || !containerRef.current) return;
    
    const rect = containerRef.current.getBoundingClientRect();
    const offsetX = e.clientX - rect.left - rect.width + 80;
    const offsetY = e.clientY - rect.top - rect.height + 80;
    
    buttonX.set(offsetX / 2);
    buttonY.set(offsetY / 2);
    
    // Update the curve based on mouse position
    if (path) {
      const width = containerRef.current.offsetWidth;
      const relativeX = e.clientX - rect.left;
      const relativePercent = relativeX / width;
      
      const midX = width / 2;
      const controlPointY = progress * Math.sin(time) + (e.clientY - rect.top - 16) * 0.1;
      
      // Adjust the bezier curve control points based on mouse position
      path.setAttribute(
        "d",
        `M0,16 C${midX - (0.5 - relativePercent) * 100},${16 + controlPointY} ${midX + (0.5 - relativePercent) * 100},${16 + controlPointY} ${width},16`
      );
    }
  };
  
const handleSubmit = async (e) => {
  e.preventDefault();
  setLoading(true);
  setStatus(null);
  
  try {
    // Replace with your Google Apps Script web app URL
    // This is the URL you get after deploying your Apps Script as a web app
    const scriptUrl = 'https://script.google.com/macros/s/AKfycby9FP3ykyFkI4vYz79i2g7Fv8tLd46EzPF50Y2ThLeGsa96o5OnisdKQZzbjGjc5nUAFw/exec';
    
    // Send data to Google Apps Script
    const response = await fetch(scriptUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email,
        message,
        timestamp: new Date().toISOString()
      }),
      mode: 'no-cors' // Required for Google Apps Script
    });
    
    // Since we're using no-cors, we can't read the response
    // So we assume success if no error is thrown
    setStatus({ type: 'success', message: 'Thank you! Your message has been submitted.' });
    setEmail('');
    setMessage('');
  } catch (error) {
    console.error('Error submitting form:', error);
    setStatus({ type: 'error', message: 'Failed to submit. Please try again later.' });
  }
  
  setLoading(false);
};
  return (
    <div className="w-full bg-[#2D2C43] py-24 px-6 sm:px-8 md:px-16 lg:px-24">
      <div className="max-w-6xl mx-auto">
        {/* Top heading with gradient effect */}
        <div className="text-center mb-16">
         
          <h2 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-white to-purple-300 bg-clip-text text-transparent">
            Let's Connect
          </h2>
          <p className="text-gray-300 mt-4 text-lg max-w-xl mx-auto">
            Have a project in mind? Drop what you have in mind and I'll get back to you within 24 hours.
          </p>
        </div>
        
        <div className="max-w-xl mx-auto relative">
          {/* Decorative elements */}
          <div className="absolute -top-14 -left-14 w-24 h-24 rounded-full bg-purple-500 opacity-10 blur-xl"></div>
          <div className="absolute -bottom-10 -right-10 w-32 h-32 rounded-full bg-blue-500 opacity-10 blur-xl"></div>
          
          <form onSubmit={handleSubmit}>
            <div
              ref={containerRef}
              className="relative mb-12 h-40"
              onMouseMove={handleMouseMove}
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
              
              <div className="flex flex-col gap-6 pt-4">
                <div className="flex flex-col gap-4">
                  <input 
                    type="email" 
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Your email"
                    required
                    className="flex-grow bg-[#3A3952] border border-purple-400 border-opacity-30 rounded-lg px-6 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all duration-300"
                  />
                  
                  <textarea
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="What you got in mind..."
                    required
                    rows={3}
                    className="flex-grow bg-[#3A3952] border border-purple-400 border-opacity-30 rounded-lg px-6 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all duration-300"
                  />
                  
                  <div className="flex justify-end">
                    <motion.button
                      type="submit"
                      disabled={loading}
                      style={{
                        x: buttonX,
                        y: buttonY
                      }}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.98 }}
                      className="bg-gradient-to-r from-purple-500 to-indigo-600 text-white px-8 py-3 rounded-lg font-medium shadow-lg hover:shadow-purple-500/20 transition-all duration-300 disabled:opacity-70"
                    >
                      {loading ? "Sending..." : "Send"}
                    </motion.button>
                  </div>
                </div>
                
                {status && (
                  <div className={`mt-4 p-3 rounded-lg ${status.type === 'success' ? 'bg-green-500/20 text-green-200' : 'bg-red-500/20 text-red-200'}`}>
                    {status.message}
                  </div>
                )}
                
                <div className="flex justify-center space-x-6 mt-2">
                  {/* Social icons */}
                  {['Twitter', 'LinkedIn', 'GitHub', 'Instagram'].map((platform) => (
                    <motion.a
                      key={platform}
                      href="#"
                      whileHover={{ y: -3 }}
                      className="text-gray-400 hover:text-white transition-colors"
                    >
                      <span className="text-sm">{platform}</span>
                    </motion.a>
                  ))}
                </div>
              </div>
            </div>
          </form>
          
        </div>
      </div>
    </div>
  );
}





// import { useState, useRef, useEffect } from "react";
// import { motion, useMotionValue, animate } from "framer-motion";

// export default function ContactSection() {
//   const [hovering, setHovering] = useState(false);
//   const [path, setPath] = useState(null);
//   const [email, setEmail] = useState("");
//   const pathRef = useRef(null);
//   const containerRef = useRef(null);
  
//   const buttonX = useMotionValue(0);
//   const buttonY = useMotionValue(0);
  
//   let reqId = null;
//   let progress = 0;
//   let time = Math.PI / 2;
  
//   useEffect(() => {
//     if (pathRef.current) {
//       setPath(pathRef.current);
//     }
//   }, []);
  
//   // Function to lerp (linear interpolation)
//   const lerp = (start, end, t) => {
//     return start * (1 - t) + end * t;
//   };

//   // Animation functions for SVG curve
//   const animateIn = () => {
//     // Cancel any existing animation
//     if (reqId) {
//       cancelAnimationFrame(reqId);
//       time = Math.PI / 2;
//     }
    
//     progress += 0.05;
//     if (progress > 30) progress = 30;
    
//     if (path) {
//       const width = containerRef.current.offsetWidth;
//       const controlPointY = progress * Math.sin(time);
//       const midX = width / 2;
      
//       path.setAttribute(
//         "d",
//         `M0,16 C${midX},${16 + controlPointY} ${midX},${16 + controlPointY} ${width},16`
//       );
//     }
    
//     reqId = requestAnimationFrame(animateIn);
//   };
  
//   const resetPosition = () => {
//     animate(buttonX, 0, {
//       duration: 0.6,
//       type: "spring",
//       stiffness: 200,
//       damping: 20,
//     });
//     animate(buttonY, 0, {
//       duration: 0.6,
//       type: "spring",
//       stiffness: 200,
//       damping: 20,
//     });
//   };
  
//   const resetAnimation = () => {
//     cancelAnimationFrame(reqId);
//     animateOut();
//   };
  
//   const animateOut = () => {
//     if (path) {
//       const width = containerRef.current.offsetWidth;
//       const midX = width / 2;
      
//       progress = lerp(progress, 0, 0.04);
//       time += 0.2;
      
//       const controlPointY = progress * Math.sin(time);
      
//       path.setAttribute(
//         "d",
//         `M0,16 C${midX},${16 + controlPointY} ${midX},${16 + controlPointY} ${width},16`
//       );
//     }
    
//     if (Math.abs(progress) > 0.5) {
//       reqId = requestAnimationFrame(animateOut);
//     } else {
//       // Reset animation values
//       time = Math.PI / 2;
//       progress = 0;
//       if (path) {
//         const width = containerRef.current.offsetWidth;
//         path.setAttribute("d", `M0,16 C${width/2},16 ${width/2},16 ${width},16`);
//       }
//     }
//   };
  
//   const handleMouseMove = (e) => {
//     if (!hovering || !containerRef.current) return;
    
//     const rect = containerRef.current.getBoundingClientRect();
//     const offsetX = e.clientX - rect.left - rect.width + 80;
//     const offsetY = e.clientY - rect.top - rect.height + 80;
    
//     buttonX.set(offsetX / 2);
//     buttonY.set(offsetY / 2);
    
//     // Update the curve based on mouse position
//     if (path) {
//       const width = containerRef.current.offsetWidth;
//       const relativeX = e.clientX - rect.left;
//       const relativePercent = relativeX / width;
      
//       const midX = width / 2;
//       const controlPointY = progress * Math.sin(time) + (e.clientY - rect.top - 16) * 0.1;
      
//       // Adjust the bezier curve control points based on mouse position
//       path.setAttribute(
//         "d",
//         `M0,16 C${midX - (0.5 - relativePercent) * 100},${16 + controlPointY} ${midX + (0.5 - relativePercent) * 100},${16 + controlPointY} ${width},16`
//       );
//     }
//   };
  
//   const handleSubmit = (e) => {
//     e.preventDefault();
//     // Handle form submission here
//     alert(`Thanks! We'll contact you at: ${email}`);
//     setEmail("");
//   };
  

  

//   return (
//     <div className="w-full bg-[#2D2C43] py-24 px-6 sm:px-8 md:px-16 lg:px-24">
//       <div className="max-w-6xl mx-auto">
//         {/* Top heading with gradient effect */}
//         <div className="text-center mb-16">
//           <h2 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-white to-purple-300 bg-clip-text text-transparent">
//             Let's Connect
//           </h2>
//           <p className="text-gray-300 mt-4 text-lg max-w-xl mx-auto">
//             Have a project in mind? Drop what you have in mind and I'll get back to you within 24 hours.
//           </p>
//         </div>
        
//         <div className="max-w-xl mx-auto relative">
//           {/* Decorative elements */}
//           <div className="absolute -top-14 -left-14 w-24 h-24 rounded-full bg-purple-500 opacity-10 blur-xl"></div>
//           <div className="absolute -bottom-10 -right-10 w-32 h-32 rounded-full bg-blue-500 opacity-10 blur-xl"></div>
          
//           <form onSubmit={handleSubmit}>
//             <div
//               ref={containerRef}
//               className="relative mb-12 h-40"
//               onMouseMove={handleMouseMove}
//               onMouseEnter={() => {
//                 setHovering(true);
//                 animateIn();
//               }}
//               onMouseLeave={() => {
//                 setHovering(false);
//                 resetPosition();
//                 resetAnimation();
//               }}
//             >
              
//               <div className="flex flex-col gap-6 pt-4">
//                 <div className="flex flex-col sm:flex-row gap-4">
//                   <input 
//                     type="text" 
//                     value={email}
//                     onChange={(e) => setEmail(e.target.value)}
//                     placeholder="What you got in mind ..."
//                     required
//                     className="flex-grow bg-[#3A3952] border border-purple-400 border-opacity-30 rounded-lg px-6 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all duration-300"
//                   />
                  
//                   <motion.button
//                     type="submit"
//                     style={{
//                       x: buttonX,
//                       y: buttonY
//                     }}
//                     whileHover={{ scale: 1.05 }}
//                     whileTap={{ scale: 0.98 }}
//                     className="bg-gradient-to-r from-purple-500 to-indigo-600 text-white px-8 py-3 rounded-lg font-medium shadow-lg hover:shadow-purple-500/20 transition-all duration-300"
//                   >
//                     Send
//                   </motion.button>
//                 </div>
                
//                 <div className="flex justify-center space-x-6 mt-2">
//                   {/* Social icons */}
//                   {['Twitter', 'LinkedIn', 'GitHub', 'Instagram'].map((platform) => (
//                     <motion.a
//                       key={platform}
//                       href="#"
//                       whileHover={{ y: -3 }}
//                       className="text-gray-400 hover:text-white transition-colors"
//                     >
//                       <span className="text-sm">{platform}</span>
//                     </motion.a>
//                   ))}
//                 </div>
//               </div>
//             </div>
//           </form>
          
//         </div>
//       </div>
//     </div>
//   );
// }