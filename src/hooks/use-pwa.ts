'use client'
import { useEffect, useSyncExternalStore, useCallback } from 'react'

export function usePWA() {
  const isInstalled = useSyncExternalStore(
    (cb) => {
      if (typeof window === 'undefined') return () => {}
      window.addEventListener('beforeinstallprompt', cb)
      return () => window.removeEventListener('beforeinstallprompt', cb)
    },
    () => typeof window !== 'undefined' && window.matchMedia('(display-mode: standalone)').matches,
  )

  const canInstall = useSyncExternalStore(
    (cb) => {
      if (typeof window === 'undefined') return () => {}
      window.addEventListener('beforeinstallprompt', cb)
      return () => window.removeEventListener('beforeinstallprompt', cb)
    },
    () => {
      if (typeof window === 'undefined') return false
      return !!(window as Record<string, unknown>).__deferredPrompt
    },
  )

  const promptInstall = useCallback(async () => {
    const prompt = (window as Record<string, unknown>).__deferredPrompt as { prompt: () => void; userChoice: Promise<{ outcome: string }> } | undefined
    if (!prompt) return false
    prompt.prompt()
    const result = await prompt.userChoice
    ;(window as Record<string, unknown>).__deferredPrompt = null
    return result.outcome === 'accepted'
  }, [])

  return { isInstalled, canInstall, promptInstall }
}
