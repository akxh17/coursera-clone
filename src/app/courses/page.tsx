"use client";

import React, { useState, useEffect } from "react";
import CourseCard from "../components/CourseCard";

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

function CoursesPage() {
  const [courses, setCourses] = useState<Course[]>([]);
  const [searchQuery, setSearchQuery] = useState("");

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
      <div className="course--container">
        {filteredCourses.length > 0 ? (
          filteredCourses.map((course) => (
            <CourseCard key={course.id} data={course} />
          ))
        ) : (
          <h3>No Courses Found</h3>
        )}
      </div>
    </div>
  );
}

export default CoursesPage;
