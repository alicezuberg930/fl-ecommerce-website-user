import '@/app/styles/css/introduction.css'

const IntroductionPage = () => {
    return (
        <div className='introduction-wrapper'>
            <img alt='' src={'/assets/introduction_landing.jpg'} />
            <div className='introduction-details-container'>
                <h1 className='introduction-details-title'>Về chúng tôi</h1>
                <p>Future Life là một tập đoàn đa lĩnh vực, chuyên cung cấp các sản phẩm và dịch vụ vượt trội, nhằm đáp ứng nhu cầu ngày càng đa dạng của thị trường toàn cầu. Với mục tiêu trở thành một hệ sinh thái thương mại đa kênh.</p>
                <p>Future Life hoạt động mạnh mẽ trong nhiều ngành nghề, bao gồm nhiều ngành hàng như hàng tiêu dùng, làm đẹp, thời trang,.. cho đến du lịch và giải trí.</p>
                <p>Chúng tôi không chỉ mang đến các sản phẩm chất lượng cao mà còn cam kết cung cấp những trải nghiệm tối ưu cho khách hàng qua từng lĩnh vực, từ đó tạo dựng mối quan hệ lâu dài và bền vững.</p>
            </div>
            <div className='introduction-utilities-wrapper'>
                <div className='introduction-utilities-container'>
                    <div className='introduction-utilities-item'>
                        <img src='/assets/mien-phi-van-chuyen.png' />
                        <div>
                            <b>Miễn phí vận chuyển</b>
                            <p>Áp dụng đơn hàng &gt; 3tr</p>
                        </div>
                    </div>
                    <div className='introduction-utilities-item'>
                        <img src='/assets/ho-tro-24-7.png' />
                        <div>
                            <b>Hỗ trợ 24/7</b>
                            <p>Tư vấn hỗ trợ thắc mắc liên quan</p>
                        </div>
                    </div>
                    <div className='introduction-utilities-item'>
                        <img src='/assets/thanh-toan-linh-hoat.png' />
                        <div>
                            <b>Thanh toán linh hoạt</b>
                            <p>Áp dụng nhiều hình thức thanh toán khác nhau</p>
                        </div>
                    </div>
                </div>
            </div>
            <div className='introduction-extended-wrapper'>
                <div className='introduction-extended-container'>
                    <div className='introduction-extended-image-container'>
                        <img src='/assets/tam-nhin-su-menh.webp' />
                    </div>
                    <div>
                        <h1>TẦM NHÌN</h1>
                        <p>Future Life định hướng trở thành một tập đoàn thương mại đa lĩnh vực, xây dựng một hệ sinh thái liên kết chặt chẽ và tương trợ lẫn nhau, với mục tiêu phục vụ 30 triệu khách hàng. Chúng tôi định hướng phát triển mạnh mẽ từ 9 lĩnh vực kinh doanh chủ chốt, tạo ra những giá trị bền vững và tối ưu hóa trải nghiệm khách hàng thông qua việc kết nối và cung cấp sản phẩm, dịch vụ chất lượng cao</p>
                    </div>
                </div>
            </div>
            <div className='introduction-extended-wrapper'>
                <div className='introduction-extended-container'>
                    <div>
                        <h1>SỨ MỆNH</h1>
                        <p>Chúng tôi chủ động kêu gọi hợp tác với các nhà đầu tư chiến lược trong nước và quốc tế, nhằm tăng cường sức mạnh tài chính và mở rộng phạm vi hoạt động toàn cầu. Với giá trị cốt lõi là tạo dựng mối quan hệ bền vững với một tệp khách hàng lớn và tin cậy. Future Life cam kết đem lại những sản phẩm và dịch vụ vượt trội, đồng thời gia tăng sản lượng tiêu thụ, khẳng định vị thế của mình trong thị trường quốc tế.</p>
                    </div>
                    <div className='introduction-extended-image-container'>
                        <img src='/assets/dinh-huong-phat-trien.png' />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default IntroductionPage