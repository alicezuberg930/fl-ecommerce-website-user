import sum from 'lodash/sum'
import uniq from 'lodash/uniq'
import uniqBy from 'lodash/uniqBy'
import { createSlice, Dispatch } from '@reduxjs/toolkit'
// utils
import { IProductCheckoutState } from '@/@types/product'
import { ICartItem } from '@/@types/cart'

// ----------------------------------------------------------------------

const initialState: IProductCheckoutState = {
  // isLoading: false,
  // error: null,
  // products: [],
  // product: null,
  activeStep: 0,
  cart: [],
  subtotal: 0,
  total: 0,
  discount: 0,
  shipping: 0,
  billing: null,
  totalItems: 0,
}

const slice = createSlice({
  name: 'product',
  initialState,
  reducers: {
    // CHECKOUT
    getCart(state, action) {
      const cart: ICartItem[] = action.payload

      const totalItems = sum(cart.map((product) => product.quantity))
      const subtotal = sum(cart.map((product) => product.variation.price * product.quantity))
      state.cart = cart
      state.discount = state.discount || 0
      state.shipping = state.shipping || 0
      state.billing = state.billing || null
      state.subtotal = subtotal
      state.total = subtotal - state.discount
      state.totalItems = totalItems
    },

    addToCart(state, action) {
      const newProducts: ICartItem[] = action.payload
      // const isEmptyCart = !state.cart.length
      // state.cart.push(newProducts)
      // if (isEmptyCart) {
      //   state.cart = [...state.cart, newProduct]
      // } else {
      //   state.cart = state.cart.map((product) => {
      //     const isExisted = product._id === newProduct._id
      //     if (isExisted) {
      //       return {
      //         ...product,
      //         quantity: product.quantity + 1,
      //       }
      //     }
      //     return product
      //   })
      // }
      state.cart = uniqBy(newProducts, '_id')
      state.totalItems = sum(state.cart.map(product => product.quantity))
    },

    deleteCart(state, action) {
      const updateCart = state.cart.filter(product => product._id !== action.payload)
      state.cart = updateCart
    },

    resetCart(state) {
      state.cart = []
      state.billing = null
      state.activeStep = 0
      state.total = 0
      state.subtotal = 0
      state.discount = 0
      state.shipping = 0
      state.totalItems = 0
    },

    backStep(state) {
      state.activeStep -= 1
    },

    nextStep(state) {
      state.activeStep += 1
    },

    gotoStep(state, action) {
      const step = action.payload
      state.activeStep = step
    },

    // increaseQuantity(state, action) {
    //   const productId = action.payload

    //   const updateCart = state.checkout.cart.map((product) => {
    //     if (product.id === productId) {
    //       return {
    //         ...product,
    //         quantity: product.quantity + 1,
    //       }
    //     }
    //     return product
    //   })

    //   state.checkout.cart = updateCart
    // },

    // decreaseQuantity(state, action) {
    //   const productId = action.payload
    //   const updateCart = state.checkout.cart.map((product) => {
    //     if (product.id === productId) {
    //       return {
    //         ...product,
    //         quantity: product.quantity - 1,
    //       }
    //     }
    //     return product
    //   })

    //   state.checkout.cart = updateCart
    // },

    createBilling(state, action) {
      state.billing = action.payload
    },

    applyDiscount(state, action) {
      const discount = action.payload
      state.discount = discount
      state.total = state.subtotal - discount
    },

    applyShipping(state, action) {
      const shipping = action.payload
      state.shipping = shipping
      state.total = state.subtotal - state.discount + shipping
    },
  },
})

// Reducer
export default slice.reducer

// Actions
export const {
  getCart,
  addToCart,
  resetCart,
  gotoStep,
  backStep,
  nextStep,
  // deleteCart,
  createBilling,
  applyShipping,
  applyDiscount,
  // increaseQuantity,
  // decreaseQuantity,
} = slice.actions
