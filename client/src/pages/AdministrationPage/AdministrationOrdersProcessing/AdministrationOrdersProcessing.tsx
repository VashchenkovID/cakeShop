import React, { useEffect } from 'react';
import ordersApi from 'src/api/requests/ordersApi';

const AdministrationOrdersProcessing: React.FC = () => {
  const date = new Date().toISOString();

  const getOrders = async () => {
    await ordersApi.getOrderProcessing(date);
  };
  useEffect(() => {
    getOrders();
  }, []);
  return <div></div>;
};

export default AdministrationOrdersProcessing;
