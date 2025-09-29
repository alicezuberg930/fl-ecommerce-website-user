import UserContent from "../components/UserContent"
import '@/app/styles/css/user.repurchase.css'

const UserRepurchasePage = () => {
    return (
        <UserContent>
            <div className="user-repurchase-wrapper">
                <b>Sản phẩm mua lại</b>

                <div className="no-repurchase-found-container">
                    <b>Bạn chưa có đơn hàng nào</b>
                    <button className="continue-purchase-button">Tiếp tục mua hàng</button>
                </div>
            </div>
        </UserContent>
    )
}

export default UserRepurchasePage