import { useEffect, useState } from 'react'

const normalizeHash = (hash) => {
  if (!hash || hash === '#') return '/'
  return hash.replace('#', '')
}

export function useHashRoute() {
  const [route, setRoute] = useState(() => normalizeHash(window.location.hash))

  useEffect(() => {
    const onHashChange = () => setRoute(normalizeHash(window.location.hash))
    window.addEventListener('hashchange', onHashChange)
    return () => window.removeEventListener('hashchange', onHashChange)
  }, [])

  const navigate = (nextRoute) => {
    if (nextRoute === route) return
    window.location.hash = nextRoute
  }

  return { route, navigate }
}
