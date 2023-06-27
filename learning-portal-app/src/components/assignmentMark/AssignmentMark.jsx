import MarkForm from "components/form/MarkForm";
import moment from "moment";
import lineClamp from "utils/lineClamp";
import lineClampStr from "utils/lineClampStr";
import usernameShorter from "utils/usernameShorter";

const AssignmentMark = ({ assignmentMark = {} }) => {
  const {
    id,
    title,
    student_name,
    createdAt,
    repo_link,
    mark,
    status,
    totalMark,
  } = assignmentMark;

  return (
    <tr>
      <td>
        <span className="line-clamp-1">{lineClamp(title, 10)}</span>
      </td>
      <td>
        <span className="inline-block">
          {moment(createdAt).format("DD MMM, YYYY")}
        </span>{" "}
        <span className="inline-block">
          {moment(createdAt).format("hh:mm:ss A")}
        </span>
      </td>
      <td>
        <span className="whitespace-nowrap">
          {usernameShorter(student_name)}
        </span>
      </td>
      <td>
        <span className="line-clamp-1">{lineClampStr(repo_link)}</span>
      </td>
      <td className="text-center">
        {mark && status === "published" ? (
          mark
        ) : (
          <MarkForm assignmentMarkId={id} totalMark={totalMark} />
        )}
      </td>
    </tr>
  );
};

export default AssignmentMark;
