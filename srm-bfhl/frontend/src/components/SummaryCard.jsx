// Name: Sudhir Singh
// Roll Number: YOURROLL

import React from 'react';

export default function SummaryCard({ metricsData, rejectedItems, redundantEdges }) {
  return (
    <div className="panel-container">
      <h2>Execution Summary</h2>
      
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
        <div style={{ marginTop: '1rem', paddingTop: '1rem', borderTop: '1px solid var(--border-default)' }}>
          {rejectedItems.length > 0 && (
            <div style={{ marginBottom: '0.5rem', fontSize: '0.85rem' }}>
              <span className="status-badge invalid-badge" style={{ marginRight: '0.5rem' }}>Malformed</span>
              <span style={{ color: 'var(--text-secondary)', fontFamily: "'JetBrains Mono', monospace" }}>
                {rejectedItems.join(', ')}
              </span>
            </div>
          )}
          {redundantEdges.length > 0 && (
            <div style={{ fontSize: '0.85rem' }}>
              <span className="status-badge duplicate-badge" style={{ marginRight: '0.5rem' }}>Duplicates</span>
              <span style={{ color: 'var(--text-secondary)', fontFamily: "'JetBrains Mono', monospace" }}>
                {redundantEdges.join(', ')}
              </span>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
