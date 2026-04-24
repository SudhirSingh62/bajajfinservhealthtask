// Name: Sudhir Singh
// Roll Number: YOURROLL

function evaluateMaxDepth(apexElement, parentToChildrenMap) {
  function pathWalk(currentElem) {
    const descendantList = parentToChildrenMap.get(currentElem) || [];
    if (descendantList.length === 0) return 1;
    let maximumBranchDepth = 0;
    for (const descendant of descendantList) {
      maximumBranchDepth = Math.max(maximumBranchDepth, pathWalk(descendant));
    }
    return 1 + maximumBranchDepth;
  }
  return pathWalk(apexElement);
}

function generateNestedStructure(apexElement, parentToChildrenMap) {
  function expandStructure(currentElem) {
    const descendantList = parentToChildrenMap.get(currentElem) || [];
    const structureMap = {};
    for (const descendant of descendantList) {
      structureMap[descendant] = expandStructure(descendant);
    }
    return structureMap;
  }
  return { [apexElement]: expandStructure(apexElement) };
}

module.exports = { buildTree: generateNestedStructure, calcDepth: evaluateMaxDepth };
