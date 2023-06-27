import React, { useEffect } from "react";
import RelatedVideoList from "../components/RelatedVideoList";
import Player from "../components/Player";
import Description from "../components/Description";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { videoAsync } from "../features/video/videoSlice";
import Message from "../components/Message";

const VideoDescription = () => {
  const dispatch = useDispatch();
  const { isLoading, isError, error, video } = useSelector(
    (state) => state.video
  );

  const { videoId } = useParams();

  useEffect(() => {
    dispatch(videoAsync(videoId));
  }, [dispatch, videoId]);

  let content = null;

  if (isLoading)
    content = <Message className="text-green-500">Loading...</Message>;
  if (!isLoading && isError)
    content = <Message className="text-red-500">{error}</Message>;
  if (!isLoading && !isError && !video?.id)
    content = (
      <Message className="text-red-500">There is no video found!</Message>
    );
  if (!isLoading && !isError && video?.id)
    content = (
      <div className="grid grid-cols-3 gap-2 lg:gap-8">
        <div className="col-span-full w-full space-y-8 lg:col-span-2">
          <Player title={video.title} link={video.link} />
          <Description video={video} />
        </div>
        <RelatedVideoList video={video} />
      </div>
    );

  return (
    <section className="pt-6 pb-20">
      <div className="mx-auto max-w-7xl px-2 pb-20 min-h-[400px]">
        {content}
      </div>
    </section>
  );
};

export default VideoDescription;
