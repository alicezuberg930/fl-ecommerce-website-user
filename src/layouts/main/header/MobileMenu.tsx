import { Box, Link, Stack, Typography } from "@mui/material"
import React, { Dispatch, SetStateAction } from "react"
import NextLink from 'next/link'
import Image from "@/components/image"
import { useAuthContext } from "@/auth/useAuthContext"
import { PATH_AUTH } from "@/routes/paths"

type Props = { isMobileMenuOpen: boolean, setIsMobileMenuOpen: Dispatch<SetStateAction<boolean>>, menu: { path: string, title: string }[] }

const aboutUsItem = [
    {
        title: 'Liên hệ',
        path: '/contact',
    },
    {
        title: 'Giới thiệu',
        path: '/introduction'
    },
]

export default function MobileMenu({ isMobileMenuOpen, setIsMobileMenuOpen, menu }: Props) {
    const { user, logout } = useAuthContext()
    const userItem = [
        {
            isShown: user ? true : false,
            title: 'Giỏ hàng',
            path: '/cart'
        },
        {
            isShown: !user ? true : false,
            title: 'Đăng nhập',
            path: PATH_AUTH.login
        },
        {
            isShown: !user ? true : false,
            title: 'Đăng ký',
            path: PATH_AUTH.register
        },
        {
            isShown: user ? true : false,
            title: user ? user.name : '',
            path: '/user/profile'
        },
        {
            isShown: user ? true : false,
            title: 'Đơn hàng',
            path: '/user/orders'
        }
    ]

    return (
        <>
            {isMobileMenuOpen && (
                <Box
                    onClick={() => setIsMobileMenuOpen(false)}
                    sx={{
                        position: 'fixed',
                        top: 0,
                        left: 0,
                        width: '100vw',
                        height: '100vh',
                        backgroundColor: 'rgba(0,0,0,0.5)',
                        transition: 'right 0.3s ease-in-out',
                        zIndex: 998,
                    }}
                />
            )}
            <Box sx={{
                position: 'fixed',
                top: 0,
                right: `${isMobileMenuOpen ? '0' : '-100%'}`,
                height: '100vh',
                width: '250px',
                backgroundColor: 'white',
                zIndex: 999,
                p: 1,
                transition: 'right 0.3s ease-in-out',
            }}>
                <Link href='/' component={NextLink}>
                    <Image src='/assets/logo-footer.png' alt='logo' sx={{ width: 120 }} />
                </Link>
                <Stack>
                    <Typography variant='h5' py={1} color='secondary'>Menu</Typography>
                    {
                        menu.map((item, i) => {
                            return (
                                <Box key={i} py={1} onClick={() => setIsMobileMenuOpen(false)}>
                                    <Link href={item.path} component={NextLink} underline="none" color='textSecondary'>
                                        {item.title}
                                    </Link>
                                </Box>
                            )
                        })
                    }
                    <Typography variant='h5' py={1} color='secondary'>Về chúng tôi</Typography>
                    {
                        aboutUsItem.map((item, i) => {
                            return (
                                <Box key={i} py={1} onClick={() => setIsMobileMenuOpen(false)}>
                                    <Link href={item.path} component={NextLink} underline="none" color='textSecondary'>
                                        {item.title}
                                    </Link>
                                </Box>
                            )
                        })
                    }
                    <Typography variant='h5' py={1} color='secondary'>Người dùng</Typography>
                    {
                        userItem.map((item, i) => {
                            return (
                                <Box key={i} py={1} onClick={() => setIsMobileMenuOpen(false)} hidden={!item.isShown}>
                                    <Link href={item.path} component={NextLink} underline="none" color='textSecondary'>
                                        {item.title}
                                    </Link>
                                </Box>
                            )
                        })
                    }
                    {/* {user && (
                        <Box py={1} onClick={() => { setIsMobileMenuOpen(false); logout() }}>
                            <Link href='#' component={NextLink} underline="none" color='textSecondary'>
                                Đăng xuất
                            </Link>
                        </Box>
                    )} */}
                </Stack>
            </Box>
        </>
    )
}