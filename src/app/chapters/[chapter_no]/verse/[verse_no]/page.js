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
import Border from "@/app/Components/Border";

export default function Page(props) {
  const chapter_no = props.params.chapter_no;
  const verse_no = props.params.verse_no;
  const [data, setData] = useState(null);
  const [chapterData, setChapterData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const [chapterResponse, verseResponse] = await Promise.all([
          fetch(`/api/chapters/${chapter_no}/`),
          fetch(`/api/chapters/${chapter_no}/verse/${verse_no}`)
        ]);
    
        const [chapterData, verseData] = await Promise.all([
          chapterResponse.json(),
          verseResponse.json()
        ]);
    
        setChapterData(chapterData.data);
        setData(verseData.data);
        setIsLoading(false);
      } catch (error) {
        setError(error);
      }
    };
  
    fetchData();
  }, [setIsLoading, chapter_no, verse_no, setChapterData, setData, setError]);

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

  const translation_en_and_hi = (translationItem) => {
    if (translationItem.author_name === "Swami Sivananda") {
      return <p>{translationItem.description}</p>;
    }
    if (translationItem.author_name === "Swami Tejomayananda") {
      return <p>{translationItem.description}</p>;
    }
  };

  return (
    <div className="main">
      <Navbar tabNumber={2} />
      <div className="verse-explain btn-rounded">
        <div className="div div-1">
          <h2>BG {chapter_no}.{verse_no}</h2>
          <p className="slok">{data.text}</p>
          <p>{data.transliteration}</p>
          <p>{data.word_meanings}</p>
        </div>
        <Border />
        <div className="div div-2">
          <h2>Translation</h2>
          {data.translations
            .sort((a, b) => a.id - b.id)
            .map((translationItem) => translation_en_and_hi(translationItem))}
        </div>
        <Border />
        <div className="div div-3">
          <h2>Commentary</h2>
          {/* <p>{data.siva.ec}</p> */}
          {data.commentaries
            .sort((a, b) => a.id - b.id)
            .map((commentariesItem) =>
              commentariesItem.author_name === "Swami Sivananda" ? (
                <p key={commentariesItem.id}>{commentariesItem.description}</p>
              ) : null
            )}
        </div>
        <div className="btn_div">
          <button
            className="btn btn-circle"
            onClick={() =>
              handlePreviousClick(verse_no, chapterData.verses_count)
            }
          >
            <HiOutlineChevronDoubleLeft className="btn-icon" />
          </button>
          <button
            className="btn btn-circle"
            onClick={() => handleNextClick(verse_no, chapterData.verses_count)}
          >
            <HiOutlineChevronDoubleRight className="btn-icon" />
          </button>
        </div>
      </div>
      <Footer />
    </div>
  );
}
