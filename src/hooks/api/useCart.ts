import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { useCallback } from 'react'
import { useSnackbar } from '@/components/snackbar'
import { API_ENDPOINT } from '@/routes/api'
import {
    fetchCartItems,
    addCartItem as addCartItemAPI,
    deleteCartItem as deleteCartItemAPI,
    updateCartItem as updateCartItemAPI
} from '@/utils/httpClient'
import { ICartAdd } from '@/@types/cart'

export default function useCart() {
    const { enqueueSnackbar } = useSnackbar()
    const queryClient = useQueryClient()

    const getCartItems = useCallback(() => {
        return useQuery({
            queryKey: [API_ENDPOINT.cart],
            queryFn: () => fetchCartItems(),
            placeholderData: (previousData, _) => previousData,
        })
    }, [])

    const addCartItem = useCallback(() => {
        return useMutation({
            mutationFn: ({ cart }: { cart: ICartAdd }) => addCartItemAPI({ cart }),
            onSuccess(data) {
                enqueueSnackbar(data.message)
                queryClient.invalidateQueries({ queryKey: [API_ENDPOINT.cart] })
            },
            onError(error) {
                enqueueSnackbar(error instanceof Error ? error.message : 'Internal Server Error', { variant: 'error' })
            },
        })
    }, [])

    const deleteCartItem = useCallback(() => {
        return useMutation({
            mutationFn: ({ id }: { id: string | string[] }) => deleteCartItemAPI({ id }),
            onSuccess(data) {
                enqueueSnackbar(data.message)
                queryClient.invalidateQueries({ queryKey: [API_ENDPOINT.cart] })
            },
            onError(error) {
                enqueueSnackbar(error instanceof Error ? error.message : 'Internal Server Error', { variant: 'error' })
            },
        })
    }, [])

    const updateCartItem = useCallback(() => {
        return useMutation({
            mutationFn: ({ id, cart }: { id: string, cart: ICartAdd }) => updateCartItemAPI({ id, cart }),
            onSuccess(data) {
                enqueueSnackbar(data.message)
                queryClient.invalidateQueries({ queryKey: [API_ENDPOINT.cart] })
            },
            onError(error) {
                enqueueSnackbar(error instanceof Error ? error.message : 'Internal Server Error', { variant: 'error' })
            },
        })
    }, [])

    return {
        getCartItems,
        addCartItem,
        deleteCartItem,
        updateCartItem
    }
}