import { type RefObject, useEffect, useRef } from "react"
import { useIsoMorphicEffect } from "./useIsoMorphicEffect"

export function useCompositorSpring(ref: RefObject<HTMLElement | null>, progress: number) {
  const animRef = useRef<Animation | null>(null)

  useIsoMorphicEffect(() => {
    const el = ref.current
    if (!el) return
    el.style.opacity = "1"
    
    /* Create a paused compositor animation */
    const anim = el.animate(
      [
        {
          transform: `translate3d(var(--tx, 0), var(--ty, 0), 0) scale(var(--sc, 1)) rotate(var(--rot, 0))`,
        },
        { transform: "translate3d(0, 0, 0) scale(1) rotate(0)" },
      ],
      { duration: 1500, fill: "both", easing: "ease-out" }
    )
    anim.pause() // we'll scrub it manually
    animRef.current = anim

    return () => {
      anim.cancel()
    }
  }, [])

  useEffect(() => {
    const anim = animRef.current
    if (!anim) return
    const total = anim.effect!.getComputedTiming().endTime // 1000 ms
    anim.currentTime = progress * Number(total)
  }, [progress])
}
