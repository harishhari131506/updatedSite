import { useState, useEffect , useRef } from "react";
import "../css/glow.css"; // Ensure this path matches where your CSS is

export default function ProjectSection() {
  // State to track mouse position for parallax effect
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  
  // Project data including image URLs
  const projects = [
    {
      title: "EventDesk",
      description: "EventDesk is an Angular-based event management platform offering secure authentication, role-based access, vendor-host collaboration, and intuitive UI for organizing, tracking, and managing events efficiently across different user roles.",
      gradientFrom: "from-emerald-400",
      gradientTo: "to-blue-600",
      glowColor: "rgba(52, 211, 153, 0.5)", 
      bgColor: "rgba(0, 255, 117, 0.15)",
      image: "/api/placeholder/800/600"
    },
    {
      title: "Skillflo",
      description: "SkillFlo is a multi-tenant eLearning platform where users can create HTML content, videos, imported HTML, and assessments to build comprehensive courses. Each module can also be fully generated using AI. The platform includes advanced features like RAG (Retrieval-Augmented Generation), semantic search, ChromaDB integration, a pricing engine, and a billing portal.",
      gradientFrom: "from-pink-500",
      gradientTo: "to-yellow-500",
      glowColor: "rgba(236, 72, 153, 0.5)",  // Pink glow
      bgColor: "rgba(244, 114, 182, 0.15)",
      image: "/api/placeholder/800/600"
    },
    {
      title: "AI Bidding Platform",
      description: "Collaborative Bidding platform for art designers & buyers and sellers",
      gradientFrom: "from-purple-600",
      gradientTo: "to-blue-400",
      glowColor: "rgba(147, 51, 234, 0.5)",  // Purple glow
      bgColor: "rgba(147, 51, 234, 0.15)",
      image: "/api/placeholder/800/600"
    }
  ];

  // Update mouse position for parallax effect
  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({
        x: e.clientX,
        y: e.clientY
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

   const [displayText, setDisplayText] = useState("Projects");
  const indexRef = useRef(0);

  useEffect(() => {
    const interval = setInterval(() => {
      const letters = "Projects".split("");
      if (letters[indexRef.current] === " ") {
        indexRef.current = (indexRef.current + 1) % letters.length;
      }
      letters[indexRef.current] = `<span style="color: var(--glowColor); text-shadow: var(--shadowColor);">${letters[indexRef.current]}</span>`;
      setDisplayText(letters.join(""));
      indexRef.current = (indexRef.current + 1) % letters.length;
    }, 500);

    return () => clearInterval(interval);
  }, []);


  return (
    <main id="projects" className="w-full min-h-screen bg-black flex justify-center items-center py-16 px-4 overflow-hidden ">
      <div className="w-full max-w-7xl mx-auto">
         <h2
      className="glowing-text mb-12 md:mb-16 text-center "
      dangerouslySetInnerHTML={{ __html: displayText }}
    /> 
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10">
          {projects.map((project, index) => (
            <div 
              key={index}
              className="project-card relative w-full h-96 md:h-[450px] overflow-hidden cursor-pointer"
              data-index={index}
            >
              <div 
                className={`outer w-full h-full rounded-2xl ${project.gradientFrom} ${project.gradientTo} bg-gradient-to-br p-1 transition-all duration-300 group`}
                style={{
                  boxShadow: `0 0 0 1px transparent`, // Default state
                }}
              >
                <div 
                  className="inner w-full h-full bg-gray-900 rounded-2xl p-6 flex flex-col justify-between transition-all duration-300 group-hover:scale-[0.98] relative overflow-hidden"
                >
                  {/* Background image with parallax effect */}
                  <div 
                    className="absolute inset-0 opacity-30 bg-cover bg-center transition-transform duration-200 ease-out z-0"
                    style={{
                      backgroundImage: `url(${project.image})`,
                      transform: `translateX(${(mousePosition.x / window.innerWidth - 0.5) * -10}px) translateY(${(mousePosition.y / window.innerHeight - 0.5) * -10}px)`,
                      backgroundSize: '110% 110%',
                      backgroundPosition: 'center',
                    }}
                  />
                  
                  <div className="relative z-10">
                    <h3 className="text-2xl md:text-3xl font-bold text-white mb-2">{project.title}</h3>
                    <p className="text-gray-300 text-sm md:text-base">{project.description}</p>
                  </div>
                  
                  <div className="corner-effects">
                    <div className={`corner-tr absolute top-0 right-0 w-0 h-0 ${project.gradientFrom.replace('from-', 'bg-')}/80 rounded-tr-2xl transition-all duration-500 group-hover:w-full group-hover:h-full group-hover:rounded-2xl group-hover:opacity-10`}></div>
                    <div className={`corner-bl absolute bottom-0 left-0 w-0 h-0 ${project.gradientTo.replace('to-', 'bg-')}/80 rounded-bl-2xl transition-all duration-500 group-hover:w-full group-hover:h-full group-hover:rounded-2xl group-hover:opacity-10`}></div>
                  </div>
                  
                  <div className="tech-stack my-4 relative z-10">
                    <div className="flex flex-wrap gap-2">
                      <span className="px-2 py-1 bg-gray-800 text-xs rounded-md text-white/70">React</span>
                      <span className="px-2 py-1 bg-gray-800 text-xs rounded-md text-white/70">TypeScript</span>
                      <span className="px-2 py-1 bg-gray-800 text-xs rounded-md text-white/70">Tailwind</span>
                    </div>
                  </div>
                  
                  {/* <div className="project-links flex gap-4 relative z-10">
                    <a href="#" className="text-white/70 hover:text-white transition-colors flex items-center gap-2">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                      </svg>
                      <span className="text-sm">Live Demo</span>
                    </a>
                    <a href="#" className="text-white/70 hover:text-white transition-colors flex items-center gap-2">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                      </svg>
                      <span className="text-sm">Source Code</span>
                    </a>
                  </div> */}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      <style jsx>{`
        .project-card .outer {
          position: relative;
          overflow: hidden;
          transition: all 0.3s ease;
        }
        
        .project-card:hover .outer {
          transform: translateY(-5px);
        }
        
        /* Custom outer glow effects based on gradient colors */
        .project-card[data-index="0"]:hover .outer {
          box-shadow: 0 10px 25px -5px rgba(52, 211, 153, 0.4), 0 0 10px rgba(52, 211, 153, 0.3);
        }
        
        .project-card[data-index="1"]:hover .outer {
          box-shadow: 0 10px 25px -5px rgba(236, 72, 153, 0.4), 0 0 10px rgba(236, 72, 153, 0.3);
        }
        
        .project-card[data-index="2"]:hover .outer {
          box-shadow: 0 10px 25px -5px rgba(147, 51, 234, 0.4), 0 0 10px rgba(147, 51, 234, 0.3);
        }
        
        /* Custom hover effects for each card */
        .project-card:nth-child(1):hover .inner::before {
          content: "View Project";
          position: absolute;
          display: flex;
          align-items: center;
          justify-content: center;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background-color: ${projects[0].bgColor};
          color: white;
          font-weight: bold;
          font-size: 1.25rem;
          border-radius: 1rem;
          opacity: 0;
          transition: opacity 0.5s;
          animation: fadeIn 0.5s forwards;
          backdrop-filter: blur(2px);
          z-index: 20;
        }
        
        .project-card:nth-child(2):hover .inner::before {
          content: "View Project";
          position: absolute;
          display: flex;
          align-items: center;
          justify-content: center;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background-color: ${projects[1].bgColor};
          color: white;
          font-weight: bold;
          font-size: 1.25rem;
          border-radius: 1rem;
          opacity: 0;
          transition: opacity 0.5s;
          animation: fadeIn 0.5s forwards;
          backdrop-filter: blur(2px);
          z-index: 20;
        }
        
        .project-card:nth-child(3):hover .inner::before {
          content: "View Project";
          position: absolute;
          display: flex;
          align-items: center;
          justify-content: center;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background-color: ${projects[2].bgColor};
          color: white;
          font-weight: bold;
          font-size: 1.25rem;
          border-radius: 1rem;
          opacity: 0;
          transition: opacity 0.5s;
          animation: fadeIn 0.5s forwards;
          backdrop-filter: blur(2px);
          z-index: 20;
        }
        
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        
        /* Add parallax floating effect */
        @media (min-width: 768px) {
          .project-card:hover {
            animation: float 3s ease-in-out infinite;
          }
          
          @keyframes float {
            0% { transform: translateY(0px); }
            50% { transform: translateY(-10px); }
            100% { transform: translateY(0px); }
          }
        }
      `}</style>
    </main>
  );
}



// VERSION 0

// import { useState } from "react";


// export default function ProjectSection() {

//   return (
// <main id="projects" className="w-full min-h-screen bg-black flex justify-center items-center py-16">
//   <div className="w-full md:w-4/5 mx-auto">
//     <h2 className="text-4xl font-bold text-white mb-12 text-center">My Projects</h2>
    
//     <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
//       {/* Project Card 1 - EventDesk */}
//       <div className="project-card relative w-64 h-80 mx-auto">
//         <div className="outer w-full h-full rounded-2xl bg-gradient-to-br from-emerald-400 to-blue-600 p-1 transition-all duration-300 hover:shadow-lg hover:shadow-emerald-400/30 group">
//           <div className="inner w-full h-full bg-gray-900 rounded-2xl p-6 flex flex-col justify-between transition-all duration-300 group-hover:scale-[0.98]">
//             <div className="relative z-10">
//               <h3 className="text-2xl font-bold text-white mb-2">EventDesk</h3>
//               <p className="text-gray-300 text-sm">Event management platform with ticketing and analytics</p>
//             </div>
            
//             <div className="corner-effects">
//               <div className="corner-tr absolute top-0 right-0 w-0 h-0 bg-emerald-400/80 rounded-tr-2xl transition-all duration-500 group-hover:w-full group-hover:h-full group-hover:rounded-2xl group-hover:opacity-10"></div>
//               <div className="corner-bl absolute bottom-0 left-0 w-0 h-0 bg-blue-600/80 rounded-bl-2xl transition-all duration-500 group-hover:w-full group-hover:h-full group-hover:rounded-2xl group-hover:opacity-10"></div>
//             </div>
            
//             <div className="project-links flex gap-4 relative z-10">
//               <a href="#" className="text-white/70 hover:text-white transition-colors">
//                 <span className="sr-only">View Project</span>
//                 <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
//                 </svg>
//               </a>
//               <a href="#" className="text-white/70 hover:text-white transition-colors">
//                 <span className="sr-only">View Code</span>
//                 <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
//                 </svg>
//               </a>
//             </div>
//           </div>
//         </div>
//       </div>
      
//       {/* Project Card 2 */}
//       <div className="project-card relative w-64 h-80 mx-auto">
//         <div className="outer w-full h-full rounded-2xl bg-gradient-to-br from-pink-500 to-yellow-500 p-1 transition-all duration-300 hover:shadow-lg hover:shadow-pink-500/30 group">
//           <div className="inner w-full h-full bg-gray-900 rounded-2xl p-6 flex flex-col justify-between transition-all duration-300 group-hover:scale-[0.98]">
//             <div className="relative z-10">
//               <h3 className="text-2xl font-bold text-white mb-2">PixelCraft</h3>
//               <p className="text-gray-300 text-sm">Creative image editing tool with AI enhancements</p>
//             </div>
            
//             <div className="corner-effects">
//               <div className="corner-tr absolute top-0 right-0 w-0 h-0 bg-pink-500/80 rounded-tr-2xl transition-all duration-500 group-hover:w-full group-hover:h-full group-hover:rounded-2xl group-hover:opacity-10"></div>
//               <div className="corner-bl absolute bottom-0 left-0 w-0 h-0 bg-yellow-500/80 rounded-bl-2xl transition-all duration-500 group-hover:w-full group-hover:h-full group-hover:rounded-2xl group-hover:opacity-10"></div>
//             </div>
            
//             <div className="project-links flex gap-4 relative z-10">
//               <a href="#" className="text-white/70 hover:text-white transition-colors">
//                 <span className="sr-only">View Project</span>
//                 <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
//                 </svg>
//               </a>
//               <a href="#" className="text-white/70 hover:text-white transition-colors">
//                 <span className="sr-only">View Code</span>
//                 <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
//                 </svg>
//               </a>
//             </div>
//           </div>
//         </div>
//       </div>
      
//       {/* Project Card 3 */}
//       <div className="project-card relative w-64 h-80 mx-auto">
//         <div className="outer w-full h-full rounded-2xl bg-gradient-to-br from-purple-600 to-blue-400 p-1 transition-all duration-300 hover:shadow-lg hover:shadow-purple-600/30 group">
//           <div className="inner w-full h-full bg-gray-900 rounded-2xl p-6 flex flex-col justify-between transition-all duration-300 group-hover:scale-[0.98]">
//             <div className="relative z-10">
//               <h3 className="text-2xl font-bold text-white mb-2">DevConnect</h3>
//               <p className="text-gray-300 text-sm">Collaborative platform for developers and designers</p>
//             </div>
            
//             <div className="corner-effects">
//               <div className="corner-tr absolute top-0 right-0 w-0 h-0 bg-purple-600/80 rounded-tr-2xl transition-all duration-500 group-hover:w-full group-hover:h-full group-hover:rounded-2xl group-hover:opacity-10"></div>
//               <div className="corner-bl absolute bottom-0 left-0 w-0 h-0 bg-blue-400/80 rounded-bl-2xl transition-all duration-500 group-hover:w-full group-hover:h-full group-hover:rounded-2xl group-hover:opacity-10"></div>
//             </div>
            
//             <div className="project-links flex gap-4 relative z-10">
//               <a href="#" className="text-white/70 hover:text-white transition-colors">
//                 <span className="sr-only">View Project</span>
//                 <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
//                 </svg>
//               </a>
//               <a href="#" className="text-white/70 hover:text-white transition-colors">
//                 <span className="sr-only">View Code</span>
//                 <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
//                 </svg>
//               </a>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
    
//     <style jsx>{`
//       .project-card .outer {
//         position: relative;
//         overflow: hidden;
//       }
      
//       .project-card:hover .outer {
//         transform: translateY(-5px);
//       }
      
//       /* Add additional hover effect similar to the card example you provided */
//       .project-card:nth-child(1):hover .inner::before {
//         content: "View Project";
//         position: absolute;
//         display: flex;
//         align-items: center;
//         justify-content: center;
//         top: 0;
//         left: 0;
//         width: 100%;
//         height: 100%;
//         background-color: rgba(0, 255, 117, 0.15);
//         color: white;
//         font-weight: bold;
//         font-size: 1.25rem;
//         border-radius: 1rem;
//         opacity: 0;
//         transition: opacity 0.5s;
//         animation: fadeIn 0.5s forwards;
//         backdrop-filter: blur(2px);
//       }
      
//       .project-card:nth-child(2):hover .inner::before {
//         content: "View Project";
//         position: absolute;
//         display: flex;
//         align-items: center;
//         justify-content: center;
//         top: 0;
//         left: 0;
//         width: 100%;
//         height: 100%;
//         background-color: rgba(244, 114, 182, 0.15);
//         color: white;
//         font-weight: bold;
//         font-size: 1.25rem;
//         border-radius: 1rem;
//         opacity: 0;
//         transition: opacity 0.5s;
//         animation: fadeIn 0.5s forwards;
//         backdrop-filter: blur(2px);
//       }
      
//       .project-card:nth-child(3):hover .inner::before {
//         content: "View Project";
//         position: absolute;
//         display: flex;
//         align-items: center;
//         justify-content: center;
//         top: 0;
//         left: 0;
//         width: 100%;
//         height: 100%;
//         background-color: rgba(147, 51, 234, 0.15);
//         color: white;
//         font-weight: bold;
//         font-size: 1.25rem;
//         border-radius: 1rem;
//         opacity: 0;
//         transition: opacity 0.5s;
//         animation: fadeIn 0.5s forwards;
//         backdrop-filter: blur(2px);
//       }
      
//       @keyframes fadeIn {
//         from { opacity: 0; }
//         to { opacity: 1; }
//       }
//     `}</style>
//   </div>
// </main>
//   );
// }


// =====================================================================================


// VERSION 1 
// import { useState } from "react";
// import Modal from "./modal";
// import ProjectAc from "./acproject";

// const projects = [
//   {
//     title: "EventDesk",
//     src: "a.svg",
//     color: "#000000"
//   },
//   {
//     title: "Skillflo",
//     src: "image.png",
//     color: "#8C8C8C"
//   },
//   {
//     title: "Stylized Bidding Platform",
//     src: "image.png",
//     color: "#EFE8D3"
//   },
//   {
//     title: "AI Nutrition Analyzer",
//     src: "image.png",
//     color: "#706D63"
//   }
// ];

// export default function ProjectSection() {
//   const [modal, setModal] = useState({ active: false, index: 0 });

//   return (
//     <main id="projects" className="w-full h-screen bg-black flex justify-center">
//       <div className="w-full md:w-4/5 mx-auto">

// <div class="w-[190px] h-[254px] rounded-[20px] bg-gradient-to-br from-[#00ff75] to-[#3700ff] transition-all duration-300 hover:shadow-[0_0_30px_1px_rgba(0,255,117,0.3)]">
//   <div class="w-full h-full bg-[#1a1a1a] rounded-[20px] transition-all duration-200 hover:scale-[0.98]">
//   </div>
// </div>
// {/* https://uiverse.io/eslam-hany/nasty-zebra-54 */}
//         {/* {projects.map((project, index) => {
//           return <ProjectAc index={index} title={project.title} setModal={setModal} key={index} />;
//         })} */}
//       </div>
//       {/* <Modal modal={modal} projects={projects} /> */}
//     </main>
//   );
// }


// VERSION 2
// import { useEffect, useRef, useState } from "react";
// import { motion } from "framer-motion";

// const BezierCurveAnimation = ({ index }) => {
//   const path = useRef(null);
//   const [isAnimating, setIsAnimating] = useState(false);
//   let progress = 0;
//   let x = 0.5;
//   let reqId = null;
//   let time = Math.PI / 2;

//   useEffect(() => {
//     // Initial path setup
//     setPath(progress);
    
//     // Resize handler
//     const handleResize = () => {
//       setPath(progress);
//     };
    
//     window.addEventListener('resize', handleResize);
//     return () => {
//       window.removeEventListener('resize', handleResize);
//       // Clean up any animations
//       if (reqId) {
//         cancelAnimationFrame(reqId);
//       }
//     };
//   }, []);

//   const setPath = (value) => {
//     if (!path.current) return;
    
//     const width = path.current.parentElement.getBoundingClientRect().width;
//     path.current.setAttributeNS(
//       null, 
//       "d", 
//       `M 0 50 Q ${width * x} ${50 + value} ${width} 50`
//     );
//   };

//   const animateIn = () => {
//     // If animationOut is running, cancel it and reset time
//     if (reqId) {
//       cancelAnimationFrame(reqId);
//       time = Math.PI / 2;
//     }
    
//     setIsAnimating(true);
//     setPath(progress);
//     reqId = requestAnimationFrame(animateIn);
//   };

//   const manageMouseMove = (e) => {
//     const { movementY } = e;
//     const box = e.target.getBoundingClientRect();
//     x = (e.clientX - box.left) / box.width;
//     progress += movementY;
//   };

//   const resetAnimation = () => {
//     cancelAnimationFrame(reqId);
//     animateOut();
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
//       // If the slope is almost flat, we stop the animation
//       time = Math.PI / 2;
//       progress = 0;
//       setIsAnimating(false);
//     }
//   };

//   // Only show the curve for projects after the first one
//   if (index === 0) return null;

//   return (
//     <div className="absolute top-0 left-0 right-0 h-1 w-full">
//       <span 
//         onMouseEnter={() => animateIn()} 
//         onMouseLeave={() => resetAnimation()} 
//         onMouseMove={(e) => manageMouseMove(e)} 
//         className="h-10 w-full absolute top-[-5px] z-10 cursor-pointer"
//       ></span>
//       <svg className="absolute h-[100px] w-full top-[-50px]">
//         <path ref={path} strokeWidth="1" stroke="white" fill="none"></path>
//       </svg>
//     </div>
//   );
// };

// export default function ProjectSection() {
//   const [activeProject, setActiveProject] = useState(0);
//   const projectRefs = useRef([]);
//   const sectionRef = useRef(null);
//   const imageVariants = {
//     hidden: { x: -120, opacity: 0, scale: 0.95 },
//     visible: {
//       x: 0,
//       opacity: 1,
//       scale: 1.05,
//       transition: {
//         type: "tween",
//         ease: [0.33, 1, 0.68, 1], // Fast-out, slow-in (sharp)
//         duration: 1.2,
//         delay: 0.15,
//       },
//     },
//     rest: {
//       scale: 1,
//       transition: { duration: 0.2 },
//     },
//     hover: {
//       scale: 1.07,
//       transition: { duration: 0.3, ease: "easeOut" },
//     },
//   };

//   const projects = [
//     {
//       number: "01",
//       title: "EventDesk",
//       description:
//         "EventDesk is designed to simplify event planning and management. This platform enables vendors, admins, and users to collaboratively manage events, track progress, and handle requirements efficiently.",
//       technologies: [
//         "Angular",
//         "Node.js",
//         "Keycloak",
//         "Stripe",
//         "Dokploy",
//         "Grafana",
//         "Docker",
//       ],
//       sizestage: "UserBase",
//       details: "100-10k      SEED TO GROWTH",
//       image: "a.svg",
//     },
//     {
//       number: "02",
//       title: "Auction Web App + Neural Style Transfer",
//       description:
//         "A cutting-edge auction-based web platform for buying, selling, and creating digital art with TensorFlow-powered neural style transfer.",
//       technologies: ["HTML", "CSS", "Python"],
//       sizestage: "Year",
//       details: "2023",
//       image: "image.png",
//     },
//     {
//       number: "03",
//       title: "AI Nutrition Analyzer",
//       description:
//         "A web app using a CNN to analyze fruit images and identify their nutritional content, providing an innovative approach to dietary assessment.",
//       technologies: ["Python", "TensorFlow", "Flask"],
//       sizestage: "Year",
//       details: "2022",
//       image: "a.svg",
//     },
//   ];

//   useEffect(() => {
//     const handleScroll = () => {
//       if (!sectionRef.current) return;

//       const scrollPosition = window.scrollY + window.innerHeight * 0.5;

//       projectRefs.current.forEach((ref, index) => {
//         if (!ref) return;

//         const rect = ref.getBoundingClientRect();
//         const elementTop = rect.top + window.scrollY;
//         const elementBottom = elementTop + rect.height;

//         if (scrollPosition >= elementTop && scrollPosition <= elementBottom) {
//           setActiveProject(index);
//         }
//       });
//     };

//     window.addEventListener("scroll", handleScroll);
//     return () => window.removeEventListener("scroll", handleScroll);
//   }, []);

//   useEffect(() => {
//     projectRefs.current = projectRefs.current.slice(0, projects.length);
//   }, [projects.length]);

//   return (
//     <div ref={sectionRef} className="bg-black text-white min-h-screen w-full">
//       {projects.map((project, index) => (
//         <div
//           key={index}
//           ref={(el) => (projectRefs.current[index] = el)}
//           className="min-h-screen flex flex-col md:flex-row relative"
//         >
//           {/* SVG Bezier Curve instead of horizontal divider line */}
//           <BezierCurveAnimation index={index} />

//           {/* First column - Number and Title */}
//           <div className="w-full md:w-1/4 p-6 md:p-12 flex flex-col justify-center">
//             <div className="mb-6">
//               <span className="text-3xl md:text-6xl font-light text-zinc-400">
//                 {project.number}
//               </span>
//               <h2 className="text-3xl md:text-5xl font-medium mt-2">
//                 {project.title}
//               </h2>
//             </div>
//           </div>

//           {/* Second column - Project Details */}
//           <div className="w-full md:w-1/3 p-6 md:p-12 flex flex-col justify-center">
//             <div className="mb-8">
//               <p className="text-base md:text-lg text-cream-700">
//                 {project.description}
//               </p>
//             </div>

//             <div className="space-y-3 mb-6">
//               <p className="text-sm text-zinc-500">{project.sizestage}</p>
//               <p className="text-base font-light">{project.details}</p>
//             </div>

//             <div className="flex flex-wrap gap-3 my-6">
//               {project.technologies.map((tech, techIndex) => (
//                 <span
//                   key={techIndex}
//                   className="bg-black px-3 py-1 text-xs rounded-full"
//                 >
//                   {tech}
//                 </span>
//               ))}
//             </div>
//             <button className="group mt-8 border border-zinc-700 text-cream-800 py-3 px-6 rounded-full inline-flex items-center w-fit hover:bg-zinc-800 hover:text-white transition-colors duration-300">
//               <span className="relative inline-block overflow-hidden">
//                 <span className="block transform group-hover:scale-105 transition-transform duration-500 origin-left relative z-10">
//                   {project.title}
//                 </span>
//                 <span className="absolute left-[-75%] top-0 h-full w-[50%] bg-white/20 rotate-12 z-0 blur-lg group-hover:left-[125%] transition-all duration-1000 ease-in-out pointer-events-none"></span>
//               </span>

//               <svg
//                 xmlns="http://www.w3.org/2000/svg"
//                 className="h-4 w-4 ml-2"
//                 fill="none"
//                 viewBox="0 0 24 24"
//                 stroke="currentColor"
//               >
//                 <path
//                   strokeLinecap="round"
//                   strokeLinejoin="round"
//                   strokeWidth={2}
//                   d="M14 5l7 7m0 0l-7 7m7-7H3"
//                 />
//               </svg>
//             </button>
//           </div>

//           {/* Third column - Image */}
//           <div className="w-full md:w-5/12 flex items-center justify-center p-6">
//             <motion.div
//               variants={imageVariants}
//               initial="hidden"
//               whileInView="visible"
//               whileHover="hover"
//               animate="rest"
//               viewport={{ once: true, amount: 0.6 }}
//               className="w-full max-w-sm aspect-square overflow-hidden rounded-2xl shadow-lg"
//             >
//               <img
//                 src={project.image}
//                 alt="Project Image"
//                 className="w-full h-full object-cover"
//               />
//             </motion.div>
//           </div>
//         </div>
//       ))}
//     </div>
//   );
// }