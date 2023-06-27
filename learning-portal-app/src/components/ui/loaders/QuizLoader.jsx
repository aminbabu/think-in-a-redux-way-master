const QuizLoader = () => {
  return (
    <div className="border border-slate-600/50 p-3 sm:p-4 lg:p-6 rounded-md">
      <span className="block w-full h-6 mb-4 md:mb-6 placeholder"></span>
      <div className="grid md:grid-cols-2 gap-4 lg:gap-6">
        <span className="block w-full h-12 placeholder"></span>
        <span className="block w-full h-12 placeholder"></span>
        <span className="block w-full h-12 placeholder"></span>
        <span className="block w-full h-12 placeholder"></span>
      </div>
    </div>
  );
};

export default QuizLoader;
