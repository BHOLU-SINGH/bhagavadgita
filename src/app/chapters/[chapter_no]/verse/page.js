'use client';

import useSWR from "swr";
import Border from "@/app/Components/Border";
import Footer from "@/app/Components/Footer";
import Navbar from "@/app/Components/Navbar";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const fetcher = async (url) => {
  const response = await fetch(url);
  const data = await response.json();
  return data.data;
};

export default function Page(props) {
  const chapter_no = props.params.chapter_no;
  const { data, error } = useSWR(
    `/api/chapters/${chapter_no}/verse/1`,
    fetcher
  );

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
      <div className="verse-explain">
        <div className="div div-1">
          <h2>BG {chapter_no}.1</h2>
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
          {data.commentaries
            .sort((a, b) => a.id - b.id)
            .map((commentariesItem) =>
              commentariesItem.author_name === "Swami Sivananda" ? (
                <p key={commentariesItem.id}>{commentariesItem.description}</p>
              ) : null
            )}
        </div>
      </div>
      <Footer />
    </div>
  );
}
