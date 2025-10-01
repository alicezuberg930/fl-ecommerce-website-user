import { IProduct } from "./product"

export type IRating = {
    _id: string
    content: string
    star: number
    images: string[]
    user: Partial<User>
    product: Partial<IProduct>
    createdAt: string
    updatedAt: string
}

export type QueryRating = {
    page: number
    pageSize: number
    product?: string
}