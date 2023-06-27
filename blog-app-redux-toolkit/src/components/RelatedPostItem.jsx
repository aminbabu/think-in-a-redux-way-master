import React from "react";
import { Link } from "react-router-dom";

const RelatedPostItem = ({ relatedPost = {} }) => {
  const { id, title, image, tags } = relatedPost;

  return (
    <div className="card">
      <Link to={`/posts/${id}`}>
        <img src={image} className="card-image" alt={title} />
      </Link>
      <div className="p-4">
        <Link
          to={`/posts/${id}`}
          className="text-lg post-title lws-RelatedPostTitle"
        >
          {title}
        </Link>
        <div className="mb-0 tags">
          <span>{tags.map((tag) => `#${tag}`).join(", ")}</span>
        </div>
        <p>2010-03-27</p>
      </div>
    </div>
  );
};

export default RelatedPostItem;
