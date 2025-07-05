"use client";

import { Navbar } from "@/components/Navbar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowLeft } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";

export default function About() {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  const tools = [
    { name: "Unreal Engine", logo: "/UEWhite.png" },
    { name: "Blender", logo: "/blender-whitecom.png" },
    { name: "Substance Painter", logo: "/subpainter.png" },
    { name: "Marvelous Designer", logo: "/Marvelous-design.svg" },
    { name: "3DS Max", logo: "/3Ds_3.png" },
    { name: "Maya", logo: "/maya-svgrepo-com.png" },
    { name: "ZBrush", logo: "/zbrushwhite.png" },
  ];

  return (
    <div
      className={`min-h-screen bg-animated-gradient ${
        isLoaded ? "loaded" : ""
      }`}
    >
      <div className="container mx-auto px-4 py-20">
        {/* Back Button */}
        <Link href="/">
          <Button
            variant="ghost"
            className="text-white hover:text-white transition-all ease-in-out px-4 py-2 rounded-full border-white/10 hover:bg-white/20 absolute top-8 left-8"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Home
          </Button>
        </Link>
        <Navbar />

        {/* Hero Section */}
        <section className="relative py-20">
          <div className="absolute inset-0 "></div>

          <div className="relative z-10 max-w-4xl mx-auto text-center space-y-8">
            <h1
              className={`text-4xl md:text-6xl font-bold text-white leading-tight ${
                isLoaded ? "animate-fade-in-up animate-delay-300" : ""
              }`}
            >
              About Me
            </h1>
            <p
              className={`text-xl text-gray-300 ${
                isLoaded ? "animate-fade-in-up animate-delay-500" : ""
              }`}
            >
              Hi, I'm Mihir, a 3D Artist and Digital Creator passionate about
              building immersive environments, dynamic characters, and cinematic
              animations.
            </p>
          </div>
        </section>

        {/* Main Content */}
        <div className="grid md:grid-cols-2 gap-12 max-w-6xl mx-auto py-12">
          {/* Left Column */}
          <div
            className={`space-y-8 ${
              isLoaded ? "animate-slide-in-left animate-delay-700" : ""
            }`}
          >
            <section className="space-y-4">
              <h2 className="text-2xl font-bold text-white">What Drives Me</h2>
              <p className="text-gray-300">
                I've always been fascinated by the storytelling power of
                visuals. Whether it's a tranquil lavender field or a powerful
                deity character, my goal is to create experiences that evoke
                emotion and curiosity.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-bold text-white">
                Creative Approach
              </h2>
              <div className="space-y-3">
                <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-lg p-4">
                  <h3 className="text-cyan-400 font-semibold">
                    Lighting & Composition
                  </h3>
                  <p className="text-gray-300">
                    Creating cinematic visual moods.
                  </p>
                </div>
                <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-lg p-4">
                  <h3 className="text-cyan-400 font-semibold">
                    Detail-Oriented Models
                  </h3>
                  <p className="text-gray-300">
                    Combining technical precision with artistic expression.
                  </p>
                </div>
                <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-lg p-4">
                  <h3 className="text-cyan-400 font-semibold">
                    Stylized & Realistic Aesthetics
                  </h3>
                  <p className="text-gray-300">
                    Depending on the project's narrative.
                  </p>
                </div>
              </div>
            </section>
          </div>

          {/* Right Column */}
          <div
            className={`space-y-8 ${
              isLoaded ? "animate-slide-in-right animate-delay-700" : ""
            }`}
          >
            <section className="space-y-4">
              <h2 className="text-2xl font-bold text-white">Tools I Use</h2>
              <div className="grid grid-cols-2 gap-4">
                {tools.map((tool, index) => (
                  <div
                    key={index}
                    className="bg-white/10 backdrop-blur-md border border-white/20 rounded-lg p-4 hover:bg-white/20 transition-all duration-300 flex items-center space-x-3"
                  >
                    <Image
                      src={tool.logo}
                      alt={tool.name}
                      width={32}
                      height={32}
                      className="object-contain"
                    />
                    <span className="text-white">{tool.name}</span>
                  </div>
                ))}
              </div>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-bold text-white">
                Let's Work Together
              </h2>
              <p className="text-gray-300">
                I'm open to collaborations, freelance projects, and creative
                discussions.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link
                  href="https://www.linkedin.com/in/mihir-patil-765806198/"
                  target="_blank"
                >
                  <Button
                    variant="outline"
                    className="bg-white/10 text-white border-white/20 hover:bg-white/20 hover:text-white p-2"
                  >
                    <Image
                      src="/linkedin-whitecom.png"
                      alt="LinkedIn"
                      width={24}
                      height={24}
                      className="object-contain"
                    />
                  </Button>
                </Link>
                <Link
                  href="https://www.artstation.com/themihirpatil11"
                  target="_blank"
                >
                  <Button
                    variant="outline"
                    className="bg-white/10 text-white border-white/20 hover:bg-white/20 hover:text-white p-2"
                  >
                    <Image
                      src="/artstation-whitecom.png"
                      alt="ArtStation"
                      width={24}
                      height={24}
                      className="object-contain"
                    />
                  </Button>
                </Link>
                <Link
                  href="https://www.instagram.com/mihirpatil_"
                  target="_blank"
                >
                  <Button
                    variant="outline"
                    className="bg-white/10 text-white border-white/20 hover:bg-white/20 hover:text-white p-2"
                  >
                    <Image
                      src="/instagram-whitecom.png"
                      alt="Instagram"
                      width={30}
                      height={30}
                      className="object-contain"
                    />
                  </Button>
                </Link>
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}
