import React from 'react';
import { DeviceItemModel } from 'src/api/models/DeviceItemModel';
import styles from './AddRatingViewCard.styl';
import { Text } from '@consta/uikit/Text';
import { IconFavorite } from '@consta/uikit/IconFavorite';
import Textarea from 'src/components/Textarea/Textarea';

interface IComponentProps {
  item: DeviceItemModel;
}

const AddRatingViewCard: React.FC<IComponentProps> = ({ item }) => {
  return (
    <div className={styles.Item}>
      <div className={styles.Item__header}>
        <img
          className={styles.Item__image}
          src={`${process.env.REACT_APP_IMAGE}${item.img}`}
        />
        <div className={styles.Item__titleContainer}>
          <Text weight={'semibold'} className={styles.Item__title}>
            {item.name}, {item.countWeightType}
            &nbsp;{item.weightType}
          </Text>
          <div className={styles.Item__rating}>
            <Text className={styles.Item__rating__text}>
              {item.rating?.toFixed(2) || 0}
            </Text>
            <IconFavorite className={styles.Item__rating__icon} />
          </div>
        </div>
      </div>
      <Text>Описание</Text>
      <div className={styles.Item__description}>
        <Textarea text={item.description} size={'s'} form={'round'} />
      </div>

      <div className={styles.Item__button}>
        <Text weight={'bold'} size={'l'}>
          Цена: {item.price * item.countWeightType},00 ₽
        </Text>
      </div>
    </div>
  );
};

export default AddRatingViewCard;
