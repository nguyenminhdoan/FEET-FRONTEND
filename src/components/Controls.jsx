import React, { useState, useEffect, useRef } from 'react';
import { getSubsystems } from '../services/api';
import BusVisualization from './BusVisualization';

const Controls = ({ onPredict, loading }) => {
  const [subsystems, setSubsystems] = useState([]);
  const [subsystem, setSubsystem] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [showDropdown, setShowDropdown] = useState(false);
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [age, setAge] = useState('66');
  const [mileage, setMileage] = useState('220000');
  const [make, setMake] = useState('New Flyer');
  const [model, setModel] = useState('Xcelsior NG');
  const [year, setYear] = useState('2023');
  const [length, setLength] = useState('40');
  const [propulsion, setPropulsion] = useState('CNG');

  const dropdownRef = useRef(null);

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

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const loadSubsystems = async () => {
    try {
      const data = await getSubsystems();
      setSubsystems(data);
    } catch (error) {
      console.error('Failed to load subsystems:', error);
    }
  };

  // Filter subsystems based on search term
  const filteredSubsystems = subsystems.filter((sub) =>
    sub.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Get the selected subsystem name for display
  const selectedSubsystemName = subsystems.find((sub) => sub.id === subsystem)?.name || '';

  const handleSubsystemSelect = (subId, subName) => {
    setSubsystem(subId);
    setSearchTerm(subName);
    setShowDropdown(false);
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
    setShowDropdown(true);
    setSubsystem(''); // Clear selection when user types
  };

  const handleInputClick = () => {
    setShowDropdown(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!subsystem) {
      alert('Please select a subsystem');
      return;
    }
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
            <div className="searchable-select" ref={dropdownRef}>
              <input
                type="text"
                id="subsystem"
                className="search-input"
                value={searchTerm || selectedSubsystemName}
                onChange={handleSearchChange}
                onClick={handleInputClick}
                onFocus={handleInputClick}
                placeholder="Click to select or type to search subsystems..."
                autoComplete="off"
                required
              />
              {showDropdown && (
                <div className="dropdown-list">
                  {filteredSubsystems.length > 0 ? (
                    <>
                      <div className="dropdown-header">
                        {filteredSubsystems.length} subsystem{filteredSubsystems.length !== 1 ? 's' : ''} found
                      </div>
                      {filteredSubsystems.map((sub) => (
                        <div
                          key={sub.id}
                          className={`dropdown-item ${subsystem === sub.id ? 'selected' : ''} ${sub.reliability === 'unreliable' ? 'unreliable' : sub.reliability === 'limited' ? 'limited' : ''}`}
                          onClick={() => handleSubsystemSelect(sub.id, sub.name)}
                          title={`${sub.reliability === 'unreliable' ? '⚠️ UNRELIABLE' : sub.reliability === 'limited' ? '⚠️ Limited Reliability' : '✓ Reliable'} (${sub.sample_count} samples)`}
                        >
                          <span className="reliability-icon">
                            {sub.reliability === 'unreliable' ? '⚠️' : sub.reliability === 'limited' ? '⚠️' : '✓'}
                          </span>
                          {sub.name}
                          {sub.reliability === 'unreliable' && <span className="unreliable-badge">NOT RELIABLE</span>}
                        </div>
                      ))}
                    </>
                  ) : (
                    <div className="dropdown-item no-results">
                      {searchTerm ? `No subsystems matching "${searchTerm}"` : 'Loading subsystems...'}
                    </div>
                  )}
                </div>
              )}
            </div>
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
