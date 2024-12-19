"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import useSWR from "swr";
import { useRouter } from "next/navigation";

const fetcher = async (url) => {
  const response = await fetch(url);
  const data = await response.json();
  return data.data;
};

export default function FetchSloks(props) {
  const [search, setSearch] = useState("");
  const [isReversed, setIsReversed] = useState(false); // New state to track sorting order
  const verses_count = props.verses_count;
  const chapter_no = props.chapter_no;
  const router = useRouter();

  const { data: sloks, error } = useSWR(`/api/slok/${chapter_no}/`, fetcher);

  if (error) {
    toast.error(error || "Failed to load");
    return null; // Return null to avoid rendering if there's an error
  }

  if (!sloks) {
    return (
      <div className="spinner">
        <span className="loader"></span>
      </div>
    );
  }

  const reverseData = () => {
    setIsReversed(!isReversed);
  };

  function searchData(event) {
    event.preventDefault();
    if (search >= 1 && search <= verses_count) {
      router.push(`/chapters/${chapter_no}/verse/${search}`);
    }
  }

  return (
    <div className="sloks-container">
      <div className="chapter-verses">
        <h4>{verses_count} Verses</h4>
        <div>
          <form onSubmit={(event) => searchData(event)}>
            <input
              type="number"
              placeholder="Go To Verse"
              onKeyUp={(e) => setSearch(e.target.value)}
            />
          </form>
          <button type="button" onClick={() => reverseData()}>
            Sort
            <Image
              src="/down-icon1.png"
              alt="Image loading error"
              width={18}
              height={18}
              priority
            />
          </button>
        </div>
      </div>
      <div className="slokItemContainer">
        {(isReversed ? [...sloks].reverse() : sloks).map((slok) => (
          <Link
            href={`/chapters/${chapter_no}/verse/${slok.verse_number}`}
            key={slok.id}
          >
            <div className="slok-card">
              <h4>Verse: {slok.verse_number}</h4>
              <div>
                <p>{slok.text}</p>
                <p>{slok.translations[5].description}</p>
                {/* <p>{JSON.stringify(slok.result.data.siva.et)}</p> */}
                {/* <p>{JSON.stringify(slok.result.data.tej.ht)}</p> */}
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
