import PolicyMenu from "@/app/(main)/policy/components/PolicyMenu"

const ReturnOrderPolicyPage = () => {
    return (
        <div className="policy-wrapper">
            <PolicyMenu />
            <div className="policy-container">
                <h1 className="policy-title">Quy định đổi trả hàng</h1>
                <b className="policy-section">1. Thời gian đổi trả.</b>
                <span className="policy-details">Trong vòng 03-07 ngày kể từ khi nhận hàng (tùy sản phẩm).</span>
                <b className="policy-section">2. Điều kiện áp dụng.</b>
                <ul className="policy-section-list">
                    <li>- Future Life chịu phí ship đổi trả trong trường hợp:</li>
                    <li>Sản phẩm bị lỗi do nhà sản xuất.</li>
                    <li>Sản phẩm giao nhầm phân loại hoặc quy cách.</li>
                    <li>- Khách hàng chịu phí ship đổi trả khi:</li>
                    <li>Muốn đổi phân loại hoặc quy cách sản phẩm.</li>
                    <li>Đổi sang sản phẩm khác có giá trị bằng hoặc cao hơn sản phẩm đã mua.</li>
                </ul>
                <b className="policy-section">3. Liên hệ hỗ trợ</b>
                <span className="policy-details">Chúng tôi sẵn sàng giải đáp 24/7 để đảm bảo quyền lợi của bạn.</span>
            </div>
        </div>
    )
}

export default ReturnOrderPolicyPage