import { configureStore } from "@reduxjs/toolkit";
import userReducer, {
    initialState as userState,
} from "../features/users/userSlice.js";
import tokenReducer, {
    initialState as tokenState,
} from "../features/token/tokenSlice.js";
import { tokenDecode } from "../features/token/thunks/tokenThunkActions.js";
import { saveState, loadState } from "./localStorage.js";

// import { setUser } from "../features/users/userSlice.js";
// const decodeToken = (store) => (next) => (action) => {
//     if ( action.type !== 'refreshToken/fulfilled'){
//         return next(action)
//     }
//     // const token = store.getState().user?.token;
//     const currentAction = action
//     const token = action.payload;
//     if (token !== null) {
//         const encodedToken = token.split(".")[1];
//         const decoded = JSON.parse(window.atob(encodedToken));
//         if (Date.now() < decoded.exp * 1000) {
//             // store.dispatch(setUserState(true));
//             store.dispatch(setUser(decoded));
//             // store.dispatch(currentAction)
//             // return
//             next(currentAction)
//         }
//     }
//     return next(action);
// };

const renewToken = (store) => (next) => (action) => {
    if (action.type.includes("Protected")) {
        store.dispatch(tokenDecode()).then((result) => {
            // if (result.type.endsWith("rejected")) {
            //     console.error("refresh token error: ", result);
            //     return next(action);
            // }
        });
    }
    return next(action);
};

export const store = configureStore({
    reducer: {
        user: userReducer,
        token: tokenReducer,
    },
    middleware: (getDefaultMiddleware) => [
        ...getDefaultMiddleware({ serializableCheck: false }),
        renewToken,
        // decodeToken,
    ],
    preloadedState: {
        user: loadState()?.user || userState,
        token: loadState()?.token || tokenState,
    },
});

store.subscribe(() => {
    saveState(store.getState());
});
