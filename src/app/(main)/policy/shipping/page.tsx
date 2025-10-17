import PolicyMenu from "@/app/(main)/policy/components/PolicyMenu"

const ShippingPolicyPage = () => {
    return (
        <div className="policy-wrapper">
            <PolicyMenu />
            <div className="policy-container">
                <h1 className="policy-title">Chính sách vận chuyển</h1>
                <b className="policy-section">1. Đối tượng áp dụng.</b>
                <span className="policy-details">Chính sách này áp dụng cho tất cả khách hàng mua sản phẩm tại Future Life trên các kênh bán hàng chính thức.</span>
                <b className="policy-section">2. Thời gian giao hàng.</b>
                <ul className="policy-section-list">
                    <li>Thời gian giao hàng dao động từ 1 - 7 ngày, tùy thuộc vào địa điểm nhận hàng.</li>
                    <li>Một số trường hợp giao hàng có thể chậm hơn do các yếu tố bất khả kháng như:</li>
                    <li>Thời tiết xấu, thiên tai.</li>
                    <li>Tắc nghẽn giao thông, phương tiện gặp sự cố.</li>
                    <li>Vấn đề phát sinh trong quá trình xử lý đơn hàng.</li>
                    <li>Trong những trường hợp trên, Future Life sẽ chủ động thông báo để khách hàng nắm rõ tình trạng đơn hàng.</li>
                </ul>
                <b className="policy-section">3. Trách nhiệm với hàng hóa vận chuyển.</b>
                <ul className="policy-section-list">
                    <li>Future Life chịu trách nhiệm về hàng hóa và các rủi ro như mất mát, hư hại trong quá trình vận chuyển từ kho đến tay khách hàng.</li>
                    <li>Khi nhận hàng, khách hàng có trách nhiệm:</li>
                    <li>Kiểm tra kỹ sản phẩm trước khi ký nhận.</li>
                    <li>Nếu phát hiện hàng bị hư hỏng, trầy xước, bể vỡ, móp méo hoặc sai sản phẩm, vui lòng liên hệ ngay với Future Life để được hỗ trợ.</li>
                    <li>Lưu ý: Sau khi khách hàng đã ký nhận, Future Life sẽ không chịu trách nhiệm đối với các khiếu nại liên quan đến tình trạng sản phẩm.</li>
                </ul>
            </div>
        </div>
    )
}

export default ShippingPolicyPage