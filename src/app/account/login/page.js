"use client";

import { useState } from "react";
import Link from "next/link";
import { IoEyeOutline, IoEyeOffOutline } from "react-icons/io5";
import Navbar from "@/app/Components/Navbar";
import Footer from "@/app/Components/Footer";

const Page = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [passwordVisibility, setPasswordVisibility] = useState("password");
  const [serverMsg, setServerMsg] = useState("");
  const [serverStatus, setServerMsgClass] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    // setIsLoading(true);

    // try {
    //   const response = await fetch("/api/account/user");
    //   if (!response.ok) {
    //     throw new Error("Network response was not ok!");
    //   }

    //   const data = await response.json();
    //   setData(data.result);
    //   // setServerResponse({ msg: data.result, status: data.class });
    //   setServerMsg(data.result);
    //   setServerMsgClass(data.class);
    // } catch (error) {
    //   console.error("Something went wrong, please try again!", error);
    //   // setServerResponse({ msg: "Something went wrong, please try again!", status: "error" });
    //   setServerMsg(data.result || "Something went wrong, please try again!");
    //   setServerMsgClass(data.class);
    // } finally {
    //   setIsLoading(false);
    //   setFormData({ email: "", password: "", });

    //   console.log(data);
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
          {/* <h2>Revisit Your Spiritual Home</h2> */}
          <h2>Welcome Back!</h2>
          {/* <p className="tagline">Welcome back! Continue your journey to spiritual enlightenment with us.</p> */}
          {/* <p className="msg error">Something went wrong, Please try again!</p> */}
          <p className="tagline">
            You are what you believe; trust in yourself and find peace within.
          </p>
          <p className={`msg ${serverStatus}`}>{serverMsg}</p>
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
                {formData.password && formData.password.length >= 1 ? (
                  passwordVisibility === "password" ? (
                    <IoEyeOffOutline className="icon" />
                  ) : (
                    <IoEyeOutline className="icon" />
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
