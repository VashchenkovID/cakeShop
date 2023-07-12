import React from 'react';
import { Text } from '@consta/uikit/Text';
import styles from './AdministrationTypesDecorItem.module.styl';
import {
  AdministrationTypesItemsEnum,
  AdministrationTypesModalEnum,
} from 'src/pages/AdministrationTypes/AdministrationTypes';
import { Button } from '@consta/uikit/Button';
import { IconEdit } from '@consta/uikit/IconEdit';
import { IconTrash } from '@consta/uikit/IconTrash';

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
  type: AdministrationTypesItemsEnum;
}

const AdministrationTypesDecorItem: React.FC<IComponentProps> = ({
  item,
  setEdit,
  setModal,

  type,
}) => {
  const openEdit = () => {
    setEdit(type, item);
    switch (type) {
      case AdministrationTypesItemsEnum.TYPE:
        setModal(AdministrationTypesModalEnum.TYPE_EDIT);
        return;
      case AdministrationTypesItemsEnum.FILLING:
        setModal(AdministrationTypesModalEnum.FILLING_EDIT);
        return;
      case AdministrationTypesItemsEnum.BISCUIT:
        setModal(AdministrationTypesModalEnum.BISCUIT_EDIT);
        return;
      case AdministrationTypesItemsEnum.DECOR:
        setModal(AdministrationTypesModalEnum.DECOR_EDIT);
        return;
      default:
        setModal(AdministrationTypesModalEnum.IDLE);
    }
  };
  const openRemove = () => {
    setEdit(type, item);
    switch (type) {
      case AdministrationTypesItemsEnum.TYPE:
        setModal(AdministrationTypesModalEnum.TYPE_REMOVE);
        return;
      case AdministrationTypesItemsEnum.FILLING:
        setModal(AdministrationTypesModalEnum.FILLING_REMOVE);
        return;
      case AdministrationTypesItemsEnum.BISCUIT:
        setModal(AdministrationTypesModalEnum.BISCUIT_REMOVE);
        return;
      case AdministrationTypesItemsEnum.DECOR:
        setModal(AdministrationTypesModalEnum.DECOR_REMOVE);
        return;
      default:
        setModal(AdministrationTypesModalEnum.IDLE);
    }
  };
  return (
    <div className={styles.DecorItem}>
      <Text>{item.name}</Text>
      <Text>{item.count}</Text>
      <Text>{item.countType}</Text>
      <Text>{Number(item.pricePerUnit)} ₽</Text>
      <Text> {item.constPrice} ₽</Text>
      <div className={styles.DecorItem__actions}>
        <Button
          size={'xs'}
          view={'primary'}
          onClick={openEdit}
          iconLeft={IconEdit}
        />
        <Button
          size={'xs'}
          view={'primary'}
          iconLeft={IconTrash}
          onClick={openRemove}
        />
      </div>
    </div>
  );
};

export default AdministrationTypesDecorItem;
