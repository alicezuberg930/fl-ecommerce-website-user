'use client'
import React, { createContext, Dispatch, SetStateAction, useContext, useEffect, useState } from 'react'

interface ProductContextType {
  categoryID: string
  setIdcategory: any
  categoryLanding: any
  setCategoryLanding: any,
  brandID: string,
  setBrandID: Dispatch<SetStateAction<string>>
}
interface ProductProviderProps {
  children: any
}
const ProductContext = createContext<ProductContextType | undefined>(undefined)

export const useProductContext = () => {
  const context = useContext(ProductContext)
  if (!context) {
    throw new Error('useProductContext must be used within a ProductProvider')
  }
  return context
}

export const ProductProvider: React.FC<ProductProviderProps> = ({
  children,
}) => {
  const [categoryID, setIdcategory] = useState<string>('')
  const [categoryLanding, setCategoryLanding]: any = useState()
  const [brandID, setBrandID] = useState<string>('')

  return (
    <ProductContext.Provider
      value={{
        categoryID,
        setIdcategory,
        categoryLanding,
        setCategoryLanding,
        brandID,
        setBrandID
      }}
    >
      {children}
    </ProductContext.Provider>
  )
}
