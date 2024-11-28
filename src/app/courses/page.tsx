import React from "react";
import CourseCard from "../components/CourseCard";
import SearchCourse from "../components/SearchCourse";
import { headers } from "next/headers";

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

async function CoursePage(props: {
  searchParams?: Promise<{ query?: string }>;
}) {
  const searchParams = await props.searchParams;
  const query = searchParams?.query || "";

  const headersInstance = await headers();
  const host = headersInstance.get("host");
  const protocol = host?.includes("localhost") ? "http" : "https";
  const baseUrl = `${protocol}://${host}`;

  let response = await fetch(`${baseUrl}/api/course_data`);
  let course = await response.json();
  let courses = course.data;

  const filteredCourses = courses.filter(
    (course: Course) =>
      course.title.toLowerCase().includes(query.toLowerCase()) ||
      course.skills.toLowerCase().includes(query.toLowerCase())
  );
  return (
    <div>
      <SearchCourse />
      <div className="course--container">
        {filteredCourses.length > 0 ? (
          filteredCourses.map((course: Course) => (
            <CourseCard key={course.cid} data={course} />
          ))
        ) : (
          <h3>No Courses Found</h3>
        )}
      </div>
    </div>
  );
}

export default CoursePage;
