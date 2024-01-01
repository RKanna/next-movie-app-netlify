import { Inter } from "next/font/google";
import "./globals.css";
import Header from "./components/Header";
import "bootstrap/dist/css/bootstrap.min.css";
import Footer from "./components/Footer";
import "@fortawesome/fontawesome-free/css/all.min.css";
// import "bootstrap/dist/js/bootstrap.bundle.min";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Movie App",
  description: "Its a Movie Recommendation App",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      {/* <body className={inter.className}> */}
      <body className={`bg-img ${inter.className}`}>
        <Header />
        <main className="for-height">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
