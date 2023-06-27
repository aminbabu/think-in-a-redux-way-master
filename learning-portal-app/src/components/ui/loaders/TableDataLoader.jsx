const TableDataLoader = () => {
  return (
    <table className="w-full table-auto border border-gray-600/50">
      <tbody>
        <tr>
          <td className="w-1/3">
            <span className="w-4/5 placeholder"></span>
          </td>
          <td>
            <span className="w-2/3 placeholder"></span>
          </td>
          <td>
            <span className="w-2/3 placeholder"></span>
          </td>
          <td>
            <span className="w-2/3 placeholder"></span>
          </td>
          <td>
            <div className="flex items-center justify-end gap-1.5">
              <span className="w-5 placeholder"></span>
              <span className="w-5 placeholder"></span>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
  );
};

export default TableDataLoader;
