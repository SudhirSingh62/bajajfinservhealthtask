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
          <span style={{ color: 'var(--text-primary)', fontFamily: "'JetBrains Mono', monospace" }}>
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
          color: 'var(--badge-cycle-text)',
          fontWeight: 600,
          fontSize: '0.9rem',
          background: 'var(--badge-cycle-bg)',
          borderRadius: '12px',
          border: '1px dashed var(--badge-cycle-border)',
        }}>
          Cyclic dependency detected — no tree can be constructed
        </div>
      ) : (
        <TreeView nestedTopology={nestedTopology} />
      )}
    </div>
  );
}
