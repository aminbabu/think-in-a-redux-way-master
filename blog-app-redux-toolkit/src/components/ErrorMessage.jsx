import React from "react";

const ErrorMessage = ({ text }) => {
  return (
    <div className="lws-tags" style={{ color: "red" }}>
      {text}
    </div>
  );
};

export default ErrorMessage;
