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
}

const ProjectCard: React.FC<ProjectCardProps> = ({
  title,
  description,
  media = [],
  index,
  projectId,
  slug,
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const imageCarouselRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  const handleCardClick = (e: React.MouseEvent) => {
    if (imageCarouselRef.current?.contains(e.target as Node)) return;

    if (slug) {
      router.push(`/projects/${slug}`);
    } else if (projectId) {
      router.push(`/projects/${projectId}`);
    } else {
      const titleSlug = title
        .toLowerCase()
        .replace(/\s+/g, "-")
        .replace(/[^a-z0-9-]/g, "");
      router.push(`/projects/${titleSlug}`);
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
  const thumbnailImage = media.find(item => item.type === 'image')?.url || '/placeholder.svg';

  return (
    <motion.div
      className="relative w-full h-[400px] rounded-2xl overflow-hidden cursor-pointer select-none"
      style={{
        background: "rgba(255, 255, 255, 0.1)",
        backdropFilter: "blur(20px)",
        border: "1px solid rgba(255, 255, 255, 0.2)",
        boxShadow: "0 8px 32px rgba(0, 0, 0, 0.3)",
      }}
      variants={cardVariants}
      initial="initial"
      whileHover="hover"
      animate={isHovered ? "hover" : "initial"}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={handleCardClick}
    >
      {/* Main thumbnail image */}
      <div className="relative h-[60%] w-full overflow-hidden">
        <Image
          src={thumbnailImage}
          alt={title}
          fill
          className="object-cover transition-transform duration-700 ease-out"
          style={{ transform: isHovered ? "scale(1.3)" : "scale(1)" }}
          priority={index < 3}
          onError={(e) => {
            const target = e.target as HTMLImageElement;
            target.src = "/placeholder.svg";
          }}
        />

        <div
          className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"
          style={{
            opacity: isHovered ? 0.8 : 0.4,
            transition: "opacity 0.3s ease-in-out",
          }}
        />
      </div>

      {/* Content section */}
      <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
        <h3 className="text-xl font-bold mb-2 text-white drop-shadow-lg">
          {title}
        </h3>

        <motion.div
          variants={contentVariants}
          initial="initial"
          animate={isHovered ? "hover" : "initial"}
        >
          {isHovered && (
            <>
              <p className="text-gray-200 text-sm mb-4 line-clamp-2">
                {description}
              </p>

              <div
                ref={imageCarouselRef}
                className="flex gap-3 overflow-x-auto scrollbar-hide pb-2"
                style={{
                  scrollbarWidth: "none",
                  msOverflowStyle: "none",
                  WebkitOverflowScrolling: "touch",
                }}
                onMouseDown={(e) => e.stopPropagation()}
                onClick={(e) => e.stopPropagation()}
              >
                {media.map((item, idx) => (
                  <motion.div
                    key={idx}
                    className="flex-shrink-0 w-20 h-12 rounded-lg overflow-hidden border border-white/20"
                    whileHover={{ scale: 1.05 }}
                    transition={{ type: "spring", stiffness: 400, damping: 25 }}
                    onClick={(e) => {
                      e.stopPropagation();
                      if (slug) router.push(`/projects/${slug}`);
                    }}
                  >
                    <Image
                      src={item.url}
                      alt={`${title} preview ${idx + 1}`}
                      width={80}
                      height={48}
                      className="w-full h-full object-cover"
                    />
                  </motion.div>
                ))}
              </div>
            </>
          )}
        </motion.div>
      </div>

      <div
        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent"
        style={{
          transform: isHovered ? "translateX(100%)" : "translateX(-100%)",
          transition: "transform 0.6s ease-in-out",
        }}
      />
    </motion.div>
  );
};

export default ProjectCard;
