import { IProduct } from "./product"
import { IUser } from "./user"

export type IRating = {
    _id: string
    content: string
    star: number
    images: string[]
    user: Partial<IUser>
    product: Partial<IProduct>
    createdAt: string
    updatedAt: string
}

export type QueryRating = {
    page: number
    pageSize: number
    product?: string
}