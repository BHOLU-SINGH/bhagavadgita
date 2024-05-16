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

export default function Footer() {
  return (
    <footer>
      <div className="main-content">
        <div className="left box">
          <h2>About Us</h2>
          <p>
            FreeProjects1 is a free blog where you can get web designing, web
            development, ui/ux designing, html css projects, hover animation and
            effects, javascript and jquery projects and related so on.
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
          <h2>Contact us</h2>
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
          </form>
        </div>
      </div>
      <div className="bottom">
        <span className="credit">
          Created By
          <Link href="https://freeprojects1.blogspot.com">FreeProjects1</Link>|
        </span>
        <FaRegCopyright className="icon" />
        <span> 2024 All rights reserved.</span>
      </div>
    </footer>
    // <footer>
    //   <div class="main-content">
    //     <div class="left box">
    //       <h2>About us</h2>
    //       <div class="content">
    //         <p>
    //           CodinNepal is a YouTube channel where you can learn web designing,
    //           web development, ui/ux designing, html css tutorial, hover
    //           animation and effects, javascript and jquery tutorial and related
    //           so on.
    //         </p>
    //         <div class="social">
    //           <Link href="https://facebook.com/coding.np">
    //             <span class="fab fa-facebook-f"></span>
    //           </Link>
    //           <Link href="https://twitter.com/coding_nepal">
    //             <span class="fab fa-twitter"></span>
    //           </Link>
    //           <Link href="https://instagram.com/coding.np">
    //             <span class="fab fa-instagram"></span>
    //           </Link>
    //           <Link href="https://youtube.com/codingnepal">
    //             <span class="fab fa-youtube"></span>
    //           </Link>
    //         </div>
    //       </div>
    //     </div>
    //     <div class="center box">
    //       <h2>Address</h2>
    //       <div class="content">
    //         <div class="place">
    //           <span class="fas fa-map-marker-alt"></span>
    //           <span class="text">Birendranagar, Surkhet</span>
    //         </div>
    //         <div class="phone">
    //           <span class="fas fa-phone-alt"></span>
    //           <span class="text">+089-765432100</span>
    //         </div>
    //         <div class="email">
    //           <span class="fas fa-envelope"></span>
    //           <span class="text">abc@example.com</span>
    //         </div>
    //       </div>
    //     </div>
    //     <div class="right box">
    //       <h2>Contact us</h2>
    //       <div class="content">
    //         <form action="#">
    //           <div class="email">
    //             <div class="text">Email *</div>
    //             <input type="email" required />
    //           </div>
    //           <div class="msg">
    //             <div class="text">Message *</div>
    //             <textarea rows="2" cols="25" required></textarea>
    //           </div>
    //           <div class="btn">
    //             <button type="submit">Send</button>
    //           </div>
    //         </form>
    //       </div>
    //     </div>
    //   </div>
    //   <div class="bottom">
    //     <center>
    //       <span class="credit">
    //         Created By
    //         <Link href="https://www.codingnepalweb.com">FreeProjects1</Link>|
    //       </span>
    //       <span class="far fa-copyright"></span>
    //       <span> 2024 All rights reserved.</span>
    //     </center>
    //   </div>
    // </footer>
  );
}
