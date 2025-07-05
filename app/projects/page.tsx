// /projects/page.tsx

"use client";

import { useState, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { projects } from "@/data/projects";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { Navbar } from "@/components/Navbar";

// TypeScript interfaces for the new media structure
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

export default function ProjectsPage() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [fullscreenMedia, setFullscreenMedia] = useState<MediaItem | null>(
    null
  );
  const [fullscreenIndex, setFullscreenIndex] = useState(0);
  const [showAllMedia, setShowAllMedia] = useState(false);

  const searchParams = useSearchParams();
  const router = useRouter();

  // Handle URL-based project opening
  useEffect(() => {
    const projectSlug = searchParams.get("project");
    if (projectSlug) {
      const project = projects.find((p) => p.slug === projectSlug);
      if (project) {
        setSelectedProject(project);
        setShowAllMedia(false);
      }
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
            ×
          </button>

          {/* Navigation arrows */}
          {selectedProject.media.length > 1 && (
            <>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  navigateFullscreen("prev");
                }}
                className="absolute left-4 top-1/2 transform -translate-y-1/2 z-10 text-white/80 hover:text-white text-2xl font-bold w-12 h-12 flex items-center justify-center bg-black/50 rounded-full hover:bg-black/70 transition-all duration-300"
              >
                ←
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  navigateFullscreen("next");
                }}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 z-10 text-white/80 hover:text-white text-2xl font-bold w-12 h-12 flex items-center justify-center bg-black/50 rounded-full hover:bg-black/70 transition-all duration-300"
              >
                →
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
              />
            ) : (
              <video
                src={fullscreenMedia.url}
                controls
                autoPlay
                className="max-w-full max-h-full object-contain rounded-lg"
              />
            )}
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 relative overflow-hidden">
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
            className="text-white hover:text-white transition-all ease-in-out px-4 py-2 rounded-full border-white/10 hover:bg-white/20 absolute top-8 left-8"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Home
          </Button>
        </Link>
        <Navbar />

        {/* Header */}
        <div className="text-center mb-12 pt-20">
          <h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-white via-purple-200 to-purple-400 bg-clip-text text-transparent mb-4">
            Project Gallery
          </h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Explore my collection of 3D environments, character animations, and
            digital art creations
          </p>
        </div>

        {/* Filter Controls */}
        <div className="flex flex-wrap gap-3 justify-center mb-12">
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
        </div>

        {/* Project Cards - Smaller Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
          {filteredProjects.map((project, index) => {
            const imageMedia = project.media.filter(
              (item) => item.type === "image"
            );

            return (
              <div
                key={index}
                className={`group relative overflow-hidden rounded-2xl backdrop-blur-xl bg-gradient-to-br from-white/20 to-white/5 border border-white/20 shadow-xl transition-all duration-500 hover:scale-105 hover:shadow-purple-500/25 cursor-pointer h-64 ${
                  index === 0
                    ? "md:col-span-2 md:row-span-2 md:h-[544px]"
                    : index === 3
                    ? "lg:col-span-2"
                    : index === 7
                    ? "xl:col-span-2"
                    : ""
                }`}
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
                    <h3 className="text-xl font-bold text-white mb-2 group-hover:text-purple-200 transition-colors line-clamp-2">
                      {project.title}
                    </h3>
                  </div>

                  <div className="space-y-2">
                    {/* Media count indicator */}
                    <div className="flex items-center gap-2 text-white/60 text-xs">
                      <svg
                        className="w-4 h-4"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path d="M21 19V5c0-1.1-.9-2-2-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2zM8.5 13.5l2.5 3.01L14.5 12l4.5 6H5l3.5-4.5z" />
                      </svg>
                      <span>{project.media.length} media</span>
                    </div>

                    {/* Software badges */}
                    <SoftwareBadges software={project.software} />
                  </div>
                </div>

                <div className="absolute inset-0 bg-gradient-to-t from-purple-600/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="absolute -inset-1 bg-gradient-to-r from-purple-600/50 to-blue-600/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-lg -z-10" />
              </div>
            );
          })}
        </div>

        {/* Project Modal */}
        {selectedProject && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-lg z-50 flex items-center justify-center p-4">
            <div className="bg-white/10 backdrop-blur-xl rounded-3xl border border-white/20 max-w-6xl w-full max-h-[90vh] overflow-y-auto">
              <div className="p-8">
                <div className="flex justify-between items-start mb-6">
                  <h2 className="text-3xl font-bold text-white">
                    {selectedProject.title}
                  </h2>
                  <button
                    onClick={() => handleProjectSelect(null)}
                    className="text-white/60 hover:text-white text-2xl font-bold w-8 h-8 flex items-center justify-center"
                  >
                    ×
                  </button>
                </div>

                <div className="flex flex-wrap gap-2 mb-4">
                  {(Array.isArray(selectedProject.category)
                    ? selectedProject.category
                    : [selectedProject.category]
                  ).map((cat, i) => (
                    <span
                      key={i}
                      className="px-4 py-2 text-sm font-medium rounded-full bg-white/20 text-white backdrop-blur-sm border border-white/30"
                    >
                      {cat}
                    </span>
                  ))}
                </div>

                <div className="flex flex-wrap gap-2 mb-6">
                  {selectedProject.software.map((soft, i) => (
                    <div
                      key={i}
                      className="flex items-center gap-2 px-3 py-1 text-sm rounded-full bg-white/10 text-white/80 backdrop-blur-sm border border-white/20"
                    >
                      {softwareLogos[soft] && (
                        <img
                          src={softwareLogos[soft]}
                          alt={soft}
                          className="w-4 h-4 object-contain"
                        />
                      )}
                      <span>{soft}</span>
                    </div>
                  ))}
                </div>

                <p className="text-gray-300 text-lg leading-relaxed mb-8">
                  {selectedProject.description}
                </p>

                {/* Media Gallery */}
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="text-xl font-semibold text-white">
                      Media Gallery ({selectedProject.media.length})
                    </h3>
                    {selectedProject.media.length > 4 && (
                      <button
                        onClick={() => setShowAllMedia(!showAllMedia)}
                        className="px-4 py-2 rounded-xl bg-white/10 text-gray-300 border border-white/20 hover:bg-white/20 hover:text-white transition-all duration-300 backdrop-blur-xl text-sm"
                      >
                        {showAllMedia
                          ? "Show Less"
                          : `Show All ${selectedProject.media.length}`}
                      </button>
                    )}
                  </div>

                  {/* Dynamic grid layout */}
                  <div
                    className={`grid gap-4 ${
                      selectedProject.media.length === 1
                        ? "grid-cols-1"
                        : selectedProject.media.length === 2
                        ? "grid-cols-2"
                        : selectedProject.media.length === 3
                        ? "grid-cols-3"
                        : "grid-cols-2 md:grid-cols-3 lg:grid-cols-4"
                    }`}
                  >
                    {(showAllMedia
                      ? selectedProject.media
                      : selectedProject.media.slice(0, 4)
                    ).map((mediaItem, i) => renderMediaThumbnail(mediaItem, i))}

                    {/* Show more indicator */}
                    {!showAllMedia && selectedProject.media.length > 4 && (
                      <div
                        className="aspect-video bg-white/10 rounded-xl flex items-center justify-center cursor-pointer hover:bg-white/20 transition-all duration-300 border-2 border-dashed border-white/30"
                        onClick={() => setShowAllMedia(true)}
                      >
                        <div className="text-center text-white/60">
                          <div className="text-2xl font-bold mb-1">
                            +{selectedProject.media.length - 4}
                          </div>
                          <div className="text-sm">More Media</div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Fullscreen Media Viewer */}
        {renderFullscreenMedia()}
      </div>
    </div>
  );
}
