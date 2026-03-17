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
  postImages?: { src: string; alt: string; caption?: string }[];
  credits: { role: string; name: string }[];
}

export const projects: Project[] = [
  {
    title: "KISANGANI",
    year: "1964 · Congo Crisis",
    category: "RESCUE",
    image: "/images/delbert-carper-rescue-plane.jpeg",
    slug: "kisangani",
    client: "Delbert Carper",
    overview:
      "A family origin story: my grandfather's rescue and survival in Kisangani during the Congo Crisis.",
    description:
      "My grandfather, Delbert Carper, along with his wife and young daughter, were rescued from Kisangani (present-day Democratic Republic of Congo) during the 1964 crisis—an experience later told in Out of the Jaws of the Lion. This is the actual inside-cover rescue-plane photo from Homer Dowdy's book, showing my grandfather at far right, moments after the rescue from Stanleyville.",
    postImages: [
      {
        src: "/images/project-of-earth.png",
        alt: "Tree-lined street in Kisangani",
        caption: "Tree-lined street scene from Kisangani.",
      },
    ],
    credits: [
      { role: "Subject", name: "Delbert Carper (My Grandfather)" },
      { role: "Book", name: "Out of the Jaws of the Lion" },
      { role: "Place", name: "Kisangani (DRC)" },
    ],
  },
  {
    title: "BUJUMBURA",
    year: "2026 · Burundi",
    category: "ARRIVAL",
    image: "/images/project-echoes-of-us.png",
    video: "/images/bujumbura-video.mov",
    slug: "bujumbura",
    client: "Field Journal",
    overview:
      "Bujumbura marks the first landing point, where the mission shifts from planning to presence.",
    description:
      "Arrival in Bujumbura is equal parts orientation and emotion: heat, noise, and immediate movement. It is the threshold where family history, faith, and practical service finally meet the ground. Early moments here set the tone for everything that follows—watching closely, listening first, and learning the pace of place.",
    credits: [
      { role: "Theme", name: "Arrival" },
      { role: "Place", name: "Bujumbura, Burundi" },
      { role: "Focus", name: "First impressions" },
    ],
  },
  {
    title: "KIBUYE",
    year: "2026 · Burundi",
    category: "HOME",
    image: "/images/kibuye.png",
    video: "/images/kibuye-video.mov",
    slug: "kibuye",
    client: "Field Journal",
    overview:
      "Kibuye becomes home base, where daily routines reveal what lasting presence really requires.",
    description:
      "In Kibuye, work is measured less by milestones and more by relationships built over ordinary days. The town is where people are known by name, where needs are specific, and where service becomes personal. Home here means returning each day with deeper context and shared commitment.",
    credits: [
      { role: "Theme", name: "Home" },
      { role: "Place", name: "Kibuye, Burundi" },
      { role: "Focus", name: "Daily life and continuity" },
    ],
  },
  {
    title: "THE ROAD",
    year: "2026 · Burundi",
    category: "ACCESS",
    image: "/images/project-scent-silence.png",
    slug: "the-road",
    client: "Field Journal",
    overview:
      "The road is the constant variable, shaping who can be reached, when, and at what cost.",
    description:
      "Travel between sites defines the practical limits of care and connection. Road conditions, weather, and distance turn simple plans into logistical puzzles that must be solved in real time. This chapter follows the movement required to bridge remote places and keep support consistent.",
    credits: [
      { role: "Theme", name: "Access" },
      { role: "Place", name: "Rural corridors, Burundi" },
      { role: "Focus", name: "Transport and reach" },
    ],
  },
  {
    title: "SHANTY TOWN",
    year: "2026 · Tanzania",
    category: "EXPLORE",
    image: "/images/project-light-between.png",
    slug: "tanzania",
    client: "Field Journal",
    overview:
      "Across the border in Tanzania, exploration widens the frame and tests what can transfer across contexts.",
    description:
      "This place introduces a different urban edge, where density and scarcity sit side by side. Exploring here is less about coverage and more about careful observation—what patterns repeat, and what changes with local realities. The lessons gathered in Tanzania sharpen how the broader mission adapts and responds.",
    credits: [
      { role: "Theme", name: "Explore" },
      { role: "Place", name: "Shanty Town, Tanzania" },
      { role: "Focus", name: "Cross-border perspective" },
    ],
  },
];

export function getProjectBySlug(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}

export function getOtherProjects(slug: string): Project[] {
  return projects.filter((p) => p.slug !== slug);
}
