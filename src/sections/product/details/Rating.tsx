'use client'
import { useRef } from "react";
import RatingList from "./RatingList";
import RatingBox from "./RatingBox";

export default function Rating({ productId }: { productId: string }) {
    const commentRef = useRef<HTMLDivElement>(null)

    return (
        <>
            <RatingList commentRef={commentRef} productId={productId} />
            <RatingBox commentRef={commentRef} productId={productId} />
        </>
    )
}