import { axiosPrivate } from "../api/axios.js";
import { useEffect, useState } from "react";

import { useSelector } from "react-redux";
import { userState } from "../features/users/userSlice.js";

export default function Home() {
    const [counter, setCounter] = useState(0);
    const [hashedPassword, setHashedPassword] = useState("");
    const [status, setState] = useState(false);

    const state = useSelector(userState);

    useEffect(() => {
        const controller = new AbortController();
        if (status) {
            const config = {
                headers: {Authorization: `Bearer ${state.token}`},
                signal: controller.signal,
                data: JSON.stringify({
                    email: "user1@milano.com",
                    password: "user1@milano.com",
                }),
            };
            (async () => {
                try {
                    const response = await axiosPrivate.post('/home', config);
                    setCounter(response.data.counter);
                    setHashedPassword(response.data.password);
                    console.log("response : ", response);
                    console.log('response from home : ', response)
                    return response.data;
                } catch (error) {
                    console.log("error : ", error);
                    // throw new Error(error);
                }
            })();
        }
        return () => {
            controller.abort()
            setState(false);
        };
    }, [status]);

    // console.log()

    return (
        <>
            <div className="container">
                <h1>home page</h1>
                <div>
                    <p>{counter}</p>
                </div>
                <button
                    onClick={() => {
                        setState(true);
                    }}
                >
                    seed
                </button>
                <br />
                <textarea name="token" id="" cols="30" rows="10">
                    
                </textarea>
            </div>
        </>
    );
}
