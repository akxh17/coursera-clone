"use client";
import React, { useState, FormEvent, useEffect } from "react";
import { IoLogInOutline } from "react-icons/io5";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useGlobalContext } from "../context/GlobalContext";

function loginPage() {
  const router = useRouter();
  const { setUserId, setIsLogged, isLogged } = useGlobalContext();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    if (isLogged) {
      router.push("/");
    } 
  }, []);

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();
    try {
      const response = await fetch("/api/user_data", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          action: "login",
          email,
          password,
        }),
      });
      if (!response.ok) {
        const data = await response.json();
        alert(data.message);
      } else {
        alert("User logged in successfully");
        const data = await response.json();
        setIsLogged(true);
        setUserId(data.user.id);
        router.push(`/profile/${data.user.id}`);
      }
    } catch (error) {
      console.error("Error during login:", error);
    }
  }

  return (
    <div className="main--login--container">
      <div className="login--container">
        <IoLogInOutline className="login--icon" />
        <h1>Welcome back</h1>
        <p>Please enter your email and password</p>
        <form className="login--form" onSubmit={handleSubmit}>
          <div className="login--input--container">
            <label className="input--label">Email</label>
            <input
              className="login--input"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="login--input--container">
            <label className="input--label">Password</label>
            <input
              className="login--input"
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button className="login--button">Login</button>
        </form>
        <p id="register--tag">
          Don't have an account? <Link href="/register">Register</Link>
        </p>
      </div>
    </div>
  );
}

export default loginPage;
