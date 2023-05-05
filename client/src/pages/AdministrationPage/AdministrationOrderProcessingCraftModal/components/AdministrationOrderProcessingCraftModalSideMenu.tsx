import React from 'react';
import { OrderProcessingCraftingItemModel } from 'src/api/models/OrderProcessingCraftingModel';
import cn from 'classnames/bind';
import styles from 'src/pages/AdministrationPage/AdministrationOrderProcessingCraftModal/AdministrationOrderProcessingCraftModal.styl';
import { Text } from '@consta/uikit/Text';

interface IComponentProps {
  items: OrderProcessingCraftingItemModel[];
  activeItem: OrderProcessingCraftingItemModel;
  setActiveItem: React.Dispatch<
    React.SetStateAction<OrderProcessingCraftingItemModel>
  >;
}

const cx = cn.bind(styles);

const AdministrationOrderProcessingCraftModalSideMenu: React.FC<
  IComponentProps
> = ({items,activeItem,setActiveItem}) => {
  return (
    <div className={styles.ModalContainer__content__leftSide}>
      {items.map((item, index) => (
        <div
          onClick={() => setActiveItem(item)}
          className={cx(styles.ModalContainer__content__leftSide__row, {
            active: activeItem && activeItem.id === item.id,
          })}
          key={index}
        >
          <Text
            className={cx(
              styles.ModalContainer__content__leftSide__row__title,
              {
                active: activeItem && activeItem.id === item.id,
              },
            )}
            size={'l'}
          >
            {item.name}
          </Text>
        </div>
      ))}
    </div>
  );
};

export default AdministrationOrderProcessingCraftModalSideMenu;
