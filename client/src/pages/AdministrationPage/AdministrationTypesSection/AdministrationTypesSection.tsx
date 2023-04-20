import React from 'react';
import { Text } from '@consta/uikit/Text';
import styles from './AdministrationTypesSection.styl';
import AdministrationTypesDecorItem from 'src/pages/AdministrationPage/AdministrationTypesDecorItem/AdministrationTypesDecorItem';
import AdministrationTypesItem from 'src/pages/AdministrationPage/AdministrationTypesItem/AdministrationTypesItem';
import { Button } from '@consta/uikit/Button';
interface IComponentProps {
  title: string;
  items: any[];
  isDecor: boolean;
  onCreate(): void;
}

const AdministrationTypesSection: React.FC<IComponentProps> = ({
  title,
  items,
  isDecor,
  onCreate,
}) => {
  return (
    <div className={styles.Section}>
      <Text size={'2xl'}>{title}</Text>
      <Button size={'s'} label={'Создать'} onClick={onCreate} />
      <div className={styles.Section__rows}>
        {isDecor && (
          <div className={styles.DecorItem}>
            <Text>Наименование</Text>
            <Text>Количество</Text>
            <Text>Единица измерения</Text>
            <Text>Цена единицы</Text>
            <Text>Цена закупки единицы</Text>
          </div>
        )}
        {isDecor
          ? items.map((item, index) => (
              <AdministrationTypesDecorItem key={index} item={item} />
            ))
          : items.map((item, index) => (
              <AdministrationTypesItem item={item} key={index} />
            ))}
      </div>
    </div>
  );
};

export default AdministrationTypesSection;
