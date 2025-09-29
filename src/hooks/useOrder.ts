import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { useCallback } from "react"
import { placeOrderAPI } from "@/app/services/api.service"
import { useSnackbar } from '@/components/snackbar';
import { API } from "@/utils/api";

export default function useOrder() {
    const { enqueueSnackbar } = useSnackbar()
    const queryClient = useQueryClient()

    const placeOrder = useCallback(() => {
        return useMutation({
            mutationFn: ({ order }: { order: any }) => placeOrderAPI({ order }),
            onSuccess(_) {
                enqueueSnackbar("Đơn hàng được đặt thành công", { variant: 'success' })
                queryClient.invalidateQueries({ queryKey: [API.CartList] })
            },
            onError(_) {
                enqueueSnackbar("Đã có lỗi xảy ra", { variant: 'error' })
            },
        })
    }, [])

    return {
        placeOrder
    }
}