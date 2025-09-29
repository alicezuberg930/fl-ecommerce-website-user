import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { useCallback } from "react"
import { signUpAPI } from "@/app/services/api.service"
import { useSnackbar } from '@/components/snackbar';
import { useRouter } from "next/navigation";
// import { API } from "@/utils/api";

export default function useAuth() {
    const { enqueueSnackbar } = useSnackbar()
    // const queryClient = useQueryClient()
    const navigate = useRouter()

    const signUp = useCallback(() => {
        return useMutation({
            mutationFn: ({ data }: { data: any }) => signUpAPI({ data }),
            onSuccess(_) {
                enqueueSnackbar("Tài khoản đăng ký thành công", { variant: 'success' })
                navigate.push('/login')
            },
            onError(_) {
                enqueueSnackbar("Đã có lỗi xảy ra", { variant: 'error' })
            },
        })
    }, [])

    return {
        signUp
    }
}