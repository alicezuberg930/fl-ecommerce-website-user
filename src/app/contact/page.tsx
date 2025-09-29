import "@/app/styles/css/contact.css"
import { icons } from "../common/icons";

const ContactPage = () => {
    const { FaPhoneVolume, MdOutlineAlternateEmail } = icons

    return (
        <div className="contact-wrapper">
            <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3919.2343856107623!2d106.64506267485714!3d10.793352189356412!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3175294b42db3c5b%3A0xd170d22350fde85!2zNzIgVHLhuqduIE1haSBOaW5oLCBQaMaw4budbmcgMTIsIFTDom4gQsOsbmgsIEjhu5MgQ2jDrSBNaW5oLCBWaWV0bmFt!5e0!3m2!1sen!2s!4v1732777684358!5m2!1sen!2s" height="550" style={{ width: "100%" }} allowFullScreen loading="lazy" referrerPolicy="no-referrer-when-downgrade"></iframe>
            <div className="contact-container">
                <div className="contact-info-wrapper">
                    <h1 className="contact-info-title">Future Life</h1>
                    <p>Công ty Cổ phần Thương mại và Phát triển Future Life là thương hiệu tiên phong cung cấp giải pháp và sản phẩm chất lượng, nâng cao sức khỏe và vẻ đẹp cho gia đình bạn. Chúng tôi mang đến các sản phẩm dinh dưỡng, làm đẹp… từ những thương hiệu quốc tế uy tín. Future Life cam kết chất lượng chính hãng, đáp ứng mọi nhu cầu của khách hàng.</p>
                    <div className="contact-info-container">
                        <div>
                            <b>Địa chỉ văn phòng</b>
                            <p>76 Trần Mai Ninh, P12 Q. Tân Bình. TPHCM</p>
                        </div>
                        <div>
                            <b>Điện thoại</b>
                            <p>
                                <FaPhoneVolume />
                                <a href="tel:0396879297" target="_blank" rel="noreferrer" className="text-red-500 font-bold">
                                    0396 879 297
                                </a>
                            </p>
                        </div>
                        <div>
                            <b>Email</b>
                            <p>
                                <MdOutlineAlternateEmail />
                                <a href="mailto:luanle.work@gmail.com?subject: fshoppi.com - Tư vấn hỗ trợ" target="_blank" rel="noreferrer">
                                    hr@futurelife.com
                                </a>
                            </p>
                        </div>
                    </div>
                    <div className="contact-info-separator"></div>
                    <div className="contact-info-container">
                        <div>
                            <b>Hỗ trợ khách hàng</b>
                            <p>
                                <FaPhoneVolume />
                                <a href="tel:0918 927 300">0918 927 300</a>
                            </p>
                            <p>
                                <MdOutlineAlternateEmail />
                                <a href="mailto:ceo.vattunhaxuan@gmail.com">
                                    cskh@futurelife.com
                                </a>
                            </p>
                        </div>
                        <div>
                            <b>Tư vấn & mua hàng</b>
                            <p>
                                <FaPhoneVolume />
                                <a href="tel:0932 616 986 ">0932 616 986</a>
                            </p>
                            <p>
                                <MdOutlineAlternateEmail />
                                <a href="mailto:info.nhaxuan@gmail.com">
                                    cshk@futurelife.com
                                </a>
                            </p>
                        </div>
                        <div>
                            <b>Hỗ trợ kỹ thuật</b>
                            <p>
                                <FaPhoneVolume />
                                <a href="tel:0935 544 789">0935 544 789</a>
                            </p>
                            <p>
                                <MdOutlineAlternateEmail />
                                <a href="mailto:info.nhaxuan@gmail.com">
                                    cshk@futurelife.com
                                </a>
                            </p>
                        </div>
                    </div>
                </div>
                <div className="contact-form-wrapper">
                    <header>
                        <h2>Liên hệ trực tuyến</h2>
                        <div>Vui lòng cung cấp đầy đủ các nội dung sau:</div>
                    </header>
                    <div>
                        <div className="contact-input-group">
                            <div>Họ tên<b>*</b></div>
                            <input type="text" autoComplete="off" required />
                        </div>
                        <div className="contact-input-group">
                            <div>Điện thoại<b>*</b></div>
                            <input type="tel" required autoComplete="off" />
                        </div>
                        <div className="contact-input-group">
                            <div>Email<b>*</b></div>
                            <input type="email" autoComplete="off" />
                        </div>
                        <div className="contact-input-group">
                            <div>Địa chỉ</div>
                            <input type="text" autoComplete="off" />
                        </div>
                        <div className="contact-input-group">
                            <div>Nội dung</div>
                            <textarea rows={4} autoComplete="off"></textarea>
                        </div>
                        <button className="contact-confirm-button">Xác nhận</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ContactPage