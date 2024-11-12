import React from 'react';
import ErrorBoundary from './components/ErrorBoundary';
import CombinedAnalyzer from './components/CombinedAnalyzer';

function App() {
  return (
    <div className="min-h-screen bg-gray-50">
      <ErrorBoundary>
        <CombinedAnalyzer />
      </ErrorBoundary>
    </div>
  );
}

export default App;
