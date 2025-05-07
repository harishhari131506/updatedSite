import React, { useState, useRef, useEffect } from "react";
import { motion, useMotionValue, useSpring, animate } from "framer-motion";
import { Mail, Phone } from "lucide-react";

export default function ContactSection() {
  const [isEmailCopied, setIsEmailCopied] = useState(false);
  const [isPhoneCopied, setIsPhoneCopied] = useState(false);
  const [quoteText, setQuoteText] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  // const email = "harish130615@gmail.com";
  const phone = "+91 9360461148";
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [copiedPhone, setCopiedPhone] = useState(false);
  
  const copyToClipboard = (text, type) => {
    navigator.clipboard.writeText(text);
    if (type === "email") {
      setCopiedEmail(true);
      setTimeout(() => setCopiedEmail(false), 2000);
    } else {
      setCopiedPhone(true);
      setTimeout(() => setCopiedPhone(false), 2000);
    }
  };
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
    <div id="contact" className="bg-[#2D2C43] min-h-screen text-white flex flex-col justify-between py-8 px-4 md:px-12 relative">
      {/* Header Section */}
      <div className="flex items-center mb-20 relative">
        <div className="w-12 h-12 md:w-16 md:h-16 rounded-full bg-gray-400 overflow-hidden mr-4 mt-20">
          <img
            src="logo.svg"
            alt="Profile"
            className="w-full h-full object-cover bg-white"
          />
        </div>
        <h1
          className="text-4xl md:text-4xl font-bold mt-20"
          style={{ fontFamily: "Lobster" }}
        >
          Let's work <br className="hidden md:block" />
          together
        </h1>
 
        {/* <button className="absolute top-0 right-0 text-2xl">↗</button> */}
      </div>
      {/* Main Content */}
      <div className="flex flex-col md:flex-row gap-6 md:gap-12">
      {[{
        type: "email",
        icon: <Mail size={24} />,
        label: "Email",
        value: "harish130615@gmail.com",
        copied: copiedEmail
      }, {
        type: "phone",
        icon: <Phone size={24} />,
        label: "Mobile",
        value: "9360461148",
        copied: copiedPhone
      }].map((item, idx) => (
        <motion.div
          key={idx}
          className="flex-1 relative rounded-xl p-6 cursor-pointer group text-white overflow-hidden"
          onClick={() => {
            copyToClipboard(item.value, item.type);
            handleEmailClick();
          }}
          
          initial={{ scale: 1 }}
          whileHover={{ scale: 1.05 }}
          transition={{ type: "spring", stiffness: 300 }}
        >
          {/* Animated Gradient Background */}
          <div className="absolute inset-0 z-0 animate-gradient-move bg-[length:300%_300%] rounded-xl opacity-70 bg-[linear-gradient(90deg,#484768,#6a699d,#5b59cc)]" />
   
          {/* Card Content */}
          <div className="relative z-10">
            <div className="flex items-center mb-4">
              <div className="bg-blue-600 p-3 rounded-lg mr-4 group-hover:bg-blue-500 transition-colors">
                {item.icon}
              </div>
              <h3 className="text-xl font-semibold">{item.label}</h3>
            </div>
            <p className="text-gray-100 mb-2">{item.value}</p>
            <div className="flex items-center text-sm text-gray-300">
              <span>{item.copied ? "Copied!" : "Click to copy"}</span>
            </div>
          </div>
        </motion.div>
      ))}
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
      <div className="mt-12 text-center text-gray-400 text-sm">
          © Harish {new Date().getFullYear()} • Made with passion
        </div>
 
    </div>
  );
}

// import React from 'react'
// import ContactSection from './contactSection'

// export default function Content() {
//   return (
//     <div className='bg-[#4E4E5A] py-8 px-4 md:px-12 h-full w-full flex flex-col justify-between'>
//         <Section1 />
//         <ContactSection />
//         <Section2 />
//     </div>
//   )
// }

// const Section1 = () => {
//     return (
//         <div className='mt-10'>
//             {/* <Nav /> */}
//         </div>
//     )
// }

// const Section2 = () => {
//     return (
//         <div className='flex justify-between items-end mt-16 pb-8'>
//             <h1 className='text-[8vw] md:text-[10vw] leading-[0.8] mt-10'>Let's Connect</h1>
//             <p className='text-gray-400 text-sm'>©copyright</p>
//         </div>
//     )
// }

// const Nav = () => {
//     return (
//         <div className='flex flex-col md:flex-row shrink-0 gap-8 md:gap-20'>
//             <div className='flex flex-col gap-2 mt-10' >
//                 <h3 className='mb-2 uppercase text-[#ffffff80]'>About</h3>
//                 <p className='hover:text-white cursor-pointer transition-colors'>Home</p>
//                 <p className='hover:text-white cursor-pointer transition-colors'>Projects</p>
//                 <p className='hover:text-white cursor-pointer transition-colors'>Our Mission</p>
//                 <p className='hover:text-white cursor-pointer transition-colors'>Contact Us</p>
//             </div>
//             <div className='flex flex-col gap-2 mt-10 md:mt-10'>
//                 <h3 className='mb-2 uppercase text-[#ffffff80]'>Education</h3>
//                 <p className='hover:text-white cursor-pointer transition-colors'>News</p>
//                 <p className='hover:text-white cursor-pointer transition-colors'>Learn</p>
//                 <p className='hover:text-white cursor-pointer transition-colors'>Certification</p>
//                 <p className='hover:text-white cursor-pointer transition-colors'>Publications</p>
//             </div>
//         </div>
//     )
// }