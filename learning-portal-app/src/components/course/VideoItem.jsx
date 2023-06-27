import { selectCurrentVideoId } from "features/videos/videoSelectors";
import { selectedVideo } from "features/videos/videosSlice";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

const VideoItem = ({ video = {} }) => {
  const dispatch = useDispatch();
  const currentVideoId = useSelector(selectCurrentVideoId);

  const { id, title, views, duration } = video || {};

  // hanlde video play
  const handleClick = () => {
    dispatch(selectedVideo(video));
  };

  return (
    <div
      className={`w-full flex flex-row gap-2 cursor-pointer hover:bg-slate-900 p-2 py-3 rounded-md ${
        currentVideoId === id ? "bg-slate-900" : ""
      }`}
      onClick={handleClick}
    >
      <svg
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth="1.5"
        stroke="currentColor"
        className="w-6 h-6 md:w-7 md:h-7 flex-shrink-0 mt-1"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
        />
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M15.91 11.672a.375.375 0 010 .656l-5.603 3.113a.375.375 0 01-.557-.328V8.887c0-.286.307-.466.557-.327l5.603 3.112z"
        />
      </svg>
      <div clas="flex flex-col w-full">
        <Link
          to="#"
          className="inline-block text-slate-50 text-sm font-medium hover:text-violet-500 line-clamp-2"
        >
          {title}
        </Link>
        <div className="mt-1">
          <span className="text-gray-400 text-xs">{duration}</span>
          <span className="text-gray-400 text-xs"> | </span>
          <span className="text-gray-400 text-xs">{views} views</span>
        </div>
      </div>
    </div>
  );
};

export default VideoItem;
