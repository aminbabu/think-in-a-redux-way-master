import Button from "components/ui/Button";
import Message from "components/ui/Message";
import {
  useAddVideoMutation,
  useEditVideoMutation,
} from "features/videos/videosAPI";
import { useEffect, useState } from "react";
import { convertToHTMLDateString, convertToISOString } from "utils/Date";
import FormControl from "./FormControl";
import FormTextarea from "./FormTextarea";

// initial state
const initialVideoDetails = {
  title: "",
  description: "",
  url: "",
  views: "",
  duration: "",
  createdAt: "",
};

const VideoForm = ({ video, handleModalClose }) => {
  const [videoDetails, setVideoDetails] = useState(initialVideoDetails);
  const [editMode, setEditMode] = useState(false);
  const [message, setMessage] = useState("");

  const [
    addVideo,
    {
      isLoading: isLoadingForAddVideo,
      isSuccess: isSuccessForAddVideo,
      isError: isErrorForAddVideo,
    },
  ] = useAddVideoMutation();
  const [
    editVideo,
    {
      isLoading: isLoadingForEditVideo,
      isSuccess: isSuccessForEditVideo,
      isError: isErrorForEditVideo,
    },
  ] = useEditVideoMutation();

  // handle video details input change
  const handleChange = (e) => {
    const target = e.target;
    const name = target.name;
    const value = target.value;

    setMessage("");
    setVideoDetails((prevState) => ({ ...prevState, [name]: value }));
  };

  // handle form submission
  const handleAddVideo = (e) => {
    e.preventDefault();

    addVideo({
      ...videoDetails,
      createdAt: convertToISOString(videoDetails.createdAt),
    });
  };

  const handleEditVideo = (e) => {
    e.preventDefault();

    editVideo({
      id: video?.id,
      data: {
        ...videoDetails,
        createdAt: convertToISOString(videoDetails.createdAt),
      },
    });
  };

  // side effects
  useEffect(() => {
    if (video?.id) {
      setEditMode(true);
      setVideoDetails({
        ...video,
        createdAt: convertToHTMLDateString(video?.createdAt),
      });
    } else {
      setEditMode(false);
    }
  }, [video]);

  useEffect(() => {
    if (isSuccessForAddVideo || isSuccessForEditVideo) {
      handleModalClose();
      setVideoDetails(initialVideoDetails);
    }

    if (isErrorForAddVideo || isErrorForEditVideo) {
      setMessage("There was an error occured!");
    }
  }, [
    handleModalClose,
    isSuccessForAddVideo,
    isSuccessForEditVideo,
    isErrorForAddVideo,
    isErrorForEditVideo,
  ]);

  // destructure video details property
  const { title, description, url, views, duration, createdAt } = videoDetails;

  return (
    <form
      onSubmit={editMode ? handleEditVideo : handleAddVideo}
      className="grid gap-4"
    >
      {message !== "" && (
        <Message className="bg-red-200 text-red-500">{message}</Message>
      )}
      <FormControl
        label="Title"
        name="title"
        className="rounded !py-1.5 !px-2.5"
        required
        value={title}
        onChange={handleChange}
      />
      <FormTextarea
        label="Description"
        name="description"
        className="rounded !py-1.5 !px-2.5"
        required
        value={description}
        onChange={handleChange}
      />
      <FormControl
        label="Url"
        name="url"
        className="rounded !py-1.5 !px-2.5"
        required
        value={url}
        onChange={handleChange}
      />
      <FormControl
        label="Views"
        name="views"
        className="rounded !py-1.5 !px-2.5"
        required
        value={views}
        onChange={handleChange}
      />
      <FormControl
        label="Duration"
        name="duration"
        className="rounded !py-1.5 !px-2.5"
        required
        value={duration}
        onChange={handleChange}
      />
      <FormControl
        type="datetime-local"
        label="Published at"
        name="createdAt"
        className="rounded !py-1.5 !px-2.5"
        required
        value={createdAt}
        onChange={handleChange}
      />
      <div className="grid pt-4">
        <Button
          type="submit"
          className="bg-green-600 border-green-500 rounded !px-8 hover:bg-green-700 hover:border-green-700"
          disabled={isLoadingForAddVideo || isLoadingForEditVideo}
        >
          Save
        </Button>
      </div>
    </form>
  );
};

export default VideoForm;
