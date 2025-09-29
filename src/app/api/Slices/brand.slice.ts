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

interface BrandState {
    brands: Brand[] | null
    loading: boolean
    currentRequestId: string | null
    error: string | null
    totalPages: number
}

const initialState: BrandState = {
    brands: null,
    loading: false,
    currentRequestId: null,
    error: null,
    totalPages: 0,
}

export const fetchBrandList = createAsyncThunk(
    "brand/fetchBrandList",
    async (id: string | undefined, { rejectWithValue }) => {
        try {
            const response = await axiosInstance({ url: `${ENDPOINT.BRANDS}`, method: "GET" })
            return {
                brands: response.data.data,
                // brands: response.data.brands.data,
                totalPages: 1,
            }
        } catch (error: any) {
            return rejectWithValue(error.message)
        }
    }
)

const brandSlice = createSlice({
    name: "brands",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(
            fetchBrandList.fulfilled,
            (
                state,
                action: PayloadAction<{
                    brands: Brand[]
                    totalPages: number
                }>
            ) => {
                state.brands = action.payload.brands
                state.totalPages = action.payload.totalPages
                state.loading = false
                state.error = null
            }
        ).addCase(fetchBrandList.rejected, (state, action: AnyAction) => {
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

export default brandSlice.reducer