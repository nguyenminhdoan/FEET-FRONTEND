import React from 'react';
import SummaryCards from './SummaryCards';
import CostChart from './CostChart';
import KilometerChart from './KilometerChart';
import MileageSummaryCards from './MileageSummaryCards';
import DataTable from './DataTable';

const Results = ({ data, show }) => {
  if (!show || !data) return null;

  return (
    <div className={`results ${show ? 'show' : ''}`}>
      <h2 style={{ marginBottom: '20px' }}>Prediction Results</h2>

      {/* Reliability Warning */}
      {data.reliability === 'unreliable' && (
        <div className="warning-banner unreliable">
          <span className="warning-icon">⚠️</span>
          <div>
            <strong>UNRELIABLE PREDICTION - DO NOT USE</strong>
            <p>This subsystem has insufficient training data ({data.sample_count} samples). Predictions are highly unreliable and should NOT be trusted or used for decision-making.</p>
          </div>
        </div>
      )}

      {data.reliability === 'limited' && (
        <div className="warning-banner limited">
          <span className="warning-icon">⚠️</span>
          <div>
            <strong>Limited Reliability</strong>
            <p>This subsystem has limited training data ({data.sample_count} samples). Predictions should be used with caution and validated with additional data sources.</p>
          </div>
        </div>
      )}

      {/* Cost Analysis Section */}
      <h3 style={{ marginTop: '20px', marginBottom: '15px', color: '#00A039' }}>
        Cost Analysis
      </h3>
      <SummaryCards summary={data.summary} />
      <CostChart data={data} />

      {/* Mileage Analysis Section */}
      <h3 style={{ marginTop: '40px', marginBottom: '15px', color: '#00A039' }}>
        Mileage Analysis
      </h3>
      <MileageSummaryCards predictions={data.predictions} />
      <KilometerChart data={data} />

      {/* Monthly Breakdown */}
      <DataTable predictions={data.predictions} />
    </div>
  );
};

export default Results;
