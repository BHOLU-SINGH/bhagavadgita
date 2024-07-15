"use client";

// import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import ChapterCard from "@/app/Components/ChapterCard";
import Navbar from "./Components/Navbar";
import Footer from "./Components/Footer";

export default function Home() {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const getChapters = async () => {
    try {
      const response = await fetch("/api/chapters");
      const data = await response.json();
      setData(data.data);
      setIsLoading(false);
    } catch (error) {
      setError(error);
    }
  };

  useEffect(() => {
    getChapters();
  }, []);

  if (isLoading)
    return (
      <div className="spinner">
        <span className="loader"></span>
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
        <Footer />
      </div>
    </main>
  );
}
