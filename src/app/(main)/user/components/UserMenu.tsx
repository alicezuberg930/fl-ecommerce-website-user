import Link from "next/link"
import '@/app/styles/css/user.menu.css'
import { useAuthContext } from "@/auth/useAuthContext"

const UserMenu = () => {
    const menuTabs = [
        {
            "title": "Quản lý tài khoản",
            "link": "/user/account"
        },
        {
            "title": "Future Life tích điểm",
            "link": "/user/point"
        },
        {
            "title": "Thông tin tài khoản",
            "link": "/user/profile"
        },
        {
            "title": "Đơn hàng của tôi",
            "link": "/user/orders"
        },
        {
            "title": "Booking của tôi",
            "link": "/user/account"
        },
        {
            "title": "Số địa chỉ nhận hàng",
            "link": "/user/account"
        },
        {
            "title": "Danh sách yêu thích",
            "link": "/user/favorite"
        },
        {
            "title": "Mua lại",
            "link": "/user/repurchase"
        },
        {
            "title": "Hỏi đáp",
            "link": "/user/account"
        }
    ]
    const { user } = useAuthContext()

    return (
        <div className="user-menu-wrapper">
            <div className="user-info-container">
                <img src={'/assets/shopee.png'} className="user-info-image" />
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