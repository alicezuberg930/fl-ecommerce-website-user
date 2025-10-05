import { ICheckoutBillingAddress, IProduct, Variation } from "./product"

export type PaymentMethod = 'momo' | 'vnpay' | 'onepay' | 'sepay' | 'cash'

export type IOrder = {
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
}

export type IOrderDetails = IOrder & {

}

export interface IOrderNew extends Omit<IOrder, 'items'> {
    items: {
        cartId: string
        productId: string
        quantity: number
        variation: Variation
    }[]
}