import { createSlice } from "@reduxjs/toolkit";
import { refreshToken } from './thunks/token.js'

export const initialState = {
    accessToken: null,
    status: false,
}

export const tokenSlice = createSlice({
    name: "token",
    initialState,
    reducers: {
        setToken: (state, action) => {
            state.token = action.payload;
        },
        resetState: () => {
            return { ...initialState };
        },
    },
    extraReducers(builder) {
        builder
        .addCase(refreshToken.fulfilled, (state, action) => {
            state.token = action.payload;
            state.status = "succeeded";
        })
        .addCase(refreshToken.rejected, () => {
            return { ...initialState };
        });
    }
});

export default tokenSlice.reducer;
export const tokenState = (state) => state.token;
export const { setToken, resetState } =tokenSlice.actions;
