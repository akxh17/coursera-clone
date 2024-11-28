import CourseLoading from "../components/CourseLoading";

function Loading() {
  return (
    <div>
      <div className="loading--container">
        <p className="loading--text">Loading....</p>
        <div className="loading--card">
          <CourseLoading />
          <CourseLoading />
          <CourseLoading />
        </div>
      </div>
    </div>
  );
}

export default Loading;
