import React from 'react';

const SummaryCards = ({ summary }) => {
  if (!summary) return null;

  return (
    <div className="summary">
      <div className="summary-card blue">
        <h3>Average Cost</h3>
        <div className="value">${summary.average_cost.toFixed(2)}</div>
      </div>
      <div className="summary-card green">
        <h3>Total Cost</h3>
        <div className="value">${summary.total_cost.toFixed(2)}</div>
      </div>
      <div className="summary-card orange">
        <h3>Cost Range</h3>
        <div className="value">
          ${summary.min_cost.toFixed(2)} - ${summary.max_cost.toFixed(2)}
        </div>
      </div>
      <div className="summary-card purple">
        <h3>Trend</h3>
        <div className="value">
          {summary.cost_trend > 0 ? '+' : ''}${summary.cost_trend.toFixed(2)}
        </div>
      </div>
    </div>
  );
};

export default SummaryCards;
