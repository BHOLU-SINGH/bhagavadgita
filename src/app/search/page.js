"use client";

import { useState } from "react";
import useSWR from "swr";
import { useRouter } from "next/navigation";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const fetcher = async (url) => {
  const response = await fetch(url);
  const data = await response.json();
  return data.data;
};

export default function Search() {
  const [chapterNo, setChapterNo] = useState("");
  const [verseNo, setVerseNo] = useState("");
  const router = useRouter();

  const { data, error } = useSWR(
    chapterNo && verseNo ? `/api/chapters/${chapterNo}/verse/${verseNo}` : null,
    fetcher
  );

  const toggleSeacrh = (event) => {
    event.preventDefault();

    if (chapterNo > 18) {
      toast.error(
        "Only 18 chapters available. Please enter a number between 1 and 18."
      );
      return; // Early return to avoid unnecessary fetch
    }
    if (!chapterNo || !verseNo) {
      toast.error("Please enter both chapter and verse numbers.");
      return; // Early return if inputs are not valid
    }

    if (error) {
      toast.error(error.message || "Failed to load");
      return; // Return to avoid rendering if there's an error
    }

    if (data) {
      router.push(`/chapters/${chapterNo}/verse/${verseNo}`);
    }
  };

  return (
    <div className="search-div">
      <ToastContainer />
      <form action="#" onSubmit={(event) => toggleSeacrh(event)}>
        {/* <RxCross1 className="icon-cross" onClick={()=>closeToggle()} /> */}
        <h2>Search</h2>
        <div className="form-control">
          <label>Enter Chapter Number</label>
          <input
            type="number"
            placeholder="chapters"
            onChange={(e) => setChapterNo(e.target.value)}
            required
          />
        </div>
        <div className="form-control">
          <label>Enter Chapter Number</label>
          <input
            type="number"
            placeholder="Verses"
            onChange={(e) => setVerseNo(e.target.value)}
            required
          />
        </div>
        <div className="btn-div">
          <button>Search</button>
        </div>
      </form>
    </div>
  );
}
