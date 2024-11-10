import React from 'react'
import { ProductAnalyzer } from './components/ProductAnalyzer'
import PlasticProductAnalysis from './components/PlasticProductAnalysis';

function App() {
  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <ProductAnalyzer />
      <PlasticProductAnalysis />
    </div>
  )
}

export default App
