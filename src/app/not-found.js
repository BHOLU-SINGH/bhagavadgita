import Image from "next/image";
import Link from "next/link";

export default function NotFound() {
  return (
    <div className="not-found">
      <div>
        <h1>404</h1>
        <Image 
            src={"/line-icon1.png"}
            alt="Image loading error"
            width={40}
            height={35}
            priority
        />
        <h2>Oops! Page Not Found</h2>
      </div>
      <p>Sorry, the page you are looking for does not exist.</p>
      <p className="homeurl">Go to <Link href="/">home</Link> page.</p>
    </div>
  );
}
