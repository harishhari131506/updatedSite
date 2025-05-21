import React, { useState, useEffect, useRef } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useMotionValue,
  useSpring,
  AnimatePresence,
} from "framer-motion";
import {
  Code,
  Server,
  Workflow,
  ArrowDownRight,
  Cpu,
  Globe,
  Database,
  User,
  Github,
  Linkedin,
  Mail,
} from "lucide-react";
import CanvasBackground from "./CanvasBackground";
import AboutSection from "./about";
import MenuC from "./menu";
import ProjectSection from "./project";
// import SkillsSection from "./skillsSection";
import FooterMain from "./footerMain";


const AnimatedText = ({ text, className }) => {
  return (
    <motion.span
      className={`inline-block ${className}`}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      {text.split("").map((char, index) => (
        <motion.span
          key={index}
          className="inline-block"
          whileHover={{
            scale: 1.2,
            rotate: Math.random() * 10 - 5,
            transition: { duration: 0.2 },
          }}
        >
          {char === " " ? "\u00A0" : char}
        </motion.span>
      ))}
    </motion.span>
  );
};

const ParallaxItem = ({ children, offset = 100 }) => {
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 1000], [0, -offset]);

  return <motion.div style={{ y }}>{children}</motion.div>;
};

const SkillCard = ({ icon: Icon, title, delay }) => {
  return (
    <motion.div
      className="bg-cream/5 backdrop-blur-md p-4 rounded-lg group"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
      whileHover={{
        scale: 1.05,
        backgroundColor: "rgba(255, 253, 245, 0.15)",
        boxShadow: "0 10px 30px -15px rgba(0, 0, 0, 0.5)",
      }}
    >
      <motion.div
        whileHover={{ rotate: 360 }}
        transition={{ duration: 0.5, type: "spring" }}
      >
        <Icon className="text-cream w-6 h-6 mb-2 group-hover:text-cream/100 text-cream/80" />
      </motion.div>
      <h3 className="text-cream text-sm font-medium">{title}</h3>
    </motion.div>
  );
};

const specializations = [
  "MERN",
  "MEAN",
  "Next.js",
  "Python",
  "DevOps",
  "React",
  "Node.js",
  "TypeScript",
  "AWS",
];

const phrases = [
  "building scalable web applications",
  "creating intuitive user interfaces",
  "optimizing performance",
  "solving complex problems",
  "AI-driven solutions",
  "clean code architecture",
];

const LandingPage = () => {
  const [displayText, setDisplayText] = useState(phrases[0]);
  const [currentPhraseIndex, setCurrentPhraseIndex] = useState(0);
  const [isTyping, setIsTyping] = useState(true);

  const { scrollYProgress } = useScroll();
  const scaleAnim = useTransform(scrollYProgress, [0, 0.2], [1, 0.9]);
  const opacityAnim = useTransform(scrollYProgress, [0, 0.2], [1, 0.6]);
  const blurAnim = useTransform(scrollYProgress, [0, 0.2], [0, 4]);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const containerRef = useRef(null);

  // Smooth spring animations for mouse movement
  const springConfig = { damping: 15, stiffness: 150 };
  const leftColumnX = useSpring(0, springConfig);
  const rightColumnX = useSpring(0, springConfig);
  const rotateX = useSpring(0, springConfig);
  const rotateY = useSpring(0, springConfig);

  // Text typing effect
  useEffect(() => {
    const typingInterval = setInterval(() => {
      const nextIndex = (currentPhraseIndex + 1) % phrases.length;

      if (isTyping) {
        // Typing effect completed, start erasing
        setIsTyping(false);
      } else {
        // Erasing effect completed, change phrase and start typing
        setCurrentPhraseIndex(nextIndex);
        setIsTyping(true);
      }
    }, 3000);

    return () => clearInterval(typingInterval);
  }, [currentPhraseIndex, isTyping]);

  useEffect(() => {
    let currentIndex = 0;
    let interval;

    if (isTyping) {
      // Typing effect
      setDisplayText("");
      interval = setInterval(() => {
        if (currentIndex <= phrases[currentPhraseIndex].length) {
          setDisplayText(
            phrases[currentPhraseIndex].substring(0, currentIndex)
          );
          currentIndex++;
        } else {
          clearInterval(interval);
        }
      }, 60);
    } else {
      // Erasing effect
      currentIndex = phrases[currentPhraseIndex].length;
      interval = setInterval(() => {
        if (currentIndex >= 0) {
          setDisplayText(
            phrases[currentPhraseIndex].substring(0, currentIndex)
          );
          currentIndex--;
        } else {
          clearInterval(interval);
        }
      }, 30);
    }

    return () => clearInterval(interval);
  }, [currentPhraseIndex, isTyping]);

  // Mouse move effect
  useEffect(() => {
    const handleMouseMove = (e) => {
      if (!containerRef.current) return;

      const rect = containerRef.current.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;

      // Calculate distance from center (normalized -1 to 1)
      const distanceX = (e.clientX - centerX) / (rect.width / 2);
      const distanceY = (e.clientY - centerY) / (rect.height / 2);

      // Update motion values
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);

      // Apply movement to columns for parallax effect
      leftColumnX.set(-distanceX * 3);
      rightColumnX.set(distanceX * 3);

      // Apply subtle rotation to entire container
      rotateX.set(distanceY * 2);
      rotateY.set(-distanceX * 2);
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [mouseX, mouseY, leftColumnX, rightColumnX, rotateX, rotateY]);

  // Background gradient rotation based on mouse position
  const gradientRotate = useTransform(
    [mouseX, mouseY],
    ([latestX, latestY]) => {
      if (typeof window !== "undefined") {
        const windowCenterX = window.innerWidth / 2;
        const windowCenterY = window.innerHeight / 2;

        // Calculate angle from center to mouse position
        return (
          Math.atan2(latestY - windowCenterY, latestX - windowCenterX) *
          (180 / Math.PI)
        );
      }
      return 0;
    }
  );

  return (
    <>
      <div className="relative">
        <MenuC />
        <CanvasBackground />
        <motion.section
          ref={containerRef}
          className="min-h-screen flex items-center justify-center bg-black overflow-hidden relative"
          style={{
            // scale: scaleAnim,
            // opacity: opacityAnim,
            filter: `blur(${blurAnim}px)`,
          }}
        >
          {/* Animated background */}
          <motion.div
            className="absolute inset-0 z-0 opacity-90"
            style={{
              background:
                "radial-gradient(circle at center, rgba(50, 50, 50, 0.8) 0%, rgba(0, 0, 0, 0) 70%)",
              rotate: gradientRotate,
            }}
          />

          {/* Decorative circles */}
          <motion.div
            className="absolute bottom-20 right-40 border border-cream/10 rounded-full z-10"
            initial={{ width: 0, height: 0, opacity: 0 }}
            animate={{ width: 300, height: 300, opacity: 0.5 }}
            transition={{ duration: 1, delay: 0.8 }}
          />

          <div className="container mx-auto px-4 sm:px-6 relative z-10">
            <motion.div
              className="flex flex-col lg:grid lg:grid-cols-5 gap-0 items-center pt-20"
              style={{
                rotateX: rotateX,
                rotateY: rotateY,
                perspective: "1000px",
              }}
            >
              {/* Left Column - Info */}
              <motion.div
                className="lg:col-span-2 mb-10 lg:mb-0"
                style={{ x: leftColumnX }}
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
              >
                <ParallaxItem offset={30}>
                  <motion.div
                    className="backdrop-blur-sm bg-black/30 p-8 rounded-lg border border-cream/10"
                    whileHover={{
                      boxShadow: "0 0 30px rgba(255, 253, 245, 0.1)",
                      borderColor: "rgba(255, 253, 245, 0.3)",
                    }}
                  >
                    <motion.div
                      className="border-l-4 border-cream pl-4 mb-8"
                      initial={{ scaleX: 0 }}
                      animate={{ scaleX: 1 }}
                      transition={{ duration: 0.8, delay: 0.4 }}
                    >
                      <motion.h2
                        className="text-2xl text-cream font-mono uppercase tracking-wider"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.5, delay: 0.9 }}
                      >
                        Full Stack Developer
                      </motion.h2>
                    </motion.div>

                    <div className="mb-6">
                      <div className="flex items-center space-x-3 mb-4">
                        <motion.span
                          className="w-2 h-2 bg-cream rounded-full"
                          animate={{
                            scale: [1, 1.5, 1],
                            opacity: [0.7, 1, 0.7],
                          }}
                          transition={{
                            duration: 2,
                            repeat: Infinity,
                            ease: "easeInOut",
                          }}
                        />
                        <h3 className="text-lg text-cream font-medium">
                          I specialize in
                        </h3>
                      </div>

                      <motion.div
                        className="flex flex-wrap gap-3 mb-6"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.5, delay: 1 }}
                      >
                        {specializations.map((specialization, index) => (
                          <motion.span
                            key={specialization}
                            className="bg-cream/10 text-cream px-3 py-1 rounded-full text-sm cursor-pointer"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{
                              duration: 0.5,
                              delay: 1 + index * 0.1,
                            }}
                            whileHover={{
                              backgroundColor: "rgba(255, 253, 245, 0.2)",
                              scale: 1.05,
                              transition: { duration: 0.2 },
                            }}
                            whileTap={{ scale: 0.95 }}
                          >
                            {specialization}
                          </motion.span>
                        ))}
                      </motion.div>
                    </div>

                    <motion.div
                      className="text-cream mb-8"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.5, delay: 1.2 }}
                    >
                      <p className="text-xl font-light mb-3">
                        I'm passionate about{" "}
                        <span className="font-medium">{displayText}</span>
                        <motion.span
                          className="inline-block"
                          animate={{
                            opacity: [1, 0, 1],
                          }}
                          transition={{
                            duration: 0.8,
                            repeat: Infinity,
                            repeatType: "reverse",
                          }}
                        >
                          |
                        </motion.span>
                      </p>
                      <p className="text-sm opacity-80 leading-relaxed">
                        With 2 years at Sify Technologies, I build scalable web
                        applications and focus on AI-driven solutions with
                        high-quality software delivery.
                      </p>
                    </motion.div>

                    <motion.div
                      className="mt-8 flex space-x-4"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: 1.4 }}
                    >
                      <motion.button
                        className="group cursor-pointer z-[999] flex items-center space-x-2 bg-cream  px-6 py-3 rounded-full font-medium relative overflow-hidden"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <motion.span
                          className="absolute inset-0  bg-cream/10"
                          initial={{ x: "-100%" }}
                          whileHover={{ x: "0%" }}
                          transition={{ duration: 0.3 }}
                        />
                        <span className="relative z-10">View Projects</span>
                        <motion.div
                          className="relative z-10"
                          whileHover={{ x: 5, y: 5 }}
                          transition={{ duration: 0.2 }}
                        >
                          <ArrowDownRight className="w-4 h-4" />
                        </motion.div>
                      </motion.button>

                      <motion.button
                        className="border cursor-pointer border-cream/50 text-cream px-6 py-3 rounded-full font-medium relative overflow-hidden"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <motion.span
                          className="absolute inset-0 bg-cream/10 z-1000"
                          initial={{ y: "-100%" }}
                          whileHover={{ y: "0%" }}
                          transition={{ duration: 0.3 }}
                        />
                        <span className="relative z-10">Contact Me</span>
                      </motion.button>
                    </motion.div>
                  </motion.div>
                </ParallaxItem>
              </motion.div>

              {/* Spacer with animated line */}
              <div className="lg:col-span-1 relative h-full">
                <motion.div
                  className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-px h-1/2"
                  style={{
                    background:
                      "linear-gradient(to bottom, transparent, rgba(255, 253, 245, 0.7), transparent)",
                  }}
                  initial={{ scaleY: 0, opacity: 0 }}
                  animate={{ scaleY: 1, opacity: 1 }}
                  transition={{ duration: 1, delay: 0.5 }}
                >
                  <motion.div
                    className="absolute top-0 left-0 w-full h-20 bg-gradient-to-b from-transparent via-cream to-transparent"
                    animate={{
                      y: [0, 100, 0],
                    }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                      repeatType: "loop",
                      ease: "easeInOut",
                    }}
                  />
                </motion.div>
              </div>

              {/* Right Column - Name & Skills */}
              <motion.div
                className="lg:col-span-2 relative"
                style={{ x: rightColumnX }}
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
              >
                <ParallaxItem offset={-40}>
                  <motion.h1
                    className="text-8xl font-serif text-cream leading-none mb-12"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 1, delay: 0.3 }}
                  >
                    <motion.div
                      whileHover={{ scale: 1.05 }}
                      transition={{
                        type: "spring",
                        stiffness: 400,
                        damping: 10,
                      }}
                      className="origin-left inline-block cursor-default"
                    >
                      <AnimatedText text="Harish" className="block" />
                    </motion.div>
                  </motion.h1>

                  <motion.div
                    className="grid grid-cols-3 gap-4 mt-6"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.8 }}
                  >
                    <SkillCard icon={Code} title="Frontend" delay={1.1} />
                    <SkillCard icon={Server} title="Backend" delay={1.3} />
                    <SkillCard icon={Workflow} title="DevOps" delay={1.5} />
                  </motion.div>

                  {/* Social links */}
                  <motion.div
                    className="flex space-x-4 mt-8"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 1.7 }}
                  >
                    {[
                      { icon: Github, label: "GitHub" },
                      { icon: Linkedin, label: "LinkedIn" },
                      { icon: Mail, label: "Email" },
                    ].map((item, index) => (
                      <motion.a
                        key={item.label}
                        href="#"
                        className="h-10 w-10 rounded-full bg-cream/10 flex items-center justify-center group"
                        whileHover={{
                          scale: 1.1,
                          backgroundColor: "rgba(255, 253, 245, 0.2)",
                        }}
                        whileTap={{ scale: 0.95 }}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 1.7 + index * 0.1 }}
                      >
                        <item.icon className="h-5 w-5 text-cream group-hover:text-white transition-colors" />
                      </motion.a>
                    ))}
                  </motion.div>
                </ParallaxItem>
              </motion.div>
            </motion.div>

        
          </div>
        </motion.section>
      </div>

      <AboutSection />

      <ProjectSection />
      {/* <SkillsSection/> */}

      <FooterMain/>
    </>
  );
};

export default LandingPage;
