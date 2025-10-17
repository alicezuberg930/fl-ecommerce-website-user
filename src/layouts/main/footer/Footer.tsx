'use client'
import NextLink from 'next/link'
import React from 'react'
import { Box, Container, Grid, Link, Stack, Typography } from '@mui/material'
import { useTheme } from "@mui/material/styles"
import Image from '@/components/image'

const Footer: React.FC = () => {
  const footerData = {
    footerNavList: [
      {
        title: 'Tìm chúng tôi tại',
        items: [
          { title: 'Tiktok', path: 'https://www.tiktok.com/@futurelife_official?lang=vi-VN' },
          { title: 'Facebook', path: 'https://www.facebook.com/futurelifevietnam' },
          { title: 'Shopee', path: 'https://shopee.vn/futurelife.ecom' },
        ]
      },
      {
        title: 'Về chúng tôi',
        items: [
          { title: 'Giới thiệu', path: '/introduction' },
          { title: 'Liên hệ', path: '/contact' },
          // { title: 'futurelife@gmail.com', path: '/' },
          // { title: '0888800100', path: 'tel:0888800100' },
        ]
      },
      {
        title: 'Chính Sách & Điều Khoản',
        items: [
          { title: 'Hướng Dẫn Mua Hàng', path: '/policy/guide' },
          { title: 'Thông Tin Thanh Toán', path: '/policy/payment' },
          { title: 'Chính Sách Vận Chuyển', path: '/policy/shipping' },
          { title: 'Quy Định Đổi - Trả Hàng', path: '/policy/return' },
          { title: 'Bảo Mật Thông Tin', path: '/policy/privacy' },
        ]
      },
      {
        title: 'Thông tin pháp lý',
        items: [
          { title: 'Quyền riêng tư', path: '/' },
          { title: 'Điều khoản và điều kiện', path: '/' },
          { title: 'Điều khoản sử dụng', path: '/' },
        ]
      },
      {
        title: 'Chăm sóc khách hàng',
        items: [
          { title: 'Hỗ trợ khách hàng', path: '/support' },
          { title: 'Liên hệ với chúng tôi', path: '/contact' },
        ]
      },
    ],
  }
  const theme = useTheme()

  return (
    <Box sx={{
      boxShadow: theme.customShadows.primary,
      bgcolor: theme.palette.background.paper,
    }}>
      <Container maxWidth='xl'>
        <Stack direction={{ sm: 'column', md: 'row' }} spacing={4} py={6}>
          <Box width={{ sm: '100%', lg: '40%' }}>
            <Link href='/' component={NextLink}>
              <Image src='/assets/logo.png' alt='logo' sx={{ width: 160, mb: 2 }} />
            </Link>
            <Typography variant='body1'>
              Chào mừng bạn đến với Future Life, một công ty tiên phong trong lĩnh vực cung cấp các giải pháp gia dụng và chăm sóc sức khỏe toàn diện. Chúng tôi tự hào mang đến những sản phẩm chất lượng cao, an toàn và thân thiện với người tiêu dùng, góp phần nâng cao chất lượng cuộc sống cho mọi gia đình Việt. Future Life không chỉ là một công ty kinh doanh, mà còn là một người bạn đồng hành tin cậy của mọi gia đình. Chúng tôi cung cấp đa dạng các sản phẩm và dịch vụ, từ đồ điện gia dụng thông minh đến các sản phẩm chăm sóc sức khỏe toàn diện, đáp ứng mọi nhu cầu của khách hàng.
            </Typography>
          </Box>
          <Grid container spacing={3} width={{ sm: '100%', lg: '60%' }}>
            {
              footerData.footerNavList.map((v, i) => {
                return (
                  <Grid key={i} size={{ xs: 12, sm: 6, lg: 4 }} textAlign='center'>
                    <Typography variant='h6' sx={{ mb: 1, textTransform: 'uppercase' }}>{v.title}</Typography>
                    <Stack>
                      {
                        v.items.map((link, i) => (
                          <Link key={i} href={link.path} component={NextLink} underline="none" color='inherit' py={1}>
                            {link.title}
                          </Link>
                        ))
                      }
                    </Stack>
                  </Grid>
                )
              })
            }
            <Grid size={{ xs: 12, sm: 6, lg: 4 }} textAlign='center'>
              <Stack>
                <Typography variant='h6' sx={{ mb: 1, textTransform: 'uppercase' }}>Được chứng nhận</Typography>
                <Link href='http://online.gov.vn/Home' component={NextLink}>
                  <Image src='/assets/onlinegov.png' alt='logo' sx={{ width: 140, mx: 'auto' }} />
                </Link>
              </Stack>
            </Grid>
          </Grid>
        </Stack>
      </Container>
    </Box >
  )
}

export default Footer