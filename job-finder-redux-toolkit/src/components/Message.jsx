import React from "react";

const Message = ({ className, children }) => {
  return <div className={`message ${className}`}>{children}</div>;
};

export default Message;
