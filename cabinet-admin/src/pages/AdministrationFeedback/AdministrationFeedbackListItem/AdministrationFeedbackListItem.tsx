import React from 'react';
import { DeviceListModel } from 'src/api/models/DeviceListModel';
import styles from './AdministrationFeedbackListItem.module.styl';

import { Text } from '@consta/uikit/Text';
import cn from 'classnames/bind';
import ComponentStyleWrapper from 'src/components/ComponentStyleWrapper/ComponentStyleWrapper';

interface IComponentProps {
  activeElement: number | null;
  item: DeviceListModel;
  setActiveList: React.Dispatch<React.SetStateAction<number | null>>;
}
const cx = cn.bind(styles);
const AdministrationFeedbackListItem: React.FC<IComponentProps> = ({
  activeElement,
  item,
  setActiveList,
}) => {
  return (
    <ComponentStyleWrapper>
      <div
        onClick={() => setActiveList(item.id)}
        className={styles.RecipesListItem}
      >
        <div className={styles.RecipesListItem__titleContainer}>
          <img
            className={styles.RecipesListItem__image}
            src={`${import.meta.env.VITE_API_URL_IMAGE}${item.img}`}
          />
          <Text
            className={cx(styles.RecipesListItem__title, {
              active: activeElement === item.id,
            })}
          >
            {item.name}
          </Text>
        </div>
        <Text className={styles.RecipesListItem__price}>{item.price} ₽</Text>
      </div>
    </ComponentStyleWrapper>
  );
};

export default AdministrationFeedbackListItem;
