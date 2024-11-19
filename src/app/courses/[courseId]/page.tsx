import CourseDetail from "@/app/components/CourseDetail";
import React from "react";

async function CourseDetailPage(context: { params: { courseId: string } }) {
  const { courseId } = context.params;
  return <CourseDetail id={courseId} />;
}

export default CourseDetailPage;
