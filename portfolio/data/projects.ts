export interface Project {
  id: number;
  title: string;
  description: string;
  longDescription: string;
  tags: string[];
  image: string;          // screenshot from /public
  gradient: { from: string; to: string };
}

export const projects: Project[] = [
  {
    id: 1,
    title: "Pandarawan Rental & Tenant Management System",
    description:
      "A full-stack web application for managing rental properties, tenant records, lease agreements, and payment tracking in one place.",
    longDescription:
      "Built with Laravel and MySQL. Streamlines day-to-day landlord operations — tenant onboarding, rent collection reminders, lease document management, and occupancy analytics.",
    tags: ["PHP", "Laravel", "MySQL", "Blade"],
    image: "/Images/Pandarawan Rental and Tenant Management System.png",
    gradient: { from: "#EFF6FF", to: "#EDE9FE" },
  },
  {
    id: 2,
    title: "Network Malware Detection",
    description:
      "A machine learning system that analyses network traffic patterns to detect and classify malware activity in real time.",
    longDescription:
      "Uses scikit-learn classifiers trained on labelled network flow datasets. Features threat classification, visual dashboards, and per-connection risk scoring.",
    tags: ["Python", "ML", "Scikit-learn", "Pandas"],
    image: "/Images/NetworkMalwareDetection.png",
    gradient: { from: "#ECFDF5", to: "#F0FDF4" },
  },
  {
    id: 3,
    title: "Paopals",
    description:
      "A secure, web-based food ordering and management platform built to streamline operations for local small and medium enterprises covering automated customer ordering, order fulfillment tracking, inventory management, and robust role-based security controls.",
    longDescription:
      "React + Next.js frontend with a Node.js backend. Real-time messaging, interest-based matching, and event scheduling built for the UM community.",
    tags: ["React", "Next.js", "Node.js", "TypeScript"],
    image: "/Images/Paopals.png",
    gradient: { from: "#FFF7ED", to: "#FFFBEB" },
  },
  {
    id: 4,
    title: "GameForge",
    description:
      "A game discovery and collection tracker — browse, wishlist, and rate titles across platforms with a clean, fast UI.",
    longDescription:
      "Pulls data from the RAWG API. Features filtering by genre/platform, personal wishlists, and a rating system backed by a lightweight SQLite store.",
    tags: ["React", "TypeScript", "RAWG API", "Tailwind"],
    image: "/Images/GameForge.png",
    gradient: { from: "#F5F3FF", to: "#EDE9FE" },
  },
];