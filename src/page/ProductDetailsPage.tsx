"use client"
import React, { useRef } from "react"
import "@/app/styles/css/product.details.css"
import LoadingShimmer from "../app/components/LoadingShimmer"
import { slugify } from "@/utils/common"
import { Settings } from "react-slick"
import ProductCard from "@/sections/product/ProductCard"
import Link from "next/link"
import { Container, Table, TableBody, TableCell, TableContainer, TableRow } from "@mui/material"
import { IProductDetails } from "@/@types/product"
import useProduct from "@/hooks/api/useProduct"
import CarouselList from "@/sections/home/CarouselList"
import Rating from "@/sections/product/details/Rating"
import InteractiveImage from "@/sections/product/details/InteractiveImage"
import ProductVariation from "@/sections/product/details/ProductVariation"

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

export default function ProductDetailsPage({ product }: { product: IProductDetails }) {
    const contentTabRef = useRef<HTMLDivElement>(null)
    const { getProducts } = useProduct()
    const { data: response, isLoading, isError, error } = getProducts()
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

    return (
        <Container maxWidth='xl' sx={{ my: 3 }}>
            {!product ? <LoadingShimmer /> :
                <>
                    <>
                        <div className="product-details-image-container">
                            <InteractiveImage product={product} />
                            <ProductVariation product={product} />
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
                                                    <TableCell>{product.brand.name}</TableCell>
                                                </TableRow>
                                                <TableRow>
                                                    <TableCell width={200}>Quy trình đóng gói</TableCell>
                                                    <TableCell>{"product.packaging"}</TableCell>
                                                </TableRow>
                                                <TableRow>
                                                    <TableCell width={200}>Kho</TableCell>
                                                    <TableCell>{"product.remainingStock"}</TableCell>
                                                </TableRow>
                                            </TableBody>
                                        </Table>
                                    </TableContainer>
                                </div>

                                <div className="box_product_description">
                                    <span>{product.description}</span>
                                </div>

                                <Rating productId={product._id} />
                            </div>
                            <div className="box_suggestion">
                                <b className="tt_box_detail">Sản phẩm cùng thương hiệu</b>
                                <div className="list_product_right">
                                    {
                                        response?.data?.slice(0, 5).map(product => {
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
                                <CarouselList settings={settings}>
                                    {response?.data?.map((v, i) => (
                                        <ProductCard key={i} product={v} aspectRatio={'1/1'} />
                                    ))}
                                </CarouselList>
                            </div>
                        </div>
                    </>
                </>
            }
        </Container>
    )
}