const { POST_REQUESTED, POST_FAILED, POST_SUCCEDED } = require("./identifiers");

const fetchPostsRequrested = () => {
  return {
    type: POST_REQUESTED,
  };
};

const fetchPostsSucceded = (posts) => {
  return {
    type: POST_SUCCEDED,
    payload: { posts },
  };
};

const fetchPostsFailed = (error) => {
  return {
    type: POST_FAILED,
    payload: { error },
  };
};

module.exports = { fetchPostsRequrested, fetchPostsSucceded, fetchPostsFailed };
