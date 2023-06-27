import Option from "./Option";

const Question = ({ quizNumber = "", quiz = {}, handleChange }) => {
  // destrucre
  const { id: quizId, question, options } = quiz;

  return (
    <div className="border border-slate-600/50 p-3 sm:p-4 lg:p-6 rounded-md">
      <h2 className="text-lg md:text-xl font-medium mb-4 md:mb-6">
        Quiz {quizNumber} - {question}
      </h2>
      <div className="grid md:grid-cols-2 gap-3 sm:gap-4 lg:gap-6">
        {options?.map((option, index) => (
          <Option
            key={option?.id}
            name={`quiz${quizId}Option${option?.id}`}
            checked={option?.checked}
            onChange={(e) => handleChange(e, quizId, index)}
          >
            {option?.option}
          </Option>
        ))}
      </div>
    </div>
  );
};

export default Question;
