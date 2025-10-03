import { IBrand } from "./brand"
import { ICartItem } from "./cart"
import { ICategory } from "./category"
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

export type QueryProduct = {
    page: number
    pageSize: number
    name?: string
    category?: string
    brand?: string
    isHidden?: boolean
}

export type ICheckoutBillingAddress = {
    receiver: string;
    phoneNumber: string;
    fullAddress: string;
    addressType: string;
    isDefault: boolean;
};

export type IProductCheckoutState = {
    activeStep: number
    cart: ICartItem[]
    subtotal: number
    total: number
    discount: number
    shipping: number
    billing: ICheckoutBillingAddress | null
    totalItems: number
}