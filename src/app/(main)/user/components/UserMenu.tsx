'use client'
import Link from "next/link"
import '@/app/styles/css/user.menu.css'
import { useAuthContext } from "@/auth/useAuthContext"
import { CustomAvatar } from "@/components/custom-avatar"

const menuTabs = [
    {
        "title": "Quản lý tài khoản",
        "link": "/user/profile"
    },
    {
        "title": "Đơn hàng của tôi",
        "link": "/user/orders"
    },
    {
        "title": "Số địa chỉ nhận hàng",
        "link": "/user/addresses"
    },
    {
        "title": "Sản phẩm yêu thích",
        "link": "/user/favorite"
    }
]

const UserMenu = () => {
    const { user } = useAuthContext()

    return (
        <div className="user-menu-wrapper">
            <div className="user-info-container">
                <CustomAvatar alt={user?.avatar ?? 'avatar'} name={user?.name} src={user?.avatar ?? undefined} />
                <div>
                    <span className="username">Chào {user?.name ?? ""}</span>
                    <span className="title">Chỉnh sửa tài khoản của bạn</span>
                </div>
            </div>
            {
                menuTabs.map(menuTab => {
                    return (
                        <div key={menuTab.title} className="tab-container">
                            <Link href={menuTab.link} className="tab-title">{menuTab.title}</Link>
                        </div>
                    )
                })
            }
        </div>
    )
}

export default UserMenu