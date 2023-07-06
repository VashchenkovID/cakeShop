import React from 'react';
import { DeviceListModel } from 'src/api/models/DeviceListModel';
import styles from './AdministrationListItem.styl';
import { Text } from '@consta/uikit/Text';
import cn from 'classnames/bind';
import ComponentCard from 'src/components/ComponentCard/ComponentCard';

interface IComponentProps {
  activeElement: number | null;
  item: DeviceListModel;
  setActiveList: React.Dispatch<React.SetStateAction<number | null>>;
}

const cx = cn.bind(styles);

const AdministrationListItem: React.FC<IComponentProps> = ({
  activeElement,
  item,
  setActiveList,
}) => {
  return (
    <ComponentCard isActive={activeElement === item.id}>
      <div
        onClick={() => setActiveList(item.id)}
        className={cx(styles.RecipesListItem)}
      >
        <div className={styles.RecipesListItem__titleContainer}>
          <img
            className={styles.RecipesListItem__image}
            src={`${process.env.REACT_APP_IMAGE}${item.img}`}
          />
          <Text
            className={cx(styles.RecipesListItem__title, {
              active: activeElement === item.id,
            })}
            size={'l'}
          >
            {item.name}
            <Text size={'s'} view={'secondary'}>
              От {item.countWeightType} {item.weightType}
            </Text>
          </Text>
        </div>
        <Text
          className={cx(styles.RecipesListItem__price, {
            active: activeElement === item.id,
          })}
        >
          {item.price} ₽
        </Text>
      </div>
    </ComponentCard>
  );
};

export default AdministrationListItem;
