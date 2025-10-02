'use client'
import "@/app/styles/css/user.order.css"
import UserContent from "../components/UserContent"
import { useState, useEffect } from 'react'
import Link from "next/link"
import { fCurrencyVND } from "@/utils/formatNumber"

const UserOrderPage = () => {
    const [orders, setOrders] = useState<Order[]>([])

    return (
        <UserContent>
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
                            orders.map(order => {
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
                                                    <div key={item.productId?._id} className="user-order-product-container">
                                                        <Link href={`/user/orders/${order._id}`}>
                                                            <div className="user-order-product-info-container">
                                                                <div className="user-order-product-info">
                                                                    <img src="/assets/facebook.png" className="user-order-product-img" />
                                                                    <div className="user-order-product-title">
                                                                        <span className="product-name">{item.name}</span>
                                                                        <span className="product-option">Phân loại sản phẩm: {item.options![0].id}</span>
                                                                        <span className="bought-amount">x{item!.options![0].quantity ?? 0}</span>
                                                                    </div>
                                                                </div>
                                                                <div className="order-product-price-container">
                                                                    <span className="order-product-price-original">{fCurrencyVND(order.totalPrice ?? 0)}</span>
                                                                    <b className="order-product-price-new">{fCurrencyVND(order.discountedPrice ?? 0)}</b>
                                                                </div>
                                                            </div>
                                                            <div className="user-order-gift-info-container">
                                                                <div className="user-order-gift">
                                                                    <img src="/assets/facebook.png" className="user-order-gift-img" />
                                                                    <div className="user-order-gift-title">
                                                                        <span className="gift-name">Bill 500k tặng 1 Sữa dinh dưỡng - Mamacare premium</span>
                                                                        <span className="gift-option">Phân loại sản phẩm: màu xanh</span>
                                                                        <span className="gift-amount">x5</span>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </Link>
                                                    </div>
                                                )
                                            })
                                        }

                                        <div className="user-order-total-amount">
                                            <span>Thành tiền: </span>
                                            <b>{fCurrencyVND(order.discountedPrice ?? 0)}</b>
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
        </UserContent >
    )
}

export default UserOrderPage
