"use client"
import React, { FormEvent, useEffect, useRef, useState } from "react"
import "@/app/styles/css/product.details.css"
import { RootState, useDispatch } from "../app/api/store"
import { useSelector } from "react-redux"
import { fetchProductById, fetchProductList } from "../app/api/Slices/product.slice"
import { icons } from "../app/common/icons"
import LoadingShimmer from "../app/components/LoadingShimmer"
import { generateSecureRandomString, getHours, getMinutes, getSeconds, slugify } from "../app/common/utils"
import { toast } from "react-toastify"
import { useRouter } from "next/navigation"
import Slider, { Settings } from "react-slick"
import ProductCard from "../app/components/ProductCard"
import Link from "next/link"
import { instance } from "../utils/axios"
import ENDPOINT from "../app/common/api"
import { Container, Table, TableBody, TableCell, TableContainer, TableRow } from "@mui/material"
import { useSettingsContext } from "@/components/settings"
import useCart from "@/hooks/useCart"
import { useAuthContext } from "@/auth/useAuthContext"
import { fCurrencyVND } from "@/utils/formatNumber"

const detailTabs = [
    {
        id: "box_product_detail",
        name: "Chi tiết sản phẩm"
    },
    {
        id: "box_product_description",
        name: "Thông tin"
    },
    {
        id: "box_reviews",
        name: "Đánh giá"
    }
]

const settings: Settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 1,
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

const ProductDetailsPage: React.FC<{ slug: string }> = ({ slug }) => {
    const id = slug.split('-').at(-1)
    const dispatch = useDispatch()
    const product = useSelector((state: RootState) => state.Products.selectedProduct)
    const { FaStar, IoAdd, RiSubtractFill, MdLocationOn, IoCartOutline, MdThumbUp, FaRegTrashCan } = icons
    const lensRef = useRef<HTMLDivElement>(null)
    const imgRef = useRef<HTMLImageElement>(null)
    const zoomRatio = 1.5 // 150% zoom
    const imgContainerRef = useRef<HTMLDivElement>(null)
    const quantityRef = useRef<HTMLInputElement>(null)
    const router = useRouter()
    let timeLeft = 7200 // store the remaining time
    const hoursHTMLRef = useRef<HTMLElement>(null)
    const minutesHTMLRef = useRef<HTMLElement>(null)
    const secondsHTMLRef = useRef<HTMLElement>(null)
    const products = useSelector((state: RootState) => state.Products.products)
    const dispath = useDispatch()
    const contentTabRef = useRef<HTMLDivElement>(null)
    const [userImage, setUserImage] = useState<string | undefined>(undefined)
    const commentRef = useRef<HTMLDivElement>(null)
    const [selectedOptions, setSelectionOptions] = useState<{ id: string, value: { id: string, quantity: number, price: number }[] }[]>([])
    const [selectedStars, setSelectedStars] = useState(0)
    const [reviews, setReviews] = useState<Review[]>([])
    const [reply, setReply] = useState<string>("")
    const { addCart } = useCart()
    const addCartMutate = addCart()
    const { user } = useAuthContext()

    useEffect(() => {
        dispath(fetchProductList({ page: 1, limit: 20, category: null, brand: null }))
        const a = setInterval(() => {
            if (timeLeft > 0) {
                timeLeft -= 1
                if (hoursHTMLRef.current) hoursHTMLRef.current.innerHTML = String(getHours(timeLeft))
                if (minutesHTMLRef.current) minutesHTMLRef.current.innerHTML = String(getMinutes(timeLeft))
                if (secondsHTMLRef.current) secondsHTMLRef.current.innerHTML = String(getSeconds(timeLeft))
            } else {
                if (a) clearInterval(a)
            }
        }, 1000)
        if (id) dispatch(fetchProductById(id))
        // Cleanup interval on component unmount
        return () => { if (a) clearInterval(a) }
    }, [])

    const fetchReviews = async () => {
        const response = await instance.get(`${ENDPOINT.REVIEWS}?productId=${product?._id}`)
        setReviews(response.data.reviews ?? [])
    }

    const handleDeleteComment = async (id: string) => {
        try {
            const response = await instance.post(`${ENDPOINT.DELETE_REVIEW}/${id}`)
            toast.success(response.data.message)
            fetchReviews()
        } catch (error) {
            toast.error("Đánh giá sản phẩm thất bại")
        }
        fetchReviews()
    }

    const submitReply = async (e: FormEvent<HTMLFormElement>, id: string) => {
        e.preventDefault()
        try {
            const response = await instance.post(`${ENDPOINT.REPLY_REVIEW}/${id}`, { 'comment': reply })
            toast.success(response.data.message)
            setReply("")
            fetchReviews()
        } catch (error) {
            toast.success("Phản hồi thất bại")
        }
    }

    useEffect(() => {
        if (product) fetchReviews()
    }, [product])

    const handleCreateReview = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        const formData = new FormData(e.currentTarget)
        const entries = Object.fromEntries(formData.entries())
        try {
            await instance.post(ENDPOINT.ADD_REVIEWS, {
                'comment': entries.comment, 'rating': selectedStars, 'productId': product?._id
            })
            toast.success("Đánh giá sản phẩm thành công!")
        } catch (error) {
            toast.error("Đánh giá sản phẩm thất bại")
        }
        fetchReviews()
        commentRef.current!.style.display = "none"
    }

    const handleLikeDislike = async (id: string) => {
        try {
            const response = await instance.post(`${ENDPOINT.LIKE_REVIEW}/${id}`)
            toast.success(response.data.message)
            fetchReviews()
        } catch (error) {
            toast.error('Like bình luận thất bại')
        }
    }

    const increaseQuantity = () => {
        let quantity = +quantityRef.current!.value
        if (quantity < product?.remainingStock!) quantityRef.current!.value = String(quantity + 1)
        else toast.error("Vượt quá số lượng trong kho")
    }

    const decreaseQuantity = () => {
        let quantity = +quantityRef.current!.value
        if (quantity > 1) quantityRef.current!.value = String(quantity - 1)
    }

    const handleAddCart = async () => {
        if (!user) {
            router.push("/login")
        } else {
            const products: any = []
            let tempOptions = selectedOptions
            if (product?.options[0].key == "") {
                tempOptions[0] = ({
                    id: product?.options[0]._id,
                    value: [
                        {
                            price: product.options[0].value[0].price,
                            id: product?.options[0].value[0]._id,
                            quantity: +(quantityRef.current!.value ?? 1),
                        }
                    ]
                })
            }
            tempOptions.forEach(tempOption => { tempOption.value[0].quantity = +(quantityRef.current!.value ?? 1) })
            products.push({ productId: product?._id!, options: tempOptions })
            addCartMutate.mutate({ cart: { products } }, {
                onSuccess: (_) => { router.push('/cart') }
            })
        }
    }

    const handleMouseMove = (e: React.MouseEvent) => {
        if (!lensRef.current || !imgRef.current) return
        const img = imgRef.current
        const lens = lensRef.current
        const bounds = img.getBoundingClientRect()
        // Get cursor position relative to the image
        let x = e.pageX - bounds.left - window.scrollX
        let y = e.pageY - bounds.top - window.scrollY
        // Set bounds for the lens
        x = Math.max(0, Math.min(x, img.width - lens.offsetWidth / zoomRatio))
        y = Math.max(0, Math.min(y, img.height - lens.offsetHeight / zoomRatio))
        // Position the lens
        lens.style.left = `${x}px`
        lens.style.top = `${y}px`
        // Set lens background position
        lens.style.backgroundPosition = `-${x * zoomRatio}px -${y * zoomRatio}px`
    }

    const handleMouseOver = () => {
        if (!lensRef.current || !imgRef.current) return
        const lens = lensRef.current
        const img = imgRef.current
        lens.style.display = 'block'
        lens.style.backgroundImage = `url(${img.src})`
        lens.style.backgroundSize = `${img.width * zoomRatio}px ${img.height * zoomRatio}px`
    }

    const handleMouseOut = () => {
        if (lensRef.current) lensRef.current.style.display = 'none'
    }

    const handleScroll = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
        e.preventDefault()
        let links = contentTabRef.current!.children
        for (let i = 0; i < links.length; i++) {
            if (links[i].isSameNode(e.currentTarget)) links[i].classList.add('active')
            else links[i].classList.remove('active')
        }
        const targetId = e.currentTarget.getAttribute('rel')
        const targetElement = document.querySelector(`.${targetId}`)
        if (targetElement) targetElement.scrollIntoView({ behavior: 'smooth' })
    }

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

    return (
        <Container maxWidth='xl' sx={{ my: 3 }}>
            {!product ? <LoadingShimmer /> :
                <>
                    <>
                        <div className="product-details-image-container">
                            <div className="product-details-image-wrapper">
                                <div className="product-details-images-container">
                                    <div className="product-details-left-images-wrapper">
                                        {product.images.length > 0 ?
                                            product.images.map((image: any) => {
                                                return (
                                                    <div key={image} className="left-image-container item-image">
                                                        <img src={image} alt={image} onClick={() => imgRef.current!.src = image} />
                                                    </div>
                                                )
                                            }) :
                                            <div className="left-image-container item-image">
                                                <img src='../assets/foryou1.png' alt='temp' />
                                            </div>
                                        }
                                    </div>
                                    <div className="product-image"
                                        ref={imgContainerRef}
                                        onMouseMove={handleMouseMove}
                                        onMouseOver={handleMouseOver}
                                        onMouseOut={handleMouseOut}
                                    >
                                        <div ref={lensRef} className='lens'></div>
                                        <img ref={imgRef} src={product.images[0] ?? '../assets/foryou1.png'} />
                                    </div>
                                </div>
                                <div className="customer-images-wrapper">
                                    <span>Hình ảnh thực tế từ khách hàng</span>
                                    <div className="customer-images-container">
                                        {product.images.length > 0 ?
                                            product.images.map(image => {
                                                return (
                                                    <div key={image} className="customer-image-container" onClick={() => setUserImage(image)} >
                                                        <img src={image} alt={image} />
                                                    </div>
                                                )
                                            }) :
                                            <div className="customer-image-container">
                                                <img src='../assets/foryou1.png' alt='temp' />
                                            </div>
                                        }
                                    </div>
                                </div>
                            </div>
                            <div className="product-details-info-wrapper">
                                <h3 className="product-details-brand-title">Thương hiệu</h3>
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
                                    <span className="txt_price">
                                        {
                                            product.options[0].value.length > 0 ? fCurrencyVND(product.options[0].value[0].price) : 0
                                        }
                                    </span>
                                    <span>(Đã bao gồm VAT)</span>
                                </div>

                                {product.options && product.options[0].key != '' ?
                                    <div className="product-options-wrapper" id="product-options-wrapper">
                                        {
                                            product.options.map((option, i) => {
                                                return (
                                                    <div key={option._id} className="product_chose_type">
                                                        <span className="txt_variant" id="txt_soluong_capacity">
                                                            <label className="variant-name">{option.key}: </label>
                                                            <span className="variant-attribute">{option.value[0].val}</span>
                                                        </span>
                                                        {
                                                            option.value.map(val => {
                                                                return (
                                                                    <a key={val._id} title={`${option.key}: ${val.val}`} className={`attribute-option-item ${selectedOptions[i] && selectedOptions[i].value[0].id === val._id ? 'active' : ''}`}
                                                                        onClick={() => onSelectOption(option._id, val._id, val.price)}
                                                                    >
                                                                        <img src={val.img} alt={val.val} />
                                                                    </a>
                                                                )
                                                            })
                                                        }
                                                    </div>
                                                )
                                            })
                                        }
                                    </div> : <></>
                                }

                                <div className="quantity-wrapper">
                                    <span className="quantity-text">Số lượng: </span>
                                    <div className="quantity-control">
                                        <RiSubtractFill className="quantity-subtract" size={24} onClick={decreaseQuantity} />
                                        <input type="number" ref={quantityRef} defaultValue={1} className="quantity-input" title="Số lượng" />
                                        <IoAdd className="quantity-add" size={24} onClick={increaseQuantity} />
                                    </div>
                                </div>

                                <div className="actions">
                                    <button type="button" className="block_store">
                                        <MdLocationOn size={20} />
                                        <div className="button_check_stock_card">
                                            <div className="">
                                                <b>2/2</b> Chi Nhánh <br /> còn <b> sản phẩm</b>
                                            </div>
                                        </div>
                                    </button>
                                    <button type="button" className="add_cart_button" onClick={handleAddCart}>
                                        <IoCartOutline size={20} />
                                        <span>Giỏ hàng</span>
                                    </button>
                                    <button type="button" className="buy_now" onClick={handleAddCart}>Mua ngay</button>
                                </div>
                            </div>
                        </div>
                        <div className="main_info_details">
                            <div className="section_scroll">
                                <div className="tab_sub_info">
                                    <div className="content_scroll_tab" ref={contentTabRef} >
                                        {
                                            detailTabs.map(tab => {
                                                return (<a key={tab.id} onClick={handleScroll} rel={`${tab.id}`} className={`item_tab_sub_info`}>{tab.name}</a>)
                                            })
                                        }
                                    </div>
                                </div>

                                <div className="box_product_detail">
                                    <TableContainer sx={{}}>
                                        <Table>
                                            <TableBody>
                                                <TableRow>
                                                    <TableCell width={200}>Danh mục</TableCell>
                                                    <TableCell>{product.category?.name ?? "Không có"}</TableCell>
                                                </TableRow>
                                                <TableRow>
                                                    <TableCell width={200}>Thương hiệu</TableCell>
                                                    <TableCell>{product.brand}</TableCell>
                                                </TableRow>
                                                <TableRow>
                                                    <TableCell width={200}>Quy trình đóng gói</TableCell>
                                                    <TableCell>{product.packaging}</TableCell>
                                                </TableRow>
                                                <TableRow>
                                                    <TableCell width={200}>Kho</TableCell>
                                                    <TableCell>{product.remainingStock}</TableCell>
                                                </TableRow>
                                            </TableBody>
                                        </Table>
                                    </TableContainer>
                                </div>

                                <div className="box_product_description">
                                    <span>{product.description}</span>
                                </div>

                                <div className="box_reviews">
                                    <div className="tt_box_detail">Đánh giá</div>
                                    <div className="ct_box_detail">
                                        <div className="box_rating">
                                            <div className="box_total_rating">
                                                <div className="block_total_left">
                                                    <div className="txt_top_total_left">Đánh giá trung bình</div>
                                                    <div className="row">
                                                        <div className="block_number_total">
                                                            <div className="txt_number">4.0</div>
                                                            <div className="block_start">
                                                                <FaStar fill="#fda01e" />
                                                                <FaStar fill="#fda01e" />
                                                                <FaStar fill="#fda01e" />
                                                                <FaStar fill="#fda01e" />
                                                                <FaStar fill="#fda01e" />
                                                            </div>
                                                            <div className="txt_total_nhanxet">14 nhận xét</div>
                                                        </div>
                                                        <div className="block_detail_number">
                                                            <div className="row_detail_number">
                                                                <span className="txt_number_start">5 sao</span>
                                                                <div className="block_percent_rate">
                                                                    <span></span>
                                                                </div>
                                                                <span className="number_rating"> 12</span>Rất hài lòng
                                                            </div>
                                                            <div className="row_detail_number">
                                                                <span className="txt_number_start">4 sao</span>
                                                                <div className="block_percent_rate">
                                                                    <span></span>
                                                                </div>
                                                                <span className="number_rating"> 0 </span>Hài lòng
                                                            </div>
                                                            <div className="row_detail_number">
                                                                <span className="txt_number_start">3 sao</span>
                                                                <div className="block_percent_rate">
                                                                    <span></span>
                                                                </div>
                                                                <span className="number_rating"> 0 </span>Bình thường
                                                            </div>
                                                            <div className="row_detail_number">
                                                                <span className="txt_number_start">2 sao</span>
                                                                <div className="block_percent_rate">
                                                                    <span></span>
                                                                </div>
                                                                <span className="number_rating"> 0 </span>Không hài lòng
                                                            </div>
                                                            <div className="row_detail_number">
                                                                <span className="txt_number_start">1 sao</span>
                                                                <div className="block_percent_rate">
                                                                    <span></span>
                                                                </div>
                                                                <span className="number_rating"> 0 </span>Rất tệ
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="block_total_right">
                                                    <div className="text_share">Chia sẻ nhận xét của bạn về sản phẩm này</div>
                                                    <button className="comment-button" onClick={() => commentRef.current!.style.display = "block"}>Bình luận</button>
                                                </div>
                                            </div>

                                            <div className="box_comment">
                                                <div className="title_box_comment">
                                                    <div className="txt_total_comment">{reviews.length ?? 0} bình luận cho sản phẩm này</div>
                                                    <div className="filter_comment">
                                                        <select className="filter_input">
                                                            <option>Ngày đánh giá</option>
                                                            <option>Đánh giá tốt nhất</option>
                                                            <option>Đánh giá tệ nhất</option>
                                                            <option>Đã mua hàng</option>
                                                        </select>
                                                    </div>
                                                </div>
                                                <div className="list_comment">
                                                    {reviews.length > 0 &&
                                                        reviews.map(review => {
                                                            const isLiked = review.likes?.find(like => like === user!._id)
                                                            const isDeletable = review.userId?._id === user!._id
                                                            return (
                                                                <div key={review._id} className="item_comment">
                                                                    <div className="title_comment">
                                                                        <div className="block_start">
                                                                            {
                                                                                [...Array(5)].map((_, i) => {
                                                                                    return (
                                                                                        <FaStar key={i} fill={i < review.rating! ? "#FFD700" : "#949494"} />
                                                                                    )
                                                                                })
                                                                            }
                                                                        </div>
                                                                        <strong className="txt_color_1">{review.userId?.name}</strong>
                                                                        <div className="txt_999">{review._id}</div>
                                                                        <MdThumbUp fill={isLiked ? "#0468fc" : "#21354e"} onClick={() => handleLikeDislike(review._id!)} />
                                                                        {isDeletable && <FaRegTrashCan fill='red' onClick={() => handleDeleteComment(review._id!)} />}
                                                                        <div className="timer_comment">{review.createdAt!.split("T")[0]}</div>
                                                                    </div>
                                                                    <div className="content_comment">{review.comment}</div>
                                                                    <div className="replies-container">
                                                                        <div className="reply-title">Phản hồi</div>
                                                                        {
                                                                            review.replies && review.replies.length > 0 ? review.replies?.map(reply => {
                                                                                return (
                                                                                    <div className="reply-message" key={reply._id}>
                                                                                        <span>{reply.comment}</span>
                                                                                        <div className="reply-date">{reply.createdAt!.split("T")[0]}</div>
                                                                                    </div>
                                                                                )
                                                                            }) : <span>Bình luận chưa có phản hồi</span>
                                                                        }
                                                                        <form onSubmit={(e) => submitReply(e, review._id!)} className="reply-input-container">
                                                                            <input value={reply} onChange={(e) => setReply(e.target.value)} placeholder="Viết phản hồi" className="reply-input" type="text" />
                                                                        </form>
                                                                    </div>
                                                                </div>
                                                            )
                                                        })
                                                    }
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="box_suggestion">
                                <b className="tt_box_detail">Sản phẩm cùng thương hiệu</b>
                                <div className="list_product_right">
                                    {
                                        products?.slice(0, 5).map(product => {
                                            return (
                                                <div key={product._id} className="item_product_right">
                                                    {/* <div className="item_product_img_container"> */}
                                                    <img className="img_thumb" src={product.images[0] || '/assets/foryou1.png'} alt="" />
                                                    {/* </div> */}
                                                    <Link href={`/product/${slugify(product.name)}-${product._id}`} className="item_product_info">
                                                        <div className="block_price">
                                                            <strong className="item_giamoi">175.000₫</strong>
                                                            <div className="item_giacu">259.000₫</div>
                                                        </div>
                                                        <div className="name_brand">
                                                            <strong>Weathy Heath</strong>
                                                        </div>
                                                        <h2 className="name_sp">
                                                            {product.name}
                                                        </h2>
                                                        <div className="txt_combo" title="Quà tặng đi kèm">Quà tặng đi kèm</div>
                                                    </Link>
                                                </div>
                                            )
                                        })
                                    }
                                </div>
                            </div>
                        </div>
                        <div className="box_suggestion_footer">
                            <div className="title_box_common">
                                <h2 className="txt_title_box">
                                    <span>Gợi ý sản phẩm cho bạn</span>
                                </h2>
                            </div>
                            <div className="content_box_common">
                                <Slider {...settings}>
                                    {
                                        products?.map((v, i) => {
                                            return (
                                                <ProductCard key={i} product={v} aspectRatio={'1/1'} />
                                            )
                                        })
                                    }
                                </Slider>
                            </div>
                        </div>
                    </>

                    <div className='user-review-box-overlay' style={{ display: `${userImage ? 'block' : 'none'}` }}>
                        <div className="user-review-box-overlay-wrapper">
                            <div className="box-overlay-hidden" onClick={() => setUserImage(undefined)}>
                                <div></div>
                            </div>
                            <div className="user-review-image-wrapper">
                                <img src={userImage} className="preview-user-image" />
                                <div className="user-review-image-list">
                                    {
                                        product.images.map(image => {
                                            return (
                                                <img key={image} src={image} onClick={() => setUserImage(image)} />
                                            )
                                        })
                                    }
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className='comment-box-overlay' ref={commentRef}>
                        <div className="comment-box-overlay-wrapper">
                            <div className="box-overlay-hidden" onClick={() => commentRef.current!.style.display = "none"}>
                                <div></div>
                            </div>
                            <form onSubmit={handleCreateReview} className="comment-box-wrapper">
                                <span>Đánh giá sản phẩm này</span>
                                <div className="star-container">
                                    {
                                        [...Array(5)].map((_, index) => {
                                            return (
                                                <FaStar key={index} size={34} fill={index < selectedStars ? "#FFD700" : "#949494"} onClick={() => setSelectedStars(index + 1)} />
                                            )
                                        })
                                    }
                                </div>
                                <div className="comment-description">
                                    <span>Mô tả sản phẩm này</span>
                                    <span>Ký tự còn lại 2500</span>
                                </div>
                                <textarea name="comment" className="comment-input" placeholder="Nhập mô tả tại đây"></textarea>
                                <div className="comment-pick-image-container">
                                    <span>Thêm hình ảnh nếu (tối đa 5 hình):</span>
                                    <button className="pick-image-button"><b>Chọn hình</b></button>
                                </div>
                                <div className="comment-action-container">
                                    <button type="reset" className="comment-action-button" onClick={() => commentRef.current!.style.display = "none"}><b>Bỏ qua</b></button>
                                    <button className="comment-action-button"><b>Gửi</b></button>
                                </div>
                            </form>
                        </div>
                    </div>
                </>
            }
        </Container>
    )
}

export default ProductDetailsPage