import React from 'react';

const DataTable = ({ predictions }) => {
  if (!predictions || predictions.length === 0) return null;

  return (
    <div>
      <h3 style={{ marginTop: '30px', marginBottom: '15px' }}>
        Monthly Breakdown
      </h3>
      <table className="data-table">
        <thead>
          <tr>
            <th>Month</th>
            <th>Predicted Cost</th>
            <th>Age (months)</th>
            <th>Mileage (km)</th>
          </tr>
        </thead>
        <tbody>
          {predictions.map((p, index) => (
            <tr key={index}>
              <td>{p.date}</td>
              <td>
                <strong>${p.cost.toFixed(2)}</strong>
              </td>
              <td>{p.age_months}</td>
              <td>{p.mileage_km.toLocaleString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default DataTable;
