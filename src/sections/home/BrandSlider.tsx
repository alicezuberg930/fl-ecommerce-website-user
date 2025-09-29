"use client"
import React from "react"
import Slider, { Settings } from "react-slick"
import { usePathname, useRouter } from "next/navigation"
import "@/app/styles/css/brands.slider.css"
import LoadingShimmer from "@/app/components/LoadingShimmer"
import useQueryString from "@/hooks/useQueryString"
import useBrand from "@/hooks/api/useBrand"
import { Container, Typography } from "@mui/material"

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
        slidesToShow: 4
      },
    },
    {
      breakpoint: 768,
      settings: {
        slidesToShow: 3
      },
    },
    {
      breakpoint: 640,
      settings: {
        slidesToShow: 2
      },
    },
  ],
}

export default function BrandSlider() {
  const { getBrands } = useBrand()
  const { data: response, isLoading, isError, error } = getBrands()
  const router = useRouter()
  const pathname = usePathname()
  const createQueryString = useQueryString()

  const setParams = (id: string | null) => {
    router.push(pathname + 'products?' + createQueryString('brand', id))
  }

  return (
    <div className="home-brands-wrapper">
      <div className="home-brands-title">
        <h1>Thương hiệu</h1>
      </div>
      <div className="home-brands-slider-container">
        {error && (
          <Container maxWidth="xl">
            <Typography variant="h4" textAlign="center">
              {error.message}
            </Typography>
          </Container>
        )}
        {isLoading && !isError ? (
          <LoadingShimmer />
        ) : (
          <>
            {response?.data && (
              <Slider {...settings}>
                {response?.data.map(brand => (
                  <div className="home-brands-item" key={brand._id}>
                    <div className="home-brands-item-box" onClick={() => setParams(brand._id)}>
                      <div className="home-brands-item-box-img">
                        <img src={brand.logo} style={{ aspectRatio: '1/1' }} />
                      </div>
                      <h1 className="home-brands-item-title">{brand.name}</h1>
                    </div>
                  </div>
                ))}
              </Slider>
            )}
          </>
        )}
      </div>
    </div>
  )
}