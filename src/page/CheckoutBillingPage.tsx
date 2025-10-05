'use client'
import { ICheckoutBillingAddress } from "@/@types/product"
import useUser from "@/hooks/api/useUser"
import { createBilling, getCart } from "@/redux/slices/product"
import { useDispatch, useSelector } from "@/redux/store"
import { PATH_DASHBOARD } from "@/routes/paths"
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

    const handleCreateBilling = (address: ICheckoutBillingAddress) => {
        dispatch(createBilling(address))
        router.push(PATH_DASHBOARD.general.checkout)
    }

    const handleBackStep = () => {
        router.push(PATH_DASHBOARD.general.cart)
    }

    return (
        <Container maxWidth='xl' sx={{ my: 3 }}>
            <CheckoutBillingAddress
                addresses={response?.data}
                checkout={checkout}
                onBackStep={() => handleBackStep()}
                onCreateBilling={(address) => handleCreateBilling(address)}
            />
        </Container>
    )
}