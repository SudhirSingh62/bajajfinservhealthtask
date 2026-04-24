// Name: Sudhir Singh
// Roll Number: YOURROLL

import React, { useState } from 'react';
import InputPanel from './components/InputPanel';
import SummaryCard from './components/SummaryCard';
import HierarchyCard from './components/HierarchyCard';
import ErrorBanner from './components/ErrorBanner';
import { dispatchNetworkAnalysis } from './api/client';

export default function App() {
  const [analysisOutcome, setAnalysisOutcome] = useState(null);
  const [systemAlert, setSystemAlert] = useState(null);
  const [processingState, setProcessingState] = useState(false);

  const processNetworkRequest = async (edgeList) => {
    setProcessingState(true);
    setSystemAlert(null);
    try {
      const serverData = await dispatchNetworkAnalysis(edgeList);
      setAnalysisOutcome(serverData);
    } catch (failure) {
      setSystemAlert(
        failure.response?.data?.error || failure.message || 'Server error occurred.'
      );
    } finally {
      setProcessingState(false);
    }
  };

  return (
    <div className="main-wrapper">
      <h1>Network Structure Analyzer</h1>
      <p className="tagline">Internal tool for parsing and validating hierarchical edge definitions.</p>

      <ErrorBanner alertMessage={systemAlert} dismissAlert={() => setSystemAlert(null)} />

      <div className="section-label">Input</div>
      <InputPanel triggerAnalysis={processNetworkRequest} isProcessing={processingState} />

      {analysisOutcome && (
        <>
          <div className="section-label">Results</div>
          <SummaryCard
            metricsData={analysisOutcome.summary}
            rejectedItems={analysisOutcome.invalid_entries}
            redundantEdges={analysisOutcome.duplicate_edges}
          />

          <div className="grid-layout" style={{ marginTop: '1rem' }}>
            {analysisOutcome.hierarchies.map((hierarchyItem, index) => (
              <HierarchyCard key={`hierarchy-${index}`} structurePayload={hierarchyItem} />
            ))}
          </div>
        </>
      )}
    </div>
  );
}
