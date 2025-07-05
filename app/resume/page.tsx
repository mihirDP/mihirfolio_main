"use client";

import { Button } from "@/components/ui/button";
import { ArrowLeft, Download } from "lucide-react";
import Link from "next/link";
import { useState, useEffect } from "react";

export default function ResumePage() {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen bg-animated-gradient relative">
      {/* Background blur effect */}
      <div className="absolute inset-0 bg-gradient-to-r from-pink-500/10 to-purple-500/10 backdrop-blur-3xl"></div>

      {/* Back to Home Button */}
      <div className="fixed top-6 left-6 z-50">
        <Link href="/">
          <Button
            variant="ghost"
            className="text-white hover:text-white transition-all ease-in-out px-4 py-2 rounded-full border border-white/10 hover:bg-white/20"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Home
          </Button>
        </Link>
      </div>

      {/* Floating Download Button */}
      <div className="fixed bottom-6 right-6 z-50">
        <Link href="/Resume/Mihir_Devanand_Patil_Resume.pdf" target="_blank">
          <Button
            className="bg-gradient-to-r from-cyan-500 to-purple-500 hover:from-cyan-600 hover:to-purple-600 text-white border-0 group"
          >
            <Download className="mr-2 h-4 w-4 group-hover:translate-y-0.5 transition-transform" />
            Download PDF
          </Button>
        </Link>
      </div>

      {/* Resume Content */}
      <div className="container mx-auto px-4 py-20 relative z-10">
        <div className={`prose prose-invert max-w-4xl mx-auto bg-white/10 backdrop-blur-md rounded-xl p-8 border border-white/20 shadow-xl ${isLoaded ? 'animate-fade-in-up' : 'opacity-0'}`}>
          <div className="markdown-content text-white">
            <h1 className="text-4xl font-bold text-center mb-4 text-white">MIHIR DEVANAND PATIL</h1>
            
            <p className="text-xl text-center mb-6 text-white"><strong className="text-white">3D Environment Artist | 3D Modeller | Visual Effects Artist</strong></p>
            
            <div className="text-center mb-6 text-white">
              <p>LinkedIn | GitHub | Portfolio | ArtStation | Behance</p>
              <p>Vasai, Mumbai, Maharashtra, India | +91 8956917718 | mihirdpatil5932@gmail.com</p>
            </div>
            
            <hr className="border-white/20 my-8" />
            
            <h2 className="text-2xl font-bold mb-4 text-white">PROFESSIONAL SUMMARY</h2>
            <p className="text-white">Motivated Computer Science graduate and passionate 3D Environment Artist with hands-on experience in creating immersive digital environments. Skilled in industry-standard tools including Blender, Unreal Engine 5, and Substance Suite. Proven ability to transform creative concepts into high-quality 3D assets and environments. Strong technical foundation combined with artistic vision and collaborative problem-solving skills.</p>
            
            <h2 className="text-2xl font-bold mt-8 mb-4 text-white">TECHNICAL SKILLS</h2>
            <p className="text-white"><strong className="text-white">3D Modeling & Animation:</strong> Blender, Autodesk Maya, 3ds Max, ZBrush, Marvelous Designer</p>
            <p className="text-white"><strong className="text-white">Realtime Rendering:</strong> Unreal Engine 5, Asset Creation, Environment Design, Lighting Design</p>
            <p className="text-white"><strong className="text-white">Texturing:</strong> Substance Painter, Substance Designer, Quixel Megascans</p>
            <p className="text-white"><strong className="text-white">Programming Languages:</strong> JavaScript, TypeScript, React.js, Next.js</p>
            <p className="text-white"><strong className="text-white">Design Software:</strong> Adobe Photoshop, Adobe Illustrator, Adobe InDesign, Figma</p>
            <p className="text-white"><strong className="text-white">Version Control:</strong> Git, GitHub</p>
            <p className="text-white"><strong className="text-white">Core Competencies:</strong> Environment Art, Asset Designing, Texture Creation, Lighting Design, Visual Storytelling, Attention to Detail, Team Collaboration, Fast Learning, Adaptability</p>
            
            <h2 className="text-2xl font-bold mt-8 mb-4 text-white">PROFESSIONAL EXPERIENCE</h2>
            <h3 className="text-xl font-bold text-white">Internship Trainee</h3>
            <p className="text-white"><strong className="text-white">Bangera Studio</strong> | Vasai, Mumbai | Feb 2023 - Jun 2023</p>
            <ul className="text-white">
              <li>Gained hands-on experience in professional filmmaking workflows and 3D art production pipelines</li>
              <li>Collaborated with creative team on multiple short-term projects under mentorship of industry professionals</li>
              <li>Created 3D models, textures, and visual assets using Blender, Adobe Photoshop, and Illustrator</li>
              <li>Developed foundational skills in 3D modeling, graphic design, and logo design</li>
              <li>Applied creative problem-solving skills to meet project deadlines and quality standards</li>
              <li>Enhanced understanding of real-world creative workflows and industry best practices</li>
            </ul>
            
            <h2 className="text-2xl font-bold mt-8 mb-4 text-white">PROJECTS</h2>
            
            <h3 className="text-xl font-bold text-white">Tori - Japanese Shrine Environment</h3>
            <p className="text-white"><strong className="text-white">Tools:</strong> Unreal Engine 5, Blender</p>
            <ul className="text-white">
              <li>Designed and developed a spiritual shrine scene inspired by traditional Japanese architecture</li>
              <li>Implemented atmospheric lighting and natural environmental elements for immersive experience</li>
              <li>Optimized assets for real-time rendering while maintaining visual fidelity</li>
            </ul>
            
            <h3 className="text-xl font-bold mt-4 text-white">Lalita - Character Art & Environment</h3>
            <p className="text-white"><strong className="text-white">Tools:</strong> Blender, Substance Painter, Marvelous Designer</p>
            <ul className="text-white">
              <li>Created detailed 3D character renders of Goddess Lalita with symbolic aesthetics</li>
              <li>Developed intricate costume details using Marvelous Designer cloth simulation</li>
              <li>Designed vibrant environmental backdrops to enhance character presentation</li>
            </ul>

            <h3 className="text-xl font-bold mt-4 text-white">Hall - Architectural Visualization</h3>
            <p className="text-white"><strong className="text-white">Tools:</strong> Unreal Engine 5, Blender</p>
            <ul className="text-white">
              <li>Built grand hall environment focusing on structural design and spatial composition</li>
              <li>Implemented advanced lighting techniques to create mood and atmosphere</li>
              <li>Optimized scene for interactive exploration and visual storytelling</li>
            </ul>

            <h3 className="text-xl font-bold mt-4 text-white">Garden - Natural Environment Design</h3>
            <p className="text-white"><strong className="text-white">Tools:</strong> Unreal Engine 5, Blender</p>
            <ul className="text-white">
              <li>Designed tranquil garden environment with lush vegetation and natural elements</li>
              <li>Applied realistic lighting and material properties for photorealistic results</li>
              <li>Optimized asset density for performance while maintaining visual quality</li>
            </ul>
            
            <h2 className="text-2xl font-bold mt-8 mb-4 text-white">EDUCATION</h2>
            <p className="text-white"><strong className="text-white">Bachelor of Science in Computer Science</strong></p>
            <p className="text-white">Viva College of Arts, Science and Commerce, Virar (W) | 2022 - 2025 (Expected)</p>
            <p className="text-white"><strong className="text-white">Relevant Coursework:</strong> Data Structures, Algorithms, Computer Graphics, Software Engineering</p>
            
            <h2 className="text-2xl font-bold mt-8 mb-4 text-white">CERTIFICATIONS</h2>
            <ul className="text-white">
              <li>Graphic Designing Certification - Computech Computer Academy (AICPTR)</li>
              <li>Desktop Publishing (DTP) Certification - Computech Computer Academy (AICPTR)</li>
              <li>Compositing Certification - Computech Computer Academy (AICPTR)</li>
              <li>3DS Max Certification - Computech Computer Academy (AICPTR)</li>
              <li>Master the Blender for Game Art, Film & Design - Udemy</li>
            </ul>
            
            <h2 className="text-2xl font-bold mt-8 mb-4 text-white">ADDITIONAL INFORMATION</h2>
            <p className="text-white"><strong className="text-white">Languages:</strong> English (Fluent), Hindi (Native), Marathi (Native), Korean (Beginner | Lvl 2), Mandarin Chinese (Lvl A1 [CEFR])</p>
            <p className="text-white"><strong className="text-white">Interests:</strong> Game Development, Visual Effects, Digital Art, Emerging Technologies, Continuous Learning</p>
          </div>
        </div>
      </div>
    </div>
  );
}