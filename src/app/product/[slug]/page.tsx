import ProductDetailsPage from "@/page/ProductDetailsPage"
import React, { Suspense } from "react"
import generateMetadaUtils from "@/utils/seo"
import { APIResponse } from "@/@types/response"
import { IProductDetails } from "@/@types/product"
import LoadingShimmer from "@/app/components/LoadingShimmer"
import { PATH_API } from "@/routes/paths"

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params
    const id = slug.split('-').at(-1)
    const response = await fetch(`${process.env.BASE_API}${PATH_API.product}/${id}`, {
        method: "GET", cache: "force-cache", next: { revalidate: 3600 }
    })
    const result: APIResponse<IProductDetails> = await response.json()

    return generateMetadaUtils({
        title: result.data.name,
        description: result.data.description,
        image: result.data.images[0],
        url: `/product/${slug}`,
    })
}

export default async function page({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params
    const id = slug.split('-').at(-1)
    const response = await fetch(`${process.env.BASE_API}${PATH_API.product}/${id}`, {
        method: "GET", cache: "force-cache", next: { revalidate: 3600 }
    })
    const result: APIResponse<IProductDetails> = await response.json()

    return (
        <Suspense fallback={<LoadingShimmer />}>
            <ProductDetailsPage product={result.data} />
        </Suspense>
    )
}