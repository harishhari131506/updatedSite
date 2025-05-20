import { useState } from "react";
import Modal from "./modal";
import ProjectAc from "./acproject";

const projects = [
  {
    title: "EventDesk",
    src: "a.svg",
    color: "#000000",
    link: "https://eventdesk.io",
    field:"Devops & Full stack"
  },
  {
    title: "Skillflo",
    src: "image.png",
    color: "#8C8C8C",
    link: "https://skillflo.com",
    field:"Devops & Full stack"

  },
  {
    title: "Stylized Bidding Platform",
    src: "bid.png",
    color: "#EFE8D3",
    link: "https://imaginai.pythonanywhere.com/",
    field:"Devops & Full stack"
  },
  {
    title: "AI Nutrition Analyzer",
    src: "nutri.png",
    color: "#706D63",
    link: "https://github.com/harishhari131506/Ai-Powered-Nutrition-fitness-analyzer",
    field:"Devops & Full stack"

  }
];


export default function ProjectSection() {
  const [modal, setModal] = useState({ active: false, index: 0 });

  return (
    <main className="w-full h-screen bg-black flex justify-center">
      <div className="w-full md:w-4/5 mx-auto">
        {projects.map((project, index) => {
          return <ProjectAc projects={projects} index={index} title={project.title} setModal={setModal} key={index} />;
        })}
      </div>
      <Modal modal={modal} projects={projects} />
    </main>
  );
}
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