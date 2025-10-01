'use client'
import { Settings } from 'react-slick'
import '@/app/styles/css/flash.sale.css'
import LoadingShimmer from '@/app/components/LoadingShimmer'
import ProductCard from '@/sections/product/ProductCard'
import { useEffect, useRef } from 'react'
import useProduct from '@/hooks/api/useProduct'
import CarouselList from './CarouselList'
import { getHours, getMinutes, getSeconds } from '@/utils/common'

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
  let timeLeft = 7200
  const hoursHTMLRef = useRef<HTMLElement>(null)
  const minutesHTMLRef = useRef<HTMLElement>(null)
  const secondsHTMLRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const a = setInterval(() => {
      if (timeLeft > 0) {
        timeLeft -= 1
        if (hoursHTMLRef.current)
          hoursHTMLRef.current.innerHTML = String(getHours(timeLeft))
        if (minutesHTMLRef.current)
          minutesHTMLRef.current.innerHTML = String(getMinutes(timeLeft))
        if (secondsHTMLRef.current)
          secondsHTMLRef.current.innerHTML = String(getSeconds(timeLeft))
      } else {
        if (a) clearInterval(a)
      }
    }, 1000)
    // Cleanup interval on component unmount
    return () => {
      if (a) clearInterval(a)
    }
  }, [])

  const { getProducts } = useProduct()
  const { data: response, isLoading, isError, error } = getProducts()

  return (
    <div className='flash-sale-wrapper'>
      <div className='flash-sale-timer-container'>
        <div className='time_finish'>
          <div className='time_finish_container'>
            <div>
              <span className='timer_title'>Flash sale</span>
              <div className='timer_deal_brand' id='clockdiv'>
                <div className='item_count_down'>
                  <span className='hour' ref={hoursHTMLRef}></span>
                </div>
                <span> : </span>
                <div className='item_count_down'>
                  <span className='minute' ref={minutesHTMLRef}></span>
                </div>
                <span> : </span>
                <div className='item_count_down'>
                  <span className='second' ref={secondsHTMLRef}></span>
                </div>
              </div>
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