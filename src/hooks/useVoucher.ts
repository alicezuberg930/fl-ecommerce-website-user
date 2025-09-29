import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { useCallback } from "react"
import { applyVoucherAPI, getVoucherListAPI } from "@/app/services/api.service"
import { useSnackbar } from '@/components/snackbar';
import { API } from "@/utils/api";

export default function useVoucher() {
    const { enqueueSnackbar } = useSnackbar()
    const queryClient = useQueryClient()

    const getVoucherList = useCallback(() => {
        return useQuery({
            queryKey: [API.VoucherList],
            queryFn: () => getVoucherListAPI(),
            placeholderData: (previousData, _) => previousData,
        })
    }, []);

    const applyVoucher = useCallback(() => {
        return useMutation({
            mutationFn: ({ voucherCode }: { voucherCode: string }) => applyVoucherAPI({ voucherCode }),
            onSuccess(_) {
                enqueueSnackbar("Áp dụng voucher thành công", { variant: 'success' })
                queryClient.invalidateQueries({ queryKey: [API.CartList] })
            },
            onError(_) {
                enqueueSnackbar("Đã có lỗi xảy ra", { variant: 'error' })
            },
        })
    }, [])

    return {
        getVoucherList,
        applyVoucher,
    }
}