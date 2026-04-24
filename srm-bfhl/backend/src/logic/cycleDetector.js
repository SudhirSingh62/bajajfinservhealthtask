// Name: Sudhir Singh
// Roll Number: YOURROLL

function inspectForCycles(clusterElements, parentToChildrenMap) {
  const traversedSet = new Set();
  const activePathStack = new Set();

  function diveDeep(currentElem) {
    traversedSet.add(currentElem);
    activePathStack.add(currentElem);

    const descendantList = parentToChildrenMap.get(currentElem) || [];
    for (const descendant of descendantList) {
      if (!traversedSet.has(descendant)) {
        if (diveDeep(descendant)) return true;
      } else if (activePathStack.has(descendant)) {
        return true;
      }
    }

    activePathStack.delete(currentElem);
    return false;
  }

  for (const elem of clusterElements) {
    if (!traversedSet.has(elem)) {
      if (diveDeep(elem)) return true;
    }
  }

  return false;
}
module.exports = { detectCycle: inspectForCycles };
