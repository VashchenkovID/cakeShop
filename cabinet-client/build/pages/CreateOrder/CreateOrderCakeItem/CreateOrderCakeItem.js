import React, { useEffect, useRef, useState } from "react";
import styles from "./CreateOrderCakeItem.module.styl";
import { Text } from "@consta/uikit/Text";
import { Button } from "@consta/uikit/Button";
import { IconTrash } from "@consta/uikit/IconTrash";
import { Collapse } from "@consta/uikit/Collapse";
import { nanoid } from "nanoid";
import { useAppDispatch } from "../../../hooks/useAppDispatch";
import { useAppSelector } from "../../../hooks/useAppSelector";
import { selectBasket } from "../../../store/features/basket/BasketSelectors";
import useCreateOrderCakeItem from "./useCreateOrderCakeItem";
import { setBasket } from "../../../store/features/basket/BasketSlice";
import CreateOrderDecorItem from "../CreateOrderDecorItem/CreateOrderDecorItem";
import { useResize } from "../../../hooks/useResize";
const CreateOrderCakeItem = ({ item, orderDecors, }) => {
    const { width } = useResize();
    const dispatch = useAppDispatch();
    const basket = useAppSelector(selectBasket);
    const ref = useRef(item.countWeightType);
    const [isOpen, setIsOpen] = useState(false);
    const [localOrderDecors, setLocalOrderDecors] = useState([]);
    const { removeWeightCountInBasket, addWeightCountInBasket } = useCreateOrderCakeItem(item, ref);
    const addNewDecor = () => {
        dispatch(setBasket({
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
                                    items: [],
                                    localId: nanoid(),
                                },
                            ],
                        };
                    }
                    else
                        return { ...i };
                })
                : [],
        }));
    };
    useEffect(() => {
        if (orderDecors) {
            setLocalOrderDecors(orderDecors);
        }
    }, [orderDecors]);
    useEffect(() => {
        if (localOrderDecors) {
            dispatch(setBasket({
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
                                }
                                else
                                    return { ...decor };
                            }),
                        };
                    })
                    : [],
            }));
        }
    }, [localOrderDecors]);
    return (React.createElement(Collapse, { isOpen: isOpen, className: styles.Collapse, onClick: (e) => {
            e.preventDefault();
            e.stopPropagation();
            setIsOpen((prev) => !prev);
        }, label: width >= 500 ? (React.createElement("div", { className: styles.CakeItem },
            React.createElement(Text, null,
                " ",
                item.name),
            React.createElement("div", { className: styles.CakeItem__basketActions },
                React.createElement(Button, { size: "s", label: "-", view: item.countWeightType === ref.current ? "ghost" : "primary", disabled: item.countWeightType === ref.current, onClick: (e) => removeWeightCountInBasket(e, item) }),
                React.createElement(Text, null,
                    item.countWeightType,
                    " ",
                    item.weightType),
                React.createElement(Button, { size: "s", onClick: (e) => addWeightCountInBasket(e, item), label: "+" })),
            React.createElement(Text, null,
                item.price,
                ",00 \u20BD"),
            React.createElement("div", { className: styles.CakeItem__actions },
                React.createElement(Text, null,
                    Number(item.count) *
                        Number(item.price) *
                        Number(item.countWeightType),
                    ",00 \u20BD"),
                React.createElement(Button, { size: "s", iconLeft: IconTrash, onClick: () => {
                        if (basket) {
                            dispatch(setBasket({
                                ...basket,
                                items: basket.items.filter((elem) => elem.localId !== item.localId),
                            }));
                        }
                    } })))) : (React.createElement("div", { className: styles.CakeItem__mobileContainer },
            React.createElement(Text, null,
                " ",
                item.name),
            React.createElement("div", { className: styles.CakeItem__mobileItem },
                React.createElement("div", { className: styles.CakeItem__basketActions },
                    React.createElement(Button, { size: "xs", label: "-", view: item.countWeightType === ref.current ? "ghost" : "primary", disabled: item.countWeightType === ref.current, onClick: (e) => removeWeightCountInBasket(e, item) }),
                    React.createElement(Text, { className: styles.CakeItem__mobileText },
                        item.countWeightType,
                        " ",
                        item.weightType),
                    React.createElement(Button, { size: "xs", onClick: (e) => addWeightCountInBasket(e, item), label: "+" })),
                React.createElement("div", { className: styles.CakeItem__actions },
                    React.createElement(Text, { className: styles.CakeItem__mobileText },
                        Number(item.count) *
                            Number(item.price) *
                            Number(item.countWeightType),
                        ",00 \u20BD"),
                    React.createElement(Button, { size: "xs", iconLeft: IconTrash, onClick: (e) => {
                            e.stopPropagation();
                            if (basket) {
                                dispatch(setBasket({
                                    ...basket,
                                    items: basket.items.filter((elem) => elem.localId !== item.localId),
                                }));
                            }
                        } }))))) },
        React.createElement("div", { className: styles.Decor__rows },
            React.createElement("div", { className: styles.Decor__addDec }, item.decors.length === 0 && (React.createElement(Button, { label: "Добавить декор к десерту", size: "xs", onClick: addNewDecor }))),
            item.decors.length > 0 &&
                localOrderDecors.map((decor, index) => (React.createElement(CreateOrderDecorItem, { item: decor, key: index, index: index, setOrderDecors: setLocalOrderDecors, parentId: item.localId }))))));
};
export default CreateOrderCakeItem;
//# sourceMappingURL=CreateOrderCakeItem.js.map