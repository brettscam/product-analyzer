import React, { useState } from 'react';
import { Camera, Info, Globe2 } from 'lucide-react';
import ProductTypeSelector from './ProductTypeSelector';

const CombinedAnalyzer = () => {
  const [selectedType, setSelectedType] = useState('product');
  const [productTitle, setProductTitle] = useState('');
  const [images, setImages] = useState([]);
  const [analysis, setAnalysis] = useState(null);
  const [history, setHistory] = useState([]);

  const getScoreMethodology = (type) => {
    const methodologies = {
      product: "Score based on EWG's Skin Deep® database methodology, analyzing ingredient safety data from over 60 toxicity and regulatory databases.",
      food: "Score derived from FDA food safety guidelines, allergen presence, and processing safety standards.",
      pregnancy: "Score based on FDA pregnancy categories, clinical studies, and recommendations from major obstetric organizations."
    };
    return methodologies[type];
  };

  const getSources = (type) => {
    const sources = {
      product: [
        "Environmental Working Group (EWG) Skin Deep® Database",
        "EU Cosmetics Ingredient Database",
        "FDA Cosmetic Ingredient Database",
        "Health Canada Cosmetic Ingredient Hotlist"
      ],
      food: [
        "FDA Food Safety Database",
        "USDA Food Composition Database",
        "European Food Safety Authority Database",
        "Health Canada Food Safety Standards"
      ],
      pregnancy: [
        "FDA Pregnancy Categories",
        "MotherToBaby Database",
        "European Medicines Agency Pregnancy Data",
        "Australian Therapeutic Goods Administration"
      ]
    };
    return sources[type];
  };

  const simulateAnalysis = () => {
    if (!productTitle.trim()) {
      alert('Please enter a product title');
      return;
    }

    const newAnalysis = {
      productName: productTitle,
      timestamp: new Date().toISOString(),
      safetyScore: Math.floor(Math.random() * 40) + 60,
      type: selectedType,
      ingredients: [
        {
          name: "Example Ingredient",
          status: "high_risk",
          regulations: {
            EU: "Banned/Restricted",
            US: "Limited to 1%",
            Canada: "Restricted in certain products"
          },
          concerns: ["Cancer risk", "Hormone disruption"],
          alternatives: ["Safe Alternative 1", "Safe Alternative 2"]
        }
      ],
      sources: getSources(selectedType),
      methodology: getScoreMethodology(selectedType)
    };

    setAnalysis(newAnalysis);
    setHistory(prev => [newAnalysis, ...prev]);
  };

  return (
    <div className="max-w-6xl mx-auto p-4">
      <ProductTypeSelector selectedType={selectedType} onTypeSelect={setSelectedType} />
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-6">
          {/* Input Section */}
          <div className="bg-white rounded-lg shadow p-6">
            <input
              type="text"
              value={productTitle}
              onChange={(e) => setProductTitle(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg mb-4"
              placeholder="Enter product name"
            />

            <label className="block mb-4">
              <div className="flex items-center justify-center h-32 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:bg-gray-50">
                <div className="text-center">
                  <Camera className="mx-auto h-12 w-12 text-gray-400" />
                  <span className="mt-2 block text-sm text-gray-600">Upload product images</span>
                </div>
              </div>
              <input type="file" className="hidden" onChange={/* handle upload */} accept="image/*" multiple />
            </label>

            {images.length > 0 && (
              <div className="grid grid-cols-3 gap-2">
                {images.map((image, index) => (
                  <div key={index} className="relative">
                    <img src={image} alt="" className="w-full h-24 object-cover rounded" />
                    <button className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1">×</button>
                  </div>
                ))}
              </div>
            )}

            <button
              onClick={simulateAnalysis}
              className="w-full mt-4 py-2 px-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              Analyze Product
            </button>
          </div>

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
                  <button className="ml-2 text-gray-400 hover:text-gray-600">
                    <Info size={16} />
                  </button>
                </div>
                <p className="text-sm text-gray-600 mt-2">{analysis.methodology}</p>
              </div>

              {/* Regional Regulations */}
              <div className="mb-4">
                <h4 className="font-medium flex items-center mb-2">
                  <Globe2 className="w-4 h-4 mr-2" />
                  Regional Information
                </h4>
                {analysis.ingredients.map((ingredient, index) => (
                  <div key={index} className="ml-6 mb-4">
                    <p className="font-medium">{ingredient.name}</p>
                    <ul className="mt-2 space-y-1 text-sm">
                      {Object.entries(ingredient.regulations).map(([region, status]) => (
                        <li key={region} className="flex items-start">
                          <span className="font-medium w-20">{region}:</span>
                          <span className="text-gray-600">{status}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>

              {/* Sources */}
              <div className="mt-6 pt-4 border-t">
                <h4 className="font-medium mb-2">Data Sources:</h4>
                <ul className="text-sm text-gray-600 space-y-1">
                  {analysis.sources.map((source, index) => (
                    <li key={index}>• {source}</li>
                  ))}
                </ul>
              </div>
            </div>
          )}
        </div>

        {/* History Section */}
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-xl font-semibold mb-4">Analysis History</h3>
          <div className="space-y-4">
            {history.map((item, index) => (
              <div key={index} className="border rounded-lg p-4">
                <div className="flex justify-between items-start">
                  <div>
                    <h4 className="font-medium">{item.productName}</h4>
                    <p className="text-sm text-gray-600">
                      {new Date(item.timestamp).toLocaleDateString()}
                    </p>
                  </div>
                  <div className={`text-lg font-bold ${
                    item.safetyScore > 80 ? 'text-green-600' :
                    item.safetyScore > 60 ? 'text-yellow-600' : 'text-red-600'
                  }`}>
                    {item.safetyScore}%
                  </div>
                </div>
                {item.ingredients.length > 0 && (
                  <div className="mt-2 text-sm text-gray-600">
                    <p>Key Concerns: {item.ingredients[0].concerns.join(", ")}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CombinedAnalyzer;
