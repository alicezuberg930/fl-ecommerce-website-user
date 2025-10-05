import { IBrand } from "./brand"
import { ICartItem } from "./cart"
import { ICategory } from "./category"
import { PaymentMethod } from "./order"
import { IRating } from "./rating"

export type IProduct = {
    _id: string
    name: string
    description: string
    price: number
    category: Partial<ICategory>
    brand: IBrand
    ratings: IRating[]
    weight: number
    height: number
    width: number
    length: number
    isHidden: boolean
    variations: Variation[]
    attributes: Attribute[]
    images: string[]
}

export type IProductDetails = IProduct & {
    variations: Variation[]
    attributes: Attribute[]
}

export type Variation = {
    sku: string
    attributeValues: Record<string, string>
    price: number
    stock: number
}

export type Attribute = {
    name: string
    values: string[]
}

export type IProductFilter = {
    page: number
    pageSize: number
    name?: string
    category?: string
    brand?: string
    isHidden?: boolean
}

export type AddressType = 'home' | 'office'

export type ICheckoutBillingAddress = {
    contactName: string
    contactPhone: string
    province: string
    district: string
    ward: string
    street: string
    addressType?: AddressType
    isDefault?: boolean
}

export type ICheckoutBillingAddressItem = ICheckoutBillingAddress & {
    _id: string
}

export type IProductCheckoutState = {
    // activeStep: number
    cart: ICartItem[]
    subTotal: number
    total: number
    discount: number
    shipping: number
    billing: ICheckoutBillingAddress | null
    paymentMethod: PaymentMethod | null
}

export type ICheckoutDeliveryOption = {
    value: number
    title: string
    description: string
}

export type ICheckoutPaymentOption = {
    value: string
    title: string
    description: string
    icons: string[]
}

export type ICheckoutCardOption = {
    value: string
    label: string
}