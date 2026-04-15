"use client";

import { motion, useMotionValue, useSpring } from "framer-motion";
import { useEffect, useState } from "react";

interface Particle {
  id: number;
  x: number;
  y: number;
  size: number;
  baseX: number;
  baseY: number;
  floatX: number;
  floatY: number;
  floatSpeed: number;
}

export function InteractiveParticles() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [particles, setParticles] = useState<Particle[]>([]);

  // Smooth mouse tracking
  const mouseX = useSpring(useMotionValue(0), { stiffness: 100, damping: 30 });
  const mouseY = useSpring(useMotionValue(0), { stiffness: 100, damping: 30 });

  // Initialize particles
  useEffect(() => {
    const particleCount = 100;
    const newParticles: Particle[] = [];
    
    for (let i = 0; i < particleCount; i++) {
      const x = Math.random() * window.innerWidth;
      const y = Math.random() * window.innerHeight;
      newParticles.push({
        id: i,
        x,
        y,
        baseX: x,
        baseY: y,
        size: Math.random() * 4 + 2,
        floatX: Math.random() * 20 - 10,
        floatY: Math.random() * 20 - 10,
        floatSpeed: Math.random() * 3 + 2,
      });
    }
    
    setParticles(newParticles);
  }, []);

  // Track mouse movement
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [mouseX, mouseY]);

  return (
    <div className="absolute inset-0 pointer-events-none">
      {particles.map((particle) => {
        const distance = Math.sqrt(
          Math.pow(mousePosition.x - particle.baseX, 2) +
          Math.pow(mousePosition.y - particle.baseY, 2)
        );
        
        const maxDistance = 150;
        const force = Math.max(0, 1 - distance / maxDistance);
        const moveX = (mousePosition.x - particle.baseX) * force * 0.3;
        const moveY = (mousePosition.y - particle.baseY) * force * 0.3;

        return (
          <motion.div
            key={particle.id}
            className="absolute bg-white rounded-full"
            style={{
              width: particle.size,
              height: particle.size,
              left: particle.baseX,
              top: particle.baseY,
            }}
            animate={{
              x: [particle.floatX, -particle.floatX, particle.floatX],
              y: [particle.floatY, -particle.floatY, particle.floatY],
              opacity: 0.3 + force * 0.7,
              scale: 1 + force * 0.5,
            }}
            transition={{
              x: {
                duration: particle.floatSpeed,
                repeat: Infinity,
                repeatType: "reverse",
                ease: "easeInOut",
              },
              y: {
                duration: particle.floatSpeed + 1,
                repeat: Infinity,
                repeatType: "reverse",
                ease: "easeInOut",
              },
              opacity: {
                duration: 0.3,
              },
              scale: {
                duration: 0.3,
              },
            }}
          />
        );
      })}
    </div>
  );
}
