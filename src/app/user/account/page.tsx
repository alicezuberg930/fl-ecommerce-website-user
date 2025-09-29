'use client'
import { useAuthContext } from "@/auth/useAuthContext"
import UserContent from "../components/UserContent"
import "@/app/styles/css/user.account.css"

const UserAccountPage = () => {
    const { user } = useAuthContext()

    return (
        <UserContent>
            <div className="user-account-wrapper">
                <b>Thông tin tài khoản</b>
                <div className="user-account-container">
                    <div className="account-email-container">
                        <div>
                            <b className="account-name">{user?.name ?? ""}</b>
                            <p className="account-email">{user?.email ?? ""}</p>
                        </div>
                        <span className="edit">Chỉnh sửa</span>
                    </div>
                    <div className="account-notification-container">
                        <div>
                            <b className="account-register">Tùy chọn đăng ký, cập nhật thông tin khuyến mãi</b>
                            <div className="account-checkbox-container">
                                <input type="checkbox" width={9} height={9} />
                                <span>Đăng ký</span>
                            </div>
                        </div>
                        <button className="save-change-button"><b>Lưu thay đổi</b></button>
                    </div>
                </div>
            </div>
        </UserContent>
    )
}

export default UserAccountPage