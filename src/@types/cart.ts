export type CartItem = {
    productId?: string
    name?: string
    quantity?: number
    price?: number
    total?: string
    options?: {
        id?: string
        value: {
            id?: string
            price?: number
            quantity?: number
        }[]
    }[]
}

export type Cart = {
    _id?: string
    userId?: string
    items?: CartItem[]
    totalPrice?: number
    discountedPrice?: number
    promotions?: {
        code?: string
        discount?: number
    }[]
}