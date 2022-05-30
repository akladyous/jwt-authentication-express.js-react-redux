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
} from "./thunks/userThunkActions.js";

export const initialState = {
    isAuthenticated: false,
    user: null,
    status: "idle", // idle | loading | succeeded | failed
    error: {},
    message: "",
    // token: null,
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
    },
    extraReducers(builder) {
        builder
            .addCase(userLogin.fulfilled, (state, action) => {
                state.isAuthenticated = true;
                state.error = {};
                state.message = "Login successfullt completed";
                state.user = action.payload;
                console.log('userlogin SLICE action payload : ', action.payload)
            })
            .addCase(userLogin.rejected, (state, action) => {
                state.error = action.payload
            })
            .addCase(userSignOut.fulfilled, (state) => {
                return { ...initialState };
            })
            .addCase(userSignUp.fulfilled, (state, action) => {
                state.isAuthenticated = true;
                state.error = {};
                state.message = "Account successfully created";
                state.user = action.payload;
            })
            .addCase(userSignUp.rejected, (state, action) =>{
                state.error = {message: action.payload}
            })
            .addMatcher(isPendingAction, (state) => {
                state.status = "loading";
            })
            .addMatcher(isFulfilledAction, (state) => {
                state.status = "succeeded";
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
