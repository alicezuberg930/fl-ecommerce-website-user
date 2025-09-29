// 'use client'
import BannerSlider from './BannerSlider'
import CategorySlider from './CategorySlider'
import BrandSlider from './BrandSlider'
import '@/app/styles/css/landing.css'
import FlashSale from './FlashSale'
import { Container } from '@mui/material'
import BestSellingProducts from './BestSellingProducts'
import NewProducts from './NewProducts'
import { Suspense } from 'react'
import LoadingShimmer from '@/app/components/LoadingShimmer'

export default function Landing() {
  return (
    <Container maxWidth='xl' sx={{ my: 3 }}>
      <div className='landing-container'>
        <Suspense fallback={<LoadingShimmer />}>
          <BannerSlider />
        </Suspense>
        {/* Flash sale */}
        {/* <FlashSale /> */}
        {/* Landing page categories slider */}
        <CategorySlider />
        {/* Landing page brands slider */}
        <BrandSlider />
        {/* Landing page best selling product list */}
        <BestSellingProducts />
        {/* Landing page news product list*/}
        <NewProducts />
      </div>
    </Container>
  )
}