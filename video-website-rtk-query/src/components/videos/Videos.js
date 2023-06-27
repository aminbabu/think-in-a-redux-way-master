import Video from "./Video";
import { useGetVideosQuery } from "../../features/api/apiSlice";
import VideoLoader from "../ui/loaders/VideoLoader";
import Error from "../ui/Error";

export default function Videos() {
  const { isLoading, isError, data: videos } = useGetVideosQuery();

  let contnet = null;

  if (isLoading)
    contnet = (
      <>
        <VideoLoader />
        <VideoLoader />
        <VideoLoader />
        <VideoLoader />
      </>
    );

  if (!isLoading && isError)
    contnet = <Error>There was an error occured!</Error>;

  if (!isLoading && !isError && videos?.length === 0)
    contnet = <Error>There is no video found!</Error>;

  if (!isLoading && !isError && videos?.length)
    contnet = videos.map((video) => <Video key={video.id} video={video} />);

  return contnet;
}
