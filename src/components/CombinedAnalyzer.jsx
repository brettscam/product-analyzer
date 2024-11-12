import React, { useState } from 'react';
import { Camera, Info, Globe2, AlertCircle, CheckCircle } from 'lucide-react';
import ProductTypeSelector from './ProductTypeSelector';

const CombinedAnalyzer = () => {
  // ... [previous state code remains the same]

  const simulateAnalysis = () => {
    if (!productTitle.trim()) {
      alert('Please enter a product title');
      return;
    }

    const newAnalysis = {
      productName: productTitle,
      timestamp: new Date().toISOString(),
      type: selectedType,
      safetyScore: Math.floor(Math.random() * 40) + 60,
      ingredients: [
        {
          name: "High Fructose Corn Syrup",
          status: "high_risk",
          description: "Artificial sweetener linked to obesity and diabetes",
          tags: ["Added Sugar", "Processed"],
          healthConcerns: [
            "Blood sugar impact",
            "Weight gain risk",
            "Metabolic issues"
          ],
          regulations: {
            EU: "Required warning label",
            US: "No restrictions",
            Canada: "Required disclosure"
          }
        },
        {
          name: "Yellow 5",
          status: "moderate_risk",
          description: "Artificial color linked to hyperactivity in children",
          tags: ["Artificial Color", "Allergen Risk"],
          healthConcerns: [
            "Hyperactivity in children",
            "Allergic reactions",
            "Behavioral effects"
          ],
          regulations: {
            EU: "Warning required",
            US: "Approved",
            Canada: "Restricted in children's products"
          }
        },
        {
          name: "Whole Grain Wheat",
          status: "safe",
          description: "Natural whole grain ingredient",
          tags: ["Natural", "Whole Grain"],
          healthConcerns: [],
          regulations: {
            EU: "Approved",
            US: "Approved",
            Canada: "Approved"
          }
        }
      ],
      recommendations: [
        "Consider alternatives with natural colorings",
        "Look for products without artificial sweeteners",
        "Check for whole grain alternatives"
      ],
      methodology: getScoreMethodology(selectedType),
      sources: getSources(selectedType)
    };

    setAnalysis(newAnalysis);
    setHistory(prev => [newAnalysis, ...prev]);
  };

  const getStatusColor = (status) => {
    switch(status) {
      case 'high_risk': return 'bg-red-50';
      case 'moderate_risk': return 'bg-yellow-50';
      case 'safe': return 'bg-green-50';
      default: return 'bg-gray-50';
    }
  };

  const getStatusIcon = (status) => {
    switch(status) {
      case 'high_risk': return <AlertCircle className="w-5 h-5 text-red-500" />;
      case 'moderate_risk': return <AlertCircle className="w-5 h-5 text-yellow-500" />;
      case 'safe': return <CheckCircle className="w-5 h-5 text-green-500" />;
      default: return <Info className="w-5 h-5 text-gray-500" />;
    }
  };

  return (
    <div className="max-w-6xl mx-auto p-4">
      <ProductTypeSelector selectedType={selectedType} onTypeSelect={setSelectedType} />
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-6">
          {/* Input Section - same as before */}
          
          {/* Analysis Results */}
          {analysis && (
            <div className="bg-white rounded-lg shadow p-6">
              <div className="mb-4 pb-4 border-b">
                <h3 className="text-xl font-semibold">{analysis.productName}</h3>
                <div className="flex items-center mt-2">
                  <div className={`text-2xl font-bold ${
                    analysis.safetyScore > 80 ? 'text-green-600' :
                    analysis.safetyScore > 60 ? 'text-yellow-600' : 'text-red-600'
                  }`}>
                    {analysis.safetyScore}%
                  </div>
                  <div className="ml-2 text-sm text-gray-600">Safety Score</div>
                  <div className="ml-2 text-sm text-gray-500">{analysis.methodology}</div>
                </div>
              </div>

              {/* Ingredient Analysis */}
              <div className="mb-6">
                <h4 className="font-medium mb-3">Ingredient Analysis:</h4>
                <div className="space-y-3">
                  {analysis.ingredients.map((ingredient, index) => (
                    <div 
                      key={index} 
                      className={`p-4 rounded-lg ${getStatusColor(ingredient.status)}`}
                    >
                      <div className="flex items-start justify-between">
                        <div>
                          <div className="flex items-center">
                            {getStatusIcon(ingredient.status)}
                            <span className="ml-2 font-medium">{ingredient.name}</span>
                          </div>
                          <p className="text-sm text-gray-600 mt-1">{ingredient.description}</p>
                        </div>
                      </div>

                      {/* Tags */}
                      <div className="flex flex-wrap gap-2 mt-2">
                        {ingredient.tags.map((tag, i) => (
                          <span 
                            key={i}
                            className="px-2 py-1 bg-white bg-opacity-50 rounded-full text-xs"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>

                      {/* Health Concerns */}
                      {ingredient.healthConcerns.length > 0 && (
                        <div className="mt-2">
                          <p className="text-sm font-medium text-red-600">Health Concerns:</p>
                          <ul className="list-disc list-inside text-sm text-gray-600">
                            {ingredient.healthConcerns.map((concern, i) => (
                              <li key={i}>{concern}</li>
                            ))}
                          </ul>
                        </div>
                      )}

                      {/* Regulations */}
                      <div className="mt-2">
                        <p className="text-sm font-medium">Regional Information:</p>
                        <ul className="mt-1 space-y-1 text-sm text-gray-600">
                          {Object.entries(ingredient.regulations).map(([region, status]) => (
                            <li key={region} className="flex">
                              <span className="font-medium w-20">{region}:</span>
                              <span>{status}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Recommendations */}
              <div className="mb-6 p-4 bg-blue-50 rounded-lg">
                <h4 className="font-medium mb-2">Recommendations:</h4>
                <ul className="list-disc list-inside text-sm text-gray-600">
                  {analysis.recommendations.map((rec, index) => (
                    <li key={index}>{rec}</li>
                  ))}
                </ul>
              </div>

              {/* Sources - same as before */}
            </div>
          )}
        </div>

        {/* History Section - same as before */}
      </div>
    </div>
  );
};

export default CombinedAnalyzer;
