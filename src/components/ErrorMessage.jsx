import React from 'react';

const ErrorMessage = ({ message }) => {
  if (!message) return null;

  return (
    <div className="error">
      ❌ Error: {message}
    </div>
  );
};

export default ErrorMessage;
