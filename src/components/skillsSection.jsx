import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';

// Icons for technologies
import { 
  Code, Server, Database, Cloud, Layout, CheckCircle, 
  Coffee, Monitor, Cpu, GitBranch, Sun, Moon 
} from 'lucide-react';

const SkillsSection = () => {
  const [activeTab, setActiveTab] = useState('frontend');
  const [isDarkMode, setIsDarkMode] = useState(true);
  const sectionRef = useRef(null);
  const orbitRef = useRef(null);
  
  const skillCategories = {
    frontend: [
      'JavaScript', 'TypeScript', 'React', 'Angular', 'Next.js', 'Three.js'
    ],
    backend: [
      'Node.js', 'Express', 'Python', 'Flask', 'SQL'
    ],
    devops: [
      'AWS', 'Docker', 'Docker Swarm', 'GitHub Actions', 'Grafana', 'Prometheus'
    ],
    tools: [
      'Keycloak', 'Traefik', 'Dokploy', 'Figma', 'PostHog'
    ]
  };

  const experiences = [
    {
      title: "E-Learning Platform",
      company: "Sify Technologies",
      description: "Built a multi-tenant platform with AI features using MEAN stack",
      technologies: ["Angular", "Node.js", "MongoDB", "AWS Lambda", "AI Integration"],
      achievements: [
        "Integrated semantic search and AI-driven Q&A",
        "Designed automated video annotation pipeline",
        "Architected scalable backend for high-concurrency"
      ],
      color: "#3182CE" // blue-600
    },
    {
      title: "Adobe Extension",
      company: "Sify Technologies",
      description: "Custom extension for Times of India that syncs with GCP-hosted asset management",
      technologies: ["Adobe API", "GCP", "JavaScript"],
      achievements: [
        "Streamlined editorial workflows",
        "Enabled instant access to 12M+ assets",
        "Simplified image tagging and insertion"
      ],
      color: "#805AD5" // purple-600
    },
    {
      title: "EventDesk",
      company: "Personal Project",
      description: "Full-stack event management platform",
      technologies: ["Angular", "PostgreSQL", "Node.js", "Keycloak", "Docker Swarm"],
      achievements: [
        "Implemented role-based access control",
        "Built analytics with PostHog",
        "Created CI/CD pipeline with zero-downtime deployments"
      ],
      color: "#DD6B20" // orange-600
    },
    {
      title: "Auction Web App",
      company: "Personal Project",
      description: "Platform for buying, selling and creating digital art",
      technologies: ["HTML", "CSS", "Python", "TensorFlow", "SQL"],
      achievements: [
        "Integrated neural style transfer",
        "Developed intuitive bidding system",
        "Created comprehensive marketplace for digital art"
      ],
      color: "#38A169" // green-600
    }
  ];

  const getIcon = (category) => {
    switch(category) {
      case 'frontend': return <Layout className="w-6 h-6" />;
      case 'backend': return <Server className="w-6 h-6" />;
      case 'devops': return <Cloud className="w-6 h-6" />;
      case 'tools': return <Code className="w-6 h-6" />;
      default: return <Database className="w-6 h-6" />;
    }
  };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        staggerChildren: 0.1,
        delayChildren: 0.3
      }
    }
  };
  
  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1,
      transition: { type: "spring", stiffness: 100 }
    }
  };

  // Update orbit animation on component mount
  useEffect(() => {
    const orbitElements = document.querySelectorAll('.orbit-item');
    
    orbitElements.forEach((el, index) => {
      const angle = (index * 2 * Math.PI) / orbitElements.length;
      const delay = index * 0.1;
      
      el.style.animationDelay = `${delay}s`;
    });
  }, [activeTab]);

  return (
    <div className="bg-black text-white min-h-screen py-16 px-4 md:px-8 overflow-hidden" ref={sectionRef}>
      {/* Theme Toggle Button */}
      <motion.button
        whileHover={{ scale: 1.1, rotate: 15 }}
        whileTap={{ scale: 0.9 }}
        className="fixed top-6 right-6 z-50 p-2 rounded-full bg-gray-800"
        onClick={() => setIsDarkMode(!isDarkMode)}
      >
        {isDarkMode ? <Sun className="w-6 h-6 text-yellow-400" /> : <Moon className="w-6 h-6 text-blue-400" />}
      </motion.button>
      
      {/* Floating Particles Background */}
      <div className="fixed inset-0 z-0 overflow-hidden">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 rounded-full bg-blue-500/20"
            initial={{ 
              x: Math.random() * window.innerWidth, 
              y: Math.random() * window.innerHeight,
              opacity: Math.random() * 0.5 + 0.3
            }}
            animate={{ 
              y: [
                Math.random() * window.innerHeight,
                Math.random() * window.innerHeight
              ],
              x: [
                Math.random() * window.innerWidth,
                Math.random() * window.innerWidth
              ]
            }}
            transition={{ 
              repeat: Infinity, 
              repeatType: "reverse", 
              duration: 10 + Math.random() * 20,
              ease: "linear"
            }}
          />
        ))}
      </div>

      {/* Header */}
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="container mx-auto mb-16 text-center relative z-10"
      >
        <h2 className="text-5xl md:text-6xl font-bold mb-4">
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500">
            Skills & Experience
          </span>
        </h2>
        <motion.p 
          className="text-lg text-gray-300 max-w-3xl mx-auto"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.6 }}
        >
          Full Stack Developer with 1.5+ years at Sify Technologies, skilled in MERN, MEAN, Next.js, and Python,
          building scalable web apps. Passionate about AI-driven solutions and DevOps.
        </motion.p>
      </motion.div>

      {/* Orbit Skill Visualization */}
      <motion.div 
        className="container mx-auto mb-24 relative"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6, duration: 1 }}
      >
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {Object.keys(skillCategories).map(category => (
            <motion.button
              key={category}
              whileHover={{ scale: 1.05, y: -5 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setActiveTab(category)}
              className={`px-6 py-3 rounded-lg flex items-center gap-3 transition-all text-lg ${
                activeTab === category 
                  ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg shadow-purple-500/20' 
                  : 'bg-gray-800/50 text-gray-300 hover:bg-gray-700/70 backdrop-blur-sm'
              }`}
            >
              {getIcon(category)}
              <span className="capitalize font-medium">{category}</span>
            </motion.button>
          ))}
        </div>

        <div className="relative h-96 w-full max-w-3xl mx-auto" ref={orbitRef}>
          {/* Center Core */}
          <motion.div 
            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 rounded-full bg-gradient-to-br from-blue-600 to-purple-800 flex items-center justify-center z-20 shadow-xl shadow-purple-500/20"
            animate={{ 
              boxShadow: ["0 0 20px 0 rgba(109, 40, 217, 0.4)", "0 0 60px 0 rgba(109, 40, 217, 0.2)", "0 0 20px 0 rgba(109, 40, 217, 0.4)"]
            }}
            transition={{ duration: 4, repeat: Infinity }}
          >
            <div className="text-white text-center">
              <span className="block text-lg font-bold capitalize">{activeTab}</span>
              <span className="block text-xs opacity-70">Expertise</span>
            </div>
          </motion.div>

          {/* Orbiting Skills */}
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full">
            {skillCategories[activeTab].map((skill, index) => {
              const angleOffset = (Math.PI * 2) / skillCategories[activeTab].length;
              return (
                <motion.div
                  key={skill}
                  className="orbit-item absolute -translate-x-1/2 -translate-y-1/2 flex items-center justify-center"
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ 
                    opacity: 1, 
                    scale: 1,
                  }}
                  transition={{ 
                    delay: index * 0.1,
                    duration: 0.5,
                    type: "spring" 
                  }}
                  style={{
                    left: `calc(50% + ${Math.cos(index * angleOffset) * 160}px)`,
                    top: `calc(50% + ${Math.sin(index * angleOffset) * 160}px)`,
                    animationDuration: '20s',
                    animationName: 'orbit',
                    animationIterationCount: 'infinite',
                    animationTimingFunction: 'linear',
                  }}
                >
                  <div 
                    className="w-20 h-20 rounded-full bg-gray-900 border-2 border-blue-500/50 flex items-center justify-center transform transition-all duration-300 hover:scale-110 hover:border-purple-400 shadow-lg group backdrop-blur-sm z-10"
                  >
                    <div className="text-center group-hover:scale-110 transition-transform duration-200">
                      <span className="block text-xs font-medium text-blue-300">{skill}</span>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* Orbit Paths */}
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[340px] h-[340px] rounded-full border border-gray-700/30 animate-pulse"></div>
        </div>

        <style jsx global>{`
          @keyframes orbit {
            from {
              transform: rotate(0deg) translateX(170px) rotate(0deg);
            }
            to {
              transform: rotate(360deg) translateX(170px) rotate(-360deg);
            }
          }
        `}</style>
      </motion.div>

      {/* Certifications */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.8 }}
        className="container mx-auto mb-24 text-center"
      >
        <h3 className="text-2xl font-bold mb-8 inline-block border-b-2 border-purple-500 pb-2">Certifications</h3>
        <div className="flex flex-wrap justify-center gap-8">
          <motion.div 
            whileHover={{ y: -5, scale: 1.03 }}
            className="bg-gradient-to-br from-gray-900 to-gray-800 p-6 rounded-xl w-64 border border-gray-700 backdrop-blur-sm shadow-xl"
          >
            <div className="mb-3 bg-blue-600/20 w-16 h-16 rounded-lg flex items-center justify-center mx-auto">
              <Cloud className="w-8 h-8 text-blue-400" />
            </div>
            <h4 className="text-lg font-bold text-blue-300">AWS Certified</h4>
            <p className="text-gray-400 text-sm">Developer Associate</p>
          </motion.div>
          
          <motion.div 
            whileHover={{ y: -5, scale: 1.03 }}
            className="bg-gradient-to-br from-gray-900 to-gray-800 p-6 rounded-xl w-64 border border-gray-700 backdrop-blur-sm shadow-xl"
          >
            <div className="mb-3 bg-purple-600/20 w-16 h-16 rounded-lg flex items-center justify-center mx-auto">
              <Cpu className="w-8 h-8 text-purple-400" />
            </div>
            <h4 className="text-lg font-bold text-purple-300">Workato</h4>
            <p className="text-gray-400 text-sm">Integration Specialist</p>
          </motion.div>
        </div>
      </motion.div>

      {/* Experience Timeline */}
      <motion.div 
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="container mx-auto relative z-10"
      >
        <h3 className="text-2xl font-bold mb-12 text-center">
          <span className="border-b-2 border-blue-500 pb-2">Professional Journey</span>
        </h3>
        
        <div className="relative">
          {/* Timeline Line */}
          <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-gradient-to-b from-blue-600 via-purple-600 to-pink-600 rounded-full" />
          
          {/* Experience Nodes */}
          <div className="space-y-24">
            {experiences.map((exp, index) => (
              <motion.div 
                key={index}
                variants={itemVariants}
                className={`flex flex-col ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'} items-center gap-8`}
              >
                {/* Timeline Node */}
                <motion.div 
                  className="relative z-10"
                  whileHover={{ scale: 1.2 }}
                >
                  <motion.div 
                    className="w-12 h-12 rounded-full bg-black border-4"
                    style={{ borderColor: exp.color }}
                    animate={{ 
                      boxShadow: [
                        `0 0 0 rgba(255,255,255,0)`, 
                        `0 0 15px ${exp.color}80`, 
                        `0 0 0 rgba(255,255,255,0)`
                      ]
                    }}
                    transition={{ duration: 2, repeat: Infinity }}
                  />
                </motion.div>
                
                {/* Content Card */}
                <motion.div 
                  whileHover={{ scale: 1.02 }}
                  className={`bg-gray-900/80 backdrop-blur-sm rounded-xl p-6 shadow-lg border border-gray-800 w-full md:w-5/12 relative`}
                  style={{
                    boxShadow: `0 4px 20px -5px ${exp.color}40`
                  }}
                >
                  {/* Connector Line (Hidden on Mobile) */}
                  <div 
                    className={`hidden md:block absolute w-16 h-0.5 top-1/2 ${index % 2 === 0 ? 'right-full' : 'left-full'}`}
                    style={{ 
                      background: `linear-gradient(${index % 2 === 0 ? 'to left' : 'to right'}, ${exp.color}, transparent)` 
                    }}
                  ></div>

                  {/* Colored Accent */}
                  <div 
                    className="absolute inset-0 rounded-xl opacity-20"
                    style={{ 
                      background: `linear-gradient(135deg, transparent 0%, ${exp.color} 150%)` 
                    }}
                  ></div>

                  <h4 className="text-2xl font-bold" style={{ color: exp.color }}>{exp.title}</h4>
                  <p className="text-lg mb-2 text-gray-300">{exp.company}</p>
                  <p className="text-gray-400 mb-6">{exp.description}</p>
                  
                  {/* Technologies */}
                  <div className="flex flex-wrap gap-2 mb-6">
                    {exp.technologies.map((tech, i) => (
                      <motion.span 
                        key={i}
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.95 }}
                        className="px-3 py-1 rounded-full text-sm backdrop-blur-sm flex items-center gap-1"
                        style={{ 
                          backgroundColor: `${exp.color}20`,
                          color: exp.color,
                          border: `1px solid ${exp.color}50`
                        }}
                      >
                        <Code className="w-3 h-3" />
                        {tech}
                      </motion.span>
                    ))}
                  </div>
                  
                  {/* Achievements */}
                  <div className="space-y-3">
                    {exp.achievements.map((achievement, i) => (
                      <motion.div 
                        key={i}
                        initial={{ opacity: 0, x: index % 2 === 0 ? 20 : -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.4, delay: 0.6 + i * 0.1 }}
                        className="flex items-start gap-2"
                      >
                        <CheckCircle className="w-5 h-5 text-green-500 mt-1 flex-shrink-0" />
                        <span className="text-gray-300">{achievement}</span>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>

      {/* Floating Tech Stack */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 1 }}
        className="container mx-auto mt-24 relative z-10 overflow-hidden pb-16"
      >
        <div className="relative py-10">
          <div className="flex space-x-8 animate-float-slow">
            {['JavaScript', 'TypeScript', 'React', 'Angular', 'Next.js', 'Node.js', 'Python', 'AWS', 'Docker', 'MongoDB', 'SQL', 'Keycloak', 'Figma', 'GitHub Actions'].map((tech, index) => (
              <motion.div
                key={tech}
                whileHover={{ y: -10, scale: 1.1 }}
                className="flex-shrink-0 px-6 py-3 rounded-lg bg-gradient-to-br from-gray-800 to-gray-900 border border-gray-700 shadow-lg"
              >
                <span className="text-white font-medium">{tech}</span>
              </motion.div>
            ))}
            {['JavaScript', 'TypeScript', 'React', 'Angular', 'Next.js', 'Node.js', 'Python', 'AWS', 'Docker', 'MongoDB', 'SQL', 'Keycloak', 'Figma', 'GitHub Actions'].map((tech, index) => (
              <motion.div
                key={`${tech}-repeat`}
                whileHover={{ y: -10, scale: 1.1 }}
                className="flex-shrink-0 px-6 py-3 rounded-lg bg-gradient-to-br from-gray-800 to-gray-900 border border-gray-700 shadow-lg"
              >
                <span className="text-white font-medium">{tech}</span>
              </motion.div>
            ))}
          </div>
        </div>

        <style jsx global>{`
          @keyframes float-slow {
            0% {
              transform: translateX(0);
            }
            100% {
              transform: translateX(-50%);
            }
          }
          
          .animate-float-slow {
            animation: float-slow 30s linear infinite;
          }
        `}</style>
      </motion.div>

      {/* Contact Section */}
      <motion.div 
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 1.2 }}
        className="container mx-auto mt-16 mb-8 relative z-10"
      >
        <div className="bg-gradient-to-r from-blue-900/40 to-purple-900/40 rounded-xl p-8 shadow-lg border border-purple-900/30 backdrop-blur-sm">
          <div className="text-center">
            <h3 className="text-2xl font-bold mb-4 text-white">Let's Create Something Amazing</h3>
            <p className="text-gray-300 mb-8 max-w-2xl mx-auto">
              Passionate about crafting innovative solutions that combine creativity and technical excellence.
              Let's connect and bring your vision to life.
            </p>
            <motion.a 
              href="mailto:harish130615@gmail.com"
              whileHover={{ scale: 1.05, boxShadow: '0 0 20px rgba(139, 92, 246, 0.5)' }}
              whileTap={{ scale: 0.95 }}
              className="inline-block px-10 py-4 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg text-white font-medium shadow-lg transition-all text-lg"
            >
              Get In Touch
            </motion.a>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default SkillsSection;