import { IBrand } from "./brand"
import { ICategory } from "./category"
import { Rating } from "./rating"

export type IProduct = {
    _id: string
    name: string
    description: string
    price: number
    category: Partial<ICategory>
    brand: IBrand
    ratings: Rating[]
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
    name: string
    values: string[]
}

export type Attribute = {
    sku: string
    attributeValues: Map<string, string>
    price: string
    stock: string
}

export type QueryProduct = {
    page: number
    pageSize: number
    name?: string
    category?: string
    brand?: string
    isHidden?: boolean
}