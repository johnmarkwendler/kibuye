export interface Project {
  title: string;
  year: string;
  category: string;
  image: string;
  video?: string;
  slug: string;
  client: string;
  overview: string;
  description: string;
  credits: { role: string; name: string }[];
}

export const projects: Project[] = [
  {
    title: "Of Earth",
    year: "2022",
    category: "Commercial",
    image: "/images/project-of-earth.png",
    slug: "of-earth",
    client: "Terra Botanics",
    overview: "A grounding visual exploration of sustainable agriculture and its connection to the land.",
    description: "Of Earth is a cinematic commercial that traces the journey from soil to table. Filmed across organic farms in Northern California, the piece celebrates the hands that tend the earth and the beauty found in patience. Rich earth tones, golden-hour lighting, and slow-motion harvests create a meditative rhythm that mirrors the natural cycles of growth. The film invites viewers to reconnect with the origin of what nourishes us.",
    credits: [
      { role: "Director", name: "Maren Cole" },
      { role: "Cinematographer", name: "Jude Alvarado" },
      { role: "Editor", name: "Suki Ren" },
      { role: "Producer", name: "Olive Marks" },
      { role: "Colorist", name: "Noa Vance" },
      { role: "Sound Design", name: "Leo Thorne" },
    ],
  },
  {
    title: "After the Quiet",
    year: "2023",
    category: "Short Film",
    image: "/images/project-after-quiet.png",
    slug: "after-the-quiet",
    client: "Independent",
    overview: "A short film exploring solitude, memory, and the spaces we inhabit after loss.",
    description: "After the Quiet follows a woman as she returns to her childhood home after years away. The film unfolds in near-silence, relying on ambient sound and carefully composed frames to convey the weight of absence. Every room holds a memory; every shadow tells a story. Shot on 35mm-inspired digital with a muted palette, the piece is an intimate meditation on grief, healing, and the courage it takes to sit with stillness.",
    credits: [
      { role: "Director", name: "Lior Bennett" },
      { role: "Cinematographer", name: "Theo Marren" },
      { role: "Editor", name: "Finn Drew" },
      { role: "Producer", name: "Clara Osei" },
      { role: "Score", name: "Ines Moreau" },
      { role: "Sound Design", name: "Remi Korr" },
    ],
  },
  {
    title: "Echoes of Us",
    year: "2023",
    category: "Wedding Film",
    image: "/images/project-echoes-of-us.png",
    slug: "echoes-of-us",
    client: "Private Commission",
    overview: "A cinematic wedding film capturing love, light, and a day that felt like poetry.",
    description: "Echoes of Us documents the wedding of two artists in the hills of Tuscany. Rather than a traditional wedding video, the couple wanted a film that felt like a memory — impressionistic, emotional, and deeply personal. We captured candid moments between ceremony and celebration: laughter in golden light, tears during handwritten vows, and the quiet intimacy of two people choosing each other. The result is a love letter preserved in motion.",
    credits: [
      { role: "Director", name: "Maren Cole" },
      { role: "Cinematographer", name: "Jude Alvarado" },
      { role: "Editor", name: "Suki Ren" },
      { role: "Colorist", name: "Noa Vance" },
      { role: "Second Camera", name: "Theo Marren" },
      { role: "Producer", name: "Olive Marks" },
    ],
  },
  {
    title: "Still Breathing",
    year: "2025",
    category: "Brand Film",
    image: "/images/project-still-breathing.png",
    slug: "still-breathing",
    client: "Atelier Kei",
    overview: "A brand film celebrating the art of handmade ceramics and the beauty of imperfection.",
    description: "Still Breathing follows master ceramicist Kei Tanaka through a single day in her studio. The camera lingers on spinning clay, weathered hands, and the quiet concentration that defines her craft. No voiceover, no rush — just the rhythm of creation. The film positions Atelier Kei not as a product brand, but as a philosophy: that beauty lives in imperfection, and that every piece carries the breath of its maker.",
    credits: [
      { role: "Director", name: "Lior Bennett" },
      { role: "Cinematographer", name: "Theo Marren" },
      { role: "Editor", name: "Finn Drew" },
      { role: "Producer", name: "Olive Marks" },
      { role: "Sound Design", name: "Leo Thorne" },
      { role: "Colorist", name: "Noa Vance" },
    ],
  },
  {
    title: "Scent & Silence",
    year: "2022",
    category: "Commercial",
    image: "/images/project-scent-silence.png",
    slug: "scent-silence",
    client: "Laventura Fragrance",
    overview: "A minimalist stills campaign for a niche perfume line, captured in soft natural light.",
    description: "A visual ode to minimalism and memory, Scent & Silence captures the quiet elegance of Laventura's latest perfume line. Shot entirely in soft natural light, the series explores the interplay between fragrance and form — delicate bottles resting in shadow, textured surfaces bathed in morning glow. Each frame evokes a feeling rather than a product: stillness, intimacy, and the unspoken language of scent.",
    credits: [
      { role: "Director", name: "Lior Bennett" },
      { role: "Cinematographer", name: "Theo Marren" },
      { role: "Set Design", name: "Clara Osei" },
      { role: "Editor", name: "Finn Drew" },
      { role: "Lighting Design", name: "Remi Korr" },
      { role: "Producer", name: "Olive Marks" },
    ],
  },
  {
    title: "The Light Between",
    year: "2025",
    category: "Short Film",
    image: "/images/project-light-between.png",
    slug: "the-light-between",
    client: "Independent",
    overview: "A short film about the thresholds we cross and the light that guides us forward.",
    description: "The Light Between is a contemplative short film that explores the liminal spaces of human experience — doorways, corridors, and the moments between certainty and doubt. Told through the journey of a lone figure moving through architectural light and shadow, the piece is both abstract and deeply felt. High-contrast cinematography and an evocative score create a sense of passage: from darkness into illumination, from solitude into connection.",
    credits: [
      { role: "Director", name: "Maren Cole" },
      { role: "Cinematographer", name: "Jude Alvarado" },
      { role: "Editor", name: "Suki Ren" },
      { role: "Score", name: "Ines Moreau" },
      { role: "Sound Design", name: "Leo Thorne" },
      { role: "Producer", name: "Olive Marks" },
    ],
  },
];

export function getProjectBySlug(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}

export function getOtherProjects(slug: string): Project[] {
  return projects.filter((p) => p.slug !== slug);
}
