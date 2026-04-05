'use client'

import { useTranslation } from '@/lib/i18n'
import { localeNames, localeFlags, type Locale } from '@/lib/i18n/translations'
import { Globe } from 'lucide-react'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

const locales: Locale[] = ['en', 'es', 'de', 'fr', 'pt']

export function LanguageSelector() {
  const { locale, setLocale } = useTranslation()

  return (
    <Select value={locale} onValueChange={(v) => setLocale(v as Locale)}>
      <SelectTrigger className="w-auto gap-1.5 h-8 text-xs border-gray-200 bg-white hover:bg-gray-50">
        <Globe className="w-3.5 h-3.5 text-gray-500" />
        <SelectValue />
      </SelectTrigger>
      <SelectContent align="end">
        {locales.map((l) => (
          <SelectItem key={l} value={l} className="text-sm">
            <span className="mr-1.5">{localeFlags[l]}</span>
            {localeNames[l]}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  )
}

export function MobileLanguageSelector() {
  const { locale, setLocale } = useTranslation()

  return (
    <Select value={locale} onValueChange={(v) => setLocale(v as Locale)}>
      <SelectTrigger className="w-auto gap-1 h-7 text-[10px] border-0 bg-transparent p-0 shadow-none">
        <Globe className="w-3 h-3 text-gray-400" />
        <span className="text-gray-400">{localeFlags[locale]}</span>
      </SelectTrigger>
      <SelectContent align="center">
        {locales.map((l) => (
          <SelectItem key={l} value={l} className="text-sm">
            <span className="mr-1.5">{localeFlags[l]}</span>
            {localeNames[l]}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  )
}
