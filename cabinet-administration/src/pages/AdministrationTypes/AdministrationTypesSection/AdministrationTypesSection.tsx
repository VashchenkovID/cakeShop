import React from 'react';
import { Text } from '@consta/uikit/Text';
import styles from './AdministrationTypesSection.styl';
import AdministrationTypesDecorItem from 'src/pages/AdministrationTypes/AdministrationTypesDecorItem/AdministrationTypesDecorItem';
import AdministrationTypesItem from 'src/pages/AdministrationTypes/AdministrationTypesItem/AdministrationTypesItem';
import { Button } from '@consta/uikit/Button';
import {
  AdministrationTypesItemsEnum,
  AdministrationTypesModalEnum,
} from 'src/pages/AdministrationTypes/AdministrationTypes';
interface IComponentProps {
  title: string;
  items: any[];
  isDecor: boolean;
  onCreate(): void;
  type: AdministrationTypesItemsEnum;
  setEdit(type: AdministrationTypesItemsEnum, item: any): void;
  setModal: React.Dispatch<React.SetStateAction<AdministrationTypesModalEnum>>;
  clear(): void;
}

const AdministrationTypesSection: React.FC<IComponentProps> = ({
  title,
  items,
  isDecor,
  onCreate,
  type,
  setEdit,
  setModal,
  clear,
}) => {
  return (
    <div className={styles.Section}>
      <Text size={'2xl'}>{title}</Text>
      <Button
        size={'s'}
        label={'Создать'}
        onClick={() => {
          clear();
          onCreate();
        }}
      />
      <div className={styles.Section__rows}>
        {isDecor && (
          <div className={styles.DecorItem}>
            <Text>Наименование</Text>
            <Text>Количество</Text>
            <Text>Единица измерения</Text>
            <Text>Цена единицы</Text>
            <Text>Цена закупки единицы</Text>
            <div></div>
          </div>
        )}
        {isDecor
          ? items.map((item, index) => (
              <AdministrationTypesDecorItem
                setEdit={setEdit}
                setModal={setModal}
                key={index}
                item={item}
                type={type}
              />
            ))
          : items.map((item, index) => (
              <AdministrationTypesItem
                setEdit={setEdit}
                setModal={setModal}
                item={item}
                key={index}
                type={type}
              />
            ))}
      </div>
    </div>
  );
};

export default AdministrationTypesSection;
