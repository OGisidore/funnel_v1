import { NextRequest, NextResponse } from 'next/server'
import type { Locale } from './app/i18n'
import { locales, defaultLocale } from './app/i18n'

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl

  if (
    pathname.startsWith('/_next') ||
    pathname.startsWith('/api') ||
    pathname.includes('.')
  ) {
    return NextResponse.next()
  }

  // 1. Cookie preference (keep as string until validated)
  const cookieValue = request.cookies.get('locale')?.value ?? ''

  // 2. Accept-Language fallback (keep as string until validated)
  const acceptLang = request.headers.get('accept-language') ?? ''
  const browserValue = acceptLang.split(',')[0].split('-')[0].toLowerCase()

  const isLocale = (v: string): v is Locale => (locales as readonly string[]).includes(v)

  // 3. Check if URL already has a valid locale prefix (exact segment match)
  const urlLocale = locales.find(l => pathname === `/${l}` || pathname.startsWith(`/${l}/`))

  if (urlLocale) {
    // URL is authoritative — forward it and refresh cookie
    const requestHeaders = new Headers(request.headers)
    requestHeaders.set('x-locale', urlLocale)
    const response = NextResponse.next({ request: { headers: requestHeaders } })
    response.cookies.set('locale', urlLocale, { maxAge: 60 * 60 * 24 * 365, path: '/' })
    return response
  }

  // 4. Resolve locale from cookie → Accept-Language → default
  const locale: Locale = isLocale(cookieValue)
    ? cookieValue
    : isLocale(browserValue)
    ? browserValue
    : defaultLocale

  // 5. Redirect to /{locale}/...
  const url = request.nextUrl.clone()
  url.pathname = `/${locale}${pathname === '/' ? '' : pathname}`
  const response = NextResponse.redirect(url)
  response.cookies.set('locale', locale, { maxAge: 60 * 60 * 24 * 365, path: '/' })
  return response
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico).*)'],
}
