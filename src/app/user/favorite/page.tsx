import '@/app/styles/css/user.favorite.css'
import UserContent from '../components/UserContent'

const FavoritePage = () => {
    return (
        <UserContent>
            <div className="user-favorite-list-wrapper">
                <div className='user-title'>
                    <b>Danh sách yêu thích </b>
                    <span>(Hãy nhấn like sản phẩm bạn yêu tích để thuận tiện coi lại)</span>
                </div>
                <div className='user-favorite-list-container'>
                    {
                        Array.from({ length: 8 }).map((v, i) => {
                            return (
                                <div key={i} className='user-favorite-item-container'>

                                </div>
                            )
                        })
                    }
                </div>
            </div>
        </UserContent>
    )
}

export default FavoritePage