import { instance, axiosInstance } from "@/utils/axios"
import { API } from "@/utils/api"

export const signUpAPI = async ({ data }: { data: any }) => {
    const response = await instance<any>({ url: API.SignUp, method: "POST", data: data })
    return response.data
}

// Voucher
export const getVoucherListAPI = async () => {
    const response = await instance<any>({ url: API.VoucherList, method: "GET", params: { page: 1, limit: 999999 } })
    return response.data
}

export const applyVoucherAPI = async ({ voucherCode }: { voucherCode: string }) => {
    const response = instance<any>({ url: API.ApplyVoucher, method: "POST", data: { voucherCode } })
    return (await response).data
}

// Cart
export const getCartListAPI = async () => {
    const response = await instance<any>({ url: API.CartList, method: "GET" })
    return response.data
}

export const addCartAPI = async ({ cart }: { cart: any }) => {
    const response = await instance<any>({ url: API.AddCart, method: "POST", data: cart })
    return response.data
}

export const removeCartAPI = async ({ id }: { id: string }) => {
    const response = await instance<any>({ url: API.RemoveCart(id), method: "DELETE" })
    return response.data
}

// Order
export const placeOrderAPI = async ({ order }: { order: any }) => {
    const response = await instance<any>({ url: API.PlaceOrder, method: "POST", data: order })
    return response.data
}