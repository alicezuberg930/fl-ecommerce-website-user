import { IProduct, IProductDetails, QueryProduct } from '@/@types/product'
import { APIResponse } from '@/@types/response'
import { axiosInstance } from './axios'
import { API_ENDPOINT } from '@/routes/api'
import { handleErrorResponse } from './common'
import { IBrand } from '@/@types/brand'
import { ICategory } from '@/@types/category'
import { IRating, QueryRating } from '@/@types/rating'
import { ICartAdd, ICartItem } from '@/@types/cart'
import { IUser, IUserCreate } from '@/@types/user'

export const register = async ({ user }: { user: IUserCreate }): Promise<APIResponse<IUser>> => {
    try {
        const response = await axiosInstance<APIResponse<IUser>>({
            url: API_ENDPOINT.auth.register,
            method: 'POST',
            data: user
        })
        return response?.data
    } catch (error) {
        handleErrorResponse(error)
        throw error
    }
}

export const fetchProducts = async ({ query }: { query: QueryProduct }): Promise<APIResponse<IProduct[]>> => {
    try {
        const response = await axiosInstance<APIResponse<IProduct[]>>({
            url: API_ENDPOINT.product,
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
            url: `${API_ENDPOINT.product}/${id}`,
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
            url: API_ENDPOINT.brand,
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
            url: API_ENDPOINT.category,
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
            url: API_ENDPOINT.rating,
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
            url: API_ENDPOINT.cart,
            method: 'GET'
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
            url: API_ENDPOINT.cart,
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
            url: API_ENDPOINT.cart,
            method: 'DELETE',
            data: { id }
        })
        return response.data
    } catch (error) {
        handleErrorResponse(error)
        throw error
    }
}

export const updateCartItem = async ({ id, cart }: { id: string, cart: ICartAdd }): Promise<APIResponse<ICartItem>> => {
    try {
        const response = await axiosInstance<APIResponse<ICartItem>>({
            url: `${API_ENDPOINT.cart}/${id}`,
            method: 'PATCH',
            data: cart
        })
        return response.data
    } catch (error) {
        handleErrorResponse(error)
        throw error
    }
}