import { useReducer, useRef } from "react"
import { useIsoMorphicEffect } from "./useIsoMorphicEffect"

export type HeroOffset = {
  x: number
  y: number
  rot: number
  s: number
  targetW?: number
  targetH?: number
  gridW?: number
  gridH?: number
}

function debounce<T extends (...args: any[]) => void>(fn: T, delay: number): T {
  let timer: ReturnType<typeof setTimeout> | null = null
  return ((...args: any[]) => {
    if (timer) clearTimeout(timer)
    timer = setTimeout(() => fn(...args), delay)
  }) as unknown as T
}

export function useOffset(cardIds: string[]) {
  const offsetsRef = useRef<Record<string, Partial<HeroOffset>>>({})
  const [, force] = useReducer((x) => x + 1, 0) // cheap re-render trigger

  useIsoMorphicEffect(() => {
    const calc = () => {
      const next: Record<string, Partial<HeroOffset>> = {}
      for (const id of cardIds) {
        const grid = document.querySelector(`[data-grid-id="${id}"]`)
        const hero = document.querySelector("[data-stack-target-id]")
        if (!grid || !hero) continue
        const g = grid.getBoundingClientRect()
        const h = hero.getBoundingClientRect()
        next[id] = { 
          x: h.left - g.left, 
          y: h.top - g.top,
          targetW: h.width,
          targetH: h.height,
          gridW: g.width,
          gridH: g.height
        }
      }
      offsetsRef.current = next
      force() // Tell React styles changed
    }

    const debouncedCalc = debounce(calc, 50)
    const ro = new ResizeObserver(debouncedCalc) // auto-recompute on resize
    ro.observe(document.documentElement)

    calc()

    return () => ro.disconnect()
  }, [cardIds])

  return offsetsRef.current
}
