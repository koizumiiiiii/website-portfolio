export interface Project {
  id: number;
  title: string;
  description: string;
  longDescription: string;
  tags: string[];
  emoji: string;
  /** REPLACE WITH YOUR ACTUAL PROJECT SCREENSHOT PATH e.g. "/images/pandarawan.png" */
  imageUrl: string;
  gradient: { from: string; to: string };
  metric?: { value: string; label: string };
  year: string;
}

export const projects: Project[] = [
  {
    id: 1,
    title: "Pandarawan Rental & Tenant Management System",
    description:
      "A centralized property administration platform for landlords and tenants — automating monthly billing, analytics, maintenance requests, lease tracking, and OTP-authenticated payment uploads.",
    longDescription:
      "Built to replace manual landlord workflows. Admins get automated billing cycles and occupancy analytics; tenants get a secure portal to submit maintenance tickets, view their lease timeline, and upload proof of payment — all protected by OTP authentication.",
    tags: ["PHP", "Laravel", "MySQL", "Blade", "OTP Auth"],
    emoji: "🏠",
    /** REPLACE WITH YOUR ACTUAL PROJECT SCREENSHOT PATH e.g. "/images/pandarawan.png" */
    imageUrl: "/images/pandarawan.png",
    gradient: { from: "#EFF6FF", to: "#EDE9FE" },
    metric: { value: "Multi-role", label: "Admin & Tenant portal" },
    year: "2024",
  },
  {
    id: 2,
    title: "Network Malware Detection",
    description:
      "A machine learning-powered system that analyzes network traffic patterns in real-time to identify and classify security threats, delivering actionable alerts and detailed threat reports.",
    longDescription:
      "Trained on labeled network traffic datasets, the classifier flags anomalous packet patterns in real-time. A live dashboard surfaces threat categories, confidence scores, and historical trend data so administrators can respond quickly and accurately.",
    tags: ["Python", "Scikit-learn", "ML", "Pandas", "Flask"],
    emoji: "🛡️",
    /** REPLACE WITH YOUR ACTUAL PROJECT SCREENSHOT PATH e.g. "/images/malware-detection.png" */
    imageUrl: "/images/malware-detection.png",
    gradient: { from: "#ECFDF5", to: "#F0FDF4" },
    metric: { value: "Real-time", label: "Threat classification" },
    year: "2024",
  },
  {
    id: 3,
    title: "PaoPals Food Ordering & Management System",
    description:
      "A secure, web-based food ordering platform built for local SMEs — covering automated ordering, order fulfillment tracking, inventory management, and role-based access controls.",
    longDescription:
      "Designed for small and medium food businesses that need more than a basic ordering page. Features include a customer-facing menu and cart, kitchen order queue, inventory alerts when stock runs low, and granular role permissions separating staff from managers and owners.",
    tags: ["PHP", "Laravel", "MySQL", "JavaScript", "RBAC"],
    emoji: "🍱",
    /** REPLACE WITH YOUR ACTUAL PROJECT SCREENSHOT PATH e.g. "/images/paopals.png" */
    imageUrl: "/images/paopals.png",
    gradient: { from: "#FFF7ED", to: "#FFFBEB" },
    metric: { value: "End-to-end", label: "Order fulfillment flow" },
    year: "2025",
  },
  {
    id: 4,
    title: "GameForge",
    description:
      "A specialized e-commerce storefront for discovering and purchasing high-performance gaming gear and peripherals — built with a focus on browsing experience and product presentation.",
    longDescription:
      "GameForge gives enthusiast buyers a clean, fast way to explore curated gaming hardware. The storefront emphasizes rich product detail pages, filtering by category and spec, and a streamlined checkout, making it easy to find the right peripheral without the noise of a generic marketplace.",
    tags: ["React", "Next.js", "TypeScript", "Tailwind CSS"],
    emoji: "🎮",
    /** REPLACE WITH YOUR ACTUAL PROJECT SCREENSHOT PATH e.g. "/images/gameforge.png" */
    imageUrl: "/images/gameforge.png",
    gradient: { from: "#F5F3FF", to: "#EDE9FE" },
    metric: { value: "E-commerce", label: "Gaming gear storefront" },
    year: "2025",
  },
];