//  /components/ProjectCarousal.tsx
"use client";

import {
  PanInfo,
  animate,
  motion,
  useMotionValue,
  useTransform,
} from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { projects } from "@/data/projects";
import ProjectCard from "./ProjectCard";

const ProjectCarousel = () => {
  const carouselRef = useRef<HTMLDivElement>(null);
  const [carouselWidth, setCarouselWidth] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const animationRef = useRef<any>(null);

  // Motion values for smooth dragging
  const x = useMotionValue(0);
  const rotateY = useTransform(x, [-200, 0, 200], [-5, 0, 5]);

  // Card width including gap (responsive)
  const cardWidth = 350; // Base card width
  const gap = 24; // Gap between cards
  const itemWidth = cardWidth + gap;

  // Auto-scroll configuration
  const AUTO_SCROLL_SPEED = 0.5; // Pixels per frame (adjust for speed)
  const SCROLL_DIRECTION = -1; // -1 for left, 1 for right

  // Create infinite loop by tripling the projects
  const infiniteProjects = [...projects, ...projects, ...projects];
  const totalWidth = infiniteProjects.length * itemWidth;

  // Auto-scroll animation loop
  useEffect(() => {
    const startAutoScroll = () => {
      const animate = () => {
        if (!isDragging && !isHovered) {
          const currentX = x.get();
          const newX = currentX + AUTO_SCROLL_SPEED * SCROLL_DIRECTION;

          // Infinite loop logic for auto-scroll
          const resetThreshold = itemWidth * projects.length;

          if (newX <= -resetThreshold * 2) {
            // Reset to middle section when reaching end
            x.set(newX + resetThreshold);
          } else if (newX >= 0) {
            // Reset to middle section when reaching beginning
            x.set(newX - resetThreshold);
          } else {
            x.set(newX);
          }
        }

        animationRef.current = requestAnimationFrame(animate);
      };

      animate();
    };

    startAutoScroll();

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [isDragging, isHovered, x, itemWidth]);

  // Calculate carousel width on mount and resize
  useEffect(() => {
    const updateCarouselWidth = () => {
      if (carouselRef.current) {
        setCarouselWidth(carouselRef.current.offsetWidth);
      }
    };

    updateCarouselWidth();
    window.addEventListener("resize", updateCarouselWidth);

    return () => window.removeEventListener("resize", updateCarouselWidth);
  }, []);

  // Handle drag start - pause auto-scroll
  // Add this state to track if it's a drag or click
  const [dragStartPosition, setDragStartPosition] = useState({ x: 0, y: 0 });

  // Modify handleDragStart
  const handleDragStart = (event: MouseEvent | TouchEvent | PointerEvent) => {
    setIsDragging(true);
    const clientX =
      "touches" in event ? event.touches[0].clientX : event.clientX;
    const clientY =
      "touches" in event ? event.touches[0].clientY : event.clientY;
    setDragStartPosition({ x: clientX, y: clientY });
  };

  // Modify handleDragEnd
  const handleDragEnd = (
    event: MouseEvent | TouchEvent | PointerEvent,
    info: PanInfo
  ) => {
    setIsDragging(false);

    // Check if this was actually a drag or just a click
    const clientX =
      "changedTouches" in event
        ? event.changedTouches[0].clientX
        : event.clientX;
    const clientY =
      "changedTouches" in event
        ? event.changedTouches[0].clientY
        : event.clientY;

    const dragDistance = Math.sqrt(
      Math.pow(clientX - dragStartPosition.x, 2) +
        Math.pow(clientY - dragStartPosition.y, 2)
    );

    // If drag distance is small, it was likely a click - don't prevent it
    if (dragDistance < 10) {
      return;
    }

    const currentX = x.get();
    const velocity = info.velocity.x;

    // Calculate final position with momentum
    let finalX = currentX + velocity * 0.1;

    // Infinite loop logic - reset position when reaching boundaries
    const resetThreshold = itemWidth * projects.length;

    if (finalX > 0) {
      finalX = finalX - resetThreshold;
    } else if (finalX < -resetThreshold * 2) {
      finalX = finalX + resetThreshold;
    }

    // Smooth animation to final position
    animate(x, finalX, {
      type: "spring",
      stiffness: 300,
      damping: 30,
    });
  };

  // Handle mouse enter - pause auto-scroll
  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  // Handle mouse leave - resume auto-scroll
  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  // Snap to nearest card on drag end
  const snapToCard = () => {
    const currentX = x.get();
    const cardIndex = Math.round(-currentX / itemWidth);
    const targetX = -cardIndex * itemWidth;

    x.set(targetX);
  };

  return (
    <div className="relative w-full py-8 my-0 overflow-hidden">
      {/* Background gradient for 3D depth */}
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-black/5 to-transparent pointer-events-none" />
      {/* Main carousel container */}
      <motion.div
        ref={carouselRef}
        className="relative perspective-1000 "
        style={{ rotateY }}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <motion.div
          className="flex gap-10 cursor-grab active:cursor-grabbing"
          style={{ x }}
          drag="x"
          dragConstraints={{
            left: -totalWidth + carouselWidth,
            right: 0,
          }}
          dragElastic={0.1}
          dragMomentum={true}
          onDragStart={handleDragStart}
          onDragEnd={handleDragEnd}
          whileDrag={{ cursor: "grabbing" }}
          transition={{
            type: "spring",
            stiffness: 300,
            damping: 30,
          }}
        >
          {infiniteProjects.map((project, index) => (
            <motion.div
              key={`${project.title}-${index}`}
              className="flex-shrink-0"
              style={{ width: cardWidth }}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                delay: (index % projects.length) * 0.1,
                duration: 0.6,
                ease: "easeOut",
              }}
              onClick={(e) => {
                // Only navigate if not dragging
                if (!isDragging) {
                  e.stopPropagation();
                  const router = useRouter();
                  if (project.slug) {
                    router.push(`/projects?project=${project.slug}`);
                  }
                }
              }}
            >
              <ProjectCard {...project} index={index} />
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
      {/* Navigation indicators */}
      <div className="flex justify-center mt-6 gap-2">
        {projects.map((_, index) => {
          const currentIndex = Math.abs(
            Math.round(x.get() / -itemWidth) % projects.length
          );
          const isActive = currentIndex === index;

          return (
            <motion.button
              key={index}
              className={`w-2 h-2 rounded-full transition-all duration-300 ${
                isActive ? "bg-white" : "bg-white/30"
              }`}
              whileHover={{ scale: 1.2 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => {
                const targetX = -index * itemWidth;
                x.set(targetX);
              }}
            />
          );
        })}
      </div>
      {/* Auto-scroll status indicator */}
      <motion.div
        className="absolute top-2 right-4 flex items-center gap-2 text-white/50 text-xs"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
      >
        <motion.div
          className="w-2 h-2  bg-green-300 shadow-lg shadow-white rounded-full"
          animate={
            !isDragging && !isHovered
              ? {
                  scale: [1, 1.2, 1],
                  opacity: [0.5, 1, 0.5],
                }
              : {}
          }
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <span>
          {isDragging ? "Dragging" : isHovered ? "Paused" : "Auto-scrolling"}
        </span>
      </motion.div>{" "}
      {/* Drag instruction text */}
      <motion.p
        className="text-center text-white/60 text-sm mt-14"
        initial={{ opacity: 0 }}
        animate={{ opacity: isDragging ? 0 : 1 }}
        transition={{ duration: 0.3 }}
      >
        {isHovered ? "Hover paused • " : ""}Drag to explore projects
        {!isHovered ? " • Auto-scrolling active" : ""}
      </motion.p>
    </div>
  );
};

export default ProjectCarousel;
