import '@/app/styles/css/landing.css'
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
            <div className='landing-container'>
                <Suspense fallback={<LoadingShimmer />}>
                    <BannerSlider />
                </Suspense>
                {/* Flash sale */}
                <FlashSale />
                {/* Landing page categories slider */}
                <Suspense fallback={<LoadingShimmer />}>
                    <CategorySlider />
                </Suspense>
                {/* Landing page brands slider */}
                <Suspense fallback={<LoadingShimmer />}>
                    <BrandSlider />
                </Suspense>
                {/* Landing page best selling product list */}
                <BestSellingProducts />
                {/* Landing page news product list*/}
                <NewProducts />
            </div>
        </Container>
    )
}