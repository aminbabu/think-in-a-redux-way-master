const DashboardLayout = ({ children }) => {
  return (
    <section className="section">
      <div className="container">
        <div className="border border-gray-600/50 p-4 rounded-md">
          {children}
        </div>
      </div>
    </section>
  );
};

export default DashboardLayout;
