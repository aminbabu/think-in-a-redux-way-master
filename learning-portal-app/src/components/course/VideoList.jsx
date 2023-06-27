import { useGetVideosQuery } from "features/videos/videosAPI";
import VideoLoader from "../ui/loaders/VideoLoader";
import VideoItem from "./VideoItem";

const VideoList = () => {
  const { data, isLoading, isError } = useGetVideosQuery();
  const { data: videos = [] } = data || {};

  // decide what to renver
  let content = null;

  // fetching data
  if (isLoading) {
    content = (
      <div className="col-span-full lg:col-auto max-h-[520px] overflow-y-auto bg-slate-800/50 p-4 rounded-md border border-slate-50/10 divide-y divide-slate-600/30">
        <VideoLoader />
        <VideoLoader />
        <VideoLoader />
        <VideoLoader />
      </div>
    );
  }

  // if data found
  if (!isLoading && !isError && videos?.length > 0) {
    content = (
      <div className="col-span-full lg:col-auto max-h-[520px] overflow-y-auto bg-slate-800/50 p-4 rounded-md border border-slate-50/10 divide-y divide-slate-600/30">
        {videos?.map((video) => (
          <VideoItem key={video?.id} video={video} />
        ))}
      </div>
    );
  }

  return content;
};

export default VideoList;
