import PolicyMenu from "@/app/(main)/policy/components/PolicyMenu"

const PrivacyPolicyPage = () => {
    return (
        <div className="policy-wrapper">
            <PolicyMenu />
            <div className="policy-container">
                <h1 className="policy-title">Thông tin thanh toán</h1>
                <span className="policy-details">Khách hàng có thể thanh toán bằng một trong các hình thức sau:</span>
                <b className="policy-section">1. THANH TOÁN BẰNG TIỀN MẶT.</b>
                <ul className="policy-section-list">
                    <li>Quý khách hàng thanh toán trực tiếp bằng tiền mặt cho nhân viên giao hàng tại nơi khách hàng nhận.</li>
                </ul>
                <b className="policy-section">2 THANH TOÁN QUA CHUYỂN KHOẢN NGÂN HÀNG.</b>
                <span className="policy-details"> Quý khách hàng vui lòng chuyển khoản vào số tài khoản ngân hàng sau:</span>
                <ul className="policy-section-list">
                    <li><b>CÔNG TY CỔ PHẦN THƯƠNG MẠI VÀ PHÁT TRIỂN FUTURE LIFE</b></li>
                    <li><b>Địa chỉ: 76 Nguyễn Mai Ninh, Quận Tân Bình, TPHCM</b></li>
                    <li><b>MST: 0316223676</b></li>
                    <li>STK: 1083506868 (Ngân hàng Vietcombank)</li>
                </ul>
                <span className="policy-details"> Sau khi khách hàng thanh toán, nhân sự của CÔNG TY CỔ PHẦN THƯƠNG MẠI VÀ PHÁT TRIỂN FUTURE LIFE sẽ liên hệ lại xác nhận khoản thanh toán và thông tin đặt hàng.</span>
            </div>
        </div>
    )
}

export default PrivacyPolicyPage