// Name: Sudhir Singh
// Roll Number: YOURROLL

import React from 'react';
import TreeView from './TreeView';

export default function HierarchyCard({ structurePayload }) {
  const {
    root: apexElement,
    tree: nestedTopology,
    has_cycle: containsCycle,
    depth: branchDepth,
  } = structurePayload;

  return (
    <div className="panel-container" style={{ animationDelay: '0.2s' }}>
      <div className="hierarchy-header-row">
        <h3>
          <span style={{ color: 'var(--accent-cyan)', fontFamily: "'JetBrains Mono', monospace" }}>
            {apexElement}
          </span>
          <span style={{ color: 'var(--text-muted)', fontWeight: 400, fontSize: '0.85rem' }}>root</span>
        </h3>
        {containsCycle ? (
          <span className="status-badge cycle-badge">⚠ Cycle</span>
        ) : (
          <span className="status-badge tree-badge">Depth {branchDepth}</span>
        )}
      </div>

      {containsCycle ? (
        <div style={{
          padding: '2rem',
          textAlign: 'center',
          color: 'var(--accent-pink)',
          fontWeight: 600,
          fontSize: '0.9rem',
          background: 'rgba(255, 64, 129, 0.04)',
          borderRadius: '12px',
          border: '1px dashed rgba(255, 64, 129, 0.2)',
        }}>
          Cyclic dependency detected — no tree can be constructed
        </div>
      ) : (
        <TreeView nestedTopology={nestedTopology} />
      )}
    </div>
  );
}
