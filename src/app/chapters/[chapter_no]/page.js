"use client";

// import VerseItem from "@/app/Components/VerseItem";
import useSWR from "swr";
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
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const fetcher = async (url) => {
  const response = await fetch(url);
  const data = await response.json();
  return data.data;
};

export default function Page(props) {
  const chapter_no = props.params.chapter_no;
  const { data, error } = useSWR(`/api/chapters/${chapter_no}`, fetcher);

  if (error) {
    toast.error(error || "Failed to load");
    return null; // Return null to avoid rendering if there's an error
  }

  if (!data) {
    return (
      <div className="spinner">
        <span className="loader"></span>
      </div>
    );
  }

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
        <ToastContainer />
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
