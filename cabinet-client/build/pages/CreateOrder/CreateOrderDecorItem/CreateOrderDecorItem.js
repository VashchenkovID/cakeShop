import React, { useRef } from "react";
import { Checkbox } from "@consta/uikit/Checkbox";
import { Text } from "@consta/uikit/Text";
import styles from "./CreateOrderDecorItem.module.styl";
import { Button } from "@consta/uikit/Button";
import { useAppDispatch } from "src/hooks/useAppDispatch";
import { useAppSelector } from "src/hooks/useAppSelector";
import { selectBasket } from "src/store/features/basket/BasketSelectors";
import { setBasket } from "src/store/features/basket/BasketSlice";
import { useResize } from "src/hooks/useResize";
const CreateOrderDecorItem = ({ item, setOrderDecors, index, parentId, }) => {
    const { width } = useResize();
    const dispatch = useAppDispatch();
    const basket = useAppSelector(selectBasket);
    const ref = useRef(item.count);
    const addDecorInBasket = () => {
        if (basket) {
            dispatch(setBasket({
                ...basket,
                items: basket.items.map((itm) => {
                    return {
                        ...itm,
                        decors: itm.decors.map((decor) => {
                            return {
                                ...decor,
                                items: decor.items.map((d) => {
                                    if (d.localId === item.localId &&
                                        parentId === itm.localId) {
                                        setOrderDecors((prevState) => [
                                            ...prevState.map((elem, idx) => {
                                                if (parentId === itm.localId &&
                                                    idx === index &&
                                                    elem.isChecked) {
                                                    return { ...elem, count: Number(elem.count) + 1 };
                                                }
                                                else
                                                    return { ...elem };
                                            }),
                                        ]);
                                        return { ...d, count: Number(d.count) + 1 };
                                    }
                                    else
                                        return { ...d };
                                }),
                            };
                        }),
                    };
                }),
            }));
        }
    };
    const removeDecorInBasket = () => {
        if (basket) {
            dispatch(setBasket({
                ...basket,
                items: basket.items.map((itm) => {
                    return {
                        ...itm,
                        decors: itm.decors.map((decor) => {
                            return {
                                ...decor,
                                items: decor.items.map((d) => {
                                    if (d.count > ref.current &&
                                        d.localId === item.localId &&
                                        parentId === itm.localId) {
                                        setOrderDecors((prevState) => [
                                            ...prevState.map((elem, idx) => {
                                                if (parentId === itm.localId &&
                                                    idx === index &&
                                                    elem.isChecked &&
                                                    elem.count > ref.current) {
                                                    return { ...elem, count: elem.count - 1 };
                                                }
                                                else
                                                    return { ...elem };
                                            }),
                                        ]);
                                        return { ...d, count: d.count - 1 };
                                    }
                                    else
                                        return { ...d };
                                }),
                            };
                        }),
                    };
                }),
            }));
        }
    };
    return (React.createElement("div", { className: styles.Decor },
        React.createElement("div", { className: styles.Decor__name },
            React.createElement(Checkbox, { className: styles.Checkbox, view: "primary", checked: item.isChecked, onClick: () => {
                    setOrderDecors((prevState) => {
                        return prevState.map((d, i) => {
                            if (i === index) {
                                return { ...d, isChecked: !d.isChecked };
                            }
                            else
                                return { ...d };
                        });
                    });
                } }),
            React.createElement(Text, { truncate: true, className: styles.Decor__mobile__text }, item.name)),
        React.createElement("div", { className: styles.Decor__actions },
            React.createElement(Button, { view: !item.isChecked || item.count <= ref.current ? "ghost" : "secondary", disabled: !item.isChecked || item.count <= ref.current, size: "xs", onClick: () => removeDecorInBasket(), label: "-" }),
            React.createElement(Text, { className: styles.Decor__mobile__text },
                item.count,
                " ",
                item.countType),
            React.createElement(Button, { view: !item.isChecked || item.count < ref.current ? "ghost" : "secondary", disabled: !item.isChecked || item.count < ref.current, size: "xs", onClick: () => addDecorInBasket(), label: "+" })),
        width >= 500 && (React.createElement(Text, { className: styles.Decor__mobile__text },
            item.pricePerUnit,
            ",00 \u20BD")),
        width >= 400 && (React.createElement(Text, { className: styles.Decor__mobile__text },
            item.count * item.pricePerUnit,
            ",00 \u20BD"))));
};
export default CreateOrderDecorItem;
//# sourceMappingURL=CreateOrderDecorItem.js.map