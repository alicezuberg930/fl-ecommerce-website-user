import type { Metadata } from 'next'
import { getBaseUrl } from './common'

export interface NextMetadata extends Metadata {
    title?: string
}

export default function createSEO(override: NextMetadata = {}): NextMetadata {
    const siteName = 'Future Life'
    const baseUrl = getBaseUrl()

    const title = override.title ? `${override.title} | ${siteName}` : siteName
    const description = 'E-commerce Solution'
    const url = override.openGraph?.url
        ? `${baseUrl}${override.openGraph.url}`
        : baseUrl

    const images = [
        ...(override.openGraph?.images
            ? Array.isArray(override.openGraph.images)
                ? override.openGraph.images
                : [override.openGraph.images]
            : []),
        { url: '/api/og', alt: 'Open Graph Image' },
    ]

    return {
        ...override,
        metadataBase: new URL(baseUrl),
        applicationName: siteName,
        title,
        description,
        openGraph: {
            ...override.openGraph,
            title,
            description,
            siteName,
            url,
            images,
        },
        twitter: {
            ...override.twitter,
            card: 'summary_large_image',
        },
        icons: { icon: '/favicon.ico' },
        alternates: { ...override.alternates, canonical: url },
    }
}