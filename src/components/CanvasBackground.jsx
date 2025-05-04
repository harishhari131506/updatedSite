
import { useEffect } from "react";

function CanvasBackground() {
  useEffect(() => {
    const canvas = document.getElementById("starCanvas");
    const ctx = canvas.getContext("2d");

    if (!canvas || !ctx) return; 
    
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);
    let stars = [];

    window.addEventListener("resize", () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    });

    class Star {
      constructor(x, y, velocityX, velocityY) {
        this.x = x;
        this.y = y;
        this.finalSize = Math.random() * 3 + 2;
        this.size = this.finalSize * 2;
        this.alpha = 0.8;
        this.velocityX = velocityX * 0.05;
        this.velocityY = 1 + Math.random() + velocityY * 0.05;
        this.gravity = 0.02;
        this.drag = 0.97;
        this.turbulence = () => Math.random() * 0.5 - 0.25;
        this.rotation = Math.random() * Math.PI * 2;
        this.rotationSpeed = (Math.random() - 0.5) * 0.02;
        this.points = 5 + Math.floor(Math.random() * 3);
        this.innerRadius = this.finalSize * 0.4;
        this.timeElapsed = 0;
      }

      draw() {
        ctx.fillStyle = `rgba(222, 222, 222, ${this.alpha})`;
        ctx.beginPath();

        for (let i = 0; i <= this.points * 2; i++) {
          const radius = i % 2 === 0 ? this.size : this.innerRadius;
          const angle = (Math.PI * 2 * i) / (this.points * 2) + this.rotation;
          const x = this.x + radius * Math.cos(angle);
          const y = this.y + radius * Math.sin(angle);
          if (i === 0) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        }

        ctx.closePath();
        ctx.fill();
      }

      update(deltaTime) {
        this.x += this.velocityX + this.turbulence();
        this.velocityX *= this.drag;
        this.y += this.velocityY;
        this.velocityY += this.gravity;
        this.alpha = Math.max(0, this.alpha - 0.005);
        this.rotation += this.rotationSpeed;
        this.timeElapsed += deltaTime;

        if (this.timeElapsed < 2000) {
          this.size = this.finalSize * 2 - (this.finalSize * this.timeElapsed) / 2000;
        } else {
          this.size = this.finalSize;
        }
      }
    }

    let lastMouseX = 0;
    let lastMouseY = 0;
    let mouseVelocityX = 0;
    let mouseVelocityY = 0;

    function addStar(e) {
      mouseVelocityX = e.clientX - lastMouseX;
      mouseVelocityY = e.clientY - lastMouseY;
      lastMouseX = e.clientX;
      lastMouseY = e.clientY;

      let randomOffsetX = (Math.random() - 0.5) * 100;
      let randomOffsetY = (Math.random() - 0.5) * 100;

      stars.push(
        new Star(
          e.clientX,
          e.clientY,
          mouseVelocityX + randomOffsetX,
          mouseVelocityY + randomOffsetY
        )
      );
    }

    canvas.addEventListener("mousemove", addStar);

    let lastTime = 0;
    function update(time = 0) {
      const deltaTime = time - lastTime;
      lastTime = time;
      ctx.clearRect(0, 0, width, height);
      stars.forEach((star) => star.update(deltaTime));
      stars.forEach((star) => star.draw());
      stars = stars.filter(
        (star) =>
          star.alpha > 0 && star.y < height && star.x > 0 && star.x < width
      );
      requestAnimationFrame(update);
    }

    update();

    return () => {
      canvas.removeEventListener("mousemove", addStar);
    };
  }, []);

  return (
    <canvas
      id="starCanvas"
      className="fixed top-0 left-0 w-full h-full z-0"
    />
  );
}

export default CanvasBackground;









// import React, { useState, useEffect, useRef } from 'react';

// function BoundedStarBackground() {
//   const canvasRef = useRef(null);
//   const [isScrolling, setIsScrolling] = useState(false);
//   const starsRef = useRef([]);
//   const animationRef = useRef(null);
//   const lastTimeRef = useRef(0);
  
//   // Content box boundaries (these should match your content area)
//   const contentBounds = {
//     left: window.innerWidth * 0.15,    // Approximating based on your image
//     top: window.innerHeight * 0.15,
//     right: window.innerWidth * 0.85,
//     bottom: window.innerHeight * 0.85
//   };
  
//   useEffect(() => {
//     const canvas = canvasRef.current;
//     const ctx = canvas.getContext("2d");
    
//     if (!canvas || !ctx) return;
    
//     // Set canvas to full screen
//     canvas.width = window.innerWidth;
//     canvas.height = window.innerHeight;
    
//     class Star {
//       constructor(x, y) {
//         this.x = x;
//         this.y = y;
//         this.finalSize = Math.random() * 3 + 2;
//         this.size = 0; // Start small and grow
//         this.alpha = 0.8;
//         this.velocityX = (Math.random() - 0.5) * 2;
//         this.velocityY = (Math.random() - 0.5) * 2;
//         this.gravity = 0.01;
//         this.drag = 0.98;
//         this.rotation = Math.random() * Math.PI * 2;
//         this.rotationSpeed = (Math.random() - 0.5) * 0.02;
//         this.points = 5 + Math.floor(Math.random() * 3);
//         this.innerRadius = this.finalSize * 0.4;
//         this.timeAlive = 0;
//       }

//       draw(ctx) {
//         ctx.fillStyle = `rgba(255, 253, 245, ${this.alpha})`;
//         ctx.beginPath();

//         for (let i = 0; i <= this.points * 2; i++) {
//           const radius = i % 2 === 0 ? this.size : this.innerRadius;
//           const angle = (Math.PI * 2 * i) / (this.points * 2) + this.rotation;
//           const x = this.x + radius * Math.cos(angle);
//           const y = this.y + radius * Math.sin(angle);
//           if (i === 0) ctx.moveTo(x, y);
//           else ctx.lineTo(x, y);
//         }

//         ctx.closePath();
//         ctx.fill();
//       }

//       update(deltaTime) {
//         this.timeAlive += deltaTime;
        
//         // Grow to final size
//         if (this.size < this.finalSize) {
//           this.size = Math.min(this.finalSize, this.size + 0.1);
//         }
        
//         this.x += this.velocityX;
//         this.y += this.velocityY;
//         this.velocityX *= this.drag;
//         this.velocityY *= this.drag;
//         this.rotation += this.rotationSpeed;
        
//         // Fade out over time
//         if (this.timeAlive > 2000) {
//           this.alpha = Math.max(0, this.alpha - 0.01);
//         }
//       }
      
//       // Check if point is inside the content area
//       isInsideContentArea() {
//         return (
//           this.x > contentBounds.left &&
//           this.x < contentBounds.right &&
//           this.y > contentBounds.top &&
//           this.y < contentBounds.bottom
//         );
//       }
//     }

//     // Function to create stars outside the content area
//     const createStarOutsideContentArea = () => {
//       let x, y;
      
//       // Generate coordinates until we find one outside the content area
//       do {
//         x = Math.random() * window.innerWidth;
//         y = Math.random() * window.innerHeight;
//       } while (
//         x > contentBounds.left &&
//         x < contentBounds.right &&
//         y > contentBounds.top &&
//         y < contentBounds.bottom
//       );
      
//       return new Star(x, y);
//     };

//     // Handle scroll detection
//     const handleScroll = () => {
//       if (!isScrolling) {
//         setIsScrolling(true);
        
//         // Add a batch of stars when scrolling starts
//         for (let i = 0; i < 15; i++) {
//           starsRef.current.push(createStarOutsideContentArea());
//         }
//       }
      
//       // Reset scroll timer
//       clearTimeout(window.scrollTimer);
//       window.scrollTimer = setTimeout(() => {
//         setIsScrolling(false);
//       }, 150);
      
//       // Add stars during scroll
//       if (Math.random() > 0.5) {
//         starsRef.current.push(createStarOutsideContentArea());
//       }
//     };

//     // Animation loop
//     const animate = (timestamp) => {
//       const deltaTime = timestamp - lastTimeRef.current;
//       lastTimeRef.current = timestamp;
      
//       ctx.clearRect(0, 0, canvas.width, canvas.height);
      
//       // Update and draw stars
//       starsRef.current.forEach(star => {
//         star.update(deltaTime);
//         star.draw(ctx);
//       });
      
//       // Remove dead stars
//       starsRef.current = starsRef.current.filter(star => star.alpha > 0);
      
//       // Add new stars while scrolling
//       if (isScrolling && Math.random() > 0.7) {
//         starsRef.current.push(createStarOutsideContentArea());
//       }
      
//       animationRef.current = requestAnimationFrame(animate);
//     };

//     // Handle resize
//     const handleResize = () => {
//       canvas.width = window.innerWidth;
//       canvas.height = window.innerHeight;
      
//       // Update content boundaries on resize
//       contentBounds.left = window.innerWidth * 0.15;
//       contentBounds.top = window.innerHeight * 0.15;
//       contentBounds.right = window.innerWidth * 0.85;
//       contentBounds.bottom = window.innerHeight * 0.85;
//     };

//     // Mouse position tracking for velocity-based star creation
//     const handleMouseMove = (e) => {
//       if (isScrolling && Math.random() > 0.9) {
//         const x = e.clientX;
//         const y = e.clientY;
        
//         // Only create stars outside content area
//         if (
//           x < contentBounds.left ||
//           x > contentBounds.right ||
//           y < contentBounds.top ||
//           y > contentBounds.bottom
//         ) {
//           const star = new Star(x, y);
//           starsRef.current.push(star);
//         }
//       }
//     };

//     // Set up event listeners
//     window.addEventListener("scroll", handleScroll);
//     window.addEventListener("resize", handleResize);
//     window.addEventListener("mousemove", handleMouseMove);
    
//     // Start animation
//     animationRef.current = requestAnimationFrame(animate);
    
//     return () => {
//       window.removeEventListener("scroll", handleScroll);
//       window.removeEventListener("resize", handleResize);
//       window.removeEventListener("mousemove", handleMouseMove);
//       cancelAnimationFrame(animationRef.current);
//     };
//   }, [isScrolling]);

//   return (
//     <canvas
//       ref={canvasRef}
//       className="fixed top-0 left-0 w-full h-full z-0 pointer-events-none"
//     />
//   );
// }

// // Update this to visualize the content area boundary (for debugging)
// function ContentBoundaryVisualizer() {
//   const canvasRef = useRef(null);
  
//   useEffect(() => {
//     const canvas = canvasRef.current;
//     const ctx = canvas.getContext("2d");
    
//     if (!canvas || !ctx) return;
    
//     // Set canvas to full screen
//     canvas.width = window.innerWidth;
//     canvas.height = window.innerHeight;
    
//     const contentBounds = {
//       left: window.innerWidth * 0.15,
//       top: window.innerHeight * 0.15,
//       right: window.innerWidth * 0.85,
//       bottom: window.innerHeight * 0.85
//     };
    
//     // Draw boundary
//     ctx.strokeStyle = "rgba(0, 120, 255, 0.5)";
//     ctx.lineWidth = 2;
//     ctx.strokeRect(
//       contentBounds.left,
//       contentBounds.top,
//       contentBounds.right - contentBounds.left,
//       contentBounds.bottom - contentBounds.top
//     );
    
//     const handleResize = () => {
//       canvas.width = window.innerWidth;
//       canvas.height = window.innerHeight;
      
//       // Update and redraw on resize
//       contentBounds.left = window.innerWidth * 0.15;
//       contentBounds.top = window.innerHeight * 0.15;
//       contentBounds.right = window.innerWidth * 0.85;
//       contentBounds.bottom = window.innerHeight * 0.85;
      
//       ctx.strokeStyle = "rgba(0, 120, 255, 0.5)";
//       ctx.lineWidth = 2;
//       ctx.strokeRect(
//         contentBounds.left,
//         contentBounds.top,
//         contentBounds.right - contentBounds.left,
//         contentBounds.bottom - contentBounds.top
//       );
//     };
    
//     window.addEventListener("resize", handleResize);
    
//     return () => {
//       window.removeEventListener("resize", handleResize);
//     };
//   }, []);
  
//   return (
//     <canvas
//       ref={canvasRef}
//       className="fixed top-0 left-0 w-full h-full z-10 pointer-events-none"
//       style={{ display: "none" }} // Set to "block" for debugging
//     />
//   );
// }

// // Main component that combines both
// function BoundedStarEffect() {
//   return (
//     <>
//       <BoundedStarBackground />
//       <ContentBoundaryVisualizer />
//     </>
//   );
// }

// export default BoundedStarEffect;