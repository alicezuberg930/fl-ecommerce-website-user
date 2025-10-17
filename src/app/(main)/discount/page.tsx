import Link from 'next/link'
import '@/app/styles/css/discount.css'

const DiscountPage = () => {
    return (
        <div className='discount-wrapper'>
            <img alt='discount-landing' src={'/assets/discount_landing.jpg'} />
            <h1 className='discount-title'>
                Thông tin khuyến mãi
            </h1>
            <div className='discount-container'>
                {/* {
                    [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14].map(i => {
                        let slug = slugify(`Khuyến mãi tháng ${i}/2024`)
                        return (
                            <div className='discount-item-container' key={i} >
                                <Link href={`/discount/${slug}`}>
                                    <div className='discount-item'>
                                        <div className='discount-item-image-container' >
                                            <img src={'/assets/discount_1.jpg'} alt='' />
                                        </div>
                                        <div className='discount-item-description'>
                                            <h3>Khuyến mãi tháng {i}/2024</h3>
                                            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim in eros elementum tristique. Duis cursus, mi quis viverra ornare, eros dolor interdum nulla, ut commodo diam libero vitae erat.</p>
                                        </div>
                                    </div>
                                </Link>
                            </div>
                        )
                    })
                } */}
            </div>
        </div>
    )
}

export default DiscountPage