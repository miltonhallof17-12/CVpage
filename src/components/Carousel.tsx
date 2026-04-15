"use client";

import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface Slide {
  image: string;
  title: string;
  description: string;
}

interface CarouselProps {
  slides: Slide[];
}

export function Carousel({ slides }: CarouselProps) {
  const [currentSlide, setCurrentSlide] = useState(0);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  // Auto-rotate carousel every 3 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide();
    }, 6000);

    return () => clearInterval(interval);
  }, [currentSlide]);

  return (
    <div className="relative">
      
      {/* Slides */}
      <div className="overflow-hidden rounded-lg">
        <motion.div
          className="flex"
          animate={{ x: `-${currentSlide * 100}%` }}
          transition={{
            type: "spring",
            stiffness: 40,
            damping: 25,
          }}
        >
          {slides.map((slide, index) => (
            <motion.div
              key={index}
              className="w-full shrink-0"
              initial={{ opacity: 0.5, scale: 0.95 }}
              animate={{
                opacity: index === currentSlide ? 1 : 0.5,
                scale: index === currentSlide ? 1 : 0.95,
              }}
              transition={{ duration: 0.4 }}
            >
              <div className="grid md:grid-cols-2 gap-8 items-center p-8">
                
                {/* Imagen */}
                <div className="aspect-video bg-muted rounded-lg overflow-hidden">
                  <img
                    src={slide.image}
                    alt={slide.title}
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Texto */}
                <div>
                  <h3 className="text-2xl font-bold mb-4">
                    {slide.title}
                  </h3>
                  <p className="text-muted-foreground">
                    {slide.description}
                  </p>
                </div>

              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Flechas */}
      <button
        onClick={prevSlide}
        className="absolute left-4 top-1/2 -translate-y-1/2 bg-background/80 backdrop-blur-sm rounded-full p-2 hover:bg-background transition-colors"
        aria-label="Previous slide"
      >
        <ChevronLeft className="w-6 h-6" />
      </button>

      <button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 -translate-y-1/2 bg-background/80 backdrop-blur-sm rounded-full p-2 hover:bg-background transition-colors"
        aria-label="Next slide"
      >
        <ChevronRight className="w-6 h-6" />
      </button>

      {/* Dots */}
      <div className="flex justify-center gap-2 mt-4">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`w-2 h-2 rounded-full transition-colors ${
              index === currentSlide
                ? "bg-primary"
                : "bg-muted-foreground/30"
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
}