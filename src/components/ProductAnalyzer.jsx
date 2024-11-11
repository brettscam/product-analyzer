import React, { useState } from 'react';
import { Camera, AlertCircle, CheckCircle, Baby, Utensils } from 'lucide-react';

const ProductAnalyzer = ({ mode = 'ingredients' }) => {
  const [image, setImage] = useState(null);
  const [analysis, setAnalysis] = useState(null);
  const [history, setHistory] = useState([]);

  const handleImageUpload = async (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result);
        simulateAnalysis();
      };
      reader.readAsDataURL(file);
    }
  };

  const simulateAnalysis = () => {
    // Different analysis based on mode
    setTimeout(() => {
      if (mode === 'ingredients') {
        setAnalysis({
          productName: "Sample Food Product",
          category: "Processed Food",
          ingredients: [
            {
              name: "High Fructose Corn Syrup",
              status: "warning",
              description: "Artificial sweetener linked to obesity and diabetes",
              concerns: ["Added Sugar", "Processed"]
            },
            {
              name: "Yellow 5",
              status: "danger",
              description: "Artificial color linked to hyperactivity in children",
              concerns: ["Artificial Color", "Allergen Risk"]
            },
            {
              name: "Natural Flavors",
              status: "caution",
              description: "Umbrella term for various flavoring compounds",
              concerns: ["Unknown Components"]
            },
            {
              name: "Whole Grain Wheat",
              status: "safe",
              description: "Natural whole grain ingredient",
              concerns: []
            }
          ],
          nutritionalScore: 65,
          additives: 3,
          artificialIngredients: 2,
          recommendations: [
            "Consider alternatives with natural colorings",
            "Look for products without artificial sweeteners",
            "Check for whole grain alternatives"
          ]
        });
      } else if (mode === 'pregnancy') {
        setAnalysis({
          productName: "Sample Food Product",
          category: "Processed Food",
          pregnancySafety: "Use with Caution",
          ingredients: [
            {
              name: "Caffeine",
              status: "caution",
              description: "Limit intake during pregnancy",
              pregnancyGuideline: "Keep below 200mg per day"
            },
            {
              name: "Artificial Sweeteners",
              status: "warning",
              description: "Some types should be avoided during pregnancy",
              pregnancyGuideline: "Consult healthcare provider"
            },
            {
              name: "Fish Oil",
              status: "good",
              description: "Beneficial for fetal development",
              pregnancyGuideline: "Good source of omega-3"
            }
          ],
          warnings: [
            "Contains ingredients that should be limited during pregnancy",
            "Consult with healthcare provider about artificial sweeteners",
            "Monitor daily caffeine intake"
          ],
          recommendations: [
            "Consider natural alternatives",
            "Track caffeine consumption from all sources",
            "Look for pregnancy-safe alternatives"
          ],
          safetyScore: 70
        });
      }
    }, 1500);
  };

  return (
    <div className="max-w-2xl mx-auto p-6">
      <div className="mb-6">
        <label htmlFor="image-upload" className="flex items-center justify-center w-full h-32 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:bg-gray-50">
          <div className="text-center">
            <Camera className="mx-auto h-12 w-12 text-gray-400" />
            <span className="mt-2 block text-sm font-semibold text-gray-900">
              Upload a photo of the product
            </span>
          </div>
        </label>
        <input id="image-upload" type="file" className="hidden" onChange={handleImageUpload} accept="image/*" />
      </div>

      {analysis && (
        <div className="space-y-6">
          <div>
            <h3 className="text-xl font-semibold">{analysis.productName}</h3>
            <p className="text-gray-600">{analysis.category}</p>
          </div>

          {mode === 'pregnancy' && (
            <div className="bg-purple-50 border-l-4 border-purple-500 p-4">
              <div className="flex items-center">
                <Baby className="h-5 w-5 text-purple-500 mr-2" />
                <span className="font-medium">Pregnancy Safety: {analysis.pregnancySafety}</span>
              </div>
            </div>
          )}

          <div className="space-y-4">
            <h4 className="font-medium">Ingredients Analysis:</h4>
            {analysis.ingredients.map((ingredient, index) => (
              <div
                key={index}
                className={`p-4 rounded-lg ${
                  ingredient.status === 'safe' ? 'bg-green-50' :
                  ingredient.status === 'caution' ? 'bg-yellow-50' :
                  'bg-red-50'
                }`}
              >
                <div className="flex items-start">
                  {ingredient.status === 'safe' ? (
                    <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 mr-2" />
                  ) : (
                    <AlertCircle className="h-5 w-5 text-yellow-500 mt-0.5 mr-2" />
                  )}
                  <div>
                    <h5 className="font-medium">{ingredient.name}</h5>
                    <p className="text-sm text-gray-600">{ingredient.description}</p>
                    {mode === 'pregnancy' && (
                      <p className="text-sm text-purple-600 mt-1">{ingredient.pregnancyGuideline}</p>
                    )}
                    {ingredient.concerns?.length > 0 && (
                      <div className="mt-1 flex flex-wrap gap-1">
                        {ingredient.concerns.map((concern, i) => (
                          <span key={i} className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-gray-100 text-gray-800">
                            {concern}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {analysis.warnings && (
            <div className="space-y-2">
              <h4 className="font-medium">Warnings:</h4>
              <ul className="list-disc pl-5 space-y-1">
                {analysis.warnings.map((warning, index) => (
                  <li key={index} className="text-red-600">{warning}</li>
                ))}
              </ul>
            </div>
          )}

          <div className="space-y-2">
            <h4 className="font-medium">Recommendations:</h4>
            <ul className="list-disc pl-5 space-y-1">
              {analysis.recommendations.map((rec, index) => (
                <li key={index} className="text-gray-600">{rec}</li>
              ))}
            </ul>
          </div>

          <div className={`p-4 rounded-lg ${
            (analysis.nutritionalScore || analysis.safetyScore) > 80 ? 'bg-green-50' :
            (analysis.nutritionalScore || analysis.safetyScore) > 60 ? 'bg-yellow-50' :
            'bg-red-50'
          }`}>
            <h4 className="font-medium">
              {mode === 'ingredients' ? 'Nutritional Score' : 'Safety Score'}: 
              {analysis.nutritionalScore || analysis.safetyScore}%
            </h4>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductAnalyzer;
