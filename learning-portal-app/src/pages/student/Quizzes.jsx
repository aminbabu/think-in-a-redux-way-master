import Question from "components/quiz/Question";
import QuizHeader from "components/quizzes/QuizHeader";
import Button from "components/ui/Button";
import Message from "components/ui/Message";
import QuizLoader from "components/ui/loaders/QuizLoader";
import { selectAuthenticatedUser } from "features/auth/authSelectos";
import {
  useAddQuizMarkMutation,
  useGetQuizMarksQuery,
} from "features/quizMarks/quizMarksAPI";
import { useGetQuizzesQuery } from "features/quizzes/quizzesAPI";
import { selectQuizzes } from "features/quizzes/quizzesSelectors";
import { quizzesModified, quizzesUpdated } from "features/quizzes/quizzesSlice";
import { isEqual } from "lodash";
import { Fragment, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";

const Quizzes = () => {
  const dispatch = useDispatch();

  const navigate = useNavigate();
  const { videoId } = useParams();

  // prepare query string for quizzes
  const quizzesQueryStr = videoId ? `?video_id=${videoId}` : "";

  const {
    data: quizzesData,
    isLoading,
    isSuccess,
    isError,
  } = useGetQuizzesQuery(quizzesQueryStr);
  const currentQuizzes = useSelector(selectQuizzes);
  const user = useSelector(selectAuthenticatedUser);

  // prepare query string for quiz marks
  const quizMarkQueryStr =
    videoId && user?.id ? `?video_id=${videoId}&student_id=${user?.id}` : "";

  const { data: quizMarksData } = useGetQuizMarksQuery(quizMarkQueryStr);
  const [
    addQuizMark,
    { isSuccess: isSuccessForAddQuizMark, isError: isErrorForAddQuizMark },
  ] = useAddQuizMarkMutation();

  const { data: quizzes = [] } = quizzesData || {};
  const { data: quizMarks = [] } = quizMarksData || {};

  // hanlde quiz option change
  const handleChange = (e, quizId, index) => {
    dispatch(quizzesUpdated({ checked: e.target.checked, quizId, index }));
  };

  // handle quiz submission
  const handleQuizSubmit = (e) => {
    e.preventDefault();

    const QUIZ_MARK = 5;
    const totalQuiz = currentQuizzes?.length;
    const totalCorrect = currentQuizzes?.reduce((total, quiz) => {
      const correctOptions = [];
      const checkedOptions = [];

      quiz?.options.forEach((option) => {
        correctOptions.push(option?.isCorrect);
        checkedOptions.push(option?.checked);
      });

      return isEqual(correctOptions, checkedOptions) ? total + 1 : total;
    }, 0);

    const quizMark = {
      student_id: user?.id,
      student_name: user?.name,
      video_id: currentQuizzes[0]?.video_id,
      video_title: currentQuizzes[0]?.video_title,
      totalQuiz,
      totalCorrect,
      totalWrong: totalQuiz - totalCorrect,
      totalMark: totalQuiz * QUIZ_MARK,
      mark: totalCorrect * QUIZ_MARK,
    };

    addQuizMark(quizMark);
  };

  // side effects
  useEffect(() => {
    /**
     * if quizzes are fetched successfully then
     * popupate the local redux store
     *
     */
    if (isSuccess) {
      dispatch(quizzesModified(quizzes));
    }
  }, [dispatch, isSuccess, quizzes]);

  useEffect(() => {
    /**
     * if there any quiz submission has already
     * been done or added against the current video,
     * then redirect the student to leaderboard*
     *
     */
    if (quizMarks?.length || isSuccessForAddQuizMark) {
      navigate("/leaderboard");
    }
  }, [quizMarks, isSuccessForAddQuizMark, navigate]);

  // decide what to renver
  let content = null;

  // fetching data
  if (isLoading) {
    <>
      <QuizLoader />
      <QuizLoader />
    </>;
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
  if (!isLoading && !isError && currentQuizzes?.length === 0) {
    content = (
      <Message className="bg-red-200 text-red-500 block text-base">
        No data found!
      </Message>
    );
  }

  // if data found
  if (!isLoading && !isError && currentQuizzes?.length > 0) {
    content = (
      <Fragment>
        <QuizHeader videoTitle={currentQuizzes[0]?.video_title} />
        <form onSubmit={handleQuizSubmit}>
          <div className="space-y-4 md:space-y-6">
            {currentQuizzes?.map((quiz, index) => (
              <Question
                key={quiz?.id}
                quiz={quiz}
                quizNumber={index + 1}
                handleChange={handleChange}
              />
            ))}
            <div className="mt-8 text-right">
              <Button
                type="submit"
                className="bg-green-600 border-green-500 rounded !px-8 !py-2.5 hover:bg-green-700 hover:border-green-700"
              >
                Submit
              </Button>
            </div>
          </div>
        </form>
      </Fragment>
    );
  }

  return (
    <section className="section">
      <div className="container">
        {isErrorForAddQuizMark && (
          <Message className="bg-red-200 text-red-500 block text-base">
            Could not submit the quiz! Please try again later!
          </Message>
        )}
        {content}
      </div>
    </section>
  );
};

export default Quizzes;
