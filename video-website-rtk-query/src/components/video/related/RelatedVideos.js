import RelatedVideo from "./RelatedVideo";
import { useGetRelatedVideosQuery } from "../../../features/api/apiSlice";
import RelatedVideoLoader from "../../ui/loaders/RelatedVideoLoader";
import Error from "../../ui/Error";

export default function RelatedVideos({ id, title }) {
  const {
    isLoading,
    isError,
    data: videos,
  } = useGetRelatedVideosQuery({ id, title });

  let content = null;

  if (isLoading)
    content = (
      <>
        <RelatedVideoLoader />
        <RelatedVideoLoader />
        <RelatedVideoLoader />
      </>
    );

  if (!isLoading && isError)
    content = (
      <Error className="col-span-full lg:col-span-1">
        There was an error occured!
      </Error>
    );

  if (!isLoading && !isError && videos?.length === 0)
    content = <Error>There is no related videos found!</Error>;

  if (!isLoading && !isError && videos?.length)
    content = videos.map((video) => (
      <RelatedVideo key={video.id} video={video} />
    ));

  return (
    <div className="col-span-full lg:col-auto max-h-[570px] overflow-y-auto">
      {content}
    </div>
  );
}
