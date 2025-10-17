'use client'
import "@/app/styles/css/category.details.css"
import NewProducts from "../../../sections/home/NewProducts"
import CategoriesSlider from "../../../sections/home/CategorySlider"

const CategoryDetailsPage = () => {
    return (
        <div className="category-details-wrapper">
            <CategoriesSlider />
            <div className="category-details-info-container">
                <b>SẢN PHẨM MẸ VÀ BÉ</b>
                <div className="category-info-button-container">
                    <button className="category-info-button"><b>CHĂM SÓC SỨC KHỎE MẸ</b></button>
                    <button className="category-info-button"><b>CHĂM SÓC SỨC KHỎE BÉ</b></button>
                    <button className="category-info-button"><b>SỮA CÔNG THỨC CHO BÉ</b></button>
                </div>
            </div>
            <NewProducts />
        </div>
    )
}

export default CategoryDetailsPage