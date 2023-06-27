import AssignmentSubmissionForm from "components/form/AssignmentSubmissionForm";
import Button from "components/ui/Button";
import Modal from "components/ui/Modal";
import { useGetAssignmentMarksQuery } from "features/assignmentMarks/assignmentMarksAPI";
import { useGetAssignmentsQuery } from "features/assignments/assignmentsAPI";
import { selectAuthenticatedUser } from "features/auth/authSelectos";
import { useGetQuizMarksQuery } from "features/quizMarks/quizMarksAPI";
import { useGetQuizzesQuery } from "features/quizzes/quizzesAPI";
import ModalFormLayout from "layouts/ModalFormLayout";
import moment from "moment";
import { Fragment, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const VideoDescription = ({ video = {} }) => {
  const { id: currentVideoId, title, description, createdAt } = video;

  const [open, setOpen] = useState(false);

  const user = useSelector(selectAuthenticatedUser);
  const { data: assignmentsData } = useGetAssignmentsQuery();
  const { data: quizzesData } = useGetQuizzesQuery();
  const { data: assignmentMarksData } = useGetAssignmentMarksQuery();

  const { data: assignments = [] } = assignmentsData || {};
  const { data: quizzes = [] } = quizzesData || {};
  const { data: assignmentMarks = [] } = assignmentMarksData || {};

  // prepare query string for quiz marks
  const quizMarkQueryStr =
    currentVideoId && user?.id
      ? `?video_id=${currentVideoId}&student_id=${user.id}`
      : "";

  const { data: quizMarks = [] } = useGetQuizMarksQuery(quizMarkQueryStr, {
    skip: !currentVideoId,
  });

  const navigate = useNavigate();

  // check assignment has already been existed against current video
  const hasAssignment = () => {
    return assignments?.some(
      (assignment) => Number(assignment?.video_id) === Number(currentVideoId)
    );
  };

  // check quizzes have already been existed against current video
  const hasQuizzes = () => {
    return quizzes?.some(
      (assignment) => Number(assignment?.video_id) === Number(currentVideoId)
    );
  };

  // find student's assignment against current video
  const findAssignment = () => {
    return assignments?.find(
      (assignment) => Number(assignment?.video_id) === Number(currentVideoId)
    );
  };

  // find student's assignment mark against current video
  const findAssignmentMark = (assignmentId, userId) => {
    return assignmentMarks?.find(
      (assignmentMark) =>
        Number(assignmentMark?.assignment_id) === Number(assignmentId) &&
        Number(assignmentMark?.student_id) === Number(userId)
    );
  };

  // check if assignment has already been submitted against current video
  const assignmentAlreadySubmitted = () => {
    const assignment = findAssignment();

    const assignmentMark = findAssignmentMark(assignment?.id, user?.id);

    return assignmentMark?.id ? true : false;
  };

  // handle quizzes modal
  const handleQuizzes = () => {
    navigate(`/quizzes/${currentVideoId}`);
  };

  // check if quiz has already been submitted against the current video
  const quizAlreadySubmitted = () => {
    return quizMarks?.length;
  };

  return (
    currentVideoId && (
      <Fragment>
        <div>
          <h1 className="text-lg font-semibold tracking-tight text-slate-100">
            {title}
          </h1>
          <p className="pb-4 text-sm leading-[1.7142857] text-slate-400">
            Uploaded on {moment(createdAt).format("DD MMMM, YYYY")}
          </p>

          <div className="flex gap-4">
            {hasAssignment() && !assignmentAlreadySubmitted() && (
              <Button
                className="md:text-sm border rounded-full transition-all duration-300 bg-violet-600 border-violet-600 hover:bg-violet-700 hover:border-violet-700"
                onClick={() => setOpen(true)}
              >
                এসাইনমেন্ট
              </Button>
            )}
            {hasQuizzes() && !quizAlreadySubmitted() && (
              <Button
                className="md:text-sm border rounded-full transition-all duration-300 bg-violet-600 border-violet-600 hover:bg-violet-700 hover:border-violet-700"
                onClick={handleQuizzes}
              >
                কুইজে অংশগ্রহণ করুন
              </Button>
            )}
          </div>
          <p className="mt-4 text-sm text-slate-400 leading-6">{description}</p>
        </div>
        {/* assignment submission modal */}
        {open && (
          <Modal open={open} handleModalClose={() => setOpen(false)}>
            <ModalFormLayout title="Assignment submission">
              <AssignmentSubmissionForm
                user={user}
                assignment={findAssignment()}
                handleModalClose={() => setOpen(false)}
              />
            </ModalFormLayout>
          </Modal>
        )}
      </Fragment>
    )
  );
};

export default VideoDescription;
