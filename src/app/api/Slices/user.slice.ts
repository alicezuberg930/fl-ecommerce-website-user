import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  FulfilledAction,
  PendingAction,
  RejectedAction,
} from "@/app/common/utils";
import axios from "axios";

const initialState: any = {};

const UserSlice = createSlice({
  name: "User",
  initialState,
  reducers: {
    //
  },
  extraReducers(builder) {
    builder
      .addMatcher<PendingAction>(
        (action) => action.type.endsWith("/pending"),
        (state, action) => {
          state.loading = true;
          state.currentRequestId = action.meta.requestId;
        }
      )
      .addMatcher<RejectedAction | FulfilledAction>(
        (action) =>
          action.type.endsWith("/rejected") ||
          action.type.endsWith("/fulfilled"),
        (state, action) => {
          if (
            state.loading &&
            state.currentRequestId === action.meta.requestId
          ) {
            state.loading = false;
            state.currentRequestId = null;
          }
        }
      );
  },
});

export default UserSlice.reducer;