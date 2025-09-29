'use client'
import React, { useState, useEffect, ChangeEvent, FormEvent } from 'react'
import { generateSecureRandomString } from '@/app/common/utils'
import LoadingShimmer from '@/app/components/LoadingShimmer'
import { instance } from '@/utils/axios'
import ENDPOINT from '@/app/common/api'
import { Box, Button, Container, Grid, MenuItem, Stack, TextField, Typography } from '@mui/material'
import { useSettingsContext } from '@/components/settings'
import { fCurrencyVND } from '@/utils/formatNumber'
import CartVoucherPicker from '@/sections/cart/CartVoucherPicker'
import useCart from '@/hooks/useCart'
import { CartItem } from '@/@types/cart'
import useOrder from '@/hooks/useOrder'
import EmptyContent from '@/components/empty-content'
import CartProductItem from '@/sections/cart/CartProductItem'

export default function CartPage() {
    const { getCartList, removeCart } = useCart()
    const { placeOrder } = useOrder()
    const { data: cart, isLoading } = getCartList()
    const removeMutate = removeCart()
    const addMutate = placeOrder()
    const [quantities, setQuantities] = useState<Map<string, number>>(new Map<string, number>())
    const [provinces, setProvinces] = useState<Province[]>([])
    const [districts, setDistricts] = useState<District[]>([])
    const [wards, setWards] = useState<Ward[]>([])
    const { themeStretch } = useSettingsContext()

    useEffect(() => {
        if (cart && cart.cart) {
            let quantityMap = new Map<string, number>()
            for (let i = 0; i < cart!.cart!.items!.length; i++) {
                quantityMap.set(cart!.cart!.items![i].productId!, cart!.cart!.items![i].quantity!)
            }
            setQuantities(quantityMap)
        }
    }, [cart])

    const getProvinces = async () => {
        const response = await instance.get(ENDPOINT.PROVINCES)
        setProvinces(response.data.data)
    }

    useEffect(() => {
        getProvinces()
    }, [])

    const calculateTotal = (): number => {
        if (cart == null || !cart!.cart!.items!.length) return 0
        const validItems = cart!.cart!.items!.filter((item: CartItem) => item.productId)
        return validItems.reduce((total: number, item: any) => {
            const quantity = quantities.get(item.productId) || 1
            return total + (item.price * quantity)
        }, 0)
    }

    const handleDecreaseQuantity = (itemId: string) => {
        if (quantities.get(itemId)! > cart?.cart!.items?.find((item: any) => item.productId === itemId)?.quantity! || 1) {
            setQuantities(prev => {
                const newQuantities = new Map(prev)
                const currentQuantity = newQuantities.get(itemId) || 1
                newQuantities.set(itemId, currentQuantity - 1)
                return newQuantities
            })
        }
    }

    const handleIncreaseQuantity = (itemId: string) => {
        setQuantities((prevQuantities) => {
            const newQuantities = new Map(prevQuantities)
            const currentQuantity = newQuantities.get(itemId) || 1
            newQuantities.set(itemId, currentQuantity + 1)
            return newQuantities
        })
    }

    const handleRemoveItem = async (id: string) => {
        removeMutate.mutate({ id })
    }

    const handlePlaceOrder = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        const formData = new FormData(e.currentTarget)
        const address = Object.fromEntries(formData.entries())
        const products: any = []
        cart!.cart.items!.forEach((item: CartItem) => {
            item!.options![0].value[0].quantity = quantities.get(item!.productId!)
            products.push({
                productId: item.productId,
                name: item.name,
                options: item.options,
            })
        })
        let order = {
            refCode: `${generateSecureRandomString(12).toUpperCase()}`,
            items: products,
            address: {
                street: address.street,
                districts: address.district.toString().split('-')[1],
                province: address.province.toString().split('-')[1],
                wards: address.ward.toString().split('-')[1]
            },
            totalPrice: calculateTotal(),
            voucherCode: cart!.promotions!.length > 0 ? cart!.promotions![0].code : null,
        }
        addMutate.mutate({ order })
    }

    const selectCity = async (e: ChangeEvent<HTMLInputElement>) => {
        const response = await instance.get(`location/${e.target.value.split('-')[0]}/districts`)
        setDistricts(response.data.data)
        setWards([])
    }

    const selectDistrict = async (e: ChangeEvent<HTMLInputElement>) => {
        const response = await instance.get(`location/districts/${e.target.value.split('-')[0]}`)
        setWards(response.data.data)
    }

    return (
        <Container maxWidth={themeStretch ? false : 'xl'} sx={{ my: 3 }}>
            <Grid container spacing={3}>
                <Grid size={{ xs: 12, lg: 9 }}>
                    <Grid container sx={{ boxShadow: (theme) => theme.customShadows.card, p: 2, mb: 2 }}>
                        <Grid size={12}>
                            <Typography variant='h6'>{cart?.cart.items!.length ?? 0} sản phẩm</Typography>
                        </Grid>
                    </Grid>
                    {isLoading ? (
                        <LoadingShimmer />
                    ) : cart && cart.cart.items!.length > 0 ? (
                        (cart?.cart.items! as CartItem[]).map(item => (
                            <CartProductItem
                                quantities={quantities}
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
                <Grid size={{ xs: 12, lg: 3 }}>
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
                </Grid>
            </Grid>
        </Container>
    )
}