import Link from "next/link";

export default function Header() {
  return (
    <>
      <h1>The Tech Scout</h1>
      <nav>
        <Link href="/">Home</Link>
        <Link href="/reviewsPage">Reviews Page</Link>
      </nav>
    </>
  );
}
