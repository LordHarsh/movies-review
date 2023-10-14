import React, { useState } from "react";
import { useLogin } from "../../hooks/useLogin";
import { useNavigate } from "react-router-dom";
import './Login.css'; // Import the CSS file

export const Login = ({setSuccessMessage}) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const { login, isLoading, error } = useLogin();
    const [emailError, setEmailError] = useState("");
    const [passwordError, setPasswordError] = useState("");
    const navigate = useNavigate();
    
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (validateForm()) {
            const result = await login(email, password);
            if (result) {
                setSuccessMessage("You have successfully logged in");
                setTimeout(() => {
                    setSuccessMessage(null);
                }, 5000); 
                navigate("/");
            };
        }
    };

    const validateForm = () => {
        let isValid = true;

        if (email.trim() === "") {
            setEmailError("Email is required");
            isValid = false;
        } else if (!/\S+@\S+\.\S+/.test(email)) {
            setEmailError("Email is invalid");
            isValid = false;
        } else {
            setEmailError("");
        }

        if (password.trim() === "") {
            setPasswordError("Password is required");
            isValid = false;
        } else {
            setPasswordError("");
        }

        return isValid;
    };

    return (
        <div className="login-container">
            <h2>Login</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="email">Email</label>
                    <input
                        type="email"
                        name="email"
                        onChange={(e) => setEmail(e.target.value)}
                        value={email}
                        placeholder="Enter your email"
                    />
                    {emailError && <div className="error">{emailError}</div>}
                </div>
                <div className="form-group">
                    <label htmlFor="password">Password</label>
                    <input
                        type="password"
                        name="password"
                        onChange={(e) => setPassword(e.target.value)}
                        value={password}
                        placeholder="Enter your password"
                    />
                    {passwordError && <div className="error">{passwordError}</div>}
                </div>
                <button className="login-btn" disabled={isLoading} type="submit">
                    {isLoading ? "Loging in..." : "Log in"}
                </button>
                {error && <div className="error">{error}</div>}
            </form>
        </div>
    );
};
