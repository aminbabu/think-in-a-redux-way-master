import Button from "components/ui/Button";
import Message from "components/ui/Message";
import {
  useAddAssignmentMutation,
  useEditAssignemntMutation,
  useGetAssignmentsQuery,
} from "features/assignments/assignmentsAPI";
import { useGetVideosQuery } from "features/videos/videosAPI";
import { useEffect, useState } from "react";
import FormControl from "./FormControl";
import FormSelect from "./FormSelect";

const AssignmentForm = ({ assignment, handleModalClose }) => {
  const [title, setTitle] = useState("");
  const [videoTitle, setVideoTitle] = useState("");
  const [totalMark, setTotalMark] = useState("");
  const [editMode, setEditMode] = useState(false);
  const [message, setMessage] = useState("");

  const resetForm = () => {
    setTitle("");
    setVideoTitle("");
    setTotalMark("");
  };
  const { data: videosData } = useGetVideosQuery();
  const { data: assignmentsData } = useGetAssignmentsQuery();
  const [
    addAssignment,
    {
      isLoading: isLoadingForAddAssignment,
      isSuccess: isSuccessForAddAssignment,
      isError: isErrorForAddAssignment,
    },
  ] = useAddAssignmentMutation();
  const [
    editAssignment,
    {
      isLoading: isLoadingForEditAssignment,
      isSuccess: isSuccessForEditAssignment,
      isError: isErrorForEditAssignment,
    },
  ] = useEditAssignemntMutation();

  const { data: videos = [] } = videosData || {};
  const { data: assignments = [] } = assignmentsData || {};

  // prepare Assignment
  const prepareAssignment = () => {
    const { id: video_id, title: video_title } = videos.find(
      (video) => video?.title?.toLowerCase() === videoTitle?.toLowerCase()
    );

    return {
      title,
      video_id,
      video_title,
      totalMark: Number(totalMark),
    };
  };

  // handle form submission
  const handleAddAssignment = (e) => {
    e.preventDefault();

    const AssignmentObject = prepareAssignment();

    addAssignment(AssignmentObject);
  };

  const handleEditAssignment = (e) => {
    e.preventDefault();

    const AssignmentObject = prepareAssignment();

    editAssignment({ id: assignment?.id, data: AssignmentObject });
  };

  // filtered by existing assignment
  const filteredByExixtingAssignment = (video) => {
    // check assignment has already been assign against video
    const isAssigned = assignments?.some(
      (assignment) => Number(assignment?.video_id) === Number(video?.id)
    );

    return editMode === true ? true : !isAssigned;
  };

  // side effects
  useEffect(() => {
    if (assignment?.id) {
      setEditMode(true);
      const { title, video_title, totalMark } = assignment;
      setTitle(title);
      setVideoTitle(video_title);
      setTotalMark(totalMark);
    } else {
      setEditMode(false);
    }
  }, [assignment]);

  useEffect(() => {
    if (isSuccessForAddAssignment || isSuccessForEditAssignment) {
      handleModalClose();
      resetForm();
    }

    if (isErrorForAddAssignment || isErrorForEditAssignment) {
      setMessage("There was an error occured!");
    }
  }, [
    handleModalClose,
    isSuccessForAddAssignment,
    isSuccessForEditAssignment,
    isErrorForAddAssignment,
    isErrorForEditAssignment,
  ]);

  return (
    <form
      onSubmit={editMode ? handleEditAssignment : handleAddAssignment}
      className="grid gap-4"
    >
      {message !== "" && (
        <Message className="bg-red-200 text-red-500">{message}</Message>
      )}
      <FormControl
        label="Assignment Title"
        name="assignment"
        className="rounded !py-1.5 !px-2.5"
        required
        value={title}
        onChange={(e) => {
          setMessage("");
          setTitle(e.target.value);
        }}
      />
      <FormSelect
        label="Video Title"
        name="videoTitle"
        className="rounded !py-1.5 !px-2.5"
        required
        videos={
          videos?.length ? videos.filter(filteredByExixtingAssignment) : []
        }
        value={videoTitle}
        onChange={(e) => {
          setMessage("");
          setVideoTitle(e.target.value);
        }}
      />
      <FormControl
        type="number"
        label="Total Mark"
        name="totalMark"
        className="rounded !py-1.5 !px-2.5"
        min="0"
        required
        value={totalMark}
        onChange={(e) => {
          setMessage("");
          setTotalMark(e.target.value);
        }}
      />
      <div className="grid pt-4">
        <Button
          type="submit"
          className="bg-green-600 border-green-500 rounded !px-8 hover:bg-green-700 hover:border-green-700"
          disabled={isLoadingForAddAssignment || isLoadingForEditAssignment}
        >
          Save
        </Button>
      </div>
    </form>
  );
};

export default AssignmentForm;
