"use client";

import Border from "@/app/Components/Border";
import Footer from "@/app/Components/Footer";
import Navbar from "@/app/Components/Navbar";
import Image from "next/image";
import React, { useEffect, useState } from "react";

export default function Page(props) {
  const chapter_no = props.params.chapter_no;
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getSingleVerse = async () => {
      try {
        setIsLoading(true);
        const response = await fetch(`/api/chapters/${chapter_no}/verse/1`);
        const data = await response.json();
        setData(data.data);
        setIsLoading(false);
      } catch (error) {
        setError(error);
      }
    };

    getSingleVerse();
  }, [setIsLoading, chapter_no, setData, setError]);

  if (isLoading)
    return (
      <div className="spinner">
        <span class="loader"></span>
      </div>
    );
  if (error) return <p>Error: {error}</p>;

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
      <div className="verse-explain">
        <div className="div div-1">
          <h2>
            BG {chapter_no}.1
          </h2>
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
