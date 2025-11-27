import React, { useState, useEffect } from 'react';
import { getSubsystems } from '../services/api';
import BusVisualization from './BusVisualization';

const Controls = ({ onPredict, loading }) => {
  const [subsystems, setSubsystems] = useState([]);
  const [subsystem, setSubsystem] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [age, setAge] = useState('66');
  const [mileage, setMileage] = useState('220000');
  const [make, setMake] = useState('New Flyer');
  const [model, setModel] = useState('Xcelsior NG');
  const [year, setYear] = useState('2023');
  const [length, setLength] = useState('40');
  const [propulsion, setPropulsion] = useState('CNG');

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
    onPredict(subsystem, startDate, endDate, age, mileage, make, model, year, length, propulsion);
  };

  return (
    <div className="controls">
      <form onSubmit={handleSubmit}>
        {/* Bus Information */}
        <div className="form-section">
          <div className="section-title">Bus Information</div>
          <div className="input-grid">
            <div className="form-group">
              <label htmlFor="make">Manufacturer:</label>
              <select
                id="make"
                value={make}
                onChange={(e) => setMake(e.target.value)}
                required
              >
                <option value="New Flyer">New Flyer</option>
                <option value="Gillig">Gillig</option>
                <option value="Nova Bus">Nova Bus</option>
                <option value="Proterra">Proterra</option>
                <option value="BYD">BYD</option>
                <option value="Alexander Dennis">Alexander Dennis</option>
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
                <option value="Xcelsior">Xcelsior</option>
                <option value="Low Floor">Low Floor</option>
                <option value="LFS">LFS</option>
              </select>
            </div>
          </div>

          <div className="input-grid">
            <div className="form-group">
              <label htmlFor="year">Year:</label>
              <select
                id="year"
                value={year}
                onChange={(e) => setYear(e.target.value)}
                required
              >
                <option value="2024">2024</option>
                <option value="2023">2023</option>
                <option value="2022">2022</option>
                <option value="2021">2021</option>
                <option value="2020">2020</option>
                <option value="2019">2019</option>
                <option value="2018">2018</option>
                <option value="2017">2017</option>
                <option value="2016">2016</option>
                <option value="2015">2015</option>
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="length">Length (ft):</label>
              <select
                id="length"
                value={length}
                onChange={(e) => setLength(e.target.value)}
                required
              >
                <option value="30">30 ft</option>
                <option value="35">35 ft</option>
                <option value="40">40 ft</option>
                <option value="60">60 ft (Articulated)</option>
              </select>
            </div>
          </div>

          <div className="input-grid">
            <div className="form-group">
              <label htmlFor="propulsion">Propulsion:</label>
              <select
                id="propulsion"
                value={propulsion}
                onChange={(e) => setPropulsion(e.target.value)}
                required
              >
                <option value="CNG">CNG (Compressed Natural Gas)</option>
                <option value="Diesel">Diesel</option>
                <option value="Hybrid">Hybrid</option>
                <option value="Electric">Electric (BEB)</option>
                <option value="Hydrogen">Hydrogen Fuel Cell</option>
              </select>
            </div>

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

        {/* Bus Visualization */}
        <BusVisualization
          make={make}
          model={model}
          length={length}
          subsystem={subsystem}
        />

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
