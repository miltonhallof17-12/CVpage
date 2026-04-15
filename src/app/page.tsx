"use client";

import { useState } from "react";
import Hero from "@/components/Hero";
import WetPaintButton  from "@/components/GlowingButtons";
import CoverflowSwiper from "@/components/CoverflowSwiper";
import { AboutSection } from "@/components/AboutSection";
import { SearchBar } from "@/components/SearchBar";
import { ProjectsGrid } from "@/components/ProjectsGrid";

export default function Home() {
  const [searchTerm, setSearchTerm] = useState("");

  const slides = [
    {
      id: 1,
      image: "/api/placeholder/800/400",
      title: "Project One",
      description: "Amazing web design project showcasing modern techniques"
    },
    {
      id: 2,
      image: "/api/placeholder/800/400",
      title: "Project Two", 
      description: "Responsive design with excellent user experience"
    },
    {
      id: 3,
      image: "/api/placeholder/800/400",
      title: "Project Three",
      description: "Creative solution for complex business requirements"
    }
  ];

  const projects = [
    {
      id: 1,
      title: "E-commerce Platform",
      image: "/api/placeholder/300/200",
      description: "Modern online shopping experience"
    },
    {
      id: 2,
      title: "Corporate Website",
      image: "/api/placeholder/300/200", 
      description: "Professional business presence"
    },
    {
      id: 3,
      title: "Mobile App Design",
      image: "/api/placeholder/300/200",
      description: "Intuitive mobile interface"
    },
    {
      id: 4,
      title: "Brand Identity",
      image: "/api/placeholder/300/200",
      description: "Complete visual branding solution"
    }
  ];

  const filteredProjects = projects.filter(project =>
    project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    project.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-background">
      <Hero />
      
      
      <section className="w-full overflow-hidden mt-16">
        <CoverflowSwiper />
      </section>

      <section className="max-w-6xl mx-auto px-4">
        <AboutSection />
      </section>

      <div className="flex justify-center">
        <WetPaintButton className="px-8 py-4 text-lg mb-12">
          Contact Me
        </WetPaintButton>
      </div>

      <section className="max-w-4xl mx-auto px-4 mb-12">
        <SearchBar searchTerm={searchTerm} onSearchChange={setSearchTerm} />
      </section>

      <section className="max-w-6xl mx-auto px-4 pb-16">
        <ProjectsGrid projects={filteredProjects} />
      </section>
    </div>
  );
}