

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




