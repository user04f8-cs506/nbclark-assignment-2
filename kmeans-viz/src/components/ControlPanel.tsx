import React from 'react';
import { InitializationMethod } from '../kmeans';

interface ControlPanelProps {
  initializationMethod: InitializationMethod;
  setInitializationMethod: (method: InitializationMethod) => void;
  onNewDataset: () => void;
  onInitialize: () => void;
  onStep: () => void;
  onConverge: () => void;
  onReset: () => void;
  k: number;
  setK: (k: number) => void;
}

const ControlPanel: React.FC<ControlPanelProps> = ({
  initializationMethod,
  setInitializationMethod,
  onNewDataset,
  onInitialize,
  onStep,
  onConverge,
  onReset,
  k,
  setK,
}) => {
  return (
    <div className="flex flex-col items-center mb-4">
      <div className="flex items-center space-x-4 mb-4">
        <label htmlFor="k" className="font-semibold">Number of Clusters (k):</label>
        <input
          type="number"
          id="k"
          value={k}
          onChange={e => setK(Number(e.target.value))}
          className="border rounded px-2 py-1 w-16"
          min={1}
        />
      </div>
      <div className="flex items-center space-x-4 mb-4">
        <label htmlFor="initMethod" className="font-semibold">Initialization Method:</label>
        <select
          id="initMethod"
          value={initializationMethod}
          onChange={e => setInitializationMethod(e.target.value as InitializationMethod)}
          className="border rounded px-2 py-1"
        >
          {Object.values(InitializationMethod).map(method => (
            <option key={method} value={method}>{method}</option>
          ))}
        </select>
      </div>
      <div className="flex space-x-4">
        <button
          onClick={onNewDataset}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          New Dataset
        </button>
        <button
          onClick={onInitialize}
          className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
        >
          Initialize
        </button>
        <button
          onClick={onStep}
          className="bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600"
        >
          Step
        </button>
        <button
          onClick={onConverge}
          className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
        >
          Converge
        </button>
        <button
          onClick={onReset}
          className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
        >
          Reset
        </button>
      </div>
    </div>
  );
};

export default ControlPanel;
