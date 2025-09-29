import { IProduct, IProductDetails, QueryProduct } from "@/@types/product"
import { APIResponse } from "@/@types/response"
import { axiosInstance } from "./axios"
import { API_ENDPOINT } from "@/routes/api"
import { handleErrorResponse } from "./common"
import { IBrand } from "@/@types/brand"
import { ICategory } from "@/@types/category"

export const fetchProducts = async ({ query }: { query: QueryProduct }): Promise<APIResponse<IProduct[]> | undefined> => {
    try {
        const response = await axiosInstance<APIResponse<IProduct[]>>({
            url: API_ENDPOINT.product,
            method: 'GET',
            params: query
        })
        return response.data
    } catch (error) {
        handleErrorResponse(error)
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