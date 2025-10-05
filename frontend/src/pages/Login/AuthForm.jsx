// src/pages/Login/AuthForm.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./login.css";

const AuthForm = ({ authMode: initialMode = "Login", onLogin }) => {
  const [authMode, setAuthMode] = useState(initialMode);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    agree: false,
  });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

const handleSubmit = async (e) => {
  e.preventDefault();
  setLoading(true);
  try {
    let response;
    if (authMode === "Sign Up") {
      // signup API
      response = await axios.post("http://localhost:8000/api/v1/auth/signup", {
        name: formData.name,
        email: formData.email,
        password: formData.password,
      });

      // after successful signup → go to login page
      alert("Signup successful! Please log in.");
      setAuthMode("Login");
      navigate("/login");

    } else {
      // login API
      response = await axios.post("http://localhost:8000/api/v1/auth/login", {
        email: formData.email,
        password: formData.password,
      });

      // store user data
      const user = response.data;
      localStorage.setItem("authToken", user.token);
      localStorage.setItem("user", JSON.stringify(user));
      onLogin(user);

      // after successful login → go to dashboard
      navigate("/dashboard");
    }
  } catch (error) {
    alert(error.response?.data?.detail || "Authentication failed");
  } finally {
    setLoading(false);
  }
};

  return (
    <div className="login-container">
      <div className="login-card">
        <form onSubmit={handleSubmit}>
          <h1>{authMode}</h1>

          {authMode === "Sign Up" && (
            <input
              type="text"
              name="name"
              placeholder="Name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          )}

          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            required
          />

          {authMode === "Sign Up" && (
            <div className="checkbox">
              <input
                type="checkbox"
                name="agree"
                checked={formData.agree}
                onChange={handleChange}
              />
              <p>Agree to the terms and conditions</p>
            </div>
          )}

          <button type="submit" disabled={loading}>
            {loading ? "Please wait..." : authMode}
          </button>

          <div className="switch-state">
            {authMode === "Sign Up" ? (
              <p>
                Already have an account?{" "}
                <span onClick={() => setAuthMode("Login")} className="clickable">
                  Click here
                </span>
              </p>
            ) : (
              <p>
                Don't have an account?{" "}
                <span onClick={() => setAuthMode("Sign Up")} className="clickable">
                  Sign up now
                </span>
              </p>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default AuthForm;
