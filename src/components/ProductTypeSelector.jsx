import React from 'react';
import { Beaker, Apple, Baby } from 'lucide-react';

const ProductTypeSelector = ({ selectedType, onTypeSelect }) => {
  const types = [
    { id: 'product', name: 'Chemical Safety', icon: Beaker },
    { id: 'food', name: 'Food Safety', icon: Apple },
    { id: 'pregnancy', name: 'Pregnancy Safe', icon: Baby }
  ];

  return (
    <div className="flex justify-center mb-8">
      <div className="inline-flex rounded-lg border border-gray-200 bg-white p-1">
        {types.map(type => {
          const Icon = type.icon;
          return (
            <button
              key={type.id}
              onClick={() => onTypeSelect(type.id)}
              className={`flex items-center px-4 py-2 rounded-md ${
                selectedType === type.id
                  ? 'bg-blue-100 text-blue-700'
                  : 'hover:bg-gray-50'
              }`}
            >
              <Icon className="w-5 h-5 mr-2" />
              {type.name}
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default ProductTypeSelector;
