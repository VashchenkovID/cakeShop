import React, { useEffect, useMemo, useState } from "react";
import ComponentStyleWrapper from "../../../components/ComponentStyleWrapper/ComponentStyleWrapper";
import styles from "../DeviceView.module.styl";
import cn from "classnames/bind";
import { Text } from "@consta/uikit/Text";
import Textarea from "../../../components/Textarea/Textarea";
import { IconFavorite } from "@consta/uikit/IconFavorite";
import { Button } from "@consta/uikit/Button";
import { setBasket } from "../../../store/features/basket/BasketSlice";
import { nanoid } from "@reduxjs/toolkit";
import { LocalStorageKeysEnum } from "../../../utils/enum";
import { useAppDispatch } from "../../../hooks/useAppDispatch";
import { useAppSelector } from "../../../hooks/useAppSelector";
import { selectBasket } from "../../../store/features/basket/BasketSelectors";
import { Modal } from "@consta/uikit/Modal";
import DeviceCreateRatingModal from "../Modals/DeviceCreateRatingModal";
export var DeviceModalEnum;
(function (DeviceModalEnum) {
    DeviceModalEnum["IDLE"] = "idle";
    DeviceModalEnum["CREATE_RATING"] = "create_rating";
    DeviceModalEnum["CREATE_BASKET"] = "create_basket";
})(DeviceModalEnum || (DeviceModalEnum = {}));
const cx = cn.bind(styles);
const DeviceViewLeftSide = ({ device, width, fetchRatings, fetchDevice, }) => {
    // store
    const dispatch = useAppDispatch();
    const basket = useAppSelector(selectBasket);
    const userId = localStorage.getItem(LocalStorageKeysEnum.ID);
    const userName = localStorage.getItem(LocalStorageKeysEnum.NAME);
    // state
    const [isAdded, setIsAdded] = useState(false);
    const [modal, setModal] = useState(DeviceModalEnum.IDLE);
    const [isView, setIsView] = useState(false);
    //func
    const addItemInBasket = async () => {
        if (userId && device) {
            if (!basket) {
                dispatch(setBasket({
                    id: null,
                    name: `Заказ пользователя ${userName}`,
                    user_id: Number(userId),
                    items: [
                        {
                            id: device.id,
                            localId: nanoid(),
                            name: device.name,
                            deviceId: device.id,
                            count: 1,
                            price: device.price,
                            basketId: null,
                            countWeightType: device.countWeightType,
                            weightType: device.weightType,
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
                            id: device.id,
                            name: device.name,
                            localId: nanoid(),
                            deviceId: device.id,
                            count: 1,
                            price: device.price,
                            basketId: null,
                            countWeightType: device.countWeightType,
                            weightType: device.weightType,
                            decors: [],
                        },
                    ],
                }));
            }
        }
        else {
            if (!basket && device) {
                dispatch(setBasket({
                    id: null,
                    name: `Индивидуальный заказ`,
                    user_id: null,
                    items: [
                        {
                            id: device.id,
                            localId: nanoid(),
                            name: device.name,
                            deviceId: device.id,
                            count: 1,
                            price: device.price,
                            basketId: null,
                            countWeightType: device.countWeightType,
                            weightType: device.weightType,
                            decors: [],
                        },
                    ],
                }));
                setIsAdded(true);
            }
            if (basket && device) {
                dispatch(setBasket({
                    ...basket,
                    items: [
                        ...basket.items,
                        {
                            id: device.id,
                            localId: nanoid(),
                            name: device.name,
                            deviceId: device.id,
                            count: 1,
                            price: device.price,
                            basketId: null,
                            countWeightType: device.countWeightType,
                            weightType: device.weightType,
                            decors: [],
                        },
                    ],
                }));
            }
        }
    };
    const removeItemInBasket = async () => {
        if (userId && device) {
            if (!basket) {
                dispatch(setBasket({
                    id: null,
                    name: `Заказ пользователя ${userName}`,
                    user_id: Number(userId),
                    items: [
                        {
                            id: device.id,
                            localId: nanoid(),
                            name: device.name,
                            deviceId: device.id,
                            count: 1,
                            price: device.price,
                            basketId: null,
                            countWeightType: device.countWeightType,
                            weightType: device.weightType,
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
                        ...basket.items.filter((i) => i.id !== device.id),
                        ...basket.items
                            .filter((i) => i.id === device.id)
                            .filter((el, ind, arr) => ind !== arr.length - 1),
                    ],
                }));
            }
        }
        else {
            if (!basket && device) {
                dispatch(setBasket({
                    id: null,
                    name: `Индивидуальный заказ`,
                    user_id: null,
                    items: [
                        {
                            id: device.id,
                            localId: nanoid(),
                            name: device.name,
                            deviceId: device.id,
                            count: 1,
                            price: device.price,
                            basketId: null,
                            countWeightType: device.countWeightType,
                            weightType: device.weightType,
                            decors: [],
                        },
                    ],
                }));
                setIsAdded(true);
            }
            if (basket && device) {
                dispatch(setBasket({
                    ...basket,
                    items: [
                        ...basket.items,
                        {
                            id: device.id,
                            name: device.name,
                            localId: nanoid(),
                            deviceId: device.id,
                            count: 1,
                            price: device.price,
                            basketId: null,
                            countWeightType: device.countWeightType,
                            weightType: device.weightType,
                            decors: [],
                        },
                    ],
                }));
            }
        }
    };
    const openCreateRating = () => {
        setModal(DeviceModalEnum.CREATE_RATING);
    };
    const onClose = () => {
        setModal(DeviceModalEnum.IDLE);
    };
    //computed
    const countItemBasket = useMemo(() => {
        if (basket && device) {
            if (basket.items.length > 0) {
                return basket.items.filter((i) => i.id === device.id).length;
            }
            else
                return 0;
        }
        else
            return 0;
    }, [basket]);
    // sideEffects
    useEffect(() => {
        if (device &&
            basket &&
            basket.items.find((elem) => elem.id === device.id)) {
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
    return (React.createElement(ComponentStyleWrapper, null,
        React.createElement("div", { className: styles.Device__leftSide },
            React.createElement("div", { className: styles.Device__wrapper },
                React.createElement("img", { src: `${import.meta.env.VITE_API_URL_IMAGE}/${device.img}`, className: styles.Device__wrapper__img })),
            React.createElement(Text, { align: width <= 500 ? "center" : undefined, size: width >= 500 ? "3xl" : "m" }, device.name),
            width >= 800 ? (React.createElement(Textarea, { className: styles.Device__description, text: device.description || "", size: width >= 500 ? "m" : "s" })) : (React.createElement("div", null, isView ? (React.createElement("div", null,
                React.createElement(Textarea, { className: styles.Device__description, text: device.description || "", size: width >= 500 ? "m" : "s" }),
                React.createElement("span", { className: styles.Device__openDescription, onClick: () => setIsView(false) }, "\u0421\u043A\u0440\u044B\u0442\u044C"))) : (React.createElement(Text, { size: width >= 500 ? "m" : "s" },
                device.description.slice(0, 100),
                "...",
                " ",
                React.createElement("span", { className: styles.Device__openDescription, onClick: () => setIsView(true) }, "\u041F\u043E\u0434\u0440\u043E\u0431\u043D\u0435\u0435"))))),
            React.createElement("div", null,
                device && (React.createElement("div", { className: styles.Device__ratingWrapper },
                    React.createElement(Text, null, "\u0420\u0435\u0439\u0442\u0438\u043D\u0433:"),
                    React.createElement("div", { className: styles.Device__rating },
                        React.createElement(Text, { size: "s", className: styles.Device__rating__text }, Math.floor(device.rating * 100) / 100),
                        React.createElement(IconFavorite, { className: cx(styles.Device__rating__icon, {
                                colored: device.rating > 0,
                            }) })))),
                React.createElement(Text, null,
                    "\u0426\u0435\u043D\u0430: ",
                    device.price,
                    " \u20BD")),
            React.createElement("div", { className: styles.Device__actions },
                React.createElement("div", null, !isAdded ? (React.createElement(Button, { size: width <= 800 ? "xs" : "s", onClick: (e) => {
                        e.stopPropagation();
                        addItemInBasket();
                    }, label: "Добавить" })) : (React.createElement("div", { className: styles.Device__actions },
                    React.createElement(Button, { size: width <= 800 ? "xs" : "s", label: "-", onClick: (e) => {
                            e.stopPropagation();
                            removeItemInBasket();
                        } }),
                    React.createElement(Text, null, countItemBasket),
                    React.createElement(Button, { size: width <= 800 ? "xs" : "s", onClick: (e) => {
                            e.stopPropagation();
                            addItemInBasket();
                        }, label: "+" })))),
                React.createElement(Button, { label: "Оставить отзыв", size: width <= 800 ? "xs" : "s", onClick: openCreateRating }))),
        React.createElement(Modal, { isOpen: modal === DeviceModalEnum.CREATE_RATING },
            React.createElement(DeviceCreateRatingModal, { onClose: onClose, deviceName: device.name, device_id: device.id, width: width, fetchRatings: fetchRatings, fetchDevice: fetchDevice }))));
};
export default DeviceViewLeftSide;
//# sourceMappingURL=DeviceViewLeftSide.js.map