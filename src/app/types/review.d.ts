interface Review {
    createdAt?: string
    _id?: string,
    productId?: string,
    userId?: {
        _id: string,
        name?: string
    },
    rating?: number,
    comment?: string,
    images?: string[],
    replies?: {
        userId?: string,
        comment?: string
        _id?: string,
        createdAt?: string
    }[],
    likes?: string[]
}