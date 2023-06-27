import React from "react";

const Message = ({ className, children }) => {
  return (
    <div className={`col-span-12 text-center ${className}`}>{children}</div>
  );
};

export default Message;
