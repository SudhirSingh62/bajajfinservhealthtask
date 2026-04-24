// Name: Sudhir Singh
// Roll Number: YOURROLL

import React, { useState } from 'react';

export default function InputPanel({ triggerAnalysis, isProcessing }) {
  const [rawTextPayload, setRawTextPayload] = useState('A->B, A->C, B->D, C->E, E->F\nX->Y, Y->Z, Z->X\nP->Q, Q->R\nG->H, G->H, G->I\nhello, 1->2, A->');

  const executeSubmit = (eventObj) => {
    eventObj.preventDefault();
    if (!rawTextPayload.trim()) return;
    
    const formattedEdgeList = rawTextPayload.split(/,|\n/).map(fragment => fragment.trim()).filter(Boolean);
    triggerAnalysis(formattedEdgeList);
  };

  return (
    <div className="panel-container">
      <h2 style={{ marginBottom: '1rem', color: 'var(--text-light)' }}>Network Definitions</h2>
      <form onSubmit={executeSubmit}>
        <textarea
          className="input-area"
          value={rawTextPayload}
          onChange={(eventObj) => setRawTextPayload(eventObj.target.value)}
          placeholder="Inject network edges (e.g., A->B)..."
        />
        <button type="submit" className="action-btn" disabled={isProcessing}>
          {isProcessing ? 'Processing Network...' : 'Analyze Network'}
        </button>
      </form>
    </div>
  );
}
