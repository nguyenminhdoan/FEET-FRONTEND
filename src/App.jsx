import React, { useState } from 'react';
import Header from './components/Header';
import Controls from './components/Controls';
import Loading from './components/Loading';
import ErrorMessage from './components/ErrorMessage';
import Results from './components/Results';
import { predictCosts } from './services/api';
import './styles/App.css';

function App() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [results, setResults] = useState(null);
  const [showResults, setShowResults] = useState(false);

  const handlePredict = async (subsystem, startDate, endDate, age, mileage, make, model) => {
    // Validation
    if (!subsystem) {
      setError('Please select a subsystem');
      return;
    }

    if (!startDate || !endDate) {
      setError('Please select both start and end dates');
      return;
    }

    if (new Date(startDate) >= new Date(endDate)) {
      setError('End date must be after start date');
      return;
    }

    if (!age || parseInt(age) < 0) {
      setError('Please enter a valid bus age');
      return;
    }

    if (!mileage || parseInt(mileage) < 0) {
      setError('Please enter a valid mileage');
      return;
    }

    // Clear previous results and errors
    setError(null);
    setShowResults(false);
    setLoading(true);

    try {
      const data = await predictCosts(subsystem, startDate, endDate, age, mileage, make, model);
      setResults(data);
      setShowResults(true);
    } catch (err) {
      const errorMessage =
        err.response?.data?.detail ||
        err.message ||
        'Failed to generate predictions';
      setError(errorMessage);
      setShowResults(false);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container">
      <Header />
      <Controls onPredict={handlePredict} loading={loading} />
      {loading && <Loading />}
      {error && <ErrorMessage message={error} />}
      <Results data={results} show={showResults} />
    </div>
  );
}

export default App;
