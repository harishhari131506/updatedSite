
// import { useEffect, useRef, useState } from 'react'
// import Lenis from '@studio-freight/lenis'
// import { useScroll, useTransform, motion } from 'framer-motion'

// import ProjectSection from "./project";
// import FooterMain from "./footerMain";
// const images = [
//   "1.jpg",
//   "2.jpg",
//   "3.jpg",
//   "4.jpg",
//   "5.jpg",
//   "6.jpg",
//   "7.jpg",
//   "8.jpg",
//   "9.jpg",
//   "10.jpg",
//   "11.jpg",
//   "12.jpg",
// ]

// const skillsData = [
//   {
//     category: "Frontend",
//     skills: ["React", "Next.js", "JavaScript", "TypeScript", "HTML/CSS", "Tailwind CSS"],
//     color: "#61DAFB"
//   },
//   {
//     category: "Backend",
//     skills: ["Node.js", "Express", "Python", "Django", "GraphQL", "REST APIs"],
//     color: "#68A063"
//   },
//   {
//     category: "Database",
//     skills: ["MongoDB", "PostgreSQL", "Firebase", "Redis", "MySQL"],
//     color: "#4DB33D"
//   },
//   {
//     category: "DevOps",
//     skills: ["Docker", "AWS", "CI/CD", "Git", "GitHub Actions"],
//     color: "#2496ED"
//   }
// ]

// export default function SkillsSection() {

//   const gallery = useRef(null);
//   const [dimension, setDimension] = useState({width:0, height:0});

//   const { scrollYProgress } = useScroll({
//     target: gallery,
//     offset: ['start end', 'end start']
//   })
//   const { height } = dimension;
//   const y = useTransform(scrollYProgress, [0, 1], [0, height * 2])
//   const y2 = useTransform(scrollYProgress, [0, 1], [0, height * 3.3])
//   const y3 = useTransform(scrollYProgress, [0, 1], [0, height * 1.25])
//   const y4 = useTransform(scrollYProgress, [0, 1], [0, height * 3])

//   useEffect( () => {
//     const lenis = new Lenis()

//     const raf = (time) => {
//       lenis.raf(time)
//       requestAnimationFrame(raf)
//     }

//     const resize = () => {
//       setDimension({width: window.innerWidth, height: window.innerHeight})
//     }

//     window.addEventListener("resize", resize)
//     requestAnimationFrame(raf);
//     resize();

//     return () => {
//       window.removeEventListener("resize", resize);
//     }
//   }, [])

//   return (
//     <main className="main">
//       <div className="spacer">
//         <ProjectSection/>
//       </div>
//       <div ref={gallery} className="gallery">
//         <Column images={[images[0], images[1], images[2]]} y={y}/>
//         <Column images={[images[3], images[4], images[5]]} y={y2}/>
//         <Column images={[images[6], images[7], images[8]]} y={y3}/>
//         <Column images={[images[9], images[10], images[11]]} y={y4}/>
//       </div>
//       <div className="spacer">
//         <FooterMain/>
//       </div>
//     </main>
//   )
// }

// const Column = ({images, y}) => {
//   return (
//     <motion.div 
//       className="column"
//       style={{y}}
//       >
//       {
//         images.map( (src, i) => {
//           return <div key={i} className="imageContainer">
//             <img 
//               src={`${src}`}
//               alt='image'
//               fill
//             />
//           </div>
//         })
//       }
//     </motion.div>
//   )

// }
// ======================================================================================================================================================

import { useEffect, useRef, useState } from 'react'
import Lenis from '@studio-freight/lenis'
import { useScroll, useTransform, motion } from 'framer-motion'

import ProjectSection from "./project";
import FooterMain from "./footerMain";

const skillsData = [
  {
    category: "Frontend",
    skills: ["React", "Next.js", "JavaScript", "TypeScript", "HTML/CSS", "Tailwind CSS"],
    color: "#61DAFB"
  },
  {
    category: "Backend",
    skills: ["Node.js", "Express", "Python", "Django", "GraphQL", "REST APIs"],
    color: "#68A063"
  },
  {
    category: "Database",
    skills: ["MongoDB", "PostgreSQL", "Firebase", "Redis", "MySQL"],
    color: "#4DB33D"
  },
  {
    category: "Tools",
    skills: ["VS Code", "Postman", "Jira", "Slack", "GitHub"],
    color: "#007ACC"
  },
  {
    category: "Design",
    skills: ["Figma", "Adobe XD", "UI/UX", "Responsive Design", "Wireframing"],
    color: "#FF7262"
  },
  {


    category: "DevOps",
    skills: ["Docker", "AWS", "CI/CD", "Git", "GitHub Actions"],
    color: "#2496ED"
  },
  {
    category: "Testing",
    skills: ["Jest", "React Testing Library", "Cypress", "Mocha", "Chai"],
    color: "#C21325"
  },
  {
    category: "Mobile",
    skills: ["React Native", "Flutter", "iOS", "Android", "Expo"],
    color: "#61DAFB"
  },
  {
    category: "Cloud",
    skills: ["AWS", "Azure", "Google Cloud", "Netlify", "Vercel"],
    color: "#FF9900"
  },
  {
    category: "Other",
    skills: ["Agile", "Scrum", "Problem Solving", "Team Collaboration", "Technical Writing"],
    color: "#6C63FF"
  },
  {
    category: "Architecture",
    skills: ["Microservices", "Serverless", "RESTful APIs", "MVC", "DDD"],
    color: "#3F51B5"
  },
  {
    category: "Performance",
    skills: ["Web Vitals", "Optimization", "Caching", "Lazy Loading", "Code Splitting"],
    color: "#4CAF50"
  }
]

export default function SkillsSection() {
  const gallery = useRef(null);
  const [dimension, setDimension] = useState({width:0, height:0});

  const { scrollYProgress } = useScroll({
    target: gallery,
    offset: ['start end', 'end start']
  })
  const { height } = dimension;
  const y = useTransform(scrollYProgress, [0, 1], [0, height * 2])
  const y2 = useTransform(scrollYProgress, [0, 1], [0, height * 3.3])
  const y3 = useTransform(scrollYProgress, [0, 1], [0, height * 1.25])
  const y4 = useTransform(scrollYProgress, [0, 1], [0, height * 3])

  useEffect( () => {
    const lenis = new Lenis()

    const raf = (time) => {
      lenis.raf(time)
      requestAnimationFrame(raf)
    }

    const resize = () => {
      setDimension({width: window.innerWidth, height: window.innerHeight})
    }

    window.addEventListener("resize", resize)
    requestAnimationFrame(raf);
    resize();

    return () => {
      window.removeEventListener("resize", resize);
    }
  }, [])

  return (
    <main className="main">
      <div className="spacer">
        <ProjectSection/>
      </div>
      <div className="relative py-24 bg-gray-900">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center text-white mb-16">My Skills</h2>
        </div>
        <div ref={gallery} className="gallery">
          <SkillColumn skills={[skillsData[0], skillsData[1], skillsData[2]]} y={y}/>
          <SkillColumn skills={[skillsData[3], skillsData[4], skillsData[5]]} y={y2}/>
          <SkillColumn skills={[skillsData[6], skillsData[7], skillsData[8]]} y={y3}/>
          <SkillColumn skills={[skillsData[9], skillsData[10], skillsData[11]]} y={y4}/>
        </div>
      </div>
      <div className="spacer">
        <FooterMain/>
      </div>
    </main>
  )
}

// const SkillColumn = ({skills, y}) => {
//   return (
//     <motion.div 
//       className="column"
//       style={{y}}
//     >
//       {skills.map((skillCategory, i) => {
//         return (
//           <div key={i} className="skill-container bg-gray-800 rounded-lg shadow-xl overflow-hidden">
//             <div 
//               className="p-6 border-b-2" 
//               style={{ borderColor: skillCategory.color }}
//             >
//               <h3 className="text-2xl font-bold mb-2 text-white">{skillCategory.category}</h3>
//               <div className="flex flex-wrap gap-2 mt-4">
//                 {skillCategory.skills.map((skill, j) => (
//                   <div key={j} className="skill-item">
//                     {/* <div className="icon-placeholder w-6 h-6 rounded-full bg-gray-700 mr-2"></div> */}
//                     <span className="text-gray-300">{skill}</span>
//                   </div>
//                 ))}
//               </div>
//             </div>
//           </div>
//         )
//       })}
//     </motion.div>
//   )
// }

const SkillColumn = ({skills, y, className}) => {
  return (
    <motion.div 
      className={`column ${className}`}
      style={{y}}
    >
      {skills.map((skillCategory, i) => {
        return (
          <div key={i} className="skill-container bg-gray-800 rounded-lg shadow-xl overflow-hidden mb-6 transition-all duration-300 hover:shadow-2xl hover:transform hover:scale-105">
            <div 
              className="p-6"
              style={{ borderLeft: `4px solid ${skillCategory.color}` }}
            >
              <h3 className="text-2xl font-bold mb-4 text-white flex items-center">
                <span className="w-3 h-3 rounded-full mr-3" style={{ backgroundColor: skillCategory.color }}></span>
                {skillCategory.category}
              </h3>
              <div className="flex flex-wrap gap-3 mt-4">
                {skillCategory.skills.map((skill, j) => (
                  <div 
                    key={j} 
                    className="skill-item bg-gray-700 px-3 py-1 rounded-full text-sm flex items-center transition-all duration-300 hover:bg-gray-600"
                  >
                    <span className="text-gray-200">{skill}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )
      })}
    </motion.div>
  )
}





// =====================================================================================================================================================


// import { useEffect, useRef, useState } from 'react'
// import Lenis from '@studio-freight/lenis'
// import { useScroll, useTransform, motion } from 'framer-motion'

// import ProjectSection from "./project";
// import FooterMain from "./footerMain";

// const skillsData = [
//   {
//     category: "Frontend",
//     skills: ["React", "Next.js", "JavaScript", "TypeScript", "HTML/CSS", "Tailwind CSS"],
//     color: "#61DAFB"
//   },
//   {
//     category: "Backend",
//     skills: ["Node.js", "Express", "Python", "Django", "GraphQL", "REST APIs"],
//     color: "#68A063"
//   },
//   {
//     category: "Database",
//     skills: ["MongoDB", "PostgreSQL", "Firebase", "Redis", "MySQL"],
//     color: "#4DB33D"
//   },
//   {
//     category: "DevOps",
//     skills: ["Docker", "AWS", "CI/CD", "Git", "GitHub Actions"],
//     color: "#2496ED"
//   },
//   {
//     category: "Design",
//     skills: ["Figma", "Adobe XD", "UI/UX", "Responsive Design", "Wireframing"],
//     color: "#FF7262"
//   },
//   {
//     category: "Tools",
//     skills: ["VS Code", "Postman", "Jira", "Slack", "GitHub"],
//     color: "#007ACC"
//   },
//   {
//     category: "Testing",
//     skills: ["Jest", "React Testing Library", "Cypress", "Mocha", "Chai"],
//     color: "#C21325"
//   },
//   {
//     category: "Mobile",
//     skills: ["React Native", "Flutter", "iOS", "Android", "Expo"],
//     color: "#61DAFB"
//   },
//   {
//     category: "Cloud",
//     skills: ["AWS", "Azure", "Google Cloud", "Netlify", "Vercel"],
//     color: "#FF9900"
//   },
//   {
//     category: "Other",
//     skills: ["Agile", "Scrum", "Problem Solving", "Team Collaboration", "Technical Writing"],
//     color: "#6C63FF"
//   },
//   {
//     category: "Architecture",
//     skills: ["Microservices", "Serverless", "RESTful APIs", "MVC", "DDD"],
//     color: "#3F51B5"
//   },
//   {
//     category: "Performance",
//     skills: ["Web Vitals", "Optimization", "Caching", "Lazy Loading", "Code Splitting"],
//     color: "#4CAF50"
//   }
// ]

// export default function SkillsSection() {
//   const sectionRef = useRef(null);
//   const gallery = useRef(null);
//   const [dimension, setDimension] = useState({width:0, height:0});

//   const { scrollYProgress } = useScroll({
//     target: gallery,
//     offset: ['start end', 'end start'],
//     smooth: true
//   })
//   const { height } = dimension;
  
//   // Minimal motion values to ensure all skills are visible when scrolling
//   const y = useTransform(scrollYProgress, [0, 1], [0, height * 0.15])
//   const y2 = useTransform(scrollYProgress, [0, 1], [0, height * 0.1])
//   const y3 = useTransform(scrollYProgress, [0, 1], [0, height * 0.2])
//   const y4 = useTransform(scrollYProgress, [0, 1], [0, height * 0.12])

//   useEffect( () => {
//     const lenis = new Lenis()

//     const raf = (time) => {
//       lenis.raf(time)
//       requestAnimationFrame(raf)
//     }

//     const resize = () => {
//       setDimension({width: window.innerWidth, height: window.innerHeight})
//     }

//     window.addEventListener("resize", resize)
//     requestAnimationFrame(raf);
//     resize();

//     return () => {
//       window.removeEventListener("resize", resize);
//     }
//   }, [])

//   return (
//     <main className="main">
//       <div className="spacer">
//         <ProjectSection/>
//       </div>
//       <div className="relative py-24 bg-gray-900 overflow-hidden">
//         <div className="container mx-auto px-4">
//           <h2 className="text-4xl font-bold text-center text-white mb-16">My Skills</h2>
//         </div>
//         <div ref={gallery} className="gallery flex flex-wrap justify-center gap-6 px-4 max-w-7xl mx-auto">
//           <SkillColumn skills={[skillsData[0], skillsData[1], skillsData[2]]} y={y} className="w-full md:w-1/2 lg:w-1/4"/>
//           <SkillColumn skills={[skillsData[3], skillsData[4], skillsData[5]]} y={y2} className="w-full md:w-1/2 lg:w-1/4"/>
//           <SkillColumn skills={[skillsData[6], skillsData[7], skillsData[8]]} y={y3} className="w-full md:w-1/2 lg:w-1/4"/>
//           <SkillColumn skills={[skillsData[9], skillsData[10], skillsData[11]]} y={y4} className="w-full md:w-1/2 lg:w-1/4"/>
//         </div>
//       </div>
//       <div className="spacer">
//         <FooterMain/>
//       </div>
//     </main>
//   )
// }

// const SkillColumn = ({skills, y, className}) => {
//   return (
//     <motion.div 
//       className={`column ${className}`}
//       style={{y}}
//     >
//       {skills.map((skillCategory, i) => {
//         return (
//           <div key={i} className="skill-container bg-gray-800 rounded-lg shadow-xl overflow-hidden mb-6 transition-all duration-300 hover:shadow-2xl hover:transform hover:scale-105">
//             <div 
//               className="p-6"
//               style={{ borderLeft: `4px solid ${skillCategory.color}` }}
//             >
//               <h3 className="text-2xl font-bold mb-4 text-white flex items-center">
//                 <span className="w-3 h-3 rounded-full mr-3" style={{ backgroundColor: skillCategory.color }}></span>
//                 {skillCategory.category}
//               </h3>
//               <div className="flex flex-wrap gap-3 mt-4">
//                 {skillCategory.skills.map((skill, j) => (
//                   <div 
//                     key={j} 
//                     className="skill-item bg-gray-700 px-3 py-1 rounded-full text-sm flex items-center transition-all duration-300 hover:bg-gray-600"
//                   >
//                     <span className="text-gray-200">{skill}</span>
//                   </div>
//                 ))}
//               </div>
//             </div>
//           </div>
//         )
//       })}
//     </motion.div>
//   )
// }


// version 1
