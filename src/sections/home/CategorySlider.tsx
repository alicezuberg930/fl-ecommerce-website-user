"use client"
import React from "react"
import Slider, { Settings } from "react-slick"
import { usePathname, useRouter } from "next/navigation"
import "@/app/styles/css/categories.slider.css"
import LoadingShimmer from "@/app/components/LoadingShimmer"
import useQueryString from "@/hooks/useQueryString"
import { Container, Typography } from "@mui/material"
import useCategory from "@/hooks/api/useCategory"

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

export default function CategorySlider() {
  const { getCategories } = useCategory()
  const { data: response, isLoading, isError, error } = getCategories()
  const router = useRouter()
  const pathname = usePathname()
  const createQueryString = useQueryString()

  const setParams = (id: string | null) => {
    router.push(pathname + 'products?' + createQueryString('category', id))
  }

  return (
    <div className="home-categories-wrapper">
      <div className="home-categories-title">
        <h1>Danh mục sản phẩm</h1>
      </div>
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
              {response.data.map(category => (
                <div className="home-categories-item" key={category._id}>
                  <div className="home-categories-item-box" onClick={() => setParams(category._id)}>
                    <div className="home-categories-item-box-img">
                      <img src={category.logo} style={{ aspectRatio: '1/1' }} />
                    </div>
                    <h1 className="home-categories-item-title">{category.name}</h1>
                  </div>
                </div>
              ))}
            </Slider>
          )}
        </>
      )}
    </div>
  )
}