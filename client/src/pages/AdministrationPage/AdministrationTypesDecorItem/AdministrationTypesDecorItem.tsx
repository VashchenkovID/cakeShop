import React from 'react';
import { Text } from '@consta/uikit/Text';
import styles from './AdministrationTypesDecorItem.styl';
import {
  AdministrationTypesItemsEnum,
  AdministrationTypesModalEnum,
} from 'src/pages/AdministrationPage/AdministrationTypes/AdministrationTypes';

interface IComponentProps {
  item: {
    name: string;
    count: number;
    countType: string;
    pricePerUnit: number;
    constPrice: number;
  };
  setEdit(type: AdministrationTypesItemsEnum, item: any): void;
  setModal: React.Dispatch<React.SetStateAction<AdministrationTypesModalEnum>>;
}

const AdministrationTypesDecorItem: React.FC<IComponentProps> = ({
  item,
  setEdit,
  setModal,
}) => {
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
