'use client'
import { icons } from "@/app/common/icons";
import { FormEvent, RefObject, useState } from "react";

export default function RatingBox({ commentRef, productId }: { commentRef: RefObject<HTMLDivElement>, productId: string }) {
    const [selectedStars, setSelectedStars] = useState(0)
    const { FaStar } = icons

    const handleCreateReview = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        const formData = new FormData(e.currentTarget)
        const entries = Object.fromEntries(formData.entries())

        commentRef.current!.style.display = "none"
    }

    return (
        <div className='comment-box-overlay' ref={commentRef}>
            <div className="comment-box-overlay-wrapper">
                <div className="box-overlay-hidden" onClick={() => commentRef.current!.style.display = "none"}>
                    <div></div>
                </div>
                <form onSubmit={handleCreateReview} className="comment-box-wrapper">
                    <span>Đánh giá sản phẩm này</span>
                    <div className="star-container">
                        {[...Array(5)].map((_, index) => (
                            <FaStar key={index} size={34} fill={index < selectedStars ? "#FFD700" : "#949494"} onClick={() => setSelectedStars(index + 1)} />
                        ))}
                    </div>
                    <div className="comment-description">
                        <span>Mô tả sản phẩm này</span>
                        <span>Ký tự còn lại 2500</span>
                    </div>
                    <textarea name="comment" className="comment-input" placeholder="Nhập mô tả tại đây"></textarea>
                    <div className="comment-pick-image-container">
                        <span>Thêm hình ảnh nếu (tối đa 5 hình):</span>
                        <button className="pick-image-button"><b>Chọn hình</b></button>
                    </div>
                    <div className="comment-action-container">
                        <button type="reset" className="comment-action-button" onClick={() => commentRef.current!.style.display = "none"}><b>Bỏ qua</b></button>
                        <button className="comment-action-button"><b>Gửi</b></button>
                    </div>
                </form>
            </div>
        </div>
    )
}