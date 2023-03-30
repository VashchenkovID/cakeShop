import React from 'react';
import { LocalStorageKeysEnum } from 'src/utils/enum';

const ShopPage = () => {
  const role = localStorage.getItem(LocalStorageKeysEnum.ROLE);
  return <div>11</div>;
};

export default ShopPage;
