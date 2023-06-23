import React, { useMemo } from 'react';
import styles from './BasketWithCount.module.styl';
import { useNavigate } from 'react-router-dom';
import { IconStorage } from '@consta/uikit/IconStorage';
import {useAppSelector} from "../../hooks/useAppSelector";
import {selectBasket} from "../../store/features/basket/BasketSelectors";
import {PublicRoutesEnum} from "../../utils/enum";

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
      {countInOrder ? (
        <div className={styles.Container__cnt}>{countInOrder}</div>
      ) : (
        <div></div>
      )}
    </div>
  );
};

export default BasketWithCount;
