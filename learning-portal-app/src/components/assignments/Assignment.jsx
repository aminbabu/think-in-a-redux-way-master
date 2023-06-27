import DeleteButton from "components/ui/DeleteButton";
import EditButton from "components/ui/EditButton";
import { useDeleteAssignmentMutation } from "features/assignments/assignmentsAPI";
import { useNavigate } from "react-router-dom";
import lineClamp from "utils/lineClamp";

const Assignment = ({ assignment = {}, handleModalShow }) => {
  const [deleteAssignment, { isLoading }] = useDeleteAssignmentMutation();

  const navigate = useNavigate();

  const { id, title, video_title, totalMark } = assignment;

  // handle delete
  const handleDelete = () => {
    deleteAssignment(id);
  };

  // handle edit
  const handleEdit = () => {
    navigate(`edit/${id}`);
    handleModalShow();
  };

  return (
    <tr>
      <td>
        <span className="line-clamp-1">{lineClamp(title, 10)}</span>
      </td>
      <td>
        <span className="line-clamp-1">{lineClamp(video_title, 8)}</span>
      </td>
      <td className="text-center">
        <span>{totalMark}</span>
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

export default Assignment;
