import React from "react";
import { useDispatch } from "react-redux";
import { toggleSavedAsync, updateLikesAsync } from "../features/post/postSlice";

const DetailsPost = ({ post = {} }) => {
  const dispatch = useDispatch();
  const { id, title, image, tags, likes, isSaved, description } = post;

  const handleLike = () => {
    dispatch(updateLikesAsync({ id, likes }));
  };

  const handleSave = () => {
    dispatch(toggleSavedAsync({ id, isSaved }));
  };

  return (
    <main className="post">
      <img
        src={image}
        alt={title}
        className="w-full rounded-md"
        id="lws-megaThumb"
      />
      <div>
        <h1 className="mt-6 text-2xl post-title" id="lws-singleTitle">
          {title}
        </h1>
        <div className="tags" id="lws-singleTags">
          <span>{tags.map((tag) => `#${tag}`).join(", ")}</span>
        </div>
        <div className="btn-group">
          {/* <!-- handle like on button click --> */}
          <button
            className="like-btn"
            id="lws-singleLinks"
            onClick={handleLike}
          >
            <i className="fa-regular fa-thumbs-up"></i> {likes}
          </button>
          {/* <!-- handle save on button click --> */}
          {/* <!-- use ".active" class and "Saved" text  if a post is saved, other wise "Save" --> */}
          <button
            className={`save-btn ${isSaved ? "active" : ""}`}
            id="lws-singleSavedBtn"
            onClick={handleSave}
          >
            <i className="fa-regular fa-bookmark"></i>{" "}
            {!isSaved ? "Save" : "Saved"}
          </button>
        </div>
        <div className="mt-6">
          <p>{description}</p>
        </div>
      </div>
    </main>
  );
};

export default DetailsPost;
