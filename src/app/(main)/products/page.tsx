'use client'
import { useEffect, useState } from 'react'
import CategoryFilter from './components/CategoryFilterMenu'
import ProductList from '../../components/ProductList'
import { FaFilter } from 'react-icons/fa'
import { useSelector } from 'react-redux'
import BrandFilterMenu from './components/BrandFilterMenu'
import CustomPaginator from '../../components/CustomPaginator'
import '@/app/styles/css/products.filter.css'
import { useSearchParams } from 'next/navigation'
import LoadingShimmer from '../../components/LoadingShimmer'

const ProductsFilterPage = () => {
  const [page, setPage] = useState(1)
  const limit = 8
  const searchParams = useSearchParams()
  const brand = searchParams!.get('brand')
  const category = searchParams!.get('category')

  return (
    <div className='products-filter-wrapper'>
      <div className='products-filter-container'>
        <div className='products-filter-menu'>
          <CategoryFilter />
          <div className='separator'></div>
          <BrandFilterMenu />
        </div>
        <div className='products-filter-list-container'>
          <div className='products-filter-list'>
            <div className='products-filter-list-found'>
              <p>Tìm Thấy <span>{"totalProducts"}</span> Sản Phẩm</p>
            </div>
            <div className='products-filter-icon'>
              <FaFilter size={24} />
            </div>
            {/* <div>
              <Fillborder>
                <FaFilter className='fill-an' />
                {
                  // mobile filter menu
                }
              </Fillborder>
            </div> */}
          </div>
          {
            // loading ? <LoadingShimmer /> : <ProductList products={products} loading={loading} />
          }
          <div className='paginator-container'>
            {/* <CustomPaginator currentPage={page} totalPage={Math.ceil(totalProducts / limit)} setCurrentPage={setPage} /> */}
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProductsFilterPage