import React from 'react';
import { Text } from '@consta/uikit/Text';
import styles from '../AdministrationOrderProcessingCraftModal.styl';
interface FullCraftItem {
  id: number;
  name: string;
  count: number;
  price: number;
  countWeightType: number;
  createdAt: string;
  updatedAt: string;
  BasketId: number;
  deviceId: number;
  recipe: {
    id: number;
    img: string;
    info: {
      id: number;
      name: string;
      weight: number;
      weightType: string;
      pricePerUnit: number;
      createdAt: string;
      updatedAt: string;
      deviceId: number;
    }[];
  };
  items: {
    id: number;
    name: string;
    weight: number;
    weightType: string;
    pricePerUnit: number;
    createdAt: string;
    updatedAt: string;
    deviceId: number;
  }[];
}

interface IComponentProps {
  activeFullItem: FullCraftItem;
}

const AdministrationOrderProcessingCraftModalSide: React.FC<
  IComponentProps
> = ({ activeFullItem }) => {
  console.log(activeFullItem);
  return (
    <div className={styles.ModalContainer__content__rightSide}>
      <Text size={'2xl'}>{activeFullItem.name}</Text>
      <div className={styles.ModalContainer__content__rightSide__recipe}>
        <Text size={'l'}>Рецепт</Text>
        <div className={styles.ModalContainer__content__rightSide__recipe__row}>
          <Text>Наименование</Text>
          <Text>Кол-во</Text>
          <Text>Ед-изм</Text>
        </div>
        {activeFullItem.items.map((itm, idx) => (
          <div
            className={styles.ModalContainer__content__rightSide__recipe__row}
            key={idx}
          >
            <Text>{itm.name}</Text>
            <Text>{itm.weight}</Text>
            <Text>{itm.weightType}</Text>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdministrationOrderProcessingCraftModalSide;
