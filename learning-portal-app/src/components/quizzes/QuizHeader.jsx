const QuizHeader = ({ videoTitle }) => {
  return (
    <div className="quize-header mb-6 md:mb-8">
      <h1 className="text-xl md:text-2xl font-bold">
        Quizzes for - "{videoTitle}"
      </h1>
      <p className="text-sm text-slate-200">Each question contains 5 Mark</p>
    </div>
  );
};

export default QuizHeader;
