import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const getSubsystems = async () => {
  const response = await api.get('/api/subsystems');
  return response.data;
};

export const predictCosts = async (subsystem, startDate, endDate, age, mileage, make, model) => {
  const response = await api.post('/api/predict', {
    subsystem,
    start_date: startDate,
    end_date: endDate,
    age_months: parseInt(age),
    mileage_km: parseInt(mileage),
    bus_make: make,
    bus_model: model,
  });
  return response.data;
};

export const checkHealth = async () => {
  const response = await api.get('/api/health');
  return response.data;
};

export default api;
