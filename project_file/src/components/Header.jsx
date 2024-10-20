import Link from "next/link";
import "./header.css";
import { Orbitron } from "next/font/google";

const orbitron = Orbitron({
  weight: "400",
  style: "normal",
  subsets: ["latin"],
});

export default function Header() {
  return (
    <div className="headerContainer">
      <div className="headerTitle">
        <h1 className={orbitron.className}>The Tech Scout</h1>
      </div>
      <nav className="navBar">
        <Link href="/">Home </Link> |
        <Link href="/reviewsPage"> Reviews Page</Link>
      </nav>
    </div>
  );
}
