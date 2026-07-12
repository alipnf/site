import { About } from "@/components/home/about";
import { ExperienceLog } from "@/components/home/experience-log";
import { Footer } from "@/components/home/footer";
import { GitHubActivity } from "@/components/home/github-activity";
import { HomeShell } from "@/components/home/home-shell";
import { Hero } from "@/components/home/hero";
import { Marquee } from "@/components/home/marquee";
import { Notes } from "@/components/home/notes";
import { Projects } from "@/components/home/projects";
import { Skills } from "@/components/home/skills";
import { JsonLd } from "@/components/json-ld";
import { getGitHubActivity, getGitHubContributions } from "@/lib/github";
import { siteConfig } from "@/lib/site";

export default async function Home() {
  const [activity, contributions] = await Promise.all([getGitHubActivity(), getGitHubContributions()]);

  return (
    <>
      <JsonLd
        data={[
          {
            "@context": "https://schema.org",
            "@type": "Person",
            name: siteConfig.author,
            alternateName: "alipnf",
            jobTitle: "Frontend Developer",
            description: siteConfig.description,
            url: siteConfig.url,
            sameAs: siteConfig.sameAs,
            knowsAbout: ["React", "Next.js", "TypeScript", "Frontend Development", "Responsive UI", "REST API Integration"],
          },
          {
            "@context": "https://schema.org",
            "@type": "WebSite",
            name: siteConfig.name,
            url: siteConfig.url,
            description: siteConfig.description,
            publisher: {
              "@type": "Person",
              name: siteConfig.author,
            },
          },
        ]}
      />
      <HomeShell>
        <main id="top">
          <Hero />
          <Marquee />
          <About />
          <Projects />
          <ExperienceLog />
          <GitHubActivity activity={activity} contributions={contributions} />
          <Skills />
          <Notes />
          <Footer />
        </main>
      </HomeShell>
    </>
  );
}
