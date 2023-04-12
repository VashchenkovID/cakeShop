import React, { useMemo } from 'react';
import { useAppSelector } from 'src/hooks/useAppSelector';
import { selectBasket } from 'src/redux/features/basket/BasketSelectors';
import styles from './BasketWithCount.styl';
import { useNavigate } from 'react-router-dom';
import { PublicRoutesEnum } from 'src/router';
import { IconCards } from '@consta/uikit/IconCards';
import {IconStorage} from "@consta/uikit/IconStorage";

const BasketWithCount = () => {
  const basket = useAppSelector(selectBasket);
  const navigate = useNavigate();
  const countInOrder = useMemo(() => {
    if (basket) {
      return basket.items.reduce((accum, item) => accum + item.count, 0);
    } else return null;
  }, [basket]);
  return (
    <div
      onClick={() => navigate(`${PublicRoutesEnum.VIEW_ORDER}`)}
      className={styles.Container}
    >
      <IconStorage className={styles.icon} view={'ghost'} />
      {countInOrder && (
        <div className={styles.Container__cnt}>{countInOrder}</div>
      )}
    </div>
  );
};

export default BasketWithCount;
