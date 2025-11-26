import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

const SUPPORTED_LOCALES = ['ru', 'uz-Latn', 'en']
const DEFAULT_LOCALE = 'ru'

const COUNTRY_TO_LOCALE: Record<string, string> = {
    UZ: 'uz-Latn',
    RU: 'ru',
    US: 'en',
}

function getClientIp(req: NextRequest): string {
    // Попробуем взять IP из заголовков
    const forwardedFor = req.headers.get('x-forwarded-for')
    if (forwardedFor) {
        return forwardedFor.split(',')[0].trim()
    }
    const realIp = req.headers.get('x-real-ip')
    if (realIp) {
        return realIp
    }

    // Локалка
    return '127.0.0.1'
}

export async function middleware(req: NextRequest) {
    const { pathname, search } = req.nextUrl

    if (
        pathname.startsWith('/_next') ||
        pathname.startsWith('/favicon') ||
        pathname.match(/\.(ico|png|jpg|jpeg|svg|gif|webmanifest|json)$/)
    ) {
        return NextResponse.next()
    }

    if (SUPPORTED_LOCALES.some((locale) => pathname.startsWith(`/${locale}`))) {
        return NextResponse.next()
    }

    if (req.cookies.get('locale_set')) {
        return NextResponse.next()
    }

    const ip = getClientIp(req)

    let countryCode = 'RU'
    if (ip !== '127.0.0.1' && ip !== '::1') {
        try {
            const res = await fetch(`https://ip2c.org/${ip}`)
            const data = await res.text()
            countryCode = data.split(';')[1] || 'RU'
        } catch (e) {
            console.error('GeoIP error:', e)
        }
    }

    const locale = COUNTRY_TO_LOCALE[countryCode] || DEFAULT_LOCALE

    const res = NextResponse.redirect(new URL(`/${locale}${pathname}${search}`, req.url))
    res.cookies.set('locale_set', '1', { path: '/', maxAge: 60 * 60 * 24 }) // 1 день
    return res
}

export const config = {
    matcher: ['/((?!_next|api|favicon.ico).*)'],
}
