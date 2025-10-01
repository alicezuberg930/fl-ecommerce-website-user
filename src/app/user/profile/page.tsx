'use client'
import '@/app/styles/css/user.profile.css'
import UserContent from "../components/UserContent"
import { icons } from '@/utils/icons'
import { useAuthContext } from '@/auth/useAuthContext'

const UserProfilePage = () => {
    const { CiMail, FaRegUser, FaPhoneAlt, IoLockClosedOutline } = icons
    const { user } = useAuthContext()

    return (
        <UserContent>
            <div className="user-profile-wrapper">
                <div className="user-profile-body-info">
                    <span className="profile-title">Thông tin tài khoản</span>

                    <div className='user-profile-info-container'>
                        <div className='user-profile-img-container'>
                            <img src='/assets/shopee.png' className='user-profile-img' />
                            <span>Tải ảnh của bạn</span>
                        </div>
                        <div className='user-profile-input-container'>
                            <div className='email-input-container'>
                                <input className='email-input' type='text' defaultValue={user?.email ?? ""} />
                                <CiMail size={18} />
                            </div>
                            <div className='username-input-container'>
                                <input className='username-input' type='text' defaultValue={user?.name ?? ""} />
                                <FaRegUser size={18} />
                            </div>
                            <div className='gender-radio-group'>
                                <div className='gender-radio'>
                                    <input type='radio' name='gender' value='male' />
                                    <span>Nam</span>
                                </div>
                                <div className='gender-radio'>
                                    <input type='radio' name='gender' value='female' />
                                    <span>Nữ</span>
                                </div>
                                <div className='gender-radio'>
                                    <input type='radio' name='gender' value='unknown' />
                                    <span>Không xác định</span>
                                </div>
                            </div>
                            <div className='birthday-title'>
                                <span><b>Ngày sinh </b>(Không xác định)</span>
                            </div>
                            <div className='birthday-select-group'>
                                <select className='birthday-select'>
                                    <option>Ngày</option>
                                </select>
                                <select className='birthday-select'>
                                    <option>Tháng</option>
                                </select>
                                <select className='birthday-select'>
                                    <option>Năm</option>
                                </select>
                            </div>
                            <div className='receive-notification-input'>
                                <input type='checkbox' className='checkbox-input' />
                                <span>Nhận thông báo khuyến mãi qua email</span>
                            </div>
                            <button className='user-profile-update-button'>
                                <b>Cập nhật</b>
                            </button>
                        </div>
                    </div>
                </div>
                <div className="user-profile-body-auth">
                    <span className="profile-title">Số điện thoại và email</span>
                    <div className='profile-body-auth-container'>
                        <div className='profile-body-auth-left'>
                            <div className='profile-body-auth-info'>
                                <FaPhoneAlt size={24} />
                                <div className=''>
                                    <p>Số điện thoại</p>
                                    <p className='auth-info-title'>{user?.phone ?? ""}</p>
                                </div>
                            </div>
                        </div>
                        <div className='profile-body-auth-right'>
                            <button className='auth-update-button'><b>Cập nhật</b></button>
                        </div>
                    </div>
                    <div className='profile-body-auth-container'>
                        <div className='profile-body-auth-left'>
                            <div className='profile-body-auth-info'>
                                <CiMail size={24} />
                                <div className=''>
                                    <p>Email</p>
                                    <p className='auth-info-title'>{user?.email ?? ""}</p>
                                </div>
                            </div>
                        </div>
                        <div className='profile-body-auth-right'>
                            <button className='auth-update-button'><b>Cập nhật</b></button>
                        </div>
                    </div>
                    <span className="profile-title">Bảo mật</span>
                    <div className='profile-body-auth-container'>
                        <div className='profile-body-auth-left'>
                            <div className='profile-body-auth-info'>
                                <IoLockClosedOutline size={24} />
                                <div className=''>
                                    <p>Đổi mật khẩu</p>
                                </div>
                            </div>
                        </div>
                        <div className='profile-body-auth-right'>
                            <button className='auth-update-button'><b>Cập nhật</b></button>
                        </div>
                    </div>
                    <span className="profile-title">Liên kết mạng xã hội</span>
                    <div className='profile-body-auth-container'>
                        <div className='profile-body-auth-left'>
                            <div className='profile-body-auth-info'>
                                <img src='/assets/facebook.png' width={24} height={24} />
                                <div className=''>
                                    <p>Facebook</p>
                                </div>
                            </div>
                        </div>
                        <div className='profile-body-auth-right'>
                            <button className='auth-update-button'><b>Cập nhật</b></button>
                        </div>
                    </div>
                    <div className='profile-body-auth-container'>
                        <div className='profile-body-auth-left'>
                            <div className='profile-body-auth-info'>
                                <img src='/assets/google.png' width={24} height={24} />
                                <div className=''>
                                    <p>Google</p>
                                </div>
                            </div>
                        </div>
                        <div className='profile-body-auth-right'>
                            <button className='auth-update-button'><b>Cập nhật</b></button>
                        </div>
                    </div>
                </div>
            </div>
        </UserContent>
    )
}

export default UserProfilePage