// Name: Sudhir Singh
// Roll Number: YOURROLL

import React from 'react';

export default function SummaryCard({ metricsData, rejectedItems, redundantEdges }) {
  return (
    <div className="panel-container">
      <h2 style={{ marginBottom: '1rem' }}>Diagnostic Overview</h2>
      
      <div className="grid-layout" style={{ marginBottom: '1.5rem' }}>
        <div className="metric-block">
          <div className="metric-digit">{metricsData.total_trees}</div>
          <div className="metric-caption">Healthy Trees</div>
        </div>
        <div className="metric-block">
          <div className="metric-digit">{metricsData.total_cycles}</div>
          <div className="metric-caption">Cycles Identified</div>
        </div>
        <div className="metric-block">
          <div className="metric-digit">{metricsData.largest_tree_root || 'None'}</div>
          <div className="metric-caption">Apex Root</div>
        </div>
      </div>

      {(rejectedItems.length > 0 || redundantEdges.length > 0) && (
        <div style={{ borderTop: '1px solid var(--card-border)', paddingTop: '1rem' }}>
          {rejectedItems.length > 0 && (
            <div style={{ marginBottom: '0.75rem' }}>
              <span className="status-badge invalid-badge" style={{ marginRight: '0.5rem' }}>Malformed Edges</span>
              <span style={{ color: 'var(--text-dim)', fontSize: '0.9rem' }}>{rejectedItems.join(', ')}</span>
            </div>
          )}
          {redundantEdges.length > 0 && (
            <div>
              <span className="status-badge duplicate-badge" style={{ marginRight: '0.5rem' }}>Redundant Edges</span>
              <span style={{ color: 'var(--text-dim)', fontSize: '0.9rem' }}>{redundantEdges.join(', ')}</span>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
