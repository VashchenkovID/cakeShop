import React, { useEffect, useMemo, useState } from "react";
import { useAppDispatch } from "src/hooks/useAppDispatch";
import { useAppSelector } from "src/hooks/useAppSelector";
import { selectBasket } from "src/store/features/basket/BasketSelectors";
import { PublicRoutesEnum } from "src/utils/enum";
import { setBasket } from "src/store/features/basket/BasketSlice";
import { nanoid } from "@reduxjs/toolkit";
import { IconFavorite } from "@consta/uikit/IconFavorite";
import { Button } from "@consta/uikit/Button";
import { Text } from "@consta/uikit/Text";
import styles from "./CatalogItem.module.styl";
import cn from "classnames/bind";
import CatalogItemPrice from "../CatalogItemPrice/CatalogItemPrice";
import { useNavigate } from "react-router-dom";
import { storageUser } from "src/utils/storage";
import ComponentStyleWrapper from "src/components/ComponentStyleWrapper/ComponentStyleWrapper";
const cx = cn.bind(styles);
const CatalogItem = ({ item, width, setModal }) => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const basket = useAppSelector(selectBasket);
    const user = storageUser();
    const [isAdded, setIsAdded] = useState(false);
    const addItemInBasket = async () => {
        if (user && user.id) {
            if (!basket) {
                dispatch(setBasket({
                    id: null,
                    name: `Заказ пользователя ${user.name}`,
                    user_id: Number(user.id),
                    items: [
                        {
                            id: item.id,
                            localId: nanoid(),
                            name: item.name,
                            deviceId: item.id,
                            count: 1,
                            price: item.price,
                            basketId: null,
                            countWeightType: item.countWeightType,
                            weightType: item.weightType,
                            decors: [],
                        },
                    ],
                }));
                setIsAdded(true);
            }
            if (basket) {
                dispatch(setBasket({
                    ...basket,
                    items: [
                        ...basket.items,
                        {
                            id: item.id,
                            name: item.name,
                            localId: nanoid(),
                            deviceId: item.id,
                            count: 1,
                            price: item.price,
                            basketId: null,
                            countWeightType: item.countWeightType,
                            weightType: item.weightType,
                            decors: [],
                        },
                    ],
                }));
            }
        }
        else {
            if (!basket) {
                dispatch(setBasket({
                    id: null,
                    name: `Индивидуальный заказ`,
                    user_id: null,
                    items: [
                        {
                            id: item.id,
                            localId: nanoid(),
                            name: item.name,
                            deviceId: item.id,
                            count: 1,
                            price: item.price,
                            basketId: null,
                            countWeightType: item.countWeightType,
                            weightType: item.weightType,
                            decors: [],
                        },
                    ],
                }));
                setIsAdded(true);
            }
            if (basket) {
                dispatch(setBasket({
                    ...basket,
                    items: [
                        ...basket.items,
                        {
                            id: item.id,
                            localId: nanoid(),
                            name: item.name,
                            deviceId: item.id,
                            count: 1,
                            price: item.price,
                            basketId: null,
                            countWeightType: item.countWeightType,
                            weightType: item.weightType,
                            decors: [],
                        },
                    ],
                }));
            }
        }
    };
    const removeItemInBasket = async () => {
        if (user && user.id) {
            if (!basket) {
                dispatch(setBasket({
                    id: null,
                    name: `Заказ пользователя ${user.name}`,
                    user_id: Number(user.id),
                    items: [
                        {
                            id: item.id,
                            localId: nanoid(),
                            name: item.name,
                            deviceId: item.id,
                            count: 1,
                            price: item.price,
                            basketId: null,
                            countWeightType: item.countWeightType,
                            weightType: item.weightType,
                            decors: [],
                        },
                    ],
                }));
                setIsAdded(true);
            }
            if (basket) {
                dispatch(setBasket({
                    ...basket,
                    items: [
                        ...basket.items.filter((i) => i.id !== item.id),
                        ...basket.items
                            .filter((i) => i.id === item.id)
                            .filter((el, ind, arr) => ind !== arr.length - 1),
                    ],
                }));
            }
        }
        else {
            if (!basket) {
                dispatch(setBasket({
                    id: null,
                    name: `Индивидуальный заказ`,
                    user_id: null,
                    items: [
                        {
                            id: item.id,
                            localId: nanoid(),
                            name: item.name,
                            deviceId: item.id,
                            count: 1,
                            price: item.price,
                            basketId: null,
                            countWeightType: item.countWeightType,
                            weightType: item.weightType,
                            decors: [],
                        },
                    ],
                }));
                setIsAdded(true);
            }
            if (basket) {
                dispatch(setBasket({
                    ...basket,
                    items: [
                        ...basket.items.filter((i) => i.id !== item.id),
                        ...basket.items
                            .filter((i) => i.id === item.id)
                            .filter((el, ind, arr) => ind !== arr.length - 1),
                    ],
                }));
            }
        }
    };
    const countItemBasket = useMemo(() => {
        if (basket) {
            if (basket.items.length > 0) {
                return basket.items.filter((i) => i.id === item.id).length;
            }
            else
                return 0;
        }
        else
            return 0;
    }, [basket]);
    useEffect(() => {
        if (basket && basket.items.find((elem) => elem.id === item.id)) {
            setIsAdded(true);
        }
    }, [basket]);
    useEffect(() => {
        if (countItemBasket === 0) {
            setIsAdded(false);
        }
    }, [countItemBasket]);
    useEffect(() => {
        localStorage.setItem("Basket", JSON.stringify(basket));
    }, [basket]);
    return (React.createElement("div", null,
        React.createElement(ComponentStyleWrapper, null,
            React.createElement("div", { className: styles.Item, onClick: () => navigate(`${PublicRoutesEnum.VIEW_DESSERT}/${item.id}`) },
                React.createElement("div", { className: styles.Item__header },
                    React.createElement("img", { className: styles.Item__image, src: `123123123` }),
                    React.createElement("div", { className: styles.Item__title },
                        React.createElement(Text, { weight: "semibold" }, item.name),
                        React.createElement("div", { className: styles.Item__rating },
                            React.createElement(Text, { size: "s", className: styles.Item__rating__text }, Math.floor(item.rating * 100) / 100),
                            React.createElement(IconFavorite, { className: cx(styles.Item__rating__icon, {
                                    colored: item.rating > 0,
                                }) })))),
                React.createElement("div", { className: styles.Item__basket },
                    React.createElement(CatalogItemPrice, { price: item.price, countWeightType: item.countWeightType, discount: item.discount }),
                    width >= 1000 && (React.createElement("div", { className: styles.Item__button }, !isAdded ? (React.createElement(Button, { size: "xs", onClick: (e) => {
                            e.stopPropagation();
                            addItemInBasket();
                        }, label: "Добавить" })) : (React.createElement("div", { className: styles.Item__addActions },
                        React.createElement(Button, { size: "xs", label: "-", onClick: (e) => {
                                e.stopPropagation();
                                removeItemInBasket();
                            } }),
                        React.createElement(Text, null, countItemBasket),
                        React.createElement(Button, { size: "xs", onClick: (e) => {
                                e.stopPropagation();
                                addItemInBasket();
                            }, label: "+" })))))),
                width < 1000 ? (React.createElement("div", { className: styles.Item__footer },
                    React.createElement(Button, { size: "xs", label: "Купить в 1 клик", onClick: (e) => {
                            e.stopPropagation();
                            addItemInBasket();
                            setModal(true);
                        } }),
                    React.createElement("div", { className: styles.Item__button }, !isAdded ? (React.createElement(Button, { size: "xs", onClick: (e) => {
                            e.stopPropagation();
                            addItemInBasket();
                        }, label: "Добавить" })) : (React.createElement("div", { className: styles.Item__addActions },
                        React.createElement(Button, { size: "xs", label: "-", onClick: (e) => {
                                e.stopPropagation();
                                removeItemInBasket();
                            } }),
                        React.createElement(Text, null, countItemBasket),
                        React.createElement(Button, { size: "xs", onClick: (e) => {
                                e.stopPropagation();
                                addItemInBasket();
                            }, label: "+" })))))) : (React.createElement(Button, { size: "s", label: "Купить в 1 клик", onClick: (e) => {
                        e.stopPropagation();
                        addItemInBasket();
                        setModal(true);
                    } }))))));
};
export default CatalogItem;
//# sourceMappingURL=CatalogItem.js.map