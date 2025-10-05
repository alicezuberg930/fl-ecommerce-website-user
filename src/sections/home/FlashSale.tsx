'use client'
import { Settings } from 'react-slick'
import '@/app/styles/css/flash.sale.css'
import LoadingShimmer from '@/app/components/LoadingShimmer'
import ProductCard from '@/sections/product/ProductCard'
import useProduct from '@/hooks/api/useProduct'
import CarouselList from './CarouselList'
import CountDownTimer from '../product/CountDownTimer'

const settings: Settings = {
  slidesToShow: 5,
  responsive: [
    {
      breakpoint: 1024,
      settings: {
        slidesToShow: 4,
      },
    },
    {
      breakpoint: 768,
      settings: {
        slidesToShow: 3,
      },
    },
    {
      breakpoint: 640,
      settings: {
        slidesToShow: 2,
      },
    },
  ],
}

export default function FlashSale() {
  const { getProducts } = useProduct()
  const { data: response, isLoading, isError, error } = getProducts()

  return (
    <div className='flash-sale-wrapper'>
      <div className='flash-sale-timer-container'>
        <div className='time_finish'>
          <div className='time_finish_container'>
            <div>
              <span className='timer_title'>Flash sale</span>
              <CountDownTimer />
            </div>
            <span className='see-more'>Xem tất cả</span>
          </div>
        </div>
      </div>
      <div className='flash-sale-slider-container'>
        {isLoading && !isError ? (
          <LoadingShimmer />
        ) : (
          <>
            {response?.data && (
              <CarouselList settings={settings}>
                {response?.data.map(product => (
                  <ProductCard key={product._id} product={product} aspectRatio={'1/1'} showRatingCart={false} />
                ))}
              </CarouselList>
            )}
          </>
        )}
      </div>
    </div>
  )
}