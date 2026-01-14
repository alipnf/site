'use client';

import Link from 'next/link';
import { useState } from 'react';
import Footer from '@/components/footer';

type Language = 'id' | 'en';

export default function Home() {
  const [lang, setLang] = useState<Language>('id');

  const toggleLang = () => {
    setLang((prev) => (prev === 'id' ? 'en' : 'id'));
  };

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    element?.scrollIntoView({ behavior: 'smooth' });
  };

  const t = {
    id: {
      role: 'Frontend Developer',
      bio: 'Mahasiswa Informatika tingkat akhir yang lagi open to work (alias: nganggur). Fokus bikin UI React/Next.js yang responsif & aksesibel, clean code, dan komponen reusable siap disuruh “benerin yang cuma 1px”.',

      nav: {
        projects: 'Proyek',
        experience: 'Pengalaman',
        education: 'Pendidikan',
        skills: 'Keahlian',
        contact: 'Kontak',
        notes: 'Catatan',
      },
      downloadCv: 'Unduh CV',
      headers: {
        projects: 'Proyek',
        experience: 'Pengalaman Kerja',
        education: 'Pendidikan',
        skills: 'Keahlian',
        contact: 'Kontak',
      },
      contactText:
        'Hire me pls :33 atau minimal ngobrol soal web dev. Kamu bisa kontak aku di:',
      footer: {
        mode: 'mode',
        lang: 'bahasa',
      },
      projects: [
        {
          title: 'Isyara',
          desc: 'Aplikasi belajar BISINDO dengan deteksi tangan real-time dan klasifikasi gerakan on-device menggunakan TensorFlow.js & MediaPipe. Fitur unit pembelajaran terstruktur, gamifikasi (XP/level), mode kuis, dan autentikasi Supabase.',
          url: 'https://github.com/alipnf/Isyara-FE',
        },
        {
          title: 'Planify',
          desc: 'Aplikasi penjadwalan kuliah dengan pembuatan jadwal manual dan bantuan AI. Buat, edit, dan impor mata kuliah, lalu buat jadwal yang optimal. Tautan jadwal yang dapat dibagikan didukung oleh Next.js dan Zustand.',
          url: 'https://github.com/alipnf/planify',
        },
        {
          title: 'Blue Bay',
          desc: 'Platform e-commerce full-stack dengan penemuan produk, keranjang belanja, alur checkout, dan pelacakan pesanan. Termasuk dasbor admin untuk manajemen transaksi dan produk. Dibangun dengan React dan DaisyUI.',
          url: 'https://github.com/alipnf/blueBay',
        },
        {
          title: 'Banobakehouse',
          desc: 'Website informasi toko roti dengan autentikasi, panel admin untuk manajemen produk/kategori, dan fitur wishlist.',
          url: 'https://github.com/alipnf/banobakehouse',
        },
      ],
      experience: [
        {
          title: 'Frontend Developer (Intern)',
          company: 'PT Digital House Nusantara',
          period: 'Jan 2025 – Apr 2025',
          details: [
            'Mengembangkan dan memelihara UI berbasis React untuk website perusahaan dan dasbor admin berbasis peran',
            'Menerjemahkan desain Figma menjadi antarmuka responsif; memastikan konsistensi di desktop/tablet/seluler',
            'Membangun komponen UI yang dapat digunakan kembali',
            'Mengintegrasikan REST API dengan tim backend',
          ],
        },
      ],
      education: [
        {
          school: 'Universitas Muria Kudus',
          degree: 'S1 Teknik Informatika',
          period: '2022 – Sekarang',
          gpa: 'IPK: 3.89 / 4.00',
          highlights:
            'Mata kuliah relevan: Pemrograman Web, Web Service, Sistem Basis Data, Rekayasa Perangkat Lunak, IMK, Struktur Data, AI, Cloud Computing',
        },
        {
          school: 'MSIB Batch 7 — Alterra Academy',
          degree: 'ReactJS Mastery for Green Tech Front-End Engineers',
          period: 'Sep 2024 – Des 2024',
          highlights:
            'Memimpin tim frontend pada proyek capstone, menetapkan standar pengembangan, mengelola tugas melalui Trello, mengonversi desain Figma menjadi antarmuka siap produksi',
        },
      ],
      skills: {
        frontend: 'Frontend',
        styling: 'Styling & UI',
        tools: 'Tools & Libraries',
        soft: 'Soft Skills',
      },
    },
    en: {
      role: 'Frontend Developer',
      bio: 'Final-year Informatics student currently open to work (aka unemployed). I build responsive & accessible React/Next.js UI with clean code and reusable components ready to fix the “just 1px” issues.',
      nav: {
        projects: 'Projects',
        experience: 'Experience',
        education: 'Education',
        skills: 'Skills',
        contact: 'Contact',
        notes: 'Notes',
      },
      downloadCv: 'Download CV',
      headers: {
        projects: 'Projects',
        experience: 'Work Experience',
        education: 'Education',
        skills: 'Skills',
        contact: 'Contact',
      },
      contactText:
        'Hire me pls :33 or at least let’s talk web dev. Reach me at:',
      footer: {
        mode: 'mode',
        lang: 'language',
      },
      projects: [
        {
          title: 'Isyara',
          desc: 'BISINDO learning app with real-time hand detection and on-device gesture classification using TensorFlow.js & MediaPipe. Features structured learning units, gamification (XP/levels), quiz mode, and Supabase authentication.',
          url: 'https://github.com/alipnf/Isyara-FE',
        },
        {
          title: 'Planify',
          desc: 'Course scheduling web app with manual and AI-assisted schedule generation. Create, edit, and import courses, then generate optimized timetables. Shareable schedule links powered by Next.js and Zustand.',
          url: 'https://github.com/alipnf/planify',
        },
        {
          title: 'Blue Bay',
          desc: 'Full-stack e-commerce platform with product discovery, shopping cart, checkout flow, and order tracking. Includes admin dashboard for transaction and product management. Built with React and DaisyUI.',
          url: 'https://github.com/alipnf/blueBay',
        },
        {
          title: 'Banobakehouse',
          desc: 'Bakery informational website with authentication, admin panel for product/category management, and wishlist feature.',
          url: 'https://github.com/alipnf/banobakehouse',
        },
      ],
      experience: [
        {
          title: 'Frontend Developer (Intern)',
          company: 'PT Digital House Nusantara',
          period: 'Jan 2025 – Apr 2025',
          details: [
            'Developed and maintained React-based UI for corporate website and role-based admin dashboard',
            'Translated Figma designs into responsive interfaces; ensured consistency across desktop/tablet/mobile',
            'Built reusable UI components to improve consistency and accelerate feature delivery',
            'Integrated REST APIs with backend team and handled loading/error states',
          ],
        },
      ],
      education: [
        {
          school: 'Universitas Muria Kudus',
          degree: "Bachelor's Degree in Informatics Engineering",
          period: '2022 – Present',
          gpa: 'GPA: 3.89 / 4.00',
          highlights:
            'Relevant coursework: Web Programming, Web Service, Database Systems, Software Engineering, HCI, Data Structures, AI, Cloud Computing',
        },
        {
          school: 'MSIB Batch 7 — Alterra Academy',
          degree: 'ReactJS Mastery for Green Tech Front-End Engineers',
          period: 'Sep 2024 – Dec 2024',
          highlights:
            'Led frontend team on capstone project, set development standards, managed tasks via Trello, converted Figma designs to production-ready interfaces',
        },
      ],
      skills: {
        frontend: 'Frontend',
        styling: 'Styling & UI',
        tools: 'Tools & Libraries',
        soft: 'Soft Skills',
      },
    },
  };

  const content = t[lang];

  const skills = {
    frontend: ['React', 'Next.js', 'TypeScript', 'JavaScript'],
    styling: ['Tailwind CSS', 'Bootstrap', 'shadcn/ui', 'DaisyUI'],
    tools: ['Zustand', 'Supabase', 'Firebase', 'Git', 'Figma'],
    soft: ['Communication', 'Teamwork', 'Problem-Solving', 'Adaptability'],
  };

  return (
    <main className="min-h-screen bg-background text-foreground relative">
      {/* Hero Section */}
      <section className="mx-auto max-w-2xl px-6 pt-12 pb-20 md:pt-20 md:pb-32">
        <div className="space-y-2 mb-8">
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
            Muhammad Alif Nur Firdaus
          </h1>
          <p className="text-lg text-muted-foreground font-mono">
            {content.role}
          </p>
          <p className="text-base text-muted-foreground max-w-xl leading-relaxed">
            {content.bio}
          </p>
        </div>

        {/* Navigation Links */}
        <nav className="mb-12">
          <ul className="flex flex-col gap-2 text-sm font-mono text-muted-foreground">
            <li>
              <button
                onClick={() => scrollToSection('projects')}
                className="hover:text-accent transition-colors flex items-center gap-3 group"
              >
                <span className="text-accent opacity-50 group-hover:opacity-100 transition-opacity">
                  ./
                </span>
                <span>{content.nav.projects}</span>
              </button>
            </li>
            <li>
              <button
                onClick={() => scrollToSection('experience')}
                className="hover:text-accent transition-colors flex items-center gap-3 group"
              >
                <span className="text-accent opacity-50 group-hover:opacity-100 transition-opacity">
                  ./
                </span>
                <span>{content.nav.experience}</span>
              </button>
            </li>
            <li>
              <button
                onClick={() => scrollToSection('education')}
                className="hover:text-accent transition-colors flex items-center gap-3 group"
              >
                <span className="text-accent opacity-50 group-hover:opacity-100 transition-opacity">
                  ./
                </span>
                <span>{content.nav.education}</span>
              </button>
            </li>
            <li>
              <button
                onClick={() => scrollToSection('skills')}
                className="hover:text-accent transition-colors flex items-center gap-3 group"
              >
                <span className="text-accent opacity-50 group-hover:opacity-100 transition-opacity">
                  ./
                </span>
                <span>{content.nav.skills}</span>
              </button>
            </li>
            <li>
              <button
                onClick={() => scrollToSection('contact')}
                className="hover:text-accent transition-colors flex items-center gap-3 group"
              >
                <span className="text-accent opacity-50 group-hover:opacity-100 transition-opacity">
                  ./
                </span>
                <span>{content.nav.contact}</span>
              </button>
            </li>
            <li>
              <Link
                href="/notes"
                className="hover:text-accent transition-colors flex items-center gap-3 group"
              >
                <span className="text-accent opacity-50 group-hover:opacity-100 transition-opacity">
                  ./
                </span>
                <span>{content.nav.notes}</span>
              </Link>
            </li>
          </ul>
        </nav>

        <div className="mt-8">
          <a
            href="/cv/alipnf_cv.pdf"
            download
            className="inline-flex items-center justify-center px-4 py-2 border border-accent text-accent hover:bg-accent hover:text-background transition-all rounded text-sm font-medium hover:shadow-[0_0_15px_rgba(var(--accent),0.3)]"
          >
            {content.downloadCv}
          </a>
        </div>
      </section>

      <section id="projects" className="mx-auto max-w-2xl px-6 py-12">
        <h2 className="text-sm font-mono font-semibold uppercase tracking-widest text-foreground mb-8 pb-3 border-b border-border flex items-center gap-2">
          <span className="text-accent">./</span> {content.headers.projects}
        </h2>
        <div className="space-y-8">
          {content.projects.map((project, i) => (
            <div key={i} className="group">
              <Link
                href={project.url}
                className="block hover:opacity-80 transition-all group-hover:translate-x-1"
              >
                <h3 className="text-lg font-semibold text-foreground mb-2 flex items-center gap-2">
                  {project.title}
                  <span className="text-accent opacity-0 group-hover:opacity-100 transition-opacity -translate-x-2 group-hover:translate-x-0">
                    ↗
                  </span>
                </h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {project.desc}
                </p>
              </Link>
            </div>
          ))}
        </div>
      </section>

      <section id="experience" className="mx-auto max-w-2xl px-6 py-12">
        <h2 className="text-sm font-mono font-semibold uppercase tracking-widest text-foreground mb-8 pb-3 border-b border-border flex items-center gap-2">
          <span className="text-accent">./</span> {content.headers.experience}
        </h2>
        <div className="space-y-8">
          {content.experience.map((job, i) => (
            <div key={i}>
              <div className="flex justify-between items-start mb-2">
                <h3 className="text-base font-semibold text-foreground">
                  {job.title}
                </h3>
                <span className="text-xs text-muted-foreground font-mono">
                  {job.period}
                </span>
              </div>
              <p className="text-sm text-accent mb-3">{job.company}</p>
              <ul className="space-y-2">
                {job.details.map((detail, j) => (
                  <li
                    key={j}
                    className="text-sm text-muted-foreground leading-relaxed flex"
                  >
                    <span className="mr-3 text-accent">•</span>
                    <span>{detail}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      <section id="education" className="mx-auto max-w-2xl px-6 py-12">
        <h2 className="text-sm font-mono font-semibold uppercase tracking-widest text-foreground mb-8 pb-3 border-b border-border flex items-center gap-2">
          <span className="text-accent">./</span> {content.headers.education}
        </h2>
        <div className="space-y-8">
          {content.education.map((edu, i) => (
            <div key={i}>
              <div className="flex justify-between items-start mb-1">
                <h3 className="text-base font-semibold text-foreground">
                  {edu.school}
                </h3>
                <span className="text-xs text-muted-foreground font-mono">
                  {edu.period}
                </span>
              </div>
              <p className="text-sm text-accent mb-2">{edu.degree}</p>
              {edu.gpa && (
                <p className="text-sm text-muted-foreground mb-2">{edu.gpa}</p>
              )}
              <p className="text-sm text-muted-foreground leading-relaxed">
                {edu.highlights}
              </p>
            </div>
          ))}
        </div>
      </section>

      <section id="skills" className="mx-auto max-w-2xl px-6 py-12">
        <h2 className="text-sm font-mono font-semibold uppercase tracking-widest text-foreground mb-8 pb-3 border-b border-border flex items-center gap-2">
          <span className="text-accent">./</span> {content.headers.skills}
        </h2>
        <div className="space-y-6">
          <div>
            <p className="text-xs font-mono text-muted-foreground mb-3 uppercase tracking-widest">
              {content.skills.frontend}
            </p>
            <div className="flex flex-wrap gap-2">
              {skills.frontend.map((skill, i) => (
                <span
                  key={i}
                  className="px-2 py-1 text-xs border border-border rounded text-foreground"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
          <div>
            <p className="text-xs font-mono text-muted-foreground mb-3 uppercase tracking-widest">
              {content.skills.styling}
            </p>
            <div className="flex flex-wrap gap-2">
              {skills.styling.map((skill, i) => (
                <span
                  key={i}
                  className="px-2 py-1 text-xs border border-border rounded text-foreground"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
          <div>
            <p className="text-xs font-mono text-muted-foreground mb-3 uppercase tracking-widest">
              {content.skills.tools}
            </p>
            <div className="flex flex-wrap gap-2">
              {skills.tools.map((skill, i) => (
                <span
                  key={i}
                  className="px-2 py-1 text-xs border border-border rounded text-foreground"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
          <div>
            <p className="text-xs font-mono text-muted-foreground mb-3 uppercase tracking-widest">
              {content.skills.soft}
            </p>
            <div className="flex flex-wrap gap-2">
              {skills.soft.map((skill, i) => (
                <span
                  key={i}
                  className="px-2 py-1 text-xs border border-border rounded text-foreground"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section
        id="contact"
        className="mx-auto max-w-2xl px-6 py-20 border-b border-border"
      >
        <h2 className="text-sm font-mono font-semibold uppercase tracking-widest text-foreground mb-6 pb-3 border-b border-border flex items-center gap-2">
          <span className="text-accent">./</span> {content.headers.contact}
        </h2>
        <div className="space-y-4">
          <p className="text-sm text-muted-foreground">{content.contactText}</p>
          <div className="flex flex-wrap gap-4 text-sm">
            <Link
              href="mailto:alipnf@proton.me"
              className="text-accent hover:underline"
            >
              Email
            </Link>
            <Link
              href="https://github.com/alipnf"
              className="text-accent hover:underline"
            >
              GitHub
            </Link>
            <Link
              href="https://linkedin.com/in/alipnf"
              className="text-accent hover:underline"
            >
              LinkedIn
            </Link>
          </div>
        </div>
      </section>

      <Footer
        className="max-w-2xl"
        showLanguageToggle={true}
        lang={lang}
        onToggleLangAction={toggleLang}
      />
    </main>
  );
}
