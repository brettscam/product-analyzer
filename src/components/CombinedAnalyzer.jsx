import React, { useState } from 'react';
import { Camera, ArrowRight } from 'lucide-react';
import ProductTypeSelector from './ProductTypeSelector';
import ProductSafetyAnalysis from './ProductSafetyAnalysis';
import FoodAnalyzer from './FoodAnalyzer';
import PregnancySafeAnalyzer from './PregnancySafeAnalyzer';

const CombinedAnalyzer = () => {
  const [selectedType, setSelectedType] = useState('product');
  const [productTitle, setProductTitle] = useState('');
  const [images, setImages] = useState([]);
  const [history, setHistory] = useState({
    product: [],
    food: [],
    pregnancy: []
  });

  const handleImageUpload = (event) => {
    const files = Array.from(event.target.files);
    const newImages = files.map(file => URL.createObjectURL(file));
    setImages(prevImages => [...prevImages, ...newImages]);
  };

  const resetAnalysis = () => {
    setImages([]);
    setProductTitle('');
  };

  const addToHistory = (analysis) => {
    setHistory(prev => ({
      ...prev,
      [selectedType]: [...prev[selectedType], {
        ...analysis,
        productTitle,
        imagePreview: images[0],
        timestamp: new Date().toISOString()
      }]
    }));
  };

  return (
    <div className="container mx-auto p-4">
      {/* Type Selector */}
      <ProductTypeSelector 
        selectedType={selectedType} 
        onTypeSelect={setSelectedType} 
      />

      {/* Common Input Section */}
      <div className="mb-6 max-w-2xl mx-auto">
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Product Name
          </label>
          <input
            type="text"
            value={productTitle}
            onChange={(e) => setProductTitle(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-lg"
            placeholder="Enter product name"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="image-upload" className="flex items-center justify-center w-full h-32 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:bg-gray-50">
            <div className="text-center">
              <Camera className="mx-auto h-12 w-12 text-gray-400" />
              <span className="mt-2 block text-sm font-semibold text-gray-900">
                Upload product images
              </span>
            </div>
          </label>
          <input 
            id="image-upload" 
            type="file" 
            className="hidden" 
            onChange={handleImageUpload} 
            accept="image/*" 
            multiple 
          />
        </div>

        {images.length > 0 && (
          <div className="grid grid-cols-3 gap-2 mb-4">
            {images.map((image, index) => (
              <div key={index} className="relative">
                <img 
                  src={image} 
                  alt={`Upload ${index + 1}`} 
                  className="w-full h-32 object-cover rounded-lg"
                />
                <button
                  onClick={() => setImages(prev => prev.filter((_, i) => i !== index))}
                  className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1"
                >
                  ×
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Analyzer Components */}
      {selectedType === 'product' && (
        <ProductSafetyAnalysis
          productTitle={productTitle}
          images={images}
          history={history.product}
          onAnalysisComplete={(analysis) => {
            addToHistory(analysis);
            resetAnalysis();
          }}
        />
      )}
      
      {selectedType === 'food' && (
        <FoodAnalyzer
          productTitle={productTitle}
          images={images}
          history={history.food}
          onAnalysisComplete={(analysis) => {
            addToHistory(analysis);
            resetAnalysis();
          }}
        />
      )}
      
      {selectedType === 'pregnancy' && (
        <PregnancySafeAnalyzer
          productTitle={productTitle}
          images={images}
          history={history.pregnancy}
          onAnalysisComplete={(analysis) => {
            addToHistory(analysis);
            resetAnalysis();
          }}
        />
      )}

      {/* Global History Section */}
      <div className="mt-8">
        <h3 className="text-xl font-semibold mb-4">Recent Analyses</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {history[selectedType].map((item, index) => (
            <div key={index} className="border rounded-lg p-4 shadow-sm">
              <div className="flex items-start space-x-4">
                {item.imagePreview && (
                  <img 
                    src={item.imagePreview}
                    alt={item.productTitle}
                    className="w-24 h-24 object-cover rounded-lg"
                  />
                )}
                <div>
                  <h4 className="font-medium">{item.productTitle}</h4>
                  <p className="text-sm text-gray-600">
                    {new Date(item.timestamp).toLocaleDateString()}
                  </p>
                  {item.safetyScore && (
                    <p className={`text-sm ${
                      item.safetyScore > 80 ? 'text-green-600' :
                      item.safetyScore > 60 ? 'text-yellow-600' : 'text-red-600'
                    }`}>
                      Safety: {item.safetyScore}%
                    </p>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CombinedAnalyzer;
