'use client'
import "@/app/styles/css/brand.details.css"
import NewProducts from "../../sections/home/NewProducts"
import BrandsSlider from "../../sections/home/BrandSlider"

const BrandDetailsPage = () => {
    return (
        <div className="brand-details-wrapper">
            <div className="brand-details-info-container">
                <img src="/assets/brsignuot.png" />
                <div className="brand-details-info">
                    <b className="brand-details-title">TÊN THƯƠNG HIỆU</b>
                    <span className="brand-details-description">
                        Mô tả thương hiệu (VD demo) Cocoon là thương hiệu mỹ phẩm thuần chay Việt Nam, nổi bật với các sản phẩm từ nguyên liệu tự nhiên như gel rửa mặt bí đao, tẩy tế bào chết, dưỡng tóc tinh dầu bưởi. Với hơn 10 năm nghiên cứu, Cocoon mang đến giải pháp chăm sóc da và tóc an toàn, phù hợp cho mọi loại da, kể cả da nhạy cảm.
                    </span>
                </div>
            </div>
            <BrandsSlider />
            <NewProducts />
        </div>
    )
}

export default BrandDetailsPage