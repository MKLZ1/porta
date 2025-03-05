import React, { useEffect, useRef, useCallback } from 'react';
import './ParticleBackground.css';

class Particle {
  constructor() {
    this.reset();
  }

  reset() {
    this.x = Math.random() * window.innerWidth;
    this.y = Math.random() * window.innerHeight;
    this.vx = 0;
    this.vy = 0;
    this.accelX = 0;
    this.accelY = 0;
    this.life = Math.random() * 1000 + 1000;
    this.maxLife = this.life;
    this.alpha = 1;
    this.size = Math.random() * 2;
  }

  update(deltaTime) {
    this.vx += this.accelX;
    this.vy += this.accelY;
    this.x += this.vx;
    this.y += this.vy;
    this.life -= deltaTime;
  }

  isAlive() {
    return this.life >= 0;
  }
}

const ParticleBackground = () => {
  const canvasRef = useRef(null);
  const particles = useRef([]);
  const animationFrameId = useRef(null);

  const setupCanvas = useCallback(() => {
    const canvas = canvasRef.current;
    canvas.width = Math.ceil(window.innerWidth);
    canvas.height = Math.ceil(window.innerHeight);
    return canvas.getContext('2d');
  }, []);

  const initializeParticles = useCallback((count = 200) => {
    particles.current = Array.from({ length: count }, () => new Particle());
  }, []);

  const updateParticles = useCallback((ctx, deltaTime) => {
    ctx.fillStyle = '#0F172A';
    ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);

    particles.current.forEach(particle => {
      if (!particle.isAlive()) {
        particle.reset();
      }

      particle.accelY = (Math.random() - 0.5) * 0.008;
      
      particle.alpha = particle.life > particle.maxLife / 2 
        ? 1 - particle.life / particle.maxLife 
        : particle.life / particle.maxLife;

      particle.update(deltaTime);

      ctx.fillStyle = `rgba(255, 255, 255, ${particle.alpha})`;
      ctx.beginPath();
      ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
      ctx.fill();
      ctx.closePath();
    });
  }, []);

  const handleResize = useCallback(() => {
    const ctx = setupCanvas();
    ctx.imageSmoothingEnabled = false;
  }, [setupCanvas]);

  const render = useCallback((time = 0) => {
    const ctx = canvasRef.current?.getContext('2d');
    if (!ctx) return;

    const deltaTime = 4; // Aproximación de tiempo delta
    updateParticles(ctx, deltaTime);
    animationFrameId.current = requestAnimationFrame(render);
  }, [updateParticles]);

  useEffect(() => {
    const ctx = setupCanvas();
    if (!ctx) return;

    ctx.imageSmoothingEnabled = false;
    initializeParticles();
    render();

    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId.current);
    };
  }, [setupCanvas, initializeParticles, handleResize, render]);

  return (
    <canvas 
      ref={canvasRef}
      className="particle-canvas"
    />
  );
};

export default ParticleBackground