"use client";

import { useState, useCallback } from "react"; // Added useCallback
import Link from "next/link";
import { IoEyeOutline, IoEyeOffOutline } from "react-icons/io5";
import Navbar from "@/app/Components/Navbar";
import Footer from "@/app/Components/Footer";

const Page = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    gender: "",
    mobile: "",
    password: "",
    cpassword: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [activePassword, setActivePassword] = useState(false);
  const [activePassword2, setActivePassword2] = useState(false);
  const [passwordVisibility, setPasswordVisibility] = useState("password");
  const [passwordVisibility2, setPasswordVisibility2] = useState("password");
  const [passError, setPassError] = useState(false);
  const [serverMsg, setServerMsg] = useState("");
  const [serverStatus, setServerStatus] = useState("");
  const [data, setData] = useState([]); // Added data state

  const handleChange = useCallback((e) => { // Wrapped in useCallback
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    if (name === "cpassword") {
      setPassError(value.length >= 1 && formData.password !== value);
    }
  }, [formData.password]);

  const handleSubmit = useCallback(async (event) => { // Wrapped in useCallback
    event.preventDefault();
    setIsLoading(true);

    const userData = { ...formData }; // Simplified userData creation

    try {
      const response = await fetch("/api/account/user", {
        method: "POST",
        headers: { "Content-Type": "application/json" }, // Added headers
        body: JSON.stringify({ userData }),
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await response.json();
      setData(data); // Set data state
      // setServerMsg(data.result);
      // setServerStatus(data.class);
    } catch (error) {
      console.error("Something went wrong, please try again!", error);
      setServerMsg("An error occurred. Please try again."); // Set error message
      // setServerStatus(data.class);
    } finally {
      setFormData({
        name: "",
        email: "",
        gender: "",
        mobile: "",
        password: "",
        cpassword: "",
      });
      setIsLoading(false);
    }
  }, [formData]);

    if (isLoading) {
    return (
      <div className="spinner">
        <span className="loader"></span>
      </div>
    );
  }

  return (
    <div className="main">
      <Navbar />
      <div className="account register-div bg-img">
        <form action="#" onSubmit={handleSubmit}>
          <h2>Begin Your Journey</h2>
          <p className="tagline">
            Every great journey begins with a single step. Take yours by signing
            up today.
          </p>
          <p className={`msg ${serverStatus}`}>{serverMsg}</p>
          <div className="form-control">
            <label>Full Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-control">
            <label>Email Address</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <div className="form-control">
              <label>Gender</label>
              <select
                name="gender"
                value={formData.gender}
                onChange={handleChange}
                required
              >
                <option value="" disabled>
                  select
                </option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </select>
            </div>
            <div className="form-control">
              <label>Mobile Number</label>
              <input
                type="number"
                name="mobile"
                value={formData.mobile}
                onChange={handleChange}
                required
              />
            </div>
          </div>
          <div className="form-group">
            <div className="form-control">
              <label>Password</label>
              <div>
                <input
                  type={passwordVisibility}
                  name="password"
                  onChange={handleChange}
                  required
                />
                <p onClick={() => {
                  setPasswordVisibility(prev => prev === "password" ? "text" : "password");
                  setActivePassword(prev => !prev);
                }}>
                  {formData.password.length >= 1 ? (
                    activePassword ? <IoEyeOffOutline className="icon" /> : <IoEyeOutline className="icon" />
                  ) : null}
                </p>
              </div>
            </div>
            <div className="form-control">
              <label>Confirm Password</label>
              <div>
                <input
                  type={passwordVisibility2}
                  name="cpassword"
                  value={formData.cpassword}
                  onChange={handleChange}
                  required
                />
                <p onClick={() => {
                  setPasswordVisibility2(prev => prev === "password" ? "text" : "password");
                  setActivePassword2(prev => !prev);
                }}>
                  {formData.cpassword.length >= 1 ? (
                    activePassword2 ? <IoEyeOffOutline className="icon" /> : <IoEyeOutline className="icon" />
                  ) : null}
                </p>
              </div>
            </div>
          </div>
          <p className="pass-error">
            {passError && "Password and Confirm Password should be same!"}
          </p>
          <div className="btn-div">
            <button>SignUp</button>
          </div>
          <p className="link">
            Have an account, <Link href="/account/login">signin</Link> here
          </p>
        </form>
      </div>
      <Footer />
    </div>
  );
};

export default Page;