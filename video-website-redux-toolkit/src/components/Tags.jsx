import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { tagsAsync } from "../features/tags/tagsSlice";
import Message from "./Message";
import Tag from "./Tag";

const Tags = () => {
  const dispatch = useDispatch();
  const { isLoading, isError, tags } = useSelector((state) => state.tags);

  useEffect(() => {
    dispatch(tagsAsync());
  }, [dispatch]);

  let content = null;

  if (isLoading)
    content = <Message className="text-green-500">Loading...</Message>;
  if (!isLoading && !isError && tags?.length)
    content = (
      <div className="max-w-7xl mx-auto px-5 py-6 lg:px-0 flex gap-2 border-b overflow-y-auto">
        {tags.map((tag) => (
          <Tag key={tag.id} tag={tag} />
        ))}
      </div>
    );

  return (
    <section>
      {content}
      {/* <div
                    className="bg-blue-600 text-white px-4 py-1 rounded-full cursor-pointer"
                >
                    redux
                </div> */}
    </section>
  );
};

export default Tags;
