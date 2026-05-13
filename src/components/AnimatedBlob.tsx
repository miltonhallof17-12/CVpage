"use client";

import { useEffect, useState } from "react";

type AnimatedBlobProps = {
  className?: string;
  text?: string;
  viewBox?: string;
  points?: number;
  amplitude?: number;
  speed?: number;
  smoothing?: number;
  color?: string;
};

export default function AnimatedBlob({
  className = "",
  text = "Milton Hallof",
  viewBox = "0 0 500 500",

  points = 24,
  amplitude = 25,
  speed = 0.015,
  smoothing = 0.18,

  color = "#4A86FF",
}: AnimatedBlobProps) {

  const [path, setPath] = useState("");

  const baseRadius = 180;

  const centerX = 250;
  const centerY = 250;

  useEffect(() => {
    let frame = 0;
    let animationFrameId: number;

    const animate = () => {

      const generatedPoints = [];

      for (let i = 0; i < points; i++) {

        const angle =
          (Math.PI * 2 * i) / points;

        const wave1 =
          Math.sin(frame * speed + i * 0.8) *
          amplitude;

        const wave2 =
          Math.cos(frame * speed * 0.7 + i * 1.5) *
          amplitude *
          0.7;

        const wave3 =
          Math.sin(frame * speed * 1.3 + i * 2.2) *
          amplitude *
          0.5;

        const radius =
          baseRadius +
          wave1 +
          wave2 +
          wave3;

        const x =
          centerX + Math.cos(angle) * radius;

        const y =
          centerY + Math.sin(angle) * radius;

        generatedPoints.push({ x, y });
      }

      let d = `
        M
        ${generatedPoints[0].x}
        ${generatedPoints[0].y}
      `;

      for (let i = 0; i < generatedPoints.length; i++) {

        const current =
          generatedPoints[i];

        const next =
          generatedPoints[
            (i + 1) % generatedPoints.length
          ];

        const prev =
          generatedPoints[
            (i - 1 + generatedPoints.length) %
            generatedPoints.length
          ];

        const nextNext =
          generatedPoints[
            (i + 2) % generatedPoints.length
          ];

        const cp1x =
          current.x +
          (next.x - prev.x) *
          smoothing;

        const cp1y =
          current.y +
          (next.y - prev.y) *
          smoothing;

        const cp2x =
          next.x -
          (nextNext.x - current.x) *
          smoothing;

        const cp2y =
          next.y -
          (nextNext.y - current.y) *
          smoothing;

        d += `
          C
          ${cp1x} ${cp1y},
          ${cp2x} ${cp2y},
          ${next.x} ${next.y}
        `;
      }

      d += " Z";

      setPath(d);

      frame++;

      animationFrameId =
        requestAnimationFrame(animate);
    };

    animate();

    return () =>
      cancelAnimationFrame(animationFrameId);

  }, []);

  return (
    <svg
      viewBox={viewBox}
      className={`w-full h-full ${className}`}
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d={path}
        fill={color}
      />

      <text
        x="250"
        y="260"
        textAnchor="middle"
        dominantBaseline="middle"
        fontSize="42"
        fontWeight="bold"
        fill="white"
        className="select-none"
      >
        {text}
      </text>
    </svg>
  );
}