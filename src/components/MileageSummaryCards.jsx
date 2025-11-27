import React from 'react';

const MileageSummaryCards = ({ predictions }) => {
  if (!predictions || predictions.length === 0) return null;

  // Calculate mileage statistics
  const mileages = predictions.map(p => p.mileage_km);
  const startMileage = mileages[0];
  const endMileage = mileages[mileages.length - 1];
  const totalIncrease = endMileage - startMileage;
  const averageMonthlyIncrease = totalIncrease / (predictions.length - 1);

  return (
    <div className="summary">
      <div className="summary-card blue">
        <h3>Starting Mileage</h3>
        <div className="value">{startMileage.toLocaleString()} km</div>
      </div>
      <div className="summary-card green">
        <h3>Ending Mileage</h3>
        <div className="value">{endMileage.toLocaleString()} km</div>
      </div>
      <div className="summary-card orange">
        <h3>Total Increase</h3>
        <div className="value">{totalIncrease.toLocaleString()} km</div>
      </div>
      <div className="summary-card purple">
        <h3>Avg Monthly Increase</h3>
        <div className="value">{Math.round(averageMonthlyIncrease).toLocaleString()} km</div>
      </div>
    </div>
  );
};

export default MileageSummaryCards;
