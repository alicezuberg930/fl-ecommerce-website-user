'use client'
import { IRating } from "@/@types/rating"
import { APIResponse } from "@/@types/response"
import { icons } from "@/app/common/icons"
import useRating from "@/hooks/api/useRating"
import { API_ENDPOINT } from "@/routes/api"
import { RefObject, useEffect } from "react"

export default function RatingList({ commentRef, product }: { commentRef: RefObject<HTMLDivElement>, product: string }) {
    const { FaStar, MdThumbUp, FaRegTrashCan } = icons
    const { getRatings, setQuery } = useRating()
    const { data: response, isLoading, isError, error } = getRatings()

    useEffect(() => {
        setQuery(prev => ({ ...prev, product }))
    }, [product])

    // const handleDeleteComment = async (id: string) => {
    //     try {
    //     } catch (error) {
    //     }
    // }

    // const submitReply = async (e: FormEvent<HTMLFormElement>, id: string) => {
    //     e.preventDefault()
    //     try {
    //     } catch (error) {
    //     }
    // }

    // const handleLikeDislike = async (id: string) => {
    //     try {
    //     } catch (error) {
    //     }
    // }

    return (
        <div className="box_reviews">
            <div className="tt_box_detail">Đánh giá</div>
            <div className="ct_box_detail">
                <div className="box_rating">
                    <div className="box_total_rating">
                        <div className="block_total_left">
                            <div className="txt_top_total_left">Đánh giá trung bình</div>
                            <div className="row">
                                <div className="block_number_total">
                                    <div className="txt_number">4.0</div>
                                    <div className="block_start">
                                        <FaStar fill="#fda01e" />
                                        <FaStar fill="#fda01e" />
                                        <FaStar fill="#fda01e" />
                                        <FaStar fill="#fda01e" />
                                        <FaStar fill="#fda01e" />
                                    </div>
                                    <div className="txt_total_nhanxet">14 nhận xét</div>
                                </div>
                                <div className="block_detail_number">
                                    <div className="row_detail_number">
                                        <span className="txt_number_start">5 sao</span>
                                        <div className="block_percent_rate">
                                            <span></span>
                                        </div>
                                        <span className="number_rating"> 12</span>Rất hài lòng
                                    </div>
                                    <div className="row_detail_number">
                                        <span className="txt_number_start">4 sao</span>
                                        <div className="block_percent_rate">
                                            <span></span>
                                        </div>
                                        <span className="number_rating"> 0 </span>Hài lòng
                                    </div>
                                    <div className="row_detail_number">
                                        <span className="txt_number_start">3 sao</span>
                                        <div className="block_percent_rate">
                                            <span></span>
                                        </div>
                                        <span className="number_rating"> 0 </span>Bình thường
                                    </div>
                                    <div className="row_detail_number">
                                        <span className="txt_number_start">2 sao</span>
                                        <div className="block_percent_rate">
                                            <span></span>
                                        </div>
                                        <span className="number_rating"> 0 </span>Không hài lòng
                                    </div>
                                    <div className="row_detail_number">
                                        <span className="txt_number_start">1 sao</span>
                                        <div className="block_percent_rate">
                                            <span></span>
                                        </div>
                                        <span className="number_rating"> 0 </span>Rất tệ
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="block_total_right">
                            <div className="text_share">Chia sẻ nhận xét của bạn về sản phẩm này</div>
                            <button className="comment-button" onClick={() => commentRef.current!.style.display = "block"}>Bình luận</button>
                        </div>
                    </div>

                    <div className="box_comment">
                        <div className="title_box_comment">
                            <div className="txt_total_comment">{response?.data?.length ?? 0} bình luận cho sản phẩm này</div>
                            <div className="filter_comment">
                                <select className="filter_input">
                                    <option>Ngày đánh giá</option>
                                    <option>Đánh giá tốt nhất</option>
                                    <option>Đánh giá tệ nhất</option>
                                    <option>Đã mua hàng</option>
                                </select>
                            </div>
                        </div>
                        <div className="list_comment">
                            {response?.data &&
                                response?.data.map(review => {
                                    const isLiked = true
                                    //  review.likes?.find(like => like === user!._id)
                                    const isDeletable = true
                                    // review.userId?._id === user!._id
                                    return (
                                        <div key={review._id} className="item_comment">
                                            <div className="title_comment">
                                                <div className="block_start">
                                                    {
                                                        [...Array(5)].map((_, i) => {
                                                            return (
                                                                <FaStar key={i} fill={i < review.star ? "#FFD700" : "#949494"} />
                                                            )
                                                        })
                                                    }
                                                </div>
                                                <strong className="txt_color_1">{review.user?.name}</strong>
                                                <div className="txt_999">{review._id}</div>
                                                {/* <MdThumbUp fill={isLiked ? "#0468fc" : "#21354e"} onClick={() => handleLikeDislike(review._id!)} /> */}
                                                {/* {isDeletable && <FaRegTrashCan fill='red' onClick={() => handleDeleteComment(review._id!)} />} */}
                                                <div className="timer_comment">{review.createdAt!.split("T")[0]}</div>
                                            </div>
                                            <div className="content_comment">{review.content}</div>
                                            <div className="replies-container">
                                                <div className="reply-title">Phản hồi</div>
                                                {/* {
                                                    review.replies && review.replies.length > 0 ? review.replies?.map(reply => {
                                                        return (
                                                            <div className="reply-message" key={reply._id}>
                                                                <span>{reply.comment}</span>
                                                                <div className="reply-date">{reply.createdAt!.split("T")[0]}</div>
                                                            </div>
                                                        )
                                                    }) : <span>Bình luận chưa có phản hồi</span>
                                                } */}
                                                {/* <form onSubmit={(e) => submitReply(e, review._id!)} className="reply-input-container">
                                                    <input value={reply} onChange={(e) => setReply(e.target.value)} placeholder="Viết phản hồi" className="reply-input" type="text" />
                                                </form> */}
                                            </div>
                                        </div>
                                    )
                                })
                            }
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}