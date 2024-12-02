import localFont from "next/font/local";
import "@/styles/globals.scss";
import Header from "@/components/organisms/header/Header";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata = {
  title: "Practical test - Frontend",
  description: "Practical test - Frontend - Meli",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        <Header />
        
        <div className="mainContainer">
        {children}

        </div>
      </body>
    </html>
  );
}
