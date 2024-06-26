"use client";

import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import ChapterCard from "@/app/Components/ChapterCard";
import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";

export default function Page() {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch("/api/chapters/") // Replace with your actual API URL
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
    <main className="main">
      <Navbar tabNumber={1} />
      <div className="chapters">
        {data &&
          data.map((item) => (
            <Link
              href={`/chapters/${item.chapter_number}`}
              key={item.chapter_number}
            >
              <ChapterCard item={item} />
            </Link>
          ))}
      </div>
      <Footer />
    </main>
  );
}
