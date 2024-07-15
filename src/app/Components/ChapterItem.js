"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import {
  HiOutlineChevronDoubleLeft,
  HiOutlineChevronDoubleRight,
} from "react-icons/hi";

export default function ChapterItem(props) {
  const data = props.data;
  const router = useRouter();

  const handlePreviousClick = (chapter_number) => {
    if (chapter_number > 1 && chapter_number <= 18) {
      let numericChapterNumber = Number(chapter_number);
      router.push(`/chapters/${numericChapterNumber - 1}`);
    }
  };
  const handleNextClick = (chapter_number) => {
    if (chapter_number >= 1 && chapter_number < 18) {
      let numericChapterNumber = Number(chapter_number);
      router.push(`/chapters/${numericChapterNumber + 1}`);
    }
  };

  return (
    <div className="chapter">
      <p className="chapter-number">
        <span>Chapter {data.chapter_number}</span>
      </p>
      <p className="chapter-title">
        {data.name_meaning} : {data.name}
      </p>
      <p className="chapter-summary">{data.chapter_summary}</p>
      <p className="chapter-summary">{data.chapter_summary_hindi}</p>
      <div className="btn_div">
        <button
          className="btn btn-circle"
          onClick={() => handlePreviousClick(data.chapter_number)}
        >
          <HiOutlineChevronDoubleLeft className="btn-icon" />
        </button>
        <button
          className="btn btn-circle"
          onClick={() => handleNextClick(data.chapter_number)}
        >
          <HiOutlineChevronDoubleRight className="btn-icon" />
        </button>
      </div>
    </div>
  );
}
