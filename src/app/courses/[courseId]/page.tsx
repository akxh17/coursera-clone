import CourseDetail from "@/app/components/CourseDetail";
import React from "react";

async function CourseDetailPage({ params }: { params: { courseId: string } }) {
  const { courseId } = await params;
  return <CourseDetail id={courseId} />;
}

export default CourseDetailPage;
