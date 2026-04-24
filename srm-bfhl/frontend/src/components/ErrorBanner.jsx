// Name: Sudhir Singh
// Roll Number: YOURROLL

import React from 'react';

export default function ErrorBanner({ alertMessage, dismissAlert }) {
  if (!alertMessage) return null;

  return (
    <div className="alert-box">
      <span style={{ fontWeight: 600, display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
        <span style={{ fontSize: '1.1rem' }}>⚠</span> {alertMessage}
      </span>
      <button
        onClick={dismissAlert}
        style={{
          background: 'rgba(255, 64, 129, 0.15)',
          border: '1px solid rgba(255, 64, 129, 0.3)',
          color: 'var(--accent-pink)',
          cursor: 'pointer',
          fontSize: '0.85rem',
          padding: '0.3rem 0.7rem',
          borderRadius: '6px',
          fontWeight: 600,
          transition: 'all 0.2s ease',
        }}
      >
        Dismiss
      </button>
    </div>
  );
}
