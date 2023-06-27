import { useEditAssignmentMarkMutation } from "features/assignmentMarks/assignmentMarksAPI";
import { Fragment, useState } from "react";
import FormControl from "./FormControl";

const MarkForm = ({ assignmentMarkId, totalMark = 100 }) => {
  const [mark, setMark] = useState("");

  const [editAssignmentMark, { isLoading }] = useEditAssignmentMarkMutation();

  // handle mark submit
  const handleSubmit = (e) => {
    e.preventDefault();

    editAssignmentMark({
      id: assignmentMarkId,
      data: { mark: Number(mark), status: "published" },
    });
  };

  return (
    <Fragment>
      <form
        onSubmit={handleSubmit}
        className="flex gap-2 items-center justify-center"
      >
        <FormControl
          name="mark"
          required
          type="number"
          pattern="[0-9]{3}"
          maxLength="3"
          min="0"
          max={totalMark}
          className="px-2 py-1 !w-16 h-8 rounded"
          value={mark}
          onChange={(e) => setMark(e.target.value)}
        />
        <button
          type="submit"
          className="fill-green-500/75 transition-colors duration-150 hover:fill-green-500/100"
          disabled={isLoading}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
          >
            <path d="m10 15.586-3.293-3.293-1.414 1.414L10 18.414l9.707-9.707-1.414-1.414z"></path>
          </svg>
        </button>
      </form>
      {/* {alert && (
        <div className="space-y-4 fixed right-0 bottom-0 w-60 p-4">
          {isError && (
            <div className="alert alert-danger">
              {error?.data
                ? error.data
                : "Cound not update the assignment mark!"}
            </div>
          )}
          {isSuccess && (
            <div className="alert alert-success">
              Successfully updated the assignment mark!
            </div>
          )}
        </div>
      )} */}
    </Fragment>
  );
};

export default MarkForm;
