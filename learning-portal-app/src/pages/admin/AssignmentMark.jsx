import AssignmentMarkList from "components/assignmentMark/AssignemntMarkList";
import AssignmentMarkStatus from "components/assignmentMark/AssignmentMarkStatus";
import Title from "components/dashboard/Title";
import DashboardLayout from "layouts/DashboardLayout";

const AssignmentMarks = () => {
  return (
    <DashboardLayout>
      <Title>Assignments' Mark</Title>
      <AssignmentMarkStatus />
      <AssignmentMarkList />
    </DashboardLayout>
  );
};

export default AssignmentMarks;
