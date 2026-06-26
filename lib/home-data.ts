export const stackItems = [
  "REACT",
  "NEXT.JS",
  "TYPESCRIPT",
  "TAILWIND CSS",
  "SUPABASE",
  "FIREBASE",
  "ZUSTAND",
  "MDX",
  "RESPONSIVE UI",
  "API INTEGRATION",
];

export const projects = [
  {
    num: "01",
    id: "layar-digi",
    title: "Layar Digi",
    desc: "A responsive online ticket booking platform covering movie browsing, ticket reservation, studio booking, booking status verification, payment status updates, and operational dashboard workflows.",
    stack: ["React", "Next.js", "TypeScript", "Tailwind CSS", "shadcn/ui", "Zustand", "React Hook Form", "Zod", "Axios"],
    image: "/projects/layar-digi.webp",
    demoUrl: "https://booking.layardigi.com",
    repositoryUrl: "",
  },
  {
    num: "02",
    id: "isyara",
    title: "Isyara",
    desc: "A BISINDO learning web app with real-time hand detection and in-browser A-Z gesture classification, structured learning units, quiz mode, progress tracking, gamification, leaderboard, Supabase authentication, and lesson management.",
    stack: ["Next.js", "TypeScript", "Tailwind CSS", "shadcn/ui", "Supabase", "TensorFlow.js", "MediaPipe Hands"],
    image: "/project-1.png",
    demoUrl: "https://isyara.alipnf.my.id",
    repositoryUrl: "https://github.com/alipnf/Isyara-FE",
  },
  {
    num: "03",
    id: "planify",
    title: "Planify",
    desc: "A course scheduling web app with course management, manual scheduling, AI-assisted timetable generation, schedule saving, and shareable schedule links.",
    stack: ["React", "Next.js", "TypeScript", "Zustand", "Supabase", "shadcn/ui"],
    image: "/projects/planify.webp",
    demoUrl: "",
    repositoryUrl: "https://github.com/alipnf/planify",
  },
  {
    num: "04",
    id: "bluebay",
    title: "Blue Bay",
    desc: "An aquaculture e-commerce platform covering product discovery, cart, virtual payment checkout, order tracking, admin dashboard views, transaction management, and product/article management.",
    stack: ["React", "Zustand", "Tailwind CSS", "DaisyUI", "Chart.js", "Toastify-js"],
    image: "/projects/bluebay.webp",
    demoUrl: "",
    repositoryUrl: "https://github.com/alipnf/blueBay",
  },
  {
    num: "05",
    id: "banobakehouse",
    title: "Banobakehouse",
    desc: "An informational bakery website with authentication, FAQ, wishlist features, and an admin panel for managing products, categories, and FAQs with access control and CRUD operations.",
    stack: ["React", "Zustand", "Tailwind CSS", "Supabase", "Vercel"],
    image: "/projects/banobakehouse.webp",
    demoUrl: "",
    repositoryUrl: "https://github.com/alipnf/banobakehouse",
  },
];

export const experience = [
  {
    period: "Feb - Aug 2026",
    title: "Frontend Developer Intern",
    org: "PT WIR ASIA Tbk",
    stack: ["React", "Next.js", "TypeScript", "Tailwind CSS", "REST API"],
    desc: "Developed frontend interfaces for Layar Digi across a customer-facing booking app and internal admin dashboard, covering movie browsing, schedule and seat selection, payment status updates, booking submission, reservation workflows, REST API consumption, and client-side async state handling.",
  },
  {
    period: "Jan - Apr 2025",
    title: "Frontend Developer Intern",
    org: "PT Digital House Nusantara",
    stack: ["React", "CMS/Admin Dashboard", "REST API", "Taiga"],
    desc: "Developed and maintained a React-based corporate website and role-based CMS/Admin Dashboard with separate admin and user interfaces, translated Figma designs into responsive UI, built reusable components, integrated REST APIs with loading and error states, and performed cross-device visual QA.",
  },
  {
    period: "Sep - Dec 2024",
    title: "ReactJS Front-End Engineer Program",
    org: "MSIB Batch 7 - Alterra Academy",
    stack: ["React", "REST API", "Team Lead", "Trello"],
    desc: "Led the frontend team in the capstone project, defined development standards, managed sprint progress, translated Figma designs into responsive React interfaces, integrated REST APIs, and reviewed pull requests.",
  },
  {
    period: "Sep 2022 - Feb 2026",
    title: "Bachelor's Degree in Informatics Engineering",
    org: "Universitas Muria Kudus",
    stack: ["GPA 3.89 / 4.00"],
    desc: "Graduated with a GPA of 3.89 / 4.00 and published research on real-time web-based BISINDO alphabet recognition using MediaPipe and MLP.",
  },
];

export const skills = [
  { label: "Frontend", names: "React, Next.js" },
  { label: "Programming", names: "JavaScript, TypeScript" },
  { label: "Styling & UI", names: "Tailwind CSS, Bootstrap, shadcn/ui, DaisyUI, Preline" },
  { label: "State Management", names: "Zustand, Redux" },
  { label: "Backend / BaaS", names: "Supabase, Firebase" },
  { label: "API", names: "REST API Integration" },
  { label: "Tools", names: "Git, GitHub, Postman, Figma, Taiga, Trello, Linux" },
  { label: "Soft Skills", names: "Communication, Teamwork, Problem-Solving, Adaptability" },
];

export const notes = [
  {
    title: "Server Components dan Client Components",
    tag: "Next.js",
    date: "Dec 2025",
    excerpt: "Catatan tentang pembagian tanggung jawab komponen server dan client di Next.js App Router.",
    href: "/notes/NEXT.js/server-and-client-components",
  },
  {
    title: "Git Conflict Resolution",
    tag: "Git",
    date: "Nov 2025",
    excerpt: "Ringkasan cara membaca conflict marker dan menyelesaikan konflik merge dengan aman.",
    href: "/notes/Git/git-conflict-resolution",
  },
  {
    title: "PostgreSQL Setup",
    tag: "PostgreSQL",
    date: "Oct 2025",
    excerpt: "Setup awal PostgreSQL, user, database, dan alur dasar untuk mulai memakai psql.",
    href: "/notes/PostgreSQL/postgresql-setup",
  },
];

export type Project = (typeof projects)[number];
