import React, { useState } from 'react';
import { Camera, AlertCircle, CheckCircle, Info, X, Recycle, Droplet } from 'lucide-react';

const PlasticProductAnalysis = () => {
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
        productName: `Plastic Item ${history.length + 1}`,
        productType: "Food Packaging",
        plasticType: {
          name: "Polyethylene Terephthalate (PET)",
          recyclingCode: 1,
          description: "Commonly used for beverage bottles and food containers."
        },
        characteristics: [
          { name: "Recyclability", status: "good", description: "Widely accepted in recycling programs" },
          { name: "Durability", status: "medium", description: "Single-use, but can be repurposed" },
          { name: "Chemical Leaching", status: "low", description: "Low risk of chemical leaching under normal conditions" },
          { name: "Microplastic Shedding", status: "caution", description: "Can shed microplastics when exposed to heat or wear" }
        ],
        environmentalImpact: {
          productionEnergy: "Moderate energy required for production",
          degradationTime: "450 years to decompose in nature",
          oceanImpact: "Can break down into microplastics in marine environments"
        },
        overallSustainabilityScore: Math.floor(Math.random() * 40) + 60,
        regionalAnalysis: {
          US: "Recyclable in most curbside programs",
          EU: "Subject to single-use plastic regulations in some countries",
          Canada: "Included in most municipal recycling programs"
        },
        imageCount: images.length
      };
      setAnalysis(newAnalysis);
      setHistory(prevHistory => [...prevHistory, { ...newAnalysis, images }]);
    }, 1000);
  };

  const resetForNextItem = () => {
    setImages([]);
    setAnalysis(null);
  };

  const getStatusIcon = (status) => {
    switch(status) {
      case 'good': return <CheckCircle className="inline w-4 h-4 mr-1 text-green-600" />;
      case 'medium': return <AlertCircle className="inline w-4 h-4 mr-1 text-yellow-600" />;
      case 'low': return <AlertCircle className="inline w-4 h-4 mr-1 text-red-600" />;
      case 'caution': return <AlertCircle className="inline w-4 h-4 mr-1 text-orange-600" />;
      default: return <Info className="inline w-4 h-4 mr-1 text-blue-600" />;
    }
  };

  return (
    <div className="max-w-4xl mx-auto mt-10 p-6 bg-white rounded-lg shadow-xl">
      <h2 className="text-2xl font-bold mb-4">Plastic Product Environmental Analysis</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <div className="mb-4">
            <label htmlFor="image-upload" className="flex items-center justify-center w-full h-32 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:bg-gray-50">
              <div className="text-center">
                <Camera className="mx-auto h-12 w-12 text-gray-400" />
                <span className="mt-2 block text-sm font-semibold text-gray-900">
                  Upload photos of the plastic product
                </span>
              </div>
            </label>
            <input id="image-upload" type="file" className="hidden" onChange={handleImageUpload} accept="image/*" multiple />
          </div>

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

          {images.length > 0 && !analysis && (
            <button 
              onClick={simulateAnalysis} 
              className="w-full mb-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
              Analyze Plastic Product
            </button>
          )}

          {analysis && (
            <div className="mt-6">
              <h3 className="text-xl font-semibold mb-2">{analysis.productName}</h3>
              <p className="text-md font-medium mb-4">Product Type: {analysis.productType}</p>
              
              <div className="mb-4">
                <h4 className="font-medium">Plastic Type:</h4>
                <p className="flex items-center">
                  <Recycle className="w-5 h-5 mr-2 text-blue-500" />
                  <span className="font-semibold">{analysis.plasticType.name}</span>
                  <span className="ml-2 px-2 py-1 bg-blue-100 text-blue-800 text-xs font-semibold rounded-full">
                    Recycling Code: {analysis.plasticType.recyclingCode}
                  </span>
                </p>
                <p className="mt-1 text-sm text-gray-600">{analysis.plasticType.description}</p>
              </div>

              <div className="mb-4">
                <h4 className="font-medium mb-2">Characteristics:</h4>
                <ul className="space-y-2">
                  {analysis.characteristics.map(char => (
                    <li key={char.name} className="flex items-start">
                      {getStatusIcon(char.status)}
                      <span>
                        <span className="font-medium">{char.name}:</span> {char.description}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
              
              <div className={`mb-4 p-4 rounded-lg ${
                analysis.overallSustainabilityScore > 80 ? 'bg-green-100' :
                analysis.overallSustainabilityScore > 60 ? 'bg-yellow-100' : 'bg-red-100'
              }`}>
                <h5 className="font-medium">Overall Sustainability Score: {analysis.overallSustainabilityScore}%</h5>
                <p className="text-sm mt-1">
                  {analysis.overallSustainabilityScore > 80 ? 'This plastic product has a relatively low environmental impact.' :
                   analysis.overallSustainabilityScore > 60 ? 'This plastic product has moderate environmental concerns.' :
                   'This plastic product has significant environmental impact and should be used with caution.'}
                </p>
              </div>

              <div className="mb-4">
                <h4 className="font-medium mb-2">Environmental Impact:</h4>
                <ul className="space-y-1 text-sm">
                  {Object.entries(analysis.environmentalImpact).map(([key, value]) => (
                    <li key={key}>
                      <span className="font-medium">{key.replace(/([A-Z])/g, ' $1').trim()}:</span> {value}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mb-4">
                <h4 className="font-medium mb-2">Microplastic Concern:</h4>
                <p className="flex items-center">
                  <Droplet className="w-4 h-4 mr-2 text-blue-500" />
                  {analysis.characteristics.find(c => c.name === "Microplastic Shedding").description}
                </p>
              </div>

              <div>
                <h4 className="font-medium mb-2">Regional Recycling Analysis:</h4>
                {Object.entries(analysis.regionalAnalysis).map(([region, analysis]) => (
                  <p key={region} className="mb-1"><strong>{region}:</strong> {analysis}</p>
                ))}
              </div>

              <button 
                onClick={resetForNextItem} 
                className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
              >
                Analyze Next Item
              </button>
            </div>
          )}
        </div>

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
                  <p className="text-sm">
                    <span className="font-medium">Plastic:</span> {item.plasticType.name}
                  </p>
                  <p className={`${
                    item.overallSustainabilityScore > 80 ? 'text-green-600' :
                    item.overallSustainabilityScore > 60 ? 'text-yellow-600' : 'text-red-600'
                  }`}>
                    Sustainability Score: {item.overallSustainabilityScore}%
                  </p>
                  <p className="text-sm text-gray-600">
                    Recycling Code: {item.plasticType.recyclingCode}
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

export default PlasticProductAnalysis;
