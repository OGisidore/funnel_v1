export type Locale = 'fr' | 'en'

export const locales: Locale[] = ['fr', 'en']
export const defaultLocale: Locale = 'en'

const dictionaries = {
  fr: () => import('./dictionaries/fr').then(m => m.dict),
  en: () => import('./dictionaries/en').then(m => m.dict),
}

export const getDictionary = (locale: Locale) => dictionaries[locale]()

export type Dictionary = Awaited<ReturnType<typeof getDictionary>>
