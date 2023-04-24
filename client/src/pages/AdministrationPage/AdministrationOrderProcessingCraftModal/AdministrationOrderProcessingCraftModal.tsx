import React, { SetStateAction, useEffect, useMemo, useState } from 'react';
import { OrderProcessingStatusEnum } from 'src/api/models/OrderProcessingStatusEnum';
import useRequest from 'src/hooks/useRequest';
import ordersApi from 'src/api/requests/ordersApi';
import styles from './AdministrationOrderProcessingCraftModal.styl';
import cn from 'classnames/bind';
import { Text } from '@consta/uikit/Text';
import {
  OrderProcessingCraftingItemModel,
  OrderProcessingCraftingModel,
} from 'src/api/models/OrderProcessingCraftingModel';
import { Button } from '@consta/uikit/Button';

interface IComponentProps {
  activeElement: { type: string; id: number };
  modal: boolean;
  setModal: React.Dispatch<SetStateAction<boolean>>;
}

const cx = cn.bind(styles);

const AdministrationOrderProcessingCraftModal: React.FC<IComponentProps> = ({
  activeElement,
  setModal,
  modal,
}) => {
  const [data, setData] = useState<OrderProcessingCraftingModel | null>(null);
  const [activeItem, setActiveItem] =
    useState<OrderProcessingCraftingItemModel | null>(null);
  const { load: fetchCraftingOrder, isLoading } = useRequest(
    ordersApi.getCraftOrder,
    (data) => {
      if (data) {
        setData(data.data.order);
      }
    },
  );
  const activeFullItem = useMemo(() => {
    if (activeItem) {
      const newItem = data.items.find((i) => i.id === activeItem.id);
      if (newItem) {
        return {
          ...newItem,
          items: newItem.recipe.info.map((itm) => {
            return { ...itm, weight: itm.weight * newItem.countWeightType };
          }),
        };
      }
      return null;
    }
  }, [activeItem]);
  useEffect(() => {
    if (activeElement) {
      fetchCraftingOrder(activeElement.id.toString(), activeElement.type);
    } else return null;
  }, [activeElement]);
  return (
    <>
      {data && (
        <div className={styles.ModalContainer}>
          <Text size={'3xl'}>{data.name}</Text>
          <section className={styles.ModalContainer__content}>
            <div className={styles.ModalContainer__content__leftSide}>
              {data.items.map((item, index) => (
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
            {activeFullItem && (
              <div>
                <Text size={'2xl'}>{activeFullItem.name}</Text>
                <div>
                  <Text>Рецепт</Text>
                  <div>
                    {activeFullItem.recipe.info.map((itm, idx) => (
                      <div key={idx}>{itm.name}</div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </section>
          <div className={styles.ModalContainer__actions}>
            <Button
              label={'Закрыть'}
              size={'s'}
              onClick={() => setModal(false)}
            />
          </div>
        </div>
      )}
    </>
  );
};

export default AdministrationOrderProcessingCraftModal;
