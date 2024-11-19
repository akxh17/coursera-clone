import React from "react";
import Link from "next/link";
import Image from "next/image";
import { FaFacebook } from "react-icons/fa6";
import { FaSquareXTwitter } from "react-icons/fa6";
import { FaSquareInstagram } from "react-icons/fa6";
import { BsLinkedin } from "react-icons/bs";

function Footer() {
  return (
    <footer className="footer--container">
      <div className="footer--details">
        <Link href="/">
          <Image
            src="/images/Coursera-Logo.png"
            width={170}
            height={100}
            alt="coursera logo"
          />
        </Link>
        <div>
          <h3>Connect with us..</h3>
          <div className="icons--container">
            <Link href="https://www.facebook.com/Coursera/" target="_blank">
              <FaFacebook className="social--icon" />
            </Link>
            <Link
              href="https://x.com/coursera?ref_src=twsrc%5Egoogle%7Ctwcamp%5Eserp%7Ctwgr%5Eauthor"
              target="_blank"
            >
              <FaSquareXTwitter className="social--icon" />
            </Link>
            <Link
              href="https://www.instagram.com/coursera/?hl=en"
              target="_blank"
            >
              <FaSquareInstagram className="social--icon" />
            </Link>
            <Link
              href="https://www.linkedin.com/company/coursera/?originalSubdomain=in"
              target="_blank"
            >
              <BsLinkedin className="social--icon" />
            </Link>
          </div>
        </div>
      </div>
      <hr className="footer--line" />
      <p>&copy; 2024 Coursera. All Rights Reserved.</p>
    </footer>
  );
}

export default Footer;
