import React, { useEffect } from "react";
import RelatedVideo from "./RelatedVideo";
import { relatedVideosAsync } from "../features/relatedVideos/relatedVideosSlice";
import { useDispatch, useSelector } from "react-redux";
import Message from "./Message";

const RelatedVideoList = ({ video }) => {
  const dispatch = useDispatch();
  const { isLoading, isError, relatedVideos } = useSelector(
    (state) => state.relatedVideos
  );

  const { id, tags } = video || {};

  useEffect(() => {
    dispatch(relatedVideosAsync({ id, tags }));
  }, [dispatch, id, tags]);

  let content = null;
  if (isLoading)
    content = <Message className="text-green-500">Loading...</Message>;
  if (!isLoading && !isError && relatedVideos?.length)
    content = relatedVideos.map((relatedVideo) => (
      <RelatedVideo key={relatedVideo.id} relatedVideo={relatedVideo} />
    ));

  return (
    <div className="col-span-full lg:col-auto max-h-[570px] overflow-y-auto">
      {content}
    </div>
  );
};

export default RelatedVideoList;
