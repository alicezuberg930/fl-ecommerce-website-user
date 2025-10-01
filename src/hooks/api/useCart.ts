// import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
// import { useCallback } from "react"
// import { useSnackbar } from '@/components/snackbar';
// import { API_ENDPOINT } from "@/routes/api";

// export default function useCart() {
//     const { enqueueSnackbar } = useSnackbar()
//     const queryClient = useQueryClient()

//     const getCartList = useCallback(() => {
//         return useQuery({
//             queryKey: [API_ENDPOINT.CartList],
//             queryFn: () => getCartListAPI(),
//             placeholderData: (previousData, _) => previousData,
//         })
//     }, []);

//     const addCart = useCallback(() => {
//         return useMutation({
//             mutationFn: ({ cart }: { cart: any }) => addCartAPI({ cart }),
//             onSuccess(_) {
//                 enqueueSnackbar("Thêm vào giỏ hàng thành công", { variant: 'success' })
//                 queryClient.invalidateQueries({ queryKey: [API_ENDPOINT.CartList] })
//             },
//             onError(_) {
//                 enqueueSnackbar("Đã có lỗi xảy ra", { variant: 'error' })
//             },
//         })
//     }, [])

//     const removeCart = useCallback(() => {
//         return useMutation({
//             mutationFn: ({ id }: { id: string }) => removeCartAPI({ id }),
//             onSuccess(_) {
//                 enqueueSnackbar("Đã xóa sản phẩm khỏi giỏ hàng", { variant: 'success' })
//                 queryClient.invalidateQueries({ queryKey: [API_ENDPOINT.CartList] })
//             },
//             onError(_) {
//                 enqueueSnackbar("Đã có lỗi xảy ra", { variant: 'error' })
//             },
//         })
//     }, [])

//     return {
//         getCartList,
//         addCart,
//         removeCart
//     }
// }