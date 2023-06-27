import QuizForm from "components/form/QuizForm";
import Message from "components/ui/Message";
import Modal from "components/ui/Modal";
import Pagination from "components/ui/Pagination";
import TableDataLoader from "components/ui/loaders/TableDataLoader";
import {
  useGetQuizzesQuery,
  useLazyGetQuizQuery,
} from "features/quizzes/quizzesAPI";
import ModalFormLayout from "layouts/ModalFormLayout";
import NotFound from "pages/NotFound";
import { Fragment, useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import Quiz from "./Quiz";

const PAGE_LIMIT = process.env.REACT_APP_PAGE_LIMIT || 10;

const QuizList = () => {
  const [open, setOpen] = useState(false);
  const [notFound, setNotFound] = useState(false);
  const [start, setStart] = useState(0);
  const [end, setEnd] = useState(PAGE_LIMIT);

  const navigate = useNavigate();
  const { quizId } = useParams();

  const queryStr = `?_start=${start}&_end=${end}`;

  const { data, isLoading, isError } = useGetQuizzesQuery(queryStr);
  const [getQuiz, { data: quiz = {}, isError: isErrorForGetQuiz }] =
    useLazyGetQuizQuery();

  const { data: quizzes = [], totalCount } = data || {};

  // handle modal toggle behaviour
  const handleModalClose = () => {
    navigate("/admin/quizzes");
    setOpen(false);
  };

  // hanlde paginate
  const handlePrevClick = () => {
    setStart((prevState) => prevState - PAGE_LIMIT);
    setEnd((prevState) => prevState - PAGE_LIMIT);
  };

  const handleNextClick = () => {
    setStart((prevState) => prevState + PAGE_LIMIT);
    setEnd((prevState) => prevState + PAGE_LIMIT);
  };

  const handlePageClick = (page) => {
    setStart(PAGE_LIMIT * page);
    setEnd(PAGE_LIMIT * (page + 1));
  };

  // side effects
  useEffect(() => {
    if (quizId) {
      getQuiz(quizId);
    }
  }, [quizId, getQuiz]);

  useEffect(() => {
    if (quiz?.id && Number(quiz.id) === Number(quizId)) {
      setOpen(true);
    }

    if (quizId && isErrorForGetQuiz) {
      setNotFound(true);
    } else {
      setNotFound(false);
    }
  }, [quizId, quiz, isErrorForGetQuiz, setNotFound]);

  // decide what to renver
  let content = null;

  // fetching data
  if (isLoading) {
    content = (
      <>
        <TableDataLoader />
        <TableDataLoader />
        <TableDataLoader />
      </>
    );
  }

  // if there was any error
  if (!isLoading && isError) {
    content = (
      <Message className="bg-red-200 text-red-500 block text-base">
        There was an error occured!
      </Message>
    );
  }

  // if there was no data
  if (!isLoading && !isError && quizzes?.length === 0) {
    content = (
      <Message className="bg-red-200 text-red-500 block text-base">
        No data found!
      </Message>
    );
  }

  // if data found
  if (!isLoading && !isError && quizzes?.length > 0) {
    content = (
      <Fragment>
        <table className="w-full table-auto border border-gray-600/50">
          <thead className="text-left text-slate-300 border-b border-b-gray-600/50">
            <tr>
              <th>Question</th>
              <th>Video</th>
              <th className="text-center">Action</th>
            </tr>
          </thead>
          <tbody className="text-slate-400 divide-y divide-gray-600/50">
            {quizzes.map((quiz) => (
              <Quiz
                key={quiz?.id}
                quiz={quiz}
                handleModalShow={() => setOpen(true)}
              />
            ))}
          </tbody>
        </table>
        <Pagination
          start={start}
          end={end}
          totalCount={Number(totalCount)}
          pageLimit={PAGE_LIMIT}
          handleNextClick={handleNextClick}
          handlePageClick={handlePageClick}
          handlePrevClick={handlePrevClick}
        />
      </Fragment>
    );
  }

  return notFound ? (
    <NotFound>
      <Link to="/admin/quizzes" className="text-lg link mt-8">
        Go to Quizzes Panel
      </Link>
    </NotFound>
  ) : (
    <div className="table-responsive">
      {content}

      {/* Edit Video Modal */}
      {open && (
        <Modal open={open} handleModalClose={handleModalClose}>
          <ModalFormLayout title="Edit Quiz">
            <QuizForm quiz={quiz} handleModalClose={handleModalClose} />
          </ModalFormLayout>
        </Modal>
      )}
    </div>
  );
};

export default QuizList;
