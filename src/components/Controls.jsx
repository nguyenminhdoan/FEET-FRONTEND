import React, { useState, useEffect } from 'react';
import { getSubsystems } from '../services/api';

const Controls = ({ onPredict, loading }) => {
  const [subsystems, setSubsystems] = useState([]);
  const [subsystem, setSubsystem] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [age, setAge] = useState('66');
  const [mileage, setMileage] = useState('220000');
  const [make, setMake] = useState('New Flyer');
  const [model, setModel] = useState('Xcelsior NG');

  useEffect(() => {
    // Set default dates (today to 1 year from now)
    const today = new Date();
    const nextYear = new Date();
    nextYear.setFullYear(nextYear.getFullYear() + 1);

    const formatDate = (date) => date.toISOString().split('T')[0];

    setStartDate(formatDate(today));
    setEndDate(formatDate(nextYear));

    // Fetch subsystems
    loadSubsystems();
  }, []);

  const loadSubsystems = async () => {
    try {
      const data = await getSubsystems();
      setSubsystems(data);
    } catch (error) {
      console.error('Failed to load subsystems:', error);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onPredict(subsystem, startDate, endDate, age, mileage, make, model);
  };

  return (
    <div className="controls">
      <form onSubmit={handleSubmit}>
        {/* Subsystem Selection */}
        <div className="form-section">
          <div className="section-title">Subsystem</div>
          <div className="form-group">
            <label htmlFor="subsystem">Select Subsystem:</label>
            <select
              id="subsystem"
              value={subsystem}
              onChange={(e) => setSubsystem(e.target.value)}
              required
            >
              <option value="">-- Choose a subsystem --</option>
              {subsystems.map((sub) => (
                <option key={sub.id} value={sub.id}>
                  {sub.name}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Bus Information */}
        <div className="form-section">
          <div className="section-title">Bus Information</div>
          <div className="input-grid">
            <div className="form-group">
              <label htmlFor="make">Make:</label>
              <select
                id="make"
                value={make}
                onChange={(e) => setMake(e.target.value)}
                required
              >
                <option value="New Flyer">New Flyer</option>
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="model">Model:</label>
              <select
                id="model"
                value={model}
                onChange={(e) => setModel(e.target.value)}
                required
              >
                <option value="Xcelsior NG">Xcelsior NG</option>
              </select>
            </div>
          </div>

          <div className="input-grid">
            <div className="form-group">
              <label htmlFor="age">Age (months):</label>
              <input
                type="number"
                id="age"
                value={age}
                onChange={(e) => setAge(e.target.value)}
                placeholder="e.g., 66"
                min="0"
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="mileage">Mileage (km):</label>
              <input
                type="number"
                id="mileage"
                value={mileage}
                onChange={(e) => setMileage(e.target.value)}
                placeholder="e.g., 220000"
                min="0"
                required
              />
            </div>
          </div>
        </div>

        {/* Prediction Period */}
        <div className="form-section">
          <div className="section-title">Prediction Period</div>
          <div className="input-grid">
            <div className="form-group">
              <label htmlFor="startDate">Start Date:</label>
              <input
                type="date"
                id="startDate"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="endDate">End Date:</label>
              <input
                type="date"
                id="endDate"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                required
              />
            </div>
          </div>
        </div>

        <button type="submit" disabled={loading}>
          📊 Generate Cost Curve
        </button>
      </form>
    </div>
  );
};

export default Controls;
