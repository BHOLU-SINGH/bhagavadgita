"use client";

import Image from "next/image";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
  HiOutlineChevronDoubleLeft,
  HiOutlineChevronDoubleRight,
} from "react-icons/hi2";
import Navbar from "@/app/Components/Navbar";
import Footer from "@/app/Components/Footer";

export default function Page(props) {
  const chapter_no = props.params.chapter_no;
  const verse_no = props.params.verse_no;
  const [data, setData] = useState(null);
  const [chapterData, setChapterData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const fetchFirstAPI = fetch(
      `http://localhost:3000/api/chapters/${chapter_no}/verse/${verse_no}`
    )
      .then((response) => {
        if (!response.ok) throw new Error("Failed to fetch data from API 1");
        return response.json();
      })
      .then((data) => setData(data.result.data))
      .catch((err) => setError(err.message));

    const fetchSecondAPI = fetch(
      `http://localhost:3000/api/chapters/${chapter_no}`
    )
      .then((response) => {
        if (!response.ok) throw new Error("Failed to fetch data from API 2");
        return response.json();
      })
      .then((data) => setChapterData(data.result.data))
      .catch((err) => setError(err.message));

    Promise.all([fetchFirstAPI, fetchSecondAPI])
      .then(() => setIsLoading(false))
      .catch((err) => {
        setError(err.message);
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

  const handlePreviousClick = (cur_verse_value, max_verse_value) => {
    let numericCurVerseValue = Number(cur_verse_value);
    if (cur_verse_value > 1 && cur_verse_value <= max_verse_value) {
      router.push(`/chapters/${chapter_no}/verse/${numericCurVerseValue - 1}`);
    }
  };
  const handleNextClick = (cur_verse_value, max_verse_value) => {
    let numericCurVerseValue = Number(cur_verse_value);
    if (cur_verse_value >= 1 && cur_verse_value < max_verse_value) {
      router.push(`/chapters/${chapter_no}/verse/${numericCurVerseValue + 1}`);
    }
    if (cur_verse_value == max_verse_value && chapter_no < 18) {
      let numericChapterNo = Number(chapter_no);
      router.push(`/chapters/${numericChapterNo + 1}/verse/1`);
    }
  };

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
        <div className="btn_div">
          <button
            className="btn"
            onClick={() =>
              handlePreviousClick(verse_no, chapterData.verses_count)
            }
          >
            <HiOutlineChevronDoubleLeft className="btn-icon" /> Previous
          </button>
          <button
            className="btn"
            onClick={() => handleNextClick(verse_no, chapterData.verses_count)}
          >
            Next <HiOutlineChevronDoubleRight className="btn-icon" />
          </button>
        </div>
      </div>
      <Footer />
    </div>
  );
}
