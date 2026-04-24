// Name: Sudhir Singh
// Roll Number: YOURROLL

function isolateComponentRoots(componentElements, childToParentMap) {
  const identifiedRoots = [];
  for (const element of componentElements) {
    if (!childToParentMap.has(element)) {
      identifiedRoots.push(element);
    }
  }
  if (identifiedRoots.length === 1) return identifiedRoots[0];
  if (identifiedRoots.length > 1) {
    return identifiedRoots.sort()[0];
  }
  return Array.from(componentElements).sort()[0];
}

function groupIntoConnectedComponents(everyElementSet, parentToChildrenMap, childToParentMap) {
  const adjacencyMatrix = new Map();
  for (const elem of everyElementSet) {
    adjacencyMatrix.set(elem, []);
  }
  for (const [parentElem, kidList] of parentToChildrenMap.entries()) {
    for (const kidElem of kidList) {
      if (childToParentMap.get(kidElem) === parentElem) {
        adjacencyMatrix.get(parentElem).push(kidElem);
        adjacencyMatrix.get(kidElem).push(parentElem);
      }
    }
  }

  const exploredElements = new Set();
  const componentClusters = [];
  const sortedElements = Array.from(everyElementSet).sort();

  for (const currentElem of sortedElements) {
    if (!exploredElements.has(currentElem)) {
      const currentCluster = new Set();
      const traversalQueue = [currentElem];
      exploredElements.add(currentElem);
      
      while (traversalQueue.length > 0) {
        const activeElem = traversalQueue.shift();
        currentCluster.add(activeElem);
        const adjacentList = adjacencyMatrix.get(activeElem) || [];
        for (const neighborElem of adjacentList) {
          if (!exploredElements.has(neighborElem)) {
            exploredElements.add(neighborElem);
            traversalQueue.push(neighborElem);
          }
        }
      }
      componentClusters.push(currentCluster);
    }
  }
  return componentClusters;
}

function constructDirectedGraph(acceptableEdges) {
  const edgesEncountered = new Set();
  const redundantEdges = [];
  
  const parentToChildrenMap = new Map();
  const childToParentMap = new Map();
  const everyElementSet = new Set();

  acceptableEdges.forEach(directedEdge => {
    if (edgesEncountered.has(directedEdge)) {
      if (!redundantEdges.includes(directedEdge)) {
        redundantEdges.push(directedEdge);
      }
      return;
    }
    edgesEncountered.add(directedEdge);

    const [sourceElem, targetElem] = directedEdge.split('->');
    everyElementSet.add(sourceElem);
    everyElementSet.add(targetElem);

    if (childToParentMap.has(targetElem)) {
      return;
    }
    
    childToParentMap.set(targetElem, sourceElem);
    if (!parentToChildrenMap.has(sourceElem)) {
      parentToChildrenMap.set(sourceElem, []);
    }
    parentToChildrenMap.get(sourceElem).push(targetElem);
  });

  return { duplicate_edges: redundantEdges, children: parentToChildrenMap, parentOf: childToParentMap, allNodes: everyElementSet };
}

module.exports = { 
  buildGraph: constructDirectedGraph, 
  getConnectedComponents: groupIntoConnectedComponents, 
  findRoots: isolateComponentRoots 
};
