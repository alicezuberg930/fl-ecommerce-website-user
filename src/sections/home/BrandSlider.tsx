import React from "react"
import "@/app/styles/css/brands.slider.css"
import { Container, Typography } from "@mui/material"
import { API_ENDPOINT } from "@/routes/api"
import { APIResponse } from "@/@types/response"
import { IBrand } from "@/@types/brand"
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

export default async function BrandSlider() {
  const response = await fetch(`${process.env.BASE_API}${API_ENDPOINT.brand}`,
    { method: "GET", cache: "force-cache", next: { revalidate: 3600 } }
  )
  const result: APIResponse<IBrand[]> = await response.json()

  return (
    <div className="home-brands-wrapper">
      <div className="home-brands-title">
        <h1>Thương hiệu</h1>
      </div>
      <div className="home-brands-slider-container">
        {!response.ok && (
          <Container maxWidth="xl">
            <Typography variant="h4" textAlign="center">
              {result.message || response.statusText}
            </Typography>
          </Container>
        )}
        {result?.data && (
          <CarouselList settings={settings}>
            {result?.data.map(brand => (
              <Link
                href={{ pathname: '/products', query: { brand: brand._id } }}
                className="home-brands-item" key={brand._id}
              >
                <div className="home-brands-item-box">
                  <div className="home-brands-item-box-img">
                    <img src={brand.logo} style={{ aspectRatio: '1/1' }} />
                  </div>
                  <h1 className="home-brands-item-title">{brand.name}</h1>
                </div>
              </Link>
            ))}
          </CarouselList>
        )}
      </div>
    </div>
  )
}