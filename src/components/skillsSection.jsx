import { useState, useEffect } from "react";

const SkillsSection = () => {
  // Skills data structure with proficiency levels
  const skillsData = {
    languages: [
      { name: "JavaScript", proficiency: 90 },
      { name: "TypeScript", proficiency: 85 },
      { name: "Python", proficiency: 80 },
      { name: "SQL", proficiency: 75 }
    ],
    frontend: [
      { name: "Angular", proficiency: 85 },
      { name: "React", proficiency: 90 },
      { name: "Next.js", proficiency: 80 },
      { name: "Three.js", proficiency: 70 }
    ],
    backend: [
      { name: "Node.js", proficiency: 85 },
      { name: "Express", proficiency: 80 },
      { name: "MongoDB", proficiency: 75 },
      { name: "PostgreSQL", proficiency: 80 }
    ],
    devOps: [
      { name: "AWS", proficiency: 80 },
      { name: "Docker", proficiency: 85 },
      { name: "GitHub Actions", proficiency: 75 },
      { name: "Docker Swarm", proficiency: 70 }
    ],
    tools: [
      { name: "Keycloak", proficiency: 75 },
      { name: "Prometheus", proficiency: 70 },
      { name: "Grafana", proficiency: 75 },
      { name: "Figma", proficiency: 65 }
    ]
  };

  // Work experience data
  const workExperience = [
    {
      title: "Software Engineer",
      company: "Sify Technologies",
      period: "July 2023 - Present",
      achievements: [
        "Built a multi-tenant e-learning platform using MEAN stack with AI features",
        "Designed automated video annotation pipeline on serverless architecture",
        "Built custom Adobe extension for Times of India for asset management"
      ]
    }
  ];

  // Projects data
  const projects = [
    {
      title: "EventDesk",
      description: "Full-stack event management platform with role-based access and analytics",
      technologies: "Angular, PostgreSQL, Node.js, Keycloak, Docker Swarm",
      achievements: [
        "Engineered CI/CD pipeline with GitHub Actions",
        "Implemented monitoring with Grafana and Prometheus"
      ]
    },
    {
      title: "Auction Web App",
      link: "https://github.com/harishhari131506/auction-style_transfer-web-appr",
      description: "Platform for buying, selling, and creating digital art",
      technologies: "HTML, CSS, Python, TensorFlow, SQL",
      achievements: [
        "Integrated TensorFlow-powered neural style transfer",
        "Created intuitive bidding and listing functionalities"
      ]
    }
  ];

  // Certifications
  const certifications = [
    "AWS Certified Developer Associate",
    "Workato"
  ];

  // Animation states
  const [animateSkills, setAnimateSkills] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("languages");
  const [activeTab, setActiveTab] = useState("skills");

  useEffect(() => {
    // Trigger animation when component mounts with a slight delay
    const timer = setTimeout(() => {
      setAnimateSkills(true);
    }, 500);
    
    return () => clearTimeout(timer);
  }, []);

  // Helper function to render skill bars
  const renderSkillBars = (skills) => {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 gap-y-4 gap-x-8 w-full mt-4">
        {skills.map((skill, index) => (
          <div key={index} className="w-full">
            <div className="flex justify-between mb-1">
              <span className="text-sm font-medium text-white">{skill.name}</span>
              <span className="text-sm font-medium text-white opacity-70">{skill.proficiency}%</span>
            </div>
            <div className="w-full bg-gray-800 rounded-full h-2">
              <div 
                className={`bg-blue-500 h-2 rounded-full ${animateSkills ? "transition-all duration-1000 ease-out" : ""}`}
                style={{ 
                  width: animateSkills ? `${skill.proficiency}%` : "0%",
                  transitionDelay: `${index * 100}ms`
                }}
              ></div>
            </div>
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className="w-full bg-gray-900 text-white p-6 md:p-10 lg:p-16">
      {/* Header section */}
      <div className="mb-8">
        <div className="text-lg md:text-xl opacity-70 mb-2">
          <span className="inline-block w-6 h-6 border border-white text-center mr-2">
            <span className="inline-block transform translate-y-[-2px]">⬢</span>
          </span>
        </div>
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-light tracking-wide">Harish</h2>
        <h3 className="text-xl md:text-2xl lg:text-3xl font-light tracking-wide mt-2 opacity-70">Full Stack Developer</h3>
      </div>

      {/* About section */}
      <div className="mt-6 mb-12 max-w-3xl opacity-80 text-lg">
        Full Stack Developer with 1.5+ years at Sify Technologies, skilled in MERN, MEAN, Next.js, and Python, building scalable web apps. Passionate about AI-driven solutions and DevOps, focused on workflow optimization and high-quality software delivery.
      </div>

      {/* Navigation tabs */}
      <div className="flex mb-8 border-b border-gray-700">
        {["skills", "experience", "projects", "education"].map((tab) => (
          <button
            key={tab}
            className={`py-2 px-4 mr-4 font-medium capitalize ${
              activeTab === tab
                ? "text-blue-400 border-b-2 border-blue-400"
                : "text-gray-300 hover:text-white"
            }`}
            onClick={() => setActiveTab(tab)}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Content based on active tab */}
      {activeTab === "skills" && (
        <div className="mt-6">
          {/* Skills category selection */}
          <div className="flex flex-wrap gap-4 mb-6">
            {Object.keys(skillsData).map((category) => (
              <button
                key={category}
                className={`px-4 py-2 rounded-full text-sm font-medium ${
                  selectedCategory === category
                    ? "bg-blue-600 text-white"
                    : "bg-gray-800 text-gray-300 hover:bg-gray-700"
                }`}
                onClick={() => setSelectedCategory(category)}
              >
                {category.charAt(0).toUpperCase() + category.slice(1)}
              </button>
            ))}
          </div>

          {/* Render selected skill category */}
          {renderSkillBars(skillsData[selectedCategory])}

          {/* Certifications */}
          <div className="mt-12">
            <h3 className="text-xl font-medium mb-4">Certifications</h3>
            <div className="flex flex-wrap gap-3">
              {certifications.map((cert, index) => (
                <div key={index} className="bg-gray-800 px-4 py-2 rounded-md text-sm">
                  {cert}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {activeTab === "experience" && (
        <div className="mt-6">
          {workExperience.map((job, index) => (
            <div key={index} className="mb-10 relative pl-6 border-l-2 border-blue-500">
              <div className="absolute w-4 h-4 bg-blue-500 rounded-full left-[-9px] top-1"></div>
              <h3 className="text-xl font-medium">{job.title}</h3>
              <div className="flex items-center mt-1 text-blue-400">
                <span>{job.company}</span>
                <span className="mx-2">•</span>
                <span className="text-sm opacity-80">{job.period}</span>
              </div>
              <ul className="mt-4 space-y-2">
                {job.achievements.map((achievement, i) => (
                  <li key={i} className="flex items-start">
                    <span className="text-blue-400 mr-2">•</span>
                    <span>{achievement}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      )}

      {activeTab === "projects" && (
        <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
          {projects.map((project, index) => (
            <div key={index} className="bg-gray-800 rounded-lg p-6 hover:shadow-lg transition-shadow">
              <div className="flex justify-between items-start">
                <h3 className="text-xl font-medium">{project.title}</h3>
                {project.link && (
                  <a 
                    href={project.link} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-blue-400 hover:text-blue-300"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                  </a>
                )}
              </div>
              <p className="mt-2 opacity-90">{project.description}</p>
              <div className="mt-4">
                <div className="text-sm font-medium text-blue-400 mb-2">Technologies:</div>
                <div className="flex flex-wrap gap-2">
                  {project.technologies.split(", ").map((tech, i) => (
                    <span key={i} className="bg-gray-700 text-xs px-2 py-1 rounded">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
              <ul className="mt-4 space-y-1">
                {project.achievements.map((achievement, i) => (
                  <li key={i} className="flex items-start text-sm">
                    <span className="text-blue-400 mr-2">•</span>
                    <span>{achievement}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      )}

      {activeTab === "education" && (
        <div className="mt-6 relative pl-6 border-l-2 border-blue-500">
          <div className="absolute w-4 h-4 bg-blue-500 rounded-full left-[-9px] top-1"></div>
          <h3 className="text-xl font-medium">BE in Computer Science</h3>
          <div className="flex items-center mt-1 text-blue-400">
            <span>Velammal Engineering College</span>
            <span className="mx-2">•</span>
            <span className="text-sm opacity-80">Aug 2019 – Apr 2023</span>
          </div>
          <div className="mt-4">
            <div className="flex items-center">
              <span className="font-medium mr-2">GPA:</span>
              <span>8.58/10.0</span>
            </div>
            <div className="mt-2">
              <span className="font-medium">Coursework:</span>
              <div className="flex flex-wrap gap-2 mt-2">
                {["DSA", "Networking", "Computational theory", "Computer Architecture"].map((course, i) => (
                  <span key={i} className="bg-gray-800 text-xs px-2 py-1 rounded">
                    {course}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Contact info (always visible) */}
      <div className="mt-16 pt-8 border-t border-gray-700">
        <div className="flex flex-wrap gap-4 text-sm opacity-80">
          <a href="mailto:harish130615@gmail.com" className="flex items-center hover:text-blue-400">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
            harish130615@gmail.com
          </a>
          <a href="tel:+9360461148" className="flex items-center hover:text-blue-400">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
            </svg>
            9360461148
          </a>
          <a href="https://harish-webdev.pages.dev/" className="flex items-center hover:text-blue-400" target="_blank" rel="noopener noreferrer">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
            </svg>
            Portfolio
          </a>
          <a href="https://linkedin.com/in/harish-m-9925a81b7/" className="flex items-center hover:text-blue-400" target="_blank" rel="noopener noreferrer">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" fill="currentColor" viewBox="0 0 24 24">
              <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
            </svg>
            LinkedIn
          </a>
          <a href="https://github.com/harishhari131506" className="flex items-center hover:text-blue-400" target="_blank" rel="noopener noreferrer">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
            </svg>
            GitHub
          </a>
        </div>
      </div>
    </div>
  );
};

export default SkillsSection;