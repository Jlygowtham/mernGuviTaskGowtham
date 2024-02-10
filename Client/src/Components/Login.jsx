import "./All_styles.css";
import { HiOutlineMail } from "react-icons/hi";
import { RiLockPasswordLine } from "react-icons/ri";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useState } from "react";
import ErrorMessage from "./ErrorMessage";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [formError, setFormError] = useState("");
  const [success, setSuccessMessage] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const navigate = useNavigate();

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  const handleSubmit = (e) => {
    e.preventDefault();

    setFormError("");
    setEmailError("");
    setPasswordError("");
    setSuccessMessage("");

    if (!(email || password)) {
      setFormError("Enter your email and password");
      return;
    }

    if (!email || !emailRegex.test(email)) {
      setEmailError("Enter your email address");
      return;
    }

    if (!password) {
      setPasswordError("Password is required");
      return;
    }

    axios
      .post("http://localhost:3000/auth/login", {
        email,
        password,
      })
      .then((response) => {
        console.log("Login Response:", response); // Add this line for debugging
        setSuccessMessage("Login Successfully");
        localStorage.setItem("token", response.data.token);
        setTimeout(() => {
          navigate("/profile");
        }, 1000);
      })
      .catch((err) => {
        setFormError("Invalid User. Please try again.");
      });
  };

  return (
    <div>
      <ErrorMessage message={formError} />
      <ErrorMessage message={emailError} />
      <ErrorMessage message={passwordError} />
      <ErrorMessage message={success} />

      <div className="login-container" >
        <form className="login-form" onSubmit={handleSubmit}>
          <h2 style={{ textAlign: "center" }}>Login</h2>

          <div className="input-field">
            <i>
              <HiOutlineMail size="2rem" />
            </i>
            <input
              type="email"
              name="email"
              autoComplete="off"
              id="email"
              placeholder="Enter your email"
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="input-field">
            <i>
              <RiLockPasswordLine size="2rem" />
            </i>
            <input
              type="password"
              name="password"
              autoComplete="off"
              id="password"
              placeholder="Enter your password"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button type="submit" style={{ marginLeft: "10px" }}>
            Login
          </button>

          <Link to="/signup">
            <button type="button" style={{ marginLeft: "7px" }}>
              Sign Up
            </button>
          </Link>
        </form>
      </div>
    </div>
  );
};

export default Login;
