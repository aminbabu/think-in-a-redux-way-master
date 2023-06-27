import React, { useEffect } from "react";
import Breadcrumb from "../components/Breadcrumb";
import DetailsPost from "../components/DetailsPost";
import RelatedPostList from "../components/RelatedPostList";
import Message from "../components/Message";
import ErrorMessage from "../components/ErrorMessage";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { postAsync } from "../features/post/postSlice";

const BlogPost = () => {
  const { isLoading, post, isError, error } = useSelector(
    (state) => state.post
  );
  const dispatch = useDispatch();
  const { postId } = useParams();

  useEffect(() => {
    dispatch(postAsync(postId));
  }, [dispatch, postId]);

  // content to render
  let content = null;

  if (isLoading) content = <Message text="Loading..." />;
  if (!isLoading && isError) content = <ErrorMessage text={error} />;
  if (!isLoading && !isError && !post?.id)
    content = <Message text="No video found!" />;
  if (!isLoading && !isError && post?.id)
    content = (
      <>
        <DetailsPost post={post} />
        <RelatedPostList tags={post.tags} currentId={post.id} />
      </>
    );

  return (
    <>
      <Breadcrumb />
      <section className="post-page-container">{content}</section>
    </>
  );
};

export default BlogPost;
