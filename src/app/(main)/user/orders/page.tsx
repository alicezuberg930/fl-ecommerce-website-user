'use client'
import "@/app/styles/css/user.order.css"
import { useState, useEffect } from 'react'
import Link from "next/link"
import { fCurrencyVND } from "@/utils/formatNumber"
import { IOrder } from "@/@types/order"
import useOrder from "@/hooks/api/useOrder"

const UserOrderPage = () => {
    const { getOrders } = useOrder()
    const { data, isLoading, isError } = getOrders()

    return (
        <div className="user-order-wrapper">
            <div className="user-order-status-container">
                <b className="profile-title">Đơn hàng của tôi</b>
                <div className="user-order-search-input-container">
                    <input type="text" placeholder="Tìm kiếm" />
                    <input type="text" placeholder="Tìm kiếm" />
                </div>
                <div className="user-order-statuses">
                    <span>Tất cả</span>
                    <span>Mới đặt</span>
                    <span>Đang xử lý</span>
                    <span>Đang vận chuyển</span>
                    <span>Thành công</span>
                    <span>Đã hủy</span>
                </div>
            </div>
            <div className="separator"></div>
            <div className="user-order-list-wrapper">
                {/* <div className="user-order-not-found">
                        <img src="/assets/cart-star.png" className="cart-not-found-img" />
                        <b className="cart-not-found-title">Bạn chưa có đơn hàng nào</b>
                        <button className="continue-shopping-button"><b>Tiếp tục mua sắm</b></button>
                    </div> */}

                <div className="user-order-list-container">
                    {
                        data?.data && data?.data.map(order => {
                            return (
                                <div key={order._id} className="user-order-item-container">
                                    <div className="user-order-shop-info">
                                        <b>Danh mục sản phẩm</b>
                                        <button className="user-order-chat-button">Chat</button>
                                        <button className="user-order-shop-info-button">Xem shop</button>
                                        <b className="title-delivering">Đang vận chuyển</b>
                                    </div>
                                    {
                                        order.items && order.items.map(item => {
                                            return (
                                                <div key={item.product._id} className="user-order-product-container">
                                                    <Link href={`/user/orders/${order._id}`}>
                                                        <div className="user-order-product-info-container">
                                                            <div className="user-order-product-info">
                                                                <img src={item.product.images[0]} className="user-order-product-img" />
                                                                <div className="user-order-product-title">
                                                                    <span className="product-name">{item.variation.sku}</span>
                                                                    <span className="product-option">Phân loại sản phẩm: {Object.entries(item.variation.attributeValues)}</span>
                                                                    <span className="bought-amount">x{item.quantity}</span>
                                                                </div>
                                                            </div>
                                                            <div className="order-product-price-container">
                                                                <span className="order-product-price-original">{fCurrencyVND(order.subTotal)}</span>
                                                                <b className="order-product-price-new">{fCurrencyVND(order.total)}</b>
                                                            </div>
                                                        </div>
                                                    </Link>
                                                </div>
                                            )
                                        })
                                    }

                                    <div className="user-order-total-amount">
                                        <span>Thành tiền: </span>
                                        <b>{fCurrencyVND(order.subTotal)}</b>
                                    </div>

                                    <div className="user-order-item-action">
                                        <button className="repurchase-button">Mua lại</button>
                                        <button className="refund-button">Trả hàng/hoàn tiền</button>
                                    </div>
                                </div>
                            )
                        })
                    }
                </div>
            </div>
        </div>
    )
}

export default UserOrderPage
