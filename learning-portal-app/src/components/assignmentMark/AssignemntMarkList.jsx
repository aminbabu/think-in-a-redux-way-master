import Message from "components/ui/Message";
import Pagination from "components/ui/Pagination";
import TableDataLoader from "components/ui/loaders/TableDataLoader";
import { useGetAssignmentMarksQuery } from "features/assignmentMarks/assignmentMarksAPI";
import { Fragment, useState } from "react";
import AssignmentMark from "./AssignmentMark";

const PAGE_LIMIT = process.env.REACT_APP_PAGE_LIMIT || 10;

const AssignmentMarkList = () => {
  const [start, setStart] = useState(0);
  const [end, setEnd] = useState(PAGE_LIMIT);

  const queryStr = `?_start=${start}&_end=${end}`;

  const { data, isLoading, isError } = useGetAssignmentMarksQuery(queryStr);

  const { data: assignmentMarks = [], totalCount } = data || {};

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

  // decide what to renver
  let content = null;

  // fetching data
  if (isLoading) {
    content = (
      <Fragment>
        <TableDataLoader />
        <TableDataLoader />
        <TableDataLoader />
      </Fragment>
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
  if (!isLoading && !isError && assignmentMarks?.length === 0) {
    content = (
      <Message className="bg-red-200 text-red-500 block text-base">
        No data found!
      </Message>
    );
  }

  // if data found
  if (!isLoading && !isError && assignmentMarks?.length > 0) {
    content = (
      <Fragment>
        <table className="w-full table-auto border border-gray-600/50">
          <thead className="text-left text-slate-300 border-b border-b-gray-600/50">
            <tr>
              <th>Assignment</th>
              <th>Date</th>
              <th>Student Name</th>
              <th>Repo Link</th>
              <th className="text-center">Mark</th>
            </tr>
          </thead>
          <tbody className="text-slate-400 divide-y divide-gray-600/50">
            {assignmentMarks.map((assignmentMark) => (
              <AssignmentMark
                key={assignmentMark?.id}
                assignmentMark={assignmentMark}
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

  return <div className="table-responsive">{content}</div>;
};

export default AssignmentMarkList;
