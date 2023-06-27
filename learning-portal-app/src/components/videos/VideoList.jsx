import VideoForm from "components/form/VideoForm";
import Message from "components/ui/Message";
import Modal from "components/ui/Modal";
import Pagination from "components/ui/Pagination";
import TableDataLoader from "components/ui/loaders/TableDataLoader";
import {
  useGetVideosQuery,
  useLazyGetVideoQuery,
} from "features/videos/videosAPI";
import ModalFormLayout from "layouts/ModalFormLayout";
import NotFound from "pages/NotFound";
import { Fragment, useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import Video from "./Video";

const PAGE_LIMIT = process.env.REACT_APP_PAGE_LIMIT || 10;

const VideoList = () => {
  const [open, setOpen] = useState(false);
  const [notFound, setNotFound] = useState(false);
  const [start, setStart] = useState(0);
  const [end, setEnd] = useState(PAGE_LIMIT);

  const navigate = useNavigate();
  const { videoId } = useParams();

  const queryStr = `?_start=${start}&_end=${end}`;

  const { data, isLoading, isError } = useGetVideosQuery(queryStr);
  const { data: videos = [], totalCount } = data || {};

  const [getVideo, { data: video = {}, isError: isErrorForGetVideo }] =
    useLazyGetVideoQuery();

  // handle modal toggle behaviour
  const handleModalClose = () => {
    navigate("/admin/videos");
    setOpen(false);
  };

  // hanlde paginate
  const handlePrevClick = () => {
    setStart((prevState) => prevState - PAGE_LIMIT);
    setEnd((prevState) => prevState - PAGE_LIMIT);
  };

  const handleNextClick = () => {
    setStart((prevState) => prevState + PAGE_LIMIT);
    setEnd((prevState) => prevState + PAGE_LIMIT);
  };

  const handlePageClick = (page) => {
    setStart(PAGE_LIMIT * page);
    setEnd(PAGE_LIMIT * (page + 1));
  };

  // side effects
  useEffect(() => {
    if (videoId) {
      getVideo(videoId);
    }
  }, [videoId, getVideo]);

  useEffect(() => {
    if (video?.id && Number(video.id) === Number(videoId)) {
      setOpen(true);
    }

    if (videoId && isErrorForGetVideo) {
      setNotFound(true);
    } else {
      setNotFound(false);
    }
  }, [videoId, video, isErrorForGetVideo, setNotFound]);

  // decide what to renver
  let content = null;

  // fetching data
  if (isLoading) {
    content = (
      <>
        <TableDataLoader />
        <TableDataLoader />
        <TableDataLoader />
      </>
    );
  }

  // if there was any error
  if (!isLoading && isError) {
    content = (
      <Message className="bg-red-200 text-red-500 block text-base">
        There was an error occured!
      </Message>
    );
  }

  // if there was no data
  if (!isLoading && !isError && videos?.length === 0) {
    content = (
      <Message className="bg-red-200 text-red-500 block text-base">
        No data found!
      </Message>
    );
  }

  // if data found
  if (!isLoading && !isError && videos?.length > 0) {
    content = (
      <Fragment>
        <table className="w-full table-auto border border-gray-600/50">
          <thead className="text-left text-slate-300 border-b border-b-gray-600/50">
            <tr>
              <th>Video Title</th>
              <th>Description</th>
              <th className="text-center">Action</th>
            </tr>
          </thead>
          <tbody className="text-slate-400 divide-y divide-gray-600/50">
            {videos.map((video) => (
              <Video
                key={video?.id}
                video={video}
                handleModalShow={() => setOpen(true)}
              />
            ))}
          </tbody>
        </table>
        <Pagination
          start={start}
          end={end}
          totalCount={Number(totalCount)}
          pageLimit={PAGE_LIMIT}
          handleNextClick={handleNextClick}
          handlePageClick={handlePageClick}
          handlePrevClick={handlePrevClick}
        />
      </Fragment>
    );
  }

  return notFound ? (
    <NotFound>
      <Link to="/admin/videos" className="text-lg link mt-8">
        Go to Videos Panel
      </Link>
    </NotFound>
  ) : (
    <div className="table-responsive">
      {content}

      {/* Edit Video Modal */}
      {open && (
        <Modal open={open} handleModalClose={handleModalClose}>
          <ModalFormLayout title="Edit Video">
            <VideoForm video={video} handleModalClose={handleModalClose} />
          </ModalFormLayout>
        </Modal>
      )}
    </div>
  );
};

export default VideoList;
