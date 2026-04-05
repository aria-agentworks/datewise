'use client'

import React, { createContext, useContext, useState, useCallback } from 'react'
import { translations, type Locale, type TranslationDictionary } from './translations'

interface I18nContextType {
  locale: Locale
  setLocale: (locale: Locale) => void
  t: TranslationDictionary
}

const STORAGE_KEY = 'datewise-lang'

const I18nContext = createContext<I18nContextType>({
  locale: 'en',
  setLocale: () => {},
  t: translations.en,
})

function getInitialLocale(): Locale {
  if (typeof window === 'undefined') return 'en'
  
  // Check localStorage first
  const stored = localStorage.getItem(STORAGE_KEY)
  if (stored && ['en', 'es', 'de', 'fr', 'pt'].includes(stored)) {
    return stored as Locale
  }
  
  // Check URL query param
  const params = new URLSearchParams(window.location.search)
  const langParam = params.get('lang')
  if (langParam && ['en', 'es', 'de', 'fr', 'pt'].includes(langParam)) {
    return langParam as Locale
  }
  
  // Check browser language
  const browserLang = navigator.language?.split('-')[0]
  if (browserLang && ['en', 'es', 'de', 'fr', 'pt'].includes(browserLang)) {
    return browserLang as Locale
  }
  
  return 'en'
}

export function I18nProvider({ children }: { children: React.ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>(getInitialLocale)

  const setLocale = useCallback((newLocale: Locale) => {
    setLocaleState(newLocale)
    if (typeof window !== 'undefined') {
      localStorage.setItem(STORAGE_KEY, newLocale)
      // Update URL query param without reload
      const url = new URL(window.location.href)
      url.searchParams.set('lang', newLocale)
      window.history.replaceState({}, '', url.toString())
    }
  }, [])

  // Avoid hydration mismatch - always use detected locale
  // SSR hydration is handled by Next.js App Router

  return (
    <I18nContext.Provider
      value={{
        locale,
        setLocale,
        t: translations[locale],
      }}
    >
      {children}
    </I18nContext.Provider>
  )
}

export function useTranslation() {
  const context = useContext(I18nContext)
  if (!context) {
    throw new Error('useTranslation must be used within an I18nProvider')
  }
  return context
}
