'use client'
import React, { useState, useEffect, ChangeEvent, FormEvent, useMemo } from 'react'
import LoadingShimmer from '@/app/components/LoadingShimmer'
import { Box, Button, Container, Grid, IconButton, MenuItem, Stack, TextField, Tooltip, Typography } from '@mui/material'
import { fCurrencyVND } from '@/utils/formatNumber'
import CartVoucherPicker from '@/sections/cart/CartVoucherPicker'
import useCart from '@/hooks/api/useCart'
import EmptyContent from '@/components/empty-content'
import CartProductItem from '@/sections/cart/CartProductItem'
import Iconify from '@/components/iconify'

export default function CartPage() {
    const { getCartItems, deleteCartItem, updateCartItem } = useCart()
    const { data: response, isLoading, isError, error } = getCartItems()
    const deleteMutate = deleteCartItem()
    const updateMutate = updateCartItem()
    const totalPrice = useMemo(() => {
        if (!response || !response.data) return 0
        return response.data.reduce((total, item) => {
            return total + (item.quantity * item.variation.price)
        }, 0)
    }, [response?.data])

    const handleDecreaseQuantity = (id: string) => {

    }

    const handleIncreaseQuantity = (id: string) => {

    }

    const handleRemoveItem = async (id: string) => {
        deleteMutate.mutate({ id })
    }

    const handleRemoveManyItems = async (id: string[]) => {
        deleteMutate.mutate({ id })
    }

    const handlePlaceOrder = async (e: FormEvent<HTMLFormElement>) => {
    }

    const selectCity = async (e: ChangeEvent<HTMLInputElement>) => {
    }

    const selectDistrict = async (e: ChangeEvent<HTMLInputElement>) => {
    }

    return (
        <Container maxWidth='xl' sx={{ my: 3 }}>
            <Grid container spacing={3}>
                <Grid size={{ xs: 12 }}>
                    <Grid container sx={{ boxShadow: (theme) => theme.customShadows.card, p: 2, mb: 2 }}>
                        <Stack gap={2} direction={'row'} alignItems={'center'}>
                            <Tooltip title='Xóa'>
                                <IconButton color='default' size='medium' onClick={() => handleRemoveManyItems([])}>
                                    <Iconify icon='eva:trash-outline' color='red' />
                                </IconButton>
                            </Tooltip>
                            <Typography variant='h6'>{response?.data.length || 0} sản phẩm</Typography>
                        </Stack>
                    </Grid>
                    {isLoading ? (
                        <LoadingShimmer />
                    ) : response?.data.length ? (
                        response.data.map(item => (
                            <CartProductItem
                                key={item._id}
                                item={item}
                                handleDecreaseQuantity={handleDecreaseQuantity}
                                handleIncreaseQuantity={handleIncreaseQuantity}
                                handleRemoveItem={handleRemoveItem}
                            />
                        ))
                    ) : (
                        <EmptyContent
                            title='Giỏ hàng trống'
                            description='Giỏ hàng của bạn hiện đang trống, mua sắm ngay'
                        />
                    )}
                </Grid>
                {/* <Grid size={{ xs: 12, lg: 3 }}>
                    <Box sx={{ p: 2, boxShadow: (theme) => theme.customShadows.card }}>
                        <form onSubmit={handlePlaceOrder}>
                            <CartVoucherPicker />
                            <TextField
                                defaultValue=''
                                name='province'
                                label='Tỉnh/Thành'
                                select
                                fullWidth
                                onChange={selectCity}
                                slotProps={{
                                    select: {
                                        MenuProps: {
                                            PaperProps: {
                                                sx: {
                                                    px: 1,
                                                    '& .MuiMenuItem-root': {
                                                        px: 1,
                                                        borderRadius: 0.75,
                                                        typography: 'body2',
                                                        textTransform: 'capitalize',
                                                    },
                                                },
                                            },
                                        },
                                        sx: { textTransform: 'capitalize', mb: 2 },
                                    }
                                }}
                            >
                                <MenuItem hidden value=''>Chọn tỉnh/thành</MenuItem>
                                {provinces.map((province) => (
                                    <MenuItem key={province.id} value={`${province.id}-${province._id}`}>
                                        {province.name}
                                    </MenuItem>
                                ))}
                            </TextField>
                            <TextField
                                defaultValue=''
                                name='district'
                                label='Quận/Huyện'
                                select
                                fullWidth
                                onChange={selectDistrict}
                                slotProps={{
                                    select: {
                                        MenuProps: {
                                            PaperProps: {
                                                sx: {
                                                    px: 1,
                                                    '& .MuiMenuItem-root': {
                                                        px: 1,
                                                        borderRadius: 0.75,
                                                        typography: 'body2',
                                                        textTransform: 'capitalize',
                                                    },
                                                },
                                            },
                                        },
                                        sx: { textTransform: 'capitalize', mb: 2 },
                                    }
                                }}
                            >
                                <MenuItem hidden value=''>Chọn quận/huyện</MenuItem>
                                {districts.map((district) => (
                                    <MenuItem key={district.id} value={`${district.id}-${district._id}`}>
                                        {district.name}
                                    </MenuItem>
                                ))}
                            </TextField>
                            <TextField
                                defaultValue=''
                                name='ward'
                                label='Phường/Xã'
                                select
                                fullWidth
                                slotProps={{
                                    select: {
                                        MenuProps: {
                                            PaperProps: {
                                                sx: {
                                                    px: 1,
                                                    '& .MuiMenuItem-root': {
                                                        px: 1,
                                                        borderRadius: 0.75,
                                                        typography: 'body2',
                                                        textTransform: 'capitalize',
                                                    },
                                                },
                                            },
                                        },
                                        sx: { textTransform: 'capitalize', mb: 2 },
                                    }
                                }}
                            >
                                <MenuItem hidden value=''>Chọn phường/xã</MenuItem>
                                {wards.map((ward) => (
                                    <MenuItem key={ward.id} value={`${ward.id}-${ward._id}`}>
                                        {ward.name}
                                    </MenuItem>
                                ))}
                            </TextField>
                            <TextField fullWidth name='street' label='Số đường' variant='outlined' sx={{ mb: 2 }} />
                            <Stack justifyContent='space-between' direction='row' alignItems='center' mb={2}>
                                <Typography variant='body1'>Tạm tính</Typography>
                                <Typography variant='subtitle1' color='secondary'>{fCurrencyVND(calculateTotal())}</Typography>
                            </Stack>
                            <Stack justifyContent='space-between' direction='row' alignItems='center' mb={2}>
                                <Typography variant='body1'>Phí vận chuyển</Typography>
                                <Typography variant='subtitle1' color='secondary'>{fCurrencyVND(0)}</Typography>
                            </Stack>
                            {
                                (cart?.cart?.discountedPrice! > 0 && cart?.cart?.items.length > 0) && (
                                    <Stack justifyContent='space-between' direction='row' alignItems='center' mb={2}>
                                        <Typography variant='body1'>Voucher giảm giá</Typography>
                                        <Typography variant='subtitle1' color='secondary'>-{fCurrencyVND(calculateTotal() - (cart?.cart?.items?.length! > 0 ? cart?.cart?.discountedPrice! : 0))}</Typography>
                                    </Stack>
                                )
                            }
                            <Stack justifyContent='space-between' direction='row' alignItems='center' mb={2}>
                                <Typography variant='body1'>Tổng cộng</Typography>
                                <Typography variant='subtitle1' color='secondary'>{fCurrencyVND(cart?.cart?.items?.length! && cart?.cart?.discountedPrice! > 0 ? cart?.cart?.discountedPrice! : calculateTotal())}</Typography>
                            </Stack>
                            <Button type='submit' fullWidth variant='contained' color='secondary'>
                                Đặt hàng
                            </Button>
                        </form>
                    </Box>
                </Grid> */}
            </Grid>
        </Container>
    )
}