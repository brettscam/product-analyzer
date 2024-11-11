import React, { useState } from 'react';
import PlasticProductAnalysis from './PlasticProductAnalysis';
import ProductAnalyzer from './ProductAnalyzer';
import ProductTypeSelector from './ProductTypeSelector';

const CombinedAnalyzer = () => {
  const [analysisType, setAnalysisType] = useState('plastic');
  
  const renderAnalyzer = () => {
    switch(analysisType) {
      case 'plastic':
        return <PlasticProductAnalysis />;
      case 'ingredients':
      case 'pregnancy':
        return <ProductAnalyzer mode={analysisType} />;
      default:
        return <PlasticProductAnalysis />;
    }
  };

  return (
    <div className="max-w-4xl mx-auto mt-10 p-6 bg-white rounded-lg shadow-xl">
      <h2 className="text-2xl font-bold mb-6">Product Safety Analyzer</h2>
      
      <ProductTypeSelector 
        onTypeSelect={setAnalysisType}
        selectedType={analysisType}
      />

      {renderAnalyzer()}
    </div>
  );
};

export default CombinedAnalyzer;
