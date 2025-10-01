'use client'
import { IProductDetails } from "@/@types/product";
import { useRef, useState } from "react";

export default function InteractiveImage({ product }: { product: IProductDetails }) {
    const lensRef = useRef<HTMLDivElement>(null)
    const imgRef = useRef<HTMLImageElement>(null)
    const zoomRatio = 1.5 // 150% zoom
    const imgContainerRef = useRef<HTMLDivElement>(null)
    const [userImage, setUserImage] = useState<string | undefined>(undefined)

    const handleMouseMove = (e: React.MouseEvent) => {
        if (!lensRef.current || !imgRef.current) return
        const img = imgRef.current
        const lens = lensRef.current
        const bounds = img.getBoundingClientRect()
        // Get cursor position relative to the image
        let x = e.pageX - bounds.left - window.scrollX
        let y = e.pageY - bounds.top - window.scrollY
        // Set bounds for the lens
        x = Math.max(0, Math.min(x, img.width - lens.offsetWidth / zoomRatio))
        y = Math.max(0, Math.min(y, img.height - lens.offsetHeight / zoomRatio))
        // Position the lens
        lens.style.left = `${x}px`
        lens.style.top = `${y}px`
        // Set lens background position
        lens.style.backgroundPosition = `-${x * zoomRatio}px -${y * zoomRatio}px`
    }

    const handleMouseOver = () => {
        if (!lensRef.current || !imgRef.current) return
        const lens = lensRef.current
        const img = imgRef.current
        lens.style.display = 'block'
        lens.style.backgroundImage = `url(${img.src})`
        lens.style.backgroundSize = `${img.width * zoomRatio}px ${img.height * zoomRatio}px`
    }

    const handleMouseOut = () => {
        if (lensRef.current) lensRef.current.style.display = 'none'
    }

    return (
        <>
            <div className="product-details-image-wrapper">
                <div className="product-details-images-container">
                    <div className="product-details-left-images-wrapper">
                        {product.images.length > 0 ?
                            product.images.map((image: any) => {
                                return (
                                    <div key={image} className="left-image-container item-image">
                                        <img src={image} alt={image} onClick={() => imgRef.current!.src = image} />
                                    </div>
                                )
                            }) :
                            <div className="left-image-container item-image">
                                <img src='../assets/foryou1.png' alt='temp' />
                            </div>
                        }
                    </div>
                    <div className="product-image"
                        ref={imgContainerRef}
                        onMouseMove={handleMouseMove}
                        onMouseOver={handleMouseOver}
                        onMouseOut={handleMouseOut}
                    >
                        <div ref={lensRef} className='lens'></div>
                        <img ref={imgRef} src={product.images[0] ?? '../assets/foryou1.png'} />
                    </div>
                </div>
                <div className="customer-images-wrapper">
                    <span>Hình ảnh thực tế từ khách hàng</span>
                    <div className="customer-images-container">
                        {product.images.length > 0 ?
                            product.images.map(image => {
                                return (
                                    <div key={image} className="customer-image-container" onClick={() => setUserImage(image)} >
                                        <img src={image} alt={image} />
                                    </div>
                                )
                            }) :
                            <div className="customer-image-container">
                                <img src='../assets/foryou1.png' alt='temp' />
                            </div>
                        }
                    </div>
                </div>
            </div>

            <div className='user-review-box-overlay' style={{ display: `${userImage ? 'block' : 'none'}` }}>
                <div className="user-review-box-overlay-wrapper">
                    <div className="box-overlay-hidden" onClick={() => setUserImage(undefined)}>
                        <div></div>
                    </div>
                    <div className="user-review-image-wrapper">
                        <img src={userImage} className="preview-user-image" />
                        <div className="user-review-image-list">
                            {
                                product.images.map(image => {
                                    return (
                                        <img key={image} src={image} onClick={() => setUserImage(image)} />
                                    )
                                })
                            }
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}