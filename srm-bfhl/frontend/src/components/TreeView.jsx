// Name: Sudhir Singh
// Roll Number: YOURROLL

import React from 'react';

function StructureBranch({ elementTag, subElementsMap }) {
  const branchKeys = Object.keys(subElementsMap || {}).sort();
  
  return (
    <div className="structure-node">
      <div className="node-content-row">
        <span className="element-tag">{elementTag}</span>
      </div>
      {branchKeys.length > 0 && (
        <div className="nested-branches">
          {branchKeys.map(keyIdentifier => (
            <StructureBranch key={keyIdentifier} elementTag={keyIdentifier} subElementsMap={subElementsMap[keyIdentifier]} />
          ))}
        </div>
      )}
    </div>
  );
}

export default function TreeView({ nestedTopology }) {
  const apexKeys = Object.keys(nestedTopology).sort();
  
  if (apexKeys.length === 0) {
    return <div style={{ color: 'var(--text-dim)', fontStyle: 'italic', padding: '1rem' }}>Void Structure</div>;
  }

  return (
    <div style={{ padding: '0.5rem 0' }}>
      {apexKeys.map(keyIdentifier => (
        <StructureBranch key={keyIdentifier} elementTag={keyIdentifier} subElementsMap={nestedTopology[keyIdentifier]} />
      ))}
    </div>
  );
}
