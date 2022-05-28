import { useEffect } from "react";
import { auth } from "./firebaseInit.js";
import { useDispatch } from "react-redux";
import { onAuthStateChanged } from "firebase/auth";
import {
    setUserStatus,
    setUser,
    setError,
    resetState,
} from "../features/users/userSlice.js";

export default function UserAuthListener({ children }) {
    const dispatch = useDispatch();

    useEffect(() => {
        const unSubscribe = onAuthStateChanged(
            auth,
            (user) => {
                if (user) {
                    dispatch(setUserStatus(true));
                    dispatch(setUser(user));
                } else {
                    dispatch(resetState());
                }
            },
            (error) => {
                dispatch(setError(error.message));
            }
        );

        return () => unSubscribe;

    }, [dispatch]);

    return <>{children}</>;
}
