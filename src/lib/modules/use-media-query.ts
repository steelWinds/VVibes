import { readable, type Readable } from 'svelte/store'

export const useMediaQuery = (query: string): Readable<boolean> => {
  if (typeof window === 'undefined' || !query) {
    return readable(false)
  }

  const matches = readable(false, (set) => {
    const m = window.matchMedia(query)

		set(m.matches)

    const mql = (e: { matches: boolean }): void => { set(e.matches) }

		m.addEventListener('change', mql)

    return () => {
      m.removeEventListener('change', mql)
    }
  })

  return matches
}
