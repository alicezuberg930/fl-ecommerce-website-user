'use client'
import React, { useCallback, useDeferredValue, useEffect, useMemo, useState } from 'react'
import LoadingShimmer from '@/app/components/LoadingShimmer'
import { Button, Container, Grid, IconButton, Stack, Tooltip, Typography } from '@mui/material'
import useCart from '@/hooks/api/useCart'
import EmptyContent from '@/components/empty-content'
import Iconify from '@/components/iconify'
import CheckoutSummary from '@/sections/checkout/CheckoutSummary'
import CheckoutCartProductList from '@/sections/checkout/cart/CheckoutCartProductList'
import { ICartAdd, ICartItem } from '@/@types/cart'
import { useTable } from '@/components/table'
import { debounce } from 'lodash'

export default function CartPage() {
    const { selected, setSelected, onSelectRow, onSelectAllRows } = useTable()
    const { getCartItems, deleteCartItem, updateCartItem } = useCart()
    const { data: response, isLoading } = getCartItems()
    const [cart, setCart] = useState<ICartItem[]>([])
    const deleteMutate = deleteCartItem()
    const updateMutate = updateCartItem()
    const isEmptyCart = cart.length == 0

    const totalPrice = useMemo(() => {
        if (!response || !response.data || selected.length < 1) return 0
        return response.data.filter(cart => selected.includes(cart._id)).reduce((total, item) => {
            return total + (item.quantity * item.variation.price)
        }, 0)
    }, [cart, selected])

    useEffect(() => {
        if (response && response.data) setCart(response.data)
    }, [response?.data])

    const debouncedUpdate = useCallback(debounce((id: string, quantity: number) => {
        updateMutate.mutate({ id, quantity })
    }, 500), [])

    const handleDecreaseQuantity = useCallback((id: string) => {
        setCart((prev) =>
            prev.map((item) => {
                if (item._id === id) {
                    const newQuantity = Math.max(1, item.quantity - 1)
                    return { ...item, quantity: newQuantity }
                }
                return item
            })
        )
        const find = cart.find((item) => item._id === id)
        if (find) debouncedUpdate(id, find.quantity - 1)
    }, [debouncedUpdate, cart])

    const handleIncreaseQuantity = useCallback((id: string) => {
        setCart((prev) =>
            prev.map((item) => {
                if (item._id === id) {
                    const newQuantity = Math.min(item.variation.stock, item.quantity + 1)
                    return { ...item, quantity: newQuantity }
                }
                return item
            })
        )
        const find = cart.find((item) => item._id === id)
        if (find) debouncedUpdate(id, find.quantity + 1)
    }, [debouncedUpdate, cart])

    const handleDeleteCart = async (id: string | string[]) => {
        deleteMutate.mutate({ id })
    }

    return (
        <Container maxWidth='xl' sx={{ my: 3 }}>
            <Grid container spacing={3}>
                <Grid size={{ xs: 12, md: 9 }}>
                    {isLoading ? (
                        <LoadingShimmer />
                    ) : !isEmptyCart ? (
                        <CheckoutCartProductList
                            products={cart}
                            onDelete={(id) => handleDeleteCart(id)}
                            onIncreaseQuantity={(id) => handleIncreaseQuantity(id)}
                            onDecreaseQuantity={(id) => handleDecreaseQuantity(id)}
                            selected={selected}
                            onSelectRow={onSelectRow}
                            onSelectAllRows={onSelectAllRows}
                        />
                    ) : (
                        <EmptyContent
                            title='Giỏ hàng trống'
                            description='Giỏ hàng của bạn hiện đang trống, mua sắm ngay'
                        />
                    )}
                </Grid>
                <Grid size={{ xs: 12, md: 3 }}>
                    <CheckoutSummary
                        enableDiscount
                        total={totalPrice}
                        // discount={0}
                        subtotal={totalPrice}
                        onApplyDiscount={(discount) => { }}
                    />
                    <Button
                        fullWidth
                        size="large"
                        type="submit"
                        variant="contained"
                    // onClick={onNextStep}
                    >
                        Tiếp tục
                    </Button>
                </Grid>
            </Grid>
        </Container>
    )
}