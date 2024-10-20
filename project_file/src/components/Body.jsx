import { Orbitron } from "next/font/google";
import "./body.css";

const orbitron = Orbitron({
  weight: "800",
  style: "normal",
  subsets: ["latin"],
});

export default function Body() {
  return (
    <>
      <div className="mainText">
        <h1 className={orbitron.className}>The Tech Scout</h1>
      </div>

      <p className="bodyText">
        Welcome to The Tech Scout, your trusted guide in the world of
        technology! Whether you're a gadget enthusiast, a curious consumer, or a
        tech professional, we’re here to help you navigate the fast-paced
        landscape of modern innovation. <br />
        <br /> At The Tech Scout, we bring you in-depth reviews, expert
        insights, and the latest trends, ensuring you stay informed and make the
        best decisions when it comes to your tech needs. From cutting-edge
        smartphones to groundbreaking gadgets, we're dedicated to providing
        honest and thorough reviews to help you scout out the best in tech. Stay
        tuned, stay savvy, and let us lead the way!
      </p>
    </>
  );
}
