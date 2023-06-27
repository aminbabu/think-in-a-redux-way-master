import DeleteButton from "components/ui/DeleteButton";
import EditButton from "components/ui/EditButton";
import { useDeleteVideoMutation } from "features/videos/videosAPI";
import { useNavigate } from "react-router-dom";
import lineClamp from "utils/lineClamp";

const Video = ({ video = {}, handleModalShow }) => {
  const [deleteVideo, { isLoading }] = useDeleteVideoMutation();

  const navigate = useNavigate();

  const { id, title, description } = video;

  // handle delete
  const handleDelete = () => {
    deleteVideo(id);
  };

  // handle edit
  const handleEdit = () => {
    navigate(`edit/${id}`);
    handleModalShow();
  };

  return (
    <tr>
      <td>
        <span className="line-clamp-1">{lineClamp(title, 6)}</span>
      </td>
      <td>
        <span className="line-clamp-1">{lineClamp(description, 10)}</span>
      </td>
      <td>
        <div className="flex items-center justify-center gap-1.5">
          <DeleteButton onClick={handleDelete} disabled={isLoading} />
          <EditButton onClick={handleEdit} />
        </div>
      </td>
    </tr>
  );
};

export default Video;
