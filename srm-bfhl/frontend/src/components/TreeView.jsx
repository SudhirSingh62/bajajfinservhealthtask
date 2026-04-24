// Name: Sudhir Singh
// Roll Number: YOURROLL

import React from 'react';

function StructureBranch({ elementTag, subElementsMap, depthLevel }) {
  const branchKeys = Object.keys(subElementsMap || {}).sort();
  const isLeaf = branchKeys.length === 0;

  return (
    <div className="structure-node">
      <div className="node-content-row">
        <span className="element-tag" style={isLeaf ? { borderColor: 'var(--border-focus)', color: 'var(--text-secondary)' } : {}}>
          {elementTag}
          {isLeaf && <span style={{ marginLeft: '0.4rem', fontSize: '0.7rem', opacity: 0.6 }}>leaf</span>}
        </span>
      </div>
      {branchKeys.length > 0 && (
        <div className="nested-branches">
          {branchKeys.map((keyIdentifier) => (
            <StructureBranch
              key={keyIdentifier}
              elementTag={keyIdentifier}
              subElementsMap={subElementsMap[keyIdentifier]}
              depthLevel={depthLevel + 1}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default function TreeView({ nestedTopology }) {
  const apexKeys = Object.keys(nestedTopology).sort();

  if (apexKeys.length === 0) {
    return (
      <div style={{ color: 'var(--text-muted)', fontStyle: 'italic', padding: '1rem' }}>
        Empty topology
      </div>
    );
  }

  return (
    <div style={{ padding: '0.5rem 0' }}>
      {apexKeys.map((keyIdentifier) => (
        <StructureBranch
          key={keyIdentifier}
          elementTag={keyIdentifier}
          subElementsMap={nestedTopology[keyIdentifier]}
          depthLevel={0}
        />
      ))}
    </div>
  );
}
