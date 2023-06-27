import Button from "components/ui/Button";
import ButtonLoader from "components/ui/loaders/ButtonLoader";
import { useGetAssignmentMarksQuery } from "features/assignmentMarks/assignmentMarksAPI";

const AssignmentMarkStatus = () => {
  const { data, isLoading, isError } = useGetAssignmentMarksQuery();

  const { data: assignmentMarks = [] } = data || {};

  // count pending assignment mark
  const pendingAssignments = () => {
    return assignmentMarks.reduce(
      (pendingTotal, assignment) =>
        !assignment?.mark && assignment?.status === "pending"
          ? pendingTotal + 1
          : pendingTotal,
      0
    );
  };

  // count published assignment mark
  const publishedAssignments = () => {
    return assignmentMarks.reduce(
      (pendingTotal, assignment) =>
        assignment?.mark && assignment?.status === "published"
          ? pendingTotal + 1
          : pendingTotal,
      0
    );
  };

  // decide what to renver
  let content = null;

  // fetching data
  if (isLoading) {
    content = (
      <div className="flex items-center justify-end mb-4">
        <ButtonLoader />
        <ButtonLoader />
        <ButtonLoader />
      </div>
    );
  }

  if (!isLoading && !isError && assignmentMarks?.length > 0) {
    content = (
      <div className="mb-4 flex items-center justify-end gap-3">
        <Button className="md:text-sm border rounded-full py-1.5 transition-all duration-300 border-violet-600 gap-2">
          Total
          <span className="bg-violet-600 text-slate-50 w-5 h-5 text-xs rounded-full grid place-items-center">
            {assignmentMarks.length}
          </span>
        </Button>
        <Button className="md:text-sm border rounded-full py-1.5 transition-all duration-300 border-amber-600 gap-2">
          Pending
          <span className="bg-amber-600 text-slate-50 w-5 h-5 text-xs rounded-full grid place-items-center">
            {pendingAssignments()}
          </span>
        </Button>
        <Button className="md:text-sm border rounded-full py-1.5 transition-all duration-300 border-green-600 gap-2">
          Mark Sent
          <span className="bg-green-600 text-slate-50 w-5 h-5 text-xs rounded-full grid place-items-center">
            {publishedAssignments()}
          </span>
        </Button>
      </div>
    );
  }

  return content;
};

export default AssignmentMarkStatus;
