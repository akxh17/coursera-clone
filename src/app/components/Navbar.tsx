"use client";
import React from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useGlobalContext } from "../context/GlobalContext";

const navLinks = [
  { name: "Home", href: "/" },
  { name: "Courses", href: "/courses" },
];

function Navbar() {
  const pathname = usePathname();
  const { isLogged, userId } = useGlobalContext();

  return (
    <div className="navbar--container">
      <Link href="/">
        <Image
          src="/images/Coursera-Logo.png"
          width={170}
          height={100}
          alt="coursera logo"
        />
      </Link>

      <div className="link--container">
        {navLinks.map((link) => {
          const isActive = pathname === link.href;
          return (
            <Link
              href={link.href}
              key={link.name}
              className={isActive ? "active--link" : "inactive--link"}
            >
              {link.name}
            </Link>
          );
        })}

        {isLogged ? (
          <Link
            href={`/profile/${userId}`}
            className={
              pathname === `/profile/${userId}` ? "active--link" : "inactive--link"
            }
          >
            Profile
          </Link>
        ) : (
          <>
            <Link
              href="/login"
              className={
                pathname === "/login" ? "active--link" : "inactive--link"
              }
            >
              Login
            </Link>
            <Link
              href="/register"
              className={
                pathname === "/register" ? "active--link" : "inactive--link"
              }
            >
              Register
            </Link>
          </>
        )}
      </div>
    </div>
  );
}

export default Navbar;
