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
    <div className="panel-container" style={{ margin: 0 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
        <h3>
          <span style={{ fontFamily: "'JetBrains Mono', monospace", marginRight: '0.5rem' }}>
            {apexElement}
          </span>
          <span style={{ color: 'var(--text-muted)', fontWeight: 400, fontSize: '0.8rem' }}>(root)</span>
        </h3>
        {containsCycle ? (
          <span className="status-badge cycle-badge">Cycle Detected</span>
        ) : (
          <span className="status-badge tree-badge">Depth: {branchDepth}</span>
        )}
      </div>

      {containsCycle ? (
        <div style={{
          color: 'var(--status-error)',
          fontSize: '0.85rem',
          paddingTop: '0.5rem',
          borderTop: '1px solid var(--border-default)'
        }}>
          Tree unbuildable due to cycle.
        </div>
      ) : (
        <div style={{ paddingTop: '0.5rem', borderTop: '1px solid var(--border-default)' }}>
          <TreeView nestedTopology={nestedTopology} />
        </div>
      )}
    </div>
  );
}
