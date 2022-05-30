import { useState, useCallback } from "react";
// import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { userState } from "../features/users/userSlice.js";
import { userSignUp } from "../features/users/thunks/userThunkActions.js";

export default function UsersSignup() {
    const state = useSelector(userState);
    const dispatch = useDispatch();
    // const [email, setEmail] = useState("");
    // const [password, setPassword] = useState("");
    // const [passwordConfirmation, setPasswordConfirmation] = useState("");
    const [formData, setFormData] = useState({
        email: "",
        password: "",
        passwordConfirmation: "",
    });
    function isValidForm() {
        return [
            formData.password === formData.passwordConfirmation,
            formData.email !== "",
        ].every(Boolean);
    }
    // const navigate = useNavigate();

    async function handleForm(e) {
        e.preventDefault();
        const signal = new AbortController().signal;
        if (isValidForm && !state.isAuthenticated) {
            dispatch(
                userSignUp(
                    { email: formData.email, password: formData.password },
                    // { signal }
                )
            );
        }
    }

    const handleChange = useCallback((e) => {
        setFormData((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value,
        }));
    }, []);

    const isValidPassword = () => {
        if (formData.password.length === 0) return "form-control";
        if (formData.password.length >= 1 && formData.password.length < 6)
            return "form-control is-invalid";

        if (formData.password === formData.passwordConfirmation) {
            return "form-control is-valid";
        } else {
            return "form-control is-invalid";
        }
    };

    const isValidPasswordConfirmation = () => {
        if (formData.passwordConfirmation.length === 0) return "form-control";
        if (
            formData.passwordConfirmation.length >= 1 &&
            formData.passwordConfirmation.length < 6
        )
            return "form-control is-invalid";

        if (formData.password === formData.passwordConfirmation) {
            return "form-control is-valid";
        } else {
            return "form-control is-invalid";
        }
    };

    return (
        <div className="container my-3">
            <div className="row justify-content-md-center">
                <div className="col col-lg-5 col-md-5 col-sm-5">
                    <div className="card">
                        <div className="card-header text-center">
                            SignUp Page
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
                                        required
                                        placeholder=""
                                        className="form-control"
                                        value={formData.email}
                                        onChange={handleChange}
                                    />
                                </div>
                                {state.error.email ? (
                                    <div className="invalid-feedback">
                                        {state.error.email}
                                    </div>
                                ) : null}

                                <div className="mb-2">
                                    <label htmlFor="password">Password</label>
                                    <input
                                        id="pass"
                                        type="password"
                                        name="password"
                                        className={isValidPassword()}
                                        placeholder=""
                                        required
                                        value={formData.password}
                                        onChange={handleChange}
                                    />
                                    <div className="invalid-feedback">
                                        {(() => {
                                            if (formData.password.length < 6) {
                                                return "Minimum lenght is 6 characters";
                                            }
                                            if (
                                                formData.password.length >= 6 &&
                                                formData.password !==
                                                    formData.passwordConfirmation
                                            ) {
                                                return "Passowrd mismatch";
                                            }
                                        })()}
                                    </div>
                                </div>

                                <div className="mb-2">
                                    <input
                                        type="password"
                                        name="passwordConfirmation"
                                        className={isValidPasswordConfirmation()}
                                        placeholder=""
                                        required
                                        value={formData.passwordConfirmation}
                                        onChange={handleChange}
                                    />
                                    <div className="invalid-feedback">
                                        {(() => {
                                            if (
                                                formData.passwordConfirmation
                                                    .length < 6
                                            )
                                                return "Minimum lenght is 6 characters";
                                            if (
                                                formData.password !==
                                                formData.passwordConfirmation
                                            )
                                                return "Passowrd mismatch";
                                        })()}
                                    </div>
                                </div>

                                {state.error.message ? (
                                    <div
                                        className="alert alert-danger"
                                        role="alert"
                                    >
                                        {state.error.message}
                                    </div>
                                ) : null}

                                {state.message !== "" ? (
                                    <div
                                        className="alert alert-success"
                                        role="alert"
                                    >
                                        {state.message}
                                    </div>
                                ) : null}

                                <div className="row justify-content-center">
                                    <div className="col col-auto">
                                        <button
                                            // disabled={state.isAuthenticated}
                                            type="submit"
                                            className="btn btn-light"
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
