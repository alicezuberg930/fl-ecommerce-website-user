import { IProduct, Variation } from "./product"
import { IUser } from "./user"

export type ICartAdd = {
    product: string
    variation: Variation
    quantity: number
}

export type ICartItem = {
    _id: string
    product: Partial<IProduct>
    variation: Variation
    user: Partial<IUser>
    quantity: number
}