"use client";

import { AnimatePresence } from "framer-motion";
import { useState } from "react";
import { BackgroundCode } from "@/components/home/background-code";
import { DetailModal } from "@/components/home/detail-modal";
import { HomepageSections } from "@/components/home/homepage-sections";
import { Sidebar } from "@/components/home/sidebar";
import { navItems, projects, socials, stats } from "@/data/home";
import type { ProjectItem } from "@/types/home";

export default function Page() {
  const initialVisibleProjects = 4;
  const [visibleProjects, setVisibleProjects] = useState(initialVisibleProjects);
  const [selectedProject, setSelectedProject] = useState<ProjectItem | null>(null);

  return (
    <div className="relative min-h-screen bg-[#060606] font-mono text-zinc-100">
      <BackgroundCode />

      <div
        className="pointer-events-none fixed inset-0 z-[1] opacity-[0.03]"
        style={{
          backgroundImage:
            "linear-gradient(to bottom, rgba(255,255,255,0.5) 1px, transparent 1px)",
          backgroundSize: "100% 3px",
        }}
      />

      <div className="relative z-10 mx-auto max-w-6xl px-6 md:px-10 lg:flex lg:items-start lg:gap-0">
        <Sidebar navItems={navItems} socials={socials} stats={stats} />

        <HomepageSections
          visibleProjects={visibleProjects}
          onLoadMoreProjects={() =>
            setVisibleProjects((current) => Math.min(current + 2, projects.length))
          }
          onOpenProject={setSelectedProject}
        />
      </div>

      <AnimatePresence>
        {selectedProject ? (
          <DetailModal
            title={selectedProject.name}
            meta={`Project | ${selectedProject.status}`}
            body={selectedProject.detail}
            highlights={selectedProject.highlights}
            imageSrc={selectedProject.imageSrc}
            imageAlt={selectedProject.imageAlt}
            imageCaption={selectedProject.imageCaption}
            onClose={() => setSelectedProject(null)}
          />
        ) : null}
      </AnimatePresence>
    </div>
  );
}
