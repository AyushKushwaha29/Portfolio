export type Project = {
  id: string;
  title: string;
  eyebrow: string;
  description: string;
  story: string;
  stack: string[];
  pipeline: string[];
  type: "commerce" | "health" | "career" | "vision";
};

export const navItems = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Projects", href: "#projects" },
  { label: "Skills", href: "#skills" },
  { label: "Resume", href: "/ayush-resume.pdf" },
  { label: "Contact", href: "#contact" },
];

export const projects: Project[] = [
  {
    id: "01",
    title: "FreshMart",
    eyebrow: "From an idea to a working e-commerce platform.",
    description:
      "A full-stack e-commerce platform with authentication, product management, cart, orders, payments, invoices, notifications, media storage and an admin dashboard.",
    story: "Built it. Broke it. Fixed it. Shipped it.",
    stack: ["React.js", "Vite", "Tailwind CSS", "Node.js", "Express.js", "MongoDB", "Razorpay", "Cloudinary", "MSG91"],
    pipeline: ["Frontend", "API", "Database", "Services"],
    type: "commerce",
  },
  {
    id: "02",
    title: "MediLens",
    eyebrow: "Turning complex medical reports into understandable insights.",
    description:
      "An AI-powered application that analyzes medical reports, extracts health parameters, and generates structured, AI-generated health insights and future-oriented estimates.",
    story: "Insights for understanding, not medical diagnosis.",
    stack: ["Python", "FastAPI/Flask", "Machine Learning", "NLP", "PDF Processing", "React.js", "Database"],
    pipeline: ["Report", "Extraction", "AI Analysis", "Insights", "Estimate"],
    type: "health",
  },
  {
    id: "03",
    title: "AI Career Path Recommender",
    eyebrow: "Skills in. A clearer direction out.",
    description:
      "An ML-powered web app that analyzes user skills and resumes to recommend career paths, identify skill gaps, and generate personalized roadmaps with an interactive dashboard.",
    story: "Turn a skill inventory into the next useful step.",
    stack: ["Python", "Flask", "SQLAlchemy", "Scikit-learn", "Pandas", "NumPy", "Chart.js", "PyPDF2"],
    pipeline: ["Resume", "Skill extraction", "Gap analysis", "Career path", "Roadmap"],
    type: "career",
  },
  {
    id: "04",
    title: "Sign Language Detection",
    eyebrow: "Computer vision designed to make a gesture legible.",
    description:
      "A CNN-based computer vision system designed to detect and classify sign language gestures using image processing and deep learning.",
    story: "A camera frame becomes a meaningful signal.",
    stack: ["Python", "TensorFlow/Keras", "CNN", "OpenCV", "NumPy", "Matplotlib"],
    pipeline: ["Camera", "Image", "Processing", "CNN", "Prediction"],
    type: "vision",
  },
];

export const skillGroups = [
  { title: "Programming", skills: ["Python", "C++", "JavaScript", "SQL"] },
  { title: "Frontend", skills: ["HTML5", "CSS3", "React.js", "Vite", "Tailwind CSS"] },
  { title: "Backend", skills: ["Node.js", "Express.js", "Flask", "FastAPI", "REST APIs"] },
  { title: "AI / ML", skills: ["Machine Learning", "TensorFlow/Keras", "Scikit-learn", "OpenCV", "NLP", "Pandas", "NumPy"] },
  { title: "Database", skills: ["MongoDB", "MySQL", "SQLite", "Firebase/Firestore"] },
  { title: "Tools", skills: ["Git", "GitHub", "Postman", "Vercel", "Cloudinary", "Razorpay", "MSG91"] },
];

export const contactLinks = {
  github: "https://github.com/AyushKushwaha29",
  linkedin: "https://www.linkedin.com/in/ayush-kushwaha-3247b9280/",
  email: "mailto:ayush.kushwaha.29.10.2004@gmail.com",
};
