'use client'
import { verifyUser as verifyUserAPI } from "@/utils/httpClient"
import { Button, Container, Link, Typography } from "@mui/material"
import { useSearchParams } from "next/navigation"
import { useEffect, useState } from "react"
import NextLink from "next/link"
import { APIResponse } from "@/@types/response"
import { axiosInstance } from "@/utils/axios"
import { PATH_API } from "@/routes/paths"
import { useSnackbar } from "notistack"

export default function VerifyPage() {
    const searchParams = useSearchParams()
    const codeId = searchParams.get('codeId')
    const userId = searchParams.get('userId')
    const [status, setStatus] = useState<APIResponse<undefined>>()
    const { enqueueSnackbar } = useSnackbar()
    useEffect(() => {
        const verifyUser = async () => {
            if (codeId && userId) {
                const response = await verifyUserAPI({ codeId, userId })
                setStatus(response || "Internal server error")
            }
        }
        verifyUser()
    }, [codeId, userId])

    const resendVerificationCode = async () => {
        const a = await axiosInstance(PATH_API.auth.resend, { method: "POST", data: { userId } })
        if (a.status == 400) {
            enqueueSnackbar(a.data.message, { variant: 'error' })
        } else {
            enqueueSnackbar(a.data.message)
        }
    }

    return (
        <Container maxWidth='sm' sx={{ alignContent: 'center', height: '80vh' }}>
            <Typography variant='h4' textAlign={'center'} fontWeight={700}>{status?.message}</Typography>
            <Typography variant='h5' color='primary' textAlign={'center'}>Về <Link component={NextLink} href='/'>trang chủ</Link></Typography>
            {status?.statusCode == 400 && (
                <Button onClick={() => resendVerificationCode()}>Resend Verification Code</Button>
            )}
        </Container>
    )
}