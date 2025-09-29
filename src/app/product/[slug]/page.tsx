import ProductDetailsPage from "@/page/ProductDetailsPage"
import React from "react"
import generateMetadaUtils from "@/utils/seo"
import { axiosInstance } from "@/utils/axios"
import ENDPOINT from "@/app/common/api"

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
    const slug = (await params).slug
    const id = slug.split('-').at(-1)
    const response = await axiosInstance({ url: `${ENDPOINT.PRODUCT_DETAILS}/${id}`, method: "GET", params: { id } })
    const product = response.data.product as Product

    return generateMetadaUtils({
        title: `${product.name}`,
        description: product.description || "Find the best products here.",
        image: product.images[0] ?? "/assets/opengraph-image.jpg",
        url: `https://futurelifeecom.com/product/${slug}`,
    })
}

export default async function page({ params }: { params: Promise<{ slug: string }> }) {
    const slug = (await params).slug

    return (
        <ProductDetailsPage slug={slug} />
    )
}