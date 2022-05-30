import { createSlice } from "@reduxjs/toolkit";
import { tokenRefresh, tokenDecode } from "./thunks/tokenThunkActions.js";

export const initialState = {
    // iat: null,
    // exp: null,
    // payload: {},
    accessToken: null,
}

export const tokenSlice = createSlice({
    name: "token",
    initialState,
    reducers: {
        setToken: (state, action) => {
            state.token = action.payload;
        },
        resetTokenState: () => {
            return { ...initialState };
        },
        setTokenState: (state, action) => {
            console.log('setTokenState action : ', action)
            return { ...initialState, ...action.payload };
        },
    },
    extraReducers(builder) {
        builder
            .addCase(tokenDecode.fulfilled, (state, action) => {
                state.accessToken =  action.payload.accessToken;
            })
            .addCase(tokenRefresh.fulfilled, (state, action) => {
                state.token = action.payload;
                state.status = "succeeded";
            })
            .addCase(tokenRefresh.rejected, () => {
                return { ...initialState };
            });
    }
});

export default tokenSlice.reducer;
export const tokenState = (state) => state.token;
export const { setToken, resetTokenState, setTokenState } = tokenSlice.actions;
