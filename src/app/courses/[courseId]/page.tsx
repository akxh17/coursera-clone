import CourseDetail from "@/app/components/CourseDetail";
import React from "react";

async function CourseDetailPage({ params }: { params: Promise<{ courseId: string }> }) {
  const courseId = (await params).courseId
  return <CourseDetail id={courseId} />;
}

export default CourseDetailPage;
