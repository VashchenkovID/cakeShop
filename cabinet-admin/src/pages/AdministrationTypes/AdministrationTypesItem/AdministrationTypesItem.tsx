import React, { useState } from 'react';
import { Text } from '@consta/uikit/Text';
import styles from './AdministrationTypesItem.module.styl';
import { Modal } from '@consta/uikit/Modal';
import {
  AdministrationTypesItemsEnum,
  AdministrationTypesModalEnum,
} from 'src/pages/AdministrationTypes/AdministrationTypes';
import { Button } from '@consta/uikit/Button';
import { IconEdit } from '@consta/uikit/IconEdit';
import { IconTrash } from '@consta/uikit/IconTrash';

interface IComponentProps {
  item: {
    id: number;
    name: string;
    img?: string;
  };
  type: AdministrationTypesItemsEnum;
  setEdit(type: AdministrationTypesItemsEnum, item: any): void;
  setModal: React.Dispatch<React.SetStateAction<AdministrationTypesModalEnum>>;
}

const AdministrationTypesItem: React.FC<IComponentProps> = ({
  item,
  type,
  setEdit,
  setModal,
}) => {
  const [open, setOpen] = useState(false);
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
    <div className={styles.Item}>
      <div className={styles.Item__case}>
        {item.img && (
          <img
            onClick={() => setOpen(true)}
            style={{ width: 60, height: 60, borderRadius: '10px' }}
            src={`${import.meta.env.VITE_API_URL_IMAGE}/${item.img}`}
          />
        )}
        <Text size={'l'}>{item.name}</Text>
      </div>
      <div className={styles.Item__case}>
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

      <Modal isOpen={open} onClickOutside={() => setOpen(false)}>
        <img
          onClick={() => setOpen(false)}
          style={{ maxWidth: '60vw', borderRadius: '10px' }}
          src={`${import.meta.env.VITE_API_URL_IMAGE}/${item.img}`}
        />
      </Modal>
    </div>
  );
};

export default AdministrationTypesItem;
