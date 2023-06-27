import Button from "components/ui/Button";
import Message from "components/ui/Message";
import {
  useAddQuizMutation,
  useEditQuizMutation,
} from "features/quizzes/quizzesAPI";
import { useGetVideosQuery } from "features/videos/videosAPI";
import { useEffect, useState } from "react";
import FormCheck from "./FormCheck";
import FormControl from "./FormControl";
import FormSelect from "./FormSelect";

const QuizForm = ({ quiz, handleModalClose }) => {
  const [question, setQuestion] = useState("");
  const [videoTitle, setVideoTitle] = useState("");
  const [option1, setOption1] = useState({ answer1: "", isCorrect1: false });
  const [option2, setOption2] = useState({ answer2: "", isCorrect2: false });
  const [option3, setOption3] = useState({ answer3: "", isCorrect3: false });
  const [option4, setOption4] = useState({ answer4: "", isCorrect4: false });
  const [editMode, setEditMode] = useState(false);
  const [message, setMessage] = useState("");

  // destructure state property
  const { answer1, isCorrect1 } = option1;
  const { answer2, isCorrect2 } = option2;
  const { answer3, isCorrect3 } = option3;
  const { answer4, isCorrect4 } = option4;

  const resetForm = () => {
    setQuestion("");
    setVideoTitle("");
    setOption1({ answer1: "", isCorrect1: false });
    setOption2({ answer2: "", isCorrect2: false });
    setOption3({ answer3: "", isCorrect3: false });
    setOption4({ answer4: "", isCorrect4: false });
  };

  const { data } = useGetVideosQuery();
  const { data: videos = [] } = data || {};

  const [
    addQuiz,
    {
      isLoading: isLoadingForAddQuiz,
      isSuccess: isSuccessForAddQuiz,
      isError: isErrorForAddQuiz,
    },
  ] = useAddQuizMutation();
  const [
    editQuiz,
    {
      isLoading: isLoadingForEditQuiz,
      isSuccess: isSuccessForEditQuiz,
      isError: isErrorForEditQuiz,
    },
  ] = useEditQuizMutation();

  // prepare quiz
  const prepareQuiz = () => {
    const localOptions = [option1, option2, option3, option4];
    const { id: video_id, title: video_title } = videos.find(
      (video) => video?.title?.toLowerCase() === videoTitle?.toLowerCase()
    );

    const options = localOptions.map((option, index) => {
      const modifiedOption = option || {};
      const optionKeys = Object.keys(modifiedOption);

      return {
        id: index,
        option: modifiedOption[optionKeys[0]],
        isCorrect: modifiedOption[optionKeys[1]],
      };
    });

    return {
      question,
      video_id,
      video_title,
      options,
    };
  };

  // handle video details input change
  const handleChange = (e) => {
    const target = e.target;
    const name = target.name;
    const value = target.type === "checkbox" ? target.checked : target.value;

    setMessage("");

    setOption1((prevState) => ({ ...prevState, [name]: value }));
    setOption2((prevState) => ({ ...prevState, [name]: value }));
    setOption3((prevState) => ({ ...prevState, [name]: value }));
    setOption4((prevState) => ({ ...prevState, [name]: value }));
  };

  // handle form submission
  const handleAddQuiz = (e) => {
    e.preventDefault();

    if (!(isCorrect1 || isCorrect2 || isCorrect3 || isCorrect4)) {
      return setMessage("Please select at least one right answer!");
    }

    const quizObject = prepareQuiz();

    addQuiz(quizObject);
  };

  const handleEditQuiz = (e) => {
    e.preventDefault();

    const quizObject = prepareQuiz();

    editQuiz({ id: quiz?.id, data: quizObject });
  };

  // side effects
  useEffect(() => {
    if (quiz?.id) {
      setEditMode(true);
      const { question, video_title: videoTitle, options } = quiz;
      const [option1, option2, option3, option4] = options;
      const { option: answer1, isCorrect: isCorrect1 } = option1;
      const { option: answer2, isCorrect: isCorrect2 } = option2;
      const { option: answer3, isCorrect: isCorrect3 } = option3;
      const { option: answer4, isCorrect: isCorrect4 } = option4;

      setQuestion(question);
      setVideoTitle(videoTitle);
      setOption1({ answer1, isCorrect1 });
      setOption2({ answer2, isCorrect2 });
      setOption3({ answer3, isCorrect3 });
      setOption4({ answer4, isCorrect4 });
    } else {
      setEditMode(false);
    }
  }, [quiz]);

  useEffect(() => {
    if (isSuccessForAddQuiz || isSuccessForEditQuiz) {
      handleModalClose();
      resetForm();
    }

    if (isErrorForAddQuiz || isErrorForEditQuiz) {
      setMessage("There was an error occured!");
    }
  }, [
    handleModalClose,
    isSuccessForAddQuiz,
    isSuccessForEditQuiz,
    isErrorForAddQuiz,
    isErrorForEditQuiz,
  ]);

  return (
    <form
      onSubmit={editMode ? handleEditQuiz : handleAddQuiz}
      className="grid gap-4"
    >
      {message !== "" && (
        <Message className="bg-red-200 text-red-500">{message}</Message>
      )}
      <FormControl
        label="Question"
        name="question"
        className="rounded !py-1.5 !px-2.5"
        required
        value={question}
        onChange={(e) => {
          setMessage("");
          setQuestion(e.target.value);
        }}
      />
      <FormSelect
        label="Video Title"
        name="videoTitle"
        className="rounded !py-1.5 !px-2.5"
        required
        videos={videos?.length ? videos : []}
        value={videoTitle}
        onChange={(e) => {
          setMessage("");
          setVideoTitle(e.target.value);
        }}
      />
      <div>
        <div className="block text-slate-50/60 text-sm font-semibold mb-1.5">
          Option 1 <span className="text-red-500">*</span>
        </div>
        <div className="flex items-center gap-4">
          <FormCheck
            name="isCorrect1"
            checked={isCorrect1}
            onChange={handleChange}
          />
          <div className="flex-1">
            <FormControl
              name="answer1"
              className="rounded !py-1.5 !px-2.5"
              required
              value={answer1}
              onChange={handleChange}
            />
          </div>
        </div>
      </div>
      <div>
        <div className="block text-slate-50/60 text-sm font-semibold mb-1.5">
          Option 2 <span className="text-red-500">*</span>
        </div>
        <div className="flex items-center gap-4">
          <FormCheck
            name="isCorrect2"
            checked={isCorrect2}
            onChange={handleChange}
          />
          <div className="flex-1">
            <FormControl
              name="answer2"
              className="rounded !py-1.5 !px-2.5"
              required
              value={answer2}
              onChange={handleChange}
            />
          </div>
        </div>
      </div>
      <div>
        <div className="block text-slate-50/60 text-sm font-semibold mb-1.5">
          Option 3 <span className="text-red-500">*</span>
        </div>
        <div className="flex items-center gap-4">
          <FormCheck
            name="isCorrect3"
            checked={isCorrect3}
            onChange={handleChange}
          />
          <div className="flex-1">
            <FormControl
              name="answer3"
              className="rounded !py-1.5 !px-2.5"
              required
              value={answer3}
              onChange={handleChange}
            />
          </div>
        </div>
      </div>
      <div>
        <div className="block text-slate-50/60 text-sm font-semibold mb-1.5">
          Option 4 <span className="text-red-500">*</span>
        </div>
        <div className="flex items-center gap-4">
          <FormCheck
            name="isCorrect4"
            checked={isCorrect4}
            onChange={handleChange}
          />
          <div className="flex-1">
            <FormControl
              name="answer4"
              className="rounded !py-1.5 !px-2.5"
              required
              value={answer4}
              onChange={handleChange}
            />
          </div>
        </div>
      </div>
      <div className="grid pt-4">
        <Button
          type="submit"
          className="bg-green-600 border-green-500 rounded !px-8 hover:bg-green-700 hover:border-green-700"
          disabled={isLoadingForAddQuiz || isLoadingForEditQuiz}
        >
          Save
        </Button>
      </div>
    </form>
  );
};

export default QuizForm;
