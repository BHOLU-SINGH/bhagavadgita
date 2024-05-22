'use client'

import Link from "next/link";
import React, { useState } from "react";
import { FaBars } from "react-icons/fa";

const Navbar = (props) => {
  const [chapterNo, setChapterNo] = useState("");
  const [verseNo, setVerseNo] = useState("");
  const tabNumber = props.tabNumber;

  const searchData = () => {
    if(chapterNo && verseNo){
      // router.push(`/chapters/${chapterNo}/verse/${verseNo}`);
      console.log("Chapter no: ", chapterNo, "Verse no: ", verseNo);
    }
  }

  return (
    <nav>
      <div class="logo">BhagavadGita</div>
      <input type="checkbox" id="click" />
      <label for="click" class="menu-btn">
        {/* <i class="fas fa-bars"></i> */}
        <FaBars className="icon" />
      </label>
      {tabNumber === 1 ? (
        <ul>
          <li>
            <Link className="active" href="/chapters">
              Chapters
            </Link>
          </li>
          <li>
            <Link href="/chapters/1/verse/1">Verses</Link>
          </li>
          <li>
            <Link href="/about-us">About</Link>
          </li>
          <li>
            <Link href="/contact-us">Contact</Link>
          </li>
        </ul>
      ) : tabNumber === 2 ? (
        <ul>
          <li>
            <Link href="/chapters">Chapters</Link>
          </li>
          <li>
            <Link className="active" href="/chapters/1/verse/1">
              Verses
            </Link>
          </li>
          <li>
            <Link href="/about-us">About</Link>
          </li>
          <li>
            <Link href="/contact-us">Contact</Link>
          </li>
        </ul>
      ) : tabNumber === 3 ? (
        <ul>
          <li>
            <Link href="/chapters">Chapters</Link>
          </li>
          <li>
            <Link href="/chapters/1/verse/1">Verses</Link>
          </li>
          <li>
            <Link className="active" href="/about-us">
              About
            </Link>
          </li>
          <li>
            <Link href="/contact-us">Contact</Link>
          </li>
        </ul>
      ) : tabNumber === 4 ? (
        <ul>
          <li>
            <Link href="/chapters">Chapters</Link>
          </li>
          <li>
            <Link href="/chapters/1/verse/1">Verses</Link>
          </li>
          <li>
            <Link href="/about-us">About</Link>
          </li>
          <li>
            <Link className="active" href="/contact-us">
              Contact
            </Link>
          </li>
        </ul>
      ) : null}
    </nav>
  );
};

export default Navbar;
