// /components/ProjectCard.tsx

"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { useState, useRef } from "react";
import { useRouter } from "next/navigation";
import { MediaItem } from "@/data/projects";

interface ProjectCardProps {
  title: string;
  description: string;
  media: MediaItem[];
  index: number;
  projectId?: string;
  slug?: string;
  category?: string | string[];
  software?: string[];
}

const ProjectCard: React.FC<ProjectCardProps> = ({
  title,
  description,
  media = [],
  index,
  projectId,
  slug,
  category,
  software = [],
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const imageCarouselRef = useRef(null);
  const router = useRouter();

  const handleCardClick = (e: React.MouseEvent) => {
    // Prevent navigation if clicking on the carousel thumbnails
    if (imageCarouselRef.current?.contains(e.target as Node)) return;
    
    // Stop event propagation to prevent carousel drag interference
    e.preventDefault();
    e.stopPropagation();
  
    // Navigate to projects page with the specific project opened
    if (slug) {
      router.push(`/projects?project=${slug}`);
    } else if (projectId) {
      router.push(`/projects?project=${projectId}`);
    } else {
      // Fallback: create slug from title
      const titleSlug = title
        .toLowerCase()
        .replace(/\s+/g, "-")
        .replace(/[^a-z0-9-]/g, "");
      router.push(`/projects?project=${titleSlug}`);
    }
  };

  // Handle thumbnail click in carousel - same navigation logic
  const handleThumbnailClick = (e: React.MouseEvent) => {
    e.stopPropagation();

    if (slug) {
      router.push(`/projects?project=${slug}`);
    } else if (projectId) {
      router.push(`/projects?project=${projectId}`);
    } else {
      const titleSlug = title
        .toLowerCase()
        .replace(/\s+/g, "-")
        .replace(/[^a-z0-9-]/g, "");
      router.push(`/projects?project=${titleSlug}`);
    }
  };

  const cardVariants = {
    initial: { scale: 1, rotateY: 0 },
    hover: {
      scale: 1.02,
      rotateY: 2,
      transition: { type: "spring", stiffness: 300, damping: 30 },
    },
  };

  const contentVariants = {
    initial: { opacity: 0, y: 10 },
    hover: {
      opacity: 1,
      y: 0,
      transition: { delay: 0.1, duration: 0.3, ease: "easeOut" },
    },
  };

  // Find the first image in the media array to use as thumbnail
  const thumbnailImage =
    media.find((item) => item.type === "image")?.url || "/placeholder.svg";

  // Software logo mapping
  const softwareLogos: { [key: string]: string } = {
    "Unreal Engine": "/UEWhite.png",
    Blender: "/blender-whitecom.png",
    "Substance Painter": "/Adobe_Substance_3D_Painter_icon_white.svg",
    "3ds Max": "/3Ds_3.png",
    "Marvelous Designer": "/Marvelous-design.svg",
    Maya: "/maya-svgrepo-com.png",
    "Substance 3D": "/Adobe_Substance_3D_icon_white.svg",
    Behance: "/behance-163-whitecom.png",
    ArtStation: "/artstation-whitecom.png",
    LinkedIn: "/linkedin-whitecom.png",
    Mihir: "/mihir_01.png",
  };

  return (
    <motion.div
      className="group relative h-[450px] w-full bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl rounded-3xl overflow-hidden border border-white/20 shadow-xl cursor-pointer"
      variants={cardVariants}
      initial="initial"
      whileHover="hover"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={handleCardClick}
    >
      {/* Main thumbnail image */}
      <div className="relative h-[60%] overflow-hidden">
        <Image
          src={thumbnailImage}
          alt={title}
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-110"
          onError={(e) => {
            const target = e.target as HTMLImageElement;
            target.src = "/placeholder.svg";
          }}
        />

        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

        {/* Media count indicator */}
        <div className="absolute top-4 right-4 px-3 py-1 bg-black/40 backdrop-blur-sm rounded-full text-white text-sm">
          {media.length} media
        </div>

        {/* Category tags */}
        {category && (
          <div className="absolute top-4 left-4 flex flex-wrap gap-2">
            {(Array.isArray(category) ? category.slice(0, 2) : [category]).map(
              (cat, i) => (
                <span
                  key={i}
                  className="px-2 py-1 text-xs font-medium rounded-full bg-white/20 text-white backdrop-blur-sm border border-white/30"
                >
                  {cat}
                </span>
              )
            )}
          </div>
        )}

        {/* Hover overlay with additional media thumbnails */}
        {isHovered && media.length > 1 && (
          <motion.div
            className="absolute bottom-4 left-4 right-4 flex gap-2 overflow-x-auto"
            ref={imageCarouselRef}
            variants={contentVariants}
            initial="initial"
            animate="hover"
          >
            {media.slice(1, 4).map((item, idx) => (
              <div
                key={idx}
                className="flex-shrink-0 w-16 h-12 bg-white/20 rounded-lg overflow-hidden cursor-pointer hover:bg-white/30 transition-colors relative"
                onClick={handleThumbnailClick}
              >
                {item.type === "image" ? (
                  <Image
                    src={item.url}
                    alt={`${title} ${idx + 2}`}
                    fill
                    className="object-cover"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.src = "/placeholder.svg";
                    }}
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <svg
                      className="w-4 h-4 text-white"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M8 5v14l11-7z" />
                    </svg>
                  </div>
                )}
              </div>
            ))}
            {media.length > 4 && (
              <div className="flex-shrink-0 w-16 h-12 bg-white/20 rounded-lg flex items-center justify-center text-white text-xs">
                +{media.length - 4}
              </div>
            )}
          </motion.div>
        )}
      </div>

      {/* Content section */}
      <div className="relative h-[40%] p-6 flex flex-col justify-between">
        <div>
          <h3 className="text-xl font-bold text-white mb-2 group-hover:text-purple-200 transition-colors line-clamp-2">
            {title}
          </h3>
          <p className="text-gray-300 text-sm line-clamp-3 leading-relaxed">
            {description}
          </p>
        </div>

        {/* Software badges */}
        {software.length > 0 && (
          <div className="flex flex-wrap gap-2 mt-4">
            {software.slice(0, 4).map((soft, i) => (
              <div
                key={i}
                className="flex items-center gap-1 px-2 py-1 text-xs rounded-full bg-white/10 text-white/80 backdrop-blur-sm border border-white/20"
              >
                {softwareLogos[soft] && (
                  <Image
                    src={softwareLogos[soft]}
                    alt={soft}
                    width={14}
                    height={14}
                    className="object-contain"
                  />
                )}
                <span>{soft}</span>
              </div>
            ))}
            {software.length > 4 && (
              <div className="flex items-center justify-center px-2 py-1 text-xs rounded-full bg-white/10 text-white/60 backdrop-blur-sm border border-white/20">
                +{software.length - 4}
              </div>
            )}
          </div>
        )}

        {/* Hover effect indicators */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-t from-purple-600/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
          variants={contentVariants}
          initial="initial"
          animate={isHovered ? "hover" : "initial"}
        />
      </div>

      {/* Click to view indicator */}
      <motion.div
        className="absolute bottom-4 right-4 text-white/60 text-xs opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        variants={contentVariants}
        initial="initial"
        animate={isHovered ? "hover" : "initial"}
      >
        Click to view project
      </motion.div>

      {/* Glow effect */}
      <div className="absolute -inset-1 bg-gradient-to-r from-purple-600/50 to-blue-600/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-lg -z-10" />
    </motion.div>
  );
};

export default ProjectCard;
