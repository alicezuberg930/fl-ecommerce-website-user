'use client'
import { IOrderNew } from "@/@types/order";
import useOrder from "@/hooks/api/useOrder";
import { applyPaymentMethod, applyShipping, resetCart } from "@/redux/slices/product";
import { useDispatch, useSelector } from "@/redux/store";
import { PATH_DASHBOARD } from "@/routes/paths";
import CheckoutOrderComplete from "@/sections/checkout/CheckoutOrderComplete";
import CheckoutPayment from "@/sections/checkout/payment/CheckoutPayment";
import { Container } from "@mui/material";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function CheckoutPaymentPage() {
    const [open, setOpen] = useState<boolean>(false)
    const dispatch = useDispatch()
    const checkout = useSelector((state) => state.product)
    const { subTotal, total, discount, shipping, billing, paymentMethod, cart } = checkout
    const router = useRouter()
    const { createOrder } = useOrder()
    const { mutate } = createOrder()

    const handleNextStep = () => {
        const order: IOrderNew = {
            subTotal, total, discount, shipping,
            billing: billing!,
            paymentMethod: paymentMethod!,
            cartIds: cart.map(item => item._id)
        }
        mutate({ order }, {
            onSuccess(res) {
                if (res.data.payUrl) router.push(res.data.payUrl)
                if (paymentMethod === "cash") router.push(`/checkout/status?orderId=${res.data._id}`)
            }
        })
    }

    const handleBackStep = () => {
        router.push(PATH_DASHBOARD.general.billing)
    }

    const handleApplyShipping = (value: number) => {
        dispatch(applyShipping(value))
    }

    const handleApplyPaymentMethod = (value: string) => {
        dispatch(applyPaymentMethod(value))
    }

    const handleGoToCart = () => {
        router.push(PATH_DASHBOARD.general.cart)
    }

    return (
        <>
            <Container maxWidth="xl" sx={{ my: 3 }}>
                <CheckoutPayment
                    checkout={checkout}
                    onNextStep={handleNextStep}
                    onBackStep={handleBackStep}
                    onGotoStep={handleGoToCart}
                    onApplyShipping={handleApplyShipping}
                    onApplyPaymentMethod={handleApplyPaymentMethod}
                />
            </Container>
            {/* <CheckoutOrderComplete
                open={open}
                onReset={handleReset}
                onDownloadPDF={() => { }}
            /> */}
        </>
    )
}