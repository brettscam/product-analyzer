import React from 'react';

const ProductTypeSelector = ({ onTypeSelect, selectedType }) => {
  return (
    <div className="mb-6">
      <h3 className="text-lg font-medium mb-3">Select Analysis Type:</h3>
      <div className="flex space-x-4">
        <button
          onClick={() => onTypeSelect('plastic')}
          className={`px-4 py-2 rounded-lg ${
            selectedType === 'plastic' 
              ? 'bg-blue-500 text-white' 
              : 'bg-gray-200 hover:bg-gray-300'
          }`}
        >
          Plastic Safety
        </button>
        <button
          onClick={() => onTypeSelect('ingredients')}
          className={`px-4 py-2 rounded-lg ${
            selectedType === 'ingredients' 
              ? 'bg-blue-500 text-white' 
              : 'bg-gray-200 hover:bg-gray-300'
          }`}
        >
          Ingredient Health
        </button>
        <button
          onClick={() => onTypeSelect('pregnancy')}
          className={`px-4 py-2 rounded-lg ${
            selectedType === 'pregnancy' 
              ? 'bg-blue-500 text-white' 
              : 'bg-gray-200 hover:bg-gray-300'
          }`}
        >
          Pregnancy Safety
        </button>
      </div>
    </div>
  );
};

export default ProductTypeSelector;
