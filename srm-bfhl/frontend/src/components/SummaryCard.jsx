// Name: Sudhir Singh
// Roll Number: YOURROLL

import React from 'react';

export default function SummaryCard({ metricsData, rejectedItems, redundantEdges }) {
  return (
    <div className="panel-container" style={{ animationDelay: '0.1s' }}>
      <h2 style={{ marginBottom: '1.25rem' }}>Diagnostic Overview</h2>

      <div className="grid-layout" style={{ marginBottom: '1.5rem' }}>
        <div className="metric-block">
          <div className="metric-digit">{metricsData.total_trees}</div>
          <div className="metric-caption">Healthy Trees</div>
        </div>
        <div className="metric-block">
          <div className="metric-digit">{metricsData.total_cycles}</div>
          <div className="metric-caption">Cycles Found</div>
        </div>
        <div className="metric-block">
          <div className="metric-digit" style={{ fontSize: '2.2rem' }}>
            {metricsData.largest_tree_root || '—'}
          </div>
          <div className="metric-caption">Deepest Root</div>
        </div>
      </div>

      {(rejectedItems.length > 0 || redundantEdges.length > 0) && (
        <div style={{ borderTop: '1px solid var(--border-glass)', paddingTop: '1.25rem' }}>
          {rejectedItems.length > 0 && (
            <div style={{ marginBottom: '0.75rem', display: 'flex', alignItems: 'flex-start', gap: '0.75rem', flexWrap: 'wrap' }}>
              <span className="status-badge invalid-badge">Malformed</span>
              <span style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', fontFamily: "'JetBrains Mono', monospace" }}>
                {rejectedItems.join(' · ')}
              </span>
            </div>
          )}
          {redundantEdges.length > 0 && (
            <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.75rem', flexWrap: 'wrap' }}>
              <span className="status-badge duplicate-badge">Duplicates</span>
              <span style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', fontFamily: "'JetBrains Mono', monospace" }}>
                {redundantEdges.join(' · ')}
              </span>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
