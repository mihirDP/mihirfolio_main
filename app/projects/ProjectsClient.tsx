"use client";

import { useState, useEffect } from "react";
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

  const searchParams = useSearchParams();
  const router = useRouter();

  // Initialize loading and animations
  useEffect(() => {
    // Simulate loading time for smooth experience
    const loadingTimer = setTimeout(() => {
      setIsLoading(false);
    }, 1200);

    // Trigger animations after loading
    const animationTimer = setTimeout(() => {
      setIsLoaded(true);
    }, 1300);

    return () => {
      clearTimeout(loadingTimer);
      clearTimeout(animationTimer);
    };
  }, []);

  // Handle URL-based project opening
  useEffect(() => {
    const projectSlug = searchParams.get("project");
    console.log("URL Project Slug:", projectSlug);

    if (projectSlug) {
      const project = projects.find((p) => p.slug === projectSlug);
      console.log("Found Project:", project);

      if (project) {
        setSelectedProject(project);
        setShowAllMedia(false);

        // Scroll to top when project is opened
        window.scrollTo({ top: 0, behavior: "smooth" });
      } else {
        console.log(
          "Project not found, available slugs:",
          projects.map((p) => p.slug)
        );
      }
    } else {
      // If no project parameter, close any open project
      setSelectedProject(null);
    }
  }, [searchParams]);

  // Update URL when project is selected/deselected
  const handleProjectSelect = (project: Project | null) => {
    setSelectedProject(project);
    setShowAllMedia(false);

    if (project) {
      // Add project slug to URL
      const url = new URL(window.location.href);
      url.searchParams.set("project", project.slug);
      router.push(url.pathname + url.search, { scroll: false });
    } else {
      // Remove project slug from URL
      const url = new URL(window.location.href);
      url.searchParams.delete("project");
      router.push(url.pathname + (url.search || ""), { scroll: false });
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
        handleProjectSelect(null);
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
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%239C92AC' fill-opacity='0.05'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
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
                  onClick={() => handleProjectSelect(null)}
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
                    onClick={() => handleProjectSelect(project)}
                  >
                    {/* Image Carousel Background */}
                    <ImageCarousel images={imageMedia} />

                    <div className="absolute inset-0 bg-gradient-to-br from-purple-600/20 to-blue-600/20 opacity-50" />

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
