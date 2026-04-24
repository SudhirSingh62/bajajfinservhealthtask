// Name: Sudhir Singh
// Roll Number: YOURROLL

import React from 'react';

export default function SummaryCard({ metricsData, rejectedItems, redundantEdges }) {
  return (
    <div className="panel-container summary-panel">
      <h2>Summary</h2>
      
      <div className="summary-list">
        <div className="summary-item">
          <span style={{ color: 'var(--text-secondary)' }}>Healthy Trees:</span>
          <span>{metricsData.total_trees}</span>
        </div>
        <div className="summary-item">
          <span style={{ color: 'var(--text-secondary)' }}>Cycles Found:</span>
          <span>{metricsData.total_cycles}</span>
        </div>
        <div className="summary-item">
          <span style={{ color: 'var(--text-secondary)' }}>Deepest Root:</span>
          <span>{metricsData.largest_tree_root || 'None'}</span>
        </div>
      </div>

      {(rejectedItems.length > 0 || redundantEdges.length > 0) && (
        <div style={{ marginTop: '1.25rem', paddingTop: '1rem', borderTop: '1px solid var(--border-default)' }}>
          {rejectedItems.length > 0 && (
            <div style={{ marginBottom: '1rem' }}>
              <div style={{ fontSize: '0.85rem', color: 'var(--status-error)', marginBottom: '0.25rem' }}>Invalid entries detected:</div>
              <ul style={{ listStyleType: 'none', padding: 0, margin: 0 }}>
                {rejectedItems.map((item, idx) => (
                  <li key={idx} style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>&bull; {item}</li>
                ))}
              </ul>
            </div>
          )}
          {redundantEdges.length > 0 && (
            <div>
              <div style={{ fontSize: '0.85rem', color: 'var(--status-warning)', marginBottom: '0.25rem' }}>Duplicate edges ignored:</div>
              <ul style={{ listStyleType: 'none', padding: 0, margin: 0 }}>
                {redundantEdges.map((item, idx) => (
                  <li key={idx} style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>&bull; {item}</li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
