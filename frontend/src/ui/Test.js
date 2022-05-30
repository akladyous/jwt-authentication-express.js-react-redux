import { userState } from "../features/users/userSlice.js";
import { useSelector, useDispatch } from "react-redux";
import { axiosPrivate } from '../api/axios.js'
import { Protectedtest } from "../features/users/userSlice.js";
// import { refreshToken } from "../features/token/thunks/token.js";
import { tokenRefresh } from "../features/token/thunks/tokenThunkActions.js";

export default function Test() {
    const {token} = useSelector(userState);
    const dispatch = useDispatch();
    

    const handleTest = async () =>{
        dispatch(Protectedtest());
        try {
            const response = await axiosPrivate.get("/test", {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            // console.log('test endpoint response : ', response)
        } catch (error) {
            console.log("test endpoint error : ", error);
        }
    }

    const accessToken = async () =>{
            dispatch(tokenRefresh())
                .unwrap()
                .then((result) => {
                    console.log("result from dispatch fulfilled : ", result);
                })
                .catch((error) => {
                    console.log("result from dispatch rejected : ", error);
                });
    }

    return (
        <div className="container">
            <h1>Test page</h1>

            <br />
            <div>
                <button onClick={handleTest}>test route</button>
                {/* <p className="text-break">{token}</p> */}
            </div>
            <br />
            <div className="container">
                <button onClick={accessToken}>accessToken</button>
                <p className="text-break">{token}</p>
            </div>
        </div>
    );
}
