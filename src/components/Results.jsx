import React from 'react';
import SummaryCards from './SummaryCards';
import CostChart from './CostChart';
import DataTable from './DataTable';

const Results = ({ data, show }) => {
  if (!show || !data) return null;

  return (
    <div className={`results ${show ? 'show' : ''}`}>
      <h2 style={{ marginBottom: '20px' }}>Prediction Results</h2>
      <SummaryCards summary={data.summary} />
      <CostChart data={data} />
      <DataTable predictions={data.predictions} />
    </div>
  );
};

export default Results;
