import localFont from "next/font/local";
import "@/styles/globals.scss";
import Header from "@/components/organisms/header/Header";

export const metadata = {
  title: "Practical test - Frontend",
  description: "Practical test - Frontend - Meli",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Header />
        <div className="mainContainer">{children}</div>
      </body>
    </html>
  );
}
