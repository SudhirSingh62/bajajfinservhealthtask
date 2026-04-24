// Name: Sudhir Singh
// Roll Number: YOURROLL

function compileAnalysisSummary(hierarchyCollection) {
  let validTreeCounter = 0;
  let cyclicStructureCounter = 0;
  let dominantTreeApex = "";
  let highestDepthObserved = 0;

  hierarchyCollection.forEach(hierarchyStructure => {
    if (hierarchyStructure.has_cycle) {
      cyclicStructureCounter++;
    } else {
      validTreeCounter++;
      if (hierarchyStructure.depth > highestDepthObserved) {
        highestDepthObserved = hierarchyStructure.depth;
        dominantTreeApex = hierarchyStructure.root;
      } else if (hierarchyStructure.depth === highestDepthObserved) {
        if (dominantTreeApex === "" || hierarchyStructure.root < dominantTreeApex) {
          dominantTreeApex = hierarchyStructure.root;
        }
      }
    }
  });

  return {
    total_trees: validTreeCounter,
    total_cycles: cyclicStructureCounter,
    largest_tree_root: dominantTreeApex
  };
}
module.exports = { summarize: compileAnalysisSummary };
