import { API_ENDPOINT } from '@/routes/api'
import { APIResponse } from '@/@types/response'
import { IBanner } from '@/@types/banner'
import CarouselList from './CarouselList'
import Image from '@/components/image'

export default async function BannerSlider() {
  const response = await fetch(`${process.env.BASE_API}${API_ENDPOINT.banner}`,
    { method: "GET", cache: "force-cache", next: { revalidate: 3600 } }
  )
  const json: APIResponse<IBanner[]> = await response.json()

  if (!response.ok) {
    return <span>{json.message || response.statusText}</span>
  }

  return (
    <div className="slider-wrapper">
      <div className="slider-wrapper-container">
        <div className="slick-component">
          <div className="slider-container">
            {json.data && (
              <CarouselList dots>
                {json.data.map(banner => (
                  < Image alt={banner.image} src={banner.image} ratio="21/9" key={banner._id} />
                ))}
              </CarouselList>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}