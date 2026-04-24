// Name: Sudhir Singh
// Roll Number: YOURROLL

import React from 'react';

export default function ErrorBanner({ alertMessage, dismissAlert }) {
  if (!alertMessage) return null;

  return (
    <div className="alert-box">
      <span style={{ fontWeight: '600' }}>{alertMessage}</span>
      <button onClick={dismissAlert} style={{ background: 'none', border: 'none', color: '#FF5252', cursor: 'pointer', fontSize: '1.2rem' }}>
        ✕
      </button>
    </div>
  );
}
