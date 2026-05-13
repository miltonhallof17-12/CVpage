"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

import AnimatedBlob from "./AnimatedBlob";
import { InteractiveParticles } from "./InteractiveParticles";

export default function Hero() {
  const ref = useRef(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const scale = useTransform(
    scrollYProgress,
    [0, 1],
    [1, 1.2]
  );

  const opacity = useTransform(
    scrollYProgress,
    [0, 0.7],
    [1, 0]
  );

  const y = useTransform(
    scrollYProgress,
    [0, 1],
    [0, 100]
  );

  return (
    <section
      ref={ref}
      className="h-[200vh] relative"
    >
      <div className="sticky top-0 h-screen overflow-hidden">

        <motion.div
          style={{ scale }}
          className="absolute inset-0 will-change-transform flex items-center justify-center"
        >
          <AnimatedBlob
            className="w-full h-full"
            amplitude={22}
            speed={0.015}
            smoothing={0.18}
            color="#4A86FF"
            text="Milton Hallof"
            viewBox="0 0 500 500"
            points={22}
          />
        </motion.div>

        <InteractiveParticles color="bg-white" />

        <motion.div
          style={{ opacity, y }}
          className="absolute inset-0 flex items-center justify-center"
        />
      </div>
    </section>
  );
}