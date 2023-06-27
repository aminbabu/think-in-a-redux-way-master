import AddButton from "components/dashboard/AddButton";
import Title from "components/dashboard/Title";
import VideoForm from "components/form/VideoForm";
import Modal from "components/ui/Modal";
import VideoList from "components/videos/VideoList";
import DashboardLayout from "layouts/DashboardLayout";
import ModalFormLayout from "layouts/ModalFormLayout";
import { Fragment, useEffect, useState } from "react";
import { useMatch, useNavigate } from "react-router-dom";

const Videos = () => {
  const [open, setOpen] = useState(false);

  const navigate = useNavigate();
  const match = useMatch("/admin/videos/add");

  // handle add new video event
  const handleAddVideo = () => {
    setOpen(true);
    navigate("add");
  };

  // handle modal toggle behaviour
  const handleModalClose = () => {
    navigate("/admin/videos");
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
        <Title>Published Videos</Title>
        <AddButton onClick={handleAddVideo}>Add Video</AddButton>
        <VideoList />
      </DashboardLayout>

      {/* Add Video Modal */}
      {open && (
        <Modal open={open} handleModalClose={handleModalClose}>
          <ModalFormLayout title="Add New Video">
            <VideoForm handleModalClose={handleModalClose} />
          </ModalFormLayout>
        </Modal>
      )}
    </Fragment>
  );
};

export default Videos;
