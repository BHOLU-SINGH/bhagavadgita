import Link from "next/link";
import {
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaYoutube,
  FaRegCopyright,
} from "react-icons/fa";
import { CiLocationOn, CiMail } from "react-icons/ci";
import { IoCallOutline } from "react-icons/io5";
import GetCurrYear from "./GetCurrYear";

export default function Footer() {
  const currentYear = GetCurrYear();
  return (
    <footer>
      <div className="main-content">
        <div className="left box">
          <h2>Bhagavad Gita</h2>
          <p>
            Explore the profound wisdom of the Bhagavad Gita, a pivotal Hindu scripture from the epic Mahabharata, through our interactive platform. Our website offers an in-depth exploration of all 18 chapters and every verse, providing you with comprehensive resources to understand and apply the Gita’s timeless teachings on life, duty, and enlightenment.
          </p>
          <div className="social">
            <Link href="https://facebook.com/freeprojects1/">
              <FaFacebookF className="icon" />
            </Link>
            <Link href="https://twitter.com/bholu7972/">
              <FaTwitter className="icon" />
            </Link>
            <Link href="https://instagram.com/freeprojects1/">
              <FaInstagram className="icon" />
            </Link>
            <Link href="https://youtube.com/@freeprojects1?sub_confirmation=1">
              <FaYoutube className="icon" />
            </Link>
          </div>
        </div>
        <div className="center box">
          <h2>Address</h2>
          <div className="box-details">
            <div className="place">
              <CiLocationOn className="icon" />
              <Link
                className="text"
                href="https://www.google.com/maps/place/Sanganer,+Jaipur,+Rajasthan/@26.8105588,75.7328596,13z/data=!3m1!4b1!4m6!3m5!1s0x396dca6cc31968b1:0x30a5a0acd5c3017b!8m2!3d26.8191641!4d75.7659513!16s%2Fm%2F043qvtr?entry=ttu"
                target="_blank"
              >
                Sangener, Jaipur, Rajasthan 302029
              </Link>
            </div>
            <div className="phone">
              <IoCallOutline className="icon" />
              <Link className="text" href="tel:+917297038128">
                +91 7297038128
              </Link>
            </div>
            <div className="email">
              <CiMail className="icon" />
              <Link className="text" href="mailto:bsdhaked786@gmail.com">
                bsdhaked786@gmail.com
              </Link>
            </div>
          </div>
        </div>
        <div className="right box">
          {/* <h2>Contact us</h2>
          <form action="#">
            <div class="email">
              <span className="text">Email *</span>
              <input type="email" required />
            </div>
            <div className="msg">
              <span className="text">Message *</span>
              <textarea rows="2" cols="25" required></textarea>
            </div>
            <div className="btn">
              <button type="submit">Send</button>
            </div>
          </form> */}
          <h2>Links</h2>
          <Link href="/">Home</Link>
          <Link href="/chapters/1/verse">Verses</Link>
          <Link href="/search">Search</Link>
          <Link href="/about-us">About-Us</Link>
          <Link href="/contact-us">Contact-Us</Link>
        </div>
      </div>
      <div className="bottom">
        <span className="credit">
          Created By-
          <Link href="https://freeprojects1.blogspot.com">FreeProjects1</Link>|
        </span>
        <FaRegCopyright className="icon" />
        <span> {currentYear} All rights reserved.</span>
      </div>
    </footer>
  );
}
