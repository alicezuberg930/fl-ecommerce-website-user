'use client'
import { ICheckoutBillingAddress } from "@/@types/product"
import useUser from "@/hooks/api/useUser"
import { createBilling, getCart } from "@/redux/slices/product"
import { useDispatch, useSelector } from "@/redux/store"
import CheckoutBillingAddress from "@/sections/checkout/billing/CheckoutBillingAddress"
import { Container } from "@mui/material"
import { useRouter } from "next/navigation"
import { useEffect } from "react"

export default function CheckoutBillingPage() {
    const dispatch = useDispatch()
    const checkout = useSelector((state) => state.product)
    const { getDeliveryAddresses } = useUser()
    const { data: response } = getDeliveryAddresses()
    const router = useRouter()

    useEffect(() => {
        dispatch(getCart(checkout.cart))
    }, [dispatch, checkout.cart])

    const handleCreateBilling = (address: Omit<ICheckoutBillingAddress, '_id'>) => {
        dispatch(createBilling(address))
        router.push('/checkout')
    }

    const handleOnBackStep = () => {
        router.push('/cart')
    }

    return (
        <Container maxWidth='xl' sx={{ my: 3 }}>
            <CheckoutBillingAddress
                addresses={response?.data}
                checkout={checkout}
                onBackStep={() => handleOnBackStep()}
                onCreateBilling={(address) => handleCreateBilling(address)}
            />
        </Container>
    )
}