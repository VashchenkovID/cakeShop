import React, { useEffect } from 'react';
import analyticsApi from 'src/api/requests/analyticsApi';

const AdministrationAnalytics: React.FC = () => {
  const getPopular = async () => {
    await analyticsApi.getOrderProcessing(new Date().toISOString());
    await analyticsApi.getSales(new Date().toISOString());
  };
  useEffect(() => {
    getPopular();
  }, []);
  return <div>123</div>;
};

export default AdministrationAnalytics;
