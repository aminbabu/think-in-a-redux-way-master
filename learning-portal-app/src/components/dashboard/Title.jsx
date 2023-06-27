const Title = ({ children }) => {
  return (
    <h1 className="text-lg md:text-xl font-bold mb-4 md:mb-6 border-b border-b-gray-600/50 pb-4">
      {children}
    </h1>
  );
};

export default Title;
