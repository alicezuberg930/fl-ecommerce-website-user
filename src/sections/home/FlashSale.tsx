'use client'
import Slider, { Settings } from 'react-slick'
import '@/app/styles/css/flash.sale.css'
import LoadingShimmer from '@/app/components/LoadingShimmer'
import ProductCard from '@/app/components/ProductCard'
import { RootState, useDispatch } from '@/app/api/store'
import { useEffect, useRef, useState } from 'react'
import { useSelector } from 'react-redux'
import { fetchProductList } from '@/app/api/Slices/product.slice'
import { getHours, getMinutes, getSeconds } from '@/app/common/utils'

const FlashSale = () => {
  const products = useSelector((state: RootState) => state.Products.products)
  const limit = 10
  const dispath = useDispatch()
  let timeLeft = 7200
  const hoursHTMLRef = useRef<HTMLElement>(null)
  const minutesHTMLRef = useRef<HTMLElement>(null)
  const secondsHTMLRef = useRef<HTMLElement>(null)
  const settings: Settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 1,
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

  useEffect(() => {
    dispath(fetchProductList({ page: 1, limit, category: null, brand: null }))
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
        {!products ? (
          <LoadingShimmer />
        ) : (
          <Slider {...settings}>
            {products && (products as any[])?.filter(product => product!.isDel != true)?.map((v, i) => {
              return <ProductCard key={i} product={v} aspectRatio={'1/1'} showRatingCart={false} />
            })}
          </Slider>
        )}
      </div>
    </div>
  )
}

export default FlashSale