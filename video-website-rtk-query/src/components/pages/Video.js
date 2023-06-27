import { useGetVideoQuery } from "../../features/api/apiSlice";
import Description from "../video/Description";
import Player from "../video/Player";
import RelatedVideos from "../video/related/RelatedVideos";
import PlayerLoader from "../ui/loaders/PlayerLoader";
import DescriptionLoader from "../ui/loaders/DescriptionLoader";
import RelatedVideoLoader from "../ui/loaders/RelatedVideoLoader";
import Error from "../ui/Error";
import { useParams } from "react-router-dom";
import { Fragment } from "react";

export default function Video() {
  const { videoId } = useParams();
  const { isLoading, isError, data: video } = useGetVideoQuery(videoId);

  let content = null;

  if (isLoading)
    content = (
      <>
        <PlayerLoader /> <DescriptionLoader />
      </>
    );

  if (!isLoading && isError)
    content = <Error>There was an error occured!</Error>;

  if (!isLoading && !isError && video?.id)
    content = (
      <Fragment key={video.id}>
        <Player title={video.title} link={video.link} />
        <Description video={video} />
      </Fragment>
    );

  return (
    <section className="pt-6 pb-20 min-h-[calc(100vh_-_157px)]">
      <div className="mx-auto max-w-7xl px-2 pb-20 min-h-[400px]">
        <div className="grid grid-cols-3 content-start gap-2 lg:gap-8">
          <div className="col-span-full w-full space-y-8 lg:col-span-2">
            {content}
          </div>

          {video?.id ? (
            <RelatedVideos id={video.id} title={video.title} />
          ) : isLoading ? (
            <Fragment>
              <RelatedVideoLoader />
              <RelatedVideoLoader />
              <RelatedVideoLoader />
            </Fragment>
          ) : (
            <Error className="col-span-full lg:col-span-1">
              There was an error occured!
            </Error>
          )}
        </div>
      </div>
    </section>
  );
}
