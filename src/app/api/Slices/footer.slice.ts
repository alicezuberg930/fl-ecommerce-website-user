import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import ENDPOINT from "../../common/api";
import axios from "axios";

export interface Config {
    company?: string,
    slogan?: string,
    phone?: string,
    telephone?: string,
    hotline?: string,
    address?: string,
    openHour?: string,
    googleMap?: string,
    email?: string,
    zaloChatURL?: string,
    facebookChatURL?: string,
    facebookPage?: string,
    googlePage?: string,
    youtubePage?: string,
    footerInfo?: string,
    footerContact?: {
        label?: string,
        phone?: string,
        email?: string,
    }[],
    fax?: string,
    facebookID?: string
}

interface ConfigState {
    config: Config
    loading: boolean
    error: string | null
}
const initialState: ConfigState = {
    config: {},
    loading: false,
    error: null,
};

export const fetchSiteConfigs = createAsyncThunk("site/configs", async () => {
    const response = await axios.get(ENDPOINT.CONFIGS);
    return response?.data?.data;
});

const footerSlice = createSlice({
    name: "site.configs",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchSiteConfigs.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(
                fetchSiteConfigs.fulfilled,
                (state, action: PayloadAction<Config>) => {
                    state.config = action.payload;
                    state.loading = false;
                }
            )
            .addCase(fetchSiteConfigs.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || "Failed to get site configs";
            });
    },
});

export default footerSlice.reducer