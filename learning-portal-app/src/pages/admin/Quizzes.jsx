import AddButton from "components/dashboard/AddButton";
import Title from "components/dashboard/Title";
import QuizForm from "components/form/QuizForm";
import QuizList from "components/quizzes/QuizList";
import Modal from "components/ui/Modal";
import DashboardLayout from "layouts/DashboardLayout";
import ModalFormLayout from "layouts/ModalFormLayout";
import { Fragment, useEffect, useState } from "react";
import { useMatch, useNavigate } from "react-router-dom";

const Quizzes = () => {
  const [open, setOpen] = useState(false);

  const navigate = useNavigate();
  const match = useMatch("/admin/quizzes/add");

  // handle add new video event
  const handleAddQuiz = () => {
    setOpen(true);
    navigate("add");
  };

  // handle modal toggle behaviour
  const handleModalClose = () => {
    navigate("/admin/quizzes");
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
        <Title>Quizzes</Title>
        <AddButton onClick={handleAddQuiz}>Add Quiz</AddButton>
        <QuizList />
      </DashboardLayout>

      {/* Add Quiz Modal */}
      {open && (
        <Modal open={open} handleModalClose={handleModalClose}>
          <ModalFormLayout title="Add New Quiz">
            <QuizForm handleModalClose={handleModalClose} />
          </ModalFormLayout>
        </Modal>
      )}
    </Fragment>
  );
};

export default Quizzes;
