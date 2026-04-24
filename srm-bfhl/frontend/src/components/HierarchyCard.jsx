// Name: Sudhir Singh
// Roll Number: YOURROLL

import React from 'react';
import TreeView from './TreeView';

export default function HierarchyCard({ structurePayload }) {
  const { root: apexElement, tree: nestedTopology, has_cycle: containsCycle, depth: branchDepth } = structurePayload;

  return (
    <div className="panel-container">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem', borderBottom: '1px solid var(--card-border)', paddingBottom: '0.75rem' }}>
        <h3 style={{ fontSize: '1.2rem', color: 'var(--text-light)' }}>Apex: {apexElement}</h3>
        {containsCycle ? (
          <span className="status-badge cycle-badge">CYCLE DETECTED</span>
        ) : (
          <span className="status-badge tree-badge">Max Depth: {branchDepth}</span>
        )}
      </div>
      
      {!containsCycle && <TreeView nestedTopology={nestedTopology} />}
    </div>
  );
}
