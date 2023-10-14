import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSignup } from "../../hooks/useSignup";
import "./Signup.css";

export const Signup = ({setSuccessMessage}) => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [nameError, setNameError] = useState("");
    const [emailError, setEmailError] = useState("");
    const [passwordError, setPasswordError] = useState("");
    const { signup, isLoading, error } = useSignup();
    const navigate = useNavigate();
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (validateForm()) {
            const result = await signup(name, email, password);
            if (result) {
                setSuccessMessage("You have successfully signed up");
                setTimeout(() => {
                    setSuccessMessage(false);
                }, 5000); 
                navigate("/");
            };
        }
    };

    const validateForm = () => {
        let isValid = true;
        if (name.trim() === "") {
            setNameError("Name is required");
            isValid = false;
        } else {
            setNameError("");
        }
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
        } else if (password.length < 6) {
            setPasswordError("Password must be at least 6 characters");
            isValid = false;
        } else {
            setPasswordError("");
        }
        return isValid;
    };

    return (
        <div className="signup-container">
            <h2>Sign Up</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="name">Name</label>
                    <input
                        type="text"
                        onChange={(e) => setName(e.target.value)}
                        value={name}
                        name="name"
                        placeholder="Enter your name"
                    />
                    {nameError && <div className="error">{nameError}</div>}
                </div>
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
                <button className="signup-btn" disabled={isLoading} type="submit">
                    {isLoading ? "Signing up..." : "Sign up"}
                </button>
                {error && <div className="error">{error}</div>}
            </form>
        </div>
    );
    
};