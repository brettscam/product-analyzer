import React, { useState } from 'react';
import { Camera, Info, Globe2, AlertCircle, CheckCircle } from 'lucide-react';
import ProductTypeSelector from './ProductTypeSelector';

const CombinedAnalyzer = () => {
  const [selectedType, setSelectedType] = useState('chemical');
  const [productTitle, setProductTitle] = useState('');
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

  const getScoreMethodology = (type) => {
    const methodologies = {
      chemical: "Score based on ingredient safety data from EWG's Skin Deep® database and global regulatory databases. Analyzes presence of harmful chemicals, carcinogens, allergens, and endocrine disruptors.",
      food: "Score derived from FDA food safety guidelines, allergen presence, and processing safety standards.",
      pregnancy: "Score based on FDA pregnancy categories, clinical studies, and recommendations from major obstetric organizations."
    };
    return methodologies[type];
  };

  const getSources = (type) => {
    const sources = {
      chemical: [
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

  const getIngredientsByType = (type) => {
    const ingredients = {
      chemical: [
        {
          name: "Oxybenzone",
          status: "high_risk",
          description: "UV filter linked to hormone disruption",
          tags: ["UV Filter", "Endocrine Disruptor"],
          healthConcerns: [
            "Hormone system disruption",
            "Allergic skin reactions",
            "Cellular damage from oxidation",
            "Environmental toxicity (coral reef damage)"
          ],
          regulations: {
            EU: "Restricted (max 6%)",
            US: "FDA approved up to 6%",
            Canada: "Restricted in certain products",
            Hawaii: "Banned (reef damage)"
          }
        },
        {
          name: "Methylparaben",
          status: "moderate_risk",
          description: "Preservative with potential endocrine effects",
          tags: ["Preservative", "Paraben"],
          healthConcerns: [
            "Potential endocrine disruption",
            "Weak estrogenic activity",
            "Linked to breast cancer concerns"
          ],
          regulations: {
            EU: "Restricted in certain products",
            US: "Generally recognized as safe",
            Canada: "Allowed with restrictions"
          }
        },
        {
          name: "Avobenzone",
          status: "moderate_risk",
          description: "Chemical UV filter, unstable in sunlight",
          tags: ["UV Filter", "Synthetic"],
          healthConcerns: [
            "High rate of skin allergies",
            "Photostability concerns",
            "Enhanced skin absorption of other chemicals"
          ],
          regulations: {
            EU: "Approved with restrictions",
            US: "FDA approved up to 3%",
            Canada: "Approved with limits"
          }
        }
      ],
      food: [
        {
          name: "High Fructose Corn Syrup",
          status: "high_risk",
          description: "Artificial sweetener linked to health issues",
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
        }
      ],
      pregnancy: [
        {
          name: "Retinol (Vitamin A)",
          status: "high_risk",
          description: "Can cause birth defects if used during pregnancy",
          tags: ["Vitamin", "Anti-aging"],
          healthConcerns: [
            "Birth defects",
            "Developmental issues",
            "Fetal malformation"
          ],
          regulations: {
            EU: "Warning required for pregnant women",
            US: "Warning required",
            Canada: "Warning required"
          }
        }
      ]
    };
    return ingredients[type] || [];
  };
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
      ingredients: getIngredientsByType(selectedType),
      recommendations: selectedType === 'chemical' ? [
        "Consider mineral-based alternatives with zinc oxide or titanium dioxide",
        "Look for paraben-free and fragrance-free formulations",
        "Check for products with natural preservatives",
        "Avoid products with oxybenzone, especially in marine environments"
      ] : selectedType === 'food' ? [
        "Choose products without artificial sweeteners",
        "Look for natural alternatives",
        "Check for whole food ingredients"
      ] : [
        "Avoid retinoids during pregnancy",
        "Choose fragrance-free products",
        "Look for pregnancy-safe alternatives"
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
              <input 
                type="file" 
                className="hidden" 
                onChange={handleImageUpload} 
                accept="image/*" 
                multiple 
              />
            </label>

            {images.length > 0 && (
              <div className="grid grid-cols-3 gap-2">
                {images.map((image, index) => (
                  <div key={index} className="relative">
                    <img src={image} alt="" className="w-full h-24 object-cover rounded" />
                    <button 
                      onClick={() => removeImage(index)}
                      className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1"
                    >
                      ×
                    </button>
                  </div>
                ))}
              </div>
            )}

            <button
              onClick={simulateAnalysis}
              className="w-full mt-4 py-2 px-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              disabled={!productTitle.trim() || images.length === 0}
            >
              Analyze Product
            </button>
          </div>

          {/* Analysis Results */}
          {analysis && (
            <div className="bg-white rounded-lg shadow p-6">
              <div className="mb-4 pb-4 border-b">
                <div className="flex items-start">
                  {images[0] && (
                    <img 
                      src={images[0]} 
                      alt={analysis.productName} 
                      className="w-24 h-24 object-cover rounded-lg mr-4"
                    />
                  )}
                  <div>
                    <h3 className="text-xl font-semibold">{analysis.productName}</h3>
                    <div className="flex items-center mt-2">
                      <div className={`text-2xl font-bold ${
                        analysis.safetyScore > 80 ? 'text-green-600' :
                        analysis.safetyScore > 60 ? 'text-yellow-600' : 'text-red-600'
                      }`}>
                        {analysis.safetyScore}%
                      </div>
                      <div className="ml-2 text-sm text-gray-600">Safety Score</div>
                    </div>
                    <div className="mt-2 text-sm text-gray-500">{analysis.methodology}</div>
                  </div>
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
                    <p>Key Concerns: {item.ingredients[0].healthConcerns.join(", ")}</p>
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
