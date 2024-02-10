import "./All_styles.css";
import { LuUser } from "react-icons/lu";
import { FaTty } from "react-icons/fa6";
import { MdOutlinePersonPin } from "react-icons/md";
import { FaCalendarDays } from "react-icons/fa6";
import { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import ErrorMessage from "./ErrorMessage";

const Profile = () => {
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("");
  const [mobileNumber, setMobile] = useState("");
  const [dob, setDOB] = useState("");
  const [success, setSuccessMessage] = useState("");
  const [formError, setFormError] = useState("");
  const [ageError, setAgeError] = useState("");
  const [genderError, setGenderError] = useState("");
  const [mobileError, setMobileError] = useState("");
  const [dobError, setDobError] = useState("");

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    setAgeError("");
    setGenderError("");
    setMobileError("");
    setDobError("");
    setFormError("");
    setSuccessMessage("");

    // Validation checks

    if (!(age || gender || mobileNumber || dob)) {
      setFormError("Enter your details");
      return;
    }

    if (!age) {
      setAgeError("Enter your age");
      return;
    } else if (isNaN(age) || +age < 0) {
      setAgeError("Invalid age");
      return;
    }

    if (!gender) {
      setGenderError("Select a gender");
      return;
    }

    if (!mobileNumber || !/^\d{10}$/.test(mobileNumber)) {
      setMobileError("Enter a valid 10-digit mobile number");
      return;
    }

    if (!dob) {
      setDobError("Enter your date of birth");
      return;
    }

    axios
      .post(
        "http://localhost:3000/auth/profile",
        {
          age,
          gender,
          mobileNumber,
          dob,
        },
        {
          headers: {
            Authorization: localStorage.getItem("token"),
          },
        }
      )
      .then((response) => {
        setSuccessMessage("Profile created successfully");
        setTimeout(() => {
          navigate("/dashboard");
        }, 1000);
      })
      .catch((err) => {
        setFormError("You are already created profile");
        setTimeout(() => {
          navigate("/dashboard");
        }, 1000);
      });
  };

  return (
    <div>
      <ErrorMessage message={formError} />
      <ErrorMessage message={ageError} />
      <ErrorMessage message={genderError} />
      <ErrorMessage message={mobileError} />
      <ErrorMessage message={dobError} />
      <ErrorMessage message={success} />

      <div className="profile-container">
        <form className="profile-form" onSubmit={handleSubmit}>
          <h2>Profile</h2>

          <div className="input-field">
            <i>
              <MdOutlinePersonPin size="1.9rem" />
            </i>
            <input
              type="text"
              name="age"
              id="age"
              autoComplete="off"
              placeholder="Enter your Age"
              onChange={(e) => setAge(e.target.value)}
            />
          </div>

          <div className="input-field">
            <i>
              <LuUser size="1.9rem" />
            </i>
            <select
              id="gender"
              name="gender"
              onChange={(e) => setGender(e.target.value)}
            >
              <option value="">Select a gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>
          </div>

          <div className="input-field">
            <i>
              <FaTty size="1.9rem" />
            </i>
            <input
              type="tel"
              name="mobile"
              id="mobile"
              pattern="[0-9]{10}"
              placeholder="Enter 10-digit mobile number"
              autoComplete="off"
              onChange={(e) => setMobile(e.target.value)}
            />
          </div>

          <div className="input-field">
            <i>
              <FaCalendarDays size="1.9rem" />
            </i>
            <input
              type="date"
              name="dob"
              id="dob"
              autoComplete="off"
              onChange={(e) => setDOB(e.target.value)}
            />
          </div>
          <button type="submit" style={{ width: '170px', marginLeft: '11px' }}>
            Create Profile
          </button>
          <Link to="/login">
            <button type="submit" style={{ width: '170px', marginLeft: '14px' }}>Log out</button>
          </Link>
        </form>

      </div>
    </div>
  );
};

export default Profile;
