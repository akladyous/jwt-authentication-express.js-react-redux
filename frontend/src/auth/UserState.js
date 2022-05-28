import { useEffect, useCallback } from "react";
import {
    userState,
    resetUser,
    setUser,
    setUserState,
} from "../features/users/userSlice.js";
import { useSelector, useDispatch } from "react-redux";

export default function UserState () {
    const {token} = useSelector(userState);
    const dispatch = useDispatch();

    const getPayload = useCallback( (token) => {
        try {
            const encodedPayload = token.split(".")[1];
            const decoded = JSON.parse(window.atob(encodedPayload))
            if (decoded.hasOwnProperty('exp')){
                if(Date.now() <= decoded.exp * 1000){
                    return decoded;
                } else {
                    throw new Error('token expired')
                }

            }
        } catch (err){
            // console.error(err.message)
            return null
        }
    },[])

    useEffect(() => {
        let isMounted = true;
        if (isMounted) {
            const decodedToken = getPayload(token);
            if (!token || decodedToken === null) {
                dispatch(resetUser());
            } else {
                dispatch(setUser(decodedToken));
                dispatch(setUserState(true));
            }
        }

        return () => {
            isMounted = false;
        };
    }, [token, dispatch, getPayload]);
};