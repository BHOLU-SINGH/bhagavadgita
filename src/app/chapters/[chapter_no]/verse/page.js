'use client'

import Footer from "@/app/Components/Footer";
import Navbar from "@/app/Components/Navbar";
import Image from "next/image";
import React, { useEffect, useState } from "react";

export default function Page(props) {
  const chapter_no = props.params.chapter_no;
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch(`http://localhost:3000/api/chapters/${chapter_no}/verse/1`) // Replace with your actual API URL
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        setData(data.result.data);
        setIsLoading(false);
      })
      .catch((error) => {
        setError(error.message);
        setIsLoading(false);
      });
  }, []);

  if (isLoading)
    return (
      <div className="spinner">
        <span class="loader"></span>
      </div>
    );
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="main">
    <Navbar tabNumber={2} />
      <div className="verse-explain">
        <div className="div div-1">
          <h2>{data._id}</h2>
          <p className="slok">{data.slok}</p>
          <p>{data.transliteration}</p>
        </div>
        <div className="div div-2">
          <h2>Translation</h2>
          <p>{data.siva.et}</p>
          <p>{data.tej.ht}</p>
        </div>
        <div className="div div-3">
          <h2>Commentary</h2>
          <p>{data.siva.ec}</p>
        </div>
      </div>
      <Footer />
    </div>
  );
};