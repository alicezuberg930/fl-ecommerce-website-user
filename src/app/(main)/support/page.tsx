'use client'
import '@/app/styles/css/support.css'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import NewProducts from '../../../sections/home/NewProducts'
import ProductCard from "@/sections/product/ProductCard"

const SupportPage: React.FC = () => {
  const [page, setPage] = useState(1)
  const limit = 15

  useEffect(() => {
  }, [page])

  return (
    <div className='customer-support-wrapper'>
      <div className='customer-support-container'>
        <div className='banner'>
          <div className='banner-w'>
            <p>Xin chào! Chúng tôi có thể giúp gì cho bạn?</p>
            <div className='banner-w-input'>
              <input />
            </div>
            <div className='banner-w-inbox'>
              <div className='banner-w-inbox-div'>
                <img src='assets/call.png' />
                <span>
                  0888.800.100 <p>(Miễn phí)</p>
                </span>
              </div>
              <div className='banner-w-inbox-div'>
                <img src='assets/message.png' />
                <span>Chat</span>
              </div>
            </div>
          </div>
        </div>

        <div className='optional'>
          {
            arr?.map(item => {
              return (
                <div className='optional-w'>
                  <div className='optional-w-c'>
                    <img src={item.img} />
                    <span>{item.title}</span>
                  </div>
                </div>
              )
            })
          }
        </div>

        <div className='frequently-asked-questions'>
          <p>Câu hỏi thường gặp</p>
          <div className='frequently-asked-questions-container'>
            <div className='frequently-asked-questions-item'>
              {
                comment1.map(item => {
                  return (
                    <div>
                      <span>{item.title}</span>
                    </div>
                  )
                })
              }
            </div>

            <div className='frequently-asked-questions-item'>
              {
                comment2.map(item => {
                  return (
                    <div>
                      <span>{item.title}</span>
                    </div>
                  )
                })
              }
            </div>
          </div>
        </div>
        <div className='seen-products-wrapper'>
          <div className='seen-products-title'>
            <h1>Sản phẩm đã xem</h1>
          </div>
          {/* {!products ? <></> :
            <div className='seen-products-container'>
              {
                products.slice(0, 5)?.map((product: Product, index: any) => {
                  return (
                    <ProductCard key={index} product={product} aspectRatio={'1/1'} />
                  )
                })
              }
            </div>
          } */}
        </div>
      </div>
    </div>
  )
}

export default SupportPage

const arr = [
  {
    img: '/assets/support/account-logo.png',
    title: 'Tài khoản',
  },
  {
    img: '/assets/support/delivery-logo.png',
    title: 'Đặt hàng',
  },
  {
    img: '/assets/support/cardboard-box-logo.png',
    title: 'Sản phẩm',
  },
  {
    img: '/assets/support/brand-logo.png',
    title: 'Thương hiệu',
  },
  {
    img: '/assets/support/packaging-logo.png',
    title: 'Quy cách đóng gói',
  },
  {
    img: '/assets/support/hiring-logo.png',
    title: 'Tuyển dụng',
  },
]
const comment1 = [
  {
    title: 'Future Life kinh doanh những gì?',
  },
  {
    title: 'Future Life có chính sách đổi trả hàng không?',
  },
  {
    title: 'Future Life có các chương trình khuyến mãi nào?',
  },
]

const comment2 = [
  {
    title: 'Future Life có hỗ trợ giao hàng không?',
  },
  {
    title: 'Các hình thức thanh toán Future Life chấp nhận?',
  },
  {
    title: 'Cách để nhận mã khuyến mãi từ Future Life?',
  },
]
