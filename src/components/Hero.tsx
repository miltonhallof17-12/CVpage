"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import Image from "next/image";
import { InteractiveParticles } from "./InteractiveParticles";

export default function Hero() {
  const ref = useRef(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  // Animaciones fluidas (GPU friendly)
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.2]);
  const opacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);
  const y = useTransform(scrollYProgress, [0, 1], [0, 100]);

  return (
    <section ref={ref} className="h-[200vh] relative">
      <div className="sticky top-0 h-screen overflow-hidden">

        {/* Background */}
        <motion.div
          style={{ scale }}
          className="absolute inset-0 will-change-transform"
        >
          <Image
            src="/Hero.jpg"
            alt="background"
            fill
            priority
            className="object-cover"
          />
        </motion.div>

        {/* Interactive Particles */}
        <InteractiveParticles />

        {/* Overlay (mejora contraste) */}
        <div className="absolute inset-0 bg-black/30" />

        {/* Content */}
        <motion.div
          style={{ opacity, y }}
          className="absolute inset-0 flex items-center justify-center"
        >
          <h1 className="text-[clamp(60px,15vw,180px)] font-bold text-white uppercase tracking-tight">
            Milton Hallof
          </h1>
        </motion.div>

      </div>
    </section>
  );
}