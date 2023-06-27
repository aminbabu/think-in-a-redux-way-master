import PositionTable from "components/leaderboard/PositionTable";
import RankingTable from "components/leaderboard/RankingTable";
import Message from "components/ui/Message";
import TableDataLoader from "components/ui/loaders/TableDataLoader";
import { useGetAssignmentMarksQuery } from "features/assignmentMarks/assignmentMarksAPI";
import { selectAuthenticatedUser } from "features/auth/authSelectos";
import { useGetQuizMarksQuery } from "features/quizMarks/quizMarksAPI";
import { useGetUsersQuery } from "features/users/usersAPI";
import { Fragment, useEffect, useState } from "react";
import { useSelector } from "react-redux";

const Leaderboard = () => {
  const [loading, setLoading] = useState(true);
  const [rankingData, setRankingData] = useState([]);

  const {
    data: students = [],
    isLoading: isLoadingForStudents,
    isError: isErrorForStudents,
  } = useGetUsersQuery(
    `?role_ne=admin&_limit=${process.env.REACT_APP_RANK_LIMIT}`
  );

  const {
    data: quizMarks = [],
    isLoading: isLoadingForQuizMarks,
    isError: isErrorForQuizMarks,
  } = useGetQuizMarksQuery(`?_limit=${process.env.REACT_APP_RANK_LIMIT}`);
  const {
    data: assignmentMarksData,
    isLoading: isLoadingForAssignmentMarks,
    isError: isErrorForAssignmentMarks,
  } = useGetAssignmentMarksQuery(`?_limit=${process.env.REACT_APP_RANK_LIMIT}`);
  const authUser = useSelector(selectAuthenticatedUser);

  const { data: assignmentMarks = [] } = assignmentMarksData || {};

  // find the current student user
  const currentUser = rankingData.find(
    (item) => item?.student_id === authUser?.id
  );

  // side effects
  useEffect(() => {
    setLoading(true);

    const sanitizeStudentsData = (student) => {
      const data = { ...student };

      data.student_id = student.id;
      data.student_name = student.name;

      delete data.id;
      delete data.name;

      return data;
    };

    if (students?.length && quizMarks?.length && assignmentMarks?.length) {
      const studentsData = [];
      const map = new Map();

      // merge quiz marks
      const quizMarksHashmap = quizMarks.reduce((result, quizMark) => {
        if (result?.[quizMark?.student_id]) {
          result[quizMark.student_id] = {
            ...result[quizMark.student_id],
            quizMark: result[quizMark.student_id].quizMark + quizMark?.mark,
          };
        } else {
          result[quizMark.student_id] = {
            student_id: quizMark.student_id,
            student_name: quizMark.student_name,
            quizMark: Number(quizMark.mark),
          };
        }

        return result;
      }, {});

      // merge assignment marks
      const assignmentMarksHashmap = assignmentMarks.reduce(
        (result, assignmentMark) => {
          if (result?.[assignmentMark?.student_id]) {
            result[assignmentMark.student_id] = {
              ...result[assignmentMark.student_id],
              assignmentMark:
                result[assignmentMark.student_id].assignmentMark +
                assignmentMark?.mark,
            };
          } else {
            result[assignmentMark.student_id] = {
              student_id: assignmentMark.student_id,
              student_name: assignmentMark.student_name,
              assignmentMark: Number(assignmentMark.mark),
            };
          }

          return result;
        },
        {}
      );

      const quizMarksData = Object.values(quizMarksHashmap);
      const assignmentMarksData = Object.values(assignmentMarksHashmap);

      students.forEach((student) =>
        map.set(student?.id, sanitizeStudentsData(student))
      );
      quizMarksData.forEach((quizMark) =>
        map.set(quizMark?.student_id, {
          ...map.get(quizMark?.student_id),
          ...quizMark,
        })
      );
      assignmentMarksData.forEach((assignmentMark) =>
        map.set(assignmentMark?.student_id, {
          ...map.get(assignmentMark?.student_id),
          ...assignmentMark,
        })
      );

      const mergedAssigmentMarks = Array.from(map.values());

      // assign missing properties
      mergedAssigmentMarks.forEach((item) => {
        if (!item?.quizMark && !item?.assignmentMark) {
          studentsData.push({ ...item, quizMark: 0, assignmentMark: 0 });
        } else if (!item?.quizMark) {
          studentsData.push({ ...item, quizMark: 0 });
        } else if (!item?.assignmentMark) {
          studentsData.push({ ...item, assignmentMark: 0 });
        } else {
          studentsData.push(item);
        }
      });

      studentsData.sort((prevStudent, nextStudent) => {
        const prevStudentTotal =
          prevStudent.assignmentMark + prevStudent.quizMark;
        const nextStudentTotal =
          nextStudent.assignmentMark + nextStudent.quizMark;

        return nextStudentTotal - prevStudentTotal;
      });

      // calculate student rank
      const numberOfStuents = studentsData.length;
      let rank = 1;

      for (let index = 0; index < numberOfStuents; index++) {
        if (
          index > 0 &&
          studentsData[index].quizMark + studentsData[index].assignmentMark <
            studentsData[index - 1].quizMark +
              studentsData[index - 1].assignmentMark
        ) {
          rank++;
        }

        studentsData[index].rank = rank;
      }

      setRankingData(studentsData);
      setLoading(false);
    }
  }, [students, quizMarks, assignmentMarks]);

  // decide what to render
  let content = null;

  // fetching data
  if (
    loading ||
    isLoadingForStudents ||
    isLoadingForQuizMarks ||
    isLoadingForAssignmentMarks
  ) {
    content = (
      <Fragment>
        <TableDataLoader />
        <TableDataLoader />
        <TableDataLoader />
      </Fragment>
    );
  }

  // if there was any error
  if (isErrorForStudents || isErrorForQuizMarks || isErrorForAssignmentMarks) {
    content = (
      <Message className="bg-red-200 text-red-500 block text-base">
        There was an error occured!
      </Message>
    );
  }

  // if there was no data
  if (!loading && rankingData?.length === 0) {
    content = (
      <Message className="bg-red-200 text-red-500 block text-base">
        No data found!
      </Message>
    );
  }

  // if data found
  if (rankingData?.length > 0) {
    content = (
      <Fragment>
        <PositionTable currentUser={currentUser} />
        <RankingTable rankingData={rankingData} currentUser={currentUser} />
      </Fragment>
    );
  }

  return (
    <section className="section">
      <div className="container">{content}</div>
    </section>
  );
};

export default Leaderboard;
