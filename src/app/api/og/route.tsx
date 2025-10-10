import type { NextRequest } from 'next/server'
import { ImageResponse } from 'next/og'
import createSEO from '@/utils/seo'

export function GET(request: NextRequest) {
    const { searchParams } = request.nextUrl
    const seo = createSEO()
    const title = searchParams.get('title') ?? ''
    const description = searchParams.get('description') ?? seo.description

    return new ImageResponse((
        <div
            tw='flex h-full w-full flex-col p-16 text-white'
            style={{
                backgroundColor: '#0c0c0c',
                backgroundImage: `linear-gradient(to top right, #a96249, transparent)`,
            }}
        >
            <p tw='text-4xl'>{seo.applicationName}</p>
            <p tw='text-6xl'>{title} </p>
            <p tw='text-2xl'>{description} </p>
        </div>
    ), { width: 1200, height: 630 })
}
