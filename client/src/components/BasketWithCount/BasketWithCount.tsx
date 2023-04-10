import React, { useMemo } from 'react';
import { useAppSelector } from 'src/hooks/useAppSelector';
import { selectBasket } from 'src/redux/features/basket/BasketSelectors';
import { ShoppingCartOutlined } from '@ant-design/icons';
import styles from './BasketWithCount.styl';

const BasketWithCount = () => {
  const basket = useAppSelector(selectBasket);
  const countInOrder = useMemo(() => {
    if (basket) {
      return basket.items.reduce((accum, item) => accum + item.count, 0);
    } else return null;
  }, [basket]);
  return (
    <div className={styles.Container}>
      <ShoppingCartOutlined style={{ fontSize: '150%' }} />
      {countInOrder && (
        <div className={styles.Container__cnt}>{countInOrder}</div>
      )}
    </div>
  );
};

export default BasketWithCount;
