import React from 'react';
import '../styles/BusVisualization.css';

const BusVisualization = ({ make, model, length, subsystem }) => {
  // Map bus specifications to image identifiers
  // You can replace these with actual image paths when you have them
  const getBusImageKey = () => {
    const lengthKey = length === '60' ? 'articulated' : 'standard';
    return `${make.toLowerCase().replace(/\s+/g, '_')}_${lengthKey}`;
  };

  // Define subsystem positions as percentages for responsive overlay
  // These represent approximate locations on a side-view bus diagram
  const subsystemPositions = {
    'HV_Battery': { left: '35%', top: '65%', width: '25%', height: '20%', label: 'HV Battery' },
    'Traction_Motor': { left: '50%', top: '70%', width: '15%', height: '15%', label: 'Traction Motor' },
    'HVAC_Roof': { left: '40%', top: '15%', width: '20%', height: '12%', label: 'Roof HVAC' },
    'Air_Compressor': { left: '65%', top: '70%', width: '12%', height: '15%', label: 'Air Compressor' }
  };

  const busImageKey = getBusImageKey();
  const selectedPosition = subsystem ? subsystemPositions[subsystem] : null;

  return (
    <div className="bus-visualization">
      <div className="bus-image-container">
        {/* Base bus image */}
        <div className="bus-image-wrapper">
          <img
            src={`/buses/${busImageKey}/base.png`}
            alt={`${make} ${model} ${length}ft bus`}
            className="bus-base-image"
          />

          {/* Subsystem highlight overlay */}
          {subsystem && (
            <img
              src={`/buses/${busImageKey}/${subsystem.toLowerCase()}_highlight.png`}
              alt={`${subsystem} highlighted`}
              className="bus-highlight-overlay"
            />
          )}
        </div>

        {/* Label for selected subsystem */}
        {selectedPosition && (
          <div className="subsystem-label-wrapper">
            <div className="highlight-label-bottom">{selectedPosition.label}</div>
          </div>
        )}
      </div>

      <div className="bus-specs">
        <span className="spec-item">
          <strong>Make:</strong> {make}
        </span>
        <span className="spec-item">
          <strong>Model:</strong> {model}
        </span>
        <span className="spec-item">
          <strong>Length:</strong> {length} ft
        </span>
      </div>

      <div className="image-note">
        ✅ Using generated placeholder images - Replace with actual bus photos when available
      </div>
    </div>
  );
};

export default BusVisualization;
