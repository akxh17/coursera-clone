"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useGlobalContext } from "../context/GlobalContext";
import CourseCard from "./CourseCard";

type Profile = {
  id: string;
  fullName: string;
  email: string;
  password: string;
  enrolled: string[];
};

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

function ProfileDetail({ pid }: { pid: string }) {
  const [profile, setProfile] = useState<Profile[]>([]);
  const [courses, setCourses] = useState<Course[]>([]);
  const router = useRouter();
  const { setUserId, setIsLogged, userId, isLogged } = useGlobalContext();

  function handleLogout() {
    setUserId(null);
    setIsLogged(false);
    router.push("/");
  }

  useEffect(() => {
    if (!userId) {
      router.push("/not-found");
    } else if (!isLogged) {
      router.push("/not-found");
    }
  }, []);

  useEffect(() => {
    async function fetchProfile() {
      try {
        const response = await fetch("/api/profile_data");
        const user = await response.json();
        setProfile(user.data);
      } catch (error) {
        console.error("Error fetching profile data:", error);
      }
    }
    fetchProfile();
  }, []);

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

  const current = profile.find((curr) => curr.id.toString() === pid);

  if (!current) {
    return <h2>Profile Not Found</h2>;
  }
  const { fullName, enrolled } = current;

  const enrolledCourses = courses.filter((course) =>
    enrolled.includes(course.id.toString())
  );

  return (
    <div>
      <div className="profile--title--container">
        <h1>Welcome</h1>
        <p>{fullName}</p>
        <button className="logout--button" onClick={handleLogout}>
          Log Out
        </button>
      </div>
      <div className="profile--course">
        <h1>{enrolled.length === 0 ? "" : "My Courses"}</h1>
        {enrolled.length === 0 ? (
          <p className="empty--course">
            You have not enrolled in any courses yet.
          </p>
        ) : (
          <div className="enrolled-courses">
            {enrolledCourses.map((course) => (
              <CourseCard key={course.id} data={course} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default ProfileDetail;
