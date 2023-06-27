import { selectCurrentVideo } from "features/videos/videoSelectors";
import { useSelector } from "react-redux";
import Player from "./Player";
import VideoDescription from "./VideoDescription";

const CourseVideo = () => {
  const video = useSelector(selectCurrentVideo);

  return (
    <div className="col-span-full w-full space-y-8 lg:col-span-2">
      <Player title={video?.title} url={video?.url} />
      <VideoDescription video={video} />
    </div>
  );
};

export default CourseVideo;
