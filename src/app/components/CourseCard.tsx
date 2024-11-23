"use client";
import React from "react";
import Image from "next/image";
import { FaStar } from "react-icons/fa";
import { useRouter } from "next/navigation";

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

function CourseCard({ data }: { data: Course }) {
  const router = useRouter();
  function handleClick() {
    router.push(`/courses/${data.cid}`);
  }
  const { img, title, skills, price, rating, duration } = data;
  return (
    <div className="course--card--container" onClick={handleClick}>
      <Image src={img} alt={`${title}`} width={500} height={300} />
      <div className="course--header">
        <h3>{title}</h3>
        <p>
          <strong>Skills:</strong> {skills}
        </p>
        <p>
          <FaStar className="rating--icon" /> {rating}
        </p>
      </div>

      <h3 className="course--price">Rs.{price}</h3>
      <p className="course--duration">
        <strong>Duration:</strong> {duration} month
      </p>
    </div>
  );
}

export default CourseCard;
