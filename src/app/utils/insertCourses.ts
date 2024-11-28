import { createClient } from "edgedb";
import e from "../../../dbschema/edgeql-js";

const client = createClient();

const courses = [
  {
    id: 1,
    img: "/images/course/cybersecurity.jpg",
    title: "Cybersecurity for Everyone",
    skills: "Cyberattacks, Network Security, Risk Management",
    price: 499,
    rating: 4.7,
    duration: 3,
    tag: "popular",
  },
  {
    id: 2,
    img: "/images/course/htmlcss.png",
    title: "HTML, CSS, Javascript",
    skills: "Frontend Web Development, HTML and CSS, Javascript",
    price: 399,
    rating: 4.3,
    duration: 2,
    tag: "basic",
  },
  {
    id: 3,
    img: "/images/course/python.png",
    title: "Python Basics",
    skills: "Python programming, Problem Solving",
    price: 299,
    rating: 4.5,
    duration: 1,
    tag: "basic",
  },
  {
    id: 4,
    img: "/images/course/react.jpg",
    title: "Introduction to React",
    skills: "React fundamentals, Components, State management",
    price: 499,
    rating: 4.8,
    duration: 3,
    tag: "popular",
  },
  {
    id: 5,
    img: "/images/course/typescript.png",
    title: "Understanding TypeScript",
    skills: "Utility types, Generics, Unions",
    price: 299,
    rating: 4.2,
    duration: 1,
    tag: "basic",
  },
  {
    id: 6,
    img: "/images/course/nextjs.jpg",
    title: "Next.JS for Beginners",
    skills: "Routing, rendering, optimization, streaming",
    price: 399,
    rating: 4.7,
    duration: 2,
    tag: "popular",
  },
];

async function insertCourses() {
  try {
    for (const course of courses) {
      await e
        .insert(e.Course, {
          cid: course.id,
          img: course.img,
          title: course.title,
          skills: course.skills,
          price: course.price,
          rating: course.rating,
          duration: course.duration,
          tag: course.tag,
        })
        .run(client);
    }
    console.log("Courses inserted successfully.");
  } catch (error) {
    console.log("Error inserting course", error);
  }
}

insertCourses().catch((error) =>
  console.error("Unexpected error:", error.message)
);
