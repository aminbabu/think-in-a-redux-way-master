import Button from "components/ui/Button";
import Message from "components/ui/Message";
import Modal from "components/ui/Modal";
import { useAddAssignmentMarkMutation } from "features/assignmentMarks/assignmentMarksAPI";
import ModalFormLayout from "layouts/ModalFormLayout";
import { useEffect, useState } from "react";
import FormControl from "./FormControl";

const AssignmentSubmissionForm = ({
  user = {},
  assignment = {},
  handleModalClose,
}) => {
  const [open, setOpen] = useState(false);
  const [repoLink, setRepoLink] = useState("");
  const [message, setMessage] = useState("");

  const [addAssignmentMark, { isLoading, isSuccess, isError, error }] =
    useAddAssignmentMarkMutation();

  // hanlde form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    if (repoLink !== "") {
      setOpen(true);
    }
  };

  // hanlde assignment submission
  const handleAssignmentSubmission = () => {
    if (user?.id && assignment?.id) {
      addAssignmentMark({
        student_id: user?.id,
        student_name: user?.name,
        assignment_id: assignment?.id,
        title: assignment?.title,
        createdAt: new Date().toISOString(),
        totalMark: assignment?.totalMark,
        mark: 0,
        repo_link: repoLink,
        status: "pending",
      });
    }
  };

  // side effects
  useEffect(() => {
    if (isError) {
      const errorMsg = error?.data ? error.data : "There was an error occured";

      setMessage(errorMsg);
    }

    if (isSuccess) {
      handleModalClose();
      setOpen(false);
    }
  }, [isSuccess, isError, handleModalClose, error]);

  return (
    <form onSubmit={handleSubmit} className="grid gap-4">
      <FormControl
        label="GitHub repository link"
        name="repoLink"
        className="rounded !py-1.5 !px-2.5"
        required
        value={repoLink}
        onChange={(e) => {
          setRepoLink(e.target.value);
        }}
      />
      <div className="grid pt-4">
        <Button
          type="submit"
          className="bg-green-600 border-green-500 rounded !px-8 hover:bg-green-700 hover:border-green-700"
          disabled={isLoading}
        >
          Submit
        </Button>
      </div>
      {/* Submission Modal */}
      {open && (
        <Modal
          open={open}
          className="content-start"
          modalSize="max-w-md"
          hasCloseButton={false}
        >
          <ModalFormLayout>
            <h4 className="text-xl mb-6">
              You are submitting the assignment. Are you sure?
            </h4>
            {message !== "" && (
              <Message className="block mb-6 bg-red-200 text-red-500">
                {message}
              </Message>
            )}
            <div className="flex items-center justify-end gap-4">
              <Button
                type="submit"
                className="rounded bg-green-500 border-green-500"
                disabled={isLoading}
                onClick={handleAssignmentSubmission}
              >
                Submit
              </Button>
              <Button
                className="rounded bg-red-500 border-red-500"
                onClick={() => setOpen(false)}
              >
                Cancel
              </Button>
            </div>
          </ModalFormLayout>
        </Modal>
      )}
    </form>
  );
};

export default AssignmentSubmissionForm;
