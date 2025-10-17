'use client'
import { useEffect, useState } from "react"
import '@/app/styles/css/order.details.css'
import { icons } from "@/utils/icons"
import LoadingShimmer from "@/app/components/LoadingShimmer"
import { fCurrencyVND } from "@/utils/formatNumber"
import { IOrder } from "@/@types/order"

const OrderDetails: React.FC<{ id: string }> = ({ id }) => {
    const { TiDocumentText, CiMoneyBill, MdOutlineLocalShipping, CiInboxIn, CiStar } = icons
    const [order, setOrder] = useState<IOrder | null>(null)

    return (
        <>
            {order ?
                <div className="order-details-wrapper">
                    <div className="order-details-header">
                        <span className="order-details-id-title">Mã đơn hàng: {order._id}</span>
                        <span>|</span>
                        <span className="order-details-status-title">{order.orderStatus}</span>
                    </div>
                    <div className="order-details-status-container">
                        <div className="order-details-status-item">
                            <div className="status-item-svg-container">
                                <TiDocumentText size={30} />
                            </div>
                            <span className="status-item-status-title">Đơn hàng đã đặt</span>
                            <span className="status-item-status-date">12:20 12-22-2001</span>
                        </div>
                        <div className="order-details-status-item">
                            <div className="status-item-svg-container">
                                <CiMoneyBill size={30} />
                            </div>
                            <span className="status-item-status-title">Đơn hàng đã thanh toán</span>
                            <span className="status-item-status-date">12:20 12-22-2001</span>
                        </div>
                        <div className="order-details-status-item">
                            <div className="status-item-svg-container">
                                <MdOutlineLocalShipping size={30} />
                            </div>
                            <span className="status-item-status-title">Đã giao cho DVVC</span>
                            <span className="status-item-status-date">12:20 12-22-2001</span>
                        </div>
                        <div className="order-details-status-item">
                            <div className="status-item-svg-container">
                                <CiInboxIn size={30} />
                            </div>
                            <span className="status-item-status-title">Đã nhận được hàng</span>
                            <span className="status-item-status-date">12:20 12-22-2001</span>
                        </div>
                        <div className="order-details-status-item">
                            <div className="status-item-svg-container">
                                <CiStar size={30} />
                            </div>
                            <span className="status-item-status-title">Đơn hàng đã hoàn thành</span>
                            <span className="status-item-status-date">12:20 12-22-2001</span>
                        </div>
                        <div className="stepper-line">
                            {/* style="background: rgb(224, 224, 224);" */}
                            <div className="stepper-line-background"></div>
                            {/* style="width: calc(100% - 140px); background: rgb(45, 194, 88);" */}
                            <div className="stepper-line-foreground"></div>
                        </div>
                    </div>
                    <div className="order-details-buy-again">
                        <span className="buy-again-title">Cảm ơn bạn đã mua sắm tại Future Life</span>
                        <button className="buy-again-button">Mua lại</button>
                    </div>
                    <div className="separator"></div>
                    <div className="order-details-process-wrapper">
                        <div className="order-details-address-container">
                            <h1>Địa chỉ nhận hàng</h1>
                            <span>Nguyễn vĩnh tiến</span>
                            <span>0932430082</span>
                            <span>{`${order.billing?.street ?? ""}, ${order.billing?.ward ?? ""}, ${order.billing.district ?? ""}, ${order.billing?.province ?? ""}`}</span>
                        </div>
                        <div className="order-details-process-container">
                            <div className="order-details-process-item">
                                <div className="process-date">
                                    10:45 24-01-2025
                                </div>
                                <div className="process-description">
                                    <div>Đã giao</div>
                                    <div>Giao hàng thành công</div>
                                </div>
                            </div>
                            <div className="order-details-process-item">
                                <div className="process-date">
                                    09:02 24-01-2025
                                </div>
                                <div className="process-description">
                                    <div>Đang vận chuyển</div>
                                    <div>Đơn hàng sẽ sớm được giao</div>
                                </div>
                            </div>
                            <div className="order-details-process-item">
                                <div className="process-date">
                                    15:22 20-01-2025
                                </div>
                                <div className="process-description">
                                    <div >Đặt hàng thành công</div>
                                    <div>Đơn hàng đã được đặt</div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="order-details-item-list-container">
                        {
                            order.items?.map(item => {
                                return (
                                    <div key={item.product._id} className="order-details-item-container">
                                        <img src={'/assets/image-not-found.jpg'} alt={item.product?.name} />
                                        <div className="item-details">
                                            <span className="item-name">{item.variation.sku ?? ""}</span>
                                            <span className="item-variant">Phân loại hàng: {item.variation.attributeValues[0] ?? ""}</span>
                                            <span className="item-amount">x{item.quantity ?? 0}</span>
                                        </div>
                                        <div className="item-price">
                                            <span className="item-price-original">{fCurrencyVND(item.variation.price ?? 0)}</span>
                                            <span className="item-price-sale">{fCurrencyVND(item.variation.price ?? 0)}</span>
                                        </div>
                                    </div>
                                )
                            })
                        }

                    </div>
                    <div className="order-details-summary-container">
                        <div className="summary-item-container">
                            <div className="summary-title">Tổng tiền</div>
                            <div className="summary-price">{fCurrencyVND(order.total ?? 0)}</div>
                        </div>
                        <div className="summary-item-container">
                            <div className="summary-title">Phí vận chuyển</div>
                            <div className="summary-price">{fCurrencyVND(0)}</div>
                        </div>
                        <div className="summary-item-container">
                            <div className="summary-title">Thành tiền</div>
                            <div className="summary-price">{fCurrencyVND(order.discount ?? 0)}</div>
                        </div>
                        <div className="summary-item-container">
                            <div className="summary-title">Phương thức thanh toán</div>
                            <div className="summary-price">Shopee Pay</div>
                        </div>
                    </div>
                </div> : <LoadingShimmer />
            }
        </>
    )
}

export default OrderDetails