import React from 'react';
import { DeviceListModel } from 'src/api/models/DeviceListModel';
import styles from './AdministrationListItem.styl';

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
        <div className={styles.RecipesListItem__title}>{item.name}</div>
      </div>
      <div className={styles.RecipesListItem__subTitle}>{item.description}</div>
      <div className={styles.RecipesListItem__price}>{item.price},00 ₽</div>
    </div>
  );
};

export default AdministrationListItem;
