"use client"
import React, { useEffect } from "react"
import { AiFillCaretRight } from "react-icons/ai"
import { useSelector } from "react-redux"
import '@/app/styles/css/category.menu.filter.css'
import { usePathname, useRouter } from "next/navigation"
import useQueryString from "@/hooks/useQueryString"

const CategoryFilterMenu = () => {
  const pathname = usePathname()
  const router = useRouter()
  const createQueryString = useQueryString();

  const setParams = (id: string | null) => {
    router.replace(pathname + "?" + createQueryString("category", id))
  }

  return (
    <div className='category-menu-filter-wrapper'>
      <div className='category-menu-filter-title' onClick={() => setParams(null)}>
        <img src="/assets/Group.png" alt="Icon" />
        <h1>Tất Cả Danh Mục</h1>
      </div>
      <div className='category-menu-filter-container'>
        {
          // categories?.map(category => {
          //   return (
          //     <div className='category-menu-select-item' key={category._id}>
          //       <div className='category-menu-select-title' onClick={() => setParams(category._id)}>
          //         <AiFillCaretRight />
          //         <h1>{category.name}</h1>
          //       </div>
          //     </div>
          //   )
          // })
        }
      </div>
    </div>
  )
}

export default CategoryFilterMenu