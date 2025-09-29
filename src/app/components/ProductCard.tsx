"use client"
import React from "react"
import { TiShoppingCart } from "react-icons/ti"
import { slugify } from "@/app/common/utils"
import "@/app/styles/css/product.card.css"
import Link from "next/link"
import { icons } from "../common/icons"
import PromotionBar from "../../sections/home/PromotionalBar"
import { Typography } from "@mui/material"
import { fCurrencyVND } from "@/utils/formatNumber"
import { IProduct } from "@/@types/product"

const ProductCard: React.FC<{ product: IProduct, aspectRatio: string, showRatingCart?: boolean }> = ({ product, aspectRatio, showRatingCart = true }) => {
    let slug = `${slugify(product.name!)}-${product._id}`
    const { FaStar } = icons
    const percent = Math.floor(Math.random() * 50) + 1

    return (
        <div className="product-card">
            <div className="product-card-box">
                <Link href={`/product/${slug}`}>
                    {/* <div className="product-card-sale-percent">
                        <b>{percent}%</b>
                    </div> */}
                    <div className="product-card-box-image">
                        <img style={{ aspectRatio: aspectRatio }} src={product.images[0] ?? '../assets/foryou1.png'} alt={product.name} loading="lazy" decoding="async" />
                    </div>
                    <div className="product-card-box-info">
                        <Typography variant='subtitle1' color='warning'>
                            {fCurrencyVND(product.price)}
                        </Typography>
                        {/* <Typography variant='body2' color='textDisabled'>
                            {product.options.length && product.options[0].value.length > 0 ? fCurrencyVND(Math.ceil(product.options[0].value[0].price * ((100 - percent) / 100))) : '-'}
                        </Typography> */}
                        <Typography variant='body2' color='textPrimary'
                            sx={{
                                display: '-webkit-box',
                                WebkitLineClamp: 2,
                                WebkitBoxOrient: 'vertical',
                                overflow: 'hidden',
                                textOverflow: 'ellipsis',
                                maxWidth: '100%',
                                lineHeight: '1.5em',
                                maxHeight: '3em',
                                height: '3em',
                            }}
                        >
                            {product.name}
                        </Typography>
                        {/* <div className="product-card-action">
                            <PromotionBar percentage={percent} />
                        </div> */}
                        {
                            showRatingCart && <div className="product-card-action">
                                <div className="product-card-rating-container">
                                    <div className="product-card-rating">
                                        <span>5.0</span>
                                        <FaStar size={16} />
                                    </div>
                                    <span className="product-card-rating-amount">(10)</span>
                                </div>
                                <div className="product-card-cart">
                                    <button type="button" className="product-card-cart-button">
                                        <TiShoppingCart size={24} />
                                    </button>
                                    <span className="product-card-cart-amount">1.342</span>
                                </div>
                            </div>
                        }
                        <div className="product-card-gift">Quà tặng đi kèm</div>
                    </div>
                </Link>
            </div>
        </div>
    )
}

export default ProductCard