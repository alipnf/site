export const stackItems = [
  "REACT",
  "NEXT.JS",
  "TYPESCRIPT",
  "TAILWIND CSS",
  "SUPABASE",
  "FIREBASE",
  "ZUSTAND",
  "RESPONSIVE UI",
  "PRISMA",
  "POSTGRESQL",
  "MYSQL",
  "VITEST",
  "PLAYWRIGHT",
];

export const projects = [
  {
    num: "01",
    id: "layar-digi",
    title: "Layar Digi",
    desc: "A responsive ticket-booking platform covering movie browsing, schedule and seat selection, booking submission, payment-status updates, and studio reservations with date, time-slot, and form validation. Also includes an operational dashboard for transactions, revenue, occupancy, kiosks, failed payments, schedules, and device status.",
    stack: [
      "React",
      "Next.js",
      "TypeScript",
      "Tailwind CSS",
      "shadcn/ui",
      "Zustand",
      "React Hook Form",
      "Zod",
      "Axios",
    ],
    image: "/projects/layar-digi.webp",
    demoUrl: "https://booking.layardigi.com",
    repositoryUrl: "",
  },
  {
    num: "02",
    id: "isyara",
    title: "Isyara",
    desc: "A BISINDO learning web app with real-time in-browser A-Z gesture classification using a TensorFlow.js MLP model and MediaPipe Hands landmarks, achieving 97.77% test accuracy. Includes structured learning units, quizzes, progress tracking, gamification, and a leaderboard.",
    stack: [
      "Next.js",
      "TypeScript",
      "Tailwind CSS",
      "shadcn/ui",
      "Supabase",
      "TensorFlow.js",
      "MediaPipe Hands",
    ],
    image: "/projects/Isyara.webp",
    demoUrl: "https://isyara.alipnf.my.id",
    repositoryUrl: "https://github.com/alipnf/Isyara-FE",
  },
  {
    num: "03",
    id: "planify",
    title: "Planify",
    desc: "A course scheduling web app with course management, manual scheduling, Gemini API-powered timetable generation, schedule saving, and shareable schedule links.",
    stack: [
      "React",
      "Next.js",
      "TypeScript",
      "Zustand",
      "Supabase",
      "shadcn/ui",
      "Gemini API",
    ],
    image: "/projects/planify.webp",
    demoUrl: "",
    repositoryUrl: "https://github.com/alipnf/planify",
  },
  {
    num: "04",
    id: "bluebay",
    title: "Blue Bay",
    desc: "An aquaculture e-commerce platform covering product discovery, cart, virtual payment checkout, order tracking, admin dashboard views, transaction management, and product/article management.",
    stack: [
      "React",
      "Zustand",
      "Tailwind CSS",
      "DaisyUI",
      "Chart.js",
      "Toastify-js",
    ],
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
    period: "Feb 2026 - Present",
    title: "Frontend Developer Intern",
    org: "PT WIR ASIA Tbk",
    stack: ["React", "Next.js", "TypeScript", "Tailwind CSS", "REST API"],
    desc: "Developing Layar Digi's customer booking app and admin dashboard, including ticket flows, studio reservations, reporting, schedules, device status, and operational data management. Integrated REST APIs and implemented authentication, refresh-token queueing, and periodic payment-status updates.",
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
    title: "Bachelor's Degree in Informatics Engineering (S.Kom.)",
    org: "Universitas Muria Kudus",
    stack: ["GPA 3.89 / 4.00"],
    desc: "Graduated with a GPA of 3.89 / 4.00. Published “Real-Time Web-Based BISINDO Alphabet Recognition Using MediaPipe and MLP” in SCAN: Jurnal Teknologi Informasi dan Komunikasi Vol. 21 No. 1 (2026).",
  },
];

export const skills = [
  { label: "Frontend", names: "React, Next.js" },
  { label: "Programming", names: "JavaScript, TypeScript" },
  {
    label: "Styling & UI",
    names: "CSS, Tailwind CSS, shadcn/ui, DaisyUI",
  },
  { label: "State Management", names: "Zustand, Redux" },
  { label: "Database & ORM", names: "Prisma ORM, PostgreSQL, MySQL" },
  { label: "Backend / BaaS", names: "Supabase, Firebase" },
  { label: "Testing", names: "Vitest, Playwright" },
  {
    label: "Tools",
    names: "Git, GitHub, Postman, Figma, Taiga, Trello, Linux",
  },
];

export const notes = [
  {
    title: "Server Components dan Client Components",
    tag: "Next.js",
    date: "Dec 2025",
    excerpt:
      "Catatan tentang pembagian tanggung jawab komponen server dan client di Next.js App Router.",
    href: "/notes/NEXT.js/server-and-client-components",
  },
  {
    title: "Git Conflict Resolution",
    tag: "Git",
    date: "Nov 2025",
    excerpt:
      "Ringkasan cara membaca conflict marker dan menyelesaikan konflik merge dengan aman.",
    href: "/notes/Git/git-conflict-resolution",
  },
  {
    title: "PostgreSQL Setup",
    tag: "PostgreSQL",
    date: "Oct 2025",
    excerpt:
      "Setup awal PostgreSQL, user, database, dan alur dasar untuk mulai memakai psql.",
    href: "/notes/PostgreSQL/postgresql-setup",
  },
];

export type Project = (typeof projects)[number];
