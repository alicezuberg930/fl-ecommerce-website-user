'use client'
import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import '@/app/styles/css/brand.menu.filter.css'
import { icons } from '@/app/common/icons'
import { usePathname, useRouter } from 'next/navigation'
import useQueryString from '@/hooks/useQueryString'

const BrandFilterMenu = () => {
    const { AiFillCaretRight } = icons
    const router = useRouter()
    const pathname = usePathname()
    const createQueryString = useQueryString()

    const setParams = (id: string | null) => {
        router.replace(pathname + "?" + createQueryString("brand", id))
    }

    return (
        <div className='brand-menu-filter-wrapper'>
            <div className='brand-menu-filter-title' onClick={() => setParams(null)}>
                <img src='/assets/Group.png' alt='Icon' />
                <h1>Tất Cả thương hiệu</h1>
            </div>
            <div className='brand-menu-filter-container'>
                {
                    // brands?.map(brand => {
                    //     return (
                    //         <div className='brand-menu-select-item' key={brand._id}>
                    //             <div className='brand-menu-select-title' onClick={() => setParams(brand._id)}>
                    //                 <AiFillCaretRight />
                    //                 <h1>{brand.name}</h1>
                    //             </div>
                    //         </div>
                    //     )
                    // })
                }
            </div>
        </div>
    )
}

export default BrandFilterMenu