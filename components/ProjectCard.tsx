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
  const [showShareMenu, setShowShareMenu] = useState(false);
  const imageCarouselRef = useRef(null);
  const router = useRouter();

  // Generate project URL for sharing
  const getProjectUrl = () => {
    const baseUrl = typeof window !== "undefined" ? window.location.origin : "";
    if (slug) {
      return `${baseUrl}/projects?project=${slug}`;
    } else if (projectId) {
      return `${baseUrl}/projects?project=${projectId}`;
    } else {
      const titleSlug = title
        .toLowerCase()
        .replace(/\s+/g, "-")
        .replace(/[^a-z0-9-]/g, "");
      return `${baseUrl}/projects?project=${titleSlug}`;
    }
  };

  // Generate share content
  const getShareContent = () => {
    const projectUrl = getProjectUrl();
    const shareText = `Check out this amazing project: "${title}" - ${description.slice(
      0,
      100
    )}${description.length > 100 ? "..." : ""}`;
    return { projectUrl, shareText };
  };

  // Share handlers
  const handleShare = (platform: string, e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    const { projectUrl, shareText } = getShareContent();
    const encodedText = encodeURIComponent(shareText);
    const encodedUrl = encodeURIComponent(projectUrl);

    let shareUrl = "";

    switch (platform) {
      case "whatsapp":
        shareUrl = `https://wa.me/?text=${encodedText}%20${encodedUrl}`;
        break;
      case "linkedin":
        shareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`;
        break;
      case "twitter":
        shareUrl = `https://twitter.com/intent/tweet?text=${encodedText}&url=${encodedUrl}`;
        break;
      case "facebook":
        shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`;
        break;
      case "telegram":
        shareUrl = `https://t.me/share/url?url=${encodedUrl}&text=${encodedText}`;
        break;
      case "copy":
        navigator.clipboard.writeText(projectUrl).then(() => {
          alert("Project link copied to clipboard!");
        });
        return;
      default:
        return;
    }

    if (shareUrl) {
      window.open(shareUrl, "_blank", "noopener,noreferrer");
    }

    setShowShareMenu(false);
  };

  const handleCardClick = (e: React.MouseEvent) => {
    // Prevent navigation if clicking on the carousel thumbnails or share button
    if (imageCarouselRef.current?.contains(e.target as Node)) return;
    
    // Check if clicking on share button or its children
    const target = e.target as HTMLElement;
    if (target.closest('[data-share-button]')) {
      return; // Don't navigate if clicking share button
    }
    
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
      onMouseLeave={() => {
        setIsHovered(false);
        setShowShareMenu(false);
      }}
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

        {/* Share Button */}
        <motion.div
          className="absolute top-4 right-20 z-20"  // Changed from right-16 to right-20 and z-10 to z-20
          variants={contentVariants}
          initial="initial"
          animate={isHovered ? "hover" : "initial"}
        >
          <div className="relative">
            <button
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                setShowShareMenu(!showShareMenu);
              }}
              className="p-2 bg-black/40 backdrop-blur-sm rounded-full text-white hover:bg-black/60 transition-colors"
              title="Share Project"
            >
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z"
                />
              </svg>
            </button>

            {/* Share Menu */}
            {showShareMenu && (
              <motion.div
                initial={{ opacity: 0, scale: 0.8, y: -10 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.8, y: -10 }}
                className="absolute top-12 right-0 bg-black/80 backdrop-blur-md rounded-lg p-2 min-w-[200px] border border-white/20"
              >
                <div className="text-white text-xs font-medium mb-2 px-2">
                  Share Project
                </div>
                <div className="space-y-1">
                  <button
                    onClick={(e) => handleShare("whatsapp", e)}
                    className="w-full flex items-center gap-3 px-3 py-2 text-white hover:bg-white/10 rounded-md transition-colors text-sm"
                  >
                    <svg
                      className="w-4 h-4 text-green-400"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.785" />
                    </svg>
                    WhatsApp
                  </button>
                  <button
                    onClick={(e) => handleShare("linkedin", e)}
                    className="w-full flex items-center gap-3 px-3 py-2 text-white hover:bg-white/10 rounded-md transition-colors text-sm"
                  >
                    <svg
                      className="w-4 h-4 text-blue-400"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                    </svg>
                    LinkedIn
                  </button>
                  <button
                    onClick={(e) => handleShare("twitter", e)}
                    className="w-full flex items-center gap-3 px-3 py-2 text-white hover:bg-white/10 rounded-md transition-colors text-sm"
                  >
                    <svg
                      className="w-4 h-4 text-blue-300"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" />
                    </svg>
                    Twitter
                  </button>
                  <button
                    onClick={(e) => handleShare("facebook", e)}
                    className="w-full flex items-center gap-3 px-3 py-2 text-white hover:bg-white/10 rounded-md transition-colors text-sm"
                  >
                    <svg
                      className="w-4 h-4 text-blue-500"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                    </svg>
                    Facebook
                  </button>
                  <button
                    onClick={(e) => handleShare("telegram", e)}
                    className="w-full flex items-center gap-3 px-3 py-2 text-white hover:bg-white/10 rounded-md transition-colors text-sm"
                  >
                    <svg
                      className="w-4 h-4 text-blue-400"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z" />
                    </svg>
                    Telegram
                  </button>
                  <button
                    onClick={(e) => handleShare("copy", e)}
                    className="w-full flex items-center gap-3 px-3 py-2 text-white hover:bg-white/10 rounded-md transition-colors text-sm"
                  >
                    <svg
                      className="w-4 h-4 text-gray-300"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
                      />
                    </svg>
                    Copy Link
                  </button>
                </div>
              </motion.div>
            )}
          </div>
        </motion.div>

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
