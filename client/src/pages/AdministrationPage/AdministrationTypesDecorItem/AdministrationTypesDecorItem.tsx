import React from 'react';
import { Text } from '@consta/uikit/Text';
import styles from './AdministrationTypesDecorItem.styl';

interface IComponentProps {
  item: any;
}

const AdministrationTypesDecorItem: React.FC<IComponentProps> = ({ item }) => {
  return (
    <div className={styles.DecorItem}>
      <Text>{item.name}</Text>
      <Text>{item.count}</Text>
      <Text>{item.countType}</Text>
      <Text>{item.pricePerUnit},00 ₽</Text>
      <Text> {item.constPrice},00 ₽</Text>
    </div>
  );
};

export default AdministrationTypesDecorItem;
