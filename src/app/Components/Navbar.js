"use client";

import Link from "next/link";
import { FaBars, FaRegUserCircle } from "react-icons/fa";

const Navbar = (props) => {
  const tabNumber = props.tabNumber;

  const links = [
    { href: "/chapters", label: "Chapters" },
    { href: "/chapters/1/verse/1", label: "Verses" },
    { href: "/about-us", label: "About" },
    { href: "/contact-us", label: "Contact" },
    { href: "/account/login", label: <FaRegUserCircle className="icon userLink" />, title: "Account" }
  ];

  return (
    <nav>
      <div className="logo" translate="no">BhagavadGita</div>
      <input type="checkbox" id="click" />
      <label htmlFor="click" className="menu-btn">
        <FaBars className="icon" />
      </label>
      <ul>
        {links.map((link, index) => (
          <li key={index} title={link.title}>
            <Link className={tabNumber === index + 1 ? "active" : ""} href={link.href}>
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Navbar;