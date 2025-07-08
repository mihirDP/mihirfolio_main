"use client";

import { useState, useEffect, MouseEvent } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { projects } from "@/data/projects";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowLeft, X, ChevronLeft, ChevronRight } from "lucide-react";
import { Navbar } from "@/components/Navbar";

// TypeScript interfaces for the media structure
interface MediaItem {
  type: "image" | "video";
  url: string;
}

interface Project {
  title: string;
  slug: string;
  category: string | string[];
  description: string;
  media: MediaItem[];
  software: string[];
}

const allCategories = [
  ...new Set(
    projects.flatMap((p) =>
      Array.isArray(p.category) ? p.category : [p.category]
    )
  ),
];

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

// Skeleton Loader Components
const ProjectCardSkeleton = ({ className = "" }: { className?: string }) => {
  return (
    <div
      className={`group relative overflow-hidden rounded-2xl backdrop-blur-xl bg-gradient-to-br from-white/10 to-white/5 border border-white/20 shadow-xl h-64 animate-pulse ${className}`}
    >
      {/* Image skeleton */}
      <div className="absolute inset-0 bg-white/5" />

      {/* Content skeleton */}
      <div className="relative z-10 p-4 h-full flex flex-col justify-between">
        <div>
          {/* Category badges skeleton */}
          <div className="flex flex-wrap gap-1 mb-2">
            <div className="h-5 w-16 bg-white/20 rounded-full" />
            <div className="h-5 w-12 bg-white/20 rounded-full" />
          </div>

          {/* Title skeleton */}
          <div className="h-6 bg-white/20 rounded mb-2 w-3/4" />

          {/* Description skeleton */}
          <div className="space-y-1">
            <div className="h-3 bg-white/15 rounded w-full" />
            <div className="h-3 bg-white/15 rounded w-2/3" />
          </div>
        </div>

        <div className="flex items-center justify-between">
          {/* Software badges skeleton */}
          <div className="flex gap-1">
            <div className="w-6 h-6 bg-white/20 rounded-full" />
            <div className="w-6 h-6 bg-white/20 rounded-full" />
            <div className="w-6 h-6 bg-white/20 rounded-full" />
          </div>

          {/* Media count skeleton */}
          <div className="h-3 w-12 bg-white/15 rounded" />
        </div>
      </div>
    </div>
  );
};

const FilterButtonSkeleton = () => {
  return (
    <div className="px-6 py-3 rounded-2xl bg-white/10 border border-white/20 animate-pulse">
      <div className="h-4 w-16 bg-white/20 rounded" />
    </div>
  );
};

export default function ProjectsClient() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [fullscreenMedia, setFullscreenMedia] = useState<MediaItem | null>(
    null
  );
  const [fullscreenIndex, setFullscreenIndex] = useState(0);
  const [showAllMedia, setShowAllMedia] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  // Add missing state for share menu
  const [shareMenuOpen, setShareMenuOpen] = useState<number | null>(null);

  const searchParams = useSearchParams();
  const router = useRouter();

  // Add this useEffect to handle loading state
  useEffect(() => {
    // Simulate loading time and then set loading to false
    const timer = setTimeout(() => {
      setIsLoading(false);
      setIsLoaded(true);
    }, 1000); // 1 second delay for smooth transition

    return () => clearTimeout(timer);
  }, []);

  // Handle URL parameters for direct project access
  useEffect(() => {
    const projectSlug = searchParams.get('project');
    if (projectSlug && !isLoading) {
      const project = projects.find(p => p.slug === projectSlug);
      if (project) {
        setSelectedProject(project);
      }
    }
  }, [searchParams, isLoading]);

  // Add share utility functions
  const getProjectUrl = (project: Project) => {
    const baseUrl = typeof window !== "undefined" ? window.location.origin : "";
    const slug =
      project.slug || project.title.toLowerCase().replace(/\s+/g, "-");
    return `${baseUrl}/projects?project=${project.slug}`;
  };

  const getShareContent = (project: Project) => {
    return {
      title: `Check out "${project.title}" - 3D Art Project`,
      description:
        project.description ||
        `Amazing 3D project by Mihir Patil featuring ${
          project.software?.join(", ") || "cutting-edge 3D technology"
        }.`,
      url: getProjectUrl(project),
    };
  };

  const handleShare = (
    platform: string,
    project: Project,
    e: MouseEvent<HTMLButtonElement>
  ) => {
    e.preventDefault();
    e.stopPropagation();

    const content = getShareContent(project);
    const encodedTitle = encodeURIComponent(content.title);
    const encodedDescription = encodeURIComponent(content.description);
    const encodedUrl = encodeURIComponent(content.url);

    let shareUrl = "";

    switch (platform) {
      case "whatsapp":
        shareUrl = `https://wa.me/?text=${encodedTitle}%0A${encodedDescription}%0A${encodedUrl}`;
        break;
      case "linkedin":
        shareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}&title=${encodedTitle}&summary=${encodedDescription}`;
        break;
      case "twitter":
        shareUrl = `https://twitter.com/intent/tweet?text=${encodedTitle}&url=${encodedUrl}`;
        break;
      case "facebook":
        shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}&quote=${encodedTitle}`;
        break;
      case "telegram":
        shareUrl = `https://t.me/share/url?url=${encodedUrl}&text=${encodedTitle}`;
        break;
      case "copy":
        navigator.clipboard.writeText(content.url).then(() => {
          alert("Link copied to clipboard!");
        });
        return;
    }

    if (shareUrl) {
      window.open(shareUrl, "_blank", "noopener,noreferrer");
    }
  };

  const filteredProjects =
    selectedCategory === "All"
      ? projects
      : projects.filter((project) =>
          Array.isArray(project.category)
            ? project.category.includes(selectedCategory)
            : project.category === selectedCategory
        );

  // Image carousel component for Bento cards
  const ImageCarousel = ({ images }: { images: MediaItem[] }) => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isVisible, setIsVisible] = useState(true);

    useEffect(() => {
      if (images.length <= 1) return;

      const interval = setInterval(() => {
        setIsVisible(false);
        setTimeout(() => {
          setCurrentIndex((prev) => (prev + 1) % images.length);
          setIsVisible(true);
        }, 300);
      }, 3000);

      return () => clearInterval(interval);
    }, [images.length]);

    if (images.length === 0) {
      return (
        <div className="absolute inset-0 bg-white/5 flex items-center justify-center">
          <div className="text-white/40 text-sm">No preview available</div>
        </div>
      );
    }

    return (
      <div className="absolute inset-0 overflow-hidden">
        <img
          src={images[currentIndex].url}
          alt="Project preview"
          className={`w-full h-full object-cover transition-opacity duration-300 ${
            isVisible ? "opacity-100" : "opacity-0"
          }`}
          onError={(e) => {
            const target = e.target as HTMLImageElement;
            target.src = "/placeholder.svg";
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
      </div>
    );
  };

  // Software badges component
  const SoftwareBadges = ({ software }: { software: string[] }) => {
    return (
      <div className="flex flex-wrap gap-1 mt-2">
        {software.slice(0, 3).map((soft, index) => (
          <div
            key={index}
            className="flex items-center justify-center p-1 rounded-full bg-white/10 backdrop-blur-sm border border-white/20"
          >
            {softwareLogos[soft] && (
              <img
                src={softwareLogos[soft]}
                alt={soft}
                className="w-4 h-4 object-contain"
              />
            )}
          </div>
        ))}
        {software.length > 3 && (
          <div className="flex items-center justify-center px-2 py-1 text-xs rounded-full bg-white/10 text-white/60 backdrop-blur-sm border border-white/20">
            +{software.length - 3}
          </div>
        )}
      </div>
    );
  };

  // Function to render media thumbnail
  const renderMediaThumbnail = (mediaItem: MediaItem, index: number) => {
    const handleMediaClick = () => {
      setFullscreenMedia(mediaItem);
      setFullscreenIndex(index);
    };

    if (mediaItem.type === "image") {
      return (
        <div
          key={index}
          className="aspect-video bg-white/10 rounded-xl overflow-hidden cursor-pointer group hover:bg-white/20 transition-all duration-700"
          onClick={handleMediaClick}
        >
          <img
            src={mediaItem.url}
            alt={`Media ${index + 1}`}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
            onError={(e) => {
              const target = e.target as HTMLImageElement;
              target.src = "/placeholder.svg";
            }}
          />
        </div>
      );
    } else {
      return (
        <div
          key={index}
          className="aspect-video bg-white/10 rounded-xl overflow-hidden cursor-pointer group hover:bg-white/20 transition-all duration-300 relative"
          onClick={handleMediaClick}
        >
          <video
            src={mediaItem.url}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            muted
            preload="metadata"
            onError={(e) => {
              const target = e.target as HTMLVideoElement;
              target.style.display = "none";
            }}
          />
          {/* Play button overlay */}
          <div className="absolute inset-0 flex items-center justify-center bg-black/20 group-hover:bg-black/30 transition-colors">
            <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm">
              <svg
                className="w-6 h-6 text-white ml-1"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M8 5v14l11-7z" />
              </svg>
            </div>
          </div>
        </div>
      );
    }
  };

  // Navigate fullscreen media
  const navigateFullscreen = (direction: "next" | "prev") => {
    if (!selectedProject) return;

    const currentIndex = selectedProject.media.findIndex(
      (item) => item === fullscreenMedia
    );
    let newIndex;

    if (direction === "next") {
      newIndex = (currentIndex + 1) % selectedProject.media.length;
    } else {
      newIndex =
        currentIndex === 0
          ? selectedProject.media.length - 1
          : currentIndex - 1;
    }

    setFullscreenMedia(selectedProject.media[newIndex]);
    setFullscreenIndex(newIndex);
  };

  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (fullscreenMedia) {
        if (e.key === "ArrowRight") navigateFullscreen("next");
        if (e.key === "ArrowLeft") navigateFullscreen("prev");
        if (e.key === "Escape") setFullscreenMedia(null);
      }
      if (selectedProject && e.key === "Escape" && !fullscreenMedia) {
        setSelectedProject(null);
      }
    };

    window.addEventListener("keydown", handleKeyPress);
    return () => window.removeEventListener("keydown", handleKeyPress);
  }, [fullscreenMedia, selectedProject]);

  // Function to render fullscreen media
  const renderFullscreenMedia = () => {
    if (!fullscreenMedia || !selectedProject) return null;

    return (
      <div
        className="fixed inset-0 bg-black/90 backdrop-blur-lg z-[60] flex items-center justify-center p-4"
        onClick={() => setFullscreenMedia(null)}
      >
        <div className="relative max-w-7xl max-h-[90vh] w-full h-full flex items-center justify-center">
          {/* Close button */}
          <button
            onClick={() => setFullscreenMedia(null)}
            className="absolute top-4 right-4 z-10 text-white/80 hover:text-white text-3xl font-bold w-12 h-12 flex items-center justify-center bg-black/50 rounded-full hover:bg-black/70 transition-all duration-300"
          >
            <X size={24} />
          </button>

          {/* Navigation arrows */}
          {selectedProject.media.length > 1 && (
            <>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  navigateFullscreen("prev");
                }}
                className="absolute left-4 top-1/2 transform -translate-y-1/2 z-10 text-white/80 hover:text-white w-12 h-12 flex items-center justify-center bg-black/50 rounded-full hover:bg-black/70 transition-all duration-300"
              >
                <ChevronLeft size={24} />
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  navigateFullscreen("next");
                }}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 z-10 text-white/80 hover:text-white w-12 h-12 flex items-center justify-center bg-black/50 rounded-full hover:bg-black/70 transition-all duration-300"
              >
                <ChevronRight size={24} />
              </button>
            </>
          )}

          {/* Media counter */}
          <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 z-10 px-4 py-2 bg-black/50 rounded-full text-white/80 text-sm">
            {fullscreenIndex + 1} / {selectedProject.media.length}
          </div>

          {/* Media content */}
          <div
            className="w-full h-full flex items-center justify-center"
            onClick={(e) => e.stopPropagation()}
          >
            {fullscreenMedia.type === "image" ? (
              <img
                src={fullscreenMedia.url}
                alt="Fullscreen view"
                className="max-w-full max-h-full object-contain rounded-lg"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.src = "/placeholder.svg";
                }}
              />
            ) : (
              <video
                src={fullscreenMedia.url}
                controls
                autoPlay
                className="max-w-full max-h-full object-contain rounded-lg"
                onError={(e) => {
                  console.log("Video failed to load:", fullscreenMedia.url);
                }}
              />
            )}
          </div>
        </div>
      </div>
    );
  };

  return (
    <div
      className={`min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 relative overflow-hidden ${
        isLoaded ? "loaded" : ""
      }`}
    >
      {/* Background Effects */}
      <div className="absolute inset-0 bg-animated-gradient" />
      <div
        className="absolute top-0 left-0 w-full h-full opacity-30"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%239C92AC' fill-opacity='0.05'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }}
      />

      <div className="relative z-10 p-6 max-w-7xl mx-auto">
        {/* Back Button */}
        <Link href="/">
          <Button
            variant="ghost"
            className={`text-white hover:text-white transition-all ease-in-out px-4 py-2 rounded-full border-white/10 hover:bg-white/20 fixed top-8 left-8 z-20 animate-on-load ${
              isLoaded ? "animate-fade-in animate-delay-200" : ""
            }`}
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Home
          </Button>
        </Link>
        <Navbar />

        {/* Project Detail Modal */}
        {selectedProject && (
          <div className="fixed inset-0 bg-black/80 backdrop-blur-xl z-40 flex items-center justify-center p-4 overflow-y-auto">
            <div className="max-w-6xl w-full max-h-[90vh] bg-gradient-to-br from-slate-800/95 to-purple-800/95 rounded-3xl backdrop-blur-2xl border border-white/20 shadow-2xl overflow-hidden">
              {/* Modal Header */}
              <div className="flex items-center justify-between p-6 border-b border-white/20">
                <div>
                  <h2 className="text-3xl font-bold text-white mb-2">
                    {selectedProject.title}
                  </h2>
                  <div className="flex flex-wrap gap-2">
                    {(Array.isArray(selectedProject.category)
                      ? selectedProject.category
                      : [selectedProject.category]
                    ).map((cat, i) => (
                      <span
                        key={i}
                        className="px-3 py-1 text-sm font-medium rounded-full bg-white/20 text-white backdrop-blur-sm border border-white/30"
                      >
                        {cat}
                      </span>
                    ))}
                  </div>
                </div>
                <button
                  onClick={() => setSelectedProject(null)}
                  className="text-white/80 hover:text-white text-2xl w-10 h-10 flex items-center justify-center bg-white/10 rounded-full hover:bg-white/20 transition-all duration-300"
                >
                  <X size={20} />
                </button>
              </div>

              {/* Modal Content */}
              <div className="p-6 overflow-y-auto max-h-[calc(90vh-200px)]">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                  {/* Media Grid */}
                  <div className="lg:col-span-2">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {selectedProject.media.map((mediaItem, index) =>
                        renderMediaThumbnail(mediaItem, index)
                      )}
                    </div>
                  </div>

                  {/* Project Details */}
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-xl font-semibold text-white mb-3">
                        Description
                      </h3>
                      <p className="text-gray-300 leading-relaxed">
                        {selectedProject.description}
                      </p>
                    </div>

                    <div>
                      <h3 className="text-xl font-semibold text-white mb-3">
                        Software Used
                      </h3>
                      <div className="flex flex-wrap gap-3">
                        {selectedProject.software.map((soft, i) => (
                          <div
                            key={i}
                            className="flex items-center gap-2 px-3 py-2 rounded-lg bg-white/10 text-white backdrop-blur-sm border border-white/20"
                          >
                            {softwareLogos[soft] && (
                              <img
                                src={softwareLogos[soft]}
                                alt={soft}
                                className="w-5 h-5 object-contain"
                              />
                            )}
                            <span className="text-sm font-medium">{soft}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div>
                      <h3 className="text-xl font-semibold text-white mb-3">
                        Media Count
                      </h3>
                      <div className="flex items-center gap-4">
                        <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-white/10 text-white backdrop-blur-sm border border-white/20">
                          <span className="text-sm">
                            {
                              selectedProject.media.filter(
                                (m) => m.type === "image"
                              ).length
                            }{" "}
                            Images
                          </span>
                        </div>
                        <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-white/10 text-white backdrop-blur-sm border border-white/20">
                          <span className="text-sm">
                            {
                              selectedProject.media.filter(
                                (m) => m.type === "video"
                              ).length
                            }{" "}
                            Videos
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Fullscreen Media Modal */}
        {renderFullscreenMedia()}

        {/* Header */}
        <div
          className={`text-center mb-12 pt-20 animate-on-load ${
            isLoaded ? "animate-fade-in-up animate-delay-300" : ""
          }`}
        >
          <h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-white via-purple-200 to-purple-400 bg-clip-text text-transparent mb-4">
            Project Gallery
          </h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Explore my collection of 3D environments, character animations, and
            digital art creations
          </p>
        </div>

        {/* Filter Controls */}
        <div
          className={`flex flex-wrap gap-3 justify-center mb-12 animate-on-load ${
            isLoaded ? "animate-fade-in-up animate-delay-500" : ""
          }`}
        >
          {isLoading ? (
            // Show skeleton loaders for filter buttons
            <>
              <FilterButtonSkeleton />
              <FilterButtonSkeleton />
              <FilterButtonSkeleton />
              <FilterButtonSkeleton />
            </>
          ) : (
            // Show actual filter buttons
            <>
              <button
                onClick={() => setSelectedCategory("All")}
                className={`px-6 py-3 rounded-2xl backdrop-blur-xl transition-all duration-300 transform hover:scale-105 ${
                  selectedCategory === "All"
                    ? "bg-white/20 text-white shadow-lg border border-white/30"
                    : "bg-white/10 text-gray-300 hover:bg-white/15 border border-white/20"
                }`}
              >
                All Projects
              </button>
              {allCategories.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-6 py-3 rounded-2xl backdrop-blur-xl transition-all duration-300 transform hover:scale-105 ${
                    selectedCategory === category
                      ? "bg-white/20 text-white shadow-lg border border-white/30"
                      : "bg-white/10 text-gray-300 hover:bg-white/15 border border-white/20"
                  }`}
                >
                  {category}
                </button>
              ))}
            </>
          )}
        </div>

        {/* Project Cards - Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
          {isLoading
            ? // Show skeleton loaders for project cards
              Array.from({ length: 8 }).map((_, index) => (
                <ProjectCardSkeleton
                  key={index}
                  className={`${
                    index === 0
                      ? "md:col-span-2 md:row-span-2 md:h-[544px]"
                      : index === 3
                      ? "lg:col-span-2"
                      : index === 7
                      ? "xl:col-span-2"
                      : ""
                  }`}
                />
              ))
            : // Show actual project cards with animations
              filteredProjects.map((project, index) => {
                const imageMedia = project.media.filter(
                  (item) => item.type === "image"
                );

                return (
                  <div
                    key={index}
                    className={`group relative overflow-hidden rounded-2xl backdrop-blur-xl bg-gradient-to-br from-white/20 to-white/5 border border-white/20 shadow-xl transition-all duration-500 hover:scale-105 hover:shadow-purple-500/25 cursor-pointer h-64 animate-on-load ${
                      index === 0
                        ? "md:col-span-2 md:row-span-2 md:h-[544px]"
                        : index === 3
                        ? "lg:col-span-2"
                        : index === 7
                        ? "xl:col-span-2"
                        : ""
                    } ${isLoaded ? "animate-scale-in" : ""}`}
                    style={{ animationDelay: `${0.7 + index * 0.1}s` }}
                    onClick={() => setSelectedProject(project)}
                  >
                    {/* Image Carousel Background */}
                    <ImageCarousel images={imageMedia} />

                    <div className="absolute inset-0 bg-gradient-to-br from-purple-600/20 to-blue-600/20 opacity-50" />

                    {/* Share Button */}
                    <div className="absolute top-4 right-4 z-50">
                      <div className="relative">
                        <button
                          onClick={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            setShareMenuOpen(
                              shareMenuOpen === index ? null : index
                            );
                          }}
                          className="p-2 bg-black/40 backdrop-blur-sm rounded-full text-white hover:bg-black/60 transition-colors opacity-0 group-hover:opacity-100"
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
                        {shareMenuOpen === index && (
                          <div className="absolute top-12 right-0 bg-black/80 backdrop-blur-md rounded-lg p-2 min-w-[200px] border border-white/20 z-50">
                            <div className="text-white text-xs font-medium mb-2 px-2">
                              Share Project
                            </div>
                            <div className="space-y-1">
                              <button
                                onClick={(e) =>
                                  handleShare("whatsapp", project, e)
                                }
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
                                onClick={(e) =>
                                  handleShare("linkedin", project, e)
                                }
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
                                onClick={(e) =>
                                  handleShare("twitter", project, e)
                                }
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
                                onClick={(e) =>
                                  handleShare("facebook", project, e)
                                }
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
                                onClick={(e) =>
                                  handleShare("telegram", project, e)
                                }
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
                                onClick={(e) => handleShare("copy", project, e)}
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
                          </div>
                        )}
                      </div>
                    </div>

                    <div className="relative z-10 p-4 h-full flex flex-col justify-between">
                      <div>
                        <div className="flex flex-wrap gap-1 mb-2">
                          {(Array.isArray(project.category)
                            ? project.category.slice(0, 2)
                            : [project.category]
                          ).map((cat, i) => (
                            <span
                              key={i}
                              className="px-2 py-1 text-xs font-medium rounded-full bg-white/30 text-white backdrop-blur-sm border border-white/30 brightness-[75%]"
                            >
                              {cat}
                            </span>
                          ))}
                        </div>
                        <h3 className="text-lg font-bold text-white mb-1 group-hover:text-purple-200 transition-colors">
                          {project.title}
                        </h3>
                        <p className="text-sm text-gray-300 leading-relaxed line-clamp-2">
                          {project.description}
                        </p>
                      </div>

                      <div className="flex items-center justify-between">
                        <SoftwareBadges software={project.software} />
                        <div className="text-xs text-white/60">
                          {project.media.length} media
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
        </div>
      </div>
    </div>
  );
}
