// Name: Sudhir Singh
// Roll Number: YOURROLL

import React, { useState } from 'react';

export default function InputPanel({ triggerAnalysis, isProcessing }) {
  const [rawTextPayload, setRawTextPayload] = useState(
    'A->B, A->C, B->D, C->E, E->F\nX->Y, Y->Z, Z->X\nP->Q, Q->R\nG->H, G->H, G->I\nhello, 1->2, A->'
  );
  const [inputError, setInputError] = useState(null);

  const parseInput = (inputText) => {
    const trimmedInput = inputText.trim();
    
    if (trimmedInput.startsWith('[')) {
      try {
        const parsed = JSON.parse(inputText);
        if (!Array.isArray(parsed)) {
          throw new Error('Invalid JSON format');
        }
        return parsed;
      } catch (error) {
        throw new Error('Invalid JSON format');
      }
    } else {
      return inputText
        .split(/[\n,]+/)
        .map((fragment) => fragment.trim())
        .filter((fragment) => fragment !== '');
    }
  };

  const executeSubmit = (eventObj) => {
    eventObj.preventDefault();
    setInputError(null);
    
    try {
      const formattedEdgeList = parseInput(rawTextPayload);
      
      if (formattedEdgeList.length === 0) {
        setInputError('Please enter input');
        return;
      }
      
      triggerAnalysis(formattedEdgeList);
    } catch (error) {
      setInputError(error.message);
    }
  };

  return (
    <div className="panel-container">
      <h2 style={{ marginBottom: '1.25rem' }}>Network Definitions</h2>
      {inputError && (
        <div style={{ color: '#B91C1C', backgroundColor: '#FEF2F2', padding: '0.5rem 1rem', borderRadius: '6px', marginBottom: '1rem', fontSize: '0.9rem', border: '1px solid #FCA5A5' }}>
          ⚠ {inputError}
        </div>
      )}
      <form onSubmit={executeSubmit}>
        <textarea
          className="input-area"
          value={rawTextPayload}
          onChange={(eventObj) => {
            setRawTextPayload(eventObj.target.value);
            if (inputError) setInputError(null);
          }}
          placeholder="Enter comma-separated values (e.g. A->B, A->C) OR a valid JSON array ([&quot;A->B&quot;, &quot;A->C&quot;])"
        />
        <button type="submit" className="action-btn" disabled={isProcessing}>
          {isProcessing ? (
            <>
              <span className="spinner"></span>
              Processing...
            </>
          ) : (
            '⚡ Analyze Network'
          )}
        </button>
      </form>
    </div>
  );
}
