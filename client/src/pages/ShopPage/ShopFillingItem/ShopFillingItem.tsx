import React, { useState } from 'react';
import styles from 'src/pages/ShopPage/ShopPage.styl';
import { Modal } from '@consta/uikit/Modal';
import { Text } from '@consta/uikit/Text';

interface IComponentProps {
  className?: string;
  item: any;
}

const ShopFillingItem: React.FC<IComponentProps> = ({ className, item }) => {
  const [open, setOpen] = useState(false);
  return (
    <div style={{ position: 'relative' }}>
      <img
        src={`http://localhost:8081/${item.img}`}
        className={className}
        onClick={() => setOpen(true)}
      />
      <Modal isOpen={open} onClickOutside={() => setOpen(false)}>
        <img
          src={`http://localhost:8081/${item.img}`}
          className={styles.Shop__modalFilling}
          onClick={() => {
            setOpen(false);
          }}
        />
        <Text className={styles.modalText} weight={'bold'} size={'5xl'}>
          {item.name}
        </Text>
      </Modal>
    </div>
  );
};

export default ShopFillingItem;
