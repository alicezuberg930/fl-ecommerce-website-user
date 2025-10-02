'use client'
import { Container } from '@mui/material'
import { Suspense } from 'react'
import LoadingShimmer from '@/app/components/LoadingShimmer'
import BannerSlider from '@/sections/home/BannerSlider'
import FlashSale from '@/sections/home/FlashSale'
import CategorySlider from '@/sections/home/CategorySlider'
import BrandSlider from '@/sections/home/BrandSlider'
import BestSellingProducts from '@/sections/home/BestSellingProducts'
import NewProducts from '@/sections/home/NewProducts'

export default function HomePage() {
    return (
        <Container maxWidth='xl' sx={{ my: 3 }}>
            <Suspense fallback={<LoadingShimmer />}>
                <BannerSlider />
            </Suspense>
            <FlashSale />
            <Suspense fallback={<LoadingShimmer />}>
                <CategorySlider />
            </Suspense>
            <Suspense fallback={<LoadingShimmer />}>
                <BrandSlider />
            </Suspense>
            <BestSellingProducts />
            <NewProducts />
        </Container>
    )
}