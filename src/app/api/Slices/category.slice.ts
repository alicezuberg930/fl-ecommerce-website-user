import {
  AnyAction,
  createAsyncThunk,
  createSlice,
  PayloadAction,
} from "@reduxjs/toolkit"
import ENDPOINT from "../../common/api"
import { axiosInstance } from "../../../utils/axios"
import {
  FulfilledAction,
  PendingAction,
  RejectedAction,
} from "@/app/common/utils"

export interface Category {
  _id: string
  name: string
  description: string
  parentCategory: string
  thumbnail: string
  createdAt: string
  updatedAt: string
}

interface CategoryState {
  categories: Category[] | null
  loading: boolean
  currentRequestId: string | null
  error: string | null
  totalPages: number
}

const initialState: CategoryState = {
  categories: null,
  loading: false,
  currentRequestId: null,
  error: null,
  totalPages: 0,
}

export const fetchCategoryList = createAsyncThunk(
  "category/fetchCategoryList",
  async (id: { id?: string }, { rejectWithValue }) => {
    try {
      const response = await axiosInstance({ url: `${ENDPOINT.CATEGORIES}`, method: "GET" })
      return {
        categories: response.data.data.categories,
        totalPages: response.data.data.page
        // categories: response.data.categories.data.categories,
        // totalPages: response.data.categories.data.total,
      }
    } catch (error: any) {
      return rejectWithValue(error.message)
    }
  }
)

const categorySlice = createSlice({
  name: "categories",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(
      fetchCategoryList.fulfilled,
      (
        state,
        action: PayloadAction<{
          categories: Category[]
          totalPages: number
        }>
      ) => {
        state.categories = action.payload.categories
        state.totalPages = action.payload.totalPages
        state.loading = false
        state.error = null
      }
    ).addCase(fetchCategoryList.rejected, (state, action: AnyAction) => {
      state.loading = false
      state.error = action.payload as string
    }).addMatcher<PendingAction>(
      (action) => action.type.endsWith("/pending"),
      (state, action) => {
        state.loading = true
        state.currentRequestId = action.meta.requestId
      }
    ).addMatcher<RejectedAction | FulfilledAction>(
      (action) =>
        action.type.endsWith("/fulfilled") ||
        action.type.endsWith("/rejected"),
      (state, action) => {
        if (state.currentRequestId === action.meta.requestId) {
          state.loading = false
          state.currentRequestId = null
        }
      }
    )
  },
})

export default categorySlice.reducer
