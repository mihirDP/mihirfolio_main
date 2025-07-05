"use client";
import { Navbar } from "@/components/Navbar";
import ProjectCarousel from "@/components/ProjectCarousal";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  ArrowRight,
  Award,
  CircleFadingPlus,
  CuboidIcon as Cube,
  Mail,
  MapPin,
  Play,
  Target,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function Portfolio() {
  const [open, setOpen] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    // Trigger animations after component mounts
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <div className={isLoaded ? "loaded" : ""}>
        <Navbar />
        <div className="min-h-screen bg-animated-gradient">
          {/* Hero Section */}
          <section className="relative min-h-screen flex items-center justify-center overflow-hidden px-4 sm:px-6 lg:px-8">
            {/* Background blur effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-pink-500/10 to-purple-500/10 backdrop-blur-3xl"></div>

            <div className="container mx-auto relative z-10 max-w-7xl">
              {/* Desktop Layout: 3-column grid */}
              <div className="hidden lg:grid lg:grid-cols-[1fr_24px_1fr] items-center gap-8 xl:gap-12">
                {/* Left Column: Content */}
                <div className="space-y-6 text-left">
                  <h1
                    className={`text-3xl xl:text-5xl 2xl:text-6xl font-bold text-white leading-tight animate-on-load ${
                      isLoaded ? "animate-slide-in-left animate-delay-300" : ""
                    }`}
                  >
                    I create{" "}
                    <span className="bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
                      3D worlds
                    </span>
                    , assets, and animations.
                  </h1>
                  <p
                    className={`text-lg xl:text-xl text-gray-300 max-w-2xl animate-on-load ${
                      isLoaded ? "animate-slide-in-left animate-delay-500" : ""
                    }`}
                  >
                    Bringing imagination to life through 3D design, modeling,
                    and animation.
                  </p>

                  <div
                    className={`animate-on-load ${
                      isLoaded ? "animate-slide-in-left animate-delay-700" : ""
                    }`}
                  >
                    <Button
                      size="lg"
                      onClick={() => (window.location.href = "/projects")}
                      className="bg-gradient-to-r from-cyan-500 to-purple-500 hover:from-cyan-600 hover:to-purple-600 text-white border-0 group text-base px-6 py-3"
                    >
                      Explore My Work
                      <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                    </Button>
                  </div>
                </div>

                {/* Middle Column: Divider */}
                <div
                  className={`h-80 xl:h-96 w-px bg-white/20 mx-auto animate-on-load ${
                    isLoaded ? "animate-fade-in animate-delay-600" : ""
                  }`}
                />

                {/* Right Column: Image + Socials */}
                <div className="flex flex-col items-center space-y-6">
                  {/* Profile Image */}
                  <div
                    className={`relative w-64 h-64 xl:w-80 xl:h-80 animate-on-load ${
                      isLoaded ? "animate-scale-in animate-delay-400" : ""
                    }`}
                  >
                    <div className="absolute inset-0 rounded-full bg-gradient-to-r from-cyan-400 to-purple-400 blur-[80px] scale-125 opacity-80 animate-blob z-0"></div>
                    <div className="relative w-full h-full overflow-hidden border border-white/20 backdrop-blur-sm bg-white/10 rounded-full z-10">
                      <Image
                        src="/mihir_01.png"
                        alt="Professional Portrait"
                        fill
                        className="object-cover transition-transform duration-1000 ease-in-out hover:scale-110"
                      />
                    </div>
                  </div>

                  {/* Social Icons */}
                  <div className="flex flex-col space-y-3 xl:flex-row xl:space-y-0 xl:space-x-4">
                    {[
                      {
                        name: "LinkedIn",
                        href: "https://www.linkedin.com/in/mihir-patil-765806198/",
                        logo: "/linkedin-whitecom.png",
                      },
                      {
                        name: "ArtStation",
                        href: "https://www.artstation.com/themihirpatil11",
                        logo: "/artstation-whitecom.png",
                      },
                      {
                        name: "Behance",
                        href: "https://www.behance.net/mihirpatil8",
                        logo: "/behance-163-whitecom.png",
                      },
                    ].map((social, index) => (
                      <Link
                        key={index}
                        href={social.href}
                        className={`px-4 py-2 bg-white/10 backdrop-blur-md border border-white/20 rounded-full text-white hover:bg-white/20 hover:scale-105 transition-all duration-300 flex items-center space-x-2 animate-on-load ${
                          isLoaded ? "animate-slide-in-right" : ""
                        }`}
                        style={{ animationDelay: `${0.8 + index * 0.1}s` }}
                      >
                        <Image
                          src={social.logo}
                          alt={social.name}
                          width={20}
                          height={20}
                          className="object-contain"
                        />
                        <span className="text-sm">{social.name}</span>
                      </Link>
                    ))}
                  </div>
                </div>
              </div>

              {/* Mobile & Tablet Layout: stacked content */}
              <div className="lg:hidden flex flex-col items-center space-y-8 sm:space-y-12 text-center">
                {/* Profile Image */}
                <div
                  className={`relative w-48 h-48 sm:w-64 sm:h-64 md:w-72 md:h-72 animate-on-load ${
                    isLoaded ? "animate-scale-in animate-delay-200" : ""
                  }`}
                >
                  <div className="absolute inset-0 rounded-full bg-gradient-to-r from-cyan-400 to-purple-400 blur-[60px] sm:blur-[80px] scale-125 opacity-80 animate-blob z-0"></div>
                  <div className="relative w-full h-full overflow-hidden border border-white/20 backdrop-blur-sm bg-white/10 rounded-full z-10">
                    <Image
                      src="/mihir_01.png"
                      alt="Professional Portrait"
                      fill
                      className="object-cover transition-transform duration-1000 ease-in-out hover:scale-110"
                    />
                  </div>
                </div>

                {/* Content */}
                <div className="space-y-6 max-w-4xl">
                  <h1
                    className={`text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white leading-tight animate-on-load ${
                      isLoaded ? "animate-fade-in-up animate-delay-400" : ""
                    }`}
                  >
                    I create{" "}
                    <span className="bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
                      3D worlds
                    </span>
                    , assets, and animations.
                  </h1>
                  <p
                    className={`text-base sm:text-lg md:text-xl text-gray-300 animate-on-load px-4 ${
                      isLoaded ? "animate-fade-in-up animate-delay-600" : ""
                    }`}
                  >
                    Bringing imagination to life through 3D design, modeling,
                    and animation.
                  </p>

                  <div
                    className={`animate-on-load ${
                      isLoaded ? "animate-fade-in-up animate-delay-800" : ""
                    }`}
                  >
                    <Button
                      size="lg"
                      onClick={() => (window.location.href = "/projects")}
                      className="bg-gradient-to-r from-cyan-500 to-purple-500 hover:from-cyan-600 hover:to-purple-600 text-white border-0 group text-base px-6 py-3"
                    >
                      Explore My Work
                      <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                    </Button>
                  </div>
                </div>

                {/* Social Icons */}
                <div className="flex flex-col sm:flex-row justify-center space-y-3 sm:space-y-0 sm:space-x-4 px-4">
                  {[
                    {
                      name: "LinkedIn",
                      href: "https://www.linkedin.com/in/mihir-patil-765806198/",
                      logo: "/linkedin-whitecom.png",
                    },
                    {
                      name: "ArtStation",
                      href: "https://www.artstation.com/themihirpatil11",
                      logo: "/artstation-whitecom.png",
                    },
                    {
                      name: "Behance",
                      href: "https://www.behance.net/mihirpatil8",
                      logo: "/behance-163-whitecom.png",
                    },
                  ].map((social, index) => (
                    <Link
                      key={index}
                      href={social.href}
                      className={`px-4 py-2 bg-white/10 backdrop-blur-md border border-white/20 rounded-full text-white hover:bg-white/20 hover:scale-105 transition-all duration-300 flex items-center justify-center space-x-2 animate-on-load ${
                        isLoaded ? "animate-fade-in-up" : ""
                      }`}
                      style={{ animationDelay: `${1.0 + index * 0.1}s` }}
                    >
                      <Image
                        src={social.logo}
                        alt={social.name}
                        width={20}
                        height={20}
                        className="object-contain"
                      />
                      <span className="text-sm">{social.name}</span>
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </section>

          {/* Expertise Cards */}
          <section className="py-16 sm:py-20 relative px-4 sm:px-6 lg:px-8">
            <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-[300px] sm:w-[400px] md:w-[500px] origin-bottom scale-y-50 border-b border-white/50" />

            <div className="container mx-auto">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 max-w-7xl mx-auto">
                {[
                  {
                    icon: <MapPin className="h-6 w-6 sm:h-8 sm:w-8" />,
                    title: "3D Environment",
                    description:
                      "Creating immersive worlds and believable atmospheric environments",
                  },
                  {
                    icon: <Cube className="h-6 w-6 sm:h-8 sm:w-8" />,
                    title: "3D Modeling",
                    description:
                      "Crafting detailed assets and props with precision",
                  },
                  {
                    icon: <Play className="h-6 w-6 sm:h-8 sm:w-8" />,
                    title: "Animation",
                    description: "Bringing static models to life",
                  },
                  {
                    icon: <Play className="h-6 w-6 sm:h-8 sm:w-8" />,
                    title: "Digital Sculpting",
                    description: "Sculpting sculptures; even humans!",
                  },
                ].map((item, index) => (
                  <Card
                    key={index}
                    className={`bg-white/10 backdrop-blur-md border-white/20 hover:bg-white/15 transition-all duration-300 group animate-on-load ${
                      isLoaded ? "animate-fade-in-up" : ""
                    }`}
                    style={{ animationDelay: `${1.2 + index * 0.2}s` }}
                  >
                    <CardContent className="p-6 sm:p-8 text-center space-y-3 sm:space-y-4">
                      <div className="text-cyan-400 group-hover:text-purple-400 transition-colors mx-auto w-fit">
                        {item.icon}
                      </div>
                      <h3 className="text-lg sm:text-xl font-semibold text-white">
                        {item.title}
                      </h3>
                      <p className="text-sm sm:text-base text-gray-300">
                        {item.description}
                      </p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </section>

          {/* Software & Tools */}
          <section className="py-16 sm:py-20 bg-black/20 px-4 sm:px-6 lg:px-8">
            <div className="container mx-auto">
              <h2
                className={`text-2xl sm:text-3xl md:text-4xl font-bold text-white text-center mb-8 sm:mb-12 animate-on-load ${
                  isLoaded ? "animate-fade-in-up animate-delay-1000" : ""
                }`}
              >
                Software & Tools
              </h2>

              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-7 gap-4 sm:gap-6 max-w-6xl mx-auto">
                {[
                  { name: "Blender", logo: "blender-whitecom.png" },
                  { name: "Maya", logo: "maya-svgrepo-com.png" },
                  { name: "ZBrush", logo: "zbrushwhite.png" },
                  { name: "Substance Painter", logo: "subpainter.png" },
                  { name: "Unreal Engine", logo: "UEWhite.png" },
                  { name: "Marvelous Designer", logo: "Marvelous-design.svg" },
                  { name: "3DS Max", logo: "3Ds_3.png" },
                ].map((tool, index) => (
                  <div
                    key={index}
                    className={`bg-white/10 backdrop-blur-md border border-white/20 rounded-xl p-4 sm:p-6 hover:bg-white/20 hover:scale-105 transition-all duration-300 group cursor-pointer animate-on-load ${
                      isLoaded ? "animate-scale-in" : ""
                    }`}
                    style={{ animationDelay: `${1.2 + index * 0.1}s` }}
                  >
                    <div className="w-10 h-10 sm:w-12 sm:h-12 md:w-16 md:h-16 mx-auto mb-2 sm:mb-3 flex items-center justify-center">
                      <Image
                        src={tool.logo}
                        alt={tool.name}
                        width={48}
                        height={48}
                        className="object-contain max-w-full max-h-full"
                      />
                    </div>
                    <p className="text-white text-xs sm:text-sm font-medium text-center group-hover:text-cyan-300 transition-colors">
                      {tool.name}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* About Me */}
          <section className="py-16 sm:py-20 bg-black/20 px-4 sm:px-6 lg:px-8">
            <div className="h-px w-[300px] sm:w-[400px] md:w-[500px] bg-white/20 backdrop-blur-sm mb-12 sm:mb-20 mx-auto" />
            <div className="container mx-auto">
              <h2
                className={`text-2xl sm:text-3xl md:text-4xl font-bold text-white text-center mb-12 sm:mb-16 animate-on-load ${
                  isLoaded ? "animate-fade-in-up animate-delay-1000" : ""
                }`}
              >
                About Me
              </h2>

              <div className="grid lg:grid-cols-2 gap-8 sm:gap-12 max-w-6xl mx-auto">
                <div
                  className={`space-y-4 sm:space-y-6 animate-on-load ${
                    isLoaded ? "animate-slide-in-left animate-delay-1200" : ""
                  }`}
                >
                  <h3 className="text-xl sm:text-2xl font-semibold text-white mb-4">
                    My Journey
                  </h3>
                  <div className="text-gray-300 space-y-3 sm:space-y-4 text-sm sm:text-base">
                    <p>
                      With over years of experience in 3D art and 3D Environment
                      Designing, I've had the privilege of working on diverse
                      projects ranging from working on mythical divine beings to
                      3D environments and animated shorts aka reels.
                    </p>
                    <p>
                      My passion for creating digital environments drives me to
                      constantly push the boundaries of what's possible in 3D
                      art. I believe that great 3D work combines technical
                      expertise with artistic vision.
                    </p>
                    <p>
                      When I'm not crafting digital worlds, you'll find me
                      exploring new techniques, experimenting with emerging
                      technologies, and sharing knowledge with the 3D community.
                    </p>
                  </div>
                </div>

                <div
                  className={`space-y-4 sm:space-y-6 animate-on-load ${
                    isLoaded ? "animate-slide-in-right animate-delay-1200" : ""
                  }`}
                >
                  <h3 className="text-xl sm:text-2xl font-semibold text-white mb-4">
                    Skills & Achievements
                  </h3>
                  <div className="space-y-3 sm:space-y-4">
                    <div className="flex items-center space-x-3">
                      <Award className="h-4 w-4 sm:h-5 sm:w-5 text-cyan-400 flex-shrink-0" />
                      <span className="text-gray-300 text-sm sm:text-base">
                        Quick in adapting according to environments
                      </span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <Target className="h-4 w-4 sm:h-5 sm:w-5 text-cyan-400 flex-shrink-0" />
                      <span className="text-gray-300 text-sm sm:text-base">
                        Worked on variety of Personal Projects
                      </span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <CircleFadingPlus className="h-4 w-4 sm:h-5 sm:w-5 text-cyan-400 flex-shrink-0" />
                      <span className="text-gray-300 text-sm sm:text-base">
                        Specialized in Realtime Rendering
                      </span>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <h4 className="text-base sm:text-lg font-medium text-white">
                      Core Competencies
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {[
                        "Environment Designing",
                        "3D Modeling",
                        "Texturing Painting",
                        "Prop Designing",
                        "Animation",
                        "3D Costume Designing",
                        "Digital Sculpting",
                        "Game Assets",
                        "...",
                      ].map((skill, index) => (
                        <Badge
                          key={index}
                          variant="secondary"
                          className={`bg-white/10 text-white border-white/20 hover:text-black text-xs sm:text-sm animate-on-load ${
                            isLoaded ? "animate-fade-in" : ""
                          }`}
                          style={{ animationDelay: `${1.4 + index * 0.1}s` }}
                        >
                          {skill}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Projects Showcase */}
          <section className="py-16 sm:py-20 px-4 sm:px-6 lg:px-8">
            <div className="container mx-auto">
              <h2
                className={`text-2xl sm:text-3xl md:text-4xl font-bold text-white text-center mb-12 sm:mb-16 flex justify-center items-center gap-4 animate-on-load ${
                  isLoaded ? "animate-fade-in-up animate-delay-1000" : ""
                }`}
              >
                <Award className="h-6 w-6 sm:h-8 sm:w-8 text-cyan-400" />
                Top Featured
              </h2>

              <div
                className={`animate-on-load ${
                  isLoaded ? "animate-fade-in-up animate-delay-1200" : ""
                }`}
              >
                <ProjectCarousel />
              </div>
            </div>
          </section>

          {/* Contact Section */}
          <section className="py-16 sm:py-20 bg-black/20 px-4 sm:px-6 lg:px-8">
            <div className="container mx-auto">
              <div className="max-w-2xl mx-auto">
                <h2
                  className={`text-2xl sm:text-3xl md:text-4xl font-bold text-white text-center mb-8 sm:mb-12 animate-on-load ${
                    isLoaded ? "animate-fade-in-up animate-delay-1000" : ""
                  }`}
                >
                  Let's Create Something Amazing
                </h2>

                <Card
                  className={`bg-white/10 backdrop-blur-md border-white/20 animate-on-load ${
                    isLoaded ? "animate-scale-in animate-delay-1200" : ""
                  }`}
                >
                  <CardContent className="p-6 sm:p-8">
                    <form className="space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
                        <div>
                          <Input
                            placeholder="Your Name"
                            className="bg-white/10 border-white/20 text-white placeholder:text-gray-400 focus:border-cyan-400 h-10 sm:h-11"
                          />
                        </div>
                        <div>
                          <Input
                            type="email"
                            placeholder="Your Email"
                            className="bg-white/10 border-white/20 text-white placeholder:text-gray-400 focus:border-cyan-400 h-10 sm:h-11"
                          />
                        </div>
                      </div>
                      <div>
                        <Textarea
                          placeholder="Tell me about your project..."
                          rows={4}
                          className="bg-white/10 border-white/20 text-white placeholder:text-gray-400 focus:border-cyan-400 text-sm sm:text-base"
                        />
                      </div>
                      <Button
                        type="submit"
                        className="w-full bg-gradient-to-r from-cyan-500 to-purple-500 hover:from-cyan-600 hover:to-purple-600 text-white border-0 h-10 sm:h-11"
                      >
                        <Mail className="mr-2 h-4 w-4" />
                        Send Message
                      </Button>
                    </form>

                    <div className="mt-6 sm:mt-8 pt-6 sm:pt-8 border-t border-white/20 text-center">
                      <p className="text-gray-300 mb-3 sm:mb-4 text-sm sm:text-base">
                        Or reach out directly:
                      </p>
                      <Link
                        href="mailto:patilmi4441@gmail.com"
                        className="text-cyan-400 hover:text-cyan-300 flex items-center justify-center space-x-2 text-sm sm:text-base"
                      >
                        <Mail className="h-4 w-4" />
                        <span>patilmi4441@gmail.com</span>
                      </Link>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </section>

          {/* Footer */}
          <footer
            className={`py-8 sm:py-12 bg-black/40 backdrop-blur-md border-t border-white/10 px-4 sm:px-6 lg:px-8 animate-on-load ${
              isLoaded ? "animate-fade-in animate-delay-1400" : ""
            }`}
          >
            <div className="container mx-auto">
              <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
                <div className="text-gray-400 text-sm sm:text-base text-center md:text-left">
                  <p>
                    &copy; {new Date().getFullYear()} Mihir Patil. All rights
                    reserved.
                  </p>
                </div>

                <div className="flex flex-wrap justify-center space-x-4 sm:space-x-6">
                  {[
                    {
                      name: "ArtStation",
                      href: "https://www.artstation.com/themihirpatil11",
                    },
                    {
                      name: "Behance",
                      href: "https://www.behance.net/mihirpatil8",
                    },
                    {
                      name: "LinkedIn",
                      href: "https://www.linkedin.com/in/mihir-patil-765806198/",
                    },
                  ].map((social, index) => (
                    <Link
                      key={index}
                      href={social.href}
                      className="text-gray-400 hover:text-cyan-400 transition-colors text-sm sm:text-base"
                    >
                      {social.name}
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </footer>
        </div>
      </div>
    </>
  );
}
