import { PATH_API } from '@/routes/paths'
import { APIResponse } from '@/@types/response'
import { IBanner } from '@/@types/banner'
import CarouselList from './CarouselList'
import Image from '@/components/image'
import { Container, Typography } from '@mui/material'

export default async function BannerSlider() {
  const response = await fetch(`${process.env.BASE_API}${PATH_API.banner}`,
    { method: "GET", cache: "force-cache", next: { revalidate: 3600 } }
  )
  const result: APIResponse<IBanner[]> = await response.json()

  if (!response.ok) {
    return (
      <Container maxWidth="xl">
        <Typography variant="h4" textAlign="center">
          {result.message || response.statusText}
        </Typography>
      </Container>
    )
  }

  return (
    <div className="slider-wrapper">
      <div className="slider-wrapper-container">
        <div className="slick-component">
          <div className="slider-container">
            {result.data && (
              <CarouselList settings={{ dots: true }}>
                {result.data.map(banner => (
                  <Image alt={banner.image} src={banner.image} ratio="21/9" key={banner._id} />
                ))}
              </CarouselList>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}