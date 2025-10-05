import { useMutation, useQueryClient } from "@tanstack/react-query"
import { useCallback } from "react"
import { useSnackbar } from '@/components/snackbar';
import { PATH_API } from "@/routes/paths";
import { createOrder as createOrderAPI } from "@/utils/httpClient";
import { IOrderNew } from "@/@types/order";

export default function useOrder() {
    const { enqueueSnackbar } = useSnackbar()
    const queryClient = useQueryClient()

    const createOrder = useCallback(() => {
        return useMutation({
            mutationFn: ({ order }: { order: IOrderNew }) => createOrderAPI({ order }),
            onSuccess(data) {
                enqueueSnackbar(data.message)
                queryClient.invalidateQueries({ queryKey: [PATH_API.order.list] })
            },
            onError(error) {
                enqueueSnackbar(error instanceof Error ? error.message : 'Internal Server Error', { variant: 'error' })
            },
        })
    }, [])

    return {
        createOrder
    }
}