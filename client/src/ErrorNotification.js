import React from "react";

function ErrorNotification({ errorMessage }) {
  if (errorMessage === null) {
    return null;
  }
  return (
    <h2 style={{ color: "red", border: "2px solid red", padding: "5px" }}>
      {errorMessage}
    </h2>
  );
}

export default ErrorNotification;
