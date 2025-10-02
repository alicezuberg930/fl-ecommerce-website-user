'use client'
import { Attribute, IProductDetails } from "@/@types/product"
import { icons } from "@/utils/icons"
import { useAuthContext } from "@/auth/useAuthContext"
import { useRouter } from "next/navigation"
import { useEffect, useMemo, useRef, useState } from "react"
import { deepObjectComparison, getHours, getMinutes, getSeconds } from "@/utils/common"
import { fCurrencyVND } from "@/utils/formatNumber"
import { ICartAdd } from "@/@types/cart"
import useCart from "@/hooks/api/useCart"
import { PATH_AUTH } from "@/routes/paths"
import CountDownTimer from "../CountDownTimer"

export default function ProductVariation({ product }: { product: IProductDetails }) {
    const { FaStar, IoAdd, RiSubtractFill, IoCartOutline } = icons
    const [variationValues, setVariationValues] = useState<Record<string, string>>({})
    const { user } = useAuthContext()
    const quantityRef = useRef<HTMLInputElement>(null)
    const router = useRouter()
    const { addCartItem } = useCart()
    const addMutate = addCartItem()
    const price = useMemo(() => {
        const variation = product.variations.find(v => deepObjectComparison(v.attributeValues, variationValues))
        return variation ? variation.price : null
    }, [variationValues])
    const isSelected = useMemo(() => (name: string, value: string) => {
        return Object.entries(variationValues).some(([key, val]) => key === name && val === value);
    }, [variationValues])
    console.log(isSelected('size', 'S'))
    useEffect(() => {
        let newMap = {}
        product.attributes.forEach(attribute => newMap = { ...newMap, [attribute.name]: attribute.values[0] })
        setVariationValues(newMap)
    }, [])

    const handleSelectVariation = (attribute: Attribute, value: string) => setVariationValues(prev => ({ ...prev, [attribute.name]: value }))

    const handleIncreaseQuantity = () => {
        if (quantityRef.current) {
            let quantity = +quantityRef.current.value
            const variation = product.variations.find(v => deepObjectComparison(v.attributeValues, variationValues))
            if (variation && quantity < variation.stock)
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
            router.push(PATH_AUTH.login)
        } else {
            const variation = product.variations.find(v => deepObjectComparison(v.attributeValues, variationValues))
            if (variation && quantityRef.current) {
                const cart: ICartAdd = {
                    product: product._id,
                    quantity: +quantityRef.current.value,
                    variation
                }
                addMutate.mutate({ cart })
            }
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
                        <CountDownTimer />
                    </div>
                </div>
            </div>

            <div className="box_price">
                <span className="txt_price">{fCurrencyVND(price || product.price)}</span>
                <span>(Đã bao gồm VAT)</span>
            </div>

            {product.attributes && (
                <div className="product-options-wrapper" id="product-options-wrapper">
                    {product.attributes.map(attribute => (
                        <div key={attribute.name} className="product_chose_type">
                            <span className="txt_variant" id="txt_soluong_capacity">
                                <label className="variant-name">{attribute.name}</label>
                            </span>
                            {attribute.values.map(value => (
                                <div
                                    key={value} title={`${value}`} style={{ border: `${isSelected(attribute.name, value) ? '1px solid #3366FF' : '1px solid gray'}` }}
                                    className={`attribute-option-item`}
                                    onClick={() => handleSelectVariation(attribute, value)}
                                >
                                    <span>{value}</span>
                                    {/* <img src={val.img} alt={val.val} /> */}
                                </div>
                            ))}
                        </div>
                    ))}
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