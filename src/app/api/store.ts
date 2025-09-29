import { configureStore } from "@reduxjs/toolkit"
import { useDispatch as useAppDispatch } from 'react-redux'
import UserReducer from "./Slices/user.slice"
import Productslist from "./Slices/product.slice"
import CategoryList from "./Slices/category.slice"
import Productdetail from "./Slices/product.slice"
import footerSlice from "./Slices/footer.slice"
import brandSlice from "./Slices/brand.slice"

export const store = configureStore({
  reducer: {
    User: UserReducer,
    Products: Productslist,
    CategoryList: CategoryList,
    Product: Productdetail,
    footer: footerSlice,
    brand: brandSlice
  }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
const useDispatch = () => useAppDispatch<AppDispatch>()
export { useDispatch }