import React from 'react';
import { DeviceListModel } from 'src/api/models/DeviceListModel';
import styles from './AdministrationFeedbackListItem.styl';

import { Text } from '@consta/uikit/Text';
import cn from 'classnames/bind';

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
    <div
      onClick={() => setActiveList(item.id)}
      className={styles.RecipesListItem}
    >
      <div>
        <img
          className={styles.RecipesListItem__image}
          src={`${process.env.REACT_APP_IMAGE}${item.img}`}
        />
        <Text
          className={cx(styles.RecipesListItem__title, {
            active: activeElement === item.id,
          })}
        >
          {item.name}
        </Text>
      </div>
      <Text className={styles.RecipesListItem__price}>{item.price},00 ₽</Text>
    </div>
  );
};

export default AdministrationFeedbackListItem;
