import { axiosInstance } from './axios'
import { PATH_API } from '@/routes/paths'
import { handleErrorResponse } from './common'
// types
import { APIResponse } from '@/@types/response'
import { ICheckoutBillingAddress, ICheckoutBillingAddressItem, IProduct, IProductDetails, IProductFilter } from '@/@types/product'
import { IBrand } from '@/@types/brand'
import { ICategory } from '@/@types/category'
import { IRating, QueryRating } from '@/@types/rating'
import { ICartAdd, ICartItem } from '@/@types/cart'
import { IDistrict, IProvince, IWard } from '@/@types/address'
import { IOrder, IOrderNew, PaymentMethod } from '@/@types/order'

const customFetch = (url: string, init: RequestInit) => {
    return fetch(`${process.env.BASE_API}${url.startsWith('/') ? url : url.padStart(url.length + 1, '/')}`, {
        headers: { 'Content-Type': 'application/json' },
        ...init
    })
}

export const fetchProvinces = async (): Promise<APIResponse<IProvince[]>> => {
    try {
        const response = await customFetch(PATH_API.location.province, {
            method: "GET", cache: "force-cache"
        })
        const result = await response.json()
        return result
    } catch (error) {
        handleErrorResponse(error)
        throw error
    }
}

export const fetchDistricts = async ({ id }: { id: string }): Promise<APIResponse<IDistrict[]>> => {
    try {
        const response = await customFetch(PATH_API.location.district(id), {
            method: "GET", cache: "force-cache"
        })
        const result = await response.json()
        return result
    } catch (error) {
        handleErrorResponse(error)
        throw error
    }
}

export const fetchWards = async ({ id }: { id: string }): Promise<APIResponse<IWard[]>> => {
    try {
        const response = await customFetch(PATH_API.location.ward(id), {
            method: "GET", cache: "force-cache"
        })
        const result = await response.json()
        return result
    } catch (error) {
        handleErrorResponse(error)
        throw error
    }
}

export const fetchProducts = async ({ query }: { query: IProductFilter }): Promise<APIResponse<IProduct[]>> => {
    try {
        const response = await axiosInstance<APIResponse<IProduct[]>>({
            url: PATH_API.product,
            method: 'GET',
            params: query
        })
        return response.data
    } catch (error) {
        handleErrorResponse(error)
        throw error
    }
}

export const fetchProductDetails = async ({ id }: { id: string }): Promise<APIResponse<IProductDetails>> => {
    try {
        const response = await axiosInstance<APIResponse<IProductDetails>>({
            url: `${PATH_API.product}/${id}`,
            method: 'GET'
        })
        return response.data
    } catch (error) {
        handleErrorResponse(error)
        throw error
    }
}

export const fetchBrands = async (): Promise<APIResponse<IBrand[]>> => {
    try {
        const response = await axiosInstance<APIResponse<IBrand[]>>({
            url: PATH_API.brand,
            method: 'GET'
        })
        return response.data
    } catch (error) {
        handleErrorResponse(error)
        throw error
    }
}

export const fetchCategories = async (): Promise<APIResponse<ICategory[]>> => {
    try {
        const response = await axiosInstance<APIResponse<ICategory[]>>({
            url: PATH_API.category,
            method: 'GET'
        })
        return response.data
    } catch (error) {
        handleErrorResponse(error)
        throw error
    }
}

export const fetchRatings = async ({ query }: { query: QueryRating }): Promise<APIResponse<IRating[]>> => {
    try {
        const response = await axiosInstance<APIResponse<IRating[]>>({
            url: PATH_API.rating,
            method: 'GET',
            params: query
        })
        return response.data
    } catch (error) {
        handleErrorResponse(error)
        throw error
    }
}

export const fetchCartItems = async (): Promise<APIResponse<ICartItem[]>> => {
    try {
        const response = await axiosInstance<APIResponse<ICartItem[]>>({
            url: PATH_API.cart,
            method: 'GET',
        })
        return response.data
    } catch (error) {
        handleErrorResponse(error)
        throw error
    }
}

export const addCartItem = async ({ cart }: { cart: ICartAdd }): Promise<APIResponse<ICartItem>> => {
    try {
        const response = await axiosInstance<APIResponse<ICartItem>>({
            url: PATH_API.cart,
            method: 'POST',
            data: cart
        })
        return response.data
    } catch (error) {
        handleErrorResponse(error)
        throw error
    }
}

export const deleteCartItem = async ({ id }: { id: string | string[] }): Promise<APIResponse<ICartItem>> => {
    try {
        const response = await axiosInstance<APIResponse<ICartItem>>({
            url: PATH_API.cart,
            method: 'DELETE',
            data: { id }
        })
        return response.data
    } catch (error) {
        handleErrorResponse(error)
        throw error
    }
}

export const updateCartItem = async ({ id, quantity }: { id: string, quantity: number }): Promise<APIResponse<ICartItem>> => {
    try {
        const response = await axiosInstance<APIResponse<ICartItem>>({
            url: `${PATH_API.cart}/${id}`,
            method: 'PATCH',
            data: { quantity }
        })
        return response.data
    } catch (error) {
        handleErrorResponse(error)
        throw error
    }
}

// export const fetchProvinces = async (): Promise<APIResponse<IProvince[]>> => {
//     try {
//         const response = await axiosInstance<APIResponse<IProvince[]>>({
//             url: PATH_API.location.province,
//             method: 'GET'
//         })
//         return response.data
//     } catch (error) {
//         handleErrorResponse(error)
//         throw error
//     }
// }

// export const fetchDistricts = async ({ id }: { id: string }): Promise<APIResponse<IDistrict[]>> => {
//     try {
//         const response = await axiosInstance<APIResponse<IDistrict[]>>({
//             url: PATH_API.location.district(id),
//             method: 'GET'
//         })
//         return response.data
//     } catch (error) {
//         handleErrorResponse(error)
//         throw error
//     }
// }

// export const fetchWards = async ({ id }: { id: string }): Promise<APIResponse<IWard[]>> => {
//     try {
//         const response = await axiosInstance<APIResponse<IWard[]>>({
//             url: PATH_API.location.ward(id),
//             method: 'GET'
//         })
//         return response.data
//     } catch (error) {
//         handleErrorResponse(error)
//         throw error
//     }
// }

export const fetchDeliveryAddresses = async (): Promise<APIResponse<ICheckoutBillingAddressItem[]>> => {
    try {
        const response = await axiosInstance<APIResponse<ICheckoutBillingAddressItem[]>>({
            url: PATH_API.user.address.list,
            method: 'GET'
        })
        return response.data
    } catch (error) {
        handleErrorResponse(error)
        throw error
    }
}

export const createDeliveryAddress = async ({ address }: { address: ICheckoutBillingAddress }): Promise<APIResponse<ICheckoutBillingAddress>> => {
    try {
        const response = await axiosInstance<APIResponse<ICheckoutBillingAddress>>({
            url: PATH_API.user.address.new,
            method: 'POST',
            data: address
        })
        return response.data
    } catch (error) {
        handleErrorResponse(error)
        throw error
    }
}

export const deleteDeliveryAddress = async ({ id }: { id: string }): Promise<APIResponse<undefined>> => {
    try {
        const response = await axiosInstance<APIResponse<undefined>>({
            url: PATH_API.user.address.delete(id),
            method: 'DELETE',
        })
        return response.data
    } catch (error) {
        handleErrorResponse(error)
        throw error
    }
}

export const fetchOrders = async (): Promise<APIResponse<IOrder[]>> => {
    try {
        const response = await axiosInstance<APIResponse<IOrder[]>>({
            url: PATH_API.order.list,
            method: 'GET',
        })
        return response.data
    } catch (error) {
        handleErrorResponse(error)
        throw error
    }
}

export const createOrder = async ({ order }: { order: IOrderNew }): Promise<APIResponse<IOrder>> => {
    try {
        const response = await axiosInstance<APIResponse<IOrder>>({
            url: PATH_API.order.new,
            method: 'POST',
            data: order
        })
        return response.data
    } catch (error) {
        handleErrorResponse(error)
        throw error
    }
}

export const updateOrder = async ({ id, paymentMethod }: { id: string, paymentMethod: PaymentMethod }): Promise<APIResponse<IOrder>> => {
    try {
        const response = await axiosInstance<APIResponse<IOrder>>({
            url: PATH_API.order.edit(id),
            method: 'PATCH',
            data: { paymentMethod }
        })
        return response.data
    } catch (error) {
        handleErrorResponse(error)
        throw error
    }
}

export const verifyUser = async ({ userId, codeId }: { userId: string, codeId: string }): Promise<APIResponse<undefined>> => {
    try {
        const response = await axiosInstance<APIResponse<undefined>>({
            url: PATH_API.auth.verify,
            method: 'POST',
            data: { userId, codeId },
        })
        return response.data
    } catch (error) {
        handleErrorResponse(error)
        throw error
    }
}