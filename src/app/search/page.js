"use client";

import { useState } from "react";
// import { RxCross1 } from "react-icons/rx";
import { useRouter } from "next/navigation";

export default function Search() {
  const [chapterNo, setChapterNo] = useState("");
  const [verseNo, setVerseNo] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const router = useRouter();

  const toggleSeacrh = (event) => {
    event.preventDefault();
    setIsLoading(true);

    fetch(`http://localhost:3000/api/chapters/${chapterNo}/verse/${verseNo}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        // setData(data.result.data);
        if(data.success == true) {
            router.push(`/chapters/${chapterNo}/verse/${verseNo}`);
        }
        setIsLoading(false);
      })
      .catch((error) => {
        setError(error.message);
        setIsLoading(false);
      });
  };

  if (isLoading)
    return (
      <div className="spinner">
        <span class="loader"></span>
      </div>
    );
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="search-div">
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
