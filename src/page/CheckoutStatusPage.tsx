'use client'
import { resetCart } from "@/redux/slices/product"
import { dispatch, useSelector } from "@/redux/store"
import { PATH_DASHBOARD } from "@/routes/paths"
import CheckoutOrderComplete from "@/sections/checkout/CheckoutOrderComplete"
import { updateOrder as updateOrderAPI } from "@/utils/httpClient"
import { useRouter, useSearchParams } from "next/navigation"
import { useEffect } from "react"

export default function CheckoutStatusPage() {
    const router = useRouter()
    const searchParams = useSearchParams()
    let orderId = searchParams.get('orderId') || searchParams.get('vnp_TxnRef')
    const checkout = useSelector((state) => state.product)
    const { paymentMethod } = checkout

    // console.log(searchParams.entries().forEach(([k, v]) => {
    //     console.log({ k, v })
    // }))

    useEffect(() => {
        const updateOrder = async () => {
            const response = await updateOrderAPI({ id: orderId!, paymentMethod: paymentMethod! })
            console.log(response.data)
        }
        if (paymentMethod && orderId) updateOrder()
    }, [paymentMethod, orderId])

    const handleReset = () => {
        dispatch(resetCart())
        router.push(PATH_DASHBOARD.root)
    }

    return (
        <CheckoutOrderComplete
            orderId={orderId!}
            open={true}
            onReset={handleReset}
            onDownloadPDF={() => { }}
        />
    )
}