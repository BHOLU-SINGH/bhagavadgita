import Image from "next/image";

export default function ChapterCard(props) {
    const data = props.item;
  return (
    <div className="chapter-item">
      <p className="chapter-number">
        <span>Chapter {data.chapter_number}</span>
      </p>
      <p className="chapter-title">
        {data.meaning.en} : {data.meaning.hi}
      </p>
      <p className="chapter-summary truncate-4">{data.summary.en}</p>
      <p className="chapter-verse">
        <Image
          src="/list-icon1.png"
          alt="Image loading error"
          width={18}
          height={18}
          priority
        />
        {data.verses_count} Verses
      </p>
    </div>
  );
}
