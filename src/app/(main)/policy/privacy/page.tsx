import PolicyMenu from "@/app/(main)/policy/components/PolicyMenu"

const PrivacyPolicyPage = () => {
    return (
        <div className="policy-wrapper">
            <PolicyMenu />
            <div className="policy-container">
                <h1 className="policy-title">Bảo mật thông tin</h1>
                <span className="policy-details">CÔNG TY CỔ PHẦN THƯƠNG MẠI VÀ PHÁT TRIỂN FUTURE LIFE cam kết bảo mật thông tin cá nhân của khách hàng và đảm bảo quyền riêng tư theo đúng quy định pháp luật. Khi sử dụng dịch vụ của chúng tôi, quý khách vui lòng đọc kỹ Chính sách bảo mật dưới đây để hiểu rõ về cam kết bảo vệ thông tin của Future Life.</span>
                <b className="policy-section">1. Thu thập thông tin khách hàng.</b>
                <span className="policy-details">Chúng tôi thu thập thông tin cá nhân của khách hàng để phục vụ các mục đích sau:</span>
                <ul className="policy-section-list">
                    <li>Hỗ trợ, giải đáp thắc mắc của khách hàng.</li>
                    <li>Xử lý đơn hàng và giao hàng tận nơi.</li>
                    <li>Chăm sóc khách hàng sau mua hàng.</li>
                    <li>Cung cấp thông tin về các chương trình khuyến mãi, dịch vụ và sản phẩm mới.</li>
                </ul>
                <span className="policy-details">Thông tin cá nhân khách hàng có thể bao gồm:</span>
                <ul className="policy-section-list">
                    <li>Họ và Tên.</li>
                    <li>Địa chỉ giao hàng.</li>
                    <li>Email.</li>
                    <li>Số điện thoại.</li>
                    <li>Lịch sử giao dịch, phương thức thanh toán.</li>
                </ul>
                <span className="policy-details">Lưu ý: Khách hàng có quyền truy cập, chỉnh sửa hoặc yêu cầu hủy thông tin cá nhân bất cứ lúc nào bằng cách liên hệ với Future Life.</span>

                <span className="policy-details">Quý khách phải đảm bảo tính chính xác và hợp pháp mọi thông tin cung cấp, <b>CÔNG TY CỔ PHẦN THƯƠNG MẠI VÀ PHÁT TRIỂN FUTURE LIFE</b> không chịu mọi trách nhiệm liên quan đến pháp luật và thông tin khai báo.</span>
                <b className="policy-section">2. Phạm vi sử dụng thông tin.</b>
                <span className="policy-details">Thông tin thu thập từ khách hàng sẽ được sử dụng để:</span>
                <ul className="policy-section-list">
                    <li>Giao hàng đúng địa chỉ khách hàng cung cấp.</li>
                    <li>Thông báo về đơn hàng, hỗ trợ khách hàng trong quá trình mua sắm.</li>
                    <li>Gửi thông tin về sản phẩm, dịch vụ, chương trình khuyến mãi (nếu khách hàng đồng ý nhận thông tin).</li>
                    <li>Hỗ trợ quản lý tài khoản khách hàng trên hệ thống.</li>
                    <li>Thực hiện các giao dịch tài chính, bao gồm thanh toán trực tuyến.</li>
                    <li>Cải thiện trải nghiệm người dùng, tùy chỉnh giao diện trang web theo hành vi mua sắm.</li>
                    <li>Nghiên cứu nhân khẩu học, phân tích thị trường nhằm nâng cao chất lượng dịch vụ.</li>
                    <li>Lưu ý: Chúng tôi có thể chia sẻ thông tin khách hàng với đối tác vận chuyển để hoàn thành quá trình giao hàng.</li>
                    <li>Khách hàng có thể hủy nhận thông tin quảng cáo bằng cách chọn “Hủy đăng ký” trong email hoặc tin nhắn quảng cáo.</li>
                </ul>
                <b className="policy-section">3. Bảo mật thông tin cá nhân.</b>
                <span className="policy-details">Future Life cam kết bảo vệ thông tin khách hàng bằng các biện pháp bảo mật phù hợp:</span>
                <ul className="policy-section-list">
                    <li>Mã hóa thông tin để ngăn chặn truy cập trái phép.</li>
                    <li>Bảo vệ dữ liệu bằng hệ thống tường lửa và công nghệ bảo mật tiên tiến.</li>
                    <li>Không chia sẻ, bán hoặc trao đổi thông tin cá nhân khách hàng với bên thứ ba vì mục đích thương mại.</li>
                </ul>
                <span className="policy-details">Khách hàng cần lưu ý:</span>
                <ul className="policy-section-list">
                    <li>Tự bảo vệ thông tin cá nhân khi sử dụng chung máy tính, đặc biệt là mật khẩu đăng nhập.</li>
                    <li>Không cung cấp thông tin thanh toán, giao nhận cho bên thứ ba không liên quan đến Future Life.</li>
                    <li>Không can thiệp, thay đổi dữ liệu hệ thống của Future Life. Các hành vi vi phạm sẽ bị xử lý theo pháp luật.</li>
                </ul>
                <b className="policy-section">4. Thời gian lưu trữ thông tin.</b>
                <ul className="policy-section-list">
                    <li>Future Life lưu trữ thông tin cá nhân của khách hàng trong quá trình cung cấp dịch vụ hoặc đến khi khách hàng có yêu cầu hủy bỏ thông tin.</li>
                    <li>Trường hợp pháp luật có yêu cầu, chúng tôi buộc phải cung cấp thông tin này cho cơ quan chức năng.</li>
                </ul>
                <b className="policy-section">5. Thay đổi về chính sách bảo mật.</b>
                <ul className="policy-section-list">
                    <li>Future Life có quyền điều chỉnh, cập nhật chính sách bảo mật theo từng thời điểm mà không cần báo trước.</li>
                    <li>Mọi thay đổi sẽ được công bố trên website chính thức của chúng tôi.</li>
                </ul>
                <b className="policy-section">6. Thông tin liên hệ.</b>
                <span className="policy-details">Nếu có bất kỳ thắc mắc nào liên quan đến Chính sách bảo mật thông tin, quý khách vui lòng liên hệ.</span>
                <span className="policy-details">📞 Hotline: 0888 800 '100.</span>
                <span className="policy-details">Future Life cam kết luôn bảo vệ quyền lợi của khách hàng và mang đến trải nghiệm mua sắm an toàn, tiện lợi!</span>
            </div>
        </div>
    )
}

export default PrivacyPolicyPage