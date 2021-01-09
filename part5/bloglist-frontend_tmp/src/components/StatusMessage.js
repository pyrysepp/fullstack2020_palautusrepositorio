import React from "react";
import "../styles/StatusMessage.css";
const StatusMessage = ({ statusMessage, setStatusMessage }) => {
  if (statusMessage === null) {
    return null;
  }
  let classname = "goodStatus";
  if (!statusMessage.good) {
    classname = "badStatus";
  }
  return (
    <div className={classname}>
      <h3>{statusMessage.message}</h3>
    </div>
  );
};

export default StatusMessage;
