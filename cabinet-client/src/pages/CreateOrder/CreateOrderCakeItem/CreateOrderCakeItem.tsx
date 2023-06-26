import React, { useEffect, useRef, useState } from "react";
import styles from "./CreateOrderCakeItem.module.styl";
import { Text } from "@consta/uikit/Text";
import { Button } from "@consta/uikit/Button";
import { IconTrash } from "@consta/uikit/IconTrash";
import { Collapse } from "@consta/uikit/Collapse";
import { nanoid } from "nanoid";
import { DecorUserModel } from "../../../api/models/DecorUserModel";
import { useAppDispatch } from "../../../hooks/useAppDispatch";
import { useAppSelector } from "../../../hooks/useAppSelector";
import { selectBasket } from "../../../store/features/basket/BasketSelectors";
import useCreateOrderCakeItem from "./useCreateOrderCakeItem";
import { setBasket } from "../../../store/features/basket/BasketSlice";
import { BasketModel } from "../../../api/models/BasketModel";
import CreateOrderDecorItem from "../CreateOrderDecorItem/CreateOrderDecorItem";

export interface OrderBasketChangeDecors extends DecorUserModel {
  isChecked: boolean;
  localId: string;
}

interface IComponentProps {
  item: {
    id: number;
    localId: string;
    name: string;
    deviceId: number;
    basketId: number | null;
    count: number;
    price: number;
    countWeightType: number;
    weightType: string;
    decors: { id: number | null; name: string; items: {}[] }[];
  };
  decors: DecorUserModel[];
  orderDecors: OrderBasketChangeDecors[];
  setOrderDecors: React.Dispatch<
    React.SetStateAction<OrderBasketChangeDecors[]>
  >;
}

const CreateOrderCakeItem: React.FC<IComponentProps> = ({
  item,
  orderDecors,
}) => {
  const dispatch = useAppDispatch();
  const basket = useAppSelector(selectBasket);
  const ref = useRef(item.countWeightType);
  const [isOpen, setIsOpen] = useState(false);
  const [localOrderDecors, setLocalOrderDecors] = useState<
    OrderBasketChangeDecors[]
  >([]);
  const { removeWeightCountInBasket, addWeightCountInBasket } =
    useCreateOrderCakeItem(item, ref);

  const addNewDecor = () => {
    dispatch(
      setBasket({
        ...basket,
        items: basket
          ? basket.items.map((i) => {
              if (i.localId === item.localId) {
                return {
                  ...i,
                  decors: [
                    ...i.decors,
                    {
                      id: null,
                      name: `Декор для ${i.name}`,
                      items: [] as any,
                      localId: nanoid(),
                    },
                  ],
                };
              } else return { ...i };
            })
          : [],
      } as BasketModel)
    );
  };

  useEffect(() => {
    if (orderDecors) {
      setLocalOrderDecors(orderDecors);
    }
  }, [orderDecors]);

  useEffect(() => {
    if (localOrderDecors) {
      dispatch(
        setBasket({
          ...basket,
          items: basket
            ? basket.items.map((oldItem) => {
                return {
                  ...oldItem,
                  decors: oldItem.decors.map((decor) => {
                    if (decor.name === `Декор для ${item.name}`) {
                      return {
                        ...decor,
                        items: localOrderDecors.filter((od) => od.isChecked),
                      };
                    } else return { ...decor };
                  }),
                };
              })
            : [],
        } as BasketModel)
      );
    }
  }, [localOrderDecors]);
  return (
    <Collapse
      isOpen={isOpen}
      className={styles.Collapse}
      label={
        <div className={styles.CakeItem}>
          <div>
            <Text size={"xl"}> {item.name}</Text>
            <Button
              label={isOpen ? "Скрыть декор" : "Показать декор"}
              onClick={() => setIsOpen((prev) => !prev)}
              size={"xs"}
            />
          </div>
          <Text className={styles.CakeItem__basketActions}>
            <Text size={"xl"}>{item.count} шт</Text>
          </Text>
          <Text className={styles.CakeItem__basketActions} size={"xl"}>
            <Button
              size={"s"}
              label={"-"}
              view={item.countWeightType === ref.current ? "ghost" : "primary"}
              disabled={item.countWeightType === ref.current}
              onClick={() => removeWeightCountInBasket(item)}
            />
            <Text size={"xl"}>
              {item.countWeightType} {item.weightType}
            </Text>
            <Button
              size={"s"}
              onClick={() => addWeightCountInBasket(item)}
              label={"+"}
            />
          </Text>
          <Text size={"xl"}>{item.price},00 ₽</Text>
          <Text className={styles.CakeItem__actions} size={"2xl"}>
            {Number(item.count) *
              Number(item.price) *
              Number(item.countWeightType)}
            ,00 ₽
            <Button
              size={"s"}
              iconLeft={IconTrash}
              onClick={() => {
                if (basket) {
                  dispatch(
                    setBasket({
                      ...basket,
                      items: basket.items.filter(
                        (elem) => elem.localId !== item.localId
                      ),
                    })
                  );
                }
              }}
            />
          </Text>
        </div>
      }
    >
      <div className={styles.Decor__rows}>
        <div className={styles.Decor__addDec}>
          {item.decors.length === 0 && (
            <Button
              label={"Добавить декор к десерту"}
              size={"xs"}
              onClick={addNewDecor}
            />
          )}
        </div>

        {item.decors.length > 0 && (
          <div className={styles.Decor}>
            <Text size={"s"}>Наименование</Text>
            <Text size={"s"}>Количество</Text>
            <Text size={"s"}>Цена за 1шт</Text>
            <Text size={"s"}>Итог</Text>
          </div>
        )}

        {item.decors.length > 0 &&
          localOrderDecors.map((decor, index) => (
            <CreateOrderDecorItem
              item={decor}
              key={index}
              index={index}
              setOrderDecors={setLocalOrderDecors}
              parentId={item.localId}
            />
          ))}
      </div>
    </Collapse>
  );
};

export default CreateOrderCakeItem;
