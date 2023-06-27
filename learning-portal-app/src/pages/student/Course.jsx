import CourseVideo from "components/course/CourseVideo";
import VideoList from "components/course/VideoList";

const Course = () => {
  return (
    <section className="section">
      <div className="container">
        <div className="grid grid-cols-3 gap-6 lg:gap-8 content-start">
          <CourseVideo />
          <VideoList />
        </div>
      </div>
    </section>
  );
};

export default Course;
