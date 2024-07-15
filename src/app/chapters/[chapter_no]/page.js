"use client";

// import VerseItem from "@/app/Components/VerseItem";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import ChapterItem from "@/app/Components/ChapterItem";
import FetchSloks from "@/app/Components/FetchSloks";
// import {
//   HiOutlineChevronDoubleLeft,
//   HiOutlineChevronDoubleRight,
// } from "react-icons/hi";
// import Link from "next/link";
import Navbar from "@/app/Components/Navbar";
import Footer from "@/app/Components/Footer";
import Border from "@/app/Components/Border";

export default function Page(props) {
  const chapter_no = props.params.chapter_no;
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getSingleChapter = async () => {
      try {
        const response = await fetch(`/api/chapters/${chapter_no}`);
        const data = await response.json();
        setData(data.data);
        setIsLoading(false);
      } catch (error) {
        setError(error);
      }
    };

    getSingleChapter();
  }, [chapter_no, setData, setIsLoading, setError]);

  if (isLoading)
    return (
      <div className="spinner">
        <span class="loader"></span>
      </div>
    );
  if (error) return <p>Error: {error}</p>;

  const handlePreviousClick = (chapter_number) => {
    if (chapter_number > 1 && chapter_number <= 18) {
      console.log("Previous, This is chapter no : " + chapter_number);
      // let numericChapterNumber = Number(chapter_number);
      // router.push(`/chapters/${numericChapterNumber - 1}`);
    }
  };
  const handleNextClick = (chapter_number) => {
    if (chapter_number >= 1 && chapter_number < 18) {
      console.log("Next, This is chapter no : " + chapter_number);
      // let numericChapterNumber = Number(chapter_number);
      // router.push(`/chapters/${numericChapterNumber + 1}`);
    }
  };

  return (
    <>
      <main className="main">
        <Navbar tabNumber={1} />
        {data && (
          <div className="chapter-container btn-rounded">
            {/* <div className="icons">
            <button onClick={() => handlePreviousClick(chapter_no)}>
              <HiOutlineChevronDoubleLeft className="icon" />
            </button>
            <button onClick={() => handleNextClick(chapter_no)}>
              <HiOutlineChevronDoubleRight className="icon" />
            </button>
          </div> */}
            <ChapterItem data={data} />
            <Border />
            <FetchSloks
              chapter_no={chapter_no}
              verses_count={data.verses_count}
            />
          </div>
        )}
        <Footer />
      </main>
    </>
  );
}
