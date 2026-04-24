// Name: Sudhir Singh
// Roll Number: YOURROLL

import React from 'react';

export default function ErrorBanner({ alertMessage, dismissAlert }) {
  if (!alertMessage) return null;

  return (
    <div className="alert-box">
      <span>{alertMessage}</span>
      <button onClick={dismissAlert}>Dismiss</button>
    </div>
  );
}
