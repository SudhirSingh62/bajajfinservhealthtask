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
        failure.response?.data?.error || failure.message || 'System fault encountered during analysis.'
      );
    } finally {
      setProcessingState(false);
    }
  };

  return (
    <div className="main-wrapper">
      <h1 className="header-title">BFHL Topography Engine</h1>
      <p className="tagline">Advanced hierarchical mapping &amp; structural diagnostics</p>

      <ErrorBanner alertMessage={systemAlert} dismissAlert={() => setSystemAlert(null)} />

      <InputPanel triggerAnalysis={processNetworkRequest} isProcessing={processingState} />

      {analysisOutcome && (
        <>
          <SummaryCard
            metricsData={analysisOutcome.summary}
            rejectedItems={analysisOutcome.invalid_entries}
            redundantEdges={analysisOutcome.duplicate_edges}
          />

          <div style={{ marginTop: '2.5rem' }}>
            <h2 className="section-header">Structural Topologies</h2>
            <div className="grid-layout">
              {analysisOutcome.hierarchies.map((hierarchyItem, index) => (
                <HierarchyCard key={`hierarchy-${index}`} structurePayload={hierarchyItem} />
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
}
