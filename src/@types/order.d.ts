interface Order {
    totalPrice?: number,
    discountedPrice?: number,
    _id?: string,
    refCode?: string,
    items?: {
        productId?: Product,
        name?: string,
        options?: {
            price?: number,
            attribute?: {
                Option_id?: string,
                value_id?: string
            }
            quantity?: number,
            id?: string,
            value?: {
                id?: string,
                price?: number,
                quantity?: number
            }[]
        }[]
    }[],
    totalPrice?: number,
    orderCode?: string,
    discountedPrice?: number,
    userId?: User,
    status?: string,
    isNotified?: boolean,
    address?: {
        street?: string,
        districts?: { name?: string },
        province?: { name?: string },
        wards?: { name?: string }
    }
}