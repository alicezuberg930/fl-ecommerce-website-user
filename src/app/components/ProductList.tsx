"use client"
import React from "react"
import "@/app/styles/css/products.list.css"
import ProductCard from "./ProductCard"

const ProductList = ({ products }: any) => {

  return (
    <div className="list-wrapper">
      {
        products?.map((product: any, i: number) => {
          return (
            <ProductCard product={product} key={i} aspectRatio={'1/1.2'} />
          )
        })
      }
    </div>
  )
}

export default ProductList