import React from 'react';
import { DeviceListModel } from 'src/api/models/DeviceListModel';
import styles from './AdministrationListItem.styl';
import { Text } from '@consta/uikit/Text';
import CustomTextTooltip from 'src/components/CustomTextTooltip';

interface IComponentProps {
  activeElement: number | null;
  item: DeviceListModel;
  setActiveList: React.Dispatch<React.SetStateAction<number | null>>;
}

const AdministrationListItem: React.FC<IComponentProps> = ({
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
          src={`http://localhost:8081/${item.img}`}
        />
        <Text className={styles.RecipesListItem__title}>{item.name}</Text>
        <Text className={styles.RecipesListItem__subTitle}>
          <CustomTextTooltip text={item.description} lineClamp={1} />
        </Text>
      </div>
      <Text className={styles.RecipesListItem__price}>{item.price},00 ₽</Text>
    </div>
  );
};

export default AdministrationListItem;
