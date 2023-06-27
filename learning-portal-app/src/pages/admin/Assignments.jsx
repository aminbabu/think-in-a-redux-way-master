import AssignmentList from "components/assignments/AssignmentList";
import AddButton from "components/dashboard/AddButton";
import Title from "components/dashboard/Title";
import AssignmentForm from "components/form/AssignmentForm";
import Modal from "components/ui/Modal";
import DashboardLayout from "layouts/DashboardLayout";
import ModalFormLayout from "layouts/ModalFormLayout";
import { Fragment, useEffect, useState } from "react";
import { useMatch, useNavigate } from "react-router-dom";

const Assignments = () => {
  const [open, setOpen] = useState(false);

  const navigate = useNavigate();
  const match = useMatch("/admin/assignments/add");

  // handle add new video event
  const handleAddQuiz = () => {
    setOpen(true);
    navigate("add");
  };

  // handle modal toggle behaviour
  const handleModalClose = () => {
    navigate("/admin/assignments");
    setOpen(false);
  };

  // side effects
  useEffect(() => {
    if (match) {
      setOpen(true);
    }
  }, [match]);

  return (
    <Fragment>
      <DashboardLayout>
        <Title>Assignments</Title>
        <AddButton onClick={handleAddQuiz}>Add Assignment</AddButton>
        <AssignmentList />
      </DashboardLayout>

      {/* Add Quiz Modal */}
      {open && (
        <Modal open={open} handleModalClose={handleModalClose}>
          <ModalFormLayout title="Add New Quiz">
            <AssignmentForm handleModalClose={handleModalClose} />
          </ModalFormLayout>
        </Modal>
      )}
    </Fragment>
  );
};

export default Assignments;
