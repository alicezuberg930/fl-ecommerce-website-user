import '@/app/styles/css/seen.product.list.css'

const seenProducts = [
    '/assets/foryou1.png',
    '/assets/foryou1.png',
    '/assets/foryou1.png',
    '/assets/foryou1.png',
    '/assets/foryou1.png',
    '/assets/foryou1.png',
    '/assets/foryou1.png',
    '/assets/foryou1.png',
    '/assets/foryou1.png',
]

const SeenProductList = () => {
    return (
        <div className="seen-product-list-wrapper">
            <span className="seen-product-title">Sản phẩm đã xem</span>
            <div className="seen-product-list-container">
                {
                    seenProducts.map((v, i) => {
                        return (
                            <div key={i} className="seen-product-item-container">
                                <img alt={v} src={v} />
                            </div>
                        )
                    })
                }
            </div>
        </div>
    )
}

export default SeenProductList