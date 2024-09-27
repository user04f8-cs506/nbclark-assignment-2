import React, { useState } from 'react';
import { Point, Centroid } from '../types';
import { InitializationMethod } from '../kmeans';

interface VisualizationProps {
  points: Point[];
  centroids: Centroid[];
  onCentroidAdd?: (centroid: Centroid) => void;
  initializationMethod: InitializationMethod;
}

const colors = [
  'red',
  'green',
  'blue',
  'orange',
  'purple',
  'cyan',
  'magenta',
  'yellow',
  'lime',
  'pink',
];

const Visualization: React.FC<VisualizationProps> = ({ 
  points,
  centroids,
  onCentroidAdd,
  initializationMethod,
 }) => {
  const width = 600;
  const height = 600;
  const padding = 40;

  const handleClick = (event: React.MouseEvent<SVGSVGElement, MouseEvent>) => {
    if (initializationMethod !== InitializationMethod.Manual || !onCentroidAdd) return;

    const rect = (event.target as SVGSVGElement).getBoundingClientRect();
    const x = (event.clientX - rect.left - padding) / (width - 2 * padding);
    const y = (event.clientY - rect.top - padding) / (height - 2 * padding);

    onCentroidAdd({ x, y });
  };

  return (
    <svg width={width} height={height} className="border border-gray-400" onClick={handleClick}> 
      {/* Data Points */}
      {points.map((point, index) => (
        <circle
          key={index}
          cx={padding + point.x * (width - 2 * padding)}
          cy={padding + point.y * (height - 2 * padding)}
          r={4}
          fill={point.cluster !== undefined ? colors[point.cluster % colors.length] : 'gray'}
        />
      ))}

      {/* Centroids */}
      {centroids.map((centroid, index) => (
        <circle
          key={index}
          cx={padding + centroid.x * (width - 2 * padding)}
          cy={padding + centroid.y * (height - 2 * padding)}
          r={8}
          fill={colors[index % colors.length]}
          stroke="black"
          strokeWidth={2}
        />
      ))}
    </svg>
  );
};

export default Visualization;
