// data/projects.ts

export interface MediaItem {
  type: "image" | "video";
  url: string;
}

export interface Project {
  title: string;
  slug: string; // New slug field
  category: string | string[];
  description: string;
  media: MediaItem[];
  software: string[];
}

export const projects: Project[] = [
  {
    title: "Tori",
    slug: "tori",
    category: ["3D Environment", "Architecture", "Nature"],
    description:
      "An intricately designed shrine environment featuring spiritual ambiance and architectural finesse.",
    media: [
      { type: "video", url: "/Project_Media/Videos/LS_Slow-Track-Shot.mp4" },
      { type: "image", url: "/Project_Media/Tori/R1_1.jpeg" },
      { type: "image", url: "/Project_Media/Tori/R2_1.jpeg" },
      { type: "image", url: "/Project_Media/Tori/R3_1.jpeg" },
      { type: "image", url: "/Project_Media/Tori/R1.jpeg" },
      { type: "image", url: "/Project_Media/Tori/R2.jpeg" },
      { type: "image", url: "/Project_Media/Tori/R3.jpeg" },
    ],
    software: ["Unreal Engine", "Blender", "Substance Painter"],
  },
  {
    title: "The Canyon",
    slug: "canyon",
    category: ["3D Environment", "Video Environment"],
    description:
      "A majestic canyon scene showcasing dramatic rock formations and cinematic lighting.",
    media: [
      { type: "video", url: "/Project_Media/Canyon/canyon_vid.mp4" },
      { type: "image", url: "/Project_Media/Canyon/canyon_img.png" },
    ],
    software: ["Unreal Engine", "Blender"],
  },
  {
    title: "Devis",
    slug: "devis",
    category: ["3D Characters", "Divine Models"],
    description:
      "A collection of deity character models featuring intricate detailing and cultural significance.",
    media: [
      { type: "image", url: "/Project_Media/Devis/Lakshmi.jpg" },
      { type: "image", url: "/Project_Media/Devis/Lalita.jpg" },
      { type: "image", url: "/Project_Media/Devis/saraswati.jpg" },
      { type: "image", url: "/Project_Media/Devis/trio.png" },
    ],
    software: ["Blender", "Substance Painter", "Marvelous Designer"],
  },
  {
    title: "Garden",
    slug: "garden",
    category: ["3D Environment", "Nature"],
    description:
      "A serene garden environment filled with lush greenery and tranquil atmosphere.",
    media: [
      { type: "video", url: "/Project_Media/Garden/garden_vid.mp4" },
      { type: "image", url: "/Project_Media/Garden/garden_img.png" },
    ],
    software: ["Unreal Engine", "Blender"],
  },
  {
    title: "Hall",
    slug: "hall",
    category: ["3D Environment", "Architecture"],
    description:
      "A grand hall environment designed with attention to lighting, structure, and spatial depth.",
    media: [
      { type: "video", url: "/Project_Media/hall/hall_vid.mp4" },
      { type: "image", url: "/Project_Media/hall/hall_img.png" },
    ],
    software: ["Unreal Engine", "Blender"],
  },
  {
    title: "Kali",
    slug: "kali",
    category: ["3D Characters", "Divine Models"],
    description:
      "A dynamic series of renders depicting Goddess Kali in various expressive forms.",
    media: [
      { type: "image", url: "/Project_Media/Kali/Kali_01.jpg" },
      { type: "image", url: "/Project_Media/Kali/Kali_02.jpg" },
      { type: "image", url: "/Project_Media/Kali/Kali_03.jpg" },
      { type: "image", url: "/Project_Media/Kali/Kali_04.jpg" },
      { type: "image", url: "/Project_Media/Kali/Kali_05.jpg" },
      { type: "image", url: "/Project_Media/Kali/Kali_06.jpg" },
    ],
    software: ["Blender", "Substance Painter", "Marvelous Designer"],
  },
  {
    title: "Lalita",
    slug: "lalita",
    category: ["3D Characters", "Divine Models"],
    description:
      "A serene depiction of Goddess Lalita, accompanied by vibrant environments and symbolic aesthetics.",
    media: [
      { type: "video", url: "/Project_Media/Lalita/lalita_vid.mp4" },
      { type: "image", url: "/Project_Media/Lalita/lalita_1.png" },
      { type: "image", url: "/Project_Media/Lalita/lalita_2.png" },
      { type: "image", url: "/Project_Media/Lalita/lalita_3.png" },
      { type: "image", url: "/Project_Media/Lalita/lalita_4.png" },
      { type: "image", url: "/Project_Media/Lalita/lalita_5.png" },
      { type: "image", url: "/Project_Media/Lalita/lalita_6.jpeg" },
    ],
    software: ["Blender", "Substance Painter", "Marvelous Designer"],
  },
  {
    title: "Lavender Environment",
    slug: "lavender-environment",
    category: ["3D Environment", "Nature"],
    description:
      "A calming lavender field environment designed with vibrant color palettes and soft lighting.",
    media: [
      { type: "image", url: "/Project_Media/LavenderEnv/Lav1.jpg" },
      { type: "image", url: "/Project_Media/LavenderEnv/Lav2.jpg" },
      { type: "image", url: "/Project_Media/LavenderEnv/Lav3.jpg" },
    ],
    software: ["Blender"],
  },
  {
    title: "Shrine",
    slug: "shrine",
    category: ["3D Environment", "Architecture"],
    description:
      "An intricately designed shrine environment featuring spiritual ambiance and architectural finesse.",
    media: [
      { type: "image", url: "/Project_Media/Shrine/Shrine_1.jpg" },
      { type: "image", url: "/Project_Media/Shrine/Shrine_2.jpg" },
      { type: "image", url: "/Project_Media/Shrine/Shrine_3.jpg" },
      { type: "image", url: "/Project_Media/Shrine/Shrine_4.jpg" },
      { type: "image", url: "/Project_Media/Shrine/Shrine_5.jpg" },
      { type: "image", url: "/Project_Media/Shrine/Shrine_6.jpg" },
    ],
    software: ["Unreal Engine"],
  },
];
