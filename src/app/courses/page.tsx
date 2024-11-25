"use client";
import React, { useState, useEffect } from "react";
import CourseCard from "../components/CourseCard";
import CourseLoading from "../components/CourseLoading";

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

function CoursesPage() {
  const [courses, setCourses] = useState<Course[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchCourses() {
      try {
        const response = await fetch("/api/course_data");
        const course = await response.json();
        setCourses(course.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching course data:", error);
      }
    }
    fetchCourses();
  }, []);

  const filteredCourses = courses.filter(
    (course) =>
      course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      course.skills.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div>
      <div className="course--search--container">
        <h1>Explore Courses</h1>
        <input
          className="course--search"
          type="text"
          placeholder="Search courses..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>
      {loading ? (
        <div className="loading--container">
          <p className="loading--text">Loading....</p>
          <div className="loading--card">
            <CourseLoading />
            <CourseLoading />
            <CourseLoading />
          </div>
        </div>
      ) : (
        <div className="course--container">
          {filteredCourses.length > 0 ? (
            filteredCourses.map((course) => (
              <CourseCard key={course.cid} data={course} />
            ))
          ) : (
            <h3>No Courses Found</h3>
          )}
        </div>
      )}
    </div>
  );
}

export default CoursesPage;
