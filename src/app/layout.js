import { Inter } from "next/font/google";
import "./globals.css";
import AudioPlayer from "./Components/AudioPlayer";
import ScrollToTop from "./Components/ScrollToTop";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Bhagavad Gita - Powered by FreeProjects1",
  description:
    "The Bhagavad Gita is a sacred Hindu scripture that is part of the epic Mahabharata. It is a dialogue between the warrior Arjuna and his charioteer Krishna, who is revealed to be an avatar of the divine. The Gita offers profound insights into the nature of life, duty, and spiritual enlightenment. Our website provides a comprehensive resource for readers to explore the 18 chapters and every verse of this timeless text.",
  keywords:
    "Bhagavad Gita, Hinduism, Mahabharata, Arjuna, Krishna, spirituality, philosophy, Duty, karma, devotaion, enlightenment, spiritual wisdom, bhagavadgita1, freeprojects1",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>{metadata.title}</title>
        <meta name="keywords" content={metadata.keywords} />
        <meta name="description" content={metadata.description} />
        <link rel="icon" href="/favicon.png" />
        <meta name="theme-color" content="#ffffff" />
      </head>
      <body className={inter.className}>
        <>
          <AudioPlayer />
          {children}
          <ScrollToTop />
        </>
      </body>
    </html>
  );
}
