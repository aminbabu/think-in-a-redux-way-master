import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Video from "./Video";
import { videosAsync } from "../features/videos/videosSlice";
import Message from "../components/Message";

const VideoGrid = () => {
  const dispatch = useDispatch();
  const { isLoading, isError, error, videos } = useSelector(
    (state) => state.videos
  );
  const { tags, queryStr } = useSelector((state) => state.videoFilters);

  useEffect(() => {
    dispatch(videosAsync({ tags, searchStr: queryStr }));
  }, [dispatch, tags, queryStr]);

  let content = null;

  if (isLoading)
    content = <Message className="text-green-500">Loading...</Message>;

  if (!isLoading && isError)
    content = <Message className="text-red-500">{error}</Message>;

  if (!isLoading && !isError && videos?.length === 0)
    content = (
      <Message className="text-red-500">There is no video found!</Message>
    );

  if (!isLoading && !isError && videos?.length)
    content = videos.map((video) => <Video key={video.id} video={video} />);

  return (
    <section className="pt-12">
      <section className="pt-12">
        <div className="grid grid-cols-12 gap-4 max-w-7xl mx-auto px-5 lg:px-0 min-h-[300px]">
          {content}
        </div>
      </section>
    </section>
  );
};

export default VideoGrid;
