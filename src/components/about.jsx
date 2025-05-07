import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import useMousePosition from "../hooks/useMousePosition";

export default function AboutSection() {
  const canvasRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  const [isHovered, setIsHovered] = useState(false);
  const { x, y } = useMousePosition();
  const size = isHovered ? 400 : 40;

  // Terminal animation states
  const [showLine1, setShowLine1] = useState(false);
  const [showLine2, setShowLine2] = useState(false);
  const [showLine3, setShowLine3] = useState(false);
  const [showLine4, setShowLine4] = useState(false);
  const [showLine5, setShowLine5] = useState(false);
  const [showLine6, setShowLine6] = useState(false);
  const [showLine7, setShowLine7] = useState(false);

  // Matrix rain animation
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const characters =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789<>[]{}()/*-+!@#$%^&*=";
    const fontSize = 14;
    const columns = canvas.width / fontSize;

    const drops = [];
    for (let i = 0; i < columns; i++) {
      drops[i] = Math.floor(Math.random() * canvas.height);
    }

    const draw = () => {
      ctx.fillStyle = "rgba(15, 14, 23, 0.05)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.fillStyle = "#8b5cf6";
      ctx.font = `${fontSize}px monospace`;

      for (let i = 0; i < drops.length; i++) {
        const text = characters.charAt(
          Math.floor(Math.random() * characters.length)
        );
        ctx.fillText(text, i * fontSize, drops[i] * fontSize);

        if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
          drops[i] = 0;
        }

        drops[i]++;
      }
    };

    const interval = setInterval(draw, 35);

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    window.addEventListener("resize", handleResize);

    // Staggered animation for terminal lines
    setIsVisible(true);
    const timers = [
      setTimeout(() => setShowLine1(true), 800),
      setTimeout(() => setShowLine2(true), 1400),
      setTimeout(() => setShowLine3(true), 2000),
      setTimeout(() => setShowLine4(true), 2600),
      setTimeout(() => setShowLine5(true), 3200),
      setTimeout(() => setShowLine6(true), 3800),
      setTimeout(() => setShowLine7(true), 4400),
    ];

    return () => {
      clearInterval(interval);
      window.removeEventListener("resize", handleResize);
      timers.forEach((timer) => clearTimeout(timer));
    };
  }, []);

  // Skills with staggered animations
  const skills = [
    "Python",
    "JavaScript",
    "React",
    "Node.js",
    "DevOps",
    "Docker",
    "AWS",
    "Git",
    "REST APIs",
    "Dark Mode",
  ];

  return (
    <div
      className="relative min-h-screen bg-black text-white overflow-hidden"
      style={{
        fontFamily: "Lato",
      }}
      id="about"
    >
      {/* Matrix Rain Background */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full z-0 opacity-15"
      />

      {/* Content Container */}
      <div className="relative z-10 max-w-4xl mx-auto px-4 py-16 lg:py-24 flex flex-col justify-center min-h-screen">
        {/* Title with gradient animation */}
        <h1
          className="text-4xl md:text-5xl lg:text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-white via-[#f5f5f5] to-[#e0e0e0] animate-gradient shimmer "
          style={{
            backgroundSize: "200% 200%",
            animation: "gradient 8s ease infinite",
          }}
        >
          Part human, part Stack Overflow.
        </h1>

        {/* Subtitle */}
        <p className="text-lg md:text-xl text-gray-300 mb-8">
          I'm a software engineer who writes code, breaks code, Googles why it
          broke, and then fixes it like it was never broken. Fluent in{" "}
          <span className=" font-semibold">Python</span>,{" "}
          <span className="font-semibold">JavaScript</span>, and{" "}
          <span className="font-semibold">sarcastic commit messages</span>, I
          build things that (usually) don't crash.
        </p>

        {/* Terminal Window */}
        <div className="bg-black border border-gray-700 rounded-lg shadow-lg mb-10 overflow-hidden">
          {/* Terminal Header */}
          <div className="h-8 bg-white flex items-center px-4 border-b border-gray-700">
            <div className="w-3 h-3 bg-red-500 rounded-full mr-2"></div>
            <div className="w-3 h-3 bg-yellow-500 rounded-full mr-2"></div>
            <div className="w-3 h-3 bg-green-500 rounded-full mr-2"></div>
            <div className="ml-2 text-xs text-gray-400">Terminal</div>
          </div>

          {/* Terminal Content */}
          <div className="p-4 font-mono text-sm md:text-base">
            <div
              className={`transition-opacity duration-500 ${
                showLine1 ? "opacity-100" : "opacity-0"
              }`}
            >
              <span className="text-white-500">$</span>{" "}
              <span className="text-white">whoami</span>
            </div>

            <div
              className={`ml-4 text-gray-400 transition-opacity duration-500 ${
                showLine2 ? "opacity-100" : "opacity-0"
              }`}
            >
              DevOps specialist, backend builder, frontend tinkerer
            </div>

            <div
              className={`ml-4 text-gray-400 mb-3 transition-opacity duration-500 ${
                showLine3 ? "opacity-100" : "opacity-0"
              }`}
            >
              software craftsman, design explorer, architecture nerd
            </div>

            <div
              className={`transition-opacity duration-500 ${
                showLine4 ? "opacity-100" : "opacity-0"
              }`}
            >
              <span className="text-white-500">$</span>{" "}
              <span className="text-white">git status</span>
            </div>

            <div
              className={`ml-4 text-gray-400 transition-opacity duration-500 ${
                showLine5 ? "opacity-100" : "opacity-0"
              }`}
            >
              On branch master
              <br />
              Your branch is ahead of 'origin/master' by 42 commits
              <br />
              Changes not staged for commit:
              <br />
              &nbsp;&nbsp;modified: life.js
            </div>

            <div
              className={`transition-opacity duration-500 ${
                showLine6 ? "opacity-100" : "opacity-0"
              }`}
            >
              <span className="text-white-500">$</span>{" "}
              <span className="text-white">
                git commit -m "Fixed that thing nobody else could fix"
              </span>
            </div>

            <div
              className={`transition-opacity duration-500 ${
                showLine7 ? "opacity-100" : "opacity-0"
              }`}
            >
              <span className="inline-block w-2 h-5 bg-white mt-6 animate-blink"></span>
            </div>
          </div>
        </div>

        {/* Quote */}
        <div
          className={`italic text-gray-400 border-l-4 border-white-500 pl-4  transition-opacity duration-1000 delay-1000 ${
            isVisible ? "opacity-100" : "opacity-0"
          }`}
        >
          If it plugs into Git, talks to an API, scales your applications, or
          needs a dark mode — <strong>I'm your person</strong>.
        </div>
      </div>

      {/* ----------------------------------------------------------------- */}
      {/* <main className="h-screen relative">
  <motion.div 
    className="w-full h-full flex items-center justify-center text-black text-[64px] leading-[66px] cursor-default absolute bg-[#ec4e39]"
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
      className="w-[1000px] p-10"
      onMouseEnter={() => setIsHovered(true)} 
      onMouseLeave={() => setIsHovered(false)}
    >
      A visual designer – with skills that haven't been replaced by A.I (yet) – making good shit only if the paycheck is equally good.
    </p>
  </motion.div>

  <div className="w-full h-full flex items-center justify-center text-[#afa18f] text-[64px] leading-[66px] cursor-default">
    <p className="w-[1000px] p-10">
      I'm a <span className="text-[#ec4e39]">selectively skilled</span> product designer with strong focus on producing high quality & impactful digital experience.
    </p>
  </div>
</main> */}

      {/* ----------------------------------------------------------------- */}

      {/* CSS Animations */}
      <style jsx>{`
        @keyframes gradient {
          0% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
          100% {
            background-position: 0% 50%;
          }
        }

        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-gradient {
          background-size: 200% 200%;
          animation: gradient 8s ease infinite;
        }

        .animate-blink {
          animation: blink 1s infinite;
        }

        @keyframes blink {
          0%,
          100% {
            opacity: 1;
          }
          50% {
            opacity: 0;
          }
        }
      `}</style>
    </div>
  );
}
