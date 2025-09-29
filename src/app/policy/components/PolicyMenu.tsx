"use client"
import Link from "next/link"
import '@/app/styles/css/policy.css'

const PolicyMenu = () => {
    return (
        <div className="policy-menu">
            <Link href={"/policy/guide"}>
                Hướng dẫn mua hàng
            </Link>
            <Link href={"/policy/payment"}>
                Thông tin thanh toán
            </Link>
            <Link href={"/policy/shipping"}>
                Chính sách vận chuyển
            </Link>
            <Link href={"/policy/return"}>
                Quy định đổi trả hàng
            </Link>
            <Link href={"/policy/privacy"}>
                Bảo mật thông tin
            </Link>
        </div>
    )
}

export default PolicyMenu