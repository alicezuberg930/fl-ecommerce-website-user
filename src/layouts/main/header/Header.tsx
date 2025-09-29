'use client'
import React, { useState } from 'react'
import NextLink from 'next/link'
import CatalogMenuList from '../../../app/components/CatalogMenuList'
import { usePathname } from 'next/navigation'
import { AppBar, Box, Link, Container, Divider, Stack, Toolbar, Typography, Grid, IconButton } from '@mui/material'
import { useTheme } from '@mui/material/styles'
import { useAuthContext } from '@/auth/useAuthContext'
import Image from '@/components/image'
import Iconify from '@/components/iconify'
import AccountPopover from '@/layouts/main/header/AccountPopover'
import { useRouter } from 'next/navigation'
import useResponsive from '@/hooks/useResponsive'
import SearchBox from '@/layouts/main/header/SearchBox'
import MobileMenu from '@/layouts/main/header/MobileMenu'

const menu = [
  {
    title: 'Danh Mục',
    path: '/brand',
  },
  {
    title: 'Thương hiệu',
    path: '/category',
  },
  {
    title: 'Flash sale',
    path: '/',
  },
  {
    title: 'Bán chạy',
    path: '/',
  },
  {
    title: 'Sản phẩm mới',
    path: '/',
  },
  {
    title: 'Hỗ trợ Khách Hàng',
    path: '/support',
  }
]

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState<boolean>(false)
  const pathName = usePathname()
  const [isHovered, setIsHovered] = useState(false)
  const { user } = useAuthContext()
  const theme = useTheme()
  const router = useRouter()
  const isDesktop = useResponsive('up', 'md');

  return (
    <AppBar color="secondary" sx={{ position: 'sticky', top: 0 }}>
      {/* <Toolbar
        disableGutters
        sx={{
          transition: theme.transitions.create(['height', 'background-color'], {
            easing: theme.transitions.easing.easeInOut,
            duration: theme.transitions.duration.shorter,
          }),
        }}
      > */}
      <Box sx={{
        paddingX: 2,
        maxWidth: 1700,
        margin: 'auto',
        width: '100%'
      }}>
        {/* Header cho desktop */}
        {isDesktop && (
          <Stack spacing={3} py={2}
            justifyContent='space-around'
            direction='row'
            alignItems='center'
            position='relative'
            flexWrap='wrap'
          >
            <Link href='/' component={NextLink}>
              <Image src='/assets/logo.png' alt='logo' sx={{ height: 80 }} />
            </Link>
            <Box position='relative' flexGrow={1}>
              <SearchBox />
            </Box>
            <Stack direction='row' alignItems='center' spacing={2}>
              {user ? (
                <AccountPopover />
              ) : (
                <>
                  <Link component={NextLink} hidden={pathName!.includes("/login") ? true : false} href='/login' underline="none" color='inherit'>Đăng nhập</Link>
                  <Link component={NextLink} hidden={pathName!.includes("/signup") ? true : false} href='/signup' underline="none" color='inherit'>Đăng ký</Link>
                </>
              )}
              <IconButton
                color='inherit'
                onClick={() => router.push('/cart')}
                hidden={pathName!.includes("/login") || pathName!.includes("/signup")}
              >
                <Iconify icon='eva:shopping-cart-outline' width={36} height={36} />
              </IconButton>
            </Stack>
          </Stack>
        )}
        {/* Header cho mobile */}
        {!isDesktop && (
          <Grid spacing={3} py={2}
            justifyContent='center'
            alignItems='center'
            position='relative'
            container
          >
            <Grid size={6}>
              <Link href='/' component={NextLink}>
                <Image src='/assets/logo.png' alt='logo' sx={{ width: 120 }} />
              </Link>
            </Grid>

            <Grid size={6}>
              <Box textAlign="right">
                <IconButton
                  color='inherit'
                  onClick={() => setIsMobileMenuOpen(prev => !prev)}
                  hidden={pathName!.includes("/login") || pathName!.includes("/signup")}
                >
                  <Iconify icon='eva:menu-outline' width={36} height={36} />
                </IconButton>
              </Box>
            </Grid>
            <Grid size={12}>
              <Box position='relative'>
                <SearchBox />
              </Box>
            </Grid>
          </Grid>
        )}
      </Box>
      <Divider />
      {/* Menu cho desktop */}
      {isDesktop && (
        <Container maxWidth='xl'
          sx={{ position: 'relative' }}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <Stack direction='row' py={2} spacing={5} textTransform='uppercase'>
            {
              menu.map((item, i) => {
                return (
                  <Link key={i} href={item.path} component={NextLink} underline="none" color="inherit">
                    <Typography variant='body1'>{item.title}</Typography>
                  </Link>
                )
              })
            }
          </Stack>
          <CatalogMenuList isHovered={isHovered} />
        </Container>
      )}
      {/* Menu cho mobile */}
      <MobileMenu isMobileMenuOpen={isMobileMenuOpen} setIsMobileMenuOpen={setIsMobileMenuOpen} menu={menu} />
      {/* </Toolbar> */}
    </AppBar>
  )
}