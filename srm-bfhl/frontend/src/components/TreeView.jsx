// Name: Sudhir Singh
// Roll Number: YOURROLL

import React from 'react';

function StructureBranch({ elementTag, subElementsMap }) {
  const branchKeys = Object.keys(subElementsMap || {}).sort();
  const isLeaf = branchKeys.length === 0;

  return (
    <div className="structure-node">
      <div style={{ padding: '0.1rem 0' }}>
        <span className="element-tag" style={isLeaf ? { color: 'var(--text-secondary)' } : {}}>
          {elementTag}
        </span>
      </div>
      {branchKeys.length > 0 && (
        <div>
          {branchKeys.map((keyIdentifier) => (
            <StructureBranch
              key={keyIdentifier}
              elementTag={keyIdentifier}
              subElementsMap={subElementsMap[keyIdentifier]}
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
      <div style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>
        [Empty]
      </div>
    );
  }

  return (
    <div style={{ marginTop: '-0.2rem' }}>
      {apexKeys.map((keyIdentifier) => (
        <StructureBranch
          key={keyIdentifier}
          elementTag={keyIdentifier}
          subElementsMap={nestedTopology[keyIdentifier]}
        />
      ))}
    </div>
  );
}
