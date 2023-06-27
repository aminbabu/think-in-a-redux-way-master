import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import RelatedPostItem from "./RelatedPostItem";
import { relatedPostsAsync } from "../features/relatedPosts/relatedPostsSlice";
import Message from "./Message";
import ErrorMessage from "./ErrorMessage";

const RelatedPostList = ({ tags, currentId }) => {
  const dispatch = useDispatch();
  const { isLoading, relatedPosts, isError, error } = useSelector(
    (state) => state.relatedPosts
  );

  useEffect(() => {
    dispatch(relatedPostsAsync({ tags, currentId }));
  }, [dispatch, tags, currentId]);

  let content = null;

  if (isLoading) content = <Message text="Loading..." />;
  if (!isLoading && isError) content = <ErrorMessage text={error} />;
  if (!isLoading && !isError && relatedPosts?.length === 0)
    content = <Message text="No posts found!" />;
  if (!isLoading && !isError && relatedPosts?.length)
    content = relatedPosts.map((relatedPost) => (
      <RelatedPostItem key={relatedPost.id} relatedPost={relatedPost} />
    ));

  return (
    <aside>
      <h4 className="mb-4 text-xl font-medium" id="lws-relatedPosts">
        Related Posts
      </h4>
      {content}
    </aside>
  );
};

export default RelatedPostList;
