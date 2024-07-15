"use client";

import { act, useState } from "react";
import Link from "next/link";
import { IoEyeOutline, IoEyeOffOutline } from "react-icons/io5";
import Navbar from "@/app/Components/Navbar";
import Footer from "@/app/Components/Footer";

const Page = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [passwordVisibility, setPasswordVisibility] = useState("password");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log(formData);
    // setIsLoading(true);

    // try {
    //   const response = await fetch("/api/sendmail", {
    //     method: "POST",
    //     headers: { "Content-Type": "application/json" },
    //     body: JSON.stringify(formData),
    //   });

    //   const result = await response.json();
    //   if (!response.ok) {
    //     throw new Error(result.message || "Failed to send email!");
    //   }

    //   setServerMsg(result.message);
    //   setServerMsgClass("success");
    // } catch (error) {
    //   console.error("Something went wrong, please try again!", error);
    //   setServerMsg(error.message || "Something went wrong, please try again!");
    //   setServerMsgClass("error");
    // } finally {
    //   setIsLoading(false);
    //   setFormData({ name: "", email: "", message: "" });
    // }
  };

  if (isLoading) {
    return (
      <div className="spinner">
        <span className="loader"></span>
      </div>
    );
  }

  const changeVisibility = () => {
    setPasswordVisibility(
      passwordVisibility === "password" ? "text" : "password"
    );
  };

  return (
    <div className="main">
      <Navbar />
      <div className="account login-div bg-img">
        <form action="#" onSubmit={handleSubmit}>
          <h2>Revisit Your Spiritual Home</h2>
          {/* <p className="tagline">Welcome back! Continue your journey to spiritual enlightenment with us.</p> */}
          {/* <p className="msg error">Something went wrong, Please try again!</p> */}
          <div className="form-control">
            <label>Email Address</label>
            <input
              type="email"
              name="email"
              // value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
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
          <div className="btn-div">
            <button>SignIn</button>
          </div>
          <p className="link">
            Don't have an account, <Link href="/account/register">signup</Link>{" "}
            here
          </p>
        </form>
      </div>
      <Footer />
    </div>
  );
};
export default Page;
