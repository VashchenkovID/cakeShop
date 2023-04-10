import React from 'react';
import { DeviceListModel } from 'src/api/models/DeviceListModel';
import styles from './ShopPageItem.styl';
import { Button } from 'antd';
import { StarFilled } from '@ant-design/icons';
interface IComponentProps {
  item: DeviceListModel;
  activeItem: number | null;
}

const ShopPageItem: React.FC<IComponentProps> = ({ item, activeItem }) => {
  return (
    <div className={styles.Item}>
      <img
        className={styles.Item__image}
        src={`http://localhost:8081/${item.img}`}
      />
      <p className={styles.Item__title}>{item.name}</p>
      <p className={styles.Item__subtitle}>{item.description}</p>
      <div className={styles.Item__footer}>
        <p>
          {item.rating} <StarFilled />
        </p>
        <p>{item.price},00 ₽</p>
      </div>
      <div className={styles.Item__button}>
        <Button>Добавить</Button>
      </div>
    </div>
  );
};

export default ShopPageItem;
