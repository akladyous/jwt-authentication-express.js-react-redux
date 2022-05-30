import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { userLogin } from "../features/users/thunks/userThunkActions.js";
import { userState, setUser } from "../features/users/userSlice.js";
import { setToken, setTokenState } from "../features/token/tokenSlice.js";
import { useNavigate, useLocation } from "react-router-dom";
// import useIsMounted from "../hooks/useIsMounted.js";

export default function UsersLogin() {
    const dispatch = useDispatch();
    const state = useSelector(userState);

    const navigate = useNavigate();
    const location = useLocation();
    const from = location.state?.from?.pathname || '/';
    // console.log("location.state : ", location.state);

    // const isMounted = useIsMounted();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");




    const handleForm = async (e) => {
        e.preventDefault();
        dispatch(userLogin({ email, password }))
        .unwrap()
        .then(decoded => {
            console.log("userLogin -> dispatch then : ", decoded)
        })
        .catch(error => {console.log("userLogin ->  : dispatch catch", error)})
        
        if (state.isAuthenticated) {
            console.log("ok authenticated ..");
            navigate(from, { replace: true });
            // setTimeout(() => {
            //     navigate(from, { replace: true} )
            // }, 1000);
        }
    };
    
    useEffect(()=>{
        let isMounted = true
        if ( state.isAuthenticated && isMounted === true ){
            navigate(from, { replace: true });
        }

        return () => {
            isMounted = false;
        }
    }, [state.isAuthenticated])

    return (
        <div className="container my-3">
            <div className="row justify-content-md-center">
                <div className="col col-lg-5 col-md-5 col-sm-5">
                    <div className="card">
                        <div className="card-header text-center">
                            SignIn Page
                        </div>
                        <div className="card-body">
                            <div className="d-flex align-items-center">
                                <img
                                    src={require("../assets/images/avatar.jpeg")}
                                    className="card-img-top mx-auto"
                                    alt="avatar"
                                    style={{ width: "25%", height: "25%" }}
                                />
                            </div>
                            <form onSubmit={handleForm}>
                                <div className="mb-2">
                                    <label
                                        htmlFor="email"
                                        className="form-label"
                                    >
                                        Email address
                                    </label>
                                    <input
                                        type="email"
                                        name="email"
                                        className="form-control"
                                        placeholder=""
                                        value={email}
                                        onChange={(e) =>
                                            setEmail(e.target.value)
                                        }
                                    />
                                </div>
                                <div className="mb-2">
                                    <label htmlFor="password">Password</label>
                                    <input
                                        type="password"
                                        name="password"
                                        className="form-control"
                                        placeholder=""
                                        value={password}
                                        onChange={(e) => {
                                            setPassword(e.target.value);
                                        }}
                                    />
                                </div>
                                <div className="mb-2">
                                    <p
                                        disabled
                                        className="text-center border-0 form-control"
                                        aria-describedby="response"
                                    >
                                        {
                                            state.isAuthenticated
                                            ? "login successfully completed"
                                            : state.error.message
                                            // : state.error
                                        }
                                    </p>
                                </div>
                                <div className="row justify-content-center">
                                    <div className="col col-auto">
                                        <button
                                            type="submit"
                                            className="btn btn-light"
                                            disabled={state.isAuthenticated}
                                        >
                                            Submit
                                        </button>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
