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
    const fetchSloks = async () => {
      const fetchedSloks = [];
      for (let number = 1; number <= verses_count; number++) {
        try {
          const response = await fetch(
            `http://localhost:3000/api/slok/${chapter_no}/${number}`
          );
          if (!response.ok) {
            throw new Error(`API call failed with status ${response.status}`);
          }
          const data = await response.json();
          fetchedSloks.push(data);
        } catch (err) {
          setError(err.message);
          setIsLoading(false);
          return;
        }
      }
      setSloks(fetchedSloks);
      setIsLoading(false);
    };

    fetchSloks();
  }, []);

  if (isLoading)
    return (
      <div className="spinner">
        <span class="loader"></span>
      </div>
    );
  if (error) return <div>Error: {error}</div>;

  const reverseData = () => {
    setSloks([...sloks].reverse());
  }

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
          <input type="number" placeholder="Go To Verse" onKeyUp={(e) => setSearch(e.target.value)} />
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
      {sloks &&
        sloks.map((slok) => (
          <Link href={`/chapters/${chapter_no}/verse/${JSON.stringify(slok.result.data.verse)}`}>
            <div key={slok.result.data._id} className="slok-card">
              <h4>Verse: {JSON.stringify(slok.result.data.verse)}</h4>
              <div>
                <p>{JSON.stringify(slok.result.data.siva.et)}</p>
                <p>{JSON.stringify(slok.result.data.tej.ht)}</p>
              </div>
            </div>
          </Link>
        ))}
    </div>
  );
}
