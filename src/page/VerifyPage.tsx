'use client'
import { verifyUser as verifyUserAPI } from "@/utils/httpClient"
import { Container, Link, Typography } from "@mui/material"
import { useSearchParams } from "next/navigation"
import { useEffect, useState } from "react"
import NextLink from "next/link"

export default function VerifyPage() {
    const searchParams = useSearchParams()
    const codeId = searchParams.get('codeId')
    const userId = searchParams.get('userId')
    const [status, setStatus] = useState<string>("")

    useEffect(() => {
        const verifyUser = async () => {
            if (codeId && userId) {
                const response = await verifyUserAPI({ codeId, userId })
                setStatus(response.message || "Internal server error")
            }
        }
        verifyUser()
    }, [codeId, userId])

    return (
        <Container maxWidth='sm' sx={{ alignContent: 'center', height: '80vh' }}>
            <Typography variant='h4' textAlign={'center'} fontWeight={700}>{status}</Typography>
            <Typography variant='h5' color='primary' textAlign={'center'}>Về <Link component={NextLink} href='/'>trang chủ</Link></Typography>
        </Container>
    )
}