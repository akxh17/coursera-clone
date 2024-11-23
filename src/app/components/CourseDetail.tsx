"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import { FaStar } from "react-icons/fa";
import { useRouter } from "next/navigation";
import { useGlobalContext } from "../context/GlobalContext";

type Course = {
  cid: number;
  img: string;
  title: string;
  skills: string;
  price: number;
  rating: number;
  duration: number;
  tag: string;
};

function CourseDetail({ id }: { id: string }) {
  const [courses, setCourses] = useState<Course[]>([]);
  const { isLogged, userId } = useGlobalContext();
  const router = useRouter();

  useEffect(() => {
    async function fetchCourses() {
      try {
        const response = await fetch("/api/course_data");
        const course = await response.json();
        setCourses(course.data);
      } catch (error) {
        console.error("Error fetching course data:", error);
      }
    }
    fetchCourses();
  }, []);

  const current = courses.find((course) => course.cid.toString() === id);

  if (!current) {
    return <h2>Course Not Found</h2>;
  }
  const { img, title, skills, price, rating, duration } = current;

  async function handleEnroll() {
    if (!isLogged) {
      router.push("/login");
      return;
    }
    try {
      const response = await fetch(`/api/profile_data/${userId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ courseId: id }),
      });

      const data = await response.json();

      if (response.ok) {
        alert(data.message);
      } else {
        alert(data.message);
      }
    } catch (error) {
      console.error("Error enrolling in course:", error);
    }
  }

  return (
    <div className="course--details--container">
      <div>
        <Image src={img} alt={`${title}`} width={1000} height={600} />
      </div>
      <div className="course--details">
        <h1>{title}</h1>
        <hr />
        <div className="course--sub--details">
          <p>
            <strong>Skills:</strong> {skills}
          </p>
          <p>
            <strong>Duration:</strong> {duration} month
          </p>
          <p>
            <FaStar className="rating--icon" /> {rating}
          </p>

          <h2>Rs.{price}</h2>
          <button className="enroll--button" onClick={handleEnroll}>
            ENROLL
          </button>
        </div>
      </div>
    </div>
  );
}

export default CourseDetail;
