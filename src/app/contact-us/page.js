"use client";

import { useState } from "react";
import Footer from "../Components/Footer";
import Navbar from "../Components/Navbar";

export default function Page() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [serverMsg, setServerMsg] = useState("");
  const [serverMsgClass, setServerMsgClass] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsLoading(true);

    try {
      const response = await fetch("/api/sendmail", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const result = await response.json();
      if (!response.ok) {
        throw new Error(result.message || "Failed to send email!");
      }
      setServerMsg(result.message);
      setServerMsgClass("success");
    } catch (error) {
      // console.error("Something went wrong, please try again!", error);
      setServerMsg(error.message || "Something went wrong, please try again!");
      setServerMsgClass("error");
    } finally {
      setIsLoading(false);
      setFormData({ name: "", email: "", message: "" });
    }
  };

  if (isLoading) {
    return (
      <div className="spinner">
        <span className="loader"></span>
      </div>
    );
  }

  return (
    <>
      <Navbar tabNumber={4} />
      <div className="contact-us">
        <form onSubmit={handleSubmit}>
          <h2>Contact Us</h2>
          <small>
            If you have any questions or concerns, please feel free to contact
            us. We are here to help.
          </small>
          <div className="msg">
            <p className={serverMsgClass}>{serverMsg}</p>
          </div>
          <div className="form-group">
            <label htmlFor="name">Name</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="message">Message</label>
            <textarea
              id="message"
              name="message"
              rows="6"
              value={formData.message}
              onChange={handleChange}
              required
            ></textarea>
          </div>
          <div className="form-group">
            <button type="submit">Submit</button>
          </div>
        </form>
      </div>
      <Footer />
    </>
  );
}
