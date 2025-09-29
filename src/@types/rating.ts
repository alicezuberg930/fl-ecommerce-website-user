import { IProduct } from "./product"

export type Rating = {
    _id: string
    content: string
    star: number
    images: string[]
    user: Partial<User>
    product: Partial<IProduct>
}