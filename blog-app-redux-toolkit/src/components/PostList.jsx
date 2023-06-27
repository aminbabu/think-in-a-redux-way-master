import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import PostItem from "./PostItem";
import { postsAsync } from "../features/posts/postsSlice";
import Message from "./Message";
import ErrorMessage from "./ErrorMessage";

const PostList = () => {
  const dispatch = useDispatch();
  const { isLoading, isError, posts, error } = useSelector(
    (state) => state.posts
  );

  useEffect(() => {
    dispatch(postsAsync());
  }, [dispatch]);

  // content to render
  let content = null;

  if (isLoading) content = <Message text="Loading..." />;

  if (!isLoading && isError) content = <ErrorMessage text={error} />;

  if (!isLoading && !isError && posts?.length === 0)
    content = <Message text="No posts found!" />;

  if (!isLoading && !isError && posts?.length)
    content = posts.map((post) => <PostItem key={post.id} post={post} />);

  return (
    <main className="post-container" id="lws-postContainer">
      {content}
    </main>
  );
};

export default PostList;
