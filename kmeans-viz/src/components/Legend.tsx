import React from 'react';

interface LegendProps {
  k: number;
}

const colors = [
  '#e6194b',
  '#3cb44b',
  '#0082c8',
  '#f58231',
  '#911eb4',
  '#46f0f0',
  '#f032e6',
  '#d2f53c',
  '#fabebe',
  '#008080',
];

const Legend: React.FC<LegendProps> = ({ k }) => {
  return (
    <div className="flex justify-center mt-4 flex-wrap">
      {Array.from({ length: k }).map((_, index) => (
        <div key={index} className="flex items-center mr-4 mb-2">
          <div
            className="w-4 h-4 mr-1 rounded"
            style={{ backgroundColor: colors[index % colors.length], border: '1px solid black' }}
          ></div>
          <span className="text-gray-700">Cluster {index + 1}</span>
        </div>
      ))}
    </div>
  );
};

export default Legend;