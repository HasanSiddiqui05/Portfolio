"use client"
import { useRef } from "react"
import { useCompositorSpring } from "../app/hooks/useCompositorSpring"
import { HeroOffset } from "../app/hooks/useOffset"

export type ProjectInfo = {
  id: string;
  title: string;
  description: string;
  githubLink: string;
  images: string[];
  coverImage: string;
};

interface AnimatedProjectCardProps {
  gridId: string
  offset?: Partial<HeroOffset>
  progress: number
  colorClass: string
  size: string
  title: string
  techStack: string
  cardTitle?: string
  cardDesc?: string
  index?: number
  projects?: ProjectInfo[]
  onProjectClick?: (project: ProjectInfo) => void
}

export default function AnimatedProjectCard({
  gridId,
  offset,
  progress,
  colorClass,
  title,
  techStack,
  cardTitle,
  cardDesc,
  projects,
  onProjectClick,
  size
}: AnimatedProjectCardProps) {
  const ref = useRef<HTMLDivElement>(null)
  useCompositorSpring(ref, progress)

  // Determine if it is the top card in the hero stack to render specific starting text
  const isTopCard = gridId === "website-4"

  return (
    <div className="proj-card flex flex-col gap-3 w-full max-w-[600px]">
      <h5 className="text-4xl font-bold pl-4 text-white/90">{title}</h5>
      
      {/* Native grid container box that serves as the slot */}
      <div 
        data-grid-id={gridId}
        className="flex w-full sm:h-[400px] h-[300px] justify-center items-center border border-white/20 shadow-2xl ring-1 ring-white/10 rounded-2xl bg-[#161616] relative overflow-visible"
      >
        {/* Animated Card Body - Flies from Hero stack into this slot */}
        <div
          ref={ref}
          style={
            offset
              ? ({
                  "--tx": `${offset.x}px`,
                  "--ty": `${offset.y}px`,
                  "--rot": `${offset.rot}deg`,
                  "--sc": `${offset.s}`,
                } as React.CSSProperties)
              : {}
          }
          className="absolute w-[96%] h-[96%] rounded-2xl will-change-[transform,opacity] backface-hidden transform-gpu z-3 p-6 flex flex-col justify-between overflow-hidden shadow-2xl cursor-pointer select-none group"
        >
          {/* Card background with optional opacity or classes */}
          <div className={`absolute inset-0 -z-1 transition-transform duration-500 group-hover:scale-105 ${colorClass}`} />
          
          {/* Subtle overlay glow 
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-80 z-0 pointer-events-none" />
          */}
          
          {/* Card content text */}
          <div className="z-10 transition-opacity duration-300">
            {isTopCard && progress < 0.2 ? (
              // While in the Hero stack, show the mockup starting text
              <>
                <h2 className="text-2xl font-semibold text-white drop-shadow">Full Stack Developer</h2>
                <p className="text-white/70 mt-2 text-sm">
                  React • Next.js • Node.js • MongoDB
                </p>
              </>
            ) : (
              // Once animating/scrolling, show the project specific details
              <>
                <h3 className="text-xl font-bold text-white drop-shadow">
                  {cardTitle || "Premium Web Application"}
                </h3>
                <p className="text-white/80 text-sm mt-1">
                  {cardDesc || "Custom tailored build featuring high performance and micro-animations."}
                </p>
              </>
            )}
          </div>
            
          {/* Floating Website Mockups */}
          {projects && projects.length > 0 && (
            <div className="absolute w-[100%] h-[100%] bottom-[-20px] left-1/2 -translate-x-1/2 flex items-end justify-center pointer-events-auto">

              {/* LEFT IMAGE */}
                {projects[1] && (
                  <img
                    src={projects[1].coverImage}
                    alt=""
                    className={`mockup-image side-image ${size === 'pc' ? 'left-image-pc' : 'left-image-mobile'}`}
                    onClick={(e) => { e.stopPropagation(); onProjectClick?.(projects[1]); }}
                  />
                )}

                {/* CENTER IMAGE */}
                {projects[0] && (
                  <img
                    src={projects[0].coverImage}
                    alt=""
                    className={`mockup-image center-image ${size === 'pc' ? 'center-pc' : 'center-mobile'}`}
                    onClick={(e) => { e.stopPropagation(); onProjectClick?.(projects[0]); }}
                  />
                )}

                {/* RIGHT IMAGE */}
                {projects[2] && (
                  <img
                    src={projects[2].coverImage}
                    alt=""
                    className={`mockup-image side-image ${size === 'pc' ? 'right-image-pc' : 'right-image-mobile'}`}
                    onClick={(e) => { e.stopPropagation(); onProjectClick?.(projects[2]); }}
                  />
                )}
            </div>
          )}
        </div>
        
      </div>
      
      <h1 className="pl-4 text-white/60 font-semibold">{techStack}</h1>
    </div>
  )
}
