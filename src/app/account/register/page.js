"use client";

import { useState } from "react";
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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    name === "cpassword" && value.length >= 1 && formData.password !== value
      ? setPassError(true)
      : setPassError(false);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    // console.log(formData);
    setIsLoading(true);

    const userData = {
      name: formData.name,
      email: formData.email,
      gender: formData.gender,
      mobile: formData.mobile,
      password: formData.password,
    };

    try {
      let data = await fetch("/api/account/user", {
        method: "POST",
        body: JSON.stringify({ userData }),
      });
      if (data) {
        const response = await data.json();
        setServerMsg(response.result);
        setServerStatus(response.success);
        console.log("Data is : " + response.result);
      } else {
        // console.error("Failed to fetch data. Status: " + data.status);
        console.error("Failed to fetch data.");
      }
    } catch (error) {
      console.error("Something went wrong, please try again!", error);
    } finally {
      setFormData({
        name: "",
        email: "",
        gender: "",
        mobile: "",
        password: "",
        cpassword: "",
      });
    }
    setIsLoading(false);
  };

  if (isLoading) {
    return (
      <div className="spinner">
        <span className="loader"></span>
      </div>
    );
  }

  const changeVisibility = () => {
    setActivePassword(!activePassword);
    setPasswordVisibility(
      passwordVisibility === "password" ? "text" : "password"
    );
  };
  const changeVisibility2 = () => {
    setActivePassword2(!activePassword2);
    setPasswordVisibility2(
      passwordVisibility2 === "password" ? "text" : "password"
    );
  };

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
                  // value={formData.password}
                  onChange={handleChange}
                  required
                />
                <p onClick={() => changeVisibility()}>
                  {formData.password.length >= 1 ? (
                    passwordVisibility === "password" ? (
                      <IoEyeOutline className="icon" />
                    ) : (
                      <IoEyeOffOutline className="icon" />
                    )
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
                <p onClick={() => changeVisibility2()}>
                  {formData.cpassword.length >= 1 ? (
                    passwordVisibility2 === "password" ? (
                      <IoEyeOutline className="icon" />
                    ) : (
                      <IoEyeOffOutline className="icon" />
                    )
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
            Have an accout, <Link href="/account/login">signin</Link> here
          </p>
        </form>
      </div>
      <Footer />
    </div>
  );
};

export default Page;
