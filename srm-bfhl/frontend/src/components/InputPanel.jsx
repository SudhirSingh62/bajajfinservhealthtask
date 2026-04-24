// Name: Sudhir Singh
// Roll Number: YOURROLL

import React, { useState, useEffect } from 'react';

export default function InputPanel({ triggerAnalysis, isProcessing }) {
  const [rawTextPayload, setRawTextPayload] = useState(
    'A->B, A->C\nB->D, C->E\n1->2'
  );
  const [inputError, setInputError] = useState(null);
  const [parsedPreview, setParsedPreview] = useState([]);

  const parseInput = (inputText) => {
    const trimmedInput = inputText.trim();
    if (!trimmedInput) return [];
    
    if (trimmedInput.startsWith('[')) {
      try {
        const parsed = JSON.parse(inputText);
        if (!Array.isArray(parsed)) throw new Error('Not an array');
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

  useEffect(() => {
    try {
      const preview = parseInput(rawTextPayload);
      setParsedPreview(preview);
      setInputError(null);
    } catch (err) {
      setParsedPreview([]);
      setInputError(err.message);
    }
  }, [rawTextPayload]);

  const executeSubmit = (eventObj) => {
    eventObj.preventDefault();
    if (inputError) return;
    
    if (parsedPreview.length === 0) {
      setInputError('Please enter input');
      return;
    }
    
    triggerAnalysis(parsedPreview);
  };

  return (
    <div className="panel-container">
      <div className="helper-text">
        Enter edges (e.g. A-&gt;B, B-&gt;C). Supports comma or newline. Supports JSON array input as well.
      </div>
      
      {inputError && (
        <div style={{ color: 'var(--status-error)', marginBottom: '0.75rem', fontSize: '0.85rem' }}>
          Error: {inputError}
        </div>
      )}

      <form onSubmit={executeSubmit}>
        <textarea
          className="input-area"
          value={rawTextPayload}
          onChange={(eventObj) => setRawTextPayload(eventObj.target.value)}
          placeholder="A-&gt;B, A-&gt;C&#10;B-&gt;D"
        />
        
        {!inputError && parsedPreview.length > 0 && (
          <div className="parsed-preview">
            Parsed: {parsedPreview.length} entries
          </div>
        )}

        <div style={{ display: 'flex', justifyContent: 'flex-start', alignItems: 'center', gap: '1rem', marginTop: '0.5rem' }}>
          <button type="submit" className="action-btn" disabled={isProcessing || !!inputError || parsedPreview.length === 0}>
            {isProcessing ? (
              <>
                <span className="spinner"></span> Analyzing...
              </>
            ) : (
              'Run Analysis'
            )}
          </button>
        </div>
      </form>
    </div>
  );
}
