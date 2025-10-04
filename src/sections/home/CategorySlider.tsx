import React from "react"
import "@/app/styles/css/categories.slider.css"
import { Container, Typography } from "@mui/material"
import { ICategory } from "@/@types/category"
import { APIResponse } from "@/@types/response"
import { PATH_API } from "@/routes/paths"
import CarouselList from "./CarouselList"
import Link from "next/link"
import { Settings } from "react-slick"

const settings: Settings = {
  slidesToShow: 5,
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

export default async function CategorySlider() {
  const response = await fetch(`${process.env.BASE_API}${PATH_API.category}`,
    { method: "GET", cache: "force-cache", next: { revalidate: 3600 } }
  )
  const result: APIResponse<ICategory[]> = await response.json()

  return (
    <div className="home-categories-wrapper">
      <div className="home-categories-title">
        <h1>Danh mục sản phẩm</h1>
      </div>
      {!response.ok && (
        <Container maxWidth="xl">
          <Typography variant="h4" textAlign="center">
            {result.message || response.statusText}
          </Typography>
        </Container>
      )}
      {result?.data && (
        <CarouselList settings={settings}>
          {result.data.map(category => (
            <Link
              href={{ pathname: '/products', query: { category: category._id } }}
              className="home-categories-item" key={category._id}
            >
              <div className="home-categories-item-box">
                <div className="home-categories-item-box-img">
                  <img src={category.logo} style={{ aspectRatio: '1/1', width: '100%' }} />
                </div>
                <h1 className="home-categories-item-title" style={{ color: 'black', textAlign: 'center' }}>{category.name}</h1>
              </div>
            </Link>
          ))}
        </CarouselList>
      )}
    </div>
  )
}