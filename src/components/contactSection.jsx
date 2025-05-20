import React, { useState, useRef, useEffect } from "react";
import { motion, useMotionValue, useSpring, animate } from "framer-motion";

export default function ContactSection() {
  const [isEmailCopied, setIsEmailCopied] = useState(false);
  const [isPhoneCopied, setIsPhoneCopied] = useState(false);
  const [quoteText, setQuoteText] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  // const email = "harish130615@gmail.com";
  const phone = "+91 9360461148";

  const containerRef = useRef(null);
  const [hovering, setHovering] = useState(false);
  const contactEmail = "harish130615@gmail.com";
  // const phone = "+91 9360461148";
  const location = "San Francisco, CA";
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

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(reqId);
    };
  }, []);

  // Helper function to update SVG path
  const setPath = (value) => {
    if (!path.current) return;

    const width = containerRef.current
      ? containerRef.current.offsetWidth
      : window.innerWidth * 0.7;
    path.current.setAttributeNS(
      null,
      "d",
      `M 0 50 Q ${width * svgX} ${50 + value} ${width} 50`
    );
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

  // Clipboard functions
  const handleEmailClick = () => {
    window.location.href = `mailto:${email}`;
  };

  const handlePhoneClick = () => {
    window.location.href = `tel:${phone.replace(/\s/g, "")}`;
  };

  const copyToClipboard = (text, type) => {
    navigator.clipboard.writeText(text).then(() => {
      if (type === "email") {
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
    console.log("Quote submitted:", quoteText);
    // You can add additional functionality here like sending to a server
    setQuoteText(""); // Clear the input after submission
  };
  const handleFormSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted:", { name, email, message });
    // Reset form after submission
    setName("");
    setEmail("");
    setMessage("");
  };

  return (
    <div className="bg-[#2D2C43] min-h-screen text-white flex flex-col justify-between py-8 px-4 md:px-12 relative">
      {/* Header Section */}
      <div className="flex items-center mb-20 relative">
        <div className="w-12 h-12 md:w-16 md:h-16 rounded-full bg-gray-400 overflow-hidden mr-4">
          <img
            src="logo.svg"
            alt="Profile"
            className="w-full h-full object-cover bg-white"
          />
        </div>
        <h1
          className="text-4xl md:text-4xl font-bold"
          style={{ fontFamily: "Lobster" }}
        >
          Let's work <br className="hidden md:block" />
          together
        </h1>

        {/* <button className="absolute top-0 right-0 text-2xl">↗</button> */}
      </div>
      {/* Main Content */}
      <div className="flex flex-col lg:flex-row gap-8  max-h-[300px]">
        {/* Left Side - Contact Info */}
        <div className="lg:w-1/2">
          <h2 className="text-6xl mb-12 font-serif">Get in Touch</h2>
          
          <div className="space-y-6">
            <div className="flex items-center gap-4">
              <div className="text-2xl">✉️</div>
              <a href={`mailto:${contactEmail}`} className="text-xl hover:underline">
                hello@example.com
              </a>
            </div>
            
            <div className="flex items-center gap-4">
              <div className="text-2xl">📞</div>
              <a href={`tel:+15551234567`} className="text-xl hover:underline">
                +1 (555) 123-4567
              </a>
            </div>
            
            <div className="flex items-center gap-4">
              <div className="text-2xl">📍</div>
              <span className="text-xl">
                {location}
              </span>
            </div>
          </div>
        </div>

        {/* Right Side - Contact Form */}
        <div className="lg:w-1/2 bg-[#252439] rounded-xl p-8 h-[300px]">
          <form onSubmit={handleFormSubmit} className="space-y-6">
            <div>
              <label htmlFor="name" className="block mb-2">Name</label>
              <input
                type="text"
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full p-3 bg-[#252439] border border-gray-600 rounded-md focus:outline-none focus:border-blue-500"
                required
              />
            </div>
            
            <div>
              <label htmlFor="email" className="block mb-2">Email</label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full p-3 bg-[#252439] border border-gray-600 rounded-md focus:outline-none focus:border-blue-500"
                required
              />
            </div>
            
            <div>
              <label htmlFor="message" className="block mb-2">Message</label>
              <textarea
                id="message"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="w-full p-3 bg-[#252439] border border-gray-600 rounded-md focus:outline-none focus:border-blue-500 h-32"
                required
              ></textarea>
            </div>
            
            <button 
              type="submit" 
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded-md transition-colors"
            >
              Send Message
            </button>
          </form>
        </div>
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
            position: "absolute",
            top: "16px", // Align with the gray line
            right: "0",
          }}
          className="transform -translate-y-1/2"
          onMouseEnter={() => setHovering(true)}
        >
          <div
            className="w-24 h-24 md:w-32 md:h-32 bg-blue-600 rounded-full flex items-center justify-center cursor-pointer hover:bg-blue-700 transition-colors"
            onClick={handleEmailClick}
            onContextMenu={(e) => {
              e.preventDefault();
              copyToClipboard(email, "email");
            }}
          >
            <span
              className="text-sm md:text-lg"
              style={{ fontFamily: "Lobster" }}
            >
              Get in touch
            </span>
          </div>
        </motion.div>
      </div>

 
    </div>
  );
}