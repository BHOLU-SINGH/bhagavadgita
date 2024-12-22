"use client";

import useSWR from "swr";
import { useRouter } from "next/navigation";
import {
  HiOutlineChevronDoubleLeft,
  HiOutlineChevronDoubleRight,
} from "react-icons/hi2";
import Navbar from "@/app/Components/Navbar";
import Footer from "@/app/Components/Footer";
import Border from "@/app/Components/Border";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const fetcher = async (url) => {
  const response = await fetch(url);
  const data = await response.json();
  return data.data;
};

export default function Page(props) {
  const chapter_no = props.params.chapter_no;
  const verse_no = props.params.verse_no;
  const router = useRouter();

  const { data: data, error: dataError } = useSWR(
    `/api/chapters/${chapter_no}/`,
    fetcher
  );
  const { data: chapterData, error: chapterDataError } = useSWR(
    `/api/chapters/${chapter_no}/verse/${verse_no}`,
    fetcher
  ); // New API call

  if (dataError || chapterDataError) {
    toast.error(dataError || chapterDataError || "Failed to load");
    return null; // Return null to avoid rendering if there's an error
  }

  if (!data || !chapterData) {
    return (
      <div className="spinner">
        <span className="loader"></span>
      </div>
    );
  }

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
      <ToastContainer />
      <Navbar tabNumber={2} />
      <div className="verse-explain btn-rounded">
        <div className="div div-1">
          <h2>
            BG {chapter_no}.{verse_no}
          </h2>
          <p className="slok">
            {chapterData.text.split("\n\n").map((text, index) => (
              <span key={index}>
                {text}
                <br /> {/* Add a line break after each split text */}
              </span>
            ))}
          </p>
          <p>{chapterData.transliteration}</p>
          <p>{chapterData.word_meanings}</p>
        </div>
        <Border />
        <div className="div div-2">
          <h2>Translation</h2>
          {chapterData.translations && chapterData.translations.length > 0
            ? chapterData.translations
                .sort((a, b) => a.id - b.id)
                .map((translationItem) =>
                  translation_en_and_hi(translationItem)
                )
            : null}
        </div>
        <Border />
        <div className="div div-3">
          <h2>Commentary</h2>
          {/* <p>{data.siva.ec}</p> */}
          {Array.isArray(chapterData.commentaries) &&
          chapterData.commentaries.length > 0
            ? chapterData.commentaries
                .sort((a, b) => a.id - b.id)
                .map((commentariesItem) =>
                  commentariesItem.author_name === "Swami Sivananda" ? (
                    <p key={commentariesItem.id}>
                      {commentariesItem.description}
                    </p>
                  ) : null
                )
            : null}
        </div>
        <div className="btn_div">
          <button
            className="btn btn-circle"
            onClick={() => handlePreviousClick(verse_no, data.verses_count)}
          >
            <HiOutlineChevronDoubleLeft className="btn-icon" />
          </button>
          <button
            className="btn btn-circle"
            onClick={() => handleNextClick(verse_no, data.verses_count)}
          >
            <HiOutlineChevronDoubleRight className="btn-icon" />
          </button>
        </div>
      </div>
      <Footer />
    </div>
  );
}
