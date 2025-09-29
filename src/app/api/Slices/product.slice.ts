import {
  FulfilledAction,
  PendingAction,
  RejectedAction,
} from "@/app/common/utils"
import {
  AnyAction,
  createSlice,
  createAsyncThunk,
  PayloadAction,
} from "@reduxjs/toolkit"
import ENDPOINT from "../../common/api"
import { axiosInstance } from "../../../utils/axios"
import { IProductDetails } from "@/@types/product"

interface ProductState {
  products2: Product[] | null
  products: Product[] | null
  selectedProduct: IProductDetails | null
  loading: boolean
  currentRequestId: string | null
  error: string | null
  totalProducts: number,
  totalProducts2: number,
}

const initialState: ProductState = {
  products2: null,
  products: null,
  selectedProduct: null,
  loading: false,
  currentRequestId: null,
  error: null,
  totalProducts: 0,
  totalProducts2: 0
}

// Fetch list of products
export const fetchProductList = createAsyncThunk(
  `product/`,
  async (
    { page, limit, category, brand }: { page: number, limit: number, category: string | null, brand: string | null },
    { rejectWithValue }
  ) => {
    try {
      const response = await axiosInstance.get(
        `${ENDPOINT.PRODUCTS}?page=${page}&limit=${limit}&category=${category ? category : ""}&brand=${brand ? brand : ""}`
      )
      return {
        totalProducts: response.data.data.products.filter((product: Product) => product.isDel != true).length,
        products: response.data.data.products
        // totalProducts: response.data.products.data.pagination.total,
        // products: response.data.products.data.products,
      }
    } catch (error: any) {
      return rejectWithValue(error.message)
    }
  }
)

export const fetchProductList2 = createAsyncThunk(
  `product/2`,
  async (
    { page, limit, category, brand }: { page: number, limit: number, category: string | null, brand: string | null },
    { rejectWithValue }
  ) => {
    try {
      const response = await axiosInstance.get(
        `${ENDPOINT.PRODUCTS}?page=${page}&limit=${limit}&category=${category ? category : ""}&brand=${brand ? brand : ""}`
      )
      return {
        totalProducts: response.data.data.products.filter((product: Product) => product.isDel != true).length,
        products: response.data.data.products
        // totalProducts: response.data.products.data.pagination.total,
        // products: response.data.products.data.products,
      }
    } catch (error: any) {
      return rejectWithValue(error.message)
    }
  }
)

export const fetchProductById = createAsyncThunk(
  "product/id",
  async (id: string, { rejectWithValue }) => {
    try {
      const response = await axiosInstance({ url: `${ENDPOINT.PRODUCT_DETAILS}/${id}`, method: "GET", params: { id } })
      // return response?.data?.product.product 
      return response.data.product
    } catch (error: any) {
      return rejectWithValue(error.message)
    }
  }
)

const productSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    clearSelectedProduct(state) {
      state.selectedProduct = null
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchProductList.fulfilled, (state, action: PayloadAction<{ products: Product[], totalProducts: number }>) => {
      state.products = action.payload.products
      state.loading = false
      state.error = null
      state.totalProducts = action.payload.totalProducts
    }).addCase(fetchProductList.rejected, (state, action: AnyAction) => {
      state.loading = false
      state.error = action.payload as string
    }).addCase(fetchProductList2.fulfilled, (state, action: PayloadAction<{ products: Product[], totalProducts: number }>) => {
      state.products2 = action.payload.products
      state.loading = false
      state.error = null
      state.totalProducts2 = action.payload.totalProducts
    }).addCase(fetchProductList2.rejected, (state, action: AnyAction) => {
      state.loading = false
      state.error = action.payload as string
    }).addCase(fetchProductById.fulfilled, (state, action: PayloadAction<IProductDetails>) => {
      state.selectedProduct = action.payload
      state.loading = false
      state.error = null
    }).addCase(fetchProductById.rejected, (state, action: AnyAction) => {
      state.loading = false
      state.error = action.payload as string
    }).addMatcher<PendingAction>((action) => action.type.endsWith("/pending"), (state, action) => {
      state.loading = true, state.currentRequestId = action.meta.requestId
    }).addMatcher<RejectedAction | FulfilledAction>((action) => action.type.endsWith("/fulfilled") || action.type.endsWith("/rejected"), (state, action) => {
      if (state.currentRequestId === action.meta.requestId) {
        state.loading = false
        state.currentRequestId = null
      }
    })
  }
})

// export const { clearSelectedProduct } = productSlice.actions
export default productSlice.reducer