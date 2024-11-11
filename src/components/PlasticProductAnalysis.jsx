import React, { useState } from 'react';
import { Camera, AlertCircle, CheckCircle, Info, X, ShieldAlert, Globe2 } from 'lucide-react';

const ProductSafetyAnalysis = () => {
  const [images, setImages] = useState([]);
  const [analysis, setAnalysis] = useState(null);
  const [history, setHistory] = useState([]);

  const handleImageUpload = (event) => {
    const files = Array.from(event.target.files);
    const newImages = files.map(file => URL.createObjectURL(file));
    setImages(prevImages => [...prevImages, ...newImages]);
  };

  const removeImage = (index) => {
    setImages(prevImages => prevImages.filter((_, i) => i !== index));
  };

  const simulateAnalysis = () => {
    setTimeout(() => {
      const newAnalysis = {
        productName: `Personal Care Product ${history.length + 1}`,
        productType: "Sunscreen",
        overallSafetyScore: Math.floor(Math.random() * 40) + 60,
        ingredients: [
          {
            name: "Oxybenzone",
            status: "high_risk",
            description: "UV filter linked to hormone disruption",
            healthConcerns: [
              "Endocrine disruption",
              "Allergic reactions",
              "Cellular damage"
            ],
            regulatoryStatus: {
              EU: "Restricted (max 6%)",
              Canada: "Restricted",
              US: "FDA approved up to 6%",
              Hawaii: "Banned (reef damage)"
            },
            alternatives: ["Zinc oxide", "Titanium dioxide"]
          },
          {
            name: "Methylparaben",
            status: "moderate_risk",
            description: "Preservative with potential health impacts",
            healthConcerns: [
              "Potential endocrine disruption",
              "Weak estrogenic activity"
            ],
            regulatoryStatus: {
              EU: "Restricted in certain products",
              Canada: "Allowed with restrictions",
              US: "Generally recognized as safe"
            },
            alternatives: ["Natural preservatives", "Phenoxyethanol"]
          }
        ],
        saferAlternatives: {
          products: [
            "Mineral-based sunscreens",
            "Natural preservative formulations"
          ],
          ingredients: [
            "Zinc oxide (physical UV blocker)",
            "Natural preservatives"
          ]
        }
      };
      setAnalysis(newAnalysis);
      setHistory(prevHistory => [...prevHistory, { ...newAnalysis, images }]);
    }, 1000);
  };

  const getStatusIcon = (status) => {
    switch(status) {
      case 'safe': return <CheckCircle className="inline w-4 h-4 mr-1 text-green-600" />;
      case 'moderate_risk': return <AlertCircle className="inline w-4 h-4 mr-1 text-yellow-600" />;
      case 'high_risk': return <ShieldAlert className="inline w-4 h-4 mr-1 text-red-600" />;
      default: return <Info className="inline w-4 h-4 mr-1 text-blue-600" />;
    }
  };

  return (
    <div className="max-w-4xl mx-auto mt-10 p-6 bg-white rounded-lg shadow-xl">
      <h2 className="text-2xl font-bold mb-4">Chemical Safety Analysis</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Analysis Section */}
        <div>
          {/* Upload Section */}
          <div className="mb-4">
            <label htmlFor="image-upload" className="flex items-center justify-center w-full h-32 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:bg-gray-50">
              <div className="text-center">
                <Camera className="mx-auto h-12 w-12 text-gray-400" />
                <span className="mt-2 block text-sm font-semibold text-gray-900">
                  Upload product images
                </span>
              </div>
            </label>
            <input id="image-upload" type="file" className="hidden" onChange={handleImageUpload} accept="image/*" multiple />
          </div>

          {/* Image Preview */}
          {images.length > 0 && (
            <div className="grid grid-cols-2 gap-2 mb-4">
              {images.map((image, index) => (
                <div key={index} className="relative">
                  <img src={image} alt={`Product ${index + 1}`} className="w-full h-32 object-cover rounded" />
                  <button
                    onClick={() => removeImage(index)}
                    className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1"
                  >
                    <X size={16} />
                  </button>
                </div>
              ))}
            </div>
          )}

          {/* Analyze Button */}
          {images.length > 0 && !analysis && (
            <button 
              onClick={simulateAnalysis}
              className="w-full py-2 px-4 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 mb-4"
            >
              Analyze Product Safety
            </button>
          )}

          {/* Analysis Results */}
          {analysis && (
            <div className="mt-6">
              <h3 className="text-xl font-semibold mb-2">{analysis.productName}</h3>
              <p className="text-md font-medium mb-4">Type: {analysis.productType}</p>
              
              {/* Safety Score */}
              <div className={`p-4 rounded-lg mb-4 ${
                analysis.overallSafetyScore > 80 ? 'bg-green-100' :
                analysis.overallSafetyScore > 60 ? 'bg-yellow-100' : 'bg-red-100'
              }`}>
                <h4 className="font-semibold">Safety Score: {analysis.overallSafetyScore}%</h4>
                <p className="text-sm mt-1">
                  {analysis.overallSafetyScore > 80 ? 'This product contains relatively safe ingredients.' :
                   analysis.overallSafetyScore > 60 ? 'This product contains some ingredients of concern.' :
                   'This product contains multiple ingredients of high concern.'}
                </p>
              </div>

              {/* Ingredients Analysis */}
              <div className="space-y-4 mb-6">
                <h4 className="font-medium">Ingredient Analysis:</h4>
                {analysis.ingredients.map((ingredient, index) => (
                  <div key={index} className="border rounded-lg p-4">
                    <div className="flex items-start justify-between">
                      <div>
                        <span className="font-medium flex items-center">
                          {getStatusIcon(ingredient.status)}
                          {ingredient.name}
                        </span>
                        <p className="text-sm text-gray-600 mt-1">{ingredient.description}</p>
                      </div>
                    </div>
                    
                    {/* Health Concerns */}
                    <div className="mt-3">
                      <h5 className="text-sm font-medium text-red-600">Health Concerns:</h5>
                      <ul className="list-disc list-inside text-sm text-gray-600">
                        {ingredient.healthConcerns.map((concern, i) => (
                          <li key={i}>{concern}</li>
                        ))}
                      </ul>
                    </div>

                    {/* Regulatory Status */}
                    <div className="mt-3">
                      <h5 className="text-sm font-medium flex items-center">
                        <Globe2 className="w-4 h-4 mr-1" />
                        International Regulations:
                      </h5>
                      <ul className="text-sm text-gray-600">
                        {Object.entries(ingredient.regulatoryStatus).map(([region, status]) => (
                          <li key={region} className="flex items-start space-x-2">
                            <span className="font-medium">{region}:</span>
                            <span>{status}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                ))}
              </div>

              {/* Safer Alternatives */}
              <div className="bg-green-50 p-4 rounded-lg mb-6">
                <h4 className="font-medium mb-2">Safer Alternatives:</h4>
                <div className="space-y-2">
                  <div>
                    <h5 className="text-sm font-medium">Alternative Products:</h5>
                    <ul className="list-disc list-inside text-sm text-gray-600">
                      {analysis.saferAlternatives.products.map((alt, index) => (
                        <li key={index}>{alt}</li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h5 className="text-sm font-medium">Alternative Ingredients:</h5>
                    <ul className="list-disc list-inside text-sm text-gray-600">
                      {analysis.saferAlternatives.ingredients.map((alt, index) => (
                        <li key={index}>{alt}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* History Section */}
        <div>
          <h3 className="text-xl font-semibold mb-4">Analysis History</h3>
          {history.length === 0 ? (
            <p>No items analyzed yet.</p>
          ) : (
            <ul className="space-y-4">
              {history.map((item, index) => (
                <li key={index} className="border p-4 rounded-lg">
                  <h4 className="font-medium">{item.productName}</h4>
                  <p className="text-sm text-gray-600 mb-2">Type: {item.productType}</p>
                  <p className={`${
                    item.overallSafetyScore > 80 ? 'text-green-600' :
                    item.overallSafetyScore > 60 ? 'text-yellow-600' : 'text-red-600'
                  }`}>
                    Safety Score: {item.overallSafetyScore}%
                  </p>
                  <div className="mt-2 flex space-x-2">
                    {item.images.slice(0, 3).map((image, imgIndex) => (
                      <img key={imgIndex} src={image} alt={`Product ${index + 1} thumbnail`} className="w-16 h-16 object-cover rounded" />
                    ))}
                    {item.images.length > 3 && (
                      <div className="w-16 h-16 bg-gray-200 rounded flex items-center justify-center">
                        <span className="text-gray-600">+{item.images.length - 3}</span>
                      </div>
                    )}
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductSafetyAnalysis;
