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
import { useResize } from "../../../hooks/useResize";

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
  const { width } = useResize();
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
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
        setIsOpen((prev) => !prev);
      }}
      label={
        width >= 500 ? (
          <div className={styles.CakeItem}>
            <Text> {item.name}</Text>
            <div className={styles.CakeItem__basketActions}>
              <Button
                size={"s"}
                label={"-"}
                view={
                  item.countWeightType === ref.current ? "ghost" : "primary"
                }
                disabled={item.countWeightType === ref.current}
                onClick={(e) => removeWeightCountInBasket(e, item)}
              />
              <Text>
                {item.countWeightType} {item.weightType}
              </Text>
              <Button
                size={"s"}
                onClick={(e) => addWeightCountInBasket(e, item)}
                label={"+"}
              />
            </div>
            <Text>{item.price},00 ₽</Text>
            <div className={styles.CakeItem__actions}>
              <Text>
                {Number(item.count) *
                  Number(item.price) *
                  Number(item.countWeightType)}
                ,00 ₽
              </Text>
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
            </div>
          </div>
        ) : (
          <div className={styles.CakeItem__mobileContainer}>
            <Text> {item.name}</Text>
            <div className={styles.CakeItem__mobileItem}>
              <div className={styles.CakeItem__basketActions}>
                <Button
                  size={"xs"}
                  label={"-"}
                  view={
                    item.countWeightType === ref.current ? "ghost" : "primary"
                  }
                  disabled={item.countWeightType === ref.current}
                  onClick={(e) => removeWeightCountInBasket(e, item)}
                />
                <Text className={styles.CakeItem__mobileText}>
                  {item.countWeightType} {item.weightType}
                </Text>
                <Button
                  size={"xs"}
                  onClick={(e) => addWeightCountInBasket(e, item)}
                  label={"+"}
                />
              </div>
              <div className={styles.CakeItem__actions}>
                <Text className={styles.CakeItem__mobileText}>
                  {Number(item.count) *
                    Number(item.price) *
                    Number(item.countWeightType)}
                  ,00 ₽
                </Text>
                <Button
                  size={"xs"}
                  iconLeft={IconTrash}
                  onClick={(e) => {
                    e.stopPropagation();
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
              </div>
            </div>
          </div>
        )
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
