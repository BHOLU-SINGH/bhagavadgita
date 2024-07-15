import Link from "next/link";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function FetchSloks(props) {
  const [search, setSearch] = useState("");
  const [sloks, setSloks] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const verses_count = props.verses_count;
  const chapter_no = props.chapter_no;

  const router = useRouter();

  useEffect(() => {
    const getAllVerses = async () => {
      setIsLoading(true);
      const response = await fetch(`/api/slok/${chapter_no}/`);
      const data = await response.json();
      // return data;
      setSloks(data.data);
      setIsLoading(false);
    };
    
    getAllVerses();
  }, [setIsLoading, chapter_no, setSloks]);

  if (isLoading)
    return (
      <div className="spinner">
        <span class="loader"></span>
      </div>
    );
  if (error) return <div>Error: {error}</div>;

  const reverseData = () => {
    setSloks([...sloks].reverse());
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
        {sloks &&
          sloks.map((slok) => (
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
