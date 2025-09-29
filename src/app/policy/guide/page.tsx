import PolicyMenu from "@/app/policy/components/PolicyMenu"

const GuidePolicyPage = () => {
    return (
        <div className="policy-wrapper">
            <PolicyMenu />
            <div className="policy-container">
                <h1 className="policy-title">Hướng dẫn mua hàng</h1>
                <span className="policy-details">
                    Quý khách có thể đặt hàng nhanh chóng với CÔNG TY CỔ PHẦN THƯƠNG MẠI VÀ PHÁT TRIỂN FUTURE LIFE thông qua các phương thức sau:
                </span>
                <b className="policy-section">1. Đặt hàng trên Website.</b>
                <ul className="policy-section-list">
                    <li>Bước 1: Chọn sản phẩm cần mua, nhấn "Thêm vào giỏ hàng".</li>
                    <li>Bước 2: Vào Giỏ hàng (góc trên cùng trang web) và nhấn "Đặt mua", sau đó điền đầy đủ thông tin nhận hàng.</li>
                    <li>Bước 3: Nhân viên Future Life sẽ liên hệ xác nhận và tiến hành giao hàng.</li>
                </ul>
                <b className="policy-section">2. Đặt hàng qua Facebook.</b>
                <span className="policy-details">📩 Inbox trực tiếp fanpage của chúng tôi tại: 🔗 https://www.facebook.com/futurelife/</span>
                <b className="policy-section">3. Mua hàng qua thương mại điện tử</b>
                <span className="policy-details">Khách hàng có thể tham khảo sản phẩm và mua thông qua sàn thương mại điện tử chính hãng của Future Life qua sàn thương mại điện tử chính hãng của Future Life.</span>
                <ul className="policy-section-list">
                    <li>Shopee: https://shopee.vn/futurelife.ecom</li>
                    <li>TikTok Shop: https://www.tiktok.com/@futurelife_official</li>
                </ul>
            </div>
        </div>
    )
}

export default GuidePolicyPage