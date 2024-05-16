import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Bhagavad Gita - Powered by FreeProjects1",
  description:
    "The Bhagavad Gita is a sacred Hindu scripture that is part of the epic Mahabharata. It is a dialogue between the warrior Arjuna and his charioteer Krishna, who is revealed to be an avatar of the divine. The Gita offers profound insights into the nature of life, duty, and spiritual enlightenment. Our website provides a comprehensive resource for readers to explore the 18 chapters and every verse of this timeless text.",
  keywords:
    "Bhagavad Gita, Hinduism, Mahabharata, Arjuna, Krishna, spirituality, philosophy, Duty, karma, devotaion, enlightenment, spiritual wisdom",
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
        {/* <link rel="icon" href="/favicon.ico" /> */}
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/apple-touch-icon.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/favicon-16x16.png"
        />
        <link rel="manifest" href="/site.webmanifest" />
        <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#5bbad5" />
        <meta name="msapplication-TileColor" content="#da532c" />
        <meta name="theme-color" content="#ffffff" />
      </head>
      <body className={inter.className}>{children}</body>
    </html>
  );
}
