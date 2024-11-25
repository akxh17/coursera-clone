"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useGlobalContext } from "../context/GlobalContext";
import CourseCard from "./CourseCard";
import CourseLoading from "./CourseLoading";
import ProfileLoading from "./ProfileLoading";

type Profile = {
  uid: number;
  fullName: string;
  email: string;
  password: string;
  enrolled: number[];
};

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

function ProfileDetail({ pid }: { pid: string }) {
  const [profile, setProfile] = useState<Profile[]>([]);
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const { setUserId, setIsLogged } = useGlobalContext();

  function handleLogout() {
    setUserId(null);
    setIsLogged(false);
    router.push("/");
  }

  useEffect(() => {
    const storedUserId = localStorage.getItem("userId");
    const storedIsLogged = localStorage.getItem("isLogged") === "true";

    if (!storedUserId || !storedIsLogged) {
      router.push("/not-found");
    }
  }, []);

  useEffect(() => {
    async function fetchData() {
      try {
        const [profileResponse, coursesResponse] = await Promise.all([
          fetch("/api/profile_data"),
          fetch("/api/course_data"),
        ]);
        const user = await profileResponse.json();
        const course = await coursesResponse.json();
        setProfile(user.data);
        setCourses(course.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching profile data:", error);
      }
    }
    fetchData();
  }, []);

  const current = profile.find((curr) => curr.uid.toString() === pid);

  if (loading) {
    return (
      <div>
        <ProfileLoading />
        <div className="profile--course--loading">
          <CourseLoading />
        </div>
      </div>
    );
  }

  if (!current) {
    return <h2>Profile Not Found</h2>;
  }
  const { fullName, enrolled } = current;

  const enrolledCourses = courses.filter((course) =>
    enrolled.includes(course.cid)
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
              <CourseCard key={course.cid} data={course} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default ProfileDetail;
