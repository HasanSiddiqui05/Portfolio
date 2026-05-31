"use client"
import { useRef, useState, useEffect } from "react"

export default function ExperienceSection() {
  const experienceRef = useRef<HTMLDivElement>(null)
  const [expProgress, setExpProgress] = useState(0)
  const [expHeight, setExpHeight] = useState(0)
  const expTargetProgressRef = useRef(0)
  const expEasedProgressRef = useRef(0)

  useEffect(() => {
    const handleScroll = () => {
      const el = experienceRef.current
      if (!el) return

      const rect = el.getBoundingClientRect()
      setExpHeight(rect.height)

      const viewportHeight = window.innerHeight
      
      // Calculate progress through viewport center (from top entering center to bottom leaving center)
      const start = rect.top - viewportHeight * 0.8
      const total = rect.height
      
      let p = -start / total
      if (p < 0) p = 0
      if (p > 1) p = 1
      
      expTargetProgressRef.current = p
    }

    let animFrameId: number

    const tick = () => {
      const diff = expTargetProgressRef.current - expEasedProgressRef.current
      if (Math.abs(diff) > 0.0001) {
        expEasedProgressRef.current += diff * 0.06 // Smooth easing momentum
        setExpProgress(expEasedProgressRef.current)
      } else if (expEasedProgressRef.current !== expTargetProgressRef.current) {
        expEasedProgressRef.current = expTargetProgressRef.current
        setExpProgress(expEasedProgressRef.current)
      }
      animFrameId = requestAnimationFrame(tick)
    }

    window.addEventListener("scroll", handleScroll, { passive: true })
    window.addEventListener("resize", handleScroll, { passive: true })
    
    handleScroll()
    animFrameId = requestAnimationFrame(tick)

    return () => {
      window.removeEventListener("scroll", handleScroll)
      window.removeEventListener("resize", handleScroll)
      cancelAnimationFrame(animFrameId)
    }
  }, [])

  return (
    <>
      <h6 className="max-w-7xl mx-auto mb-16 text-4xl md:text-7xl font-medium pl-10 bg-clip-text text-transparent bg-[linear-gradient(0deg,rgb(127,64,255),rgb(255,255,255))]">
        My Career <span>&</span> <br/> Experience
      </h6>
      
      <div 
        ref={experienceRef} 
        className="flex flex-col gap-0 max-w-7xl mx-auto mb-32 relative"
      >

        {/* 2. Active Glowing Line (Lights up behind the traveling circle) */}
        <div 
          style={{
            height: `${expProgress * (expHeight - 20) + 10}px`
          }}
          className="hidden md:block absolute md:left-[40px] xl:left-[560px] top-0 w-[5px] bg-gradient-to-b from-[rgb(170,66,255)]/20 via-[rgb(170,66,255)]/70 to-[rgb(170,66,255)] shadow-[0_0_10px_2px_rgba(170,66,255,0.5),_0_0_20px_5px_rgba(170,66,255,0.3)] pointer-events-none rounded-full transform-gpu"
        />

        {/* 3. Traveling Glowing Dot */}
        <div className="hidden md:block absolute md:left-[40px] xl:left-[560px] top-0 bottom-0 w-[5px] pointer-events-none">
          <div 
            style={{
              transform: `translate3d(-3.5px, ${expProgress * (expHeight - 20)}px, 0)`
            }}
            className="h-3 w-3 absolute rounded-full bg-[rgb(170,66,255)] shadow-[0_0_8px_3px_rgba(210,155,255,1),_0_0_20px_8px_rgba(170,66,255,0.8),_0_0_40px_15px_rgba(170,66,255,0.4)] will-change-transform transform-gpu"
          />
        </div>

        {/* Experience Items */}
        <div className="flex flex-col md:flex-row w-full justify-between items-start md:items-center gap-4 md:gap-6 xl:gap-12 py-8 px-10 md:pl-[100px] xl:px-10">
          <div className="flex w-full md:w-[350px] xl:w-[400px] justify-between items-center shrink-0">
            <div className="text-xl md:text-3xl text-white/80 leading-snug">
              Intermediate
              <br/>
              <span className="text-[rgb(170,66,255)] font-[400] text-lg md:text-2xl">Education</span>
            </div>
            <div className="font-bold text-4xl md:text-6xl text-white">
              2022
            </div>
          </div>
          <div className="desc text-base md:text-lg text-white/70 max-w-[600px] leading-relaxed pl-0 md:pl-6">
            Completed my Intermediate education from PECHS Government Science College, building a strong foundation in analytical and scientific concepts.
          </div>
        </div>

        <div className="flex flex-col md:flex-row w-full justify-between items-start md:items-center gap-4 md:gap-6 xl:gap-12 py-8 px-10 md:pl-[100px] xl:px-10">
          <div className="flex w-full md:w-[350px] xl:w-[400px] justify-between items-center shrink-0">
            <div className="text-xl md:text-3xl text-white/80 leading-snug">
              Bachelors
              <br/>
              <span className="text-[rgb(170,66,255)] font-[400] text-lg md:text-2xl">Software Engineering</span>
            </div>
            <div className="font-bold text-3xl md:text-5xl text-white tracking-tighter whitespace-nowrap text-right">
              2022-26
            </div>
          </div>
          <div className="desc text-base md:text-lg text-white/70 max-w-[600px] leading-relaxed pl-0 md:pl-6">
            Pursuing my Bachelor's degree, diving deep into software architecture, algorithmic problem solving, and modern development paradigms.
          </div>
        </div>

        <div className="flex flex-col md:flex-row w-full justify-between items-start md:items-center gap-4 md:gap-6 xl:gap-12 py-8 px-10 md:pl-[100px] xl:px-10">
          <div className="flex w-full md:w-[350px] xl:w-[400px] justify-between items-center shrink-0">
            <div className="text-xl md:text-3xl text-white/80 leading-snug">
              C# & .NET
              <br/>
              <span className="text-[rgb(170,66,255)] font-[400] text-lg md:text-2xl">University Projects</span>
            </div>
            <div className="font-bold text-4xl md:text-6xl text-white">
              2022
            </div>
          </div>
          <div className="desc text-base md:text-lg text-white/70 max-w-[600px] leading-relaxed pl-0 md:pl-6">
            Mastered Data Structures & Algorithms (DSA) and foundational programming concepts, building an object-oriented E-commerce platform with C# and .NET.
          </div>
        </div>

        <div className="flex flex-col md:flex-row w-full justify-between items-start md:items-center gap-4 md:gap-6 xl:gap-12 py-8 px-10 md:pl-[100px] xl:px-10">
          <div className="flex w-full md:w-[350px] xl:w-[400px] justify-between items-center shrink-0">
            <div className="text-xl md:text-3xl text-white/80 leading-snug">
              Java
              <br/>
              <span className="text-[rgb(170,66,255)] font-[400] text-lg md:text-2xl">University Projects</span>
            </div>
            <div className="font-bold text-4xl md:text-6xl text-white">
              2023
            </div>
          </div>
          <div className="desc text-base md:text-lg text-white/70 max-w-[600px] leading-relaxed pl-0 md:pl-6">
            Expanded my backend expertise by designing and implementing a robust Cafe Management System and console applications in Java.
          </div>
        </div>

        <div className="flex flex-col md:flex-row w-full justify-between items-start md:items-center gap-4 md:gap-6 xl:gap-12 py-8 px-10 md:pl-[100px] xl:px-10">
          <div className="flex w-full md:w-[350px] xl:w-[400px] justify-between items-center shrink-0">
            <div className="text-xl md:text-3xl text-white/80 leading-snug">
              Python
              <br/>
              <span className="text-[rgb(170,66,255)] font-[400] text-lg md:text-2xl">University Projects</span>
            </div>
            <div className="font-bold text-4xl md:text-6xl text-white">
              2024
            </div>
          </div>
          <div className="desc text-base md:text-lg text-white/70 max-w-[600px] leading-relaxed pl-0 md:pl-6">
            Leveraged Python for scripting and machine learning, successfully training an ASL (American Sign Language) recognition model for academic research.
          </div>
        </div>

        <div className="flex flex-col md:flex-row w-full justify-between items-start md:items-center gap-4 md:gap-6 xl:gap-12 py-8 px-10 md:pl-[100px] xl:px-10">
          <div className="flex w-full md:w-[350px] xl:w-[400px] justify-between items-center shrink-0">
            <div className="text-xl md:text-3xl text-white/80 leading-snug">
              MERN Stack & React Native
              <br/>
              <span className="text-[rgb(170,66,255)] font-[400] text-lg md:text-2xl">Saylani Course & Projects</span>
            </div>
            <div className="font-bold text-4xl md:text-6xl text-white">
              2024
            </div>
          </div>
          <div className="desc text-base md:text-lg text-white/70 max-w-[600px] leading-relaxed pl-0 md:pl-6">
            Mastered full-stack and mobile development building dynamic apps like an ASL mobile app and a Weather App website using MongoDB, Express, React, React Native, and Node.js.
          </div>
        </div>
      </div>
    </>
  )
}
