import React from 'react';
import CombinedAnalyzer from './components/CombinedAnalyzer';
import ProductTypeSelector from './components/ProductTypeSelector';

function App() {
  return (
    <div className="App">
      <ProductTypeSelector />
      <CombinedAnalyzer />
    </div>
  );
}

export default App;
