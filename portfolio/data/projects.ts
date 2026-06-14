export interface Project {
  id: number;
  title: string;
  description: string;
  longDescription: string;
  tags: string[];
  emoji: string;
  githubUrl: string;
  liveUrl?: string;
  gradient: { from: string; to: string };
  metric?: { value: string; label: string };
  year: string;
}

export const projects: Project[] = [
  {
    id: 1,
    title: "Barangay Profiling System",
    description:
      "A comprehensive digital platform for managing barangay resident records, demographics, and community data with full CRUD and analytics.",
    longDescription:
      "Built with Laravel and MySQL, this system digitalizes barangay operations — tracking residents, households, and community statistics with role-based access for staff.",
    tags: ["PHP", "Laravel", "MySQL", "Blade"],
    emoji: "🏛️",
    githubUrl: "https://github.com/koizumiiiiii",
    gradient: { from: "#EFF6FF", to: "#EDE9FE" },
    metric: { value: "500+", label: "Records managed" },
    year: "2024",
  },
  {
    id: 2,
    title: "Network Intrusion Detection",
    description:
      "A machine learning system that analyzes network traffic patterns to detect and classify potential security intrusions in real time.",
    longDescription:
      "Uses scikit-learn classifiers trained on the KDD dataset. Features include real-time packet analysis, threat classification, and visual dashboards for security monitoring.",
    tags: ["Python", "ML", "Scikit-learn", "Pandas"],
    emoji: "🔐",
    githubUrl: "https://github.com/koizumiiiiii",
    gradient: { from: "#ECFDF5", to: "#F0FDF4" },
    metric: { value: "97%", label: "Detection accuracy" },
    year: "2024",
  },
  {
    id: 3,
    title: "UM Marketplace",
    description:
      "A university-focused online marketplace connecting students and faculty for buying, selling, and trading goods on campus.",
    longDescription:
      "Full-stack marketplace built with React and Next.js, featuring product listings, search, messaging, and a secure checkout flow tailored for the UM community.",
    tags: ["React", "Next.js", "MySQL", "TypeScript"],
    emoji: "🛒",
    githubUrl: "https://github.com/koizumiiiiii",
    gradient: { from: "#FFF7ED", to: "#FFFBEB" },
    metric: { value: "200+", label: "Active listings" },
    year: "2025",
  },
  {
    id: 4,
    title: "Email Phishing Detection",
    description:
      "An NLP-powered classifier that identifies phishing emails with high accuracy using feature extraction and ensemble machine learning models.",
    longDescription:
      "Trained on 10,000+ labeled emails. Combines TF-IDF features with URL pattern analysis and a Random Forest ensemble for robust, low-false-positive phishing detection.",
    tags: ["Python", "NLP", "Jupyter", "NLTK"],
    emoji: "📧",
    githubUrl: "https://github.com/koizumiiiiii",
    gradient: { from: "#FEF2F2", to: "#FFF1F2" },
    metric: { value: "94%", label: "Precision rate" },
    year: "2024",
  },
  {
    id: 5,
    title: "Automata Simulator",
    description:
      "An interactive simulator for finite automata and formal languages — visualizing DFA/NFA transitions, state graphs, and regular expression matching.",
    longDescription:
      "Built in Java with a custom Swing UI. Supports epsilon-NFA to DFA conversion, step-by-step string acceptance, and graphical state diagram rendering for CS theory coursework.",
    tags: ["Java", "CS Theory", "Swing", "Algorithms"],
    emoji: "⚙️",
    githubUrl: "https://github.com/koizumiiiiii",
    gradient: { from: "#F5F3FF", to: "#EDE9FE" },
    metric: { value: "DFA/NFA", label: "Both supported" },
    year: "2025",
  },
];
