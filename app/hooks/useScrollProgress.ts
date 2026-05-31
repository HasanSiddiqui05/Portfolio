import { useEffect, useRef, useState } from "react"

export function useScrollProgress(containerRef: React.RefObject<HTMLElement | null>) {
  const [progress, setProgress] = useState(0)
  const targetProgressRef = useRef(0)
  const easedProgressRef = useRef(0)

  useEffect(() => {
    const handleScroll = () => {
      const el = containerRef.current
      if (!el) return

      const rect = el.getBoundingClientRect()
      const viewportHeight = window.innerHeight
      
      // Start fanning out when the Projects grid is 85% down the viewport (just entered from the bottom)
      const startTrigger = viewportHeight * 1.08
      // Complete the transition and lock in when the Projects grid is 10% from the top
      const endTrigger = viewportHeight * 0.30
      
      const totalDist = startTrigger - endTrigger
      const currentDist = rect.top - endTrigger
      
      // Map linear progress: 0 at startTrigger, 1 at endTrigger
      let p = 1 - (currentDist / totalDist)
      if (p < 0) p = 0
      if (p > 1) p = 1
      
      targetProgressRef.current = p
    }

    let animFrameId: number

    const tick = () => {
      // Smooth easing momentum: eased += (target - eased) * 0.07 for a physical, premium feel
      const diff = targetProgressRef.current - easedProgressRef.current
      if (Math.abs(diff) > 0.0001) {
        easedProgressRef.current += diff * 0.07
        setProgress(easedProgressRef.current)
      } else if (easedProgressRef.current !== targetProgressRef.current) {
        easedProgressRef.current = targetProgressRef.current
        setProgress(easedProgressRef.current)
      }
      animFrameId = requestAnimationFrame(tick)
    }

    window.addEventListener("scroll", handleScroll, { passive: true })
    window.addEventListener("resize", handleScroll, { passive: true })
    
    // Initial calculation
    handleScroll()
    animFrameId = requestAnimationFrame(tick)

    return () => {
      window.removeEventListener("scroll", handleScroll)
      window.removeEventListener("resize", handleScroll)
      cancelAnimationFrame(animFrameId)
    }
  }, [containerRef])

  return progress
}
