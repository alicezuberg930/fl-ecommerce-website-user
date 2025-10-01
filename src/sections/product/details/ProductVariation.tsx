'use client'
import { IProductDetails } from "@/@types/product"
import { icons } from "@/app/common/icons"
import { useAuthContext } from "@/auth/useAuthContext"
import { useRouter } from "next/navigation"
import { useEffect, useRef, useState } from "react"
import { getHours, getMinutes, getSeconds } from "@/utils/common"
import { fCurrencyVND } from "@/utils/formatNumber"

export default function ProductVariation({ product }: { product: IProductDetails }) {
    const { FaStar, IoAdd, RiSubtractFill, IoCartOutline, MdThumbUp, FaRegTrashCan } = icons
    const [selectedOptions, setSelectionOptions] = useState<{ id: string, value: { id: string, quantity: number, price: number }[] }[]>([])
    const { user } = useAuthContext()
    const quantityRef = useRef<HTMLInputElement>(null)
    const router = useRouter()
    let timeLeft = 7200
    const hoursHTMLRef = useRef<HTMLElement>(null)
    const minutesHTMLRef = useRef<HTMLElement>(null)
    const secondsHTMLRef = useRef<HTMLElement>(null)

    useEffect(() => {
        const interval = setInterval(() => {
            if (timeLeft > 0) {
                timeLeft -= 1
                if (hoursHTMLRef.current) hoursHTMLRef.current.innerHTML = String(getHours(timeLeft))
                if (minutesHTMLRef.current) minutesHTMLRef.current.innerHTML = String(getMinutes(timeLeft))
                if (secondsHTMLRef.current) secondsHTMLRef.current.innerHTML = String(getSeconds(timeLeft))
            } else {
                if (interval) clearInterval(interval)
            }
        }, 1000)
        return () => { if (interval) clearInterval(interval) }
    }, [])

    const onSelectOption = (optionId: string, valueId: string, price: number) => {
        setSelectionOptions((prevOptions) => {
            // Clone the previous state
            let tempOptions = [...prevOptions]
            let existingOption = tempOptions.find((opt) => opt.id === optionId)
            if (existingOption !== undefined) {
                // Replace the value immutably
                existingOption = {
                    ...existingOption,
                    value: [{ id: valueId, quantity: 1, price }],
                }
                return tempOptions.map((opt) =>
                    opt.id === optionId ? existingOption! : opt
                )
            } else {
                return [...tempOptions, { id: optionId, value: [{ id: valueId, quantity: 1, price }] }]
            }
        })
    }

    const handleIncreaseQuantity = () => {
        if (quantityRef.current) {
            let quantity = +quantityRef.current.value
            quantityRef.current.value = String(quantity + 1)
        }
    }

    const handleDecreaseQuantity = () => {
        if (quantityRef.current) {
            let quantity = +quantityRef.current!.value
            if (quantity > 1) quantityRef.current!.value = String(quantity - 1)
        }
    }

    const handleAddCart = async () => {
        if (!user) {
            router.push("/login")
        } else {
            const products: any = []
            let tempOptions = selectedOptions

            tempOptions.forEach(tempOption => { tempOption.value[0].quantity = +(quantityRef.current!.value ?? 1) })
            products.push({ productId: product?._id!, options: tempOptions })
        }
    }

    return (
        <div className="product-details-info-wrapper">
            <h3 className="product-details-brand-title">{product.brand.name}</h3>
            <span className="product-details-title">{product.name}</span>
            <div className="product-brand">
                <div className="star_container">
                    <FaStar fill="#fda01e" />
                    <FaStar fill="#fda01e" />
                    <FaStar fill="#fda01e" />
                    <FaStar fill="#fda01e" />
                    <FaStar fill="#fda01e" />
                </div>
                <span className="txt_color_1" id="click_scroll_review">15 đánh giá</span>
                <span className="hsk-seperator"> | </span>
                <span className="txt_color_1" id="click_scroll_qa">124 Hỏi đáp</span>
                <span className="hsk-seperator"> | </span>
                <span className="txt_color_1">Mã sản phẩm: {product._id}</span>
            </div>
            <div className="block_timer_deal_detail">
                <div className="title_deal_brand">
                    <img src="/assets/flash_deal_title.svg" className="logo_deal_web" />
                    <div className="time_finish">
                        Kết thúc trong
                        <div className="timer_deal_brand" id="clockdiv">
                            <div className="item_count_down"><b className="days">00</b></div>
                            <span> : </span>
                            <div className="item_count_down"><b className="hour" ref={hoursHTMLRef}></b></div>
                            <span> : </span>
                            <div className="item_count_down"><b className="minute" ref={minutesHTMLRef}></b></div>
                            <span> : </span>
                            <div className="item_count_down"><b className="second" ref={secondsHTMLRef}></b></div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="box_price">
                <span className="txt_price">{fCurrencyVND(product.price)}</span>
                <span>(Đã bao gồm VAT)</span>
            </div>

            {product.attributes && (
                <div className="product-options-wrapper" id="product-options-wrapper">
                    {product.attributes.map((attribute, i) => {
                        return (
                            <div key={attribute.name} className="product_chose_type">
                                <span className="txt_variant" id="txt_soluong_capacity">
                                    <label className="variant-name">{attribute.name}</label>
                                </span>
                                {
                                    attribute.values.map(value => {
                                        return (
                                            <div
                                                key={value} title={`${value}`}
                                                className={`attribute-option-item`}
                                                onClick={() => { }}
                                            >
                                                <span>{value}</span>
                                                {/* <img src={val.img} alt={val.val} /> */}
                                            </div>
                                        )
                                    })
                                }
                            </div>
                        )
                    })}
                </div>
            )}

            <div className="quantity-wrapper">
                <span className="quantity-text">Số lượng: </span>
                <div className="quantity-control">
                    <RiSubtractFill className="quantity-subtract" size={24} onClick={handleDecreaseQuantity} />
                    <input type="number" ref={quantityRef} defaultValue={1} className="quantity-input" title="Số lượng" />
                    <IoAdd className="quantity-add" size={24} onClick={handleIncreaseQuantity} />
                </div>
            </div>
            <div className="actions">
                <button type="button" className="add_cart_button" onClick={handleAddCart}>
                    <IoCartOutline size={20} />
                    <span>Giỏ hàng</span>
                </button>
                <button type="button" className="buy_now" onClick={handleAddCart}>Mua ngay</button>
            </div>
        </div>
    )
}