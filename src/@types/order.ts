import { ICheckoutBillingAddress, IProduct, Variation } from "./product"

export type PaymentMethod = 'momo' | 'vnpay' | 'onepay' | 'sepay' | 'cash'

export type IOrder = {
    _id: string
    items: {
        product: IProduct
        variation: Variation
        quantity: number
    }[],
    subTotal: number
    total: number
    discount: number
    shipping: number
    billing: ICheckoutBillingAddress,
    paymentMethod: PaymentMethod
    orderStatus: string
    paymentStatus: string
    payUrl?: string
    deeplink?: string
}

export type IOrderDetails = IOrder & {

}

export interface IOrderNew extends Omit<IOrder, 'items' | 'orderStatus' | 'paymentStatus' | '_id'> {
    cartIds: string[]
}