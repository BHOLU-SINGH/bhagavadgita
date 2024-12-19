"use client";

import useSWR from "swr";
import Link from "next/link";
import ChapterCard from "@/app/Components/ChapterCard";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const fetcher = async (url) => {
  const response = await fetch(url);
  const data = await response.json();
  return data.data;
};

export default function DefaultPage() {
  const { data, error } = useSWR("/api/chapters", fetcher);

  if (error) {
    toast.error(error || "Failed to load");
    return null; // Return null to avoid rendering if there's an error
  }

  if (!data || !data.length) {
    // Change apiData to data
    return (
      <div className="spinner">
        <span className="loader"></span>
      </div>
    );
  }

  return (
    <main className="main">
      <ToastContainer />
      <Navbar tabNumber={1} />
      <div className="chapters">
        {data.map((item) => (
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
