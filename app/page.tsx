"use client"
import CursorGlow from "@/components/CursorGlow";
import Navbar from "@/components/Navbar";
import AnimatedProjectCard, { ProjectInfo } from "@/components/AnimatedProjectCard";
import ExperienceSection from "@/components/ExperienceSection";
import SkillsSection from "@/components/SkillsSection";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";
import { useScrollProgress } from "./hooks/useScrollProgress";
import { useOffset } from "./hooks/useOffset";
import { useRef, useState } from "react";
import ProjectDialog from "@/components/ProjectDialog";


const ids = ["website-1", "website-2", "website-3", "website-4"];

const projectData: Record<string, ProjectInfo[]> = {
  "website-1": [
    { id: "w1-1", title: "Diagnostic Portal 1", description: "First project description.", githubLink: "https://github.com/HasanSiddiqui05", coverImage: "/images/web-2.png", images: ["/images/web-2.png", "/images/web-3.png", "/images/web-2.png"] },
    { id: "w1-2", title: "Diagnostic Portal 2", description: "Second project description.", githubLink: "https://github.com/HasanSiddiqui05", coverImage: "/images/web-3.png", images: ["/images/web-3.png", "/images/web-2.png", "/images/web-3.png"] },
    { id: "w1-3", title: "Diagnostic Portal 3", description: "Third project description.", githubLink: "https://github.com/HasanSiddiqui05", coverImage: "/images/web-2.png", images: ["/images/web-2.png", "/images/web-3.png", "/images/web-2.png"] }
  ],
  "website-2": [
    { id: "d1-1", title: "Desktop App 1", description: "First desktop project description.", githubLink: "https://github.com/HasanSiddiqui05", coverImage: "/images/app-1.png", images: ["/images/app-1.png", "/images/app-1.png", "/images/app-1.png"] },
    { id: "d1-2", title: "Desktop App 2", description: "Second desktop project description.", githubLink: "https://github.com/HasanSiddiqui05", coverImage: "/images/app-1.png", images: ["/images/app-1.png", "/images/app-1.png", "/images/app-1.png"] },
    { id: "d1-3", title: "Desktop App 3", description: "Third desktop project description.", githubLink: "https://github.com/HasanSiddiqui05", coverImage: "/images/app-1.png", images: ["/images/app-1.png", "/images/app-1.png", "/images/app-1.png"] }
  ],
  "website-3": [
    { id: "m1-1", title: "Mobile App 1", description: "First mobile project description.", githubLink: "https://github.com/HasanSiddiqui05", coverImage: "/images/app-1.png", images: ["/images/app-1.png", "/images/mobile-1-1.jpeg", "/images/mobile-1-2.jpeg", "/images/mobile-1-3.jpg"] },
    { id: "m1-2", title: "Mobile App 2", description: "Second mobile project description.", githubLink: "https://github.com/HasanSiddiqui05", coverImage: "/images/app-1.png", images: ["/images/app-1.png", "/images/app-1.png", "/images/app-1.png"] },
    { id: "m1-3", title: "Mobile App 3", description: "Third mobile project description.", githubLink: "https://github.com/HasanSiddiqui05", coverImage: "/images/app-1.png", images: ["/images/app-1.png", "/images/app-1.png", "/images/app-1.png"] }
  ],
  "website-4": [
    { id: "w2-2", title: "Bespoke Web 2", description: "Second luxury web project description.", githubLink: "https://github.com/HasanSiddiqui05", coverImage: "/images/web-3.png", images: ["/images/web-3.png", "/images/web-1-1.png", "/images/web-1-2.png", "/images/web-1-3.png"] },
    { id: "w2-1", title: "Bespoke Web 1", description: "First luxury web project description.", githubLink: "https://github.com/HasanSiddiqui05", coverImage: "/images/web-2.png", images: ["/images/web-2.png", "/images/web-3.png", "/images/web-2.png"] },
    { id: "w2-3", title: "Bespoke Web 3", description: "Third luxury web project description.", githubLink: "https://github.com/HasanSiddiqui05", coverImage: "/images/web-2.png", images: ["/images/web-2.png", "/images/web-3.png", "/images/web-2.png"] }
  ]
};

export default function Home() {
  const gridRef = useRef<HTMLDivElement>(null);
  const progress = useScrollProgress(gridRef);
  const rawOffsets = useOffset(ids);
  
  const [selectedProject, setSelectedProject] = useState<ProjectInfo | null>(null);

  // Mathematically precise shift compensations to align and stack fanned cards in the Hero
  const OFFSET_TUNING: Record<string, { rot: number }> = {
    "website-1": { rot: -8 },
    "website-2": { rot: -4 },
    "website-3": { rot: 4 },
    "website-4": { rot: 0 },
  };

  const offsets = Object.fromEntries(
    ids.map((id) => {
      const base = rawOffsets[id] || { x: 0, y: 0 };
      const t = OFFSET_TUNING[id];
      
      // Dynamic responsiveness: grab dimensions calculated by useOffset
      const tw = base.targetW || 420;
      const th = base.targetH || 320;
      const gw = base.gridW || 570;
      const gh = base.gridH || 400;

      // Scale card to perfectly fit the Hero target bounds no matter the screen size
      const dynamicScale = Math.min(tw / gw, th / gh, 1);
      
      // Calculate necessary shift to center the scaled card precisely within the target bounds
      // This mathematically compensates for CSS `transform-origin: center`
      const dx = (tw - gw) / 2;
      const dy = (th - gh) / 2;

      return [
        id,
        {
          x: (base.x || 0) + dx,
          y: (base.y || 0) + dy,
          rot: t.rot,
          s: dynamicScale,
        },
      ];
    })
  );

  return (
    <main className="relative min-h-screen bg-black overflow-x-hidden text-white">
      {/* Static Glow Blobs */}
      <div className="purple-glow top-left" />
      <div className="purple-glow middle-right" />

      {/* Cursor Glow */}
      <CursorGlow />

      {/* Navbar Component */}
      <Navbar />

      <div id="hero" className="max-w-6xl mx-auto px-4 sm:px-6 min-h-[85vh] flex flex-col justify-center gap-4 sm:gap-8 pt-24 sm:pt-32 pb-10 mt-10">

        {/* Top Row: Name and Images Container */}
        <div className="flex flex-row items-start justify-between w-full">
          {/* Left Side: Name */}
          <div className="w-[55%] sm:flex-1 pr-1 sm:pr-4">
            <h1 className="text-[10.5vw] sm:text-6xl md:text-[5rem] lg:text-[6rem] font-bold leading-[1.05] tracking-tight text-white">
              Hasan<br/>Shahab<br className="sm:hidden" /> <span className="hidden sm:inline"> </span>Siddiqui
            </h1>
          </div>

          {/* Right Side: Stack Anchor */}
          <div className="w-[45%] sm:flex-1 flex justify-end items-start relative mt-1 sm:mt-0">
            <div
              data-stack-target-id
              className="relative w-full aspect-[4/3] sm:w-[420px] sm:h-[320px] max-w-[420px] max-h-[320px] rounded-2xl  bg-white/[0.01] shadow-2xl backdrop-blur-3xl"
            >
              <div className="absolute inset-0 rounded-2xl  flex items-center justify-center text-white/10 text-xs sm:text-sm select-none opacity-50">
                Stack Anchor
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Row: Description & Button */}
        <div className="w-full flex flex-col items-start gap-6 sm:gap-8 mt-4 sm:mt-6">
          <p className="text-[4.2vw] sm:text-xl text-white/70 max-w-xl leading-relaxed">
            Software Engineer focused on building modern web applications,
            scalable backend systems, and interactive user experiences.
          </p>

          <a href="https://github.com/HasanSiddiqui05" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 px-1.5 py-1.5 pr-6 rounded-full bg-[linear-gradient(90deg,rgb(127,64,255),rgb(170,66,255))] text-white font-medium hover:scale-105 transition-transform shadow-[0_0_20px_rgba(170,66,255,0.4)] border border-purple-500/30">
            <div className="w-10 h-10 rounded-full bg-black/30 p-2 flex items-center justify-center">
              <svg className="w-full h-full text-white" viewBox="0 0 24 24" fill="currentColor"><path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482C19.138 20.193 22 16.436 22 12.017 22 6.484 17.522 2 12 2z" /></svg>
            </div>
            <span className="text-sm sm:text-base">See My Github</span>
          </a>
        </div>

      </div>

      <h6 id="projects" className="max-w-7xl mx-auto mb-16 text-4xl md:text-7xl font-medium pl-10 pt-20 bg-clip-text text-transparent bg-[linear-gradient(0deg,rgb(127,64,255),rgb(255,255,255))]">Projects</h6>

      <div ref={gridRef} className="grid gap-16 grid-cols-1 md:grid-cols-2 max-w-7xl mx-auto px-6 pb-32">
        <AnimatedProjectCard
          gridId="website-1"
          offset={offsets["website-1"]}
          progress={progress}
          colorClass="bg-linear-to-br from-orange-500/90 to-yellow-500/90"
          title="Websites"
          techStack="Next • React • Mongo"
          cardTitle="Automedics Diagnostics"
          cardDesc="Advanced automotive fault analysis and tracking portal."
          size= "pc"
          projects={projectData["website-1"]}
          onProjectClick={setSelectedProject}
        />

        <AnimatedProjectCard
          gridId="website-2"
          offset={offsets["website-2"]}
          progress={progress}
          colorClass="bg-linear-to-br from-green-500/90 to-emerald-500/90"
          title="Desktop App"
          techStack="Next • React • Mongo"
          cardTitle="React Zero UI"
          cardDesc="Zero-overhead state management and design library."
          size="mobile"
          projects={projectData["website-2"]}
          onProjectClick={setSelectedProject}
        />

        <AnimatedProjectCard
          gridId="website-3"
          offset={offsets["website-3"]}
          progress={progress}
          colorClass="bg-linear-to-br from-blue-500/90 to-cyan-500/90"
          title="Mobile Apps"
          techStack="Next • React • Mongo"
          cardTitle="Signify Moible App"
          cardDesc="Comprehensive private contractor defense operations."
          size="mobile"
          projects={projectData["website-3"]}
          onProjectClick={setSelectedProject}
        />

        <AnimatedProjectCard
          gridId="website-4"
          offset={offsets["website-4"]}
          progress={progress}
          colorClass="bg-linear-to-br from-purple-500/90 to-pink-500/90"
          title="Websites"
          techStack="Next • React • Mongo"
          cardTitle="Bespoke Automotive"
          cardDesc="Ultra-luxury bespoke aesthetic design configuration studio."
          size="pc"
          projects={projectData["website-4"]}
          onProjectClick={setSelectedProject}
        />
      </div>

      <div id="experience">
        <ExperienceSection />
      </div>

      <div id="skills">
        <SkillsSection/>
      </div>

      <ContactSection />

      <Footer />

      <div className="w-full overflow-hidden flex  justify-center items-end background-transparent pointer-events-none select-none">
        <h1 className="text-[9vw] font-medium text-white leading-[0.8] tracking-tighter whitespace-nowrap mb-10">
          Hasan Shahab Siddiqui
        </h1>
      </div>

      <ProjectDialog project={selectedProject} onClose={() => setSelectedProject(null)} />
    </main>
  );
}