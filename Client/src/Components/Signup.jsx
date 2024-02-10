import "./All_styles.css";
import { LuUser } from "react-icons/lu";
import { HiOutlineMail } from "react-icons/hi";
import { RiLockPasswordLine, RiLockPasswordFill } from "react-icons/ri";
import { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import ErrorMessage from "./ErrorMessage";

const Signup = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm_password, setConfirmPassword] = useState("");
  const [formError, setFormError] = useState("");
  const [success, setSuccessMessage] = useState("");
  const [nameError, setNameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState("");

  const navigate = useNavigate();

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  const handleSubmit = (e) => {
    e.preventDefault();

    setFormError("");
    setNameError("");
    setEmailError("");
    setPasswordError("");
    setConfirmPasswordError("");
    setSuccessMessage("");

    if (!(name || email || password || confirm_password)) {
      setFormError("All fields are required");
      return;
    }

    if (!name) {
      setNameError("Name is required");
      return;
    }

    if (!email || !emailRegex.test(email)) {
      setEmailError("Enter a valid email address");
      return;
    }

    if (!password || password.length < 6) {
      setPasswordError("Password should be at least 6 characters");
      return;
    }

    if (password !== confirm_password) {
      setConfirmPasswordError("Passwords do not match");
      return;
    }

    axios
      .post("https://merntaskbackend-lfay.onrender.com/auth/signup", {
        name,
        email,
        password,
        confirm_password,
      })
      .then((response) => {
        setSuccessMessage("Successfully Registered");
        setTimeout(() => {
          navigate("/login");
        }, 1000);
      })
      .catch((err) => {
        setFormError("You're registered user");
      });
  };

  return (
    <div>
      <ErrorMessage message={formError} />
      <ErrorMessage message={nameError} />
      <ErrorMessage message={emailError} />
      <ErrorMessage message={passwordError} />
      <ErrorMessage message={confirmPasswordError} />
      <ErrorMessage message={success} />

      <div className="signup-container">
        <form className="signup-form" onSubmit={handleSubmit}>
          <h2>Sign up</h2>

          <div className="input-field">
            <i>
              <LuUser size="1.9rem" />
            </i>
            <input
              type="text"
              name="name"
              id="name"
              autoComplete="off"
              placeholder="Enter your name"
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          <div className="input-field">
            <i>
              <HiOutlineMail size="1.9rem" />
            </i>
            <input
              type="email"
              name="email"
              id="email"
              autoComplete="off"
              placeholder="Enter your email"
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="input-field">
            <i>
              <RiLockPasswordLine size="1.9rem" />
            </i>
            <input
              type="password"
              name="password"
              id="password"
              autoComplete="off"
              placeholder="Enter your password"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <div className="input-field">
            <i>
              <RiLockPasswordFill size="1.9rem" />
            </i>
            <input
              type="password"
              name="confirm_password"
              id="confirm_password"
              autoComplete="off"
              placeholder="Enter your Confirm password"
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </div>

          <button type="submit">Signup</button>
        </form>

        <div className="already-user">
          Already Registered{" "}
          <Link to="/login">
            <a href="#">Login</a>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Signup;
