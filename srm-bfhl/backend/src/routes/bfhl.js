// Name: Sudhir Singh
// Roll Number: YOURROLL

const express = require('express');
const processingRouter = express.Router();
const { validate } = require('../logic/validator');
const { buildGraph, getConnectedComponents, findRoots } = require('../logic/graphBuilder');
const { detectCycle } = require('../logic/cycleDetector');
const { buildTree, calcDepth } = require('../logic/treeBuilder');
const { summarize } = require('../logic/summarizer');

processingRouter.post('/', (requestObj, responseObj) => {
  const inputPayload = requestObj.body.data;
  
  const user_id = "sudhir_singh_24042026";
  const email_id = "sudhir.singh@college.edu";
  const college_roll_number = "YOUR_ROLL_NUMBER";

  if (!inputPayload || !Array.isArray(inputPayload)) {
    return responseObj.status(400).json({ error: "Invalid input data format" });
  }

  const { valid_entries, invalid_entries } = validate(inputPayload);
  const { duplicate_edges, children, parentOf, allNodes } = buildGraph(valid_entries);
  const clusterArray = getConnectedComponents(allNodes, children, parentOf);

  const hierarchyResults = [];

  clusterArray.forEach(clusterGroup => {
    const clusterApex = findRoots(clusterGroup, parentOf);
    const containsCycle = detectCycle(clusterGroup, children);

    if (containsCycle) {
      hierarchyResults.push({
        root: clusterApex,
        tree: {},
        has_cycle: true
      });
    } else {
      const nestedMap = buildTree(clusterApex, children);
      const branchDepth = calcDepth(clusterApex, children);
      hierarchyResults.push({
        root: clusterApex,
        tree: nestedMap,
        depth: branchDepth
      });
    }
  });

  hierarchyResults.sort((firstItem, secondItem) => firstItem.root.localeCompare(secondItem.root));
  const finalSummary = summarize(hierarchyResults);

  responseObj.json({
    user_id,
    email_id,
    college_roll_number,
    hierarchies: hierarchyResults,
    invalid_entries,
    duplicate_edges,
    summary: finalSummary
  });
});

module.exports = processingRouter;
