import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { authentication } from "../../../services/Authentication";
import { toast } from "react-toastify";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import "bootstrap/dist/css/bootstrap.min.css";
import "./login.css";

const LoginComponent = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);

    const navigator = useNavigate();

    const adjustHidePassword = () => {
        setShowPassword(!showPassword);
    };

    const authenticate = (e) => {
        e.preventDefault();
        const userInfo = { email, password };
        authentication(userInfo)
            .then((response) => {
                localStorage.setItem("jwtToken", JSON.stringify(response.data.jwt));
                localStorage.setItem("welcomed", "false");
                navigator("/home");
            })
            .catch((error) => {
                toast.error(error.response?.data);
            });
    };

    return (
        <div className="container">
            <div className="row justify-content-center align-items-center" style={{ minHeight: "100vh" }}>
                <div className="card col-md-6 shadow p-4">
                    <h3 className="text-center mb-4">Log In</h3>
                    <form onSubmit={authenticate}>
                        <div className="form-group mb-3">
                            <label className="form-label">Email:</label>
                            <input
                                type="text"
                                placeholder="Enter your registered email"
                                name="email"
                                value={email}
                                className="form-control"
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                        </div>
                        <div className="form-group mb-3">
                            <label className="form-label">Password:</label>
                            <div className="position-relative">
                                <input
                                    type={showPassword ? "text" : "password"}
                                    placeholder="Enter your password"
                                    name="password"
                                    value={password}
                                    className="form-control"
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                />
                                <span
                                    onClick={adjustHidePassword}
                                    style={{
                                        position: "absolute",
                                        right: "10px",
                                        top: "50%",
                                        transform: "translateY(-50%)",
                                        cursor: "pointer",
                                        color: "#6c757d",
                                    }}
                                >
                                    {showPassword ? (
                                        <AiOutlineEyeInvisible size={20} />
                                    ) : (
                                        <AiOutlineEye size={20} />
                                    )}
                                </span>
                            </div>
                        </div>
                        <div className="text-end mb-3">
                            <button
                                type="button"
                                className="btn btn-link p-0"
                                onClick={() => navigator("/forgot-password")}
                            >
                                Forgot Password?
                            </button>
                        </div>
                        <button type="submit" className="btn btn-success w-100">
                            Submit
                        </button>
                    </form>
                    <div className="text-center mt-4">
                        <p>Don't have an account?</p>
                        <button
                            className="btn btn-outline-info w-100"
                            onClick={() => navigator("/signup")}
                        >
                            Sign Up
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LoginComponent;
