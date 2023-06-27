import DeleteButton from "components/ui/DeleteButton";
import EditButton from "components/ui/EditButton";
import { useDeleteQuizMutation } from "features/quizzes/quizzesAPI";
import { useNavigate } from "react-router-dom";
import lineClamp from "utils/lineClamp";

const Quiz = ({ quiz = {}, handleModalShow }) => {
  const [deleteQuiz, { isLoading }] = useDeleteQuizMutation();

  const navigate = useNavigate();

  const { id, question, video_title } = quiz;

  // handle delete
  const handleDelete = () => {
    deleteQuiz(id);
  };

  // handle edit
  const handleEdit = () => {
    navigate(`edit/${id}`);
    handleModalShow();
  };

  return (
    <tr>
      <td>
        <span className="line-clamp-1">{lineClamp(question, 10)}</span>
      </td>
      <td>
        <span className="line-clamp-1">{lineClamp(video_title, 10)}</span>
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

export default Quiz;
