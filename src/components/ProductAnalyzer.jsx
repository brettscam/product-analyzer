import React, { useState } from 'react';
import { Camera, AlertCircle, CheckCircle, Baby } from 'lucide-react';

const ProductAnalyzer = () => {
  const [image, setImage] = useState(null);
  const [analysis, setAnalysis] = useState(null);

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
    setTimeout(() => {
      setAnalysis({
        productType: "Food",
        category: "Snacks",
        productName: "Example Product",
        healthScore: 75,
        ingredients: [
          {
            name: "Natural Ingredients",
            status: "safe",
            pregnancySafe: true,
            description: "Basic food components"
          },
          {
            name: "Artificial Flavors",
            status: "caution",
            pregnancySafe: false,
            description: "Synthetic additives"
          }
        ],
        pregnancyWarnings: [
          "Contains artificial additives",
          "Moderate sodium content"
        ]
      });
    }, 1500);
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-xl">
      <div className="mb-6">
        <label className="block text-lg font-medium text-gray-700 mb-2">
          Analyze Product Safety
        </label>
        <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-lg">
