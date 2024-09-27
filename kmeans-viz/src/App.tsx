// src/App.tsx
import React, { useState, useEffect } from 'react';
import { Point, Centroid } from './types';
import { KMeans, InitializationMethod } from './kmeans';
import ControlPanel from './components/ControlPanel';
import Visualization from './components/Visualization';
import Legend from './components/Legend';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const App: React.FC = () => {
  const [points, setPoints] = useState<Point[]>(generateRandomPoints(200));
  const [kmeans, setKMeans] = useState<KMeans | null>(null);
  const [initializationMethod, setInitializationMethod] = useState<InitializationMethod>(InitializationMethod.Random);
  const [k, setK] = useState<number>(3);
  const [manualCentroids, setManualCentroids] = useState<Centroid[]>([]);
  const [iteration, setIteration] = useState(0);

  // Reinitialize KMeans when k or initializationMethod changes
  useEffect(() => {
    if (initializationMethod === InitializationMethod.Manual) {
      setK(0);
      setManualCentroids([]);
      setKMeans(null);
    } else {
      const km = new KMeans(k, points, initializationMethod);
      km.initializeCentroids();
      setKMeans(km);
      setIteration(0);
    }
  }, [k, initializationMethod]);

  const handleNewDataset = () => {
    setPoints(generateRandomPoints(200));
    setKMeans(null);
    setIteration(0);
    toast.info('New dataset generated.');
  };

  const handleStep = () => {
    if (kmeans) {
      const converged = kmeans.iterate();
      setIteration(prev => prev + 1);
      if (converged) {
        toast.success('KMeans has converged!');
      }
      setKMeans({ ...kmeans });
    }
  };

  const handleConverge = () => {
    if (kmeans) {
      let converged = false;
      for (let i = 0; i < 100; i++) {
        converged = kmeans.iterate();
        if (converged) {
          toast.success('KMeans has converged!');
          break;
        }
      }
      if (!converged) {
        toast.info('Maximum iterations reached without convergence.');
      }
      setIteration(prev => prev + 1);
      setKMeans({ ...kmeans });
    }
  };

  const handleReset = () => {
    setKMeans(null);
    setManualCentroids([]);
    setIteration(0);
    setPoints(points.map(point => ({ x: point.x, y: point.y }))); // Reset clusters
    toast.info('Algorithm reset.');
  };

  const handleCentroidAdd = (centroid: Centroid) => {
    const newCentroids = [...manualCentroids, centroid];
    setManualCentroids(newCentroids);
    setK(newCentroids.length);

    const km = new KMeans(newCentroids.length, points, InitializationMethod.Manual);
    km['centroids'] = newCentroids.slice(0, newCentroids.length);
    setKMeans(km);
    setIteration(0);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 to-purple-200 p-4">
      <div className="container mx-auto">
        <h1 className="text-4xl font-bold text-center mb-6 text-gray-800">KMeans Clustering Visualization</h1>
        <ControlPanel
          initializationMethod={initializationMethod}
          setInitializationMethod={setInitializationMethod}
          onNewDataset={handleNewDataset}
          onStep={handleStep}
          onConverge={handleConverge}
          onReset={handleReset}
          k={k}
          setK={setK}
          manualCentroids={manualCentroids}
        />
        <div className="text-center mb-4">
          <p className="text-lg font-semibold">Iteration: {iteration}</p>
        </div>
        <Visualization
          points={points}
          centroids={kmeans?.getCentroids() || manualCentroids}
          onCentroidAdd={handleCentroidAdd}
          initializationMethod={initializationMethod}
        />
        {kmeans && <Legend k={k} />}
        <ToastContainer position="top-right" autoClose={3000} hideProgressBar={false} />
      </div>
    </div>
  );
};

function generateRandomPoints(numPoints: number): Point[] {
  const points: Point[] = [];
  for (let i = 0; i < numPoints; i++) {
    points.push({
      x: Math.random(),
      y: Math.random(),
    });
  }
  return points;
}

export default App;
