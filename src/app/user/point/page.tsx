'use client'
import { icons } from "@/app/common/icons"
import UserContent from "../components/UserContent"
import Slider, { Settings } from "react-slick"
import { useSelector } from "react-redux"
import { RootState, useDispatch } from "@/app/api/store"
import { useEffect } from "react"
import { fetchProductList } from "@/app/api/Slices/product.slice"
import LoadingShimmer from "@/app/components/LoadingShimmer"
import '@/app/styles/css/user.accumulate.point.css'
import { fCurrencyVND } from "@/utils/formatNumber"

const UserAccumulatePointPage = () => {
    const products = useSelector((state: RootState) => state.Products.products)
    const { AiOutlineDollar } = icons
    const settings: Settings = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 4,
        slidesToScroll: 1,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 3
                },
            },
            {
                breakpoint: 768,
                settings: {
                    slidesToShow: 2
                },
            },
            {
                breakpoint: 640,
                settings: {
                    slidesToShow: 1
                },
            },
        ],
    }
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(fetchProductList({ page: 1, limit: 8, category: null, brand: null }))
    }, [])

    return (
        <UserContent>
            <div className="user-accumulate-point-wrapper">
                <div className="available-point-container">
                    <AiOutlineDollar size={24} color="yellow" />
                    <b>Điểm khả dụng</b>
                    <b className="available-point-amount">0</b>
                </div>
                <div className="manage-user-accumulate-point-container">
                    <div className="manage-user-accumulate-point">
                        <div className="accumulate-circle"></div>
                        <b>Lịch sử tích điểm</b>
                    </div>
                    <div className="manage-user-accumulate-point">
                        <div className="accumulate-circle"></div>
                        <b>Lịch sử tích điểm</b>
                    </div>
                    <div className="manage-user-accumulate-point">
                        <div className="accumulate-circle"></div>
                        <b>Lịch sử tích điểm</b>
                    </div>
                </div>
                <b>Quà nổi bật</b>
                <div className="feature-gift-container">
                    <div className="feature-gift-slider-container">
                        {!products ? <LoadingShimmer /> :
                            <Slider {...settings}>
                                {
                                    products?.map((v, i) => {
                                        return (
                                            <div key={i} className="exchange-product">
                                                <img src={v.images[0]} className="exchange-product-image" />
                                                <div className="exchange-product-info">
                                                    <div className="exchange-product-price">
                                                        <b className="exchange-product-price-new">{fCurrencyVND(v.options[0]?.value[0]?.price ?? 0)}</b>
                                                        <span className="exchange-product-price-original">{fCurrencyVND(2000000)}</span>
                                                    </div>
                                                    <p className="exchange-product-title">{v.name}</p>
                                                </div>
                                                <div className="exchange-product-action">
                                                    <AiOutlineDollar size={24} color="yellow" />
                                                    <b>x3000</b>
                                                    <div className="exchange-action-border"><div className="separator"></div></div>
                                                    <span>ĐỔI</span>
                                                </div>
                                            </div>
                                        )
                                    })
                                }
                            </Slider>
                        }
                    </div>
                </div>
            </div>
        </UserContent >
    )
}

export default UserAccumulatePointPage