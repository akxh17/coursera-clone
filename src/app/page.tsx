"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import Logo from "./components/Logo";
import About from "./components/About";
import Benefits from "./components/Benefits";
import CourseCard from "./components/CourseCard";

type Course = {
  id: number;
  img: string;
  title: string;
  skills: string;
  price: number;
  rating: number;
  duration: number;
  tag: string;
};

export default function Home() {
  const [courses, setCourses] = useState<Course[]>([]);
  useEffect(() => {
    async function fetchCourses() {
      try {
        const response = await fetch("/api/course_data");
        const sample = await response.json();
        setCourses(sample.data);
      } catch (error) {
        console.error("Error fetching course data:", error);
      }
    }
    fetchCourses();
  }, []);

  return (
    <>
      <div className="home--landing">
        <div className="home--intro--component">
          <h1 className="intro--header">
            Launch your new career with a Professional Certificate on Coursera
          </h1>
          <p className="intro--paragh">
            Professional Certificates offer flexible, online training designed
            to get you job-ready for high-growth fields.
          </p>
        </div>
        <Link href="/courses">
          <button className="intro--button">Get Started </button>
        </Link>
      </div>
      <Logo />
      <About />
      <Benefits />
      <div className="popular--course">
        <h2>Popular Courses</h2>
        <div className="home--course">
          {courses
            .filter((course) => course.tag === "popular")
            .map((course) => (
              <CourseCard key={course.id} data={course} />
            ))}
        </div>
      </div>
    </>
  );
}
