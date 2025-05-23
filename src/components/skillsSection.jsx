import { useState, useEffect } from "react";

const SkillsSection = () => {
  // Enhanced skills data with icons and categories
  const skillsData = {
    frontend: [
      { name: "React", proficiency: 90, years: 2, icon: "⚛️", color: "from-cyan-400 to-blue-500" },
      { name: "Angular", proficiency: 85, years: 2, icon: "🅰️", color: "from-red-400 to-red-600" },
      { name: "Next.js", proficiency: 80, years: 1, icon: "▲", color: "from-gray-400 to-gray-600" },
      { name: "Three.js", proficiency: 70, years: 1, icon: "🎮", color: "from-purple-400 to-purple-600" },
      { name: "TypeScript", proficiency: 85, years: 2, icon: "📘", color: "from-blue-400 to-blue-600" }
    ],
    backend: [
      { name: "Node.js", proficiency: 85, years: 3, icon: "🟢", color: "from-green-400 to-green-600" },
      { name: "Express", proficiency: 80, years: 3, icon: "🚀", color: "from-yellow-400 to-orange-500" },
      { name: "Python", proficiency: 80, years: 2, icon: "🐍", color: "from-yellow-400 to-green-500" },
      { name: "MongoDB", proficiency: 75, years: 2, icon: "🍃", color: "from-green-400 to-green-600" },
      { name: "PostgreSQL", proficiency: 80, years: 2, icon: "🐘", color: "from-blue-400 to-indigo-600" }
    ],
    devOps: [
      { name: "AWS", proficiency: 80, years: 2, icon: "☁️", color: "from-orange-400 to-orange-600" },
      { name: "Docker", proficiency: 85, years: 2, icon: "🐳", color: "from-blue-400 to-cyan-500" },
      { name: "GitHub Actions", proficiency: 75, years: 1, icon: "⚡", color: "from-purple-400 to-pink-500" },
      { name: "Docker Swarm", proficiency: 70, years: 1, icon: "🔄", color: "from-teal-400 to-blue-500" },
      { name: "Prometheus", proficiency: 70, years: 1, icon: "📊", color: "from-red-400 to-orange-500" }
    ],
    tools: [
      { name: "Keycloak", proficiency: 75, years: 1, icon: "🔐", color: "from-gray-400 to-gray-600" },
      { name: "Grafana", proficiency: 75, years: 1, icon: "📈", color: "from-orange-400 to-red-500" },
      { name: "Figma", proficiency: 65, years: 2, icon: "🎨", color: "from-purple-400 to-pink-500" },
      { name: "Git", proficiency: 85, years: 3, icon: "📋", color: "from-orange-400 to-red-500" }
    ]
  };

  const [selectedCategory, setSelectedCategory] = useState("frontend");
  const [animateSkills, setAnimateSkills] = useState(false);
  const [hoveredSkill, setHoveredSkill] = useState(null);
  const [viewMode, setViewMode] = useState("grid"); // grid or chart

  useEffect(() => {
    const timer = setTimeout(() => setAnimateSkills(true), 300);
    return () => clearTimeout(timer);
  }, [selectedCategory]);

  // Get skill level text
  const getSkillLevel = (proficiency) => {
    if (proficiency >= 85) return "Expert";
    if (proficiency >= 70) return "Advanced";
    if (proficiency >= 55) return "Intermediate";
    return "Beginner";
  };

  // Render skill cards
  const renderSkillCards = (skills) => {
    return (
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 mt-8">
        {skills.map((skill, index) => (
          <div
            key={skill.name}
            className={`group relative bg-gray-900/50 backdrop-blur-sm border border-gray-800/50 rounded-2xl p-6 hover:border-gray-700/50 transition-all duration-500 hover:scale-105 hover:shadow-2xl hover:shadow-blue-500/10 ${
              animateSkills ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            }`}
            style={{
              transitionDelay: `${index * 50}ms`
            }}
            onMouseEnter={() => setHoveredSkill(skill.name)}
            onMouseLeave={() => setHoveredSkill(null)}
          >
            {/* Skill Icon */}
            <div className="text-3xl mb-4 group-hover:scale-110 transition-transform duration-300">
              {skill.icon}
            </div>
            
            {/* Skill Name */}
            <h3 className="text-white font-semibold text-lg mb-3 group-hover:text-blue-400 transition-colors">
              {skill.name}
            </h3>
            
            {/* Proficiency Bar */}
            <div className="mb-4">
              <div className="flex justify-between items-center text-sm mb-2">
                <span className="text-gray-400">{getSkillLevel(skill.proficiency)}</span>
                <span className="text-gray-300 font-medium">{skill.proficiency}%</span>
              </div>
              <div className="w-full h-2 bg-gray-800 rounded-full overflow-hidden">
                <div
                  className={`h-full bg-gradient-to-r ${skill.color} rounded-full transition-all duration-1000 ease-out`}
                  style={{
                    width: animateSkills ? `${skill.proficiency}%` : "0%",
                    transitionDelay: `${index * 100 + 200}ms`
                  }}
                />
              </div>
            </div>
            
            {/* Years of Experience */}
            <div className="text-xs text-gray-500">
              {skill.years} year{skill.years > 1 ? 's' : ''} exp
            </div>
            
            {/* Hover Tooltip */}
            {hoveredSkill === skill.name && (
              <div className="absolute -top-16 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white text-sm px-3 py-2 rounded-lg shadow-lg border border-gray-700 z-10 whitespace-nowrap">
                <div className="font-medium">{skill.name}</div>
                <div className="text-gray-300">{skill.proficiency}% • {skill.years}y experience</div>
                <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-gray-800"></div>
              </div>
            )}
          </div>
        ))}
      </div>
    );
  };

  // Category stats
  const getCategoryStats = (skills) => {
    const avgProficiency = Math.round(skills.reduce((acc, skill) => acc + skill.proficiency, 0) / skills.length);
    const totalExperience = skills.reduce((acc, skill) => acc + skill.years, 0);
    const expertSkills = skills.filter(skill => skill.proficiency >= 85).length;
    
    return { avgProficiency, totalExperience, expertSkills, totalSkills: skills.length };
  };

  const currentStats = getCategoryStats(skillsData[selectedCategory]);

  return (
    <div className="min-h-screen bg-black text-white relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-20 left-20 w-72 h-72 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl animate-pulse"></div>
        <div className="absolute top-40 right-20 w-96 h-96 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl animate-pulse" style={{animationDelay: "2s"}}></div>
        <div className="absolute bottom-20 left-40 w-80 h-80 bg-cyan-500 rounded-full mix-blend-multiply filter blur-xl animate-pulse" style={{animationDelay: "4s"}}></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Header Section */}
        <div className="text-center mb-16">
          {/* <div className="inline-flex items-center px-4 py-2 bg-gray-900/50 backdrop-blur-sm border border-gray-800/50 rounded-full text-sm text-gray-400 mb-6">
            <span className="w-2 h-2 bg-green-400 rounded-full mr-2 animate-pulse"></span>
            Available for new opportunities
          </div> */}
          
          <h1 className="text-5xl md:text-7xl font-light mb-6 bg-gradient-to-r from-white via-gray-200 to-gray-400 bg-clip-text text-transparent">
            Skills
          </h1>
          {/* <p className="text-2xl md:text-3xl text-gray-400 font-light mb-8">
            Full Stack Developer & DevOps Specialist
          </p>
          <p className="text-lg text-gray-500 max-w-3xl mx-auto leading-relaxed">
            Crafting scalable web applications with modern technologies. 
            Passionate about AI-driven solutions, workflow optimization, and delivering high-quality software.
          </p> */}
        </div>

        {/* Category Navigation */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {Object.entries(skillsData).map(([category, skills]) => (
            <button
              key={category}
              onClick={() => {
                setSelectedCategory(category);
                setAnimateSkills(false);
                setTimeout(() => setAnimateSkills(true), 100);
              }}
              className={`px-6 py-3 rounded-2xl font-medium transition-all duration-300 ${
                selectedCategory === category
                  ? "bg-blue-600 text-white shadow-lg shadow-blue-500/25"
                  : "bg-gray-900/50 text-gray-400 hover:bg-gray-800/50 hover:text-white border border-gray-800/50 backdrop-blur-sm"
              }`}
            >
              <span className="capitalize">{category}</span>
              <span className="text-xs ml-2 opacity-70">({skills.length})</span>
            </button>
          ))}
        </div>

        {/* Category Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
          <div className="bg-gray-900/50 backdrop-blur-sm border border-gray-800/50 rounded-2xl p-6 text-center">
            <div className="text-3xl font-bold text-blue-400 mb-2">{currentStats.avgProficiency}%</div>
            <div className="text-gray-400 text-sm">Avg Proficiency</div>
          </div>
          <div className="bg-gray-900/50 backdrop-blur-sm border border-gray-800/50 rounded-2xl p-6 text-center">
            <div className="text-3xl font-bold text-green-400 mb-2">{currentStats.expertSkills}</div>
            <div className="text-gray-400 text-sm">Expert Level</div>
          </div>
          <div className="bg-gray-900/50 backdrop-blur-sm border border-gray-800/50 rounded-2xl p-6 text-center">
            <div className="text-3xl font-bold text-purple-400 mb-2">{currentStats.totalExperience}</div>
            <div className="text-gray-400 text-sm">Total Years</div>
          </div>
          <div className="bg-gray-900/50 backdrop-blur-sm border border-gray-800/50 rounded-2xl p-6 text-center">
            <div className="text-3xl font-bold text-cyan-400 mb-2">{currentStats.totalSkills}</div>
            <div className="text-gray-400 text-sm">Technologies</div>
          </div>
        </div>

        {/* Skills Grid */}
        {renderSkillCards(skillsData[selectedCategory])}

        {/* Certifications */}
        <div className="mt-20">
          <h2 className="text-3xl font-light text-center mb-12">Certifications & Recognition</h2>
          <div className="flex flex-wrap justify-center gap-6">
            {["AWS Certified Developer Associate", "Workato Certified"].map((cert, index) => (
              <div
                key={index}
                className="bg-gradient-to-r from-gray-900/50 to-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-2xl px-8 py-4 hover:border-gray-600/50 transition-all duration-300 hover:scale-105"
              >
                <div className="flex items-center">
                  <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center mr-4">
                    <span className="text-white font-bold text-sm">✓</span>
                  </div>
                  <span className="text-white font-medium">{cert}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
};

export default SkillsSection;