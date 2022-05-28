import {
    createSlice,
    isPending,
    isRejected,
    isFulfilled,
} from "@reduxjs/toolkit";

import {
    userLogin,
    userSignOut,
    userSignUp,
    refreshToken,
} from "../../auth/useAuthentication.js";

export const initialState = {
    isAuthenticated: false,
    user: null,
    status: "idle", // idle | loading | succeeded | failed
    error: {},
    message: "",
    token: null,
};

const isPendingAction = isPending(userLogin, userSignOut, userSignUp);
const isRejectedAction = isRejected(userLogin, userSignOut, userSignUp);
const isFulfilledAction = isFulfilled(userLogin, userSignOut, userSignUp);

export const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        setUserState: (state, action) => {
            state.isAuthenticated = action.payload;
        },
        setUser: (state, action) => {
            state.user = action.payload;
        },
        resetUser: (state) => {
            state.user = null;
        },
        resetState: () => {
            localStorage.removeItem("token");
            return { ...initialState };
        },
        setToken: (state, action) => {
            state.token = action.payload;
        },
        Protectedtest: (state, action) => {
            // console.log('test action')
        },
    },
    extraReducers(builder) {
        builder
            .addCase(refreshToken.fulfilled, (state, action) => {
                state.token = action.payload;
                state.status = "succeeded";
            })
            .addCase(refreshToken.rejected, (state, action) => {
                return { ...initialState, error: { message: action.payload } };
            })
            .addCase(userLogin.fulfilled, (state, action) => {
                state.isAuthenticated = true;
                state.error = {};
                state.message = "Login successfullt completed";
                state.token = action.payload;
                state.status = "succeeded";
                // console.log('userlogin action payload : ', action.payload)
            })
            .addCase(userLogin.rejected, (state) => {
                localStorage.removeItem("token");
            })
            .addCase(userSignOut.fulfilled, (state) => {
                return { ...initialState };
            })
            .addCase(userSignUp.fulfilled, (state, action) => {
                state.isAuthenticated = true;
                state.error = {};
                state.message = "Account successfully created";
                state.token = action.payload;
            })
            .addMatcher(isPendingAction, (state) => {
                state.status = "loading";
            })
            .addMatcher(isFulfilledAction, (state) => {
                state.status = "idle";
            })
            .addMatcher(isRejectedAction, (state, action) => {
                state.status = "failed";
                // state.error = action.error.message;
                state.error = { ...action.payload };
            });
    },
});
export const userState = (state) => state.user;
export const { setUserState, setUser, resetUser, resetState, Protectedtest } =
    userSlice.actions;
export default userSlice.reducer;
